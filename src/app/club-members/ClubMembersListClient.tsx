"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { CouncilMemberCard } from "@/components/members/CouncilMemberCard";
import { getClubMembers } from "@/lib/dataService";
import { CouncilMember, CouncilGroup } from "@/types";
import { allClubMembers, buildCouncilsHierarchy } from "@/data/members";
import {
  ArrowLeft,
  Plus,
  Shield,
  Crown,
  Users,
  Sparkles,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  X,
  ArrowRight,
  Info,
} from "lucide-react";

export function ClubMembersListClient() {
  const [members, setMembers] = useState<CouncilMember[]>(allClubMembers);
  const [selectedHeadId, setSelectedHeadId] = useState<string | null>(null);
  const departmentSectionRef = useRef<HTMLDivElement>(null);

  const load = async () => {
    try {
      const live = await getClubMembers();
      if (live && live.length > 0) {
        setMembers(live);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    load();
    const handleUpdate = () => load();
    window.addEventListener("pac-data-updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      window.removeEventListener("pac-data-updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  // Build the hierarchical organization tree from the live members list
  const hierarchy = useMemo(() => {
    return buildCouncilsHierarchy(members);
  }, [members]);

  const { executiveLeadership, councils } = hierarchy;

  // The 5 Club Heads
  const clubHeads = useMemo(() => {
    return councils
      .map((c) => ({
        council: c,
        head: c.head,
      }))
      .filter((item): item is { council: CouncilGroup; head: CouncilMember } => Boolean(item.head));
  }, [councils]);

  // Active selected head and their department
  const activeSelection = useMemo(() => {
    if (!selectedHeadId) return null;
    return clubHeads.find((h) => h.head.id === selectedHeadId) || null;
  }, [selectedHeadId, clubHeads]);

  const handleHeadClick = (headId: string) => {
    if (selectedHeadId === headId) {
      // Toggle off if already selected
      setSelectedHeadId(null);
    } else {
      setSelectedHeadId(headId);
      // Smooth scroll into department view on mobile
      setTimeout(() => {
        departmentSectionRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }, 100);
    }
  };

  return (
    <main className="flex-1 w-full pt-28 pb-20 md:pt-36 md:pb-28">
      <Container size="wide">
        {/* Navigation Breadcrumb Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#D98C5B] hover:text-[#E79E70] transition-colors group px-3.5 py-1.5 rounded-full bg-[#4E2E1E] border border-[#6B3B23]"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to Home</span>
          </Link>

          <Link
            href="/admin"
            className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#D98C5B] hover:text-[#23120A] hover:bg-[#D98C5B] transition-all px-3.5 py-1.5 rounded-full bg-[#4E2E1E] border border-[#6B3B23]"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Manage Roster & Upload in Admin</span>
          </Link>
        </div>

        {/* Page Heading */}
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-sans uppercase tracking-widest text-[#D98C5B] bg-[#4E2E1E] border border-[#6B3B23] mb-4">
            <Shield className="w-3.5 h-3.5" />
            <span>Performing Arts Council Directorate · 2026-27</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#F5E6D3] tracking-tight">
            Council Leadership & Club Heads
          </h1>
          <p className="mt-3 text-sm md:text-base text-[#E7C59F]/80 font-sans leading-relaxed">
            Meet our executive leadership and department heads. Click on any Club Head below
            to view the members working in that department.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* 1. TOP TIER: PRESIDENT & VICE PRESIDENT ONLY                              */}
        {/* ========================================================================= */}
        <div className="mb-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#4E2E1E]/80 to-[#23120A] border-2 border-[#8B4513] shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-1/4 w-72 h-72 bg-[#D98C5B]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[11px] font-sans uppercase tracking-widest text-[#F5E6D3] bg-[#8B4513] border border-[#D98C5B]/50 mb-2 font-bold shadow-md">
              <Crown className="w-3.5 h-3.5 text-[#F5E6D3]" />
              <span>Executive Directorate</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#F5E6D3]">
              President & Vice President
            </h2>
            <p className="text-xs font-sans text-[#E7C59F]/70 mt-1">
              Guiding council governance, proscenium staging, and student arts leadership
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* President Card */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#D98C5B] to-[#8B4513] rounded-2xl blur-xs opacity-75 group-hover:opacity-100 transition duration-300" />
              <div className="relative">
                <div className="absolute top-3 right-3 z-10">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-mono uppercase font-bold tracking-wider bg-[#D98C5B] text-[#23120A] shadow-md">
                    Council President
                  </span>
                </div>
                <CouncilMemberCard member={executiveLeadership.president} />
              </div>
            </div>

            {/* Vice President Card */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#8B4513] to-[#D98C5B] rounded-2xl blur-xs opacity-75 group-hover:opacity-100 transition duration-300" />
              <div className="relative">
                <div className="absolute top-3 right-3 z-10">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-mono uppercase font-bold tracking-wider bg-[#8B4513] text-[#F5E6D3] border border-[#D98C5B]/40 shadow-md">
                    Vice President
                  </span>
                </div>
                <CouncilMemberCard member={executiveLeadership.vicePresident} />
              </div>
            </div>
          </div>
        </div>

        {/* Visual Connector Stem */}
        <div className="flex flex-col items-center justify-center my-6">
          <div className="w-0.5 h-8 bg-gradient-to-b from-[#8B4513] to-[#D98C5B]" />
          <div className="px-3.5 py-1 rounded-full bg-[#4E2E1E] border border-[#D98C5B] text-[10px] font-mono uppercase text-[#D98C5B] tracking-widest font-semibold shadow-md flex items-center gap-1.5">
            <Users className="w-3 h-3" />
            <span>Club Department Heads</span>
          </div>
          <div className="w-0.5 h-8 bg-gradient-to-b from-[#D98C5B] to-[#8B4513]" />
        </div>

        {/* ========================================================================= */}
        {/* 2. CLUB HEADS ONLY (Clickable to reveal Department Members)                */}
        {/* ========================================================================= */}
        <div className="mb-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 mb-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#F5E6D3]">
                Club Heads
              </h2>
              <p className="text-xs font-sans text-[#E7C59F]/80 mt-0.5">
                Click any Head below to explore and view the members in their department
              </p>
            </div>

            {selectedHeadId && (
              <button
                type="button"
                onClick={() => setSelectedHeadId(null)}
                className="inline-flex items-center gap-1.5 text-xs font-sans text-[#D98C5B] hover:text-[#E79E70] px-3 py-1.5 rounded-full bg-[#4E2E1E] border border-[#6B3B23] transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
                <span>Collapse Department</span>
              </button>
            )}
          </div>

          {/* Grid of the 5 Club Heads */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 sm:gap-6">
            {clubHeads.map(({ council, head }) => {
              const isSelected = selectedHeadId === head.id;
              const memberCount = council.members.length;

              return (
                <div key={head.id} className="flex flex-col">
                  {/* Badge indicating Head Role & Department */}
                  <div className="mb-2 flex items-center justify-between px-1">
                    <span className="text-[10px] font-sans uppercase tracking-wider text-[#D98C5B] font-bold">
                      {council.shortName}
                    </span>
                    <span className="text-[10px] font-sans text-[#E7C59F]/70 bg-[#23120A] px-2 py-0.5 rounded-full border border-[#6B3B23]">
                      {memberCount} {memberCount === 1 ? "member" : "members"}
                    </span>
                  </div>

                  {/* Interactive Card */}
                  <CouncilMemberCard
                    member={head}
                    onClick={() => handleHeadClick(head.id)}
                    isActive={isSelected}
                    actionLabel={
                      isSelected
                        ? "Viewing Members"
                        : `View ${council.shortName} (${memberCount})`
                    }
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. REVEALED DEPARTMENT MEMBERS (Shown ONLY when a Head is clicked)        */}
        {/* ========================================================================= */}
        <div ref={departmentSectionRef}>
          {activeSelection ? (
            <div className="mt-8 p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#4E2E1E]/90 to-[#23120A] border-2 border-[#D98C5B]/60 shadow-2xl relative overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300">
              {/* Header of Active Department */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-8 border-b border-[#6B3B23]">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-sans uppercase text-[#D98C5B] font-bold mb-1">
                    <Crown className="w-3.5 h-3.5" />
                    <span>
                      {activeSelection.council.badge} · Head: {activeSelection.head.name}
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#F5E6D3]">
                    {activeSelection.council.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#E7C59F]/80 font-sans mt-1 max-w-2xl">
                    {activeSelection.council.description}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  {activeSelection.council.route && (
                    <Link
                      href={activeSelection.council.route}
                      className="inline-flex items-center gap-1.5 text-xs font-sans uppercase tracking-wider text-[#23120A] bg-[#D98C5B] hover:bg-[#E79E70] transition-colors px-3.5 py-1.5 rounded-xl font-bold"
                    >
                      <span>Dedicated Team Page</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                  )}

                  <button
                    type="button"
                    onClick={() => setSelectedHeadId(null)}
                    className="p-1.5 rounded-xl bg-[#23120A] text-[#E7C59F] hover:text-[#F5E6D3] border border-[#6B3B23] transition-colors cursor-pointer"
                    title="Close department members"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Members in this Department */}
              {activeSelection.council.members.length > 0 ? (
                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-xs font-mono uppercase tracking-widest text-[#E7C59F] flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[#D98C5B]" />
                      <span>
                        Department Members ({activeSelection.council.members.length})
                      </span>
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
                    {activeSelection.council.members.map((member) => (
                      <div key={member.id} className="w-full max-w-sm">
                        <CouncilMemberCard member={member} />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 bg-[#23120A]/60 rounded-2xl border border-[#6B3B23]">
                  <p className="text-xs font-mono text-[#E7C59F]">
                    All responsibilities in this department are coordinated directly by {activeSelection.head.name}.
                  </p>
                </div>
              )}
            </div>
          ) : (
            /* Subtle Help Hint when no Head is selected yet */
            <div className="text-center py-6 px-4 bg-[#4E2E1E]/30 rounded-2xl border border-[#6B3B23]/60 max-w-lg mx-auto">
              <p className="text-xs font-mono text-[#E7C59F]/70 flex items-center justify-center gap-2">
                <Info className="w-4 h-4 text-[#D98C5B]" />
                <span>
                  Click any Club Head above to reveal the student members in that department.
                </span>
              </p>
            </div>
          )}
        </div>
      </Container>
    </main>
  );
}
