import { CouncilMember } from "@/types";

export const councilLeadership: { president: CouncilMember; vicePresident: CouncilMember } = {
  president: {
    id: "lead-01",
    name: "President Name [PLACEHOLDER]",
    role: "President, Performing Arts Council",
    department: "Executive Leadership [PLACEHOLDER]",
    photo: "/images/placeholder-president.svg",
    isLeadership: true,
  },
  vicePresident: {
    id: "lead-02",
    name: "Vice President Name [PLACEHOLDER]",
    role: "Vice President, Performing Arts Council",
    department: "Operations & Production [PLACEHOLDER]",
    photo: "/images/placeholder-vice-president.svg",
    isLeadership: true,
  },
};

export const featuredCouncilMembers: CouncilMember[] = [
  {
    id: "mem-01",
    name: "Council Member [PLACEHOLDER]",
    role: "Head of Theatrics & Dramatic Arts",
    department: "Dramatics Wing",
    photo: "/images/placeholder-member-1.svg",
  },
  {
    id: "mem-02",
    name: "Council Member [PLACEHOLDER]",
    role: "General Secretary (Music & Vocal)",
    department: "Music Department",
    photo: "/images/placeholder-member-2.svg",
  },
  {
    id: "mem-03",
    name: "Council Member [PLACEHOLDER]",
    role: "Convener of Dance & Choreography",
    department: "Choreography Wing",
    photo: "/images/placeholder-member-3.svg",
  },
  {
    id: "mem-04",
    name: "Council Member [PLACEHOLDER]",
    role: "Technical Production & Stagecraft Lead",
    department: "Lighting & Acoustic Logistics",
    photo: "/images/placeholder-member-4.svg",
  },
  {
    id: "mem-05",
    name: "Council Member [PLACEHOLDER]",
    role: "Media, Archival & Public Relations",
    department: "Creative Communications",
    photo: "/images/placeholder-member-5.svg",
  },
  {
    id: "mem-06",
    name: "Council Member [PLACEHOLDER]",
    role: "Inter-Collegiate Outreach & Hospitality",
    department: "External Affairs Wing",
    photo: "/images/placeholder-member-6.svg",
  },
];
