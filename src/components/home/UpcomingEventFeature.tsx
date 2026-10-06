import React from "react";
import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
import { ImagePlaceholder } from "../ui/ImagePlaceholder";
import { EventItem } from "@/types";
import { Calendar, Clock, MapPin, ArrowRight, Ticket, Sparkles } from "lucide-react";

interface UpcomingEventFeatureProps {
  event: EventItem;
}

export const UpcomingEventFeature: React.FC<UpcomingEventFeatureProps> = ({
  event,
}) => {
  return (
    <section
      id="upcoming-feature"
      aria-label="Upcoming Featured Event Spotlight"
      className="py-16 md:py-24 bg-[#1C0F0A] relative overflow-hidden border-t border-[#3D2018]"
    >


      <Container size="wide">
        {/* Section context eyebrow */}
        <div className="flex items-center justify-between gap-4 mb-8 border-b border-[#3D2018]/80 pb-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D4845A] animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#D4845A]">
              FEATURED UPCOMING SPOTLIGHT
            </span>
          </div>
          <span className="text-xs font-mono text-[#C4A882]/70 hidden sm:inline">
            NEXT STAGE ENGAGEMENT
          </span>
        </div>

        {/* Editorial Feature Layout: Large Image + Editorial Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-[#1C0F0A]/70 border border-[#3D2018]/80 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-2xl relative">
          {/* Large Image Column */}
          <div className="lg:col-span-7 relative group overflow-hidden rounded-xl border border-[#3D2018]">
            <ImagePlaceholder
              src={event.image}
              alt={event.title}
              aspectRatio="video"
              className="w-full h-[320px] sm:h-[420px] lg:h-[460px]"
            />
            {event.badge && (
              <div className="absolute top-4 left-4 z-10">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#D4845A] text-[#1C0F0A] shadow-md">
                  <Sparkles className="w-3.5 h-3.5" />
                  {event.badge}
                </span>
              </div>
            )}
            <div className="absolute bottom-4 right-4 z-10">
              <span className="px-2.5 py-1 rounded bg-black/75 backdrop-blur-md text-[11px] font-mono text-[#C4A882] border border-white/10">
                {event.category || "University Gala"}
              </span>
            </div>
          </div>

          {/* Editorial Info Column */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <span className="text-xs font-mono font-medium tracking-[0.25em] text-[#D4845A] uppercase mb-2">
              FLAGSHIP EVENT PREVIEW
            </span>

            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#FAF0E6] leading-tight mb-4">
              {event.title}
            </h3>

            <p className="text-sm sm:text-base text-[#C4A882] font-light leading-relaxed mb-6">
              {event.description}
            </p>

            {/* Key Event Metadata Grid */}
            <div className="space-y-3 py-4 border-y border-[#3D2018]/80 mb-8">
              <div className="flex items-center gap-3 text-sm text-[#FAF0E6]">
                <div className="w-8 h-8 rounded-lg bg-[#2A1014] border border-[#3D2018] flex items-center justify-center shrink-0 text-[#D4845A]">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-[11px] text-[#C4A882] uppercase font-mono">Date</span>
                  <span className="font-semibold tracking-wide">{event.date}</span>
                </div>
              </div>

              {event.time && (
                <div className="flex items-center gap-3 text-sm text-[#FAF0E6]">
                  <div className="w-8 h-8 rounded-lg bg-[#2A1014] border border-[#3D2018] flex items-center justify-center shrink-0 text-[#D4845A]">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[11px] text-[#C4A882] uppercase font-mono">Time</span>
                    <span className="font-semibold tracking-wide">{event.time}</span>
                  </div>
                </div>
              )}

              {event.venue && (
                <div className="flex items-center gap-3 text-sm text-[#FAF0E6]">
                  <div className="w-8 h-8 rounded-lg bg-[#2A1014] border border-[#3D2018] flex items-center justify-center shrink-0 text-[#D4845A]">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[11px] text-[#C4A882] uppercase font-mono">Venue</span>
                    <span className="font-semibold tracking-wide">{event.venue}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <Button
                href="#events"
                variant="primary"
                size="md"
                className="w-full sm:w-auto"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                View Details
              </Button>

              <Button
                href="#events"
                variant="outline"
                size="md"
                className="w-full sm:w-auto"
                icon={<Ticket className="w-4 h-4 text-[#D4845A]" />}
              >
                Register (Audience & Entry)
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
