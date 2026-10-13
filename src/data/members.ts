import { CouncilMember, VerticalsTeamData, FinanceTeamData, SocialMediaTeamData, EventManagementTeamData, CouncilGroup } from "@/types";

export const councilLeadership: { president: CouncilMember; vicePresident: CouncilMember } = {
  president: {
    id: "mem-01",
    name: "B Kranthi Kiran",
    role: "President, Performing Arts Council",
    department: "Executive Leadership",
    studentId: "N24H01A051",
    photo: "/images/members/kranthi-kiran.jpg",
    imagePosition: "center 65%",
    isLeadership: true,
  },
  vicePresident: {
    id: "mem-02",
    name: "Akula Hasini",
    role: "Vice President, Performing Arts Council",
    department: "Operations & Production",
    studentId: "N24H01B0273",
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
    department: "Executive Leadership",
    imagePosition: "center 65%",
    isLeadership: true,
  },
  {
    id: "mem-02",
    name: "Akula Hasini",
    role: "Vice President",
    studentId: "N24H01B0273",
    photo: "/images/members/akula-hasini.png",
    department: "Operations & Production",
    imagePosition: "center 35%",
    isLeadership: true,
  },
  {
    id: "mem-03",
    name: "Ashwitha Jilla",
    role: "Event Management Head",
    studentId: "N24H01B0305",
    photo: "/images/members/ashwitha-jilla.jpg",
    department: "Events & Logistics",
    imagePosition: "center 38%",
    teamUrl: "/club-members/event-management",
  },
  {
    id: "mem-04",
    name: "Thatikonda Swetcha",
    role: "OutReach Head",
    studentId: "N24H01A0504",
    photo: "/images/members/thatikonda-swetcha.png",
    department: "Public Relations & Media",
    imagePosition: "center 10%",
  },
  {
    id: "mem-05",
    name: "Ashrith Nanda",
    role: "Finance Head",
    studentId: "N24H01A0008",
    photo: "/images/members/ashrith-nanda.png",
    department: "Finance & Sponsorships",
    imagePosition: "center 35%",
    teamUrl: "/club-members/finance",
  },
  {
    id: "mem-06",
    name: "Pindi Anila",
    role: "Verticals Head",
    studentId: "N24H01A0365",
    photo: "/images/members/pindi-anila.jpg",
    department: "Club Verticals",
    imagePosition: "center 8%",
    teamUrl: "/club-members/verticals",
  },
  {
    id: "mem-07",
    name: "Kambam Shashank",
    role: "Social Media Head",
    studentId: "N24H01A0522",
    photo: "/images/members/kambam-shashank.jpg",
    department: "Social Media & Design",
    imagePosition: "center 25%",
    teamUrl: "/club-members/social-media",
  },
];

export const verticalsTeamData: VerticalsTeamData = {
  head: {
    id: "mem-06",
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
    id: "mem-05",
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
    id: "mem-07",
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
    id: "mem-03",
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

/**
 * Complete list of all 22 Performing Arts Council members
 * across Executive Directorate and all Council Wings.
 */
export const allClubMembers: CouncilMember[] = [
  // 1. Executive Leadership
  councilLeadership.president,
  councilLeadership.vicePresident,

  // 2. Council Heads
  featuredCouncilMembers[2], // Ashwitha Jilla (Event Management Head)
  featuredCouncilMembers[3], // Thatikonda Swetcha (OutReach Head)
  featuredCouncilMembers[4], // Ashrith Nanda (Finance Head)
  featuredCouncilMembers[5], // Pindi Anila (Verticals Head)
  featuredCouncilMembers[6], // Kambam Shashank (Social Media Head)

  // 3. Finance Members
  ...financeTeamData.members.map((m) => ({
    ...m,
    department: "Finance & Sponsorships",
    teamUrl: "/club-members/finance",
  })),

  // 4. Event Management Members
  ...eventManagementTeamData.members.map((m) => ({
    ...m,
    department: "Event Management",
    teamUrl: "/club-members/event-management",
  })),

  // 5. Social Media Members
  ...socialMediaTeamData.members.map((m) => ({
    ...m,
    department: "Social Media & Design",
    teamUrl: "/club-members/social-media",
  })),

  // 6. Verticals Members
  ...verticalsTeamData.members.map((m) => ({
    ...m,
    department: "Club Verticals",
    teamUrl: "/club-members/verticals",
  })),
];

// ============================================================================
// DYNAMIC TEAM EXTRACTORS
// ============================================================================

export function getFinanceTeamFromMembers(memberList: CouncilMember[]): FinanceTeamData {
  const head =
    memberList.find(
      (m) =>
        m.id === "mem-05" ||
        m.id === "fin-head" ||
        m.role.toLowerCase() === "finance head" ||
        (m.role.toLowerCase().includes("finance") && m.role.toLowerCase().includes("head"))
    ) || financeTeamData.head;

  const members = memberList.filter((m) => {
    if (m.id === head.id) return false;
    const role = (m.role || "").toLowerCase();
    const dept = (m.department || "").toLowerCase();
    return (
      m.id.startsWith("fin-") ||
      dept.includes("finance") ||
      (role.includes("finance") && !role.includes("head"))
    );
  });

  return { head, members };
}

export function getEventManagementTeamFromMembers(memberList: CouncilMember[]): EventManagementTeamData {
  const head =
    memberList.find(
      (m) =>
        m.id === "mem-03" ||
        m.id === "evt-head" ||
        m.role.toLowerCase() === "event management head" ||
        (m.role.toLowerCase().includes("event") && m.role.toLowerCase().includes("head"))
    ) || eventManagementTeamData.head;

  const members = memberList.filter((m) => {
    if (m.id === head.id) return false;
    const role = (m.role || "").toLowerCase();
    const dept = (m.department || "").toLowerCase();
    return (
      m.id.startsWith("evt-") ||
      dept.includes("event") ||
      (role.includes("event") && !role.includes("head"))
    );
  });

  return { head, members };
}

export function getSocialMediaTeamFromMembers(memberList: CouncilMember[]): SocialMediaTeamData {
  const head =
    memberList.find(
      (m) =>
        m.id === "mem-07" ||
        m.id === "soc-head" ||
        m.role.toLowerCase() === "social media head" ||
        (m.role.toLowerCase().includes("social") && m.role.toLowerCase().includes("head"))
    ) || socialMediaTeamData.head;

  const members = memberList.filter((m) => {
    if (m.id === head.id) return false;
    const role = (m.role || "").toLowerCase();
    const dept = (m.department || "").toLowerCase();
    return (
      m.id.startsWith("soc-") ||
      dept.includes("social") ||
      role.includes("content") ||
      role.includes("writer") ||
      role.includes("designer") ||
      role.includes("photography") ||
      role.includes("editor") ||
      (role.includes("social") && !role.includes("head"))
    );
  });

  return { head, members };
}

export function getVerticalsTeamFromMembers(memberList: CouncilMember[]): VerticalsTeamData {
  const head =
    memberList.find(
      (m) =>
        m.id === "mem-06" ||
        m.id === "vert-head" ||
        m.role.toLowerCase() === "verticals head" ||
        (m.role.toLowerCase().includes("vertical") && m.role.toLowerCase().includes("head"))
    ) || verticalsTeamData.head;

  const members = memberList.filter((m) => {
    if (m.id === head.id) return false;
    const role = (m.role || "").toLowerCase();
    const dept = (m.department || "").toLowerCase();
    return (
      m.id.startsWith("vert-") ||
      dept.includes("vertical") ||
      (role.includes("vertical") && !role.includes("head"))
    );
  });

  return { head, members };
}

/**
 * Helper to build the hierarchical organizational tree dynamically,
 * deriving exclusively from the live members list without resurrecting deleted members.
 */
export function buildCouncilsHierarchy(customMembers?: CouncilMember[]) {
  const memberList = customMembers && customMembers.length > 0 ? customMembers : allClubMembers;

  const president =
    memberList.find(
      (m) =>
        m.id === "mem-01" ||
        m.role.toLowerCase() === "president" ||
        m.role.toLowerCase().startsWith("president,")
    ) || councilLeadership.president;

  const vicePresident =
    memberList.find(
      (m) =>
        m.id === "mem-02" ||
        m.role.toLowerCase().includes("vice")
    ) || councilLeadership.vicePresident;

  const fin = getFinanceTeamFromMembers(memberList);
  const evt = getEventManagementTeamFromMembers(memberList);
  const soc = getSocialMediaTeamFromMembers(memberList);
  const vert = getVerticalsTeamFromMembers(memberList);

  const outreachHead =
    memberList.find(
      (m) =>
        m.id === "mem-04" ||
        m.role.toLowerCase().includes("outreach head") ||
        (m.role.toLowerCase().includes("outreach") && m.role.toLowerCase().includes("head"))
    ) || memberList.find((m) => m.id === "mem-04") || featuredCouncilMembers[3];

  const outreachMembers = memberList.filter((m) => {
    if (m.id === outreachHead.id || m.id === president.id || m.id === vicePresident.id) return false;
    const dept = (m.department || "").toLowerCase();
    return dept.includes("outreach") || dept.includes("public relations");
  });

  const councils: CouncilGroup[] = [
    {
      id: "finance",
      name: "Finance & Budgeting Council",
      shortName: "Finance",
      badge: "Fiscal Directorate",
      description:
        "Managing resource allocations, sponsorships, proscenium vendor budgets, and financial governance powering every cultural production.",
      route: "/club-members/finance",
      head: fin.head,
      members: fin.members,
    },
    {
      id: "event-management",
      name: "Event Management & Production Council",
      shortName: "Event Management",
      badge: "Stage & Operations",
      description:
        "Directing proscenium run-of-shows, stage protocols, artist greenrooms, acoustic orchestration, and venue crowd dynamics.",
      route: "/club-members/event-management",
      head: evt.head,
      members: evt.members,
    },
    {
      id: "social-media",
      name: "Social Media, Content & Design Council",
      shortName: "Social Media & Design",
      badge: "Media & Digital Reach",
      description:
        "Curating visual branding, proscenium event cinematography, live coverage, editorial typography, and digital student outreach.",
      route: "/club-members/social-media",
      head: soc.head,
      members: soc.members,
    },
    {
      id: "verticals",
      name: "Verticals & Cultural Wings Directorate",
      shortName: "Verticals",
      badge: "Artistic Guilds",
      description:
        "Powering cross-functional creative initiatives, multidisciplinary stage wings, monologue showcases, and student club coordination.",
      route: "/club-members/verticals",
      head: vert.head,
      members: vert.members,
    },
    {
      id: "outreach",
      name: "Outreach & Public Relations Council",
      shortName: "Outreach & PR",
      badge: "Inter-Collegiate PR",
      description:
        "Fostering inter-university liaisons, guest artist invitations, academic council alliances, and public relations communications.",
      head: outreachHead,
      members: outreachMembers,
    },
  ];

  return {
    executiveLeadership: {
      president,
      vicePresident,
    },
    councils,
  };
}


