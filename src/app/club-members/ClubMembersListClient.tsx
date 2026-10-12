"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
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
  ChevronRight,
  Layers,
  ArrowRight,
} from "lucide-react";

export function ClubMembersListClient() {
  const [members, setMembers] = useState<CouncilMember[]>(allClubMembers);
  const [selectedCouncilId, setSelectedCouncilId] = useState<string>("all");

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

  // Active filtered council (if one is selected)
  const activeCouncil = useMemo(() => {
    if (selectedCouncilId === "all") return null;
    return councils.find((c) => c.id === selectedCouncilId) || null;
  }, [selectedCouncilId, councils]);

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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest text-[#D98C5B] bg-[#4E2E1E] border border-[#6B3B23] mb-4">
            <Shield className="w-3.5 h-3.5" />
            <span>Performing Arts Council Directorate · 2026-27</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#F5E6D3] tracking-tight">
            Club Members & Council Directorate
          </h1>
          <p className="mt-3 text-sm md:text-base text-[#E7C59F]/80 font-sans leading-relaxed">
            Organized hierarchy of our executive leadership, department heads, and
            specialized student members powering stage productions, acoustics, and finance.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* LEVEL 1: TOP EXECUTIVE LEADERSHIP (President & Vice President)             */}
        {/* ========================================================================= */}
        <div className="mb-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#4E2E1E]/80 to-[#23120A] border-2 border-[#8B4513] shadow-2xl relative overflow-hidden">
          {/* Subtle glow */}
          <div className="absolute top-0 right-1/4 w-72 h-72 bg-[#D98C5B]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-widest text-[#F5E6D3] bg-[#8B4513] border border-[#D98C5B]/50 mb-2 font-bold shadow-md">
              <Crown className="w-3.5 h-3.5 text-[#F5E6D3]" />
              <span>Executive Directorate (Top Leadership)</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#F5E6D3]">
              President & Vice President
            </h2>
            <p className="text-xs font-mono text-[#E7C59F]/70 mt-1">
              Directing council governance, proscenium staging standards, and inter-collegiate artistic prestige
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

        {/* Visual Connecting Stem */}
        <div className="flex flex-col items-center justify-center my-6">
          <div className="w-0.5 h-8 bg-gradient-to-b from-[#8B4513] to-[#D98C5B]" />
          <div className="px-3 py-1 rounded-full bg-[#4E2E1E] border border-[#D98C5B] text-[10px] font-mono uppercase text-[#D98C5B] tracking-widest font-semibold shadow-md">
            Council Wings & Verticals
          </div>
          <div className="w-0.5 h-8 bg-gradient-to-b from-[#D98C5B] to-[#8B4513]" />
        </div>

        {/* ========================================================================= */}
        {/* INTERACTIVE COUNCIL SELECTOR TABS                                          */}
        {/* ========================================================================= */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-3 px-1">
            <span className="text-xs font-mono uppercase tracking-wider text-[#E7C59F]">
              Select Council to View Head & Members:
            </span>
            {selectedCouncilId !== "all" && (
              <button
                type="button"
                onClick={() => setSelectedCouncilId("all")}
                className="text-xs font-mono text-[#D98C5B] hover:text-[#E79E70] underline cursor-pointer"
              >
                View All Councils
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2.5 p-2 rounded-2xl bg-[#4E2E1E]/60 border border-[#6B3B23]">
            <button
              type="button"
              onClick={() => setSelectedCouncilId("all")}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all cursor-pointer font-semibold ${
                selectedCouncilId === "all"
                  ? "bg-[#D98C5B] text-[#23120A] shadow-md font-bold"
                  : "bg-[#23120A] text-[#E7C59F] hover:text-[#F5E6D3] hover:bg-[#351C11] border border-[#6B3B23]"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>All Councils ({members.length})</span>
            </button>

            {councils.map((council) => {
              const count = (council.head ? 1 : 0) + council.members.length;
              const isSelected = selectedCouncilId === council.id;

              return (
                <button
                  key={council.id}
                  type="button"
                  onClick={() => setSelectedCouncilId(council.id)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all cursor-pointer font-semibold ${
                    isSelected
                      ? "bg-[#D98C5B] text-[#23120A] shadow-md font-bold"
                      : "bg-[#23120A] text-[#E7C59F] hover:text-[#F5E6D3] hover:bg-[#351C11] border border-[#6B3B23]"
                  }`}
                >
                  <span>{council.shortName}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                      isSelected
                        ? "bg-[#23120A] text-[#D98C5B]"
                        : "bg-[#4E2E1E] text-[#E7C59F]"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* VIEW A: SINGLE COUNCIL DRILL-DOWN (HEAD ON TOP, MEMBERS BELOW)            */}
        {/* ========================================================================= */}
        {activeCouncil && (
          <div className="space-y-12 animate-in fade-in duration-300">
            {/* Council Header Card */}
            <div className="p-6 md:p-8 rounded-2xl bg-[#4E2E1E]/80 border border-[#8B4513] flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase text-[#D98C5B] font-bold mb-1">
                  <Shield className="w-3.5 h-3.5" />
                  <span>{activeCouncil.badge}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#F5E6D3]">
                  {activeCouncil.name}
                </h2>
                <p className="text-xs md:text-sm text-[#E7C59F]/80 font-sans mt-1 max-w-2xl">
                  {activeCouncil.description}
                </p>
              </div>

              {activeCouncil.route && (
                <Link
                  href={activeCouncil.route}
                  className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#D98C5B] hover:text-[#23120A] hover:bg-[#D98C5B] transition-all px-4 py-2 rounded-xl bg-[#23120A] border border-[#6B3B23] shrink-0 font-bold"
                >
                  <span>Dedicated Team Page</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>

            {/* LEVEL 2: COUNCIL HEAD */}
            {activeCouncil.head && (
              <div className="flex flex-col items-center">
                <div className="mb-3 text-center">
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-mono uppercase tracking-widest text-[#23120A] bg-[#D98C5B] font-bold shadow-md">
                    <Crown className="w-3.5 h-3.5" />
                    <span>Council Head</span>
                  </span>
                  <p className="text-[11px] font-mono text-[#E7C59F]/70 mt-1">
                    Directing {activeCouncil.shortName} Operations & Strategy
                  </p>
                </div>

                <div className="w-full max-w-sm">
                  <CouncilMemberCard member={activeCouncil.head} />
                </div>

                {/* Connecting branch down to members */}
                {activeCouncil.members.length > 0 && (
                  <div className="flex flex-col items-center my-6">
                    <div className="w-0.5 h-10 bg-gradient-to-b from-[#D98C5B] to-[#8B4513]" />
                    <div className="px-3 py-0.5 rounded-full bg-[#4E2E1E] border border-[#6B3B23] text-[10px] font-mono uppercase text-[#E7C59F]">
                      Council Members ({activeCouncil.members.length})
                    </div>
                    <div className="w-0.5 h-8 bg-gradient-to-b from-[#8B4513] to-transparent" />
                  </div>
                )}
              </div>
            )}

            {/* LEVEL 3: COUNCIL MEMBERS */}
            {activeCouncil.members.length > 0 ? (
              <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 justify-items-center">
                  {activeCouncil.members.map((member) => (
                    <div key={member.id} className="w-full max-w-sm">
                      <CouncilMemberCard member={member} />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-10 bg-[#4E2E1E]/30 rounded-2xl border border-[#6B3B23] max-w-md mx-auto">
                <p className="text-xs font-mono text-[#E7C59F]">
                  All responsibilities in this council are coordinated directly by the Council Head.
                </p>
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW B: ALL COUNCILS (FULL TREE HIERARCHY)                                */}
        {/* ========================================================================= */}
        {selectedCouncilId === "all" && (
          <div className="space-y-16">
            {councils.map((council) => {
              return (
                <div
                  key={council.id}
                  id={`council-${council.id}`}
                  className="p-6 sm:p-8 rounded-3xl bg-[#4E2E1E]/40 border border-[#6B3B23] hover:border-[#D98C5B]/40 transition-colors"
                >
                  {/* Council Title Row */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-6 mb-8 border-b border-[#6B3B23]">
                    <div>
                      <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase text-[#D98C5B] font-bold mb-1">
                        <Shield className="w-3 h-3" />
                        <span>{council.badge}</span>
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#F5E6D3]">
                        {council.name}
                      </h3>
                      <p className="text-xs md:text-sm text-[#E7C59F]/80 font-sans mt-0.5 max-w-2xl">
                        {council.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setSelectedCouncilId(council.id)}
                        className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#23120A] bg-[#D98C5B] hover:bg-[#E79E70] transition-colors px-3.5 py-1.5 rounded-xl font-bold cursor-pointer"
                      >
                        <span>Focus on {council.shortName}</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>

                      {council.route && (
                        <Link
                          href={council.route}
                          className="p-2 rounded-xl bg-[#23120A] text-[#E7C59F] hover:text-[#F5E6D3] border border-[#6B3B23] transition-colors"
                          title={`Open ${council.name} dedicated page`}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                      )}
                    </div>
                  </div>

                  {/* Hierarchical Structure: Head First, Members Below */}
                  <div className="w-full flex flex-col items-center">
                    {/* Council Head */}
                    {council.head && (
                      <div className="w-full flex flex-col items-center mb-6">
                        <div className="mb-3 text-center">
                          <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full text-[11px] font-mono uppercase tracking-widest text-[#23120A] bg-[#D98C5B] font-bold shadow-sm">
                            <Crown className="w-3 h-3" />
                            <span>Council Head</span>
                          </span>
                        </div>
                        <div className="w-full max-w-sm">
                          <CouncilMemberCard member={council.head} />
                        </div>

                        {/* Connector down to members */}
                        {council.members.length > 0 && (
                          <div className="flex flex-col items-center my-4">
                            <div className="w-0.5 h-6 bg-gradient-to-b from-[#D98C5B] to-[#8B4513]" />
                            <div className="px-2.5 py-0.5 rounded-full bg-[#23120A] border border-[#6B3B23] text-[10px] font-mono uppercase text-[#E7C59F]/80">
                              Council Members ({council.members.length})
                            </div>
                            <div className="w-0.5 h-4 bg-gradient-to-b from-[#8B4513] to-transparent" />
                          </div>
                        )}
                      </div>
                    )}

                    {/* Council Members Grid */}
                    {council.members.length > 0 ? (
                      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 justify-items-center">
                        {council.members.map((member) => (
                          <div key={member.id} className="w-full max-w-sm">
                            <CouncilMemberCard member={member} />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-4 text-xs font-mono text-[#E7C59F]/60">
                        Council directed by Head
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Container>
    </main>
  );
}
