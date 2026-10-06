"use client";

import React, { useState } from "react";
import Link from "next/link";
import { EventItem } from "@/types";
import { Container } from "@/components/ui/Container";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Footer } from "@/components/layout/Footer";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Clock,
  User,
  Users,
  Film,
  Play,
  Maximize2,
  X,
  Sparkles,
  Tag,
} from "lucide-react";

interface EventDetailsClientProps {
  event: EventItem;
}

export default function EventDetailsClient({ event }: EventDetailsClientProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeGalleryImage, setActiveGalleryImage] = useState<string | null>(null);

  const galleryImages =
    event.gallery && event.gallery.length > 0
      ? event.gallery
      : [event.image];

  const isUpcoming = event.id.startsWith("ue-");
  const backHref = isUpcoming ? "/events/upcoming" : "/events/past";
  const backLabel = isUpcoming ? "Back to Upcoming Events" : "Back to Past Events";

  return (
    <div className="min-h-screen bg-[#1C0F0A] text-[#FAF0E6] flex flex-col font-sans selection:bg-[#D4845A]/30 selection:text-[#FAF0E6]">
      {/* Top Header / Sticky Bar */}
      <header className="sticky top-0 z-40 bg-[#1C0F0A]/90 backdrop-blur-md border-b border-[#3D2018] px-4 py-3">
        <Container size="wide" className="flex items-center justify-between">
          <Link
            href={backHref}
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#D4845A] hover:text-[#E8C87A] transition-colors group px-3 py-1.5 rounded-full bg-[#2A1014] border border-[#3D2018]"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>{backLabel}</span>
          </Link>

          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full border border-[#D4845A]/60 bg-[#2A1014] flex items-center justify-center text-[#D4845A] font-serif font-bold text-xs">
              PAC
            </div>
            <span className="font-serif text-sm font-bold tracking-wider hidden sm:inline text-[#FAF0E6]">
              PERFORMING ARTS COUNCIL
            </span>
          </div>
        </Container>
      </header>

      <main className="flex-1 pb-20">
        {/* SECTION 1 — EVENT REEL / VIDEO */}
        <section className="relative bg-[#140B07] border-b border-[#3D2018] py-8 lg:py-12">
          <Container size="wide">
            <div className="max-w-5xl mx-auto">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-xs font-mono text-[#D4845A] uppercase tracking-widest">
                  <Film className="w-4 h-4 text-[#D4845A]" />
                  <span>Official Event Reel & Showcase</span>
                </div>
                {event.category && (
                  <span className="px-3 py-0.5 rounded-full text-[11px] font-mono uppercase bg-[#2A1014] text-[#D4845A] border border-[#3D2018]">
                    {event.category}
                  </span>
                )}
              </div>

              {/* Video Player Container */}
              <div className="relative rounded-2xl overflow-hidden border border-[#3D2018] bg-[#2A1014] shadow-2xl group aspect-video">
                {event.videoUrl ? (
                  !isPlaying ? (
                    <div className="relative w-full h-full">
                      <ImagePlaceholder
                        src={event.image}
                        alt={`${event.title} Reel Thumbnail`}
                        aspectRatio="video"
                        className="w-full h-full object-cover filter brightness-90 group-hover:brightness-100 transition-all duration-500"
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1C0F0A] via-[#1C0F0A]/30 to-transparent" />

                      {/* Big Play Button Overlay */}
                      <button
                        onClick={() => setIsPlaying(true)}
                        aria-label="Play Event Reel"
                        className="absolute inset-0 m-auto w-20 h-20 rounded-full bg-[#8B2E2E]/90 hover:bg-[#D4845A] text-[#FAF0E6] hover:text-[#1C0F0A] border border-[#D4845A]/50 backdrop-blur-sm flex items-center justify-center transition-all duration-300 shadow-xl hover:scale-110 group-hover:shadow-[#D4845A]/30 cursor-pointer"
                      >
                        <Play className="w-8 h-8 fill-current translate-x-0.5" />
                      </button>

                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-[#C4A882] font-mono">
                        <span className="bg-[#1C0F0A]/80 backdrop-blur-md px-3 py-1 rounded border border-[#3D2018]">
                          Click to play event highlight reel
                        </span>
                        <span className="bg-[#1C0F0A]/80 backdrop-blur-md px-3 py-1 rounded border border-[#3D2018] hidden sm:inline">
                          HD 1080p Recording
                        </span>
                      </div>
                    </div>
                  ) : (
                    <video
                      src={event.videoUrl}
                      controls
                      autoPlay
                      poster={event.image}
                      className="w-full h-full object-cover bg-black"
                    />
                  )
                ) : (
                  /* Fallback UI when videoUrl is missing */
                  <div className="relative w-full h-full">
                    <ImagePlaceholder
                      src={event.image}
                      alt={event.title}
                      aspectRatio="video"
                      className="w-full h-full object-cover filter saturate-[0.8]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1C0F0A] via-[#1C0F0A]/70 to-[#1C0F0A]/40 flex flex-col items-center justify-center p-6 text-center">
                      <div className="w-16 h-16 rounded-full bg-[#2A1014] border border-[#3D2018] flex items-center justify-center text-[#D4845A] mb-4 shadow-lg">
                        <Film className="w-8 h-8 opacity-70" />
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-mono uppercase bg-[#8B2E2E]/40 text-[#FAF0E6] border border-[#8B2E2E] mb-2">
                        {isUpcoming ? "Official Production Reel Coming Soon" : "Event Reel Archiving in Progress"}
                      </span>
                      <p className="text-xs sm:text-sm text-[#C4A882] max-w-md font-light leading-relaxed">
                        {isUpcoming
                          ? "Official promotional reel and live coverage will be published following the event premiere."
                          : "Official multi-cam video footage for this showcase is being remastered by the Student Technical Crew."}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Container>
        </section>

        {/* SECTION 2 — EVENT INFORMATION */}
        <section className="py-12 lg:py-16 border-b border-[#3D2018]">
          <Container size="wide">
            <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* Main Content Column */}
              <div className="lg:col-span-8 flex flex-col justify-start">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 rounded-full bg-[#D4845A]" />
                  <span className="text-xs font-mono uppercase tracking-widest text-[#D4845A]">
                    {isUpcoming ? "Scheduled Production Record" : "Archival Event Record"}
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#FAF0E6] leading-tight mb-6">
                  {event.title}
                </h1>

                <div className="prose prose-invert max-w-none">
                  <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-[#C4A882]/80 mb-3 border-b border-[#3D2018] pb-2">
                    Event Overview & Description
                  </h3>
                  <p className="text-base sm:text-lg text-[#C4A882] font-light leading-relaxed whitespace-pre-line mb-6">
                    {event.description}
                  </p>
                </div>
              </div>

              {/* Sidebar Metadata Column */}
              <div className="lg:col-span-4">
                <div className="bg-[#2A1014]/80 border border-[#3D2018] rounded-2xl p-6 shadow-xl space-y-6">
                  <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-[#D4845A] border-b border-[#3D2018] pb-3 flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Event Metadata</span>
                  </h3>

                  <div className="space-y-4">
                    {/* Date */}
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#1C0F0A] border border-[#3D2018] flex items-center justify-center shrink-0 text-[#D4845A] mt-0.5">
                        <Calendar className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="block text-[10px] font-mono uppercase text-[#C4A882]/70">
                          Date
                        </span>
                        <span className="text-sm font-semibold text-[#FAF0E6]">
                          {event.date}
                        </span>
                      </div>
                    </div>

                    {/* Time if available */}
                    {event.time && (
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#1C0F0A] border border-[#3D2018] flex items-center justify-center shrink-0 text-[#D4845A] mt-0.5">
                          <Clock className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="block text-[10px] font-mono uppercase text-[#C4A882]/70">
                            Time
                          </span>
                          <span className="text-sm font-semibold text-[#FAF0E6]">
                            {event.time}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Venue if available */}
                    {event.venue && (
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#1C0F0A] border border-[#3D2018] flex items-center justify-center shrink-0 text-[#D4845A] mt-0.5">
                          <MapPin className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="block text-[10px] font-mono uppercase text-[#C4A882]/70">
                            Venue
                          </span>
                          <span className="text-sm font-semibold text-[#FAF0E6]">
                            {event.venue}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Category if available */}
                    {event.category && (
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#1C0F0A] border border-[#3D2018] flex items-center justify-center shrink-0 text-[#D4845A] mt-0.5">
                          <Tag className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="block text-[10px] font-mono uppercase text-[#C4A882]/70">
                            Category
                          </span>
                          <span className="text-sm font-semibold text-[#FAF0E6]">
                            {event.category}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Organizer if available */}
                    {event.organizer && (
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#1C0F0A] border border-[#3D2018] flex items-center justify-center shrink-0 text-[#D4845A] mt-0.5">
                          <User className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="block text-[10px] font-mono uppercase text-[#C4A882]/70">
                            Organizing Body
                          </span>
                          <span className="text-sm font-medium text-[#FAF0E6]">
                            {event.organizer}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Participants if available */}
                    {event.participants && (
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#1C0F0A] border border-[#3D2018] flex items-center justify-center shrink-0 text-[#D4845A] mt-0.5">
                          <Users className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="block text-[10px] font-mono uppercase text-[#C4A882]/70">
                            Participants & Ensembles
                          </span>
                          <span className="text-sm font-medium text-[#FAF0E6]">
                            {event.participants}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* SECTION 3 — EVENT IMAGE GALLERY */}
        <section className="py-12 lg:py-16">
          <Container size="wide">
            <div className="max-w-5xl mx-auto">
              <div className="flex items-center justify-between mb-8 border-b border-[#3D2018] pb-4">
                <div>
                  <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#D4845A]">
                    Visual Archives
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#FAF0E6] mt-1">
                    Event Photo Gallery
                  </h2>
                </div>
                <span className="text-xs font-mono text-[#C4A882]/70">
                  {galleryImages.length} {galleryImages.length === 1 ? "Asset" : "Assets"}
                </span>
              </div>

              {/* Gallery Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {galleryImages.map((imgSrc, idx) => (
                  <div
                    key={`${imgSrc}-${idx}`}
                    onClick={() => setActiveGalleryImage(imgSrc)}
                    className="group relative h-64 bg-[#2A1014] rounded-2xl overflow-hidden border border-[#3D2018] hover:border-[#D4845A]/50 transition-all duration-300 shadow-md cursor-pointer"
                  >
                    <ImagePlaceholder
                      src={imgSrc}
                      alt={`${event.title} Gallery Photo ${idx + 1}`}
                      aspectRatio="auto"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1C0F0A]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
                      <span className="text-xs font-mono text-[#FAF0E6]">
                        Photo #{idx + 1}
                      </span>
                      <div className="w-8 h-8 rounded-full bg-[#8B2E2E] text-[#FAF0E6] flex items-center justify-center shadow-lg">
                        <Maximize2 className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>
      </main>

      {/* Lightbox Modal for Gallery Images */}
      {activeGalleryImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setActiveGalleryImage(null)}
        >
          <button
            onClick={() => setActiveGalleryImage(null)}
            className="absolute top-6 right-6 text-[#FAF0E6] hover:text-[#D4845A] p-2 bg-[#2A1014] border border-[#3D2018] rounded-full transition-colors"
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>
          <div
            className="relative max-w-4xl max-h-[85vh] rounded-xl overflow-hidden border border-[#3D2018] bg-[#1C0F0A]"
            onClick={(e) => e.stopPropagation()}
          >
            <ImagePlaceholder
              src={activeGalleryImage}
              alt="Enlarged Event Gallery Asset"
              aspectRatio="auto"
              className="max-h-[85vh] w-auto object-contain"
            />
          </div>
        </div>
      )}

      {/* Standard Footer */}
      <Footer />
    </div>
  );
}
