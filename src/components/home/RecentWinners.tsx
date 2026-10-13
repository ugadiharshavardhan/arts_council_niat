"use client";

import React, { useRef } from "react";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { ImagePlaceholder } from "../ui/ImagePlaceholder";
import { Button } from "../ui/Button";
import { WinnerItem } from "@/types";
import { Award, Trophy, Calendar, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";

interface RecentWinnersProps {
  winners: WinnerItem[];
}

export const RecentWinners: React.FC<RecentWinnersProps> = ({ winners }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  if (!winners || winners.length === 0) {
    return (
      <section id="winners" className="py-20 bg-[#23120A]">
        <Container size="wide">
          <SectionHeading
            eyebrow="Hall of Laureates"
            title="Recent Winners"
            description="No winner records currently logged."
          />
        </Container>
      </section>
    );
  }

  const featuredWinner = winners.find((w) => w.isFeatured) || winners[0];
  const carouselWinners = winners.filter((w) => w.id !== featuredWinner?.id);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const offset = direction === "left" ? -340 : 340;
      scrollContainerRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  return (
    <section
      id="winners"
      aria-label="Recent Winners and Laureates"
      className="py-20 md:py-28 bg-[#23120A] border-t border-[#6B3B23] relative overflow-hidden"
    >
      {/* Decorative Burnt Sienna backdrop halo */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-[#D98C5B]/14 rounded-full blur-[140px] pointer-events-none" />

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
                className="w-10 h-10 rounded-full border border-[#6B3B23] bg-[#4E2E1E] flex items-center justify-center text-[#E7C59F] hover:text-[#D98C5B] hover:border-[#D98C5B]/50 transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => scroll("right")}
                aria-label="Scroll winners right"
                className="w-10 h-10 rounded-full border border-[#6B3B23] bg-[#4E2E1E] flex items-center justify-center text-[#E7C59F] hover:text-[#D98C5B] hover:border-[#D98C5B]/50 transition-colors cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Editorial Layout: Large Featured Laureate + Horizontal Scroll Strip */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Featured Large Winner Column */}
          {featuredWinner && (
            <div className="lg:col-span-5 flex flex-col bg-[#4E2E1E] border border-[#D98C5B]/50 rounded-2xl overflow-hidden shadow-2xl relative">
              <div className="relative h-[320px] sm:h-[380px] bg-[#23120A] overflow-hidden">
                <ImagePlaceholder
                  src={featuredWinner.photo}
                  alt={featuredWinner.name}
                  aspectRatio="portrait"
                  className="w-full h-full"
                />

                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#D98C5B] text-[#23120A] shadow-md font-bold">
                    <Sparkles className="w-3.5 h-3.5" />
                    Featured Laureate
                  </span>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-4 bg-[#23120A]/95 border-t border-[#6B3B23]">
                  <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#D98C5B] block mb-1">
                    {featuredWinner.position}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#F5E6D3]">
                    {featuredWinner.name}
                  </h3>
                </div>
              </div>

              <div className="p-6 sm:p-7 flex flex-col justify-between flex-1 bg-[#4E2E1E]/90">
                <div className="space-y-3">
                  <div>
                    <span className="text-[11px] font-mono uppercase text-[#E7C59F]/70 block">Competition</span>
                    <h4 className="text-lg font-serif font-semibold text-[#F5E6D3]">
                      {featuredWinner.eventName}
                    </h4>
                  </div>

                  <div className="p-3.5 rounded-lg bg-[#23120A] border border-[#D98C5B]/30 flex items-start gap-3">
                    <Award className="w-5 h-5 text-[#D98C5B] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] font-mono uppercase text-[#D98C5B] block font-semibold">Prize & Distinction</span>
                      <p className="text-xs text-[#F5E6D3] font-medium">
                        {featuredWinner.prizeOrAchievement}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-[#6B3B23] flex items-center justify-between text-xs font-mono text-[#E7C59F]">
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#E7C59F]/70" />
                    {featuredWinner.date}
                  </span>
                  <span className="text-[#D98C5B] font-semibold uppercase">
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
                  className="w-[280px] sm:w-[320px] shrink-0 snap-start flex flex-col bg-[#4E2E1E] border border-[#6B3B23] rounded-2xl overflow-hidden group hover:border-[#D98C5B]/40 transition-all duration-300 shadow-lg"
                >
                  <div className="relative h-56 bg-[#23120A] overflow-hidden">
                    <ImagePlaceholder
                      src={winner.photo}
                      alt={winner.name}
                      aspectRatio="video"
                      className="w-full h-full"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-[#23120A] text-[#D98C5B] border border-[#D98C5B]/30">
                        {winner.position}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 flex flex-col justify-between flex-1">
                    <div>
                      <h4 className="text-lg font-serif font-bold text-[#F5E6D3] group-hover:text-[#D98C5B] transition-colors mb-1">
                        {winner.name}
                      </h4>
                      <p className="text-xs font-mono text-[#D98C5B] mb-2 truncate">
                        {winner.eventName}
                      </p>
                      <div className="p-2.5 rounded bg-[#23120A] border border-[#6B3B23] text-xs text-[#E7C59F] font-light">
                        <span className="text-[10px] font-mono text-[#E7C59F]/70 block uppercase">Achievement</span>
                        {winner.prizeOrAchievement}
                      </div>
                    </div>

                    <div className="pt-4 mt-3 border-t border-[#6B3B23] flex items-center justify-between text-[11px] font-mono text-[#E7C59F]">
                      <span>{winner.date}</span>
                      <span className="text-[#E7C59F]/70">{winner.category}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="sm:hidden flex justify-center gap-2 mt-2">
              <span className="text-xs font-mono text-[#E7C59F]/70">← Swipe for more laureates →</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
