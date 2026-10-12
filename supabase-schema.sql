-- ==============================================================================
-- Performing Arts Council (PAC) - Supabase Database Schema
-- Run this in your Supabase SQL Editor (https://supabase.com/dashboard/project/_/sql)
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

-- 6. Policies for Public/Admin Write Access (can be tightened with Supabase Auth)
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
ON CONFLICT (id) DO NOTHING;
