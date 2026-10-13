import React from "react";
import { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { VerticalsTeamClient } from "./VerticalsTeamClient";
import { siteMetadataInfo } from "@/data/home";

export const metadata: Metadata = {
  title: "Verticals Team | Performing Arts Council NIAT",
  description:
    "Meet the Verticals Team of the Performing Arts Council NIAT leading multidisciplinary stage wings and specialized artistic wings.",
};

export default function VerticalsTeamPage() {
  return (
    <div className="min-h-screen bg-[#1C0F0A] text-[#FAF0E6] flex flex-col font-sans selection:bg-[#D4845A]/30 selection:text-[#FAF0E6]">
      <Navbar institutionName={siteMetadataInfo.institutionNamePlaceholder} />
      <VerticalsTeamClient />
      <Footer />
    </div>
  );
}
