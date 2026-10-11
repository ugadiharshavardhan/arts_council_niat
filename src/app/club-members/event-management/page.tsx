import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CouncilMemberCard } from "@/components/members/CouncilMemberCard";
import { eventManagementTeamData } from "@/data/members";
import { siteMetadataInfo } from "@/data/home";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Event Management Team | Performing Arts Council NIAT",
  description:
    "Meet the Event Management Team of the Performing Arts Council NIAT led by Event Management Head Ashwitha Jilla — coordinating productions, stage logistics, and cultural events across the campus.",
};

export default function EventManagementTeamPage() {
  const { head, members } = eventManagementTeamData;

  return (
    <div className="min-h-screen bg-[#1C0F0A] text-[#FAF0E6] flex flex-col font-sans selection:bg-[#D4845A]/30 selection:text-[#FAF0E6]">
      {/* 1. Website Header / Sticky Navigation */}
      <Navbar institutionName={siteMetadataInfo.institutionNamePlaceholder} />

      {/* 2. Event Management Team Main Content */}
      <main className="flex-1 w-full pt-28 pb-20 md:pt-36 md:pb-28">
        <Container size="wide">
          {/* Breadcrumb Navigation */}
          <div className="mb-6 flex items-center gap-3">
            <Link
              href="/club-members"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#D4845A] hover:text-[#E8C87A] transition-colors group px-3 py-1.5 rounded-full bg-[#2A1014] border border-[#3D2018]"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span>Back to Club Members</span>
            </Link>
          </div>

          {/* Section Heading */}
          <div className="mb-12">
            <SectionHeading
              eyebrow="Stage Coordination & Cultural Production"
              title="Event Management Team"
              description="Orchestrating every production detail — from stage logistics and vendor management to audience coordination and live event execution — powering each cultural showcase of the Performing Arts Council."
              badge="Executive Board 2026-27"
            />
          </div>

          {/* Hierarchical Team Layout: Event Management Head First, Members Below */}
          <div className="w-full max-w-6xl mx-auto flex flex-col items-center">
            {/* Row 1 — Event Management Head (Horizontally Centered) */}
            <div className="w-full flex flex-col items-center mb-10 sm:mb-14">
              <div className="mb-3 text-center">
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#D4845A] px-3.5 py-1 rounded-full bg-[#2A1014] border border-[#3D2018] shadow-sm">
                  Event Management Head
                </span>
              </div>
              <div className="w-full max-w-sm">
                <CouncilMemberCard member={head} />
              </div>
            </div>

            {/* Row 2 — Event Management Members (3 per row on desktop) */}
            <div className="w-full flex flex-col items-center">
              <div className="mb-4 text-center">
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#C4A882] px-3.5 py-1 rounded-full bg-[#2A1014]/60 border border-[#3D2018] shadow-sm">
                  Event Management Members
                </span>
              </div>
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 justify-items-center">
                {members.map((member) => (
                  <div key={member.id} className="w-full max-w-sm">
                    <CouncilMemberCard member={member} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </main>

      {/* 3. Website Footer */}
      <Footer />
    </div>
  );
}
