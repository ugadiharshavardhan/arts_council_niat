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
      className="relative min-h-[90vh] sm:min-h-screen flex items-center justify-center overflow-hidden bg-[#1C0F0A] pt-28 pb-16"
    >
      {/* Warm Stage Ambient Background */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#1C0F0A] via-[#1C0F0A]/60 to-[#1C0F0A]/90 z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1C0F0A]/90 via-transparent to-[#1C0F0A]/90 z-10" />

        {/* Warm theatrical stage spotlights */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#8B2E2E]/25 rounded-full blur-[170px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-[#5C1A1A]/30 rounded-full blur-[170px] pointer-events-none" />

        {/* Minimal grid for subtle texture */}
        <div
          className="w-full h-full opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(212, 132, 90, 0.12) 0%, transparent 60%), linear-gradient(rgba(255, 255, 255, 0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.015) 1px, transparent 1px)`,
            backgroundSize: "100% 100%, 60px 60px, 60px 60px",
          }}
        />
      </div>

      <Container size="wide" className="relative z-20">
        <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
          {/* Main Title: PERFORMING (Standard typography) + ARTS COUNCIL (TechText Animation) */}
          <div className="w-full flex flex-col items-center justify-center">
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-serif font-black tracking-tight text-[#FAF0E6] leading-none uppercase drop-shadow-md select-none">
              PERFORMING
            </h1>

            <div className="w-full max-w-4xl h-[75px] sm:h-[105px] md:h-[135px] lg:h-[160px] relative mt-1 sm:mt-2">
              <TechText
                text="ARTS COUNCIL"
                fontFamily="'Cormorant Garamond', Georgia, serif"
                fontWeight={700}
                fontSize={130}
                color="#D4845A"
                accentColor="#E8C87A"
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
        className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center text-[#C4A882]/60 hover:text-[#D4845A] transition-colors group"
      >
        <span className="text-[10px] uppercase tracking-[0.25em] font-mono opacity-60 group-hover:opacity-100 transition-opacity">
          Scroll
        </span>
        <ChevronDown className="w-4 h-4 animate-bounce mt-1 text-[#D4845A]" />
      </a>
    </section>
  );
};
