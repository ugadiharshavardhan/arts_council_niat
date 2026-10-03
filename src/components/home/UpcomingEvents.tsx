import React from "react";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { Button } from "../ui/Button";
import { ImagePlaceholder } from "../ui/ImagePlaceholder";
import { EventItem } from "@/types";
import { Calendar, Clock, MapPin, ArrowRight, Sparkles } from "lucide-react";

interface UpcomingEventsProps {
  events: EventItem[];
}

export const UpcomingEvents: React.FC<UpcomingEventsProps> = ({ events }) => {
  if (!events || events.length === 0) {
    return (
      <section id="events" className="py-20 bg-zinc-900/30">
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

  const [featuredEvent, ...secondaryEvents] = events;

  return (
    <section
      id="events"
      aria-label="Upcoming Events Calendar"
      className="py-20 md:py-28 bg-zinc-950 relative"
    >
      <Container size="wide">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <SectionHeading
            eyebrow="Auditorium & Stage Calendar"
            title="Upcoming Events"
            description="Discover our scheduled inter-house dramatics, classical symposiums, choreography nights, and live acoustic recitals."
            badge="Season 2026-27"
            className="mb-0"
          />

          <div className="mt-6 md:mt-0 shrink-0">
            <Button
                    href="#events"
              variant="outline"
              size="md"
              icon={<ArrowRight className="w-4 h-4 text-amber-400" />}
            >
              View All Upcoming Events
            </Button>
          </div>
        </div>

        {/* Asymmetrical Layout: 1 Large Featured Event + 2 Secondary Vertical Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Main Featured Event (7 columns) */}
          {featuredEvent && (
            <div className="lg:col-span-7 flex flex-col bg-zinc-900/60 border border-zinc-800 rounded-2xl overflow-hidden group hover:border-amber-400/50 transition-all duration-300 shadow-xl">
              <div className="relative h-[280px] sm:h-[360px] overflow-hidden bg-zinc-950">
                <ImagePlaceholder
                  src={featuredEvent.image}
                  alt={featuredEvent.title}
                  aspectRatio="video"
                  className="w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent" />

                {featuredEvent.badge && (
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-amber-400 text-zinc-950 shadow-md">
                      <Sparkles className="w-3.5 h-3.5" />
                      {featuredEvent.badge}
                    </span>
                  </div>
                )}

                <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded bg-black/80 backdrop-blur-md text-xs font-mono text-amber-400 border border-amber-400/30">
                    {featuredEvent.category || "Featured Production"}
                  </span>
                  <span className="text-xs font-mono text-zinc-400">
                    {featuredEvent.date}
                  </span>
                </div>
              </div>

              <div className="p-6 sm:p-8 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-zinc-100 group-hover:text-amber-300 transition-colors mb-3">
                    {featuredEvent.title}
                  </h3>
                  <p className="text-sm text-zinc-300 font-light leading-relaxed mb-6">
                    {featuredEvent.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-zinc-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4 text-xs font-mono text-zinc-400">
                    {featuredEvent.time && (
                      <span className="inline-flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-amber-400" />
                        {featuredEvent.time}
                      </span>
                    )}
                    {featuredEvent.venue && (
                      <span className="inline-flex items-center gap-1.5 truncate max-w-[200px]">
                        <MapPin className="w-3.5 h-3.5 text-amber-400" />
                        {featuredEvent.venue}
                      </span>
                    )}
                  </div>

                  <Button
                          href="#events"
                    variant="primary"
                    size="sm"
                    icon={<ArrowRight className="w-3.5 h-3.5" />}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Secondary Events Column (5 columns) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {secondaryEvents.map((evt) => (
              <div
                key={evt.id}
                className="flex flex-col sm:flex-row lg:flex-col bg-zinc-900/40 border border-zinc-800 rounded-2xl overflow-hidden group hover:border-amber-400/40 transition-all duration-300 shadow-md flex-1"
              >
                <div className="relative sm:w-1/2 lg:w-full h-48 overflow-hidden bg-zinc-950 shrink-0">
                  <ImagePlaceholder
                    src={evt.image}
                    alt={evt.title}
                    aspectRatio="video"
                    className="w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-mono uppercase bg-zinc-900/90 text-amber-400 border border-zinc-700">
                      {evt.category || "Calendar"}
                    </span>
                  </div>
                </div>

                <div className="p-5 flex flex-col justify-between flex-1">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-mono text-amber-400/90 mb-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{evt.date}</span>
                    </div>
                    <h4 className="text-lg font-serif font-bold text-zinc-100 group-hover:text-amber-300 transition-colors mb-2">
                      {evt.title}
                    </h4>
                    <p className="text-xs text-zinc-400 font-light line-clamp-2 leading-relaxed mb-4">
                      {evt.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-zinc-800/80">
                    <span className="text-[11px] font-mono text-zinc-500 truncate max-w-[180px]">
                      {evt.venue}
                    </span>
                    <Button
                            href="#events"
                      variant="ghost"
                      size="sm"
                      className="text-xs text-amber-400 hover:text-amber-300 p-0"
                      icon={<ArrowRight className="w-3.5 h-3.5" />}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};
