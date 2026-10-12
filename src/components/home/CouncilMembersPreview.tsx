import React, { useMemo } from "react";
import Link from "next/link";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { Button } from "../ui/Button";
import { CouncilMemberCard } from "../members/CouncilMemberCard";
import { CouncilMember } from "@/types";
import { buildCouncilsHierarchy } from "@/data/members";
import { Users } from "lucide-react";

interface CouncilMembersPreviewProps {
  members: CouncilMember[];
}

export const CouncilMembersPreview: React.FC<CouncilMembersPreviewProps> = ({
  members,
}) => {
  // Only display Club Heads on the landing page preview (do not show all general members)
  const clubHeads = useMemo(() => {
    try {
      const hierarchy = buildCouncilsHierarchy(members);
      const heads = hierarchy.councils
        .map((c) => c.head)
        .filter((h): h is CouncilMember => Boolean(h));

      if (heads.length > 0) return heads;
    } catch (e) {
      console.error(e);
    }

    // Fallback: filter for heads, excluding executive leadership (president & VP are in LeadershipSection)
    return members.filter((m) => {
      const role = (m.role || "").toLowerCase();
      const isExec = role.includes("president") || role.includes("vice");
      return !isExec && (role.includes("head") || role.includes("lead"));
    });
  }, [members]);

  return (
    <section
      id="members"
      aria-label="Meet the Council Members"
      className="py-20 md:py-28 bg-[#23120A] relative border-t border-[#6B3B23]"
    >
      <Container size="wide">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <SectionHeading
            eyebrow="Department Directorate"
            title="Club Heads"
            description="Dedicated student directors and conveners leading each council vertical, production wing, and creative department."
            badge="Club Heads 2026-27"
            className="mb-0"
          />

          <div className="mt-6 md:mt-0 shrink-0">
            <Button
              href="/club-members"
              variant="outline"
              size="md"
              icon={<Users className="w-4 h-4 text-[#D98C5B]" />}
            >
              Explore All Members & Teams
            </Button>
          </div>
        </div>

        {/* Club Heads Grid (Shows only Department Heads, not all club members) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {clubHeads.map((member) => (
            <Link
              key={member.id}
              href="/club-members"
              className="block group h-full no-underline"
            >
              <CouncilMemberCard
                member={member}
                actionLabel="View Department"
              />
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
};
