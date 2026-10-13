"use client";

import React, { useState, useEffect, useMemo } from "react";
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
  ExternalLink,
} from "lucide-react";

export function ClubMembersListClient() {
  const [members, setMembers] = useState<CouncilMember[]>(allClubMembers);

  const load = async () => {
    try {
      const live = await getClubMembers();
      if (Array.isArray(live)) {
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

  // The Club Heads
  const clubHeads = useMemo(() => {
    return councils
      .map((c) => ({
        council: c,
        head: c.head,
      }))
      .filter((item): item is { council: CouncilGroup; head: CouncilMember } => Boolean(item.head));
  }, [councils]);

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
        </div>

        {/* Page Heading */}
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest text-[#D98C5B] bg-[#4E2E1E] border border-[#6B3B23] mb-4">
            <Shield className="w-3.5 h-3.5" />
            <span>Performing Arts Council Directorate · 2026-27</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#F5E6D3] tracking-tight">
            Council Leadership & Club Heads
          </h1>
          <p className="mt-3 text-sm md:text-base text-[#E7C59F]/80 font-sans leading-relaxed">
            Meet our executive leadership and department directors. Click on any Club Head below
            to open their dedicated department team page.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* 1. TOP TIER: PRESIDENT & VICE PRESIDENT ONLY                              */}
        {/* ========================================================================= */}
        <div className="mb-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#4E2E1E]/80 to-[#23120A] border-2 border-[#8B4513] shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-1/4 w-72 h-72 bg-[#D98C5B]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[11px] font-mono uppercase tracking-widest text-[#F5E6D3] bg-[#8B4513] border border-[#D98C5B]/50 mb-2 font-bold shadow-md">
              <Crown className="w-3.5 h-3.5 text-[#F5E6D3]" />
              <span>Executive Directorate</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#F5E6D3]">
              President & Vice President
            </h2>
            <p className="text-xs font-mono text-[#E7C59F]/70 mt-1">
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

        {/* ========================================================================= */}
        {/* 2. CLUB HEADS (Each links directly to their dedicated team page)           */}
        {/* ========================================================================= */}
        <div className="mb-10">
          <div className="mb-8 text-center max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#F5E6D3]">
              Club Heads
            </h2>
            <p className="text-xs sm:text-sm text-[#E7C59F]/80 font-sans mt-1.5">
              Click any Club Head below to visit their dedicated team page and view all members in their department.
            </p>
          </div>

          {/* Grid of the Club Heads */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 sm:gap-6">
            {clubHeads.map(({ council, head }) => {
              const memberCount = council.members.length;
              const targetRoute = council.route || "/club-members";

              return (
                <div key={head.id} className="flex flex-col">
                  {/* Badge indicating Head Role & Department */}
                  <div className="mb-2 flex items-center justify-between px-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#D98C5B] font-bold">
                      {council.shortName}
                    </span>
                    <span className="text-[10px] font-mono text-[#E7C59F]/70 bg-[#23120A] px-2 py-0.5 rounded-full border border-[#6B3B23]">
                      {memberCount} {memberCount === 1 ? "member" : "members"}
                    </span>
                  </div>

                  {/* Direct Link to Dedicated Team Page */}
                  <Link
                    href={targetRoute}
                    className="block group h-full no-underline transition-transform hover:-translate-y-1 duration-200"
                  >
                    <CouncilMemberCard
                      member={head}
                      actionLabel={`View ${council.shortName} Team (${memberCount})`}
                    />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </main>
  );
}
