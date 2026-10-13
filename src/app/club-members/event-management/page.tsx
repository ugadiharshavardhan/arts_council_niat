import React from "react";
import { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { EventManagementTeamClient } from "./EventManagementTeamClient";
import { siteMetadataInfo } from "@/data/home";

export const metadata: Metadata = {
  title: "Event Management Team | Performing Arts Council NIAT",
  description:
    "Meet the Event Management Team of the Performing Arts Council NIAT coordinating productions, stage logistics, and cultural events.",
};

export default function EventManagementTeamPage() {
  return (
    <div className="min-h-screen bg-[#1C0F0A] text-[#FAF0E6] flex flex-col font-sans selection:bg-[#D4845A]/30 selection:text-[#FAF0E6]">
      <Navbar institutionName={siteMetadataInfo.institutionNamePlaceholder} />
      <EventManagementTeamClient />
      <Footer />
    </div>
  );
}
