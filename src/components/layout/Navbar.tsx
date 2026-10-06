"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import PillNav from "./PillNav";

interface NavbarProps {
  institutionName?: string;
}

const SECTION_LINKS = [
  { label: "About", id: "about" },
  { label: "Upcoming Events", id: "events" },
  { label: "Past Events", id: "past-events" },
  { label: "Winners", id: "winners" },
  { label: "Club Members", id: "members" },
];

export const Navbar: React.FC<NavbarProps> = () => {
  const [activeSection, setActiveSection] = useState("about");
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  useEffect(() => {
    if (!isHomePage) return;

    const handleScroll = () => {
      const sections = [
        "about",
        "events",
        "past-events",
        "winners",
        "members",
      ];
      const scrollPosition = window.scrollY + 220;

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
  }, [isHomePage]);

  const navItems = SECTION_LINKS.map((item) => ({
    label: item.label,
    href: isHomePage ? `#${item.id}` : `/#${item.id}`,
  }));

  return (
    <header className="fixed top-0 left-0 right-0 z-40 flex justify-center pointer-events-none">
      <div className="pointer-events-auto w-full flex justify-center">
        <PillNav
          logo="/pac-logo.svg"
          logoAlt="Performing Arts Council Logo"
          items={navItems}
          activeHref={isHomePage ? `#${activeSection}` : ""}
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
