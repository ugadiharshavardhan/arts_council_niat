import React from "react";
import { pastEventsList, upcomingEventsList } from "@/data/events";
import EventDetailsClient from "./EventDetailsClient";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { EventItem } from "@/types";

interface PageProps {
  params: Promise<{ id: string }>;
}

const defaultEvents = [
  ...pastEventsList,
  ...upcomingEventsList,
];

export async function generateStaticParams() {
  return defaultEvents.map((event) => ({
    id: event.id,
  }));
}

async function getEventById(id: string): Promise<EventItem | null> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("id", id)
        .single();
      if (!error && data) {
        return {
          id: data.id,
          title: data.title,
          date: data.date,
          time: data.time || undefined,
          venue: data.venue || undefined,
          category: data.category || undefined,
          badge: data.badge || undefined,
          description: data.description,
          image: data.image,
          isFeatured: Boolean(data.is_featured),
          videoUrl: data.video_url || undefined,
          gallery: data.gallery || undefined,
          organizer: data.organizer || undefined,
          participants: data.participants || undefined,
        };
      }
    } catch (e) {
      console.warn("Supabase event fetch fallback:", e);
    }
  }
  return defaultEvents.find((e) => e.id === id) || null;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const event = await getEventById(id);

  if (!event) {
    return {
      title: "Event Not Found | Performing Arts Council",
    };
  }

  return {
    title: `${event.title} | Performing Arts Council NIAT`,
    description: event.description,
  };
}

export default async function EventDetailPage({ params }: PageProps) {
  const { id } = await params;
  const event = await getEventById(id);

  if (!event) {
    notFound();
  }

  return <EventDetailsClient event={event} />;
}
