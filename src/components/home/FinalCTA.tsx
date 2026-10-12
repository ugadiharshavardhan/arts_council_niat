import React from "react";
import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
import { Sparkles, ArrowRight, Music, HeartHandshake } from "lucide-react";

export const FinalCTA: React.FC = () => {
  return (
    <section
      id="final-cta"
      aria-label="Final Call to Action"
      className="py-24 sm:py-32 bg-[#23120A] relative overflow-hidden text-center"
    >
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#D98C5B]/15 rounded-full blur-[160px]" />
      </div>

      <Container size="narrow" className="relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#8B4513]/25 border border-[#8B4513]/40 text-[#D98C5B] text-xs font-mono uppercase tracking-[0.25em] mb-6">
          <Sparkles className="w-3.5 h-3.5 text-[#D98C5B]" />
          <span>The Stage Awaits</span>
        </div>

        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-black tracking-tight text-[#F5E6D3] uppercase leading-[1.08] mb-6">
          YOUR TALENT <br />
          <span className="text-[#D98C5B]">
            DESERVES A STAGE.
          </span>
        </h2>

        <p className="text-base sm:text-lg text-[#E7C59F] font-light max-w-xl mx-auto leading-relaxed mb-10">
          Whether you are a vocalist, actor, instrumentalist, dancer, or backstage technician — the Performing Arts Council is your platform to create, perform, and inspire.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            href="#events"
            variant="gold"
            size="lg"
            className="w-full sm:w-auto shadow-xl shadow-[#D98C5B]/20"
            icon={<ArrowRight className="w-4 h-4 text-[#23120A]" />}
          >
            Explore Upcoming Events
          </Button>

          <Button
            href="#members"
            variant="outline"
            size="lg"
            className="w-full sm:w-auto border-[#6B3B23] text-[#E7C59F] hover:text-[#F5E6D3]"
            icon={<Music className="w-4 h-4 text-[#D98C5B]" />}
          >
            Audition Details [Placeholder]
          </Button>
        </div>

        <div className="mt-12 flex items-center justify-center gap-3 text-xs font-mono text-[#E7C59F]/70">
          <HeartHandshake className="w-4 h-4 text-[#D98C5B]" />
          <span>Non-profit student council initiative · Dedicated to cultural heritage</span>
        </div>
      </Container>
    </section>
  );
};
