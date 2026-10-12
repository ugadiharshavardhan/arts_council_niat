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
    title: "ONAM CELEBRATIONS 2026",
    date: "24 AUGUST 2026",
    venue: "Main University Auditorium & Campus Quadrangle",
    category: "Festive Cultural Gala",
    description:
      "A grand festive celebration of Onam showcasing traditional Kerala proscenium dances, Thiruvathira performances, acoustic Chenda Melam ensembles, and vibrant floral Pookalam artistry across campus.",
    image: "/images/placeholder-past-1.svg",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    organizer: "Performing Arts Council & Cultural Wing",
    participants: "500+ Students & Performers",
    gallery: [
      "/images/placeholder-past-1.svg",
      "/images/placeholder-event-1.svg",
      "/images/placeholder-event-2.svg",
    ],
  },
  {
    id: "pe-02",
    title: "TEACHERS DAY TRIBUTE 2026",
    date: "05 SEPTEMBER 2026",
    venue: "Acoustics Chamber Hall & Studio Stage",
    category: "Honors & Classical Showcase",
    description:
      "A heartfelt cultural tribute commemorating Teachers Day with musical serenades, faculty monologues, poetic recitations, and student proscenium performances expressing gratitude to the mentors.",
    image: "/images/placeholder-past-2.svg",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    organizer: "Performing Arts Council Student Directorate",
    participants: "Faculty Members & Collegiate Troupes",
    gallery: [
      "/images/placeholder-past-2.svg",
      "/images/placeholder-event-3.svg",
      "/images/placeholder-event-highlight.svg",
    ],
  },
  {
    id: "pe-03",
    title: "GANESH CHATHURTHI - CROSS CLUB EVENT",
    date: "16 SEPTEMBER 2026",
    venue: "Open Air Amphitheater & Fine Arts Courtyard",
    category: "Cross-Council Showcase",
    description:
      "A dynamic collaborative cross-club cultural production orchestrated with the Media Council, featuring high-energy percussion rhythms, visual stagecraft, traditional dance ensembles, and live cinematography coverage.",
    image: "/images/placeholder-past-3.svg",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    organizer: "Performing Arts Council × Media Council",
    participants: "Cross-Club Production (350+ Students)",
    gallery: [
      "/images/placeholder-past-3.svg",
      "/images/placeholder-event-2.svg",
    ],
  },
];
