export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  period: string;
  location: string;
  activities: string[];
}

export const profile = {
  name: 'Vidhi Joshi',
  nameLines: ['Vidhi', 'Joshi'],
  tagline: 'Designer · Developer · Researcher · Artist',
  heroDesc:
    'Computer Science meets Visual Arts. I build interfaces where logic becomes beauty, from conversational AI systems to embedded research tools.',
  locations: 'Toronto · San Francisco · London, Ontario',
  aboutHeading: 'Where code meets craft',
  aboutParagraphs: [
    "I'm a builder bridging the technical and creative gap with logical systems and intentional design. My background as a Computer Science and Visual Arts double major has shaped an entrepreneurial mindset: I don't just write code; I design solutions that are scalable, efficient, and structurally sound.",
    "My work spans conversational UI, embedded hardware systems, UX research, and strategic AI implementation. I'm drawn to the space where human intuition and machine intelligence overlap.",
  ],
  aboutPills: [
    'CSS / HTML / JS',
    'Python',
    'C++',
    'GLSL',
    'Figma',
    'Affinity',
    'Arduino',
    'Raspberry Pi',
    'SQL',
    'UX Research',
    'UI Design',
    'Visual Arts',
  ],
  email: 'vjoshi43@uwo.ca',
  copyright: '© 2026 Vidhi Joshi',
};

export const navLinks: NavLink[] = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Work', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Side Quests', href: '#side-quests' },
  { label: 'Contact', href: '#contact' },
];

export const socialLinks: SocialLink[] = [
  { label: 'Email', href: 'mailto:vjoshi43@uwo.ca' },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/vidhi-joshi-b2b08729a/',
  },
  { label: 'GitHub', href: 'https://github.com/Vid-j' },
];

export const education: Education = {
  id: 'edu-01',
  school: 'Western University',
  degree: 'BSc. Honours — Computer Science & Art History + Studio Arts',
  period: 'Sept 2022 – Oct 2026',
  location: 'London, Ontario',
  activities: [
    'VP Finance, Purple Yogis (2025–26)',
    'Junior Newsletter Executive, Purple Yogis (2024–25)',
    'Communications Executive, Hindu Students Council - UWO (2025–26)',
    'HEAT member, Hindu Students Council (2025–26)',
  ],
};

export const heroCodeFragments = [
  'renderSketch()',
  'node.connect()',
  'glsl.compile',
  'subject.xray',
  'archive.load',
];
