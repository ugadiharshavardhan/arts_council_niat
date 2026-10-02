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
      className="py-20 md:py-28 bg-zinc-950 relative border-t border-zinc-900"
    >
      <Container size="wide">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <SectionHeading
            eyebrow="Student Representatives"
            title="Council Members"
            description="Dedicated student directors, stage coordinators, acoustic curators, and logistics conveners powering every council production."
            badge="Executive Board 2026-27"
            className="mb-0"
          />

          <div className="mt-6 md:mt-0 shrink-0">
            <Button
              href="#members"
              variant="outline"
              size="md"
              icon={<Users className="w-4 h-4 text-amber-400" />}
            >
              Meet the Full Council
            </Button>
          </div>
        </div>

        {/* 6 Featured Members Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {members.slice(0, 6).map((member) => (
            <div
              key={member.id}
              className="flex flex-col bg-zinc-900/40 border border-zinc-800/80 rounded-2xl overflow-hidden group hover:border-amber-400/40 hover:bg-zinc-900/70 transition-all duration-300 shadow-lg"
            >
              <div className="relative h-64 bg-zinc-950 overflow-hidden">
                <ImagePlaceholder
                  src={member.photo}
                  alt={member.name}
                  aspectRatio="portrait"
                  className="w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
                
                {member.department && (
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-mono uppercase bg-zinc-900/90 text-zinc-300 border border-zinc-700 backdrop-blur-sm">
                      {member.department}
                    </span>
                  </div>
                )}
              </div>

              <div className="p-5 flex flex-col justify-between flex-1">
                <div>
                  <h4 className="text-lg font-serif font-bold text-zinc-100 group-hover:text-amber-300 transition-colors">
                    {member.name}
                  </h4>
                  <p className="text-xs font-mono text-amber-400/90 mt-1">
                    {member.role}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-zinc-800/60 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                  <span>Student ID: [REDACTED/MOCK]</span>
                  <ArrowRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
