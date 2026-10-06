import React from "react";
import { pastEventsList, upcomingEventsList } from "@/data/events";
import EventDetailsClient from "./EventDetailsClient";
import { notFound } from "next/navigation";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const allEvents = [...pastEventsList, ...upcomingEventsList];
  return allEvents.map((event) => ({
    id: event.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const allEvents = [...pastEventsList, ...upcomingEventsList];
  const event = allEvents.find((e) => e.id === id);

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
  const allEvents = [...pastEventsList, ...upcomingEventsList];
  const event = allEvents.find((e) => e.id === id);

  if (!event) {
    notFound();
  }

  return <EventDetailsClient event={event} />;
}
