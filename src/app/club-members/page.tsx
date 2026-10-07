import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CouncilMemberCard } from "@/components/members/CouncilMemberCard";
import { featuredCouncilMembers } from "@/data/members";
import { siteMetadataInfo } from "@/data/home";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Club Members | Performing Arts Council NIAT",
  description:
    "Meet our dedicated student representatives, department heads, stage coordinators, and creative directors across all artistic wings.",
};

export default function ClubMembersPage() {
  return (
    <div className="min-h-screen bg-[#1C0F0A] text-[#FAF0E6] flex flex-col font-sans selection:bg-[#D4845A]/30 selection:text-[#FAF0E6]">
      {/* 1. Website Header / Sticky Navigation */}
      <Navbar institutionName={siteMetadataInfo.institutionNamePlaceholder} />

      {/* 2. Main Club Members Listing Content */}
      <main className="flex-1 w-full pt-28 pb-20 md:pt-36 md:pb-28">
        <Container size="wide">
          {/* Back to Home Breadcrumb Link */}
          <div className="mb-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#D4845A] hover:text-[#E8C87A] transition-colors group px-3 py-1.5 rounded-full bg-[#2A1014] border border-[#3D2018]"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span>Back to Home</span>
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
          {featuredCouncilMembers && featuredCouncilMembers.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {featuredCouncilMembers.map((member) => (
                <CouncilMemberCard key={member.id} member={member} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-[#2A1014]/40 rounded-2xl border border-[#3D2018]">
              <p className="text-sm font-mono text-[#C4A882]">
                No club members currently listed. Please check back soon.
              </p>
            </div>
          )}
        </Container>
      </main>

      {/* 3. Website Footer */}
      <Footer />
    </div>
  );
}
