export interface ProjectLinks {
  demo: string | null;
  repo: string | null;
}

export interface Project {
  id: string;
  fileTag: string;
  title: string;
  tags: string[];
  summary: string;
  links: ProjectLinks;
}

export const projects: Project[] = [
  {
    id: 'proj-01',
    fileTag: 'haudenosaunee_dashboard.ui',
    title: 'Research Tool Dashboard',
    tags: ['UX', 'Embedded', 'Arduino'],
    summary:
      'Interactive dashboards and visual records for multidisciplinary research workflows — simplifying complex data collection across 3+ Haudenosaunee POD projects.',
    links: { demo: null, repo: null },
  },
  {
    id: 'proj-02',
    fileTag: 'riipen_abx_engine.tsx',
    title: 'ABX Growth Engine',
    tags: ['Strategy', 'AI', 'Content'],
    summary:
      'End-to-end ABX system uniting phygital touchpoints, thought-leadership content, and executive social presence to generate high-intent inbound leads.',
    links: { demo: null, repo: null },
  },
  {
    id: 'proj-03',
    fileTag: 'softsages_chatbot.flow',
    title: 'Conversational UI Flows',
    tags: ['Chatbots', 'Telegram', 'WhatsApp'],
    summary:
      'Engineered conversational UI flows for Telegram and WhatsApp chatbots, boosting user engagement by 40% through intuitive, seamless interactions.',
    links: { demo: null, repo: null },
  },
];
