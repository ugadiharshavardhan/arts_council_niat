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
      <section id="winners" className="py-20 bg-[#1C0F0A]">
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
      className="py-20 md:py-28 bg-gradient-to-b from-[#1C0F0A] via-[#2A1014] to-[#1C0F0A] border-t border-[#3D2018] relative overflow-hidden"
    >
      {/* Decorative warm backdrop halo */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-[#8B2E2E]/15 rounded-full blur-[140px] pointer-events-none" />

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
                className="w-10 h-10 rounded-full border border-[#3D2018] bg-[#2A1014] flex items-center justify-center text-[#C4A882] hover:text-[#D4845A] hover:border-[#D4845A]/50 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => scroll("right")}
                aria-label="Scroll winners right"
                className="w-10 h-10 rounded-full border border-[#3D2018] bg-[#2A1014] flex items-center justify-center text-[#C4A882] hover:text-[#D4845A] hover:border-[#D4845A]/50 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <Button
              href="#winners"
              variant="gold"
              size="md"
              icon={<Trophy className="w-4 h-4 text-[#1C0F0A]" />}
            >
              View All Winners
            </Button>
          </div>
        </div>

        {/* Editorial Layout: Large Featured Laureate + Horizontal Scroll Strip */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Featured Large Winner Column */}
          {featuredWinner && (
            <div className="lg:col-span-5 flex flex-col bg-[#2A1014] border border-[#D4845A]/50 rounded-2xl overflow-hidden shadow-2xl relative">
              <div className="relative h-[320px] sm:h-[380px] bg-[#1C0F0A] overflow-hidden">
                <ImagePlaceholder
                  src={featuredWinner.photo}
                  alt={featuredWinner.name}
                  aspectRatio="portrait"
                  className="w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C0F0A] via-[#1C0F0A]/30 to-transparent" />

                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#D4845A] text-[#1C0F0A] shadow-md">
                    <Sparkles className="w-3.5 h-3.5" />
                    Featured Laureate
                  </span>
                </div>

                <div className="absolute bottom-4 left-6 right-6">
                  <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#D4845A] block mb-1">
                    {featuredWinner.position}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#FAF0E6]">
                    {featuredWinner.name}
                  </h3>
                </div>
              </div>

              <div className="p-6 sm:p-7 flex flex-col justify-between flex-1 bg-[#2A1014]/60">
                <div className="space-y-3">
                  <div>
                    <span className="text-[11px] font-mono uppercase text-[#C4A882]/70 block">Competition</span>
                    <h4 className="text-lg font-serif font-semibold text-[#FAF0E6]">
                      {featuredWinner.eventName}
                    </h4>
                  </div>

                  <div className="p-3.5 rounded-lg bg-[#1C0F0A] border border-[#D4845A]/30 flex items-start gap-3">
                    <Award className="w-5 h-5 text-[#D4845A] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] font-mono uppercase text-[#D4845A] block font-semibold">Prize & Distinction</span>
                      <p className="text-xs text-[#FAF0E6] font-medium">
                        {featuredWinner.prizeOrAchievement}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-[#3D2018] flex items-center justify-between text-xs font-mono text-[#C4A882]">
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#C4A882]/70" />
                    {featuredWinner.date}
                  </span>
                  <span className="text-[#D4845A] font-semibold uppercase">
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
                  className="w-[280px] sm:w-[320px] shrink-0 snap-start flex flex-col bg-[#2A1014] border border-[#3D2018] rounded-2xl overflow-hidden group hover:border-[#D4845A]/40 transition-all duration-300 shadow-lg"
                >
                  <div className="relative h-56 bg-[#1C0F0A] overflow-hidden">
                    <ImagePlaceholder
                      src={winner.photo}
                      alt={winner.name}
                      aspectRatio="video"
                      className="w-full h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1C0F0A] via-transparent to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-[#2A1014] text-[#D4845A] border border-[#D4845A]/30">
                        {winner.position}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 flex flex-col justify-between flex-1">
                    <div>
                      <h4 className="text-lg font-serif font-bold text-[#FAF0E6] group-hover:text-[#E8C87A] transition-colors mb-1">
                        {winner.name}
                      </h4>
                      <p className="text-xs font-mono text-[#D4845A] mb-2 truncate">
                        {winner.eventName}
                      </p>
                      <div className="p-2.5 rounded bg-[#1C0F0A] border border-[#3D2018] text-xs text-[#C4A882] font-light">
                        <span className="text-[10px] font-mono text-[#C4A882]/70 block uppercase">Achievement</span>
                        {winner.prizeOrAchievement}
                      </div>
                    </div>

                    <div className="pt-4 mt-3 border-t border-[#3D2018] flex items-center justify-between text-[11px] font-mono text-[#C4A882]">
                      <span>{winner.date}</span>
                      <span className="text-[#C4A882]/70">{winner.category}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="sm:hidden flex justify-center gap-2 mt-2">
              <span className="text-xs font-mono text-[#C4A882]/70">← Swipe for more laureates →</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
