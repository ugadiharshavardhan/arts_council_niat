"use client";

import React from "react";
import Link from "next/link";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { ImagePlaceholder } from "../ui/ImagePlaceholder";
import { Button } from "../ui/Button";
import { EventItem } from "@/types";
import { ArrowRight } from "lucide-react";

interface PastEventsProps {
  events: EventItem[];
}

export const PastEvents: React.FC<PastEventsProps> = ({ events }) => {
  if (!events || events.length === 0) {
    return (
      <section id="past-events" className="py-20 bg-[#23120A]">
        <Container size="wide">
          <SectionHeading
            eyebrow="Archival Showcase"
            title="Past Events"
            description="No past events in archive."
          />
        </Container>
      </section>
    );
  }

  // Multiply items to ensure continuous seamless infinite loop
  const repeatedEvents = [...events, ...events, ...events, ...events];

  return (
    <section
      id="past-events"
      aria-label="Past Cultural Events and Festivals"
      className="py-20 md:py-28 bg-[#23120A] border-t border-[#6B3B23] relative overflow-hidden"
    >
      <Container size="wide" className="mb-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between">
          <SectionHeading
            eyebrow="Archival Retrospective"
            title="Past Events & Festivals"
            description="Relive highlights from our past theatrical runs, classical concerts, and university cultural galas."
            badge="Cultural Archive"
            className="mb-0"
          />

          <div className="mt-6 md:mt-0 shrink-0">
            <Button
              href="/events/past"
              variant="outline"
              size="md"
              icon={<ArrowRight className="w-4 h-4 text-[#D98C5B]" />}
            >
              Explore Past Events
            </Button>
          </div>
        </div>
      </Container>

      {/* Infinite Horizontal Automated Marquee (Pauses on Hover) */}
      <div className="w-full overflow-hidden py-4 select-none">
        <div className="animate-marquee-events-reverse flex gap-6">
          {repeatedEvents.map((evt, idx) => (
            <Link
              href={`/events/${evt.id}`}
              key={`${evt.id}-past-${idx}`}
              className="w-[280px] sm:w-[320px] md:w-[360px] shrink-0 bg-[#4E2E1E] border border-[#6B3B23] hover:border-[#D98C5B] rounded-2xl overflow-hidden transition-all duration-300 shadow-xl group cursor-pointer flex flex-col"
            >
              {/* Event Image */}
              <div className="relative h-52 sm:h-60 w-full bg-[#23120A] overflow-hidden">
                <ImagePlaceholder
                  src={evt.image}
                  alt={evt.title}
                  aspectRatio="video"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Event Title */}
              <div className="p-5 bg-[#4E2E1E] border-t border-[#6B3B23] flex items-center min-h-[76px]">
                <h3 className="text-base sm:text-lg font-sans font-semibold text-[#F5E6D3] group-hover:text-[#D98C5B] transition-colors leading-snug line-clamp-2">
                  {evt.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
