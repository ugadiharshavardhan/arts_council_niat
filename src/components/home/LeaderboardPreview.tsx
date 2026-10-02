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
      className="py-20 md:py-28 bg-zinc-950 relative overflow-hidden"
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
              icon={<ArrowRight className="w-4 h-4 text-amber-400" />}
            >
              View Full Leaderboard
            </Button>
          </div>
        </div>

        {/* Development Data Notice Badge */}
        <div className="flex items-center gap-2 p-3 mb-8 rounded-xl bg-amber-400/5 border border-amber-400/20 text-xs font-mono text-amber-300 max-w-xl">
          <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
          <span>Note: Displaying mock development standings. Official council tally will connect dynamically.</span>
        </div>

        {/* Leaderboard Table / Card Layout */}
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl">
          <div className="divide-y divide-zinc-800/80">
            {entries.map((entry) => {
              const isFirst = entry.rank === 1;
              const isSecond = entry.rank === 2;
              const isThird = entry.rank === 3;

              return (
                <div
                  key={entry.rank}
                  className={`flex flex-col sm:flex-row sm:items-center justify-between p-5 sm:p-6 transition-colors duration-200 ${
                    isFirst
                      ? "bg-amber-400/10 hover:bg-amber-400/15"
                      : "hover:bg-zinc-800/50"
                  }`}
                >
                  {/* Rank and Team Name */}
                  <div className="flex items-center gap-5 sm:gap-8">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center font-serif font-black text-xl shrink-0 ${
                        isFirst
                          ? "bg-gradient-to-br from-amber-300 to-amber-500 text-zinc-950 shadow-md shadow-amber-500/20"
                          : isSecond
                          ? "bg-zinc-300 text-zinc-950 font-bold"
                          : isThird
                          ? "bg-amber-800/60 text-amber-200 border border-amber-700/60"
                          : "bg-zinc-800 text-zinc-400"
                      }`}
                    >
                      {String(entry.rank).padStart(2, "0")}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-base sm:text-lg font-serif font-bold text-zinc-100">
                          {entry.teamOrHouse}
                        </h4>
                        {isFirst && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-amber-400/20 text-amber-300 border border-amber-400/40">
                            <Flame className="w-3 h-3 text-amber-400" />
                            Leader
                          </span>
                        )}
                      </div>
                      <span className="text-xs font-mono text-zinc-500">
                        {entry.eventsParticipated} Events Participated
                      </span>
                    </div>
                  </div>

                  {/* Points and Rank Status */}
                  <div className="flex items-center justify-between sm:justify-end gap-8 mt-4 sm:mt-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-zinc-800/60">
                    <div className="text-left sm:text-right">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block">
                        Total Points
                      </span>
                      <span
                        className={`text-xl sm:text-2xl font-black font-mono tracking-tight ${
                          isFirst ? "text-amber-400" : "text-zinc-100"
                        }`}
                      >
                        {entry.points.toLocaleString()}
                      </span>
                    </div>

                    <div className="w-8 h-8 rounded-full bg-zinc-800/80 flex items-center justify-center text-zinc-400">
                      <Trophy
                        className={`w-4 h-4 ${
                          isFirst ? "text-amber-400" : "text-zinc-600"
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
