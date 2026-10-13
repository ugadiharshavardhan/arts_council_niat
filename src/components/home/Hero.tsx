"use client";

import React from "react";
import { Container } from "../ui/Container";
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
      className="relative min-h-[85vh] sm:min-h-screen flex items-center justify-center overflow-hidden bg-[#23120A] pt-28 pb-16"
    >
      {/* Warm Stage Ambient Background (Burnt Sienna theatrical lighting) */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden bg-[#23120A]">
        {/* Burnt sienna theatrical stage spotlights */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#D98C5B]/18 rounded-full blur-[170px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-[#8B4513]/25 rounded-full blur-[170px] pointer-events-none" />
      </div>

      <Container size="wide" className="relative z-20">
        <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
          {/* Main Title: PERFORMING (Standard typography) + ARTS COUNCIL (TechText Animation) */}
          <div className="w-full flex flex-col items-center justify-center">
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-serif font-black tracking-tight text-[#F5E6D3] leading-none uppercase drop-shadow-md select-none">
              PERFORMING
            </h1>

            <div className="w-full max-w-4xl h-[75px] sm:h-[105px] md:h-[135px] lg:h-[160px] relative mt-1 sm:mt-2">
              <TechText
                text="ARTS COUNCIL"
                fontFamily="'Playfair Display', Georgia, serif"
                fontWeight={700}
                fontSize={130}
                color="#D98C5B"
                accentColor="#E79E70"
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
    </section>
  );
};
