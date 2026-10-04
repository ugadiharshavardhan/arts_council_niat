"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { IntroLoader } from "@/components/home/IntroLoader";
import { Hero } from "@/components/home/Hero";
import { CouncilStatsSection } from "@/components/home/CouncilStats";
import { LeadershipSection } from "@/components/home/LeadershipSection";
import { UpcomingEvents } from "@/components/home/UpcomingEvents";
import { RecentWinners } from "@/components/home/RecentWinners";
import { PastEvents } from "@/components/home/PastEvents";
import { LeaderboardPreviewSection } from "@/components/home/LeaderboardPreview";
import { LadduAuctionHighlight } from "@/components/home/LadduAuctionHighlight";
import { CouncilMembersPreview } from "@/components/home/CouncilMembersPreview";
import { ManifestoPreview } from "@/components/home/ManifestoPreview";
import { FinalCTA } from "@/components/home/FinalCTA";

// Data layers
import {
  upcomingEventsList,
  pastEventsList,
} from "@/data/events";
import { recentWinnersList } from "@/data/winners";
import { councilLeadership, featuredCouncilMembers } from "@/data/members";
import { leaderboardPreviewList } from "@/data/leaderboard";
import {
  councilStatistics,
  ladduAuctionHighlight,
  manifestoPillars,
  siteMetadataInfo,
} from "@/data/home";

export default function Home() {
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

        {/* 5. Council statistics */}
        <CouncilStatsSection stats={councilStatistics} />

        {/* 6. Upcoming events section */}
        <UpcomingEvents events={upcomingEventsList} />

        {/* 7. Past events section */}
        <PastEvents events={pastEventsList} />

        {/* 8. Recent winners section */}
        <RecentWinners winners={recentWinnersList} />

        {/* 9. Club members preview */}
        <CouncilMembersPreview members={featuredCouncilMembers} />

        {/* 10. Leaderboard preview */}
        <LeaderboardPreviewSection entries={leaderboardPreviewList} />

        {/* 11. Ganesh Chaturthi Laddu Auction highlight */}
        <LadduAuctionHighlight data={ladduAuctionHighlight} />

        {/* 12. President's Manifesto preview */}
        <ManifestoPreview pillars={manifestoPillars} />

        {/* 13. Final CTA */}
        <FinalCTA />
      </main>

      {/* 15. Footer */}
      <Footer />
    </>
  );
}
