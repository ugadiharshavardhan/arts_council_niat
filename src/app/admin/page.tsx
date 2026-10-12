"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  Calendar,
  History,
  Trophy,
  Users,
  Plus,
  Trash2,
  ExternalLink,
  Search,
  CheckCircle,
  Database,
  Lock,
  Unlock,
  RefreshCw,
  AlertCircle,
  Sparkles,
  ArrowLeft,
  Copy,
  Check,
  Edit3,
  MapPin,
  Clock,
  Film,
  Award,
  X,
  Eye,
  Shield,
  Layers,
  Tag,
} from "lucide-react";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { EventItem, WinnerItem, CouncilMember } from "@/types";
import {
  getUpcomingEvents,
  saveUpcomingEvent,
  deleteUpcomingEvent,
  getPastEvents,
  savePastEvent,
  deletePastEvent,
  getWinners,
  saveWinner,
  deleteWinner,
  getClubMembers,
  saveClubMember,
  deleteClubMember,
  checkSupabaseStatus,
  SupabaseHealth,
  SUPABASE_SCHEMA_SQL,
} from "@/lib/dataService";
import { verifyAdminPasscode } from "@/lib/supabase";

type SectionTab = "past" | "upcoming" | "winners" | "members";

// Preset image selectors for convenience
const IMAGE_PRESETS = {
  past: [
    "/images/placeholder-past-1.svg",
    "/images/placeholder-past-2.svg",
    "/images/placeholder-past-3.svg",
    "/images/placeholder-past-4.svg",
  ],
  upcoming: [
    "/images/placeholder-event-highlight.svg",
    "/images/placeholder-event-1.svg",
    "/images/placeholder-event-2.svg",
    "/images/placeholder-event-3.svg",
  ],
  winners: [
    "/images/placeholder-winner-1.svg",
    "/images/placeholder-winner-2.svg",
    "/images/placeholder-winner-3.svg",
    "/images/placeholder-winner-4.svg",
  ],
  members: [
    "/images/members/kranthi-kiran.jpg",
    "/images/members/akula-hasini.png",
    "/images/members/ashwitha-jilla.jpg",
    "/images/members/thatikonda-swetcha.png",
    "/images/members/ashrith-nanda.png",
    "/images/placeholder-member-6.svg",
  ],
};

export default function AdminPage() {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passcode, setPasscode] = useState<string>("");
  const [authError, setAuthError] = useState<string>("");

  // Navigation & View state
  const [activeSection, setActiveSection] = useState<SectionTab>("past");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [copiedSql, setCopiedSql] = useState<boolean>(false);
  const [showSqlModal, setShowSqlModal] = useState<boolean>(false);
  const [initialEditingPhoto, setInitialEditingPhoto] = useState<string>("");

  // Data states
  const [upcomingEvents, setUpcomingEvents] = useState<EventItem[]>([]);
  const [pastEvents, setPastEvents] = useState<EventItem[]>([]);
  const [winners, setWinners] = useState<WinnerItem[]>([]);
  const [members, setMembers] = useState<CouncilMember[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [cloudStatus, setCloudStatus] = useState<SupabaseHealth>({
    configured: false,
    connected: false,
    tablesExist: false,
    message: "Checking connection...",
  });

  // Modal editing states
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [modalMode, setModalMode] = useState<"edit" | "create">("edit");
  const [editingItemType, setEditingItemType] = useState<SectionTab>("past");
  const [deleteConfirmItem, setDeleteConfirmItem] = useState<{
    id: string;
    title: string;
    type: SectionTab;
  } | null>(null);

  // Current Form Models
  const [eventForm, setEventForm] = useState<Partial<EventItem>>({});
  const [winnerForm, setWinnerForm] = useState<Partial<WinnerItem>>({});
  const [memberForm, setMemberForm] = useState<Partial<CouncilMember>>({});

  const AUTH_STORAGE_KEY = "pac_admin_auth_v2";
  const ONE_DAY_MS = 24 * 60 * 60 * 1000; // 1 day in milliseconds

  // Check persisted session with 1-day token expiry
  useEffect(() => {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed?.authenticated && parsed?.expiresAt && Date.now() < parsed.expiresAt) {
          setIsAuthenticated(true);
          return;
        } else {
          localStorage.removeItem(AUTH_STORAGE_KEY);
        }
      }
      if (sessionStorage.getItem("pac_admin_authenticated") === "true") {
        setIsAuthenticated(true);
      }
    } catch {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3800);
  };

  // Auth handler with 1-day token expiry
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (verifyAdminPasscode(passcode)) {
      setIsAuthenticated(true);
      const authSession = {
        authenticated: true,
        loginAt: Date.now(),
        expiresAt: Date.now() + ONE_DAY_MS,
      };
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authSession));
      sessionStorage.setItem("pac_admin_authenticated", "true");
      setAuthError("");
    } else {
      setAuthError("Invalid passcode. Default passcode is 'arts2026'");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem(AUTH_STORAGE_KEY);
    sessionStorage.removeItem("pac_admin_authenticated");
    setPasscode("");
  };

  // Fetch all records from Supabase
  const loadAllData = async () => {
    setIsLoading(true);
    try {
      const [up, past, win, mem, health] = await Promise.all([
        getUpcomingEvents(),
        getPastEvents(),
        getWinners(),
        getClubMembers(),
        checkSupabaseStatus(),
      ]);
      setUpcomingEvents(up);
      setPastEvents(past);
      setWinners(win);
      setMembers(mem);
      setCloudStatus(health);
    } catch (err) {
      console.error("Error loading data in admin:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadAllData();
    }
  }, [isAuthenticated]);

  // Copy Schema SQL
  const copySqlToClipboard = () => {
    navigator.clipboard.writeText(SUPABASE_SCHEMA_SQL);
    setCopiedSql(true);
    showToast("Supabase schema SQL copied to clipboard!");
    setTimeout(() => setCopiedSql(false), 2500);
  };

  // ============================================================================
  // OPEN EDIT / CREATE MODALS
  // ============================================================================
  const openEditPastEvent = (event: EventItem) => {
    setEditingItemType("past");
    setModalMode("edit");
    setInitialEditingPhoto(event.image || "");
    setEventForm({ ...event });
    setIsEditModalOpen(true);
  };

  const openCreatePastEvent = () => {
    setEditingItemType("past");
    setModalMode("create");
    setInitialEditingPhoto("");
    setEventForm({
      id: `pe-${Date.now().toString().slice(-4)}`,
      title: "",
      date: "15 AUGUST 2026",
      venue: "Main University Auditorium",
      category: "Classical Confluence",
      description: "",
      image: "/images/placeholder-past-1.svg",
      videoUrl: "",
      organizer: "Performing Arts Council",
      participants: "Collegiate Troupes",
    });
    setIsEditModalOpen(true);
  };

  const openEditUpcomingEvent = (event: EventItem) => {
    setEditingItemType("upcoming");
    setModalMode("edit");
    setInitialEditingPhoto(event.image || "");
    setEventForm({ ...event });
    setIsEditModalOpen(true);
  };

  const openCreateUpcomingEvent = () => {
    setEditingItemType("upcoming");
    setModalMode("create");
    setInitialEditingPhoto("");
    setEventForm({
      id: `ue-${Date.now().toString().slice(-4)}`,
      title: "",
      date: "25 NOVEMBER 2026",
      time: "6:00 PM IST",
      venue: "Main Auditorium",
      category: "Showcase",
      badge: "Upcoming Gala",
      description: "",
      image: "/images/placeholder-event-highlight.svg",
      isFeatured: false,
    });
    setIsEditModalOpen(true);
  };

  const openEditWinner = (winner: WinnerItem) => {
    setEditingItemType("winners");
    setModalMode("edit");
    setInitialEditingPhoto(winner.photo || "");
    setWinnerForm({ ...winner });
    setIsEditModalOpen(true);
  };

  const openCreateWinner = () => {
    setEditingItemType("winners");
    setModalMode("create");
    setInitialEditingPhoto("");
    setWinnerForm({
      id: `win-${Date.now().toString().slice(-4)}`,
      name: "",
      eventName: "",
      position: "1st Place (Gold Trophy)",
      date: "October 2026",
      prizeOrAchievement: "Rolling Trophy & Cash Citation",
      category: "Classical Music",
      photo: "/images/placeholder-winner-1.svg",
      isFeatured: false,
    });
    setIsEditModalOpen(true);
  };

  const openEditMember = (member: CouncilMember) => {
    setEditingItemType("members");
    setModalMode("edit");
    setInitialEditingPhoto(member.photo || "");
    setMemberForm({ ...member });
    setIsEditModalOpen(true);
  };

  const openCreateMember = () => {
    setEditingItemType("members");
    setModalMode("create");
    setInitialEditingPhoto("");
    setMemberForm({
      id: `mem-${Date.now().toString().slice(-4)}`,
      name: "",
      role: "Member",
      studentId: "",
      department: "Finance & Sponsorships",
      photo: "/images/members/kranthi-kiran.jpg",
      imagePosition: "center center",
      isLeadership: false,
    });
    setIsEditModalOpen(true);
  };

  // ============================================================================
  // SAVE ACTIONS (Reflects in UI and Supabase)
  // ============================================================================
  const handleSavePastEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventForm.title?.trim() || !eventForm.date?.trim() || !eventForm.description?.trim()) {
      alert("Event Title, Date, and Description are required!");
      return;
    }

    setIsSaving(true);
    const itemToSave: EventItem = {
      id: eventForm.id || `pe-${Date.now().toString().slice(-4)}`,
      title: eventForm.title.trim(),
      date: eventForm.date.trim(),
      venue: eventForm.venue?.trim() || "Main Auditorium",
      category: eventForm.category?.trim() || "Archive",
      description: eventForm.description.trim(),
      image: eventForm.image || "/images/placeholder-past-1.svg",
      videoUrl: eventForm.videoUrl?.trim() || undefined,
      gallery: eventForm.gallery || undefined,
      organizer: eventForm.organizer?.trim() || undefined,
      participants: eventForm.participants?.trim() || undefined,
    };

    try {
      const result = await savePastEvent(itemToSave);
      // Immediately reflect in UI state
      setPastEvents((prev) => {
        const exists = prev.some((p) => p.id === itemToSave.id);
        return exists ? prev.map((p) => (p.id === itemToSave.id ? itemToSave : p)) : [itemToSave, ...prev];
      });

      setIsEditModalOpen(false);
      showToast(
        result.syncedToCloud
          ? "Past event saved & synced to Supabase database!"
          : "Past event saved locally. (Tables pending in Supabase)"
      );
    } catch (err: any) {
      alert(`Save error: ${err.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveUpcomingEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventForm.title?.trim() || !eventForm.date?.trim() || !eventForm.description?.trim()) {
      alert("Event Title, Date, and Description are required!");
      return;
    }

    setIsSaving(true);
    const itemToSave: EventItem = {
      id: eventForm.id || `ue-${Date.now().toString().slice(-4)}`,
      title: eventForm.title.trim(),
      date: eventForm.date.trim(),
      time: eventForm.time?.trim() || undefined,
      venue: eventForm.venue?.trim() || undefined,
      category: eventForm.category?.trim() || undefined,
      badge: eventForm.badge?.trim() || undefined,
      description: eventForm.description.trim(),
      image: eventForm.image || "/images/placeholder-event-1.svg",
      isFeatured: Boolean(eventForm.isFeatured),
    };

    try {
      const result = await saveUpcomingEvent(itemToSave);
      setUpcomingEvents((prev) => {
        const exists = prev.some((p) => p.id === itemToSave.id);
        return exists ? prev.map((p) => (p.id === itemToSave.id ? itemToSave : p)) : [itemToSave, ...prev];
      });

      setIsEditModalOpen(false);
      showToast(
        result.syncedToCloud
          ? "Upcoming event saved & synced to Supabase database!"
          : "Upcoming event saved locally. (Tables pending in Supabase)"
      );
    } catch (err: any) {
      alert(`Save error: ${err.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveWinner = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!winnerForm.name?.trim() || !winnerForm.eventName?.trim() || !winnerForm.position?.trim()) {
      alert("Winner Name, Event Name, and Position are required!");
      return;
    }

    setIsSaving(true);
    const itemToSave: WinnerItem = {
      id: winnerForm.id || `win-${Date.now().toString().slice(-4)}`,
      name: winnerForm.name.trim(),
      eventName: winnerForm.eventName.trim(),
      position: winnerForm.position.trim(),
      date: winnerForm.date?.trim() || "2026",
      prizeOrAchievement: winnerForm.prizeOrAchievement?.trim() || "Rolling Trophy",
      category: winnerForm.category?.trim() || undefined,
      photo: winnerForm.photo || "/images/placeholder-winner-1.svg",
      isFeatured: Boolean(winnerForm.isFeatured),
    };

    try {
      const result = await saveWinner(itemToSave);
      setWinners((prev) => {
        const exists = prev.some((w) => w.id === itemToSave.id);
        return exists ? prev.map((w) => (w.id === itemToSave.id ? itemToSave : w)) : [itemToSave, ...prev];
      });

      setIsEditModalOpen(false);
      showToast(
        result.syncedToCloud
          ? "Winner details saved & synced to Supabase database!"
          : "Winner saved locally. (Tables pending in Supabase)"
      );
    } catch (err: any) {
      alert(`Save error: ${err.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!memberForm.name?.trim() || !memberForm.role?.trim()) {
      alert("Member Name and Role are required!");
      return;
    }

    setIsSaving(true);
    const itemToSave: CouncilMember = {
      id: memberForm.id || `mem-${Date.now().toString().slice(-4)}`,
      name: memberForm.name.trim(),
      role: memberForm.role.trim(),
      studentId: memberForm.studentId?.trim() || undefined,
      department: memberForm.department?.trim() || undefined,
      photo: memberForm.photo || "/images/members/kranthi-kiran.jpg",
      imagePosition: memberForm.imagePosition || "center center",
      isLeadership: Boolean(memberForm.isLeadership),
    };

    try {
      const result = await saveClubMember(itemToSave, initialEditingPhoto);
      setMembers((prev) => {
        const exists = prev.some((m) => m.id === itemToSave.id);
        return exists ? prev.map((m) => (m.id === itemToSave.id ? itemToSave : m)) : [...prev, itemToSave];
      });

      setIsEditModalOpen(false);
      showToast(
        result.syncedToCloud
          ? "Club member saved & synced to Supabase database!"
          : "Member saved locally. (Tables pending in Supabase)"
      );
    } catch (err: any) {
      alert(`Save error: ${err.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  // ============================================================================
  // DELETE ACTION (Reflects in UI and Supabase)
  // ============================================================================
  const executeDelete = async () => {
    if (!deleteConfirmItem) return;
    const { id, type } = deleteConfirmItem;

    try {
      if (type === "past") {
        await deletePastEvent(id);
        setPastEvents((prev) => prev.filter((item) => item.id !== id));
        showToast("Past event deleted from database & UI!");
      } else if (type === "upcoming") {
        await deleteUpcomingEvent(id);
        setUpcomingEvents((prev) => prev.filter((item) => item.id !== id));
        showToast("Upcoming event deleted from database & UI!");
      } else if (type === "winners") {
        await deleteWinner(id);
        setWinners((prev) => prev.filter((item) => item.id !== id));
        showToast("Winner record deleted from database & UI!");
      } else if (type === "members") {
        await deleteClubMember(id);
        setMembers((prev) => prev.filter((item) => item.id !== id));
        showToast("Club member deleted from database & UI!");
      }
    } catch (err: any) {
      alert(`Delete error: ${err.message}`);
    } finally {
      setDeleteConfirmItem(null);
    }
  };

  // ============================================================================
  // SEARCH FILTERED LISTS
  // ============================================================================
  const filteredPast = useMemo(
    () =>
      pastEvents.filter((e) =>
        `${e.title} ${e.category} ${e.venue} ${e.description}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      ),
    [pastEvents, searchQuery]
  );

  const filteredUpcoming = useMemo(
    () =>
      upcomingEvents.filter((e) =>
        `${e.title} ${e.category} ${e.venue} ${e.description}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      ),
    [upcomingEvents, searchQuery]
  );

  const filteredWinners = useMemo(
    () =>
      winners.filter((w) =>
        `${w.name} ${w.eventName} ${w.position} ${w.prizeOrAchievement}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      ),
    [winners, searchQuery]
  );

  const filteredMembers = useMemo(
    () =>
      members.filter((m) =>
        `${m.name} ${m.role} ${m.studentId || ""} ${m.department || ""}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      ),
    [members, searchQuery]
  );

  // ============================================================================
  // AUTH LOGIN SCREEN
  // ============================================================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#23120A] flex items-center justify-center p-4 selection:bg-[#D98C5B]/30 text-[#F5E6D3]">
        <div className="w-full max-w-md bg-[#4E2E1E] border border-[#6B3B23] rounded-3xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#D98C5B]/15 rounded-full blur-[90px] pointer-events-none" />

          <div className="text-center mb-8 relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-[#23120A] border border-[#D98C5B]/40 mx-auto flex items-center justify-center mb-4 shadow-lg text-[#D98C5B]">
              <Lock className="w-8 h-8" />
            </div>
            <span className="inline-block px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-[0.2em] bg-[#6B3B23]/60 text-[#D98C5B] border border-[#6B3B23] mb-3">
              Council Executive Suite
            </span>
            <h1 className="text-2xl sm:text-3xl font-serif font-black tracking-tight text-[#F5E6D3]">
              PAC Admin Portal
            </h1>
            <p className="text-xs sm:text-sm text-[#E7C59F] mt-2 font-light">
              Enter passcode to manage Supabase database records for events, laureates, and roster.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 relative z-10">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#E7C59F] mb-2">
                Executive Passcode
              </label>
              <input
                type="password"
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value);
                  setAuthError("");
                }}
                placeholder="Enter passcode (arts2026)"
                className="w-full px-4 py-3 rounded-xl bg-[#23120A] border border-[#6B3B23] text-[#F5E6D3] placeholder-[#E7C59F]/40 focus:outline-none focus:border-[#D98C5B] focus:ring-1 focus:ring-[#D98C5B] text-sm transition-all"
                autoFocus
              />
              {authError && (
                <p className="text-red-400 text-xs mt-2 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {authError}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[#D98C5B] hover:bg-[#E79E70] text-[#23120A] font-bold text-sm tracking-wide uppercase transition-all duration-200 shadow-lg shadow-[#D98C5B]/25 cursor-pointer flex items-center justify-center gap-2"
            >
              <Unlock className="w-4 h-4" />
              <span>Unlock Admin Portal</span>
            </button>

            <div className="pt-4 text-center border-t border-[#6B3B23]">
              <Link
                href="/"
                className="text-xs text-[#E7C59F] hover:text-[#D98C5B] transition-colors inline-flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Public Website</span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // ============================================================================
  // ADMIN DASHBOARD
  // ============================================================================
  return (
    <div className="min-h-screen bg-[#23120A] text-[#F5E6D3] flex flex-col font-sans selection:bg-[#D98C5B]/30">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-[#D98C5B] text-[#23120A] px-5 py-3 rounded-xl shadow-2xl font-bold text-sm flex items-center gap-2.5 animate-bounce">
          <CheckCircle className="w-5 h-5 text-[#23120A]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* TOP HEADER */}
      <header className="h-16 bg-[#4E2E1E] border-b border-[#6B3B23] px-4 sm:px-8 flex items-center justify-between shrink-0 sticky top-0 z-30 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#23120A] border border-[#D98C5B]/50 flex items-center justify-center text-[#D98C5B] font-serif font-black text-sm shadow-md">
            PAC
          </div>
          <div>
            <h1 className="font-serif font-bold text-base sm:text-lg tracking-wide text-[#F5E6D3]">
              Performing Arts Council · Executive Management
            </h1>
            <p className="text-[11px] font-mono text-[#E7C59F]/70 hidden sm:block">
              Connected to Supabase Cloud Database (events, winners, club_members)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Supabase status indicator */}
          <div
            onClick={() => setShowSqlModal(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono border bg-[#23120A] border-[#6B3B23] hover:border-[#D98C5B] cursor-pointer transition-colors"
            title="Click to view Supabase database schema setup"
          >
            <span
              className={`w-2 h-2 rounded-full ${
                cloudStatus.tablesExist
                  ? "bg-emerald-400 animate-pulse"
                  : "bg-amber-400"
              }`}
            />
            <span className="text-[#E7C59F]">
              Supabase:{" "}
              <span className="text-[#F5E6D3] font-semibold">
                {cloudStatus.tablesExist ? "Live Database" : "Setup Schema"}
              </span>
            </span>
          </div>

          <Link
            href="/"
            target="_blank"
            className="px-3 py-1.5 rounded-xl bg-[#23120A] border border-[#6B3B23] hover:border-[#D98C5B] text-xs font-mono text-[#E7C59F] hover:text-[#F5E6D3] transition-colors flex items-center gap-1.5"
          >
            <ExternalLink className="w-3.5 h-3.5 text-[#D98C5B]" />
            <span className="hidden sm:inline">Public Site</span>
          </Link>

          <button
            onClick={handleLogout}
            className="px-3.5 py-1.5 rounded-xl bg-[#6B3B23]/70 hover:bg-[#6B3B23] text-xs font-mono text-[#E7C59F] hover:text-[#F5E6D3] transition-colors cursor-pointer"
          >
            Lock
          </button>
        </div>
      </header>

      {/* SCHEMA SETUP BANNER IF TABLES NOT CREATED */}
      {!cloudStatus.tablesExist && cloudStatus.configured && (
        <div className="bg-[#4E2E1E] border-b border-[#D98C5B]/40 px-4 sm:px-8 py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 text-xs text-[#E7C59F]">
            <AlertCircle className="w-4 h-4 text-[#D98C5B] shrink-0" />
            <span>
              <strong>Supabase Database Schema Setup:</strong> Run the schema in your Supabase SQL editor to activate database tables for events, winners, and club members.
            </span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={copySqlToClipboard}
              className="px-3 py-1 rounded-lg bg-[#D98C5B] text-[#23120A] text-xs font-mono font-bold hover:bg-[#E79E70] flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              {copiedSql ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedSql ? "Copied SQL!" : "Copy SQL Script"}</span>
            </button>
            <a
              href="https://supabase.com/dashboard/project/godwvqxsswltgmbzlrdr/sql"
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1 rounded-lg bg-[#23120A] border border-[#6B3B23] hover:border-[#D98C5B] text-xs font-mono text-[#E7C59F] flex items-center gap-1"
            >
              <ExternalLink className="w-3 h-3 text-[#D98C5B]" />
              <span>Open SQL Editor</span>
            </a>
          </div>
        </div>
      )}

      {/* MAIN CONTAINER WITH SIDEBAR AND CONTENT */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* SIDEBAR NAVIGATION */}
        <aside className="w-full md:w-64 bg-[#351C11] border-r border-[#6B3B23] p-4 flex flex-col justify-between shrink-0">
          <div className="space-y-4">
            <div className="px-2 pt-1">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#D98C5B] font-bold block">
                Database Tables
              </span>
              <p className="text-xs text-[#E7C59F]/70 mt-0.5">
                Manage records in Supabase
              </p>
            </div>

            {/* Navigation Tabs - Note: "Supabase Sync" section removed as requested! */}
            <nav className="space-y-1.5">
              <button
                onClick={() => {
                  setActiveSection("past");
                  setSearchQuery("");
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeSection === "past"
                    ? "bg-[#D98C5B] text-[#23120A] font-bold shadow-md shadow-[#D98C5B]/20"
                    : "text-[#E7C59F] hover:text-[#F5E6D3] hover:bg-[#4E2E1E]"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <History className="w-4 h-4" />
                  <span>Past Events</span>
                </div>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
                    activeSection === "past"
                      ? "bg-[#23120A]/20 text-[#23120A]"
                      : "bg-[#23120A] text-[#D98C5B]"
                  }`}
                >
                  {pastEvents.length}
                </span>
              </button>

              <button
                onClick={() => {
                  setActiveSection("upcoming");
                  setSearchQuery("");
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeSection === "upcoming"
                    ? "bg-[#D98C5B] text-[#23120A] font-bold shadow-md shadow-[#D98C5B]/20"
                    : "text-[#E7C59F] hover:text-[#F5E6D3] hover:bg-[#4E2E1E]"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Calendar className="w-4 h-4" />
                  <span>Upcoming Events</span>
                </div>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
                    activeSection === "upcoming"
                      ? "bg-[#23120A]/20 text-[#23120A]"
                      : "bg-[#23120A] text-[#D98C5B]"
                  }`}
                >
                  {upcomingEvents.length}
                </span>
              </button>

              <button
                onClick={() => {
                  setActiveSection("winners");
                  setSearchQuery("");
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeSection === "winners"
                    ? "bg-[#D98C5B] text-[#23120A] font-bold shadow-md shadow-[#D98C5B]/20"
                    : "text-[#E7C59F] hover:text-[#F5E6D3] hover:bg-[#4E2E1E]"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Trophy className="w-4 h-4" />
                  <span>Winners Details</span>
                </div>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
                    activeSection === "winners"
                      ? "bg-[#23120A]/20 text-[#23120A]"
                      : "bg-[#23120A] text-[#D98C5B]"
                  }`}
                >
                  {winners.length}
                </span>
              </button>

              <button
                onClick={() => {
                  setActiveSection("members");
                  setSearchQuery("");
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeSection === "members"
                    ? "bg-[#D98C5B] text-[#23120A] font-bold shadow-md shadow-[#D98C5B]/20"
                    : "text-[#E7C59F] hover:text-[#F5E6D3] hover:bg-[#4E2E1E]"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Users className="w-4 h-4" />
                  <span>Club Members</span>
                </div>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
                    activeSection === "members"
                      ? "bg-[#23120A]/20 text-[#23120A]"
                      : "bg-[#23120A] text-[#D98C5B]"
                  }`}
                >
                  {members.length}
                </span>
              </button>
            </nav>
          </div>

          {/* Database Info Card */}
          <div className="pt-6 border-t border-[#6B3B23] mt-6 space-y-3">
            <div className="p-3 rounded-xl bg-[#23120A] border border-[#6B3B23] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase text-[#D98C5B] font-semibold flex items-center gap-1.5">
                  <Database className="w-3 h-3" />
                  Supabase Project
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
              </div>
              <p className="text-[11px] font-mono text-[#E7C59F]/80 truncate">
                godwvqxsswltgmbzlrdr
              </p>
              <button
                onClick={() => setShowSqlModal(true)}
                className="w-full text-left text-[11px] text-[#D98C5B] hover:underline font-mono"
              >
                View Schema SQL ↗
              </button>
            </div>

            <button
              onClick={loadAllData}
              disabled={isLoading}
              className="w-full py-2 rounded-xl bg-[#4E2E1E] hover:bg-[#6B3B23] border border-[#6B3B23] text-xs font-mono text-[#E7C59F] hover:text-[#F5E6D3] transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin text-[#D98C5B]" : ""}`} />
              <span>{isLoading ? "Refreshing..." : "Refresh Supabase"}</span>
            </button>
          </div>
        </aside>

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8">
          {/* Top Control Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-[#6B3B23]">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase bg-[#4E2E1E] text-[#D98C5B] border border-[#6B3B23]">
                  {activeSection === "past" && "Archival Events Table"}
                  {activeSection === "upcoming" && "Auditorium Calendar Table"}
                  {activeSection === "winners" && "Laureates Table"}
                  {activeSection === "members" && "Club Directorate Roster"}
                </span>
                <span className="text-xs font-mono text-[#E7C59F]/70">
                  {activeSection === "past" && `${filteredPast.length} Records`}
                  {activeSection === "upcoming" && `${filteredUpcoming.length} Records`}
                  {activeSection === "winners" && `${filteredWinners.length} Records`}
                  {activeSection === "members" && `${filteredMembers.length} Records`}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#F5E6D3] mt-1">
                {activeSection === "past" && "Past Events Management"}
                {activeSection === "upcoming" && "Upcoming Events Management"}
                {activeSection === "winners" && "Winners & Laureates"}
                {activeSection === "members" && "Club Members Roster"}
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* Search Bar */}
              <div className="relative w-full sm:w-64">
                <Search className="w-3.5 h-3.5 text-[#E7C59F]/50 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search records..."
                  className="w-full pl-8 pr-3 py-2 rounded-xl bg-[#4E2E1E] border border-[#6B3B23] text-xs text-[#F5E6D3] placeholder-[#E7C59F]/40 focus:outline-none focus:border-[#D98C5B]"
                />
              </div>

              {/* Add New Button */}
              {activeSection === "past" && (
                <button
                  onClick={openCreatePastEvent}
                  className="px-4 py-2 rounded-xl bg-[#D98C5B] hover:bg-[#E79E70] text-[#23120A] text-xs font-mono font-bold tracking-wide uppercase transition-all duration-200 shadow-md shadow-[#D98C5B]/20 cursor-pointer flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Past Event</span>
                </button>
              )}
              {activeSection === "upcoming" && (
                <button
                  onClick={openCreateUpcomingEvent}
                  className="px-4 py-2 rounded-xl bg-[#D98C5B] hover:bg-[#E79E70] text-[#23120A] text-xs font-mono font-bold tracking-wide uppercase transition-all duration-200 shadow-md shadow-[#D98C5B]/20 cursor-pointer flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Upcoming Event</span>
                </button>
              )}
              {activeSection === "winners" && (
                <button
                  onClick={openCreateWinner}
                  className="px-4 py-2 rounded-xl bg-[#D98C5B] hover:bg-[#E79E70] text-[#23120A] text-xs font-mono font-bold tracking-wide uppercase transition-all duration-200 shadow-md shadow-[#D98C5B]/20 cursor-pointer flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Winner</span>
                </button>
              )}
              {activeSection === "members" && (
                <button
                  onClick={openCreateMember}
                  className="px-4 py-2 rounded-xl bg-[#D98C5B] hover:bg-[#E79E70] text-[#23120A] text-xs font-mono font-bold tracking-wide uppercase transition-all duration-200 shadow-md shadow-[#D98C5B]/20 cursor-pointer flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Member</span>
                </button>
              )}
            </div>
          </div>

          {/* ================================================================== */}
          {/* 1. PAST EVENTS ROWS DATA (With Edit & Delete options for each row) */}
          {/* ================================================================== */}
          {activeSection === "past" && (
            <div className="space-y-4">
              {filteredPast.length === 0 ? (
                <div className="p-12 text-center bg-[#4E2E1E]/50 rounded-2xl border border-[#6B3B23]">
                  <p className="text-sm font-mono text-[#E7C59F]">
                    No past events match your search query.
                  </p>
                </div>
              ) : (
                filteredPast.map((evt) => (
                  <div
                    key={evt.id}
                    className="p-5 rounded-2xl bg-[#4E2E1E] border border-[#6B3B23] hover:border-[#D98C5B]/60 transition-all duration-200 shadow-lg flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5 group"
                  >
                    {/* Left: Event Thumbnail & Main Details */}
                    <div className="flex items-start sm:items-center gap-4 min-w-0 flex-1">
                      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-[#23120A] border border-[#6B3B23] overflow-hidden shrink-0 relative">
                        <img
                          src={evt.image}
                          alt={evt.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {evt.videoUrl && (
                          <div className="absolute bottom-1 right-1 p-1 rounded bg-[#23120A]/90 text-[#D98C5B]">
                            <Film className="w-3 h-3" />
                          </div>
                        )}
                      </div>

                      <div className="min-w-0 flex-1 space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-[#23120A] text-[#D98C5B] border border-[#6B3B23]">
                            {evt.category || "Past Event"}
                          </span>
                          <span className="text-[10px] font-mono text-[#E7C59F]/70">
                            ID: {evt.id}
                          </span>
                        </div>

                        <h3 className="text-base sm:text-lg font-serif font-bold text-[#F5E6D3] leading-snug">
                          {evt.title}
                        </h3>

                        <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#E7C59F]">
                          <span className="inline-flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-[#D98C5B]" />
                            {evt.date}
                          </span>
                          {evt.venue && (
                            <span className="inline-flex items-center gap-1.5">
                              <MapPin className="w-3.5 h-3.5 text-[#E7C59F]/60" />
                              {evt.venue}
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-[#E7C59F]/80 font-light line-clamp-2 pt-1">
                          {evt.description}
                        </p>
                      </div>
                    </div>

                    {/* Right: Actions Column (Edit & Delete for each row) */}
                    <div className="flex items-center gap-2.5 self-end lg:self-center shrink-0 border-t lg:border-t-0 pt-3 lg:pt-0 w-full lg:w-auto justify-end border-[#6B3B23]">
                      <Link
                        href={`/events/${evt.id}`}
                        target="_blank"
                        className="px-3 py-2 rounded-xl bg-[#23120A] hover:bg-[#351C11] border border-[#6B3B23] text-[#E7C59F] hover:text-[#F5E6D3] text-xs font-mono flex items-center gap-1.5 transition-colors"
                        title="View event page"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#D98C5B]" />
                        <span className="hidden sm:inline">Preview</span>
                      </Link>

                      <button
                        onClick={() => openEditPastEvent(evt)}
                        className="px-3.5 py-2 rounded-xl bg-[#D98C5B] hover:bg-[#E79E70] text-[#23120A] text-xs font-mono font-bold flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
                        title="Edit event"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>

                      <button
                        onClick={() =>
                          setDeleteConfirmItem({
                            id: evt.id,
                            title: evt.title,
                            type: "past",
                          })
                        }
                        className="p-2 rounded-xl bg-[#23120A] hover:bg-red-950/60 border border-[#6B3B23] hover:border-red-500/50 text-[#E7C59F] hover:text-red-400 transition-colors cursor-pointer"
                        title="Delete event"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* ================================================================== */}
          {/* 2. UPCOMING EVENTS ROWS DATA (With Edit & Delete options) */}
          {/* ================================================================== */}
          {activeSection === "upcoming" && (
            <div className="space-y-4">
              {filteredUpcoming.length === 0 ? (
                <div className="p-12 text-center bg-[#4E2E1E]/50 rounded-2xl border border-[#6B3B23]">
                  <p className="text-sm font-mono text-[#E7C59F]">
                    No upcoming events match your search query.
                  </p>
                </div>
              ) : (
                filteredUpcoming.map((evt) => (
                  <div
                    key={evt.id}
                    className="p-5 rounded-2xl bg-[#4E2E1E] border border-[#6B3B23] hover:border-[#D98C5B]/60 transition-all duration-200 shadow-lg flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5 group"
                  >
                    <div className="flex items-start sm:items-center gap-4 min-w-0 flex-1">
                      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-[#23120A] border border-[#6B3B23] overflow-hidden shrink-0 relative">
                        <img
                          src={evt.image}
                          alt={evt.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      <div className="min-w-0 flex-1 space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-[#23120A] text-[#D98C5B] border border-[#6B3B23]">
                            {evt.category || "Upcoming"}
                          </span>
                          {evt.isFeatured && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-[#D98C5B]/20 text-[#D98C5B] border border-[#D98C5B]/40 font-bold">
                              ★ Featured
                            </span>
                          )}
                          <span className="text-[10px] font-mono text-[#E7C59F]/70">
                            ID: {evt.id}
                          </span>
                        </div>

                        <h3 className="text-base sm:text-lg font-serif font-bold text-[#F5E6D3] leading-snug">
                          {evt.title}
                        </h3>

                        <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#E7C59F]">
                          <span className="inline-flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-[#D98C5B]" />
                            {evt.date}
                          </span>
                          {evt.time && (
                            <span className="inline-flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5 text-[#E7C59F]/60" />
                              {evt.time}
                            </span>
                          )}
                          {evt.venue && (
                            <span className="inline-flex items-center gap-1.5">
                              <MapPin className="w-3.5 h-3.5 text-[#E7C59F]/60" />
                              {evt.venue}
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-[#E7C59F]/80 font-light line-clamp-2 pt-1">
                          {evt.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 self-end lg:self-center shrink-0 border-t lg:border-t-0 pt-3 lg:pt-0 w-full lg:w-auto justify-end border-[#6B3B23]">
                      <button
                        onClick={() => openEditUpcomingEvent(evt)}
                        className="px-3.5 py-2 rounded-xl bg-[#D98C5B] hover:bg-[#E79E70] text-[#23120A] text-xs font-mono font-bold flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>

                      <button
                        onClick={() =>
                          setDeleteConfirmItem({
                            id: evt.id,
                            title: evt.title,
                            type: "upcoming",
                          })
                        }
                        className="p-2 rounded-xl bg-[#23120A] hover:bg-red-950/60 border border-[#6B3B23] hover:border-red-500/50 text-[#E7C59F] hover:text-red-400 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* ================================================================== */}
          {/* 3. WINNERS ROWS DATA (With Edit & Delete options) */}
          {/* ================================================================== */}
          {activeSection === "winners" && (
            <div className="space-y-4">
              {filteredWinners.length === 0 ? (
                <div className="p-12 text-center bg-[#4E2E1E]/50 rounded-2xl border border-[#6B3B23]">
                  <p className="text-sm font-mono text-[#E7C59F]">
                    No winner records match your search query.
                  </p>
                </div>
              ) : (
                filteredWinners.map((win) => (
                  <div
                    key={win.id}
                    className="p-5 rounded-2xl bg-[#4E2E1E] border border-[#6B3B23] hover:border-[#D98C5B]/60 transition-all duration-200 shadow-lg flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5 group"
                  >
                    <div className="flex items-start sm:items-center gap-4 min-w-0 flex-1">
                      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-[#23120A] border border-[#6B3B23] overflow-hidden shrink-0">
                        <img
                          src={win.photo}
                          alt={win.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      <div className="min-w-0 flex-1 space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-[#23120A] text-[#D98C5B] border border-[#6B3B23]">
                            {win.position}
                          </span>
                          {win.isFeatured && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-[#D98C5B]/20 text-[#D98C5B] border border-[#D98C5B]/40 font-bold">
                              ★ Featured Laureate
                            </span>
                          )}
                        </div>

                        <h3 className="text-base sm:text-lg font-serif font-bold text-[#F5E6D3]">
                          {win.name}
                        </h3>

                        <p className="text-xs font-mono text-[#D98C5B]">
                          {win.eventName} · {win.category}
                        </p>

                        <div className="flex items-center gap-2 text-xs text-[#E7C59F]/90">
                          <Award className="w-3.5 h-3.5 text-[#D98C5B]" />
                          <span>{win.prizeOrAchievement}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 self-end lg:self-center shrink-0 border-t lg:border-t-0 pt-3 lg:pt-0 w-full lg:w-auto justify-end border-[#6B3B23]">
                      <button
                        onClick={() => openEditWinner(win)}
                        className="px-3.5 py-2 rounded-xl bg-[#D98C5B] hover:bg-[#E79E70] text-[#23120A] text-xs font-mono font-bold flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>

                      <button
                        onClick={() =>
                          setDeleteConfirmItem({
                            id: win.id,
                            title: win.name,
                            type: "winners",
                          })
                        }
                        className="p-2 rounded-xl bg-[#23120A] hover:bg-red-950/60 border border-[#6B3B23] hover:border-red-500/50 text-[#E7C59F] hover:text-red-400 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* ================================================================== */}
          {/* 4. CLUB MEMBERS ROWS DATA (With Edit & Delete options) */}
          {/* ================================================================== */}
          {activeSection === "members" && (
            <div className="space-y-4">
              {filteredMembers.length === 0 ? (
                <div className="p-12 text-center bg-[#4E2E1E]/50 rounded-2xl border border-[#6B3B23]">
                  <p className="text-sm font-mono text-[#E7C59F]">
                    No members match your search query.
                  </p>
                </div>
              ) : (
                filteredMembers.map((mem) => (
                  <div
                    key={mem.id}
                    className="p-5 rounded-2xl bg-[#4E2E1E] border border-[#6B3B23] hover:border-[#D98C5B]/60 transition-all duration-200 shadow-lg flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5 group"
                  >
                    <div className="flex items-start sm:items-center gap-4 min-w-0 flex-1">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-[#23120A] border border-[#6B3B23] overflow-hidden shrink-0">
                        <img
                          src={mem.photo}
                          alt={mem.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          style={{ objectPosition: mem.imagePosition || "center" }}
                        />
                      </div>

                      <div className="min-w-0 flex-1 space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-[#23120A] text-[#D98C5B] border border-[#6B3B23]">
                            {mem.role}
                          </span>
                          {mem.studentId && (
                            <span className="text-[10px] font-mono text-[#E7C59F]/70">
                              ID: {mem.studentId}
                            </span>
                          )}
                        </div>

                        <h3 className="text-base sm:text-lg font-serif font-bold text-[#F5E6D3]">
                          {mem.name}
                        </h3>

                        {mem.department && (
                          <p className="text-xs text-[#E7C59F]/80 font-light">
                            {mem.department}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 self-end lg:self-center shrink-0 border-t lg:border-t-0 pt-3 lg:pt-0 w-full lg:w-auto justify-end border-[#6B3B23]">
                      <button
                        onClick={() => openEditMember(mem)}
                        className="px-3.5 py-2 rounded-xl bg-[#D98C5B] hover:bg-[#E79E70] text-[#23120A] text-xs font-mono font-bold flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>

                      <button
                        onClick={() =>
                          setDeleteConfirmItem({
                            id: mem.id,
                            title: mem.name,
                            type: "members",
                          })
                        }
                        className="p-2 rounded-xl bg-[#23120A] hover:bg-red-950/60 border border-[#6B3B23] hover:border-red-500/50 text-[#E7C59F] hover:text-red-400 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </main>
      </div>

      {/* ==================================================================== */}
      {/* EDIT / CREATE MODAL */}
      {/* ==================================================================== */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-2xl bg-[#4E2E1E] border border-[#6B3B23] rounded-3xl p-6 sm:p-8 shadow-2xl relative my-8 overflow-hidden">
            <div className="flex items-center justify-between pb-4 border-b border-[#6B3B23] mb-6">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#D98C5B] font-bold block">
                  {modalMode === "create" ? "Add New Record" : "Edit Database Record"}
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#F5E6D3]">
                  {editingItemType === "past" && "Past Event Details"}
                  {editingItemType === "upcoming" && "Upcoming Event Details"}
                  {editingItemType === "winners" && "Winner Details"}
                  {editingItemType === "members" && "Club Member Details"}
                </h3>
              </div>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="p-2 rounded-xl bg-[#23120A] text-[#E7C59F] hover:text-[#F5E6D3] border border-[#6B3B23] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* FORM FOR PAST / UPCOMING EVENTS */}
            {(editingItemType === "past" || editingItemType === "upcoming") && (
              <form
                onSubmit={editingItemType === "past" ? handleSavePastEvent : handleSaveUpcomingEvent}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-mono uppercase text-[#E7C59F] mb-1.5">
                      Event Title *
                    </label>
                    <input
                      type="text"
                      value={eventForm.title || ""}
                      onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                      placeholder="e.g. NATYA PRAVAHA DANCE FESTIVAL"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#23120A] border border-[#6B3B23] text-sm text-[#F5E6D3] focus:border-[#D98C5B] focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-[#E7C59F] mb-1.5">
                      Date *
                    </label>
                    <input
                      type="text"
                      value={eventForm.date || ""}
                      onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                      placeholder="e.g. 14 AUGUST 2026"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#23120A] border border-[#6B3B23] text-sm text-[#F5E6D3] focus:border-[#D98C5B] focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-[#E7C59F] mb-1.5">
                      Venue
                    </label>
                    <input
                      type="text"
                      value={eventForm.venue || ""}
                      onChange={(e) => setEventForm({ ...eventForm, venue: e.target.value })}
                      placeholder="e.g. Main University Auditorium"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#23120A] border border-[#6B3B23] text-sm text-[#F5E6D3] focus:border-[#D98C5B] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-[#E7C59F] mb-1.5">
                      Category
                    </label>
                    <input
                      type="text"
                      value={eventForm.category || ""}
                      onChange={(e) => setEventForm({ ...eventForm, category: e.target.value })}
                      placeholder="e.g. Classical Dance"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#23120A] border border-[#6B3B23] text-sm text-[#F5E6D3] focus:border-[#D98C5B] focus:outline-none"
                    />
                  </div>

                  {editingItemType === "upcoming" && (
                    <div>
                      <label className="block text-xs font-mono uppercase text-[#E7C59F] mb-1.5">
                        Time
                      </label>
                      <input
                        type="text"
                        value={eventForm.time || ""}
                        onChange={(e) => setEventForm({ ...eventForm, time: e.target.value })}
                        placeholder="e.g. 6:00 PM IST"
                        className="w-full px-4 py-2.5 rounded-xl bg-[#23120A] border border-[#6B3B23] text-sm text-[#F5E6D3] focus:border-[#D98C5B] focus:outline-none"
                      />
                    </div>
                  )}

                  {editingItemType === "past" && (
                    <div>
                      <label className="block text-xs font-mono uppercase text-[#E7C59F] mb-1.5">
                        Video / Reel URL
                      </label>
                      <input
                        type="text"
                        value={eventForm.videoUrl || ""}
                        onChange={(e) => setEventForm({ ...eventForm, videoUrl: e.target.value })}
                        placeholder="e.g. https://.../video.mp4"
                        className="w-full px-4 py-2.5 rounded-xl bg-[#23120A] border border-[#6B3B23] text-sm text-[#F5E6D3] focus:border-[#D98C5B] focus:outline-none"
                      />
                    </div>
                  )}

                  <div className="sm:col-span-2">
                    <ImageUploadField
                      label="Event Cover Image"
                      value={eventForm.image || ""}
                      onChange={(newUrl) => setEventForm({ ...eventForm, image: newUrl })}
                      folder="events"
                      presets={IMAGE_PRESETS[editingItemType]}
                      aspectRatio="landscape"
                      helperText="Upload event cover image. Directly uploaded to Supabase Storage and stored in database."
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-mono uppercase text-[#E7C59F] mb-1.5">
                      Description *
                    </label>
                    <textarea
                      rows={4}
                      value={eventForm.description || ""}
                      onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                      placeholder="Full summary of the event..."
                      className="w-full px-4 py-2.5 rounded-xl bg-[#23120A] border border-[#6B3B23] text-sm text-[#F5E6D3] focus:border-[#D98C5B] focus:outline-none"
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#6B3B23]">
                  <button
                    type="button"
                    onClick={() => setIsEditModalOpen(false)}
                    className="px-5 py-2.5 rounded-xl bg-[#23120A] text-[#E7C59F] hover:text-[#F5E6D3] border border-[#6B3B23] text-xs font-mono cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="px-6 py-2.5 rounded-xl bg-[#D98C5B] hover:bg-[#E79E70] text-[#23120A] font-bold text-xs font-mono tracking-wide uppercase transition-all shadow-md cursor-pointer flex items-center gap-2"
                  >
                    {isSaving && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
                    <span>{isSaving ? "Saving to Supabase..." : "Save Changes"}</span>
                  </button>
                </div>
              </form>
            )}

            {/* FORM FOR WINNERS */}
            {editingItemType === "winners" && (
              <form onSubmit={handleSaveWinner} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-[#E7C59F] mb-1.5">
                      Winner Name *
                    </label>
                    <input
                      type="text"
                      value={winnerForm.name || ""}
                      onChange={(e) => setWinnerForm({ ...winnerForm, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#23120A] border border-[#6B3B23] text-sm text-[#F5E6D3] focus:border-[#D98C5B] focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-[#E7C59F] mb-1.5">
                      Competition Event *
                    </label>
                    <input
                      type="text"
                      value={winnerForm.eventName || ""}
                      onChange={(e) => setWinnerForm({ ...winnerForm, eventName: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#23120A] border border-[#6B3B23] text-sm text-[#F5E6D3] focus:border-[#D98C5B] focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-[#E7C59F] mb-1.5">
                      Position *
                    </label>
                    <input
                      type="text"
                      value={winnerForm.position || ""}
                      onChange={(e) => setWinnerForm({ ...winnerForm, position: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#23120A] border border-[#6B3B23] text-sm text-[#F5E6D3] focus:border-[#D98C5B] focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-[#E7C59F] mb-1.5">
                      Date
                    </label>
                    <input
                      type="text"
                      value={winnerForm.date || ""}
                      onChange={(e) => setWinnerForm({ ...winnerForm, date: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#23120A] border border-[#6B3B23] text-sm text-[#F5E6D3] focus:border-[#D98C5B] focus:outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-mono uppercase text-[#E7C59F] mb-1.5">
                      Prize / Achievement Distinction
                    </label>
                    <input
                      type="text"
                      value={winnerForm.prizeOrAchievement || ""}
                      onChange={(e) =>
                        setWinnerForm({ ...winnerForm, prizeOrAchievement: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-[#23120A] border border-[#6B3B23] text-sm text-[#F5E6D3] focus:border-[#D98C5B] focus:outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <ImageUploadField
                      label="Winner Photograph / Trophy Image"
                      value={winnerForm.photo || ""}
                      onChange={(newUrl) => setWinnerForm({ ...winnerForm, photo: newUrl })}
                      folder="winners"
                      presets={IMAGE_PRESETS.winners}
                      aspectRatio="portrait"
                      helperText="Upload portrait of the winner or award ceremony photo."
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#6B3B23]">
                  <button
                    type="button"
                    onClick={() => setIsEditModalOpen(false)}
                    className="px-5 py-2.5 rounded-xl bg-[#23120A] text-[#E7C59F] border border-[#6B3B23] text-xs font-mono"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="px-6 py-2.5 rounded-xl bg-[#D98C5B] text-[#23120A] font-bold text-xs font-mono uppercase"
                  >
                    {isSaving ? "Saving..." : "Save Winner"}
                  </button>
                </div>
              </form>
            )}

            {/* FORM FOR MEMBERS */}
            {editingItemType === "members" && (
              <form onSubmit={handleSaveMember} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-[#E7C59F] mb-1.5">
                      Member Name *
                    </label>
                    <input
                      type="text"
                      value={memberForm.name || ""}
                      onChange={(e) => setMemberForm({ ...memberForm, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#23120A] border border-[#6B3B23] text-sm text-[#F5E6D3] focus:border-[#D98C5B] focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-[#E7C59F] mb-1.5">
                      Role / Title *
                    </label>
                    <input
                      type="text"
                      value={memberForm.role || ""}
                      onChange={(e) => setMemberForm({ ...memberForm, role: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#23120A] border border-[#6B3B23] text-sm text-[#F5E6D3] focus:border-[#D98C5B] focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-[#E7C59F] mb-1.5">
                      Student ID
                    </label>
                    <input
                      type="text"
                      value={memberForm.studentId || ""}
                      onChange={(e) => setMemberForm({ ...memberForm, studentId: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#23120A] border border-[#6B3B23] text-sm text-[#F5E6D3] focus:border-[#D98C5B] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-[#E7C59F] mb-1.5">
                      Council / Department
                    </label>
                    <input
                      type="text"
                      list="council-department-suggestions"
                      value={memberForm.department || ""}
                      onChange={(e) => setMemberForm({ ...memberForm, department: e.target.value })}
                      placeholder="e.g. Finance & Sponsorships"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#23120A] border border-[#6B3B23] text-sm text-[#F5E6D3] focus:border-[#D98C5B] focus:outline-none"
                    />
                    <datalist id="council-department-suggestions">
                      <option value="Executive Leadership" />
                      <option value="Finance & Sponsorships" />
                      <option value="Event Management" />
                      <option value="Social Media & Design" />
                      <option value="Club Verticals" />
                      <option value="Public Relations & Media" />
                      <option value="Operations & Production" />
                    </datalist>
                  </div>

                  <div className="sm:col-span-2 flex items-center gap-3 py-1">
                    <label className="relative flex items-center gap-2.5 cursor-pointer text-xs font-mono text-[#E7C59F]">
                      <input
                        type="checkbox"
                        checked={Boolean(memberForm.isLeadership)}
                        onChange={(e) => setMemberForm({ ...memberForm, isLeadership: e.target.checked })}
                        className="w-4 h-4 rounded bg-[#23120A] border-[#6B3B23] text-[#D98C5B] focus:ring-0 cursor-pointer"
                      />
                      <span className="font-semibold text-[#F5E6D3]">
                        Executive Directorate / Council Head
                      </span>
                    </label>
                  </div>

                  <div className="sm:col-span-2">
                    <ImageUploadField
                      label="Member Profile Photo"
                      value={memberForm.photo || ""}
                      onChange={(newUrl) => setMemberForm({ ...memberForm, photo: newUrl })}
                      folder="members"
                      presets={IMAGE_PRESETS.members}
                      aspectRatio="portrait"
                      helperText="Upload member portrait. Replacing this image automatically deletes the old file from Supabase Storage."
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#6B3B23]">
                  <button
                    type="button"
                    onClick={() => setIsEditModalOpen(false)}
                    className="px-5 py-2.5 rounded-xl bg-[#23120A] text-[#E7C59F] border border-[#6B3B23] text-xs font-mono"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="px-6 py-2.5 rounded-xl bg-[#D98C5B] text-[#23120A] font-bold text-xs font-mono uppercase"
                  >
                    {isSaving ? "Saving..." : "Save Member"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* DELETE CONFIRMATION DIALOG */}
      {/* ==================================================================== */}
      {deleteConfirmItem && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#4E2E1E] border border-red-500/40 rounded-3xl p-6 shadow-2xl relative text-center">
            <div className="w-14 h-14 rounded-2xl bg-red-950/60 border border-red-500/40 mx-auto flex items-center justify-center mb-4 text-red-400">
              <Trash2 className="w-7 h-7" />
            </div>

            <h3 className="text-xl font-serif font-bold text-[#F5E6D3] mb-2">
              Confirm Delete Record
            </h3>
            <p className="text-xs text-[#E7C59F] mb-6 leading-relaxed">
              Are you sure you want to permanently delete{" "}
              <strong className="text-[#F5E6D3]">&quot;{deleteConfirmItem.title}&quot;</strong>? This
              will remove the row from Supabase and the website immediately.
            </p>

            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setDeleteConfirmItem(null)}
                className="px-5 py-2.5 rounded-xl bg-[#23120A] text-[#E7C59F] border border-[#6B3B23] text-xs font-mono cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={executeDelete}
                className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs font-mono uppercase shadow-lg shadow-red-600/30 cursor-pointer"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* SUPABASE SCHEMA SQL MODAL */}
      {/* ==================================================================== */}
      {showSqlModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-3xl bg-[#4E2E1E] border border-[#6B3B23] rounded-3xl p-6 sm:p-8 shadow-2xl relative max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between pb-4 border-b border-[#6B3B23] mb-4">
              <div>
                <span className="text-[10px] font-mono uppercase text-[#D98C5B] font-bold block">
                  Supabase Database Setup
                </span>
                <h3 className="text-xl font-serif font-bold text-[#F5E6D3]">
                  SQL Migration Script (events, winners, club_members)
                </h3>
              </div>
              <button
                onClick={() => setShowSqlModal(false)}
                className="p-2 rounded-xl bg-[#23120A] text-[#E7C59F] border border-[#6B3B23]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-[#E7C59F] mb-3 leading-relaxed">
              Copy this script and run it once in your Supabase SQL Editor (
              <a
                href="https://supabase.com/dashboard/project/godwvqxsswltgmbzlrdr/sql"
                target="_blank"
                rel="noreferrer"
                className="text-[#D98C5B] underline"
              >
                open dashboard
              </a>
              ) to create the tables:
            </p>

            <pre className="flex-1 overflow-y-auto p-4 rounded-xl bg-[#23120A] border border-[#6B3B23] text-[11px] font-mono text-[#E7C59F] whitespace-pre-wrap leading-relaxed select-all">
              {SUPABASE_SCHEMA_SQL}
            </pre>

            <div className="flex items-center justify-between pt-4 mt-4 border-t border-[#6B3B23]">
              <span className="text-xs font-mono text-[#E7C59F]/70">
                Creates: events, winners, club_members + RLS policies
              </span>
              <button
                onClick={copySqlToClipboard}
                className="px-5 py-2.5 rounded-xl bg-[#D98C5B] hover:bg-[#E79E70] text-[#23120A] font-bold text-xs font-mono uppercase flex items-center gap-2 cursor-pointer shadow-md"
              >
                {copiedSql ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copiedSql ? "Copied SQL!" : "Copy SQL Script"}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
