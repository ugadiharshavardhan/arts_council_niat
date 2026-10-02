"use client";

import React, { useRef } from "react";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { Button } from "../ui/Button";
import { ImagePlaceholder } from "../ui/ImagePlaceholder";
import { WinnerItem } from "@/types";
import { Trophy, ChevronLeft, ChevronRight, Award, Calendar, Sparkles } from "lucide-react";

interface RecentWinnersProps {
  winners: WinnerItem[];
}

export const RecentWinners: React.FC<RecentWinnersProps> = ({ winners }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const offset = direction === "left" ? -340 : 340;
      scrollContainerRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  if (!winners || winners.length === 0) {
    return (
      <section id="winners" className="py-20 bg-zinc-950">
        <Container size="wide">
          <SectionHeading
            eyebrow="Hall of Fame"
            title="Recent Winners"
            description="No recent winners recorded at this moment."
          />
        </Container>
      </section>
    );
  }

  const [featuredWinner, ...carouselWinners] = winners;

  return (
    <section
      id="winners"
      aria-label="Recent Winners and Laureates"
      className="py-20 md:py-28 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 border-t border-zinc-800/80 relative overflow-hidden"
    >
      {/* Decorative gold backdrop halo */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

      <Container size="wide">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <SectionHeading
            eyebrow="Hall of Laureates"
            title="Recent Winners"
            description="Honoring collegiate excellence across national prosceniums, inter-university dance competitions, and fine-arts exhibitions."
            badge="Achievements & Laurels"
            className="mb-0"
          />

          {/* Controls & CTA */}
          <div className="flex items-center gap-3 mt-6 md:mt-0">
            <div className="hidden sm:flex items-center gap-2 mr-2">
              <button
                type="button"
                onClick={() => scroll("left")}
                aria-label="Scroll winners left"
                className="w-10 h-10 rounded-full border border-zinc-700 bg-zinc-900/80 flex items-center justify-center text-zinc-300 hover:text-amber-400 hover:border-amber-400/50 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => scroll("right")}
                aria-label="Scroll winners right"
                className="w-10 h-10 rounded-full border border-zinc-700 bg-zinc-900/80 flex items-center justify-center text-zinc-300 hover:text-amber-400 hover:border-amber-400/50 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <Button
              href="#winners"
              variant="gold"
              size="md"
              icon={<Trophy className="w-4 h-4 text-zinc-950" />}
            >
              View All Winners
            </Button>
          </div>
        </div>

        {/* Editorial Layout: Large Featured Laureate + Horizontal Scroll Strip */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Featured Large Winner Column */}
          {featuredWinner && (
            <div className="lg:col-span-5 flex flex-col bg-zinc-900/80 border border-amber-400/40 rounded-2xl overflow-hidden shadow-2xl relative">
              <div className="relative h-[320px] sm:h-[380px] bg-zinc-950 overflow-hidden">
                <ImagePlaceholder
                  src={featuredWinner.photo}
                  alt={featuredWinner.name}
                  aspectRatio="portrait"
                  className="w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent" />

                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-amber-400 text-zinc-950 shadow-md">
                    <Sparkles className="w-3.5 h-3.5" />
                    Featured Laureate
                  </span>
                </div>

                <div className="absolute bottom-4 left-6 right-6">
                  <span className="text-xs font-mono uppercase tracking-[0.2em] text-amber-400 block mb-1">
                    {featuredWinner.position}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                    {featuredWinner.name}
                  </h3>
                </div>
              </div>

              <div className="p-6 sm:p-7 flex flex-col justify-between flex-1 bg-zinc-900/50">
                <div className="space-y-3">
                  <div>
                    <span className="text-[11px] font-mono uppercase text-zinc-500 block">Competition</span>
                    <h4 className="text-lg font-serif font-semibold text-zinc-200">
                      {featuredWinner.eventName}
                    </h4>
                  </div>

                  <div className="p-3.5 rounded-lg bg-zinc-950/80 border border-amber-400/20 flex items-start gap-3">
                    <Award className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] font-mono uppercase text-amber-400 block font-semibold">Prize & Distinction</span>
                      <p className="text-xs text-zinc-200 font-medium">
                        {featuredWinner.prizeOrAchievement}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-zinc-800/80 flex items-center justify-between text-xs font-mono text-zinc-400">
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                    {featuredWinner.date}
                  </span>
                  <span className="text-amber-400/80 font-semibold uppercase">
                    {featuredWinner.category}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Carousel / Scrollable Winners Strip */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div
              ref={scrollContainerRef}
              className="flex gap-5 overflow-x-auto pb-6 pt-2 scroll-smooth snap-x snap-mandatory focus:outline-none"
              tabIndex={0}
              aria-label="Winners carousel"
            >
              {carouselWinners.map((winner) => (
                <div
                  key={winner.id}
                  className="w-[280px] sm:w-[320px] shrink-0 snap-start flex flex-col bg-zinc-900/60 border border-zinc-800 rounded-2xl overflow-hidden group hover:border-amber-400/40 transition-all duration-300 shadow-lg"
                >
                  <div className="relative h-56 bg-zinc-950 overflow-hidden">
                    <ImagePlaceholder
                      src={winner.photo}
                      alt={winner.name}
                      aspectRatio="video"
                      className="w-full h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-zinc-900/90 text-amber-400 border border-amber-400/20">
                        {winner.position}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 flex flex-col justify-between flex-1">
                    <div>
                      <h4 className="text-lg font-serif font-bold text-zinc-100 group-hover:text-amber-300 transition-colors mb-1">
                        {winner.name}
                      </h4>
                      <p className="text-xs font-mono text-amber-400/80 mb-2 truncate">
                        {winner.eventName}
                      </p>
                      <div className="p-2.5 rounded bg-zinc-950/60 border border-zinc-800 text-xs text-zinc-300 font-light">
                        <span className="text-[10px] font-mono text-zinc-500 block uppercase">Achievement</span>
                        {winner.prizeOrAchievement}
                      </div>
                    </div>

                    <div className="pt-4 mt-3 border-t border-zinc-800/80 flex items-center justify-between text-[11px] font-mono text-zinc-400">
                      <span>{winner.date}</span>
                      <span className="text-zinc-500">{winner.category}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="sm:hidden flex justify-center gap-2 mt-2">
              <span className="text-xs font-mono text-zinc-500">← Swipe for more laureates →</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
