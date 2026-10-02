import { EventItem } from "@/types";

export const upcomingEventHighlight: EventItem = {
  id: "ue-featured-01",
  title: "ANNUAL CULTURAL SYMPHONY [PLACEHOLDER]",
  date: "15 OCTOBER 2026",
  time: "6:00 PM IST",
  venue: "MAIN UNIVERSITY AUDITORIUM [PLACEHOLDER]",
  category: "Flagship Showcase",
  badge: "Next Major Event",
  description:
    "An evening bringing together classical orchestration, contemporary theater, rhythmic folk expressions, and inter-collegiate performing troupes under one grand stage.",
  image: "/images/placeholder-event-highlight.svg",
  isFeatured: true,
};

export const upcomingEventsList: EventItem[] = [
  {
    id: "ue-01",
    title: "INTER-DEPARTMENT DRAMA PROSCENIUM [PLACEHOLDER]",
    date: "28 OCTOBER 2026",
    time: "5:30 PM IST",
    venue: "Black Box Studio Theater [PLACEHOLDER]",
    category: "Theatrics & Monologue",
    badge: "Auditions Open",
    description:
      "Original student script competition focusing on experimental proscenium staging, character work, and collaborative sound design.",
    image: "/images/placeholder-event-1.svg",
    isFeatured: true,
  },
  {
    id: "ue-02",
    title: "WESTERN & CLASSICAL ACOUSTICS [PLACEHOLDER]",
    date: "08 NOVEMBER 2026",
    time: "6:30 PM IST",
    venue: "Amphitheater East [PLACEHOLDER]",
    category: "Instrumental & Vocal",
    badge: "Live Showcase",
    description:
      "Acoustic unplugged session bridging Indian classical ragas with contemporary orchestral compositions.",
    image: "/images/placeholder-event-2.svg",
    isFeatured: false,
  },
  {
    id: "ue-03",
    title: "FUSION CHOREOGRAPHY NIGHT [PLACEHOLDER]",
    date: "19 NOVEMBER 2026",
    time: "7:00 PM IST",
    venue: "Open Air Complex [PLACEHOLDER]",
    category: "Dance Ensemble",
    badge: "House Championship",
    description:
      "Inter-house dance battle featuring contemporary jazz, Kathak, Bharatanatyam, and hip-hop team formations.",
    image: "/images/placeholder-event-3.svg",
    isFeatured: false,
  },
];

export const pastEventsList: EventItem[] = [
  {
    id: "pe-01",
    title: "NATYA PRAVAHA DANCE FESTIVAL [PLACEHOLDER]",
    date: "14 AUGUST 2026",
    venue: "Main University Auditorium [PLACEHOLDER]",
    category: "Classical Dance",
    description:
      "A grand 2-day classical confluence featuring over 18 collegiate ensembles, celebrating traditional Indian rhythm repertoires.",
    image: "/images/placeholder-past-1.svg",
  },
  {
    id: "pe-02",
    title: "MONOLOGUE SLAM & STREET PLAY [PLACEHOLDER]",
    date: "22 JULY 2026",
    venue: "Central Quadrangle [PLACEHOLDER]",
    category: "Street Theater",
    description:
      "High-energy social narrative performances by council dramatists exploring grassroots storytelling and satire.",
    image: "/images/placeholder-past-2.svg",
  },
  {
    id: "pe-03",
    title: "SPRING CHORAL CONVERGENCE [PLACEHOLDER]",
    date: "10 APRIL 2026",
    venue: "Acoustics Chamber Hall [PLACEHOLDER]",
    category: "Vocal Ensemble",
    description:
      "Harmonic choral presentations featuring 8-part a cappella arrangements and university student compositions.",
    image: "/images/placeholder-past-3.svg",
  },
  {
    id: "pe-04",
    title: "LIGHT & SHADOW THEATER NIGHT [PLACEHOLDER]",
    date: "18 FEBRUARY 2026",
    venue: "Fine Arts Courtyard [PLACEHOLDER]",
    category: "Experimental Visuals",
    description:
      "Multi-sensory shadow puppetry and ambient musical synthesis curated entirely by student lighting technicians.",
    image: "/images/placeholder-past-4.svg",
  },
];
