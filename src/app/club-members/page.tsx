import React from "react";
import { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ClubMembersListClient } from "./ClubMembersListClient";
import { siteMetadataInfo } from "@/data/home";

export const metadata: Metadata = {
  title: "Club Members | Performing Arts Council NIAT",
  description:
    "Meet our dedicated student representatives, department heads, stage coordinators, and creative directors across all artistic wings.",
};

export default function ClubMembersPage() {
  return (
    <div className="min-h-screen bg-[#23120A] text-[#F5E6D3] flex flex-col font-sans selection:bg-[#D98C5B]/30">
      <Navbar institutionName={siteMetadataInfo.institutionNamePlaceholder} />
      <ClubMembersListClient />
      <Footer />
    </div>
  );
}
