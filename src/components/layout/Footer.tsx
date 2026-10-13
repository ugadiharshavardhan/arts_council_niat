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
        { label: "Upcoming Events", href: "/events/upcoming" },
        { label: "Past Festivals", href: "/events/past" },
        { label: "Hall of Winners", href: "#winners" },
        { label: "Club Members", href: "/club-members" },
      ],
    },
    {
      title: "Governance",
      links: [
        { label: "Council Leadership", href: "#about" },
        { label: "Featured Members", href: "#members" },
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
    <footer className="bg-[#23120A] text-[#E7C59F] border-t border-[#6B3B23] pt-16 pb-12 overflow-hidden relative">
      {/* Subtle burnt sienna background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[250px] bg-[#D98C5B]/10 blur-[130px] rounded-full pointer-events-none" />

      <Container size="wide">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-14 border-b border-[#6B3B23]">
          {/* Brand Column */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full border border-[#D98C5B]/60 bg-[#4E2E1E] flex items-center justify-center text-[#D98C5B] font-serif font-bold text-sm shadow-md">
                PAC
              </div>
              <span className="font-serif text-lg tracking-wider text-[#F5E6D3] font-bold">
                PERFORMING ARTS COUNCIL
              </span>
            </div>

            <p className="text-sm text-[#E7C59F] max-w-sm font-light leading-relaxed">
              Official collegiate cultural governance body celebrating stagecraft, musical traditions, theatrics, and dance excellence at {siteMetadataInfo.institutionNamePlaceholder}.
            </p>

            <div className="flex flex-wrap items-center gap-2 mt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-[#4E2E1E] border border-[#6B3B23] text-[#D98C5B]">
                <Sparkles className="w-3 h-3" />
                Academic Term: {siteMetadataInfo.academicYear} [PLACEHOLDER]
              </span>
            </div>
          </div>

          {/* Links Columns */}
          {navColumns.map((col) => (
            <div key={col.title} className="flex flex-col gap-3">
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#F5E6D3]">
                {col.title}
              </h3>
              <ul className="flex flex-col gap-2 mt-1">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm transition-colors inline-flex items-center gap-1 group text-[#E7C59F] hover:text-[#D98C5B]"
                    >
                      <span>{link.label}</span>
                      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#D98C5B]" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom row: disclaimer & copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#E7C59F]/70 font-light">
          <p>
            © {currentYear} {siteMetadataInfo.councilName}, {siteMetadataInfo.institutionNamePlaceholder}. All rights reserved.
          </p>

          <p className="flex items-center gap-1 text-[#E7C59F]/70">
            <span>Production-ready UI · Made for student performers</span>
            <Heart className="w-3 h-3 text-[#D98C5B] fill-[#D98C5B] inline" />
          </p>
        </div>
      </Container>
    </footer>
  );
};
