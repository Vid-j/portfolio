export interface ExperienceEntry {
  id: string;
  marker: string;
  title: string;
  company: string;
  date: string;
  location: string;
  coords: string;
  bullets: string[];
}

export const experience: ExperienceEntry[] = [
  {
    id: 'exp-03',
    marker: 'EXP-03',
    title: 'Strategic Project Lead',
    company: 'Riipen',
    date: 'March 2026 – April 2026',
    location: 'Remote',
    coords: '-16.18 · 94.02',
    bullets: [
      'Led end-to-end growth strategy for an AI implementation consultancy, delivering business transformations for CXO-level clients and expanding pipeline by 30%.',
      'Developed a Human-Centered Thought Leadership model emphasising ethical AI, human-in-the-loop, and bias mitigation.',
      'Engineered an ABX engine uniting phygital touchpoints, a proprietary Myth-Busting blog, and executive social presence to generate high-intent inbound leads.',
      'Orchestrated a 4-person research, ops & communications team to deliver a unified implementation roadmap, cutting planning time by 25%.',
    ],
  },
  {
    id: 'exp-02',
    marker: 'EXP-02',
    title: 'Research Assistant',
    company: 'Haudenosaunee POD',
    date: 'March 2025 – Present',
    location: 'Western University, London, Ontario',
    coords: '412.33 · 51.07',
    bullets: [
      'Designed and documented interactive research tools with intuitive UI elements, supporting 3+ projects and enhancing data collection accuracy.',
      'Developed embedded system dashboards and visual records that simplified complex data analysis, increasing researcher efficiency by 30%.',
      'Collaborated with multidisciplinary teams to adapt UX workflows, aligning technical development with researcher requirements.',
      'Engineered research systems using Arduino and Raspberry Pi, enabling enhanced data collection and streamlined workflows.',
    ],
  },
  {
    id: 'exp-01',
    marker: 'EXP-01',
    title: 'Tech Intern',
    company: 'Softsages Technologies',
    date: 'May 2023 – August 2023',
    location: 'India',
    coords: '88.12 · -4.56',
    bullets: [
      'Engineered conversational UI flows for Telegram and WhatsApp chatbots, boosting user engagement by 40% through intuitive, seamless interactions.',
      'Developed and tested user-facing modules using iterative prototyping and usability feedback, decreasing response errors by 25%.',
      'Led cross-functional collaboration to deploy client-facing web apps, increasing customer satisfaction by 30%.',
    ],
  },
];
