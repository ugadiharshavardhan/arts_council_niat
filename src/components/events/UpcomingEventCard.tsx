import React from "react";
import Link from "next/link";
import { ImagePlaceholder } from "../ui/ImagePlaceholder";
import { EventItem } from "@/types";
import { Calendar, ArrowRight } from "lucide-react";

interface UpcomingEventCardProps {
  event: EventItem;
}

export const UpcomingEventCard: React.FC<UpcomingEventCardProps> = ({ event }) => {
  return (
    <Link
      href={`/events/${event.id}`}
      className="flex flex-col bg-[#4E2E1E]/80 border border-[#6B3B23] rounded-2xl overflow-hidden group hover:border-[#D98C5B]/60 transition-all duration-300 shadow-md hover:bg-[#4E2E1E]"
    >
      <div className="relative w-full h-48 overflow-hidden bg-[#23120A] shrink-0">
        <ImagePlaceholder
          src={event.image}
          alt={event.title}
          aspectRatio="video"
          className="w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#23120A]/80 via-transparent to-transparent" />
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-0.5 rounded text-[10px] font-mono uppercase bg-[#23120A] text-[#D98C5B] border border-[#6B3B23]">
            {event.category || "Calendar"}
          </span>
        </div>
      </div>

      <div className="p-5 flex flex-col justify-between flex-1">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#D98C5B] mb-1">
            <Calendar className="w-3.5 h-3.5" />
            <span>{event.date}</span>
          </div>
          <h4 className="text-lg font-serif font-bold text-[#F5E6D3] group-hover:text-[#D98C5B] transition-colors mb-2">
            {event.title}
          </h4>
          <p className="text-xs text-[#E7C59F] font-light line-clamp-2 leading-relaxed mb-4">
            {event.description}
          </p>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-[#6B3B23]">
          <span className="text-[11px] font-mono text-[#E7C59F]/80 truncate max-w-[180px]">
            {event.venue}
          </span>
          <span className="inline-flex items-center gap-1 text-xs text-[#D98C5B] group-hover:text-[#E79E70] p-0 transition-colors font-medium">
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </Link>
  );
};
