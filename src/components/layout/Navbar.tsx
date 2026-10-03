"use client";

import React, { useState, useEffect } from "react";
import PillNav from "./PillNav";

interface NavbarProps {
  institutionName?: string;
}

export const Navbar: React.FC<NavbarProps> = () => {
  const [activeSection, setActiveSection] = useState("about");

  useEffect(() => {
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
  }, []);

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Upcoming Events", href: "#events" },
    { label: "Past Events", href: "#past-events" },
    { label: "Winners", href: "#winners" },
    { label: "Club Members", href: "#members" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 flex justify-center pointer-events-none">
      <div className="pointer-events-auto w-full flex justify-center">
        <PillNav
          logo="/pac-logo.svg"
          logoAlt="Performing Arts Council Logo"
          items={navLinks}
          activeHref={`#${activeSection}`}
          baseColor="#fbbf24"
          pillColor="#18181b"
          hoveredPillTextColor="#09090b"
          pillTextColor="#f4f4f5"
          ease="power3.easeOut"
          initialLoadAnimation={true}
        />
      </div>
    </header>
  );
};
