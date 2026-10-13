"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PastEventCard } from "@/components/events/PastEventCard";
import { getPastEvents } from "@/lib/dataService";
import { EventItem } from "@/types";
import { pastEventsList as defaultPastEvents } from "@/data/events";
import { ArrowLeft, Plus } from "lucide-react";

export function PastEventsListClient() {
  const [events, setEvents] = useState<EventItem[]>(defaultPastEvents);

  const load = async () => {
    try {
      const live = await getPastEvents();
      if (Array.isArray(live)) setEvents(live);
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
      <Container size="wide">
        {/* Navigation Breadcrumb Bar */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#D98C5B] hover:text-[#E79E70] transition-colors group px-3.5 py-1.5 rounded-full bg-[#4E2E1E] border border-[#6B3B23]"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Page Heading */}
        <div className="mb-12">
          <SectionHeading
            eyebrow="Archival Retrospective"
            title="Past Events & Festivals"
            description="Relive highlights from our past theatrical runs, classical concerts, and university cultural galas."
            badge="Cultural Archive"
          />
        </div>

        {/* All Past Event Cards Grid */}
        {events && events.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {events.map((evt) => (
              <PastEventCard key={evt.id} event={evt} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-[#4E2E1E]/40 rounded-2xl border border-[#6B3B23]">
            <p className="text-sm font-mono text-[#E7C59F]">
              No past events currently available in the archive.
            </p>
          </div>
        )}
      </Container>
    </main>
  );
}
