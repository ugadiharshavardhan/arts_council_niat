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
    name: "B Kranthi Kiran",
    role: "President",
    studentId: "N24H01A051",
    photo: "/images/members/kranthi-kiran.jpg",
  },
  {
    id: "mem-02",
    name: "Akula Hasini",
    role: "Vice President",
    studentId: "N24H01B0273",
    photo: "/images/members/akula-hasini.png",
    imagePosition: "center 35%",
  },
  {
    id: "mem-03",
    name: "Ashwitha Jilla",
    role: "Event Management Head",
    studentId: "N24H01B0305",
    photo: "/images/members/ashwitha-jilla.jpg",
  },
  {
    id: "mem-04",
    name: "Thatikonda Swetcha",
    role: "OutReach Head",
    studentId: "N24H01A0504",
    photo: "/images/members/thatikonda-swetcha.png",
    imagePosition: "center 10%",
  },
  {
    id: "mem-05",
    name: "Ashrith Nanda",
    role: "Finance Head",
    studentId: "N24H01A0008",
    photo: "/images/members/ashrith-nanda.png",
  },
  {
    id: "mem-06",
    name: "Pindi Anila",
    role: "Verticals Head",
    studentId: "N24H01A0365",
    photo: "/images/placeholder-member-6.svg",
  },
];
