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
      className="py-20 md:py-28 bg-[#23120A] relative overflow-hidden border-t border-[#6B3B23]"
    >
      {/* Decorative auspicious warm burnt sienna glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#D98C5B]/15 rounded-full blur-[150px] pointer-events-none" />

      <Container size="wide">
        {/* Special Distinct Editorial Feature Box */}
        <div className="relative rounded-3xl border-2 border-[#D98C5B]/40 bg-[#4E2E1E] p-6 sm:p-10 lg:p-14 shadow-2xl overflow-hidden backdrop-blur-md">
          {/* Traditional accent border badge */}
          <div className="absolute top-0 right-0 transform translate-x-8 -translate-y-8 w-36 h-36 bg-[#D98C5B]/15 rounded-full blur-2xl" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Visual Portrait / Ceremonial Image Area */}
            <div className="lg:col-span-5 relative group">
              <div className="relative rounded-2xl overflow-hidden border border-[#D98C5B]/40 bg-[#23120A] shadow-xl">
                <ImagePlaceholder
                  src={data.photo}
                  alt="Ganesh Chaturthi Laddu Auction Winner"
                  aspectRatio="portrait"
                  className="w-full h-[360px] sm:h-[440px]"
                />

                <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-[#23120A]/90 backdrop-blur-md border border-[#D98C5B]/40">
                  <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#D98C5B] block mb-0.5 font-bold">
                    SACRED PRASADAM LAUREATE
                  </span>
                  <p className="text-sm font-sans font-semibold text-[#F5E6D3]">
                    {data.winnerName}
                  </p>
                </div>
              </div>

              <div className="absolute -top-3 -left-3">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#D98C5B] text-[#23120A] shadow-lg font-bold">
                  <Sparkles className="w-3.5 h-3.5" />
                  Sacred Endowment
                </span>
              </div>
            </div>

            {/* Editorial Information & Highlight Details */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D98C5B]/15 border border-[#D98C5B]/30 text-[#D98C5B] text-xs font-sans uppercase tracking-wider w-fit mb-4 font-semibold">
                SPECIAL TRADITION & PHILANTHROPY
              </div>

              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#F5E6D3] leading-tight mb-3">
                {data.title}
              </h3>

              <p className="text-xs sm:text-sm font-sans tracking-wide text-[#D98C5B] uppercase mb-5 font-medium">
                {data.subtitle}
              </p>

              <p className="text-sm sm:text-base text-[#E7C59F] font-sans font-normal leading-relaxed mb-8">
                {data.description}
              </p>

              {/* Distinction Stat Strip */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 rounded-2xl bg-[#23120A] border border-[#6B3B23] mb-8">
                <div>
                  <span className="text-[10px] font-sans uppercase text-[#E7C59F]/70 block mb-1 font-medium">
                    WINNER / BENEFIT HOUSE
                  </span>
                  <p className="text-base font-sans font-semibold text-[#F5E6D3]">
                    {data.winnerName}
                  </p>
                </div>

                <div>
                  <span className="text-[10px] font-sans uppercase text-[#D98C5B] block mb-1 flex items-center gap-1 font-semibold">
                    <IndianRupee className="w-3 h-3 text-[#D98C5B]" />
                    WINNING SACRED BID
                  </span>
                  <p className="text-lg font-sans font-bold text-[#D98C5B]">
                    {data.winningBid}
                  </p>
                </div>

                <div>
                  <span className="text-[10px] font-sans uppercase text-[#E7C59F]/70 block mb-1 flex items-center gap-1 font-medium">
                    <Calendar className="w-3 h-3 text-[#E7C59F]/50" />
                    EVENT DATE
                  </span>
                  <p className="text-sm font-sans text-[#E7C59F]">
                    {data.eventDate}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Button
                  href="#events"
                  variant="gold"
                  size="md"
                  icon={<HeartHandshake className="w-4 h-4 text-[#23120A]" />}
                >
                  View Cultural Events
                </Button>

                <div className="flex items-center gap-2 text-xs font-sans text-[#E7C59F]/70">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Verified Collegiate Tradition</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
