import React from "react";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { Button } from "../ui/Button";
import { LeaderboardEntry } from "@/types";
import { Trophy, Flame, ArrowRight, ShieldAlert } from "lucide-react";

interface LeaderboardPreviewProps {
  entries: LeaderboardEntry[];
}

export const LeaderboardPreviewSection: React.FC<LeaderboardPreviewProps> = ({
  entries,
}) => {
  return (
    <section
      id="leaderboard"
      aria-label="House Cultural Championship Leaderboard"
      className="py-20 md:py-28 bg-[#1C0F0A] relative overflow-hidden"
    >
      <Container size="wide">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <SectionHeading
            eyebrow="Campus House Championship"
            title="Leaderboard Preview"
            description="Tracking inter-house cultural point tallies across debates, drama prosceniums, dance battles, and musical symphonies."
            badge="Championship Standings"
            className="mb-0"
          />

          <div className="mt-6 md:mt-0 shrink-0">
            <Button
              href="#leaderboard"
              variant="outline"
              size="md"
              icon={<ArrowRight className="w-4 h-4 text-[#D4845A]" />}
            >
              View Full Leaderboard
            </Button>
          </div>
        </div>

        {/* Development Data Notice Badge */}
        <div className="flex items-center gap-2 p-3 mb-8 rounded-xl bg-[#8B2E2E]/15 border border-[#8B2E2E]/30 text-xs font-mono text-[#D4845A] max-w-xl">
          <ShieldAlert className="w-4 h-4 text-[#D4845A] shrink-0" />
          <span>Note: Displaying mock development standings. Official council tally will connect dynamically.</span>
        </div>

        {/* Leaderboard Table / Card Layout */}
        <div className="bg-[#2A1014] border border-[#3D2018] rounded-2xl overflow-hidden shadow-2xl">
          <div className="divide-y divide-[#3D2018]">
            {entries.map((entry) => {
              const isFirst = entry.rank === 1;
              const isSecond = entry.rank === 2;
              const isThird = entry.rank === 3;

              return (
                <div
                  key={entry.rank}
                  className={`flex flex-col sm:flex-row sm:items-center justify-between p-5 sm:p-6 transition-colors duration-200 ${
                    isFirst
                      ? "bg-[#8B2E2E]/20 hover:bg-[#8B2E2E]/30"
                      : "hover:bg-[#3D2018]/40"
                  }`}
                >
                  {/* Rank and Team Name */}
                  <div className="flex items-center gap-5 sm:gap-8">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center font-serif font-black text-xl shrink-0 ${
                        isFirst
                          ? "bg-gradient-to-br from-[#D4845A] to-[#C5683C] text-[#1C0F0A] shadow-md shadow-[#D4845A]/20"
                          : isSecond
                          ? "bg-[#3D2018] text-[#FAF0E6] font-bold"
                          : isThird
                          ? "bg-[#5C1A1A]/60 text-[#FAF0E6] border border-[#5C1A1A]"
                          : "bg-[#1C0F0A] text-[#C4A882]"
                      }`}
                    >
                      {String(entry.rank).padStart(2, "0")}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-base sm:text-lg font-serif font-bold text-[#FAF0E6]">
                          {entry.teamOrHouse}
                        </h4>
                        {isFirst && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-[#8B2E2E]/30 text-[#D4845A] border border-[#D4845A]/40">
                            <Flame className="w-3 h-3 text-[#D4845A]" />
                            Leader
                          </span>
                        )}
                      </div>
                      <span className="text-xs font-mono text-[#C4A882]/70">
                        {entry.eventsParticipated} Events Participated
                      </span>
                    </div>
                  </div>

                  {/* Points and Rank Status */}
                  <div className="flex items-center justify-between sm:justify-end gap-8 mt-4 sm:mt-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-[#3D2018]">
                    <div className="text-left sm:text-right">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#C4A882]/70 block">
                        Total Points
                      </span>
                      <span
                        className={`text-xl sm:text-2xl font-black font-mono tracking-tight ${
                          isFirst ? "text-[#D4845A]" : "text-[#FAF0E6]"
                        }`}
                      >
                        {entry.points.toLocaleString()}
                      </span>
                    </div>

                    <div className="w-8 h-8 rounded-full bg-[#1C0F0A] flex items-center justify-center text-[#C4A882]">
                      <Trophy
                        className={`w-4 h-4 ${
                          isFirst ? "text-[#D4845A]" : "text-[#C4A882]/50"
                        }`}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
};
