// ✏️ Semua konten ada di sini — isi diambil dari CV. Ganti sesuai kebutuhan.

export const profile = {
  name: 'Alsa', // tulisan tangan di hero
  fullName: "Na'ilah Salsabila Maulidiyah",
  // Judul besar di hero. Satu item = satu baris. Ukuran font otomatis menyesuaikan lebar layar.
  titleLines: ["NA'ILAH SALSABILA MAULIDIYAH"],
  // Besar-kecil judul: 1 = selebar penuh, 0.85 = 85% lebar, dst.
  titleScale: 1,
  role: 'WEB & MOBILE DEVELOPER',
  tagline: ['I DESIGN & BUILD DIGITAL', 'EXPERIENCES THAT', 'INSPIRE & CONNECT'],
  about:
    "D-IV Informatics Engineering student at Politeknik Negeri Malang, building web & mobile apps — from wireframes and frontend to backend integration and machine learning.",
  location: 'BASED IN MALANG',
  work: 'POLITEKNIK NEGERI MALANG',

  // TODO: CV tidak mencantumkan email / Instagram — isi dengan milikmu.
  email: 'nailahslsb@gmail.com',
  instagram: '@nailaahs',
  instagramUrl: 'https://www.instagram.com/nailaahs?srtk=YTgxYnY3c2Ixejd4',
  github: 'nailahsalsabila27', // TODO: ganti dengan USERNAME GitHub-mu (hanya username, tanpa https://github.com/)
  linkedin: 'linkedin.com/in/na-ilah-salsabila-maulidiyah', // teks yang tampil di bagian kontak
  linkedinUrl: 'www.linkedin.com/in/na-ilah-salsabila-maulidiyah-847627378', // TODO: ganti dengan link LinkedIn-mu
  place: 'Malang, Indonesia',

  // 📸 FOTO — taruh file di folder  public/images/  lalu tulis nama filenya di sini.
  // Boleh ditulis '/images/foto.png', 'images/foto.png', atau cukup 'foto.png'.
  // Kosongkan ('') untuk memakai ilustrasi kartun bawaan.
  // 📄 CV untuk tombol "Download CV". File ada di folder  public/  (ganti file-nya untuk update CV).
  cv: 'CV.pdf',

  photo: 'alsa-porto.png',
  photoContact: 'alsa-gemini.jpeg',
};

// ⚠️ "languages" & "tools" tiap proyek adalah PERKIRAAN dari CV & ceritamu — cek dan koreksi
// sesuai yang benar-benar kamu pakai. "contributions" diambil langsung dari CV.
//
// 🖼️ images = screenshot / foto website proyek (boleh banyak). Taruh file di  public/images/
//    lalu tulis namanya. File yang belum ada otomatis disembunyikan, jadi aman diisi dulu.
//    Gambar pertama tampil besar. Subfolder boleh, mis. 'proyek/propertyiq-1.png'.
export const projects = [
  {
    no: '01',
    title: 'PROPERTYIQ',
    fullTitle: 'PropertyIQ — Property Price Prediction Mobile App',
    type: 'Mobile App · PBL Semester 5 · 2026',
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
    images: ['propertyiq-1.png', 'propertyiq-2.png', 'propertyiq-3.png'],
    url: '#', // link GitHub / demo — kalau '#', tombol "View project" disembunyikan
  },
  {
    no: '02',
    title: 'TESYUK',
    fullTitle: 'TesYuk — Website Platform for Testers & Developers',
    type: 'Website · PBL Semester 4 · 2026',
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
    images: ['TesYuk.png', 'tesyuk-2.png', 'tesyuk-3.png'],
    url: '#',
  },
  {
    no: '03',
    title: 'MULTIMEDIA & MOBILE LAB',
    fullTitle: 'Website of the Multimedia and Mobile Technology Laboratory',
    type: 'Website · PBL Semester 3 · 2025',
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
    images: ['MMT.png', 'lab-multimedia-2.png', 'lab-multimedia-3.png'],
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

// 🎓 IPK (GPA). CV tidak mencantumkan IPK, jadi isi sendiri:
//   value    -> angka IPK, contoh 3.75  (null = tampil "–.––")
//   scale    -> skala nilai (4 untuk skala 4.00)
//   asOf     -> keterangan, contoh 'After Semester 4'
//   semesters-> (opsional) IPS per semester untuk grafik batang, contoh:
//               [{ label: 'S1', value: 3.8 }, { label: 'S2', value: 3.7 }]
export const gpa = {
  value: 3.67,
  scale: 4,
  asOf: '',
  semesters: [],
};

// Pengalaman organisasi & pendidikan (dari CV + ceritamu)
//
// Item yang punya "description" otomatis bisa diklik dan membuka pop-up detail.
// photos = daftar foto (taruh file di public/images/). File yang belum ada otomatis disembunyikan.
// lists  = daftar bagian di pop-up: { label, items[] }. Teks "Peran — Kegiatan" otomatis menebalkan "Peran".
// url    = link website (khusus EDUCATION); kosongkan '' kalau belum ada.
export const journey = [
  {
    title: 'ORGANIZATION',
    items: [
      {
        name: 'Human Resource Coordinator',
        place: 'Polinema Mengajar',
        period: '2025 – 2026',
        location: 'Politeknik Negeri Malang',
        description:
          'Human Resource Coordinator at Polinema Mengajar, Politeknik Negeri Malang — managing the internal side of the organization while taking part in committees of its main programs and teaching directly in the field.',
        lists: [
          {
            label: 'AS HR COORDINATOR',
            items: [
              'Managed internal organization data, member administration and member development tracking.',
              'Coordinated human resource activities to support member development and engagement.',
              'Evaluated member performance and managed the documentation of evaluation results.',
              'Collaborated with other divisions to keep communication and work programs running smoothly.',
            ],
          },
          {
            label: 'COMMITTEE ROLES',
            items: [
              'Event Division & Field Coordinator — Staff Open Recruitment 2025/2026.',
              'Event Division & Technical Committee (Master of Ceremony) — Staff Welcoming Party 2025/2026.',
              'Event Division & Field Coordinator — Staff On Boarding 2025/2026.',
              'Event Division — Poljar Action, a Ramadan program held at Panti Asuhan Akhlaqul Karimah.',
              'Public Relations Division — National workshop “Trash to Cash: Creative Business Opportunities from Plastic Waste”, inviting speaker Ibu Ernik Yustiana, S.T.',
              'Head of Committee — Open Recruitment of Polinema Mengajar Board 2026/2027: led the planning and execution, and coordinated the committee through every stage.',
            ],
          },
          {
            label: 'FIELD TEACHING',
            items: [
              'Teaching directly in the field — taught marginalized communities and orphanages at Rumah Belajar JKJT and Panti Asuhan Yasibu.',
            ],
          },
        ],
        // 5 foto kegiatan (ganti nama file sesuai punyamu)
        photos: ['Poljar.jpg', 'Poljar1.jpeg', 'Poljar2.jpeg', 'hr-4.jpg', 'hr-5.jpg'],
      },
      {
        name: 'Future Leaders — Batch 9',
        place: 'AIESEC · Universitas Brawijaya',
        period: '2026',
        location: 'Universitas Brawijaya',
        description:
          'Participant of AIESEC Future Leaders Batch 9 at Universitas Brawijaya (2026), a program on leadership, self-development and professional writing.',
        lists: [
          {
            label: 'HIGHLIGHTS',
            items: ['Leadership and self-development training.', 'Professional CV and essay writing.'],
          },
        ],
        photos: ['AIESEC.jpeg', 'aiesec-2.jpg', 'aiesec-3.jpg'],
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
        url: 'https://www.polinema.ac.id/',
      },
      {
        name: 'Natural Science (IPA)',
        place: 'SMAS Ar-Rohmah Putri International Islamic Boarding School',
        period: '2021 – 2024',
        url: 'https://www.arrohmah.co.id/', // TODO: isi link website resmi sekolahmu
      },
    ],
  },
];