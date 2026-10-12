const https = require('https');

const supabaseUrl = 'godwvqxsswltgmbzlrdr.supabase.co';
const serviceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdvZHd2cXhzc3dsdGdtYnpscmRyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MTYxMTM5MywiZXhwIjoyMTA3MTg3MzkzfQ.Yvo1xC5ppi7JbTUETQ8AYXUtYi9VU1G78ZLZqxJa-LU';

function restRequest(path, method, data) {
  return new Promise((resolve, reject) => {
    const payload = data ? JSON.stringify(data) : null;
    const req = https.request({
      hostname: supabaseUrl,
      path: '/rest/v1/' + path,
      method: method,
      headers: {
        'apikey': serviceKey,
        'Authorization': 'Bearer ' + serviceKey,
        'Content-Type': 'application/json',
        'Prefer': 'resolution=merge-duplicates,return=representation',
        ...(payload ? { 'Content-Length': Buffer.byteLength(payload) } : {})
      }
    }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve({ status: res.statusCode, data: body ? JSON.parse(body) : null });
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${body}`));
        }
      });
    });

    req.on('error', reject);
    if (payload) req.write(payload);
    req.end();
  });
}

async function seed() {
  console.log('Seeding Supabase data...');

  // 1. Clear existing events so we have EXACTLY 3 upcoming and 3 past events
  console.log('Resetting events table...');
  await restRequest('events?id=neq.placeholder', 'DELETE').catch(e => console.warn('Delete events:', e.message));

  // 2. Insert 3 Upcoming Events
  const upcomingEvents = [
    {
      id: 'ue-01',
      type: 'upcoming',
      title: 'ANNUAL CULTURAL SYMPHONY 2026',
      date: '15 OCTOBER 2026',
      time: '6:00 PM IST',
      venue: 'Main University Auditorium',
      category: 'Flagship Showcase',
      badge: 'Next Major Event',
      description: 'An evening bringing together classical orchestration, contemporary theater, rhythmic folk expressions, and inter-collegiate performing troupes under one grand stage.',
      image: '/images/placeholder-event-highlight.svg',
      is_featured: true,
      video_url: null,
      gallery: null,
      organizer: 'Performing Arts Council Executive',
      participants: '300+ Performers'
    },
    {
      id: 'ue-02',
      type: 'upcoming',
      title: 'INTER-DEPARTMENT DRAMA PROSCENIUM',
      date: '28 OCTOBER 2026',
      time: '5:30 PM IST',
      venue: 'Black Box Studio Theater',
      category: 'Theatrics & Monologue',
      badge: 'Auditions Open',
      description: 'Original student script competition focusing on experimental proscenium staging, character work, and collaborative sound design.',
      image: '/images/placeholder-event-1.svg',
      is_featured: false,
      video_url: null,
      gallery: null,
      organizer: 'Theatrics Guild',
      participants: '8 Departments'
    },
    {
      id: 'ue-03',
      type: 'upcoming',
      title: 'WESTERN & CLASSICAL ACOUSTICS',
      date: '08 NOVEMBER 2026',
      time: '6:30 PM IST',
      venue: 'Amphitheater East',
      category: 'Instrumental & Vocal',
      badge: 'Live Showcase',
      description: 'Acoustic unplugged session bridging Indian classical ragas with contemporary orchestral compositions.',
      image: '/images/placeholder-event-2.svg',
      is_featured: false,
      video_url: null,
      gallery: null,
      organizer: 'Acoustics & Rhythm Wing',
      participants: '16 Solo & Duet Acts'
    }
  ];

  console.log('Inserting 3 upcoming events...');
  const upRes = await restRequest('events', 'POST', upcomingEvents);
  console.log(`✅ 3 Upcoming events inserted (${upRes.data.length} records).`);

  // 3. Insert 3 Past Events
  const pastEvents = [
    {
      id: 'pe-01',
      type: 'past',
      title: 'NATYA PRAVAHA DANCE FESTIVAL',
      date: '14 AUGUST 2026',
      time: '5:00 PM IST',
      venue: 'Main University Auditorium',
      category: 'Classical Dance',
      badge: null,
      description: 'A grand 2-day classical confluence featuring over 18 collegiate ensembles, celebrating traditional Indian rhythm repertoires.',
      image: '/images/placeholder-past-1.svg',
      is_featured: false,
      video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      organizer: 'Performing Arts Council — Dance Wing',
      participants: '18 Collegiate Teams (240+ Dancers)',
      gallery: ['/images/placeholder-past-1.svg', '/images/placeholder-event-1.svg', '/images/placeholder-event-2.svg']
    },
    {
      id: 'pe-02',
      type: 'past',
      title: 'MONOLOGUE SLAM & STREET PLAY',
      date: '22 JULY 2026',
      time: '4:30 PM IST',
      venue: 'Central Quadrangle',
      category: 'Street Theater',
      badge: null,
      description: 'High-energy social narrative performances by council dramatists exploring grassroots storytelling and satire.',
      image: '/images/placeholder-past-2.svg',
      is_featured: false,
      video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
      organizer: 'NIAT Theatrics Guild',
      participants: '12 Street Play Troupe Teams',
      gallery: ['/images/placeholder-past-2.svg', '/images/placeholder-event-3.svg', '/images/placeholder-event-highlight.svg']
    },
    {
      id: 'pe-03',
      type: 'past',
      title: 'SPRING CHORAL CONVERGENCE',
      date: '10 APRIL 2026',
      time: '6:00 PM IST',
      venue: 'Acoustics Chamber Hall',
      category: 'Vocal Ensemble',
      badge: null,
      description: 'Harmonic choral presentations featuring 8-part a cappella arrangements and university student compositions.',
      image: '/images/placeholder-past-3.svg',
      is_featured: false,
      video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
      organizer: 'Classical Music Society',
      participants: '8-Part Choral Society Ensemble',
      gallery: ['/images/placeholder-past-3.svg', '/images/placeholder-event-2.svg']
    }
  ];

  console.log('Inserting 3 past events...');
  const pastRes = await restRequest('events', 'POST', pastEvents);
  console.log(`✅ 3 Past events inserted (${pastRes.data.length} records).`);

  // 4. Seed Club Members (The exact council members from before)
  const clubMembers = [
    {
      id: 'mem-01',
      name: 'B Kranthi Kiran',
      role: 'President',
      student_id: 'N24H01A051',
      department: 'Executive Leadership',
      photo: '/images/members/kranthi-kiran.jpg',
      image_position: 'center center',
      is_leadership: true,
      display_order: 1
    },
    {
      id: 'mem-02',
      name: 'Akula Hasini',
      role: 'Vice President',
      student_id: 'N24H01B0273',
      department: 'Operations & Production',
      photo: '/images/members/akula-hasini.png',
      image_position: 'center 35%',
      is_leadership: true,
      display_order: 2
    },
    {
      id: 'mem-03',
      name: 'Ashwitha Jilla',
      role: 'Event Management Head',
      student_id: 'N24H01B0305',
      department: 'Events & Logistics',
      photo: '/images/members/ashwitha-jilla.jpg',
      image_position: 'center center',
      is_leadership: false,
      display_order: 3
    },
    {
      id: 'mem-04',
      name: 'Thatikonda Swetcha',
      role: 'OutReach Head',
      student_id: 'N24H01A0504',
      department: 'Public Relations & Media',
      photo: '/images/members/thatikonda-swetcha.png',
      image_position: 'center 10%',
      is_leadership: false,
      display_order: 4
    },
    {
      id: 'mem-05',
      name: 'Ashrith Nanda',
      role: 'Finance Head',
      student_id: 'N24H01A0008',
      department: 'Finance & Sponsorships',
      photo: '/images/members/ashrith-nanda.png',
      image_position: 'center center',
      is_leadership: false,
      display_order: 5
    },
    {
      id: 'mem-06',
      name: 'Pindi Anila',
      role: 'Verticals Head',
      student_id: 'N24H01A0365',
      department: 'Club Verticals',
      photo: '/images/placeholder-member-6.svg',
      image_position: 'center center',
      is_leadership: false,
      display_order: 6
    }
  ];

  console.log(`Inserting ${clubMembers.length} club members...`);
  const membersRes = await restRequest('club_members', 'POST', clubMembers);
  console.log(`✅ Club members inserted successfully (${membersRes.data.length} records).`);

  // 5. Seed Winners
  const winners = [
    {
      id: 'win-01',
      name: 'Arjun Verma',
      event_name: 'Inter-University Classical Solo',
      position: '1st Place (Gold Trophy)',
      date: '12 September 2026',
      prize_or_achievement: 'Rolling Trophy & ₹25,000 Grant',
      category: 'Classical Solo Vocal',
      photo: '/images/placeholder-winner-1.svg',
      is_featured: true
    },
    {
      id: 'win-02',
      name: 'Priya Sharma',
      event_name: 'State One-Act Play Championship',
      position: 'Best Production & Ensemble',
      date: '28 August 2026',
      prize_or_achievement: "Governor's Merit Citation",
      category: 'Theatrics',
      photo: '/images/placeholder-winner-2.svg',
      is_featured: false
    },
    {
      id: 'win-03',
      name: 'Rohan Kulkarni',
      event_name: 'Percussion Conclave 2026',
      position: '1st Runner Up (Silver Medallion)',
      date: '04 July 2026',
      prize_or_achievement: 'National Youth Honor',
      category: 'Instrumental Rhythm',
      photo: '/images/placeholder-winner-3.svg',
      is_featured: false
    },
    {
      id: 'win-04',
      name: 'Ananya Deshmukh',
      event_name: 'Contemporary Choreography Summit',
      position: 'Choreographer of the Year',
      date: '16 May 2026',
      prize_or_achievement: 'Best Original Score & Movement',
      category: 'Contemporary Dance',
      photo: '/images/placeholder-winner-4.svg',
      is_featured: false
    }
  ];

  console.log(`Inserting ${winners.length} winners...`);
  const winnersRes = await restRequest('winners', 'POST', winners);
  console.log(`✅ Winners inserted successfully (${winnersRes.data.length} records).`);

  console.log('\n🎉 ALL SUPABASE DATA SEEDED SUCCESSFULLY!');
}

seed().catch(err => {
  console.error('❌ Seeding error:', err);
  process.exit(1);
});
