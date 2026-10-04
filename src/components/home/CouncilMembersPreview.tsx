import React from "react";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { Button } from "../ui/Button";
import { ImagePlaceholder } from "../ui/ImagePlaceholder";
import { CouncilMember } from "@/types";
import { Users, ArrowRight } from "lucide-react";

interface CouncilMembersPreviewProps {
  members: CouncilMember[];
}

export const CouncilMembersPreview: React.FC<CouncilMembersPreviewProps> = ({
  members,
}) => {
  return (
    <section
      id="members"
      aria-label="Meet the Council Members"
      className="py-20 md:py-28 bg-[#1C0F0A] relative border-t border-[#3D2018]"
    >
      <Container size="wide">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <SectionHeading
            eyebrow="Student Representatives"
            title="Club Members"
            description="Dedicated student directors, stage coordinators, acoustic curators, and logistics conveners powering every council production."
            badge="Executive Board 2026-27"
            className="mb-0"
          />

          <div className="mt-6 md:mt-0 shrink-0">
            <Button
              href="#members"
              variant="outline"
              size="md"
              icon={<Users className="w-4 h-4 text-[#D4845A]" />}
            >
              Meet Club Members
            </Button>
          </div>
        </div>

        {/* 6 Featured Members Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {members.slice(0, 6).map((member) => (
            <div
              key={member.id}
              className="flex flex-col bg-[#2A1014]/60 border border-[#3D2018] rounded-2xl overflow-hidden group hover:border-[#D4845A]/40 hover:bg-[#2A1014] transition-all duration-300 shadow-lg"
            >
              <div className="relative h-64 bg-[#1C0F0A] overflow-hidden">
                <ImagePlaceholder
                  src={member.photo}
                  alt={member.name}
                  aspectRatio="portrait"
                  className="w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C0F0A] via-[#1C0F0A]/20 to-transparent" />
                
                {member.department && (
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-mono uppercase bg-[#2A1014] text-[#FAF0E6] border border-[#3D2018] backdrop-blur-sm">
                      {member.department}
                    </span>
                  </div>
                )}
              </div>

              <div className="p-5 flex flex-col justify-between flex-1">
                <div>
                  <h4 className="text-lg font-serif font-bold text-[#FAF0E6] group-hover:text-[#E8C87A] transition-colors">
                    {member.name}
                  </h4>
                  <p className="text-xs font-mono text-[#D4845A] mt-1">
                    {member.role}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#3D2018] flex items-center justify-between text-[11px] font-mono text-[#C4A882]/70">
                  <span>Student ID: [REDACTED/MOCK]</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#C4A882]/70 group-hover:text-[#D4845A] group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
