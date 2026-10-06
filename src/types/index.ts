export interface EventItem {
  id: string;
  title: string;
  date: string;
  time?: string;
  venue?: string;
  description: string;
  category?: string;
  image: string;
  badge?: string;
  isFeatured?: boolean;
  videoUrl?: string;
  gallery?: string[];
  organizer?: string;
  participants?: string;
}

export interface WinnerItem {
  id: string;
  name: string;
  eventName: string;
  position: string;
  date: string;
  prizeOrAchievement: string;
  photo: string;
  category?: string;
  isFeatured?: boolean;
}

export interface CouncilMember {
  id: string;
  name: string;
  role: string;
  photo: string;
  department?: string;
  isLeadership?: boolean;
}

export interface LeaderboardEntry {
  rank: number;
  teamOrHouse: string;
  points: number;
  eventsParticipated: number;
  badge?: string;
}

export interface CouncilStats {
  eventsConducted: {
    value: string;
    label: string;
    isConfirmed: boolean;
  };
  members: {
    value: string;
    label: string;
    isConfirmed: boolean;
  };
  winners: {
    value: string;
    label: string;
    isConfirmed: boolean;
  };
  participants: {
    value: string;
    label: string;
    isConfirmed: boolean;
  };
}

export interface LadduAuctionHighlightData {
  title: string;
  subtitle: string;
  winnerName: string;
  winningBid: string;
  eventDate: string;
  photo: string;
  description: string;
  isPlaceholder: boolean;
}

export interface ManifestoPillar {
  title: string;
  category: "Vision" | "Goals" | "Initiatives" | "Commitments";
  description: string;
  iconName?: string;
}
