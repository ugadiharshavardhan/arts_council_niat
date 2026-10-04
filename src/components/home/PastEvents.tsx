import React from "react";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { Button } from "../ui/Button";
import { ImagePlaceholder } from "../ui/ImagePlaceholder";
import { EventItem } from "@/types";
import { Calendar, MapPin, ArrowRight } from "lucide-react";

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
              href="#past-events"
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
            <div
              key={evt.id}
              className="flex flex-col bg-[#2A1014]/60 border border-[#3D2018] rounded-2xl overflow-hidden group hover:border-[#D4845A]/40 hover:bg-[#2A1014] transition-all duration-300 shadow-md"
            >
              <div className="relative h-48 bg-[#1C0F0A] overflow-hidden">
                <ImagePlaceholder
                  src={evt.image}
                  alt={evt.title}
                  aspectRatio="video"
                  className="w-full h-full filter saturate-[0.85] group-hover:saturate-100 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C0F0A] via-[#1C0F0A]/20 to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-mono uppercase bg-[#1C0F0A]/80 text-[#D4845A] border border-[#3D2018] backdrop-blur-sm">
                    {evt.category || "Archive"}
                  </span>
                </div>
              </div>

              <div className="p-5 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-center gap-2 text-[11px] font-mono text-[#C4A882] mb-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#D4845A]" />
                    <span>{evt.date}</span>
                  </div>

                  <h4 className="text-base font-serif font-bold text-[#FAF0E6] group-hover:text-[#E8C87A] transition-colors mb-2 line-clamp-1">
                    {evt.title}
                  </h4>

                  <p className="text-xs text-[#C4A882] font-light line-clamp-3 leading-relaxed mb-4">
                    {evt.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#3D2018] flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#C4A882]/70 truncate max-w-[140px]">
                    <MapPin className="w-3 h-3 text-[#C4A882]/50 shrink-0" />
                    <span className="truncate">{evt.venue}</span>
                  </div>

                  <Button
                    href="#past-events"
                    variant="ghost"
                    size="sm"
                    className="text-xs text-[#D4845A] hover:text-[#E8C87A] p-0"
                    icon={<ArrowRight className="w-3 h-3" />}
                  >
                    View Event
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
