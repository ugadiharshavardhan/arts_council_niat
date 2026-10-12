import React from "react";
import { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PastEventsListClient } from "./PastEventsListClient";
import { siteMetadataInfo } from "@/data/home";

export const metadata: Metadata = {
  title: "Past Events & Festivals | Performing Arts Council NIAT",
  description:
    "Browse the complete archival retrospective of past theatrical runs, classical concerts, and university cultural galas.",
};

export default function PastEventsPage() {
  return (
    <div className="min-h-screen bg-[#23120A] text-[#F5E6D3] flex flex-col font-sans selection:bg-[#D98C5B]/30">
      <Navbar institutionName={siteMetadataInfo.institutionNamePlaceholder} />
      <PastEventsListClient />
      <Footer />
    </div>
  );
}
