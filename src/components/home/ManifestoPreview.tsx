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
    Vision: <Compass className="w-5 h-5 text-amber-400" />,
    Goals: <Target className="w-5 h-5 text-amber-400" />,
    Initiatives: <Lightbulb className="w-5 h-5 text-amber-400" />,
    Commitments: <CheckCircle2 className="w-5 h-5 text-amber-400" />,
  };

  return (
    <section
      id="manifesto"
      aria-label="President Manifesto Preview"
      className="py-20 md:py-28 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 relative"
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
              icon={<Scroll className="w-4 h-4 text-zinc-950" />}
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
              className="flex flex-col p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-amber-400/50 hover:bg-zinc-900/90 transition-all duration-300 shadow-xl group"
            >
              <div className="flex items-center justify-between mb-5">
                <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 group-hover:border-amber-400/30 transition-colors">
                  {categoryIcons[pillar.category]}
                </div>
                <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-amber-400 font-semibold px-2 py-0.5 rounded bg-amber-400/10 border border-amber-400/20">
                  {pillar.category}
                </span>
              </div>

              <h4 className="text-lg font-serif font-bold text-zinc-100 group-hover:text-amber-300 transition-colors mb-3">
                {pillar.title}
              </h4>

              <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed mb-6 flex-1">
                {pillar.description}
              </p>

              <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                <span>[Placeholder Copy]</span>
                <span className="text-amber-400 group-hover:translate-x-1 transition-transform flex items-center gap-1">
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
