"use client";

import React from "react";
import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
import { Sparkles, Calendar, Users, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

interface HeroProps {
  tagline: string;
  institutionName: string;
  councilName: string;
}

export const Hero: React.FC<HeroProps> = ({
  tagline,
  institutionName,
  councilName,
}) => {
  return (
    <section
      id="hero"
      aria-label="Performing Arts Council Hero Section"
      className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-center overflow-hidden bg-zinc-950 pt-24 pb-16"
    >
      {/* Background Media Layer / Fallback Area */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Cinematic gradient vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-zinc-950/80 z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/90 via-transparent to-zinc-950/90 z-10" />

        {/* Video / Animated Ambient Element */}
        <div className="w-full h-full relative opacity-40 scale-105 filter blur-[1px]">
          {/* Subtle simulated stage spotlights */}
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-amber-500/20 rounded-full blur-[140px] animate-pulse duration-1000" />
          <div className="absolute bottom-1/3 right-1/4 w-[450px] h-[450px] bg-indigo-600/20 rounded-full blur-[150px]" />
          
          {/* Visual grid overlay for editorial depth */}
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.12) 0%, transparent 60%), linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)`,
              backgroundSize: "100% 100%, 60px 60px, 60px 60px",
            }}
          />
        </div>

        {/* Media indicator badge */}
        <div className="absolute bottom-6 right-6 z-20 hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/80 border border-zinc-800 text-[11px] font-mono text-zinc-400 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          [Video Showcase Area · Placeholder Layer]
        </div>
      </div>

      <Container size="wide" className="relative z-20">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
          {/* Eyebrow badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/25 text-amber-300 text-xs uppercase tracking-[0.25em] font-semibold mb-6 shadow-sm backdrop-blur-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Official University Cultural Stage</span>
            <span className="text-[10px] text-zinc-400 font-mono">[{institutionName}]</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-black tracking-tight text-white leading-[1.05] uppercase"
          >
            <span className="block drop-shadow-md">
              PERFORMING
            </span>
            <span className="block bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 bg-clip-text text-transparent">
              ARTS COUNCIL
            </span>
          </motion.h1>

          {/* Editorial Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-6 text-base sm:text-xl md:text-2xl text-zinc-300 font-light max-w-2xl leading-relaxed italic font-serif"
          >
            &ldquo;{tagline}&rdquo;
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-3 text-xs sm:text-sm text-zinc-400 max-w-xl font-sans font-normal"
          >
            Empowering university storytellers, classical musicians, dramatic players, and choreography troupes with world-class proscenium opportunities.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            <Button
              href="#upcoming-feature"
              variant="gold"
              size="lg"
              className="w-full sm:w-auto shadow-lg shadow-amber-500/20"
              icon={<Calendar className="w-4 h-4 text-zinc-950" />}
            >
              Explore Events
            </Button>

            <Button
              href="#leadership"
              variant="outline"
              size="lg"
              className="w-full sm:w-auto border-zinc-700/80 text-zinc-200 hover:text-white"
              icon={<Users className="w-4 h-4 text-amber-400" />}
            >
              Meet the Council
            </Button>
          </motion.div>
        </div>
      </Container>

      {/* Down Scroll Indicator */}
      <a
        href="#upcoming-feature"
        aria-label="Scroll to Upcoming Event Highlight"
        className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center text-zinc-400 hover:text-amber-400 transition-colors group"
      >
        <span className="text-[10px] uppercase tracking-[0.25em] font-mono opacity-60 group-hover:opacity-100 transition-opacity">
          Scroll
        </span>
        <ChevronDown className="w-4 h-4 animate-bounce mt-1" />
      </a>
    </section>
  );
};
