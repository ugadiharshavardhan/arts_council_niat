import { EventItem, WinnerItem, CouncilMember } from "@/types";
import {
  upcomingEventHighlight,
  upcomingEventsList,
  pastEventsList,
} from "@/data/events";
import { recentWinnersList } from "@/data/winners";
import { featuredCouncilMembers } from "@/data/members";
import { supabase, isSupabaseConfigured } from "./supabase";

// Storage keys for local fallback
const STORAGE_KEYS = {
  UPCOMING_EVENTS: "pac_upcoming_events_v1",
  PAST_EVENTS: "pac_past_events_v1",
  WINNERS: "pac_winners_v1",
  MEMBERS: "pac_members_v1",
};

// Default seed data
export const DEFAULT_UPCOMING: EventItem[] = upcomingEventsList;
export const DEFAULT_PAST: EventItem[] = pastEventsList;
export const DEFAULT_WINNERS: WinnerItem[] = recentWinnersList;
export const DEFAULT_MEMBERS: CouncilMember[] = featuredCouncilMembers;

function isClient(): boolean {
  return typeof window !== "undefined";
}

function getLocal<T>(key: string, fallback: T): T {
  if (!isClient()) return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      localStorage.setItem(key, JSON.stringify(fallback));
      return fallback;
    }
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function setLocal<T>(key: string, value: T): void {
  if (!isClient()) return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new Event("pac-data-updated"));
  } catch (err) {
    console.error("Local storage error:", err);
  }
}

function setLocalSilent<T>(key: string, value: T): void {
  if (!isClient()) return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error("Local storage error:", err);
  }
}

// ============================================================================
// SUPABASE HEALTH CHECK
// ============================================================================
export interface SupabaseHealth {
  configured: boolean;
  connected: boolean;
  tablesExist: boolean;
  message: string;
}

export async function checkSupabaseStatus(): Promise<SupabaseHealth> {
  if (!isSupabaseConfigured || !supabase) {
    return {
      configured: false,
      connected: false,
      tablesExist: false,
      message: "Supabase credentials not configured in .env",
    };
  }

  try {
    const { error } = await supabase.from("events").select("id").limit(1);
    if (error) {
      if (
        error.message?.includes("relation") ||
        error.message?.includes("table") ||
        error.code === "PGRST204" ||
        error.code === "PGRST205" ||
        error.code === "42P01"
      ) {
        return {
          configured: true,
          connected: true,
          tablesExist: false,
          message: "Connected to Supabase, but SQL schema tables (events, winners, club_members) need to be created.",
        };
      }
      return {
        configured: true,
        connected: false,
        tablesExist: false,
        message: error.message || "Supabase connection error",
      };
    }
    return {
      configured: true,
      connected: true,
      tablesExist: true,
      message: "Active and connected to Supabase Cloud!",
    };
  } catch (err: any) {
    return {
      configured: true,
      connected: false,
      tablesExist: false,
      message: err?.message || "Failed to reach Supabase endpoint",
    };
  }
}

// ============================================================================
// UPCOMING EVENTS
// ============================================================================
export async function getUpcomingEvents(): Promise<EventItem[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("type", "upcoming")
        .order("created_at", { ascending: false });

      if (!error && Array.isArray(data)) {
        // Table exists in Supabase - return rows directly from Supabase!
        if (data.length > 0) {
          const mapped = data.map((d) => ({
            id: d.id,
            title: d.title,
            date: d.date,
            time: d.time || undefined,
            venue: d.venue || undefined,
            description: d.description,
            category: d.category || undefined,
            image: d.image,
            badge: d.badge || undefined,
            isFeatured: Boolean(d.is_featured),
          }));
          setLocalSilent(STORAGE_KEYS.UPCOMING_EVENTS, mapped);
          return mapped;
        }
        return [];
      }
    } catch (err) {
      console.warn("Error querying Supabase upcoming events, using fallback:", err);
    }
  }
  return getLocal<EventItem[]>(STORAGE_KEYS.UPCOMING_EVENTS, DEFAULT_UPCOMING);
}

export async function saveUpcomingEvent(
  event: EventItem
): Promise<{ success: boolean; syncedToCloud: boolean; error?: string }> {
  let syncedToCloud = false;
  let cloudError = "";

  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase.from("events").upsert(
        {
          id: event.id,
          type: "upcoming",
          title: event.title,
          date: event.date,
          time: event.time || null,
          venue: event.venue || null,
          description: event.description,
          category: event.category || null,
          badge: event.badge || null,
          image: event.image,
          is_featured: Boolean(event.isFeatured),
          updated_at: new Date().toISOString(),
        },
        { onConflict: "id" }
      );
      if (error) {
        cloudError = error.message;
        console.error("Supabase upcoming event upsert error:", error);
      } else {
        syncedToCloud = true;
      }
    } catch (err: any) {
      cloudError = err?.message || "Supabase upsert failed";
      console.error("Supabase upsert error:", err);
    }
  }

  // Update local cache and notify listeners
  const current = getLocal<EventItem[]>(STORAGE_KEYS.UPCOMING_EVENTS, DEFAULT_UPCOMING);
  const exists = current.some((e) => e.id === event.id);
  const updated = exists
    ? current.map((e) => (e.id === event.id ? event : e))
    : [event, ...current];
  setLocal(STORAGE_KEYS.UPCOMING_EVENTS, updated);

  return { success: !cloudError, syncedToCloud, error: cloudError };
}

export async function deleteUpcomingEvent(
  id: string
): Promise<{ success: boolean; error?: string }> {
  let cloudError = "";
  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase.from("events").delete().eq("id", id);
      if (error) {
        cloudError = error.message;
        console.error("Supabase delete error:", error);
      }
    } catch (err: any) {
      cloudError = err?.message || "Supabase delete failed";
      console.error("Supabase delete error:", err);
    }
  }

  const current = getLocal<EventItem[]>(STORAGE_KEYS.UPCOMING_EVENTS, DEFAULT_UPCOMING);
  const updated = current.filter((e) => e.id !== id);
  setLocal(STORAGE_KEYS.UPCOMING_EVENTS, updated);

  return { success: !cloudError, error: cloudError };
}

// ============================================================================
// PAST EVENTS
// ============================================================================
export async function getPastEvents(): Promise<EventItem[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("type", "past")
        .order("created_at", { ascending: false });

      if (!error && Array.isArray(data)) {
        // Table exists in Supabase - return rows directly from Supabase!
        if (data.length > 0) {
          const mapped = data.map((d) => ({
            id: d.id,
            title: d.title,
            date: d.date,
            venue: d.venue || undefined,
            description: d.description,
            category: d.category || undefined,
            image: d.image,
            videoUrl: d.video_url || undefined,
            gallery: d.gallery || undefined,
            organizer: d.organizer || undefined,
            participants: d.participants || undefined,
          }));
          setLocalSilent(STORAGE_KEYS.PAST_EVENTS, mapped);
          return mapped;
        }
        return [];
      }
    } catch (err) {
      console.warn("Error querying Supabase past events, using fallback:", err);
    }
  }
  return getLocal<EventItem[]>(STORAGE_KEYS.PAST_EVENTS, DEFAULT_PAST);
}

export async function savePastEvent(
  event: EventItem
): Promise<{ success: boolean; syncedToCloud: boolean; error?: string }> {
  let syncedToCloud = false;
  let cloudError = "";

  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase.from("events").upsert(
        {
          id: event.id,
          type: "past",
          title: event.title,
          date: event.date,
          venue: event.venue || null,
          description: event.description,
          category: event.category || null,
          image: event.image,
          video_url: event.videoUrl || null,
          gallery: event.gallery || null,
          organizer: event.organizer || null,
          participants: event.participants || null,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "id" }
      );
      if (error) {
        cloudError = error.message;
        console.error("Supabase past event upsert error:", error);
      } else {
        syncedToCloud = true;
      }
    } catch (err: any) {
      cloudError = err?.message || "Supabase upsert failed";
      console.error("Supabase upsert error:", err);
    }
  }

  // Update local cache and notify listeners
  const current = getLocal<EventItem[]>(STORAGE_KEYS.PAST_EVENTS, DEFAULT_PAST);
  const exists = current.some((e) => e.id === event.id);
  const updated = exists
    ? current.map((e) => (e.id === event.id ? event : e))
    : [event, ...current];
  setLocal(STORAGE_KEYS.PAST_EVENTS, updated);

  return { success: !cloudError, syncedToCloud, error: cloudError };
}

export async function deletePastEvent(
  id: string
): Promise<{ success: boolean; error?: string }> {
  let cloudError = "";
  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase.from("events").delete().eq("id", id);
      if (error) {
        cloudError = error.message;
        console.error("Supabase delete error:", error);
      }
    } catch (err: any) {
      cloudError = err?.message || "Supabase delete failed";
      console.error("Supabase delete error:", err);
    }
  }

  const current = getLocal<EventItem[]>(STORAGE_KEYS.PAST_EVENTS, DEFAULT_PAST);
  const updated = current.filter((e) => e.id !== id);
  setLocal(STORAGE_KEYS.PAST_EVENTS, updated);

  return { success: !cloudError, error: cloudError };
}

// ============================================================================
// WINNERS
// ============================================================================
export async function getWinners(): Promise<WinnerItem[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from("winners")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && Array.isArray(data)) {
        if (data.length > 0) {
          const mapped = data.map((d) => ({
            id: d.id,
            name: d.name,
            eventName: d.event_name,
            position: d.position,
            date: d.date,
            prizeOrAchievement: d.prize_or_achievement,
            category: d.category || undefined,
            photo: d.photo,
            isFeatured: Boolean(d.is_featured),
          }));
          setLocalSilent(STORAGE_KEYS.WINNERS, mapped);
          return mapped;
        }
        return [];
      }
    } catch (err) {
      console.warn("Error querying Supabase winners, using fallback:", err);
    }
  }
  return getLocal<WinnerItem[]>(STORAGE_KEYS.WINNERS, DEFAULT_WINNERS);
}

export async function saveWinner(
  winner: WinnerItem
): Promise<{ success: boolean; syncedToCloud: boolean; error?: string }> {
  let syncedToCloud = false;
  let cloudError = "";

  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase.from("winners").upsert(
        {
          id: winner.id,
          name: winner.name,
          event_name: winner.eventName,
          position: winner.position,
          date: winner.date,
          prize_or_achievement: winner.prizeOrAchievement,
          category: winner.category || null,
          photo: winner.photo,
          is_featured: Boolean(winner.isFeatured),
          updated_at: new Date().toISOString(),
        },
        { onConflict: "id" }
      );
      if (error) {
        cloudError = error.message;
        console.error("Supabase winner upsert error:", error);
      } else {
        syncedToCloud = true;
      }
    } catch (err: any) {
      cloudError = err?.message || "Supabase upsert failed";
      console.error("Supabase upsert error:", err);
    }
  }

  const current = getLocal<WinnerItem[]>(STORAGE_KEYS.WINNERS, DEFAULT_WINNERS);
  const exists = current.some((w) => w.id === winner.id);
  const updated = exists
    ? current.map((w) => (w.id === winner.id ? winner : w))
    : [winner, ...current];
  setLocal(STORAGE_KEYS.WINNERS, updated);

  return { success: !cloudError, syncedToCloud, error: cloudError };
}

export async function deleteWinner(
  id: string
): Promise<{ success: boolean; error?: string }> {
  let cloudError = "";
  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase.from("winners").delete().eq("id", id);
      if (error) {
        cloudError = error.message;
        console.error("Supabase delete error:", error);
      }
    } catch (err: any) {
      cloudError = err?.message || "Supabase delete failed";
      console.error("Supabase delete error:", err);
    }
  }

  const current = getLocal<WinnerItem[]>(STORAGE_KEYS.WINNERS, DEFAULT_WINNERS);
  const updated = current.filter((w) => w.id !== id);
  setLocal(STORAGE_KEYS.WINNERS, updated);

  return { success: !cloudError, error: cloudError };
}

// ============================================================================
// CLUB MEMBERS
// ============================================================================
export async function getClubMembers(): Promise<CouncilMember[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from("club_members")
        .select("*")
        .order("display_order", { ascending: true });

      if (!error && Array.isArray(data)) {
        if (data.length > 0) {
          const mapped = data.map((d) => ({
            id: d.id,
            name: d.name,
            role: d.role,
            studentId: d.student_id || undefined,
            department: d.department || undefined,
            photo: d.photo,
            imagePosition: d.image_position || undefined,
            isLeadership: Boolean(d.is_leadership),
          }));
          setLocalSilent(STORAGE_KEYS.MEMBERS, mapped);
          return mapped;
        }
        return [];
      }
    } catch (err) {
      console.warn("Error querying Supabase club members, using fallback:", err);
    }
  }
  return getLocal<CouncilMember[]>(STORAGE_KEYS.MEMBERS, DEFAULT_MEMBERS);
}

export async function saveClubMember(
  member: CouncilMember
): Promise<{ success: boolean; syncedToCloud: boolean; error?: string }> {
  let syncedToCloud = false;
  let cloudError = "";

  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase.from("club_members").upsert(
        {
          id: member.id,
          name: member.name,
          role: member.role,
          student_id: member.studentId || null,
          department: member.department || null,
          photo: member.photo,
          image_position: member.imagePosition || "center center",
          is_leadership: Boolean(member.isLeadership),
          updated_at: new Date().toISOString(),
        },
        { onConflict: "id" }
      );
      if (error) {
        cloudError = error.message;
        console.error("Supabase club member upsert error:", error);
      } else {
        syncedToCloud = true;
      }
    } catch (err: any) {
      cloudError = err?.message || "Supabase upsert failed";
      console.error("Supabase upsert error:", err);
    }
  }

  const current = getLocal<CouncilMember[]>(STORAGE_KEYS.MEMBERS, DEFAULT_MEMBERS);
  const exists = current.some((m) => m.id === member.id);
  const updated = exists
    ? current.map((m) => (m.id === member.id ? member : m))
    : [...current, member];
  setLocal(STORAGE_KEYS.MEMBERS, updated);

  return { success: !cloudError, syncedToCloud, error: cloudError };
}

export async function deleteClubMember(
  id: string
): Promise<{ success: boolean; error?: string }> {
  let cloudError = "";
  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase.from("club_members").delete().eq("id", id);
      if (error) {
        cloudError = error.message;
        console.error("Supabase delete error:", error);
      }
    } catch (err: any) {
      cloudError = err?.message || "Supabase delete failed";
      console.error("Supabase delete error:", err);
    }
  }

  const current = getLocal<CouncilMember[]>(STORAGE_KEYS.MEMBERS, DEFAULT_MEMBERS);
  const updated = current.filter((m) => m.id !== id);
  setLocal(STORAGE_KEYS.MEMBERS, updated);

  return { success: !cloudError, error: cloudError };
}

// Complete SQL Schema string for 1-click copy
export const SUPABASE_SCHEMA_SQL = `-- ==============================================================================
-- Performing Arts Council (PAC) - Supabase Database Schema
-- Run this in your Supabase SQL Editor: https://supabase.com/dashboard/project/godwvqxsswltgmbzlrdr/sql
-- ==============================================================================

-- 1. Create table for Events (both upcoming and past)
CREATE TABLE IF NOT EXISTS events (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL CHECK (type IN ('upcoming', 'past')),
  title TEXT NOT NULL,
  date TEXT NOT NULL,
  time TEXT,
  venue TEXT,
  category TEXT,
  badge TEXT,
  description TEXT NOT NULL,
  image TEXT NOT NULL,
  is_featured BOOLEAN DEFAULT false,
  video_url TEXT,
  gallery TEXT[],
  organizer TEXT,
  participants TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create table for Winners
CREATE TABLE IF NOT EXISTS winners (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  event_name TEXT NOT NULL,
  position TEXT NOT NULL,
  date TEXT NOT NULL,
  prize_or_achievement TEXT NOT NULL,
  category TEXT,
  photo TEXT NOT NULL,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create table for Club Members
CREATE TABLE IF NOT EXISTS club_members (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  student_id TEXT,
  department TEXT,
  photo TEXT NOT NULL,
  image_position TEXT DEFAULT 'center center',
  is_leadership BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE winners ENABLE ROW LEVEL SECURITY;
ALTER TABLE club_members ENABLE ROW LEVEL SECURITY;

-- 5. Policies for Public Read Access
CREATE POLICY "Allow public read access on events" 
  ON events FOR SELECT USING (true);

CREATE POLICY "Allow public read access on winners" 
  ON winners FOR SELECT USING (true);

CREATE POLICY "Allow public read access on club_members" 
  ON club_members FOR SELECT USING (true);

-- 6. Policies for Public/Admin Write Access
CREATE POLICY "Allow write access on events" 
  ON events FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow write access on winners" 
  ON winners FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow write access on club_members" 
  ON club_members FOR ALL USING (true) WITH CHECK (true);

-- ==============================================================================
-- Initial Seed Data
-- ==============================================================================

INSERT INTO events (id, type, title, date, time, venue, category, badge, description, image, is_featured)
VALUES 
  ('ue-featured-01', 'upcoming', 'ANNUAL CULTURAL SYMPHONY [PLACEHOLDER]', '15 OCTOBER 2026', '6:00 PM IST', 'MAIN UNIVERSITY AUDITORIUM [PLACEHOLDER]', 'Flagship Showcase', 'Next Major Event', 'An evening bringing together classical orchestration, contemporary theater, rhythmic folk expressions, and inter-collegiate performing troupes under one grand stage.', '/images/placeholder-event-highlight.svg', true),
  ('ue-01', 'upcoming', 'INTER-DEPARTMENT DRAMA PROSCENIUM [PLACEHOLDER]', '28 OCTOBER 2026', '5:30 PM IST', 'Black Box Studio Theater [PLACEHOLDER]', 'Theatrics & Monologue', 'Auditions Open', 'Original student script competition focusing on experimental proscenium staging, character work, and collaborative sound design.', '/images/placeholder-event-1.svg', true),
  ('ue-02', 'upcoming', 'WESTERN & CLASSICAL ACOUSTICS [PLACEHOLDER]', '08 NOVEMBER 2026', '6:30 PM IST', 'Amphitheater East [PLACEHOLDER]', 'Instrumental & Vocal', 'Live Showcase', 'Acoustic unplugged session bridging Indian classical ragas with contemporary orchestral compositions.', '/images/placeholder-event-2.svg', false),
  ('ue-03', 'upcoming', 'FUSION CHOREOGRAPHY NIGHT [PLACEHOLDER]', '19 NOVEMBER 2026', '7:00 PM IST', 'Open Air Complex [PLACEHOLDER]', 'Dance Ensemble', 'House Championship', 'Inter-house dance battle featuring contemporary jazz, Kathak, Bharatanatyam, and hip-hop team formations.', '/images/placeholder-event-3.svg', false)
ON CONFLICT (id) DO NOTHING;

INSERT INTO events (id, type, title, date, venue, category, description, image, video_url, organizer, participants)
VALUES 
  ('pe-01', 'past', 'NATYA PRAVAHA DANCE FESTIVAL [PLACEHOLDER]', '14 AUGUST 2026', 'Main University Auditorium [PLACEHOLDER]', 'Classical Dance', 'A grand 2-day classical confluence featuring over 18 collegiate ensembles, celebrating traditional Indian rhythm repertoires.', '/images/placeholder-past-1.svg', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', 'Performing Arts Council — Dance Wing [PLACEHOLDER]', '18 Collegiate Teams (240+ Dancers) [PLACEHOLDER]'),
  ('pe-02', 'past', 'MONOLOGUE SLAM & STREET PLAY [PLACEHOLDER]', '22 JULY 2026', 'Central Quadrangle [PLACEHOLDER]', 'Street Theater', 'High-energy social narrative performances by council dramatists exploring grassroots storytelling and satire.', '/images/placeholder-past-2.svg', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4', 'NIAT Theatrics Guild [PLACEHOLDER]', '12 Street Play Troupe Teams [PLACEHOLDER]'),
  ('pe-03', 'past', 'SPRING CHORAL CONVERGENCE [PLACEHOLDER]', '10 APRIL 2026', 'Acoustics Chamber Hall [PLACEHOLDER]', 'Vocal Ensemble', 'Harmonic choral presentations featuring 8-part a cappella arrangements and university student compositions.', '/images/placeholder-past-3.svg', NULL, 'Classical Music Society [PLACEHOLDER]', '8-Part Choral Society Ensemble [PLACEHOLDER]'),
  ('pe-04', 'past', 'LIGHT & SHADOW THEATER NIGHT [PLACEHOLDER]', '18 FEBRUARY 2026', 'Fine Arts Courtyard [PLACEHOLDER]', 'Experimental Visuals', 'Multi-sensory shadow puppetry and ambient musical synthesis curated entirely by student lighting technicians.', '/images/placeholder-past-4.svg', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4', 'Visual & Stagecraft Technical Team [PLACEHOLDER]', 'Experimental Lighting & Sound Crew [PLACEHOLDER]')
ON CONFLICT (id) DO NOTHING;

INSERT INTO winners (id, name, event_name, position, date, prize_or_achievement, category, photo, is_featured)
VALUES 
  ('win-01', 'Winner Name [PLACEHOLDER]', 'Inter-University Classical Solo [PLACEHOLDER]', '1st Place (Gold Trophy)', '12 September 2026', 'Rolling Trophy & ₹25,000 Grant [PLACEHOLDER]', 'Classical Solo Vocal', '/images/placeholder-winner-1.svg', true),
  ('win-02', 'Winner Name [PLACEHOLDER]', 'State One-Act Play Championship [PLACEHOLDER]', 'Best Production & Ensemble', '28 August 2026', 'Governor''s Merit Citation [PLACEHOLDER]', 'Theatrics', '/images/placeholder-winner-2.svg', false),
  ('win-03', 'Winner Name [PLACEHOLDER]', 'Percussion Conclave 2026 [PLACEHOLDER]', '1st Runner Up (Silver Medallion)', '04 July 2026', 'National Youth Honor [PLACEHOLDER]', 'Instrumental Rhythm', '/images/placeholder-winner-3.svg', false),
  ('win-04', 'Winner Name [PLACEHOLDER]', 'Contemporary Choreography Summit [PLACEHOLDER]', 'Choreographer of the Year', '16 May 2026', 'Best Original Score & Movement [PLACEHOLDER]', 'Contemporary Dance', '/images/placeholder-winner-4.svg', false)
ON CONFLICT (id) DO NOTHING;

INSERT INTO club_members (id, name, role, student_id, photo, image_position, display_order)
VALUES 
  ('mem-01', 'B Kranthi Kiran', 'President', 'N24H01A051', '/images/members/kranthi-kiran.jpg', 'center center', 1),
  ('mem-02', 'Akula Hasini', 'Vice President', 'N24H01B0273', '/images/members/akula-hasini.png', 'center 35%', 2),
  ('mem-03', 'Ashwitha Jilla', 'Event Management Head', 'N24H01B0305', '/images/members/ashwitha-jilla.jpg', 'center center', 3),
  ('mem-04', 'Thatikonda Swetcha', 'OutReach Head', 'N24H01A0504', '/images/members/thatikonda-swetcha.png', 'center 10%', 4),
  ('mem-05', 'Ashrith Nanda', 'Finance Head', 'N24H01A0008', '/images/members/ashrith-nanda.png', 'center center', 5),
  ('mem-06', 'Pindi Anila', 'Verticals Head', 'N24H01A0365', '/images/placeholder-member-6.svg', 'center center', 6)
ON CONFLICT (id) DO NOTHING;`;
