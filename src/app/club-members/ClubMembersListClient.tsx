"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CouncilMemberCard } from "@/components/members/CouncilMemberCard";
import { getClubMembers } from "@/lib/dataService";
import { CouncilMember } from "@/types";
import { featuredCouncilMembers as defaultMembers } from "@/data/members";
import { ArrowLeft, Plus } from "lucide-react";

export function ClubMembersListClient() {
  const [members, setMembers] = useState<CouncilMember[]>(defaultMembers);

  const load = async () => {
    try {
      const live = await getClubMembers();
      if (live && live.length > 0) setMembers(live);
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

  return (
    <main className="flex-1 w-full pt-28 pb-20 md:pt-36 md:pb-28">
      <Container size="wide">
        {/* Navigation Breadcrumb Bar */}
        <div className="flex items-center justify-between gap-4 mb-6">
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
            <span>Manage Roster in Admin</span>
          </Link>
        </div>

        {/* Page Heading */}
        <div className="mb-12">
          <SectionHeading
            eyebrow="Student Representatives & Directorate"
            title="Club Members"
            description="Meet the dedicated student directors, stage coordinators, acoustic curators, and logistics conveners powering every council production."
            badge="Executive Board 2026-27"
          />
        </div>

        {/* All Club Member Cards Grid */}
        {members && members.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {members.map((member) => (
              <CouncilMemberCard key={member.id} member={member} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-[#4E2E1E]/40 rounded-2xl border border-[#6B3B23]">
            <p className="text-sm font-mono text-[#E7C59F]">
              No club members currently listed. Please check back soon.
            </p>
          </div>
        )}
      </Container>
    </main>
  );
}
