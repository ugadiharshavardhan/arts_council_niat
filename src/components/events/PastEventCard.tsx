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
      className="flex flex-col bg-[#2A1014]/60 border border-[#3D2018] rounded-2xl overflow-hidden group hover:border-[#D4845A]/40 hover:bg-[#2A1014] transition-all duration-300 shadow-md"
    >
      <div className="relative h-48 bg-[#1C0F0A] overflow-hidden">
        <ImagePlaceholder
          src={event.image}
          alt={event.title}
          aspectRatio="video"
          className="w-full h-full filter saturate-[0.85] group-hover:saturate-100 transition-all duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1C0F0A] via-[#1C0F0A]/20 to-transparent" />
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-0.5 rounded text-[10px] font-mono uppercase bg-[#1C0F0A]/80 text-[#D4845A] border border-[#3D2018] backdrop-blur-sm">
            {event.category || "Archive"}
          </span>
        </div>
      </div>

      <div className="p-5 flex flex-col justify-between flex-1">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-mono text-[#C4A882] mb-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#D4845A]" />
            <span>{event.date}</span>
          </div>

          <h4 className="text-base font-serif font-bold text-[#FAF0E6] group-hover:text-[#E8C87A] transition-colors mb-2 line-clamp-1">
            {event.title}
          </h4>

          <p className="text-xs text-[#C4A882] font-light line-clamp-3 leading-relaxed mb-4">
            {event.description}
          </p>
        </div>

        <div className="pt-3 border-t border-[#3D2018] flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#C4A882]/70 truncate max-w-[140px]">
            <MapPin className="w-3 h-3 text-[#C4A882]/50 shrink-0" />
            <span className="truncate">{event.venue}</span>
          </div>

          <span className="inline-flex items-center gap-1 text-xs text-[#D4845A] group-hover:text-[#E8C87A] p-0 transition-colors font-medium">
            <span>View Event</span>
            <ArrowRight className="w-3 h-3" />
          </span>
        </div>
      </div>
    </Link>
  );
};
