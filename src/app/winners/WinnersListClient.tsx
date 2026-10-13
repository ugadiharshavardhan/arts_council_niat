"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Plus } from "lucide-react";
import { RecentWinners } from "@/components/home/RecentWinners";
import { recentWinnersList } from "@/data/winners";
import { getWinners } from "@/lib/dataService";
import { WinnerItem } from "@/types";

export function WinnersListClient() {
  const [winners, setWinners] = useState<WinnerItem[]>(recentWinnersList);

  const load = async () => {
    try {
      const live = await getWinners();
      if (Array.isArray(live)) {
        setWinners(live);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    load();
    const handleUpdate = () => load();
    window.addEventListener("pac-data-updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      window.removeEventListener("pac-data-updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  return (
    <main className="flex-1 w-full pt-28 pb-20 md:pt-36 md:pb-28">
      {/* Navigation Breadcrumb Bar */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mb-6 flex items-center justify-between gap-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#D4845A] hover:text-[#E8C87A] transition-colors group px-3 py-1.5 rounded-full bg-[#2A1014] border border-[#3D2018]"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to Home</span>
        </Link>
      </div>

      <RecentWinners winners={winners} />
    </main>
  );
}
