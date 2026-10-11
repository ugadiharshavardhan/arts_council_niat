import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LeadershipSection } from "@/components/home/LeadershipSection";
import { councilLeadership } from "@/data/members";
import { siteMetadataInfo } from "@/data/home";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "About | Performing Arts Council NIAT",
  description:
    "Learn about the Performing Arts Council leadership, their vision, and their commitment to student artistic excellence at NIAT.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#1C0F0A] text-[#FAF0E6] flex flex-col font-sans selection:bg-[#D4845A]/30 selection:text-[#FAF0E6]">
      {/* Sticky Navigation */}
      <Navbar institutionName={siteMetadataInfo.institutionNamePlaceholder} />

      <main className="flex-1 w-full pt-28 pb-20 md:pt-36 md:pb-28">
        {/* Back to Home breadcrumb */}
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#D4845A] hover:text-[#E8C87A] transition-colors group px-3 py-1.5 rounded-full bg-[#2A1014] border border-[#3D2018]"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Leadership / About content — reuses the exact homepage section */}
        <LeadershipSection
          president={councilLeadership.president}
          vicePresident={councilLeadership.vicePresident}
        />
      </main>

      <Footer />
    </div>
  );
}
