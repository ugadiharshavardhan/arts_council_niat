import { CouncilMember, VerticalsTeamData, FinanceTeamData, SocialMediaTeamData, EventManagementTeamData } from "@/types";

export const councilLeadership: { president: CouncilMember; vicePresident: CouncilMember } = {
  president: {
    id: "lead-01",
    name: "President Name [PLACEHOLDER]",
    role: "President, Performing Arts Council",
    department: "Executive Leadership [PLACEHOLDER]",
    photo: "/images/members/kranthi-kiran.jpg",
    imagePosition: "center 65%",
    isLeadership: true,
  },
  vicePresident: {
    id: "lead-02",
    name: "Vice President Name [PLACEHOLDER]",
    role: "Vice President, Performing Arts Council",
    department: "Operations & Production [PLACEHOLDER]",
    photo: "/images/members/akula-hasini.png",
    imagePosition: "center 35%",
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
    imagePosition: "center 65%",
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
    imagePosition: "center 38%",
    teamUrl: "/club-members/event-management",
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
    imagePosition: "center 35%",
    teamUrl: "/club-members/finance",
  },
  {
    id: "mem-06",
    name: "Pindi Anila",
    role: "Verticals Head",
    studentId: "N24H01A0365",
    photo: "/images/members/pindi-anila.jpg",
    imagePosition: "center 8%",
    teamUrl: "/club-members/verticals",
  },
  {
    id: "mem-07",
    name: "Kambam Shashank",
    role: "Social Media Head",
    studentId: "N24H01A0522",
    photo: "/images/members/kambam-shashank.jpg",
    imagePosition: "center 25%",
    teamUrl: "/club-members/social-media",
  },
];

export const verticalsTeamData: VerticalsTeamData = {
  head: {
    id: "vert-head",
    name: "Pindi Anila",
    role: "Verticals Head",
    studentId: "N24H01A0365",
    photo: "/images/members/pindi-anila.jpg",
    imagePosition: "center 8%",
  },
  members: [
    {
      id: "vert-01",
      name: "Palem Sri Charan",
      role: "Verticals Member",
      studentId: "N24H01A0240",
      photo: "/images/members/palem-sri-charan.jpg",
      imagePosition: "center 18%",
    },
    {
      id: "vert-02",
      name: "Kasini Pooja",
      role: "Verticals Member",
      studentId: "N24H01A0354",
      photo: "/images/members/kasini-pooja.jpg",
      imagePosition: "center 18%",
    },
  ],
};

export const financeTeamData: FinanceTeamData = {
  head: {
    id: "fin-head",
    name: "Ashrith Nanda",
    role: "Finance Head",
    studentId: "N24H01A0008",
    photo: "/images/members/ashrith-nanda.png",
    imagePosition: "center 35%",
  },
  members: [
    {
      id: "fin-01",
      name: "UGADI HARSHA VARDHAN",
      role: "Finance Member",
      studentId: "N24H01B0247",
      photo: "/images/members/ugadi-harsha-vardhan.jpg",
      imagePosition: "center 22%",
    },
    {
      id: "fin-02",
      name: "Neeripelly Vyshnavi",
      role: "Finance Member",
      studentId: "N24H01A0252",
      photo: "/images/members/neeripelly-vyshnavi.jpg",
      imagePosition: "center 18%",
    },
    {
      id: "fin-03",
      name: "Dhanya Sri",
      role: "Finance Member",
      studentId: "N24H01A0300",
      photo: "/images/members/dhanya-sri.jpg",
      imagePosition: "center 18%",
    },
    {
      id: "fin-04",
      name: "P.Parnika",
      role: "Finance Member",
      // Student ID unconfirmed: "P.Parnika" was provided in the ID field; kept configurable ready for correct ID
      studentId: undefined,
      photo: "/images/members/p-parnika.jpg",
      imagePosition: "center 20%",
    },
  ],
};

export const socialMediaTeamData: SocialMediaTeamData = {
  head: {
    id: "soc-head",
    name: "Kambam Shashank",
    role: "Social Media Head",
    studentId: "N24H01A0522",
    photo: "/images/members/kambam-shashank.jpg",
    imagePosition: "center 15%",
  },
  members: [
    {
      id: "soc-01",
      name: "MASETTY VEERA MANIKANTA DHEERAJ",
      role: "Content Writer and Designer",
      studentId: "N24H01A0087",
      photo: "/images/members/masetty-veera-manikanta-dheeraj.jpg",
      imagePosition: "30% 48%",
    },
    {
      id: "soc-02",
      name: "Avinash",
      role: "Photography",
      studentId: "N24H01B0022",
      photo: "/images/members/avinash.jpg",
      imagePosition: "55% 58%",
    },
    {
      id: "soc-03",
      name: "Rebbalapalli Pranav Maruthi",
      role: "Editor",
      studentId: "N24H01B0284",
      photo: "/images/members/rebbalapalli-pranav-maruthi.jpg",
      imagePosition: "center 18%",
    },
  ],
};

export const eventManagementTeamData: EventManagementTeamData = {
  head: {
    id: "evt-head",
    name: "Ashwitha Jilla",
    role: "Event Management Head",
    studentId: "N24H01B0305",
    photo: "/images/members/ashwitha-jilla.jpg",
    imagePosition: "center 38%",
  },
  members: [
    {
      id: "evt-01",
      name: "Heena Tabassum",
      role: "Event Management Member",
      studentId: "N24H01A037",
      photo: "/images/members/heena-tabassum.jpg",
      imagePosition: "center 15%",
    },
    {
      id: "evt-02",
      name: "Hasini",
      role: "Event Management Member",
      studentId: "N24H01A0136",
      photo: "/images/members/hasini.jpg",
      imagePosition: "center 20%",
    },
    {
      id: "evt-03",
      name: "Gourishetti Nandhini",
      role: "Event Management Member",
      studentId: "N24H01A0638",
      photo: "/images/members/gourishetti-nandhini.jpg",
      imagePosition: "center 15%",
    },
    {
      id: "evt-04",
      name: "Shaik Rehana Bi",
      role: "Event Management Member",
      studentId: "N24H01A0633",
      photo: "/images/members/shaik-rehana-bi.jpg",
      imagePosition: "center 75%",
    },
    {
      id: "evt-05",
      name: "Mulukuri Tejavardhan Reddy",
      role: "Event Management Member",
      studentId: "N24H01A0359",
      photo: "/images/members/mulukuri-tejavardhan-reddy.png",
      imagePosition: "center 15%",
    },
    {
      id: "evt-06",
      name: "Thriveda. P",
      role: "Event Management Member",
      studentId: "N24H01A0256",
      photo: "/images/members/thriveda-p.jpg",
      imagePosition: "center 2%",
    },
  ],
};

