import { EventItem } from "@/types";

export const upcomingEventsList: EventItem[] = [
  {
    id: "ue-01",
    title: "ANNUAL CULTURAL SYMPHONY 2026",
    date: "15 OCTOBER 2026",
    time: "6:00 PM IST",
    venue: "Main University Auditorium",
    category: "Flagship Showcase",
    badge: "Next Major Event",
    description:
      "An evening bringing together classical orchestration, contemporary theater, rhythmic folk expressions, and inter-collegiate performing troupes under one grand stage.",
    image: "/images/placeholder-event-highlight.svg",
    isFeatured: true,
    organizer: "Performing Arts Council Executive",
    participants: "300+ Performers",
  },
  {
    id: "ue-02",
    title: "INTER-DEPARTMENT DRAMA PROSCENIUM",
    date: "28 OCTOBER 2026",
    time: "5:30 PM IST",
    venue: "Black Box Studio Theater",
    category: "Theatrics & Monologue",
    badge: "Auditions Open",
    description:
      "Original student script competition focusing on experimental proscenium staging, character work, and collaborative sound design.",
    image: "/images/placeholder-event-1.svg",
    isFeatured: false,
    organizer: "Theatrics Guild",
    participants: "8 Departments",
  },
  {
    id: "ue-03",
    title: "WESTERN & CLASSICAL ACOUSTICS",
    date: "08 NOVEMBER 2026",
    time: "6:30 PM IST",
    venue: "Amphitheater East",
    category: "Instrumental & Vocal",
    badge: "Live Showcase",
    description:
      "Acoustic unplugged session bridging Indian classical ragas with contemporary orchestral compositions.",
    image: "/images/placeholder-event-2.svg",
    isFeatured: false,
    organizer: "Acoustics & Rhythm Wing",
    participants: "16 Solo & Duet Acts",
  },
];

export const upcomingEventHighlight: EventItem = upcomingEventsList[0];

export const pastEventsList: EventItem[] = [
  {
    id: "pe-01",
    title: "NATYA PRAVAHA DANCE FESTIVAL",
    date: "14 AUGUST 2026",
    venue: "Main University Auditorium",
    category: "Classical Dance",
    description:
      "A grand 2-day classical confluence featuring over 18 collegiate ensembles, celebrating traditional Indian rhythm repertoires.",
    image: "/images/placeholder-past-1.svg",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    organizer: "Performing Arts Council — Dance Wing",
    participants: "18 Collegiate Teams (240+ Dancers)",
    gallery: [
      "/images/placeholder-past-1.svg",
      "/images/placeholder-event-1.svg",
      "/images/placeholder-event-2.svg",
    ],
  },
  {
    id: "pe-02",
    title: "MONOLOGUE SLAM & STREET PLAY",
    date: "22 JULY 2026",
    venue: "Central Quadrangle",
    category: "Street Theater",
    description:
      "High-energy social narrative performances by council dramatists exploring grassroots storytelling and satire.",
    image: "/images/placeholder-past-2.svg",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    organizer: "NIAT Theatrics Guild",
    participants: "12 Street Play Troupe Teams",
    gallery: [
      "/images/placeholder-past-2.svg",
      "/images/placeholder-event-3.svg",
      "/images/placeholder-event-highlight.svg",
    ],
  },
  {
    id: "pe-03",
    title: "SPRING CHORAL CONVERGENCE",
    date: "10 APRIL 2026",
    venue: "Acoustics Chamber Hall",
    category: "Vocal Ensemble",
    description:
      "Harmonic choral presentations featuring 8-part a cappella arrangements and university student compositions.",
    image: "/images/placeholder-past-3.svg",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    organizer: "Classical Music Society",
    participants: "8-Part Choral Society Ensemble",
    gallery: [
      "/images/placeholder-past-3.svg",
      "/images/placeholder-event-2.svg",
    ],
  },
];
