import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CouncilMemberCard } from "@/components/members/CouncilMemberCard";
import { verticalsTeamData } from "@/data/members";
import { siteMetadataInfo } from "@/data/home";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Verticals Team | Performing Arts Council NIAT",
  description:
    "Meet the Verticals Team of the Performing Arts Council NIAT led by Verticals Head Pindi Anila and Verticals Members Palem Sri Charan and Kasini Pooja.",
};

export default function VerticalsTeamPage() {
  const { head, members } = verticalsTeamData;

  return (
    <div className="min-h-screen bg-[#1C0F0A] text-[#FAF0E6] flex flex-col font-sans selection:bg-[#D4845A]/30 selection:text-[#FAF0E6]">
      {/* 1. Website Header / Sticky Navigation */}
      <Navbar institutionName={siteMetadataInfo.institutionNamePlaceholder} />

      {/* 2. Verticals Team Main Content */}
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
              eyebrow="Specialized Artistic Wings"
              title="Verticals Team"
              description="Meet the specialized Verticals Directorate powering cross-functional creative initiatives, multidisciplinary stage wings, and student engagement across the Performing Arts Council."
              badge="Executive Board 2026-27"
            />
          </div>

          {/* Hierarchical Team Layout: Team Head First, Members Below */}
          <div className="max-w-4xl mx-auto flex flex-col items-center">
            {/* Row 1 — Team Head (Horizontally Centered) */}
            <div className="w-full flex flex-col items-center mb-10 sm:mb-14">
              <div className="mb-3 text-center">
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#D4845A] px-3.5 py-1 rounded-full bg-[#2A1014] border border-[#3D2018] shadow-sm">
                  Team Head
                </span>
              </div>
              <div className="w-full max-w-sm">
                <CouncilMemberCard member={head} />
              </div>
            </div>

            {/* Row 2 — Verticals Members (Side by Side) */}
            <div className="w-full flex flex-col items-center">
              <div className="mb-4 text-center">
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#C4A882] px-3.5 py-1 rounded-full bg-[#2A1014]/60 border border-[#3D2018] shadow-sm">
                  Verticals Members
                </span>
              </div>
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 justify-items-center">
                {/* Left Card: Palem Sri Charan */}
                <div className="w-full max-w-sm">
                  <CouncilMemberCard member={members[0]} />
                </div>

                {/* Right Card: Kasini Pooja */}
                <div className="w-full max-w-sm">
                  <CouncilMemberCard member={members[1]} />
                </div>
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
