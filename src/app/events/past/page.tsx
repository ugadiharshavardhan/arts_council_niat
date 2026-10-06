import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PastEventCard } from "@/components/events/PastEventCard";
import { pastEventsList } from "@/data/events";
import { siteMetadataInfo } from "@/data/home";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Past Events & Festivals | Performing Arts Council NIAT",
  description:
    "Browse the complete archival retrospective of past theatrical runs, classical concerts, and university cultural galas.",
};

export default function PastEventsPage() {
  return (
    <div className="min-h-screen bg-[#1C0F0A] text-[#FAF0E6] flex flex-col font-sans selection:bg-[#D4845A]/30 selection:text-[#FAF0E6]">
      {/* 1. Website Header / Sticky Navigation */}
      <Navbar institutionName={siteMetadataInfo.institutionNamePlaceholder} />

      {/* 2. Main Past Events Listing Content */}
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
              eyebrow="Archival Retrospective"
              title="Past Events & Festivals"
              description="Relive highlights from our past theatrical runs, classical concerts, and university cultural galas."
              badge="Cultural Archive"
            />
          </div>

          {/* All Past Event Cards Grid */}
          {pastEventsList && pastEventsList.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {pastEventsList.map((evt) => (
                <PastEventCard key={evt.id} event={evt} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-[#2A1014]/40 rounded-2xl border border-[#3D2018]">
              <p className="text-sm font-mono text-[#C4A882]">
                No past events currently available in the archive.
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
