"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
import { Menu, X, Sparkles } from "lucide-react";

interface NavbarProps {
  institutionName?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  institutionName = "[Institution Name]",
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      const sections = [
        "hero",
        "upcoming-feature",
        "events",
        "winners",
        "leaderboard",
        "auction",
        "members",
        "manifesto",
      ];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "#hero", id: "hero" },
    { label: "Upcoming Events", href: "#events", id: "events" },
    { label: "Past Events", href: "#past-events", id: "past-events" },
    { label: "Winners", href: "#winners", id: "winners" },
    { label: "Leaderboard", href: "#leaderboard", id: "leaderboard" },
    { label: "Council Members", href: "#members", id: "members" },
    { label: "Manifesto", href: "#manifesto", id: "manifesto" },
    { label: "About", href: "#leadership", id: "leadership" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-zinc-950/85 backdrop-blur-md border-b border-zinc-800/80 shadow-lg py-3"
          : "bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5"
      }`}
    >
      <Container size="wide">
        <div className="flex items-center justify-between">
          {/* Logo & Identity */}
          <Link
            href="#hero"
            className="group flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-amber-400 rounded-lg p-1"
          >
            <div className="w-10 h-10 rounded-full border border-amber-400/40 bg-zinc-900 flex items-center justify-center text-amber-400 font-serif font-bold text-lg shadow-inner group-hover:border-amber-400 group-hover:scale-105 transition-transform duration-300">
              <span className="bg-gradient-to-br from-amber-200 to-amber-500 bg-clip-text text-transparent">
                PAC
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs tracking-[0.2em] font-semibold text-amber-400 uppercase font-sans">
                Performing Arts Council
              </span>
              <span className="text-[11px] text-zinc-400 font-light truncate max-w-[200px] sm:max-w-none">
                {institutionName}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav
            aria-label="Main Navigation"
            className="hidden xl:flex items-center gap-1 bg-zinc-900/60 p-1.5 rounded-full border border-zinc-800/60 backdrop-blur-md"
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ${
                    isActive
                      ? "bg-amber-400 text-zinc-950 font-semibold shadow-sm"
                      : "text-zinc-300 hover:text-white hover:bg-zinc-800/60"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action CTA & Mobile Button */}
          <div className="flex items-center gap-3">
            <Button
              href="#upcoming-feature"
              variant="outline"
              size="sm"
              className="hidden sm:inline-flex border-amber-400/30 text-amber-300 hover:bg-amber-400/10"
              icon={<Sparkles className="w-3.5 h-3.5 text-amber-400" />}
            >
              Latest Showcase
            </Button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden fixed inset-x-0 top-[65px] bg-zinc-950/95 backdrop-blur-xl border-b border-zinc-800 px-6 py-6 shadow-2xl transition-all duration-300 animate-in slide-in-from-top">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-500 mb-1 px-3">
              Council Navigation
            </span>
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-lg text-sm font-medium text-zinc-200 hover:text-amber-400 hover:bg-zinc-900 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 mt-2 border-t border-zinc-800/80 flex flex-col gap-2">
              <Button
                href="#upcoming-feature"
                variant="gold"
                size="md"
                className="w-full"
                onClick={() => setMobileMenuOpen(false)}
              >
                View Upcoming Spotlight
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
