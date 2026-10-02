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
      className="py-16 md:py-24 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 relative overflow-hidden"
    >
      {/* Decorative background lines */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-0 left-1/3 w-px h-full bg-gradient-to-b from-amber-400/0 via-amber-400/40 to-transparent" />
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-amber-400/0 via-amber-400/20 to-transparent" />
      </div>

      <Container size="wide">
        {/* Section context eyebrow */}
        <div className="flex items-center justify-between gap-4 mb-8 border-b border-zinc-800/80 pb-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-amber-400">
              FEATURED UPCOMING SPOTLIGHT
            </span>
          </div>
          <span className="text-xs font-mono text-zinc-500 hidden sm:inline">
            NEXT STAGE ENGAGEMENT
          </span>
        </div>

        {/* Editorial Feature Layout: Large Image + Editorial Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-zinc-950/70 border border-zinc-800/80 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-2xl relative">
          {/* Large Image Column */}
          <div className="lg:col-span-7 relative group overflow-hidden rounded-xl border border-zinc-800">
            <ImagePlaceholder
              src={event.image}
              alt={event.title}
              aspectRatio="video"
              className="w-full h-[320px] sm:h-[420px] lg:h-[460px]"
            />
            {event.badge && (
              <div className="absolute top-4 left-4 z-10">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-amber-400 text-zinc-950 shadow-md">
                  <Sparkles className="w-3.5 h-3.5" />
                  {event.badge}
                </span>
              </div>
            )}
            <div className="absolute bottom-4 right-4 z-10">
              <span className="px-2.5 py-1 rounded bg-black/75 backdrop-blur-md text-[11px] font-mono text-zinc-300 border border-white/10">
                {event.category || "University Gala"}
              </span>
            </div>
          </div>

          {/* Editorial Info Column */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <span className="text-xs font-mono font-medium tracking-[0.25em] text-amber-400 uppercase mb-2">
              FLAGSHIP EVENT PREVIEW
            </span>

            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-zinc-100 leading-tight mb-4">
              {event.title}
            </h3>

            <p className="text-sm sm:text-base text-zinc-300 font-light leading-relaxed mb-6">
              {event.description}
            </p>

            {/* Key Event Metadata Grid */}
            <div className="space-y-3 py-4 border-y border-zinc-800/80 mb-8">
              <div className="flex items-center gap-3 text-sm text-zinc-200">
                <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0 text-amber-400">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-[11px] text-zinc-400 uppercase font-mono">Date</span>
                  <span className="font-semibold tracking-wide">{event.date}</span>
                </div>
              </div>

              {event.time && (
                <div className="flex items-center gap-3 text-sm text-zinc-200">
                  <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0 text-amber-400">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[11px] text-zinc-400 uppercase font-mono">Time</span>
                    <span className="font-semibold tracking-wide">{event.time}</span>
                  </div>
                </div>
              )}

              {event.venue && (
                <div className="flex items-center gap-3 text-sm text-zinc-200">
                  <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0 text-amber-400">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[11px] text-zinc-400 uppercase font-mono">Venue</span>
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
                icon={<Ticket className="w-4 h-4 text-amber-400" />}
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
