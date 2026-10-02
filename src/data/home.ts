import {
  CouncilStats,
  LadduAuctionHighlightData,
  ManifestoPillar,
} from "@/types";

export const councilStatistics: CouncilStats = {
  eventsConducted: {
    value: "42+",
    label: "EVENTS CONDUCTED",
    isConfirmed: true,
  },
  members: {
    value: "XX [MOCK]",
    label: "COUNCIL MEMBERS",
    isConfirmed: false,
  },
  winners: {
    value: "XX [MOCK]",
    label: "HONORED WINNERS",
    isConfirmed: false,
  },
  participants: {
    value: "XX [MOCK]",
    label: "STUDENT PARTICIPANTS",
    isConfirmed: false,
  },
};

export const ladduAuctionHighlight: LadduAuctionHighlightData = {
  title: "GANESH CHATURTHI LADDU AUCTION",
  subtitle: "TRADITIONAL PRASADAM SACRED AUCTION & PHILANTHROPY",
  winnerName: "Winner Name [PLACEHOLDER]",
  winningBid: "₹XX,XXX [PLACEHOLDER]",
  eventDate: "DD MONTH YYYY [PLACEHOLDER]",
  photo: "/images/placeholder-laddu-auction.svg",
  description:
    "A revered university heritage tradition held during the auspicious Ganesh Chaturthi festivities. The ceremonial sacred laddu blessing is auctioned with proceeds dedicated to student welfare, cultural endowments, and community outreach initiatives.",
  isPlaceholder: true,
};

export const manifestoPillars: ManifestoPillar[] = [
  {
    category: "Vision",
    title: "Democratizing the Stage for Every Voice",
    description:
      "Manifesto content will be published here upon official release. Transforming campus culture into an inclusive artistic sanctuary spanning fine arts, drama, dance, and sonic expressions.",
  },
  {
    category: "Goals",
    title: "Inter-Collegiate Supremacy & Excellence",
    description:
      "Manifesto content will be published here upon official release. Expanding flagship platforms, securing external state/national grants, and instituting year-round mentorship.",
  },
  {
    category: "Initiatives",
    title: "State-of-the-Art Production & Staging",
    description:
      "Manifesto content will be published here upon official release. Modernizing sound rigs, dynamic proscenium stagecraft, and professional masterclasses with industry stalwarts.",
  },
  {
    category: "Commitments",
    title: "Transparency, Fair Adjudication & Merit",
    description:
      "Manifesto content will be published here upon official release. Blind audition protocols, verified independent juries, and an open platform for student creators.",
  },
];

export const siteMetadataInfo = {
  institutionNamePlaceholder: "[Institution Name]",
  academicYear: "2026 – 2027",
  councilName: "Performing Arts Council",
  tagline: "Celebrating creativity, culture and student talent. [PLACEHOLDER]",
  heroDescription:
    "The premier student-led artistic collective shaping theatrics, classical recitals, modern dance, and vibrant cultural heritage across campus.",
};
