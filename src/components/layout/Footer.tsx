import React from "react";
import Link from "next/link";
import { Container } from "../ui/Container";
import { siteMetadataInfo } from "@/data/home";
import { ArrowUpRight, Heart, Sparkles } from "lucide-react";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const navColumns = [
    {
      title: "Discover PAC",
      links: [
        { label: "Upcoming Events", href: "#events" },
        { label: "Past Festivals", href: "#past-events" },
        { label: "Hall of Winners", href: "#winners" },
        { label: "Council Leaderboard", href: "#leaderboard" },
      ],
    },
    {
      title: "Governance",
      links: [
        { label: "Council Leadership", href: "#leadership" },
        { label: "Featured Members", href: "#members" },
        { label: "President's Manifesto", href: "#manifesto" },
        { label: "Special Laddu Auction", href: "#auction" },
      ],
    },
    {
      title: "Placeholder Connect",
      links: [
        { label: "Instagram [PLACEHOLDER]", href: "#" },
        { label: "YouTube Showcase [PLACEHOLDER]", href: "#" },
        { label: "Campus Cultural Office [PLACEHOLDER]", href: "#" },
        { label: "Student Audition Desk [PLACEHOLDER]", href: "#" },
      ],
    },
  ];

  return (
    <footer className="bg-zinc-950 text-zinc-400 border-t border-zinc-800/80 pt-16 pb-12 overflow-hidden relative">
      {/* Subtle background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[250px] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />

      <Container size="wide">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-14 border-b border-zinc-900">
          {/* Brand Column */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full border border-amber-400/50 bg-zinc-900 flex items-center justify-center text-amber-400 font-serif font-bold text-sm">
                PAC
              </div>
              <span className="font-serif text-lg tracking-wider text-zinc-100 font-bold">
                PERFORMING ARTS COUNCIL
              </span>
            </div>

            <p className="text-sm text-zinc-400 max-w-sm font-light leading-relaxed">
              Official collegiate cultural governance body celebrating stagecraft, musical traditions, theatrics, and dance excellence at {siteMetadataInfo.institutionNamePlaceholder}.
            </p>

            <div className="flex items-center gap-2 mt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-zinc-900 border border-zinc-800 text-amber-400">
                <Sparkles className="w-3 h-3" />
                Academic Term: {siteMetadataInfo.academicYear} [PLACEHOLDER]
              </span>
            </div>
          </div>

          {/* Links Columns */}
          {navColumns.map((col) => (
            <div key={col.title} className="flex flex-col gap-3">
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-200">
                {col.title}
              </h3>
              <ul className="flex flex-col gap-2 mt-1">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-zinc-400 hover:text-amber-400 transition-colors inline-flex items-center gap-1 group"
                    >
                      <span>{link.label}</span>
                      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-amber-400" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom row: disclaimer & copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400 font-light">
          <p>
            © {currentYear} {siteMetadataInfo.councilName}, {siteMetadataInfo.institutionNamePlaceholder}. All rights reserved.
          </p>

          <p className="flex items-center gap-1 text-zinc-400">
            <span>Production-ready UI · Made for student performers</span>
            <Heart className="w-3 h-3 text-red-500 fill-red-500 inline" />
          </p>
        </div>
      </Container>
    </footer>
  );
};
