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
      className="flex flex-col bg-[#2A1014]/60 border border-[#3D2018] rounded-2xl overflow-hidden group hover:border-[#D4845A]/40 transition-all duration-300 shadow-md"
    >
      <div className="relative w-full h-48 overflow-hidden bg-[#1C0F0A] shrink-0">
        <ImagePlaceholder
          src={event.image}
          alt={event.title}
          aspectRatio="video"
          className="w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1C0F0A]/80 via-transparent to-transparent" />
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-0.5 rounded text-[10px] font-mono uppercase bg-[#2A1014] text-[#D4845A] border border-[#3D2018]">
            {event.category || "Calendar"}
          </span>
        </div>
      </div>

      <div className="p-5 flex flex-col justify-between flex-1">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#D4845A] mb-1">
            <Calendar className="w-3.5 h-3.5" />
            <span>{event.date}</span>
          </div>
          <h4 className="text-lg font-serif font-bold text-[#FAF0E6] group-hover:text-[#E8C87A] transition-colors mb-2">
            {event.title}
          </h4>
          <p className="text-xs text-[#C4A882] font-light line-clamp-2 leading-relaxed mb-4">
            {event.description}
          </p>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-[#3D2018]">
          <span className="text-[11px] font-mono text-[#C4A882]/70 truncate max-w-[180px]">
            {event.venue}
          </span>
          <span className="inline-flex items-center gap-1 text-xs text-[#D4845A] group-hover:text-[#E8C87A] p-0 transition-colors font-medium">
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </Link>
  );
};
