import React from "react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#23120A] text-[#F5E6D3] select-none">
      <div className="flex flex-col items-center text-center px-6 animate-pulse">
        {/* Official Crest Logo */}
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 border-[#D98C5B] bg-[#4E2E1E] shadow-2xl flex items-center justify-center mb-6 relative overflow-hidden p-1 shadow-[#D98C5B]/30">
          <img
            src="/arts_logo.jpeg"
            alt="Arts Council NIAT Logo"
            className="w-full h-full object-cover rounded-full"
          />
        </div>

        <h2 className="text-lg sm:text-xl font-serif font-bold tracking-[0.2em] text-[#F5E6D3] uppercase">
          Performing Arts Council
        </h2>

        <p className="text-xs sm:text-sm font-sans tracking-[0.25em] text-[#D98C5B] uppercase mt-2 font-semibold">
          NIAT
        </p>

        {/* Animated Loading Progress Line */}
        <div className="w-32 h-1 bg-[#4E2E1E] rounded-full overflow-hidden mt-6 border border-[#6B3B23]">
          <div className="h-full bg-gradient-to-r from-[#D98C5B] to-[#E79E70] animate-[shimmer_1.4s_infinite_linear] w-full" />
        </div>
      </div>
    </div>
  );
}
