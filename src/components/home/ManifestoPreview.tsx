import React from "react";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { Button } from "../ui/Button";
import { ManifestoPillar } from "@/types";
import { Scroll, Compass, Target, Lightbulb, CheckCircle2, ArrowRight } from "lucide-react";

interface ManifestoPreviewProps {
  pillars: ManifestoPillar[];
}

export const ManifestoPreview: React.FC<ManifestoPreviewProps> = ({ pillars }) => {
  const categoryIcons = {
    Vision: <Compass className="w-5 h-5 text-[#D98C5B]" />,
    Goals: <Target className="w-5 h-5 text-[#D98C5B]" />,
    Initiatives: <Lightbulb className="w-5 h-5 text-[#D98C5B]" />,
    Commitments: <CheckCircle2 className="w-5 h-5 text-[#D98C5B]" />,
  };

  return (
    <section
      id="manifesto"
      aria-label="President Manifesto Preview"
      className="py-20 md:py-28 bg-[#23120A] border-t border-[#6B3B23] relative"
    >
      <Container size="wide">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <SectionHeading
            eyebrow="Vision for Campus Culture"
            title="President's Manifesto"
            description="Our core principles, progressive initiatives, and structural roadmap to elevate collegiate cultural life."
            badge="Manifesto Roadmap 2026-27"
            className="mb-0"
          />

          <div className="mt-6 md:mt-0 shrink-0">
            <Button
              href="#manifesto"
              variant="gold"
              size="md"
              icon={<Scroll className="w-4 h-4 text-[#23120A]" />}
            >
              Read Full Manifesto
            </Button>
          </div>
        </div>

        {/* 4 Pillars Grid: Vision, Goals, Initiatives, Commitments */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar) => (
            <div
              key={pillar.category}
              className="flex flex-col p-6 rounded-2xl bg-[#4E2E1E] border border-[#6B3B23] hover:border-[#D98C5B]/50 hover:bg-[#4E2E1E] transition-all duration-300 shadow-xl group"
            >
              <div className="flex items-center justify-between mb-5">
                <div className="p-3 rounded-xl bg-[#23120A] border border-[#6B3B23] group-hover:border-[#D98C5B]/40 transition-colors">
                  {categoryIcons[pillar.category]}
                </div>
                <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#D98C5B] font-semibold px-2 py-0.5 rounded bg-[#8B4513]/30 border border-[#8B4513]/50">
                  {pillar.category}
                </span>
              </div>

              <h4 className="text-lg font-serif font-bold text-[#F5E6D3] group-hover:text-[#D98C5B] transition-colors mb-3">
                {pillar.title}
              </h4>

              <p className="text-xs sm:text-sm text-[#E7C59F] font-light leading-relaxed mb-6 flex-1">
                {pillar.description}
              </p>

              <div className="pt-4 border-t border-[#6B3B23] flex items-center justify-between text-[11px] font-mono text-[#E7C59F]/70">
                <span>[Placeholder Copy]</span>
                <span className="text-[#D98C5B] group-hover:translate-x-1 transition-transform flex items-center gap-1 font-semibold">
                  Explore <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
