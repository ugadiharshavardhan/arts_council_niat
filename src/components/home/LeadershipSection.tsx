import React from "react";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { Button } from "../ui/Button";
import { ImagePlaceholder } from "../ui/ImagePlaceholder";
import { CouncilMember } from "@/types";
import { Scroll, Award, Quote } from "lucide-react";

interface LeadershipSectionProps {
  president: CouncilMember;
  vicePresident: CouncilMember;
}

export const LeadershipSection: React.FC<LeadershipSectionProps> = ({
  president,
  vicePresident,
}) => {
  return (
    <section
      id="about"
      aria-label="About the Council & Leadership"
      className="py-20 md:py-28 bg-[#1C0F0A] relative overflow-hidden"
    >
      <div id="leadership" className="sr-only" />
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#8B2E2E]/15 rounded-full blur-[140px] pointer-events-none" />

      <Container size="wide">
        <SectionHeading
          eyebrow="About the Council"
          title="Executive Leadership"
          description="Leading cultural dialogue, fostering inter-collegiate artistic prestige, and empowering hundreds of student performers across theater, acoustics, and dance."
          badge="Elected Directorate"
        />

        {/* Large Editorial Portrait Pair */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14 items-stretch">
          {/* President Card */}
          <div className="flex flex-col bg-[#2A1014] border border-[#3D2018] rounded-2xl overflow-hidden group hover:border-[#D4845A]/50 transition-all duration-300 shadow-xl">
            <div className="relative w-full h-[360px] sm:h-[440px] overflow-hidden bg-[#1C0F0A]">
              <ImagePlaceholder
                src={president.photo}
                alt={president.name}
                aspectRatio="portrait"
                className="w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C0F0A] via-[#1C0F0A]/20 to-transparent" />
              
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#D4845A] text-[#1C0F0A] shadow-md">
                  President
                </span>
              </div>

              <div className="absolute bottom-4 left-6 right-6">
                <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#D4845A] block mb-1">
                  OFFICIAL LEADERSHIP
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#FAF0E6]">
                  {president.name}
                </h3>
                <p className="text-xs text-[#C4A882] font-sans mt-0.5">
                  {president.role}
                </p>
              </div>
            </div>

            <div className="p-6 sm:p-8 flex flex-col justify-between flex-1 bg-[#2A1014]/60">
              <div className="relative pl-6 border-l-2 border-[#D4845A]/60 mb-6">
                <Quote className="w-5 h-5 text-[#D4845A]/50 absolute -left-2.5 -top-2 bg-[#2A1014]" />
                <p className="text-sm text-[#FAF0E6] italic font-serif leading-relaxed">
                  &ldquo;Art has the transformative power to unite our university community. Our administration is dedicated to providing transparent adjudication, modern proscenium infrastructure, and equal stage opportunities for every passionate performer.&rdquo;
                </p>
                <span className="text-[10px] text-[#C4A882]/70 font-mono block mt-2">
                  [Manifesto Excerpt Placeholder]
                </span>
              </div>

              <div className="pt-4 border-t border-[#3D2018] flex items-center justify-between">
                <Button
                  href="#manifesto"
                  variant="gold"
                  size="md"
                  icon={<Scroll className="w-4 h-4 text-[#1C0F0A]" />}
                >
                  Read President&apos;s Manifesto
                </Button>
                <span className="text-[11px] font-mono text-[#C4A882]/70 hidden sm:inline">
                  Tenure: 2026-2027
                </span>
              </div>
            </div>
          </div>

          {/* Vice President Card */}
          <div className="flex flex-col bg-[#2A1014] border border-[#3D2018] rounded-2xl overflow-hidden group hover:border-[#D4845A]/50 transition-all duration-300 shadow-xl">
            <div className="relative w-full h-[360px] sm:h-[440px] overflow-hidden bg-[#1C0F0A]">
              <ImagePlaceholder
                src={vicePresident.photo}
                alt={vicePresident.name}
                aspectRatio="portrait"
                className="w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C0F0A] via-[#1C0F0A]/20 to-transparent" />
              
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#3D2018] text-[#FAF0E6] border border-[#3D2018] shadow-md">
                  Vice President
                </span>
              </div>

              <div className="absolute bottom-4 left-6 right-6">
                <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#D4845A] block mb-1">
                  OPERATIONS & PRODUCTION
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#FAF0E6]">
                  {vicePresident.name}
                </h3>
                <p className="text-xs text-[#C4A882] font-sans mt-0.5">
                  {vicePresident.role}
                </p>
              </div>
            </div>

            <div className="p-6 sm:p-8 flex flex-col justify-between flex-1 bg-[#2A1014]/60">
              <div className="relative pl-6 border-l-2 border-[#3D2018] mb-6">
                <Award className="w-5 h-5 text-[#C4A882]/70 absolute -left-2.5 -top-2 bg-[#2A1014]" />
                <p className="text-sm text-[#FAF0E6] italic font-serif leading-relaxed">
                  &ldquo;Behind every grand performance lies weeks of meticulous stagecraft, sound balancing, and volunteer coordination. We are establishing structured workshops and production labs for all incoming students.&rdquo;
                </p>
                <span className="text-[10px] text-[#C4A882]/70 font-mono block mt-2">
                  [Leadership Note Placeholder]
                </span>
              </div>

              <div className="pt-4 border-t border-[#3D2018] flex items-center justify-between">
                <Button
                  href="#members"
                  variant="secondary"
                  size="md"
                  icon={<Award className="w-4 h-4 text-[#D4845A]" />}
                >
                  Meet Full Executive Wing
                </Button>
                <span className="text-[11px] font-mono text-[#C4A882]/70 hidden sm:inline">
                  Tenure: 2026-2027
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
