import React from "react";
import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
import { Sparkles, ArrowRight, Music, HeartHandshake } from "lucide-react";

export const FinalCTA: React.FC = () => {
  return (
    <section
      id="final-cta"
      aria-label="Final Call to Action"
      className="py-24 sm:py-32 bg-[#1C0F0A] relative overflow-hidden text-center"
    >
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#8B2E2E]/20 rounded-full blur-[160px]" />
      </div>

      <Container size="narrow" className="relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#8B2E2E]/20 border border-[#8B2E2E]/40 text-[#D4845A] text-xs font-mono uppercase tracking-[0.25em] mb-6">
          <Sparkles className="w-3.5 h-3.5 text-[#D4845A]" />
          <span>The Stage Awaits</span>
        </div>

        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-black tracking-tight text-[#FAF0E6] uppercase leading-[1.08] mb-6">
          YOUR TALENT <br />
          <span className="text-[#D4845A]">
            DESERVES A STAGE.
          </span>
        </h2>


        <p className="text-base sm:text-lg text-[#C4A882] font-light max-w-xl mx-auto leading-relaxed mb-10">
          Whether you are a vocalist, actor, instrumentalist, dancer, or backstage technician — the Performing Arts Council is your platform to create, perform, and inspire.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            href="#events"
            variant="gold"
            size="lg"
            className="w-full sm:w-auto shadow-xl shadow-[#D4845A]/20"
            icon={<ArrowRight className="w-4 h-4 text-[#1C0F0A]" />}
          >
            Explore Upcoming Events
          </Button>

          <Button
            href="#members"
            variant="outline"
            size="lg"
            className="w-full sm:w-auto border-[#3D2018] text-[#C4A882] hover:text-[#FAF0E6]"
            icon={<Music className="w-4 h-4 text-[#D4845A]" />}
          >
            Audition Details [Placeholder]
          </Button>
        </div>

        <div className="mt-12 flex items-center justify-center gap-3 text-xs font-mono text-[#C4A882]/70">
          <HeartHandshake className="w-4 h-4 text-[#D4845A]" />
          <span>Non-profit student council initiative · Dedicated to cultural heritage</span>
        </div>
      </Container>
    </section>
  );
};
