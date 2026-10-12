import React from "react";
import { ImagePlaceholder } from "../ui/ImagePlaceholder";
import { CouncilMember } from "@/types";
import { ArrowRight } from "lucide-react";

interface CouncilMemberCardProps {
  member: CouncilMember;
}

export const CouncilMemberCard: React.FC<CouncilMemberCardProps> = ({ member }) => {
  return (
    <div className="flex flex-col bg-[#4E2E1E]/80 border border-[#6B3B23] rounded-2xl overflow-hidden group hover:border-[#D98C5B]/60 hover:bg-[#4E2E1E] transition-all duration-300 shadow-lg">
      <div className="relative h-64 bg-[#23120A] overflow-hidden">
        <ImagePlaceholder
          src={member.photo}
          alt={member.name}
          aspectRatio="portrait"
          className="w-full h-full"
          objectPosition={member.imagePosition}
        />

        {member.department && (
          <div className="absolute top-3 left-3">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-mono uppercase bg-[#23120A] text-[#F5E6D3] border border-[#6B3B23] backdrop-blur-sm">
              {member.department}
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
          <ArrowRight className="w-3.5 h-3.5 text-[#E7C59F]/80 group-hover:text-[#D98C5B] group-hover:translate-x-1 transition-all" />
        </div>
      </div>
    </div>
  );
};
