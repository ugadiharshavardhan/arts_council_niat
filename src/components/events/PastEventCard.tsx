import React from "react";
import Link from "next/link";
import { ImagePlaceholder } from "../ui/ImagePlaceholder";
import { EventItem } from "@/types";
import { Calendar, MapPin, ArrowRight } from "lucide-react";

interface PastEventCardProps {
  event: EventItem;
}

export const PastEventCard: React.FC<PastEventCardProps> = ({ event }) => {
  return (
    <Link
      href={`/events/${event.id}`}
      className="flex flex-col bg-[#4E2E1E]/80 border border-[#6B3B23] rounded-2xl overflow-hidden group hover:border-[#D98C5B]/60 hover:bg-[#4E2E1E] transition-all duration-300 shadow-md"
    >
      <div className="relative h-48 bg-[#23120A] overflow-hidden">
        <ImagePlaceholder
          src={event.image}
          alt={event.title}
          aspectRatio="video"
          className="w-full h-full filter saturate-[0.85] group-hover:saturate-100 transition-all duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#23120A] via-[#23120A]/20 to-transparent" />
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-0.5 rounded text-[10px] font-sans font-medium uppercase tracking-wider bg-[#23120A]/85 text-[#D98C5B] border border-[#6B3B23] backdrop-blur-sm">
            {event.category || "Archive"}
          </span>
        </div>
      </div>

      <div className="p-5 flex flex-col justify-between flex-1">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-sans font-medium text-[#E7C59F] mb-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#D98C5B]" />
            <span>{event.date}</span>
          </div>

          <h4 className="text-base font-sans font-semibold text-[#F5E6D3] group-hover:text-[#D98C5B] transition-colors mb-2 line-clamp-1">
            {event.title}
          </h4>

          <p className="text-xs font-sans font-normal text-[#E7C59F] line-clamp-3 leading-relaxed mb-4">
            {event.description}
          </p>
        </div>

        <div className="pt-3 border-t border-[#6B3B23] flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[10px] font-sans text-[#E7C59F]/80 truncate max-w-[140px]">
            <MapPin className="w-3 h-3 text-[#E7C59F]/50 shrink-0" />
            <span className="truncate">{event.venue}</span>
          </div>

          <span className="inline-flex items-center gap-1 text-xs font-sans text-[#D98C5B] group-hover:text-[#E79E70] p-0 transition-colors font-medium">
            <span>View Event</span>
            <ArrowRight className="w-3 h-3" />
          </span>
        </div>
      </div>
    </Link>
  );
};
