import React from "react";
import { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WinnersListClient } from "./WinnersListClient";
import { siteMetadataInfo } from "@/data/home";

export const metadata: Metadata = {
  title: "Winners | Performing Arts Council NIAT",
  description:
    "Honoring collegiate excellence — browse the Hall of Laureates for recent winners across national competitions, dance, theatrics, and classical music events.",
};

export default function WinnersPage() {
  return (
    <div className="min-h-screen bg-[#1C0F0A] text-[#FAF0E6] flex flex-col font-sans selection:bg-[#D4845A]/30 selection:text-[#FAF0E6]">
      {/* Sticky Navigation */}
      <Navbar institutionName={siteMetadataInfo.institutionNamePlaceholder} />

      <WinnersListClient />

      <Footer />
    </div>
  );
}
