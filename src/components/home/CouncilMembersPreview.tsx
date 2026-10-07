import React from "react";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { Button } from "../ui/Button";
import { CouncilMemberCard } from "../members/CouncilMemberCard";
import { CouncilMember } from "@/types";
import { Users } from "lucide-react";

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
              href="/club-members"
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
            <CouncilMemberCard key={member.id} member={member} />
          ))}
        </div>
      </Container>
    </section>
  );
};
