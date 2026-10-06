"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const IntroLoader: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Check if prefers reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = prefersReducedMotion ? 400 : 1600;

    const timer = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="intro-curtain"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#1C0F0A] text-[#FAF0E6] select-none pointer-events-auto"
        >
          <motion.div
            initial={{ scale: 0.88, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center text-center relative z-10 px-6"
          >
            {/* Emblem */}
            <motion.div
              initial={{ rotate: -15, scale: 0.7 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-[#D4845A] bg-[#2A1014] shadow-2xl flex items-center justify-center mb-6 relative overflow-hidden"
            >
              <span className="font-serif text-2xl sm:text-3xl font-bold text-[#FAF0E6]">
                PAC
              </span>
            </motion.div>

            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-2xl font-serif font-bold tracking-[0.2em] text-[#FAF0E6] uppercase"
            >
              Performing Arts Council
            </motion.h1>

            <motion.p
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="text-xs sm:text-sm font-sans tracking-[0.3em] text-[#D4845A] uppercase mt-2 font-medium"
            >
              CULTURE · DRAMA · MUSIC · DANCE
            </motion.p>

            {/* Quick status bar */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.1, ease: "easeInOut" }}
              className="w-32 h-[2px] bg-[#D4845A] mt-8"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
