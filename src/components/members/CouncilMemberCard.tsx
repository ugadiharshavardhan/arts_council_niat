import React from "react";
import Link from "next/link";
import { ImagePlaceholder } from "../ui/ImagePlaceholder";
import { CouncilMember } from "@/types";
import { ArrowRight } from "lucide-react";

interface CouncilMemberCardProps {
  member: CouncilMember;
  teamUrl?: string;
  onClick?: () => void;
  isActive?: boolean;
  actionLabel?: string;
}

export const CouncilMemberCard: React.FC<CouncilMemberCardProps> = ({
  member,
  teamUrl,
  onClick,
  isActive = false,
  actionLabel,
}) => {
  const destinationUrl = teamUrl !== undefined ? teamUrl : member.teamUrl;

  const cardContent = (
    <div
      onClick={onClick}
      className={`flex flex-col rounded-2xl overflow-hidden group transition-all duration-300 shadow-lg text-left h-full ${
        onClick ? "cursor-pointer" : ""
      } ${
        isActive
          ? "bg-[#5A3320] border-2 border-[#D98C5B] shadow-[0_0_24px_rgba(217,140,91,0.35)] ring-2 ring-[#D98C5B]/40"
          : "bg-[#4E2E1E]/80 border border-[#6B3B23] hover:border-[#D98C5B]/70 hover:bg-[#4E2E1E]"
      }`}
    >
      <div className="relative h-64 bg-[#23120A] overflow-hidden">
        <ImagePlaceholder
          src={member.photo}
          alt={member.name}
          aspectRatio="portrait"
          className="w-full h-full group-hover:scale-105 transition-transform duration-500"
          objectPosition={member.imagePosition}
        />

        {member.department && (
          <div className="absolute top-3 left-3 z-10">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-mono uppercase bg-[#23120A]/90 text-[#F5E6D3] border border-[#6B3B23] backdrop-blur-sm">
              {member.department}
            </span>
          </div>
        )}

        {isActive && (
          <div className="absolute top-3 right-3 z-10">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-mono uppercase bg-[#D98C5B] text-[#23120A] font-bold shadow-md">
              Selected
            </span>
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col justify-between flex-1">
        <div>
          <h4 className="text-lg font-serif font-bold text-[#F5E6D3] group-hover:text-[#D98C5B] transition-colors">
            {member.name}
          </h4>
          <p className="text-xs font-mono text-[#D98C5B] mt-1 font-semibold">
            {member.role}
          </p>
        </div>

        <div className="pt-4 mt-4 border-t border-[#6B3B23] flex items-center justify-between text-[11px] font-mono text-[#E7C59F]/80">
          <span>Student ID: {member.studentId || "—"}</span>

          {actionLabel ? (
            <span className="inline-flex items-center gap-1 text-[#D98C5B] group-hover:text-[#F5E6D3] font-bold transition-colors">
              <span>{actionLabel}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
          ) : destinationUrl && !onClick ? (
            <Link
              href={destinationUrl}
              aria-label={`View ${member.name}'s team`}
              title={`View ${member.name}'s team`}
              className="p-1 -mr-1 rounded-full text-[#E7C59F]/80 hover:text-[#D98C5B] hover:bg-[#351C11] transition-all cursor-pointer group/arrow"
            >
              <ArrowRight className="w-3.5 h-3.5 text-[#E7C59F]/80 group-hover:text-[#D98C5B] group-hover/arrow:text-[#F5E6D3] group-hover:translate-x-1 transition-all" />
            </Link>
          ) : (
            <ArrowRight className="w-3.5 h-3.5 text-[#E7C59F]/80 group-hover:text-[#D98C5B] group-hover:translate-x-1 transition-all" />
          )}
        </div>
      </div>
    </div>
  );

  return cardContent;
};
