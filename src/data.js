// ✏️ Semua konten ada di sini — isi diambil dari CV. Ganti sesuai kebutuhan.

export const profile = {
  name: 'Alsa', // tulisan tangan di hero
  fullName: "Na'ilah Salsabila Maulidiyah",
  // Judul besar di hero (dibagi per baris supaya muat di layar)
  titleLines: ["NA'ILAH SALSABILA MAULIDIYAH"],
  role: 'WEB & MOBILE DEVELOPER',
  tagline: ['I DESIGN & BUILD DIGITAL', 'EXPERIENCES THAT', 'INSPIRE & CONNECT'],
  about:
    "D-IV Informatics Engineering student at Politeknik Negeri Malang, building web & mobile apps — from wireframes and frontend to backend integration and machine learning.",
  location: 'BASED IN MALANG',
  work: 'POLITEKNIK NEGERI MALANG',

  // TODO: CV tidak mencantumkan email / Instagram — isi dengan milikmu.
  email: 'emailkamu@gmail.com',
  instagram: '@usernamekamu',
  instagramUrl: 'https://instagram.com/usernamekamu',
  place: 'Malang, Indonesia',

  photo: 'foto-porto.png',
  photoContact: 'alsa-gemini.jpeg',
};

// ⚠️ "languages" & "tools" tiap proyek adalah PERKIRAAN dari CV & ceritamu — cek dan koreksi
// sesuai yang benar-benar kamu pakai. "contributions" diambil langsung dari CV.
export const projects = [
  {
    no: '01',
    title: 'PROPERTYIQ',
    fullTitle: 'PropertyIQ — Property Price Prediction Mobile App',
    type: 'Mobile App · PBL Semester 5 · 2026',
    headline: 'Predict Property Prices',
    summary:
      'Mobile app that predicts property prices — wireframes, frontend components, REST API and machine learning integration.',
    description:
      'PropertyIQ is a mobile application that helps users estimate property prices using machine learning. It was built as a Project-Based Learning (PBL) project in Semester 5, in a team — covering the whole flow from wireframe and frontend to backend integration and the prediction model.',
    contributions: [
      'Designed wireframes as the reference for the app’s interface structure and user experience.',
      'Developed the mobile frontend components that support the property price prediction feature.',
      'Integrated the app with backend services through REST API.',
      'Integrated machine learning functionality to power the price prediction.',
      'Collaborated with team members on development and testing of the app.',
    ],
    languages: ['Dart'],
    tools: ['Flutter', 'Figma', 'REST API', 'Machine Learning', 'Android Studio', 'Git & GitHub'],
    variant: 1,
    image: '', // contoh: 'propertyiq.png' (screenshot; kosong = tanpa gambar)
    tags: ['MOBILE APP', 'REST API', 'MACHINE LEARNING'],
    url: '#', // link GitHub / demo — kalau '#', tombol "View project" disembunyikan
  },
  {
    no: '02',
    title: 'TESYUK',
    fullTitle: 'TesYuk — Website Platform for Testers & Developers',
    type: 'Website · PBL Semester 4 · 2026',
    headline: 'Test Together, Ship Better',
    summary:
      'Website platform for testers and developers — wireframe design and frontend implementation, built together with the team.',
    description:
      'TesYuk is a website platform that connects testers and developers — a place where apps can be tested by a crowd of testers. It was developed as a Project-Based Learning (PBL) project in Semester 4 by a team, from wireframe to a working interface.',
    contributions: [
      'Designed wireframes to define the website structure, navigation and interface layout.',
      'Developed the website frontend based on the wireframes.',
      'Collaborated with team members to implement features and keep the final result consistent with the design.',
    ],
    languages: ['PHP', 'JavaScript', 'HTML'],
    tools: ['Laravel 11', 'Filament v3', 'Figma', 'VS Code', 'Git & GitHub'],
    variant: 2,
    image: '',
    tags: ['WIREFRAME', 'FRONTEND', 'WEBSITE'],
    url: '#',
  },
  {
    no: '03',
    title: 'MULTIMEDIA & MOBILE LAB',
    fullTitle: 'Website of the Multimedia and Mobile Technology Laboratory',
    type: 'Website · PBL Semester 3 · 2025',
    headline: 'Multimedia & Mobile Technology Lab',
    summary:
      'Website for the Multimedia and Mobile Technology Laboratory — wireframes and frontend based on the lab’s needs.',
    description:
      'A functional website for the Multimedia and Mobile Technology Laboratory, built as a Project-Based Learning (PBL) project in Semester 3. The design and features follow the needs of the laboratory.',
    contributions: [
      'Designed website wireframes based on the laboratory’s needs.',
      'Developed the website frontend to implement the user interface design.',
      'Collaborated with team members to build a functional website that fits the laboratory’s needs.',
    ],
    languages: ['HTML', 'JavaScript'],
    tools: ['Figma', 'VS Code', 'Git & GitHub'],
    variant: 3,
    image: '',
    tags: ['WIREFRAME', 'FRONTEND', 'WEBSITE'],
    url: '#',
  },
];

export const process = [
  { no: '01', title: 'DISCOVER', text: 'Understanding your goals, audience and vision.' },
  { no: '02', title: 'DEFINE', text: 'Research, analysis and strategy development.' },
  { no: '03', title: 'DESIGN', text: 'Crafting wireframes, layouts and visual UI.' },
  { no: '04', title: 'DEVELOP', text: 'Bringing the design to life with clean, responsive code.' },
  { no: '05', title: 'DELIVER', text: 'Testing, optimization and launch with care.' },
];

// Keterampilan teknis dari CV
export const tools = [
  { name: 'FLUTTER', glyph: 'Fl', color: '#54c5f8' },
  { name: 'REACT', glyph: '⚛', color: '#61dafb' },
  { name: 'LARAVEL', glyph: 'La', color: '#ff4d3d' },
  { name: 'TYPESCRIPT', glyph: 'TS', color: '#3b8eea' },
  { name: 'MYSQL', glyph: 'My', color: '#5b9bd5' },
  { name: 'POSTGRESQL', glyph: 'Pg', color: '#6f9fd0' },
  { name: 'GIT & GITHUB', glyph: 'Gt', color: '#f05032' },
  { name: 'FIGMA', glyph: 'Fg', color: '#f24e1e' },
  { name: 'ANDROID STUDIO', glyph: 'As', color: '#7fd99a' },
  { name: 'VS CODE', glyph: 'VS', color: '#3b8eea' },
];
export const moreTools = 'DART · JAVASCRIPT · PHP · REST API · POWER BI · EXCEL · GNS3';

export const softSkills = [
  'Communication',
  'Teamwork & Collaboration',
  'Leadership',
  'Problem-Solving',
  'Time Management',
  'Adaptability',
  'Critical Thinking',
  'Public Speaking',
];

// Pengalaman, pendidikan & prestasi (dari CV)
export const journey = [
  {
    title: 'ORGANIZATION',
    items: [
      {
        name: 'Human Resource Coordinator',
        place: 'Polinema Mengajar · Politeknik Negeri Malang',
        period: '2025 – 2026',
        points: [
          'Managed internal member data, administration and development tracking.',
          'Coordinated HR activities and documented member performance evaluations.',
        ],
      },
      {
        name: 'Head of Committee — Open Recruitment 2026/2027',
        place: 'Polinema Mengajar',
        period: '2026',
        points: [
          'Led planning and execution of the new board recruitment.',
          'Coordinated the committee and kept every stage on schedule.',
        ],
      },
    ],
  },
  {
    title: 'EDUCATION',
    items: [
      {
        name: 'D-IV Informatics Engineering',
        place: 'Politeknik Negeri Malang · Information Technology Dept.',
        period: '2024 – Now',
        points: [],
      },
      {
        name: 'Natural Science (IPA)',
        place: 'SMAS Ar-Rohmah Putri International Islamic Boarding School',
        period: '2021 – 2024',
        points: [],
      },
    ],
  },
  {
    title: 'ACHIEVEMENTS',
    items: [
      {
        name: 'Finalist — Airlangga Maritime Week',
        place: 'Universitas Airlangga',
        period: '2023',
        points: ['Solar stove innovation as an alternative energy solution, with supporting paper.'],
      },
      {
        name: 'Delegate — Youth Innovation Forum',
        place: 'Malaysia, Singapore & Thailand',
        period: '2022',
        points: ['SDGs-themed youth innovation forum and international collaboration.'],
      },
      {
        name: 'AIESEC Future Leaders — Batch 9',
        place: 'Universitas Brawijaya',
        period: '2026',
        points: ['Leadership, self-development and professional CV & essay writing.'],
      },
    ],
  },
];