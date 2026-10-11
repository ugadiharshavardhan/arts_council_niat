"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import PillNav from "./PillNav";

interface NavbarProps {
  institutionName?: string;
}

// Nav items — all have dedicated pages now; use clean page routes.
// sectionId is retained for homepage scroll-spy active-state detection only.
const NAV_CONFIG = [
  { label: "About",           pageRoute: "/about",           sectionId: "about"      },
  { label: "Upcoming Events", pageRoute: "/events/upcoming", sectionId: "events"     },
  { label: "Past Events",     pageRoute: "/events/past",     sectionId: "past-events"},
  { label: "Winners",         pageRoute: "/winners",         sectionId: "winners"    },
  { label: "Club Members",    pageRoute: "/club-members",    sectionId: "members"    },
] as const;


export const Navbar: React.FC<NavbarProps> = () => {
  const [activeSection, setActiveSection] = useState("about");
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  // Scroll-spy: only active on the homepage
  useEffect(() => {
    if (!isHomePage) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 220;
      for (const item of NAV_CONFIG) {
        const el = document.getElementById(item.sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  // All items have dedicated pages — always use the page route.
  const navItems = NAV_CONFIG.map((item) => ({
    label: item.label,
    href: item.pageRoute,
  }));

  // Determine the active href:
  //   - On the homepage, find the pageRoute for the currently scrolled-to section.
  //   - On a dedicated page, match by pathname.
  const activeHref = isHomePage
    ? (NAV_CONFIG.find((item) => item.sectionId === activeSection)?.pageRoute ?? "")
    : (NAV_CONFIG.find((item) => pathname.startsWith(item.pageRoute))?.pageRoute ?? "");

  return (
    <header className="fixed top-0 left-0 right-0 z-40 flex justify-center pointer-events-none">
      <div className="pointer-events-auto w-full flex justify-center">
        <PillNav
          logo="/pac-logo.svg"
          logoAlt="Performing Arts Council Logo"
          logoHref="/"
          items={navItems}
          activeHref={activeHref}
          baseColor="#D4845A"
          pillColor="#2A1014"
          hoveredPillTextColor="#1C0F0A"
          pillTextColor="#FAF0E6"
          ease="power3.easeOut"
          initialLoadAnimation={false}
        />
      </div>
    </header>
  );
};
