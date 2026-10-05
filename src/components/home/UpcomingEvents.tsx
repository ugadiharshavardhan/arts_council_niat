"use client";

import React from "react";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { ImagePlaceholder } from "../ui/ImagePlaceholder";
import { EventItem } from "@/types";

interface UpcomingEventsProps {
  events: EventItem[];
}

export const UpcomingEvents: React.FC<UpcomingEventsProps> = ({ events }) => {
  if (!events || events.length === 0) {
    return (
      <section id="events" className="py-20 bg-[#1C0F0A]">
        <Container size="wide">
          <SectionHeading
            eyebrow="Calendar of Productions"
            title="Upcoming Events"
            description="No upcoming events scheduled at this moment. Please check back soon."
          />
        </Container>
      </section>
    );
  }

  // Multiply items to ensure continuous seamless infinite loop across all screen sizes
  const repeatedEvents = [...events, ...events, ...events, ...events];

  return (
    <section
      id="events"
      aria-label="Upcoming Events Calendar"
      className="py-20 md:py-28 bg-[#1C0F0A] relative overflow-hidden"
    >
      <Container size="wide" className="mb-10">
        <SectionHeading
          eyebrow="Auditorium & Stage Calendar"
          title="Upcoming Events"
          description="Discover our scheduled proscenium stagings, acoustic recitals, choreography championships, and live cultural productions."
          badge="Season 2026-27"
          className="mb-0"
        />
      </Container>

      {/* Infinite Horizontal Automated Marquee (Pauses on Hover) */}
      <div className="w-full overflow-hidden py-4 select-none">
        <div className="animate-marquee-events flex gap-6">
          {repeatedEvents.map((evt, idx) => (
            <div
              key={`${evt.id}-upcoming-${idx}`}
              className="w-[280px] sm:w-[320px] md:w-[360px] shrink-0 bg-[#2A1014] border border-[#3D2018] hover:border-[#D4845A] rounded-2xl overflow-hidden transition-all duration-300 shadow-xl group cursor-pointer flex flex-col"
            >
              {/* Event Image ONLY */}
              <div className="relative h-52 sm:h-60 w-full bg-[#1C0F0A] overflow-hidden">
                <ImagePlaceholder
                  src={evt.image}
                  alt={evt.title}
                  aspectRatio="video"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Event Title ONLY */}
              <div className="p-5 bg-[#2A1014] border-t border-[#3D2018] flex items-center min-h-[76px]">
                <h3 className="text-base sm:text-lg font-serif font-bold text-[#FAF0E6] group-hover:text-[#D4845A] transition-colors leading-snug line-clamp-2">
                  {evt.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
