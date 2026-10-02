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
      icon: <CalendarCheck className="w-5 h-5 text-amber-400" />,
    },
    {
      key: "members",
      value: stats.members.value,
      label: stats.members.label,
      confirmed: stats.members.isConfirmed,
      note: "Elected council conveners and wing coordinators",
      icon: <Users className="w-5 h-5 text-amber-400/80" />,
    },
    {
      key: "winners",
      value: stats.winners.value,
      label: stats.winners.label,
      confirmed: stats.winners.isConfirmed,
      note: "Laureates & medalists across academic competitions",
      icon: <Trophy className="w-5 h-5 text-amber-400/80" />,
    },
    {
      key: "participants",
      value: stats.participants.value,
      label: stats.participants.label,
      confirmed: stats.participants.isConfirmed,
      note: "Active collegiate performers across rounds",
      icon: <Award className="w-5 h-5 text-amber-400/80" />,
    },
  ];

  return (
    <section
      id="statistics"
      aria-label="Performing Arts Council Statistics"
      className="py-16 bg-zinc-950 border-y border-zinc-800/80 relative"
    >
      <Container size="wide">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {statItems.map((item) => (
            <div
              key={item.key}
              className={`flex flex-col p-6 rounded-xl border transition-all duration-300 ${
                item.confirmed
                  ? "bg-zinc-900/90 border-amber-400/40 shadow-lg shadow-amber-500/5 ring-1 ring-amber-400/20"
                  : "bg-zinc-900/40 border-zinc-800/80 hover:border-zinc-700"
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-2.5 rounded-lg bg-zinc-800/60 border border-zinc-700/60">
                  {item.icon}
                </div>
                {item.confirmed ? (
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Verified
                  </span>
                ) : (
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700">
                    Awaiting Council Data
                  </span>
                )}
              </div>

              <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-100 font-serif tracking-tight mb-2">
                {item.value}
              </div>

              <div className="text-xs uppercase font-bold tracking-[0.2em] text-amber-400/90 mb-2">
                {item.label}
              </div>

              <p className="text-xs text-zinc-400 font-light leading-relaxed mt-auto">
                {item.note}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
