import React from "react";
import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
import { ImagePlaceholder } from "../ui/ImagePlaceholder";
import { LadduAuctionHighlightData } from "@/types";
import { Sparkles, Calendar, IndianRupee, HeartHandshake, ShieldCheck } from "lucide-react";

interface LadduAuctionHighlightProps {
  data: LadduAuctionHighlightData;
}

export const LadduAuctionHighlight: React.FC<LadduAuctionHighlightProps> = ({
  data,
}) => {
  return (
    <section
      id="auction"
      aria-label="Ganesh Chaturthi Sacred Laddu Auction Highlight"
      className="py-20 md:py-28 bg-gradient-to-b from-zinc-950 via-zinc-900/90 to-zinc-950 relative overflow-hidden"
    >
      {/* Decorative auspicious warm glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-amber-500/10 rounded-full blur-[150px] pointer-events-none" />

      <Container size="wide">
        {/* Special Distinct Editorial Feature Box */}
        <div className="relative rounded-3xl border-2 border-amber-400/40 bg-zinc-950/80 p-6 sm:p-10 lg:p-14 shadow-2xl overflow-hidden backdrop-blur-md">
          {/* Traditional accent border badge */}
          <div className="absolute top-0 right-0 transform translate-x-8 -translate-y-8 w-36 h-36 bg-amber-500/10 rounded-full blur-2xl" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Visual Portrait / Ceremonial Image Area */}
            <div className="lg:col-span-5 relative group">
              <div className="relative rounded-2xl overflow-hidden border border-amber-400/30 bg-zinc-900 shadow-xl">
                <ImagePlaceholder
                  src={data.photo}
                  alt="Ganesh Chaturthi Laddu Auction Winner"
                  aspectRatio="portrait"
                  className="w-full h-[360px] sm:h-[440px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />

                <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-black/80 backdrop-blur-md border border-amber-400/30">
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-amber-400 block mb-0.5">
                    SACRED PRASADAM LAUREATE
                  </span>
                  <p className="text-sm font-serif font-bold text-white">
                    {data.winnerName}
                  </p>
                </div>
              </div>

              <div className="absolute -top-3 -left-3">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-amber-400 text-zinc-950 shadow-lg">
                  <Sparkles className="w-3.5 h-3.5" />
                  Sacred Endowment
                </span>
              </div>
            </div>

            {/* Editorial Information & Highlight Details */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-mono uppercase tracking-widest w-fit mb-4">
                SPECIAL TRADITION & PHILANTHROPY
              </div>

              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-zinc-100 leading-tight mb-3">
                {data.title}
              </h3>

              <p className="text-xs sm:text-sm font-mono tracking-wider text-amber-400 uppercase mb-5 font-semibold">
                {data.subtitle}
              </p>

              <p className="text-sm sm:text-base text-zinc-300 font-light leading-relaxed mb-8">
                {data.description}
              </p>

              {/* Distinction Stat Strip */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 rounded-2xl bg-zinc-900/70 border border-zinc-800 mb-8">
                <div>
                  <span className="text-[10px] font-mono uppercase text-zinc-400 block mb-1">
                    WINNER / BENEFIT HOUSE
                  </span>
                  <p className="text-base font-serif font-bold text-zinc-100">
                    {data.winnerName}
                  </p>
                </div>

                <div>
                  <span className="text-[10px] font-mono uppercase text-amber-400 block mb-1 flex items-center gap-1">
                    <IndianRupee className="w-3 h-3 text-amber-400" />
                    WINNING SACRED BID
                  </span>
                  <p className="text-lg font-mono font-black text-amber-300">
                    {data.winningBid}
                  </p>
                </div>

                <div>
                  <span className="text-[10px] font-mono uppercase text-zinc-400 block mb-1 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-zinc-500" />
                    EVENT DATE
                  </span>
                  <p className="text-sm font-mono text-zinc-300">
                    {data.eventDate}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Button
                  href="#events"
                  variant="gold"
                  size="md"
                  icon={<HeartHandshake className="w-4 h-4 text-zinc-950" />}
                >
                  View Philanthropy Report
                </Button>

                <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Values placeholder pending council publication</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
