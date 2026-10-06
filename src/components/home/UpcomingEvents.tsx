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
      <section id="events" className="py-20 bg-[#2A1014]/30">
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
      className="py-20 md:py-28 bg-[#1C0F0A] relative"
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
              href="/events/upcoming"
              variant="outline"
              size="md"
              icon={<ArrowRight className="w-4 h-4 text-[#D4845A]" />}
            >
              View All Upcoming Events
            </Button>
          </div>
        </div>

        {/* Asymmetrical Layout: 1 Large Featured Event + 2 Secondary Vertical Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Main Featured Event (7 columns) */}
          {featuredEvent && (
            <div className="lg:col-span-7 flex flex-col bg-[#2A1014] border border-[#3D2018] rounded-2xl overflow-hidden group hover:border-[#D4845A]/50 transition-all duration-300 shadow-xl">
              <div className="relative h-[280px] sm:h-[360px] overflow-hidden bg-[#1C0F0A]">
                <ImagePlaceholder
                  src={featuredEvent.image}
                  alt={featuredEvent.title}
                  aspectRatio="video"
                  className="w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C0F0A] via-[#1C0F0A]/30 to-transparent" />

                {featuredEvent.badge && (
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#D4845A] text-[#1C0F0A] shadow-md">
                      <Sparkles className="w-3.5 h-3.5" />
                      {featuredEvent.badge}
                    </span>
                  </div>
                )}

                <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded bg-[#1C0F0A]/80 backdrop-blur-md text-xs font-mono text-[#D4845A] border border-[#D4845A]/30">
                    {featuredEvent.category || "Featured Production"}
                  </span>
                  <span className="text-xs font-mono text-[#C4A882]">
                    {featuredEvent.date}
                  </span>
                </div>
              </div>

              <div className="p-6 sm:p-8 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#FAF0E6] group-hover:text-[#E8C87A] transition-colors mb-3">
                    {featuredEvent.title}
                  </h3>
                  <p className="text-sm text-[#C4A882] font-light leading-relaxed mb-6">
                    {featuredEvent.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#3D2018] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4 text-xs font-mono text-[#C4A882]">
                    {featuredEvent.time && (
                      <span className="inline-flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#D4845A]" />
                        {featuredEvent.time}
                      </span>
                    )}
                    {featuredEvent.venue && (
                      <span className="inline-flex items-center gap-1.5 truncate max-w-[200px]">
                        <MapPin className="w-3.5 h-3.5 text-[#D4845A]" />
                        {featuredEvent.venue}
                      </span>
                    )}
                  </div>

                  <Button
                    href={`/events/${featuredEvent.id}`}
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
                className="flex flex-col sm:flex-row lg:flex-col bg-[#2A1014]/60 border border-[#3D2018] rounded-2xl overflow-hidden group hover:border-[#D4845A]/40 transition-all duration-300 shadow-md flex-1"
              >
                <div className="relative sm:w-1/2 lg:w-full h-48 overflow-hidden bg-[#1C0F0A] shrink-0">
                  <ImagePlaceholder
                    src={evt.image}
                    alt={evt.title}
                    aspectRatio="video"
                    className="w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1C0F0A]/80 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-mono uppercase bg-[#2A1014] text-[#D4845A] border border-[#3D2018]">
                      {evt.category || "Calendar"}
                    </span>
                  </div>
                </div>

                <div className="p-5 flex flex-col justify-between flex-1">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-mono text-[#D4845A] mb-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{evt.date}</span>
                    </div>
                    <h4 className="text-lg font-serif font-bold text-[#FAF0E6] group-hover:text-[#E8C87A] transition-colors mb-2">
                      {evt.title}
                    </h4>
                    <p className="text-xs text-[#C4A882] font-light line-clamp-2 leading-relaxed mb-4">
                      {evt.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-[#3D2018]">
                    <span className="text-[11px] font-mono text-[#C4A882]/70 truncate max-w-[180px]">
                      {evt.venue}
                    </span>
                    <Button
                      href={`/events/${evt.id}`}
                      variant="ghost"
                      size="sm"
                      className="text-xs text-[#D4845A] hover:text-[#E8C87A] p-0"
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
