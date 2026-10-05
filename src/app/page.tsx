"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { IntroLoader } from "@/components/home/IntroLoader";
import { Hero } from "@/components/home/Hero";
import { LeadershipSection } from "@/components/home/LeadershipSection";
import { UpcomingEvents } from "@/components/home/UpcomingEvents";
import { RecentWinners } from "@/components/home/RecentWinners";
import { PastEvents } from "@/components/home/PastEvents";
import { LadduAuctionHighlight } from "@/components/home/LadduAuctionHighlight";
import { CouncilMembersPreview } from "@/components/home/CouncilMembersPreview";
import { ManifestoPreview } from "@/components/home/ManifestoPreview";
import { FinalCTA } from "@/components/home/FinalCTA";
import { ScrollToTop } from "@/components/ui/ScrollToTop";

// Data layers
import {
  upcomingEventHighlight,
  upcomingEventsList,
  pastEventsList,
} from "@/data/events";
import { recentWinnersList } from "@/data/winners";
import { councilLeadership, featuredCouncilMembers } from "@/data/members";

import {
  ladduAuctionHighlight,
  manifestoPillars,
  siteMetadataInfo,
} from "@/data/home";

export default function Home() {
  const allUpcomingEvents = [upcomingEventHighlight, ...upcomingEventsList];

  return (
    <>
      {/* 1. Initial logo/intro experience */}
      <IntroLoader />

      {/* 2. Main sticky navigation */}
      <Navbar institutionName={siteMetadataInfo.institutionNamePlaceholder} />

      <main className="flex-1 w-full flex flex-col">
        {/* 3. Hero section (Title only) */}
        <Hero
          tagline={siteMetadataInfo.tagline}
          institutionName={siteMetadataInfo.institutionNamePlaceholder}
          councilName={siteMetadataInfo.councilName}
        />

        {/* 4. About the Council (Leadership) */}
        <LeadershipSection
          president={councilLeadership.president}
          vicePresident={councilLeadership.vicePresident}
        />

        {/* 5. Upcoming events section (Infinite horizontal marquee) */}
        <UpcomingEvents events={allUpcomingEvents} />

        {/* 6. Past events section (Infinite horizontal marquee) */}
        <PastEvents events={pastEventsList} />

        {/* 7. Recent winners section */}
        <RecentWinners winners={recentWinnersList} />

        {/* 8. Club members preview */}
        <CouncilMembersPreview members={featuredCouncilMembers} />

        {/* 9. Ganesh Chaturthi Laddu Auction highlight */}
        <LadduAuctionHighlight data={ladduAuctionHighlight} />


        {/* 11. President's Manifesto preview */}
        <ManifestoPreview pillars={manifestoPillars} />

        {/* 12. Final CTA */}
        <FinalCTA />
      </main>

      {/* Floating Scroll To Top Button */}
      <ScrollToTop />

      {/* 13. Footer */}
      <Footer />
    </>
  );
}

