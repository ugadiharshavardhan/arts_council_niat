import React from "react";
import { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FinanceTeamClient } from "./FinanceTeamClient";
import { siteMetadataInfo } from "@/data/home";

export const metadata: Metadata = {
  title: "Finance Team | Performing Arts Council NIAT",
  description:
    "Meet the Finance Team of the Performing Arts Council NIAT managing resource allocations, sponsorships, and budgeting.",
};

export default function FinanceTeamPage() {
  return (
    <div className="min-h-screen bg-[#1C0F0A] text-[#FAF0E6] flex flex-col font-sans selection:bg-[#D4845A]/30 selection:text-[#FAF0E6]">
      <Navbar institutionName={siteMetadataInfo.institutionNamePlaceholder} />
      <FinanceTeamClient />
      <Footer />
    </div>
  );
}
