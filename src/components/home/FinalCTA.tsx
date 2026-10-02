import React from "react";
import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
import { Sparkles, ArrowRight, Music, HeartHandshake } from "lucide-react";

export const FinalCTA: React.FC = () => {
  return (
    <section
      id="final-cta"
      aria-label="Final Call to Action"
      className="py-24 sm:py-32 bg-zinc-950 relative overflow-hidden text-center"
    >
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-amber-500/10 rounded-full blur-[160px]" />
      </div>

      <Container size="narrow" className="relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-mono uppercase tracking-[0.25em] mb-6">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>The Stage Awaits</span>
        </div>

        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-black tracking-tight text-white uppercase leading-[1.08] mb-6">
          YOUR TALENT <br />
          <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 bg-clip-text text-transparent">
            DESERVES A STAGE.
          </span>
        </h2>

        <p className="text-base sm:text-lg text-zinc-300 font-light max-w-xl mx-auto leading-relaxed mb-10">
          Whether you are a vocalist, actor, instrumentalist, dancer, or backstage technician — the Performing Arts Council is your platform to create, perform, and inspire.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            href="#events"
            variant="gold"
            size="lg"
            className="w-full sm:w-auto shadow-xl shadow-amber-500/20"
            icon={<ArrowRight className="w-4 h-4 text-zinc-950" />}
          >
            Explore Upcoming Events
          </Button>

          <Button
            href="#members"
            variant="outline"
            size="lg"
            className="w-full sm:w-auto border-zinc-700 text-zinc-200 hover:text-white"
            icon={<Music className="w-4 h-4 text-amber-400" />}
          >
            Audition Details [Placeholder]
          </Button>
        </div>

        <div className="mt-12 flex items-center justify-center gap-3 text-xs font-mono text-zinc-500">
          <HeartHandshake className="w-4 h-4 text-amber-400/80" />
          <span>Non-profit student council initiative · Dedicated to cultural heritage</span>
        </div>
      </Container>
    </section>
  );
};
