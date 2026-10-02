const fs = require('fs');
const path = require('path');

function makeSvg(text, sub, accent='#c99738', bg='#0c0d12') {
  return `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600' width='100%' height='100%'>
  <defs>
    <radialGradient id='bgGrad' cx='50%' cy='40%' r='80%'>
      <stop offset='0%' stop-color='${accent}' stop-opacity='0.22'/>
      <stop offset='100%' stop-color='${bg}' stop-opacity='1'/>
    </radialGradient>
    <pattern id='grid' width='40' height='40' patternUnits='userSpaceOnUse'>
      <path d='M 40 0 L 0 0 0 40' fill='none' stroke='rgba(255,255,255,0.04)' stroke-width='1'/>
    </pattern>
  </defs>
  <rect width='100%' height='100%' fill='${bg}'/>
  <rect width='100%' height='100%' fill='url(#bgGrad)'/>
  <rect width='100%' height='100%' fill='url(#grid)'/>
  <circle cx='400' cy='230' r='120' stroke='${accent}' stroke-width='1.5' stroke-dasharray='4 8' fill='none' opacity='0.5'/>
  <circle cx='400' cy='230' r='90' stroke='rgba(255,255,255,0.1)' stroke-width='1' fill='none'/>
  <path d='M375,205 L425,205 L400,255 Z' fill='none' stroke='${accent}' stroke-width='2'/>
  <text x='400' y='360' text-anchor='middle' fill='#f4f4f5' font-family='system-ui, -apple-system, sans-serif' font-size='22' font-weight='700' letter-spacing='2'>${text}</text>
  <text x='400' y='395' text-anchor='middle' fill='${accent}' font-family='system-ui, -apple-system, sans-serif' font-size='13' font-weight='600' letter-spacing='3'>${sub}</text>
  <rect x='330' y='425' width='140' height='26' rx='13' fill='rgba(255,255,255,0.06)' stroke='rgba(255,255,255,0.15)'/>
  <text x='400' y='442' text-anchor='middle' fill='#a1a1aa' font-family='system-ui, -apple-system, sans-serif' font-size='10' letter-spacing='1.5'>PLACEHOLDER ASSET</text>
</svg>`;
}

const assets = [
  ['placeholder-event-highlight.svg', 'HERO EVENT SPOTLIGHT', 'CULTURAL SYMPHONY 2026', '#d4af37'],
  ['placeholder-event-1.svg', 'PROSCENIUM THEATRICS', 'INTER-DEPARTMENT PLAY', '#e06666'],
  ['placeholder-event-2.svg', 'ACOUSTICS & STRINGS', 'CLASSICAL FUSION CONCERT', '#68a0d2'],
  ['placeholder-event-3.svg', 'CHOREOGRAPHY NIGHT', 'ANNUAL ENSEMBLE BATTLE', '#d9822b'],
  ['placeholder-past-1.svg', 'NATYA PRAVAHA', 'CLASSICAL REPERTOIRE', '#d4af37'],
  ['placeholder-past-2.svg', 'MONOLOGUE SLAM', 'CENTRAL QUAD THEATER', '#a370f7'],
  ['placeholder-past-3.svg', 'CHORAL HARMONY', 'ACOUSTIC SPRING CONCLAVE', '#48bfe3'],
  ['placeholder-past-4.svg', 'SHADOW PROJECTIONS', 'AV MULTI-SENSORY NIGHT', '#f72585'],
  ['placeholder-winner-1.svg', 'GOLD TROPHY CITATION', 'CLASSICAL VOCAL WINNER', '#d4af37'],
  ['placeholder-winner-2.svg', 'ENSEMBLE LAUREATE', 'BEST PRODUCTION TROUPE', '#64dfdf'],
  ['placeholder-winner-3.svg', 'PERCUSSION MEDALIST', 'NATIONAL YOUTH FESTIVAL', '#e29578'],
  ['placeholder-winner-4.svg', 'CHOREOGRAPHER AWARD', 'CONTEMPORARY DANCE CUP', '#ffb703'],
  ['placeholder-president.svg', 'PRESIDENT PORTRAIT', 'OFFICIAL LEADERSHIP DESK', '#d4af37'],
  ['placeholder-vice-president.svg', 'VICE PRESIDENT PORTRAIT', 'OPERATIONS & OUTREACH', '#e2a35d'],
  ['placeholder-member-1.svg', 'COUNCIL MEMBER 01', 'THEATRICS SECRETARY', '#9b5de5'],
  ['placeholder-member-2.svg', 'COUNCIL MEMBER 02', 'MUSIC & VOCALS LEAD', '#00bbf9'],
  ['placeholder-member-3.svg', 'COUNCIL MEMBER 03', 'DANCE CONVENER', '#f15bb5'],
  ['placeholder-member-4.svg', 'COUNCIL MEMBER 04', 'STAGE & LOGISTICS LEAD', '#00f5d4'],
  ['placeholder-member-5.svg', 'COUNCIL MEMBER 05', 'PR & MEDIA HEAD', '#fee440'],
  ['placeholder-member-6.svg', 'COUNCIL MEMBER 06', 'EXT. AFFAIRS CONVENER', '#70d6ff'],
  ['placeholder-laddu-auction.svg', 'GANESH CHATURTHI', 'CEREMONIAL LADDU AUCTION', '#f59e0b']
];

const dir = path.join(__dirname, 'public', 'images');
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

for (const [file, title, sub, accent] of assets) {
  fs.writeFileSync(path.join(dir, file), makeSvg(title, sub, accent));
}
console.log('Done generating placeholder assets');
