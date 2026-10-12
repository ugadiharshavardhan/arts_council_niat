"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { IntroLoader } from "@/components/home/IntroLoader";
import { Hero } from "@/components/home/Hero";
import { LeadershipSection } from "@/components/home/LeadershipSection";
import { UpcomingEvents } from "@/components/home/UpcomingEvents";
import { PastEvents } from "@/components/home/PastEvents";
import { LadduAuctionHighlight } from "@/components/home/LadduAuctionHighlight";
import { CouncilMembersPreview } from "@/components/home/CouncilMembersPreview";
import { ScrollToTop } from "@/components/ui/ScrollToTop";

// Data layers & Service
import {
  upcomingEventHighlight,
  upcomingEventsList,
  pastEventsList as defaultPastEvents,
} from "@/data/events";
import { councilLeadership, featuredCouncilMembers as defaultMembers } from "@/data/members";
import { ladduAuctionHighlight, siteMetadataInfo } from "@/data/home";
import {
  getUpcomingEvents,
  getPastEvents,
  getClubMembers,
} from "@/lib/dataService";
import { EventItem, CouncilMember } from "@/types";

export default function Home() {
  const [upcomingEvents, setUpcomingEvents] = useState<EventItem[]>(upcomingEventsList);
  const [pastEvents, setPastEvents] = useState<EventItem[]>(defaultPastEvents);
  const [members, setMembers] = useState<CouncilMember[]>(defaultMembers);

  const loadData = async () => {
    try {
      const [up, past, mems] = await Promise.all([
        getUpcomingEvents(),
        getPastEvents(),
        getClubMembers(),
      ]);
      if (up && up.length > 0) setUpcomingEvents(up);
      if (past && past.length > 0) setPastEvents(past);
      if (mems && mems.length > 0) setMembers(mems);
    } catch (err) {
      console.error("Error loading live PAC data:", err);
    }
  };

  useEffect(() => {
    loadData();

    // Listen for custom data updates from Admin page or other tabs
    const handleUpdate = () => {
      loadData();
    };
    window.addEventListener("pac-data-updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);

    return () => {
      window.removeEventListener("pac-data-updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  return (
    <>
      {/* 1. Initial logo/intro experience */}
      <IntroLoader />

      {/* 2. Main sticky navigation */}
      <Navbar institutionName={siteMetadataInfo.institutionNamePlaceholder} />

      <main className="flex-1 w-full flex flex-col">
        {/* 3. Hero section */}
        <Hero
          tagline={siteMetadataInfo.tagline}
          institutionName={siteMetadataInfo.institutionNamePlaceholder}
          councilName={siteMetadataInfo.councilName}
        />

        {/* 4. About the Council (Leadership) */}
        <LeadershipSection
          president={
            members.find((m) => m.role.toLowerCase() === "president") ||
            councilLeadership.president
          }
          vicePresident={
            members.find((m) => m.role.toLowerCase().includes("vice")) ||
            councilLeadership.vicePresident
          }
        />

        {/* 5. Upcoming events section (Infinite horizontal marquee) */}
        <UpcomingEvents events={upcomingEvents} />

        {/* 6. Past events section (Infinite horizontal marquee) */}
        <PastEvents events={pastEvents} />

        {/* 7. Club members preview */}
        <CouncilMembersPreview members={members} />

        {/* 8. Ganesh Chaturthi Laddu Auction highlight */}
        <LadduAuctionHighlight data={ladduAuctionHighlight} />
      </main>

      {/* Floating Scroll To Top Button */}
      <ScrollToTop />

      {/* Footer */}
      <Footer />
    </>
  );
}
