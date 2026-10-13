import React from "react";
import { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SocialMediaTeamClient } from "./SocialMediaTeamClient";
import { siteMetadataInfo } from "@/data/home";

export const metadata: Metadata = {
  title: "Social Media Team | Performing Arts Council NIAT",
  description:
    "Meet the Social Media Team of the Performing Arts Council NIAT leading creative outreach, digital storytelling, content design, photography, and video editing.",
};

export default function SocialMediaTeamPage() {
  return (
    <div className="min-h-screen bg-[#1C0F0A] text-[#FAF0E6] flex flex-col font-sans selection:bg-[#D4845A]/30 selection:text-[#FAF0E6]">
      <Navbar institutionName={siteMetadataInfo.institutionNamePlaceholder} />
      <SocialMediaTeamClient />
      <Footer />
    </div>
  );
}
