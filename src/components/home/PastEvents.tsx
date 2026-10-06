import React from "react";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { Button } from "../ui/Button";
import { EventItem } from "@/types";
import { ArrowRight } from "lucide-react";
import { PastEventCard } from "../events/PastEventCard";

interface PastEventsProps {
  events: EventItem[];
}

export const PastEvents: React.FC<PastEventsProps> = ({ events }) => {
  if (!events || events.length === 0) {
    return (
      <section id="past-events" className="py-20 bg-[#1C0F0A]">
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

  return (
    <section
      id="past-events"
      aria-label="Past Cultural Events and Festivals"
      className="py-20 md:py-28 bg-[#1C0F0A] border-t border-[#3D2018] relative"
    >
      <Container size="wide">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <SectionHeading
            eyebrow="Archival Retrospective"
            title="Past Events & Festivals"
            description="Relive highlights from our past theatrical runs, classical concerts, and university cultural galas."
            badge="Cultural Archive"
            className="mb-0"
          />

          <div className="mt-6 md:mt-0 shrink-0">
            <Button
              href="/events"
              variant="outline"
              size="md"
              icon={<ArrowRight className="w-4 h-4 text-[#D4845A]" />}
            >
              Explore Past Events
            </Button>
          </div>
        </div>

        {/* 4 Representative Archival Event Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {events.slice(0, 4).map((evt) => (
            <PastEventCard key={evt.id} event={evt} />
          ))}
        </div>
      </Container>
    </section>
  );
};
