import React from "react";
import { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { UpcomingEventsListClient } from "./UpcomingEventsListClient";
import { siteMetadataInfo } from "@/data/home";

export const metadata: Metadata = {
  title: "Upcoming Events | Performing Arts Council NIAT",
  description:
    "Discover all scheduled inter-house dramatics, classical symposiums, choreography nights, and live acoustic recitals.",
};

export default function UpcomingEventsPage() {
  return (
    <div className="min-h-screen bg-[#23120A] text-[#F5E6D3] flex flex-col font-sans selection:bg-[#D98C5B]/30">
      <Navbar institutionName={siteMetadataInfo.institutionNamePlaceholder} />
      <UpcomingEventsListClient />
      <Footer />
    </div>
  );
}
