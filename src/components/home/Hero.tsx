"use client";

import React from "react";
import { Container } from "../ui/Container";
import { ChevronDown } from "lucide-react";
import { TechText } from "../ui/TechText";

interface HeroProps {
  tagline?: string;
  institutionName?: string;
  councilName?: string;
}

export const Hero: React.FC<HeroProps> = () => {
  return (
    <section
      id="hero"
      aria-label="Performing Arts Council Hero Section"
      className="relative min-h-[90vh] sm:min-h-screen flex items-center justify-center overflow-hidden bg-zinc-950 pt-28 pb-16"
    >
      {/* Sleek Stage Ambient Background */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-zinc-950/90 z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/90 via-transparent to-zinc-950/90 z-10" />

        {/* Subtle theatrical stage spotlights */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-amber-500/15 rounded-full blur-[170px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-indigo-600/10 rounded-full blur-[170px] pointer-events-none" />

        {/* Minimal grid for subtle texture */}
        <div
          className="w-full h-full opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.08) 0%, transparent 60%), linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)`,
            backgroundSize: "100% 100%, 60px 60px, 60px 60px",
          }}
        />
      </div>

      <Container size="wide" className="relative z-20">
        <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
          {/* Main Title: PERFORMING (Standard typography) + ARTS COUNCIL (TechText Animation) */}
          <div className="w-full flex flex-col items-center justify-center">
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-serif font-black tracking-tight text-white leading-none uppercase drop-shadow-md select-none">
              PERFORMING
            </h1>

            <div className="w-full max-w-4xl h-[75px] sm:h-[105px] md:h-[135px] lg:h-[160px] relative mt-1 sm:mt-2">
              <TechText
                text="ARTS COUNCIL"
                fontFamily="'Cormorant Garamond', Georgia, serif"
                fontWeight={700}
                fontSize={130}
                color="#fbbf24"
                accentColor="#f59e0b"
                reveal="letter"
                dashLength={4}
                dashGap={2}
                specks={14}
                strokeWidth={2}
                labels={false}
                draggable={true}
                sweep={true}
                speed={0.8}
              />
            </div>
          </div>
        </div>
      </Container>

      {/* Down Scroll Indicator to About Section */}
      <a
        href="#about"
        aria-label="Scroll to About Section"
        className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center text-zinc-500 hover:text-amber-400 transition-colors group"
      >
        <span className="text-[10px] uppercase tracking-[0.25em] font-mono opacity-60 group-hover:opacity-100 transition-opacity">
          Scroll
        </span>
        <ChevronDown className="w-4 h-4 animate-bounce mt-1" />
      </a>
    </section>
  );
};
