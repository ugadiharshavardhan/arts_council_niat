import React from "react";
import { Container } from "../ui/Container";
import { CouncilStats } from "@/types";
import { Award, CalendarCheck, Users, Trophy } from "lucide-react";

interface CouncilStatsProps {
  stats: CouncilStats;
}

export const CouncilStatsSection: React.FC<CouncilStatsProps> = ({ stats }) => {
  const statItems = [
    {
      key: "events",
      value: stats.eventsConducted.value,
      label: stats.eventsConducted.label,
      confirmed: stats.eventsConducted.isConfirmed,
      note: "Confirmed count across theatrical, dance, & musical events",
      icon: <CalendarCheck className="w-5 h-5 text-[#D98C5B]" />,
    },
    {
      key: "members",
      value: stats.members.value,
      label: stats.members.label,
      confirmed: stats.members.isConfirmed,
      note: "Elected council conveners and wing coordinators",
      icon: <Users className="w-5 h-5 text-[#D98C5B]" />,
    },
    {
      key: "winners",
      value: stats.winners.value,
      label: stats.winners.label,
      confirmed: stats.winners.isConfirmed,
      note: "Laureates & medalists across academic competitions",
      icon: <Trophy className="w-5 h-5 text-[#D98C5B]" />,
    },
    {
      key: "participants",
      value: stats.participants.value,
      label: stats.participants.label,
      confirmed: stats.participants.isConfirmed,
      note: "Active collegiate performers across rounds",
      icon: <Award className="w-5 h-5 text-[#D98C5B]" />,
    },
  ];

  return (
    <section
      id="statistics"
      aria-label="Performing Arts Council Statistics"
      className="py-16 bg-[#23120A] border-y border-[#6B3B23] relative"
    >
      <Container size="wide">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {statItems.map((item) => (
            <div
              key={item.key}
              className={`flex flex-col p-6 rounded-xl border transition-all duration-300 ${
                item.confirmed
                  ? "bg-[#4E2E1E] border-[#D98C5B]/40 shadow-lg shadow-[#D98C5B]/10 ring-1 ring-[#D98C5B]/20"
                  : "bg-[#4E2E1E]/60 border-[#6B3B23] hover:border-[#D98C5B]/30"
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-2.5 rounded-lg bg-[#6B3B23]/50 border border-[#6B3B23]">
                  {item.icon}
                </div>
                {item.confirmed ? (
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Verified
                  </span>
                ) : (
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-[#6B3B23]/60 text-[#E7C59F] border border-[#6B3B23]">
                    Awaiting Council Data
                  </span>
                )}
              </div>

              <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F5E6D3] font-serif tracking-tight mb-2">
                {item.value}
              </div>

              <div className="text-xs uppercase font-bold tracking-[0.2em] text-[#D98C5B] mb-2 font-mono">
                {item.label}
              </div>

              <p className="text-xs text-[#E7C59F] font-light leading-relaxed mt-auto">
                {item.note}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
