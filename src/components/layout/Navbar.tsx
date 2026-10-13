"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  institutionName?: string;
}

const NAV_ITEMS = [
  { label: "About", href: "/about" },
  { label: "Upcoming Events", href: "/events/upcoming" },
  { label: "Past Events", href: "/events/past" },
  { label: "Club Members", href: "/club-members" },
  { label: "Winners", href: "/winners" },
] as const;

export const Navbar: React.FC<NavbarProps> = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#23120A]/95 backdrop-blur-md border-b border-[#6B3B23] shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand / Logo (Static normal crest, no rotation) */}
        <Link href="/" className="flex items-center gap-3.5 group no-underline">
          <img
            src="/arts_logo.jpeg"
            alt="Arts Council NIAT Logo"
            className="w-11 h-11 rounded-full object-cover border border-[#D98C5B]/50 shadow-md group-hover:border-[#D98C5B] transition-colors"
          />
          <div className="flex flex-col">
            <span className="font-serif font-bold text-base sm:text-lg text-[#F5E6D3] tracking-tight group-hover:text-[#D98C5B] transition-colors leading-tight">
              Performing Arts Council
            </span>
            <span className="text-[11px] font-mono tracking-widest text-[#D98C5B] uppercase font-bold">
              NIAT
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1.5" aria-label="Main Navigation">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3.5 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all ${
                  active
                    ? "text-[#F5E6D3] bg-[#4E2E1E] border border-[#8B4513] font-bold shadow-sm"
                    : "text-[#E7C59F]/80 hover:text-[#F5E6D3] hover:bg-[#4E2E1E]/50 border border-transparent"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="lg:hidden p-2 rounded-xl text-[#E7C59F] hover:text-[#F5E6D3] bg-[#4E2E1E] border border-[#6B3B23] transition-colors cursor-pointer"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#23120A] border-t border-[#6B3B23] px-4 pt-3 pb-6 animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-2" aria-label="Mobile Navigation">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider transition-colors ${
                    active
                      ? "text-[#F5E6D3] bg-[#4E2E1E] border border-[#8B4513] font-bold"
                      : "text-[#E7C59F] hover:text-[#F5E6D3] hover:bg-[#4E2E1E]/50"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
};
