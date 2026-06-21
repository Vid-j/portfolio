export interface SideQuest {
  id: string;
  title: string;
  tag: string;
  summary: string;
  status: 'active' | 'archived' | 'wip';
}

export const sideQuests: SideQuest[] = [
  {
    id: 'sq-01',
    title: 'GLSL Experiments',
    tag: '.shader',
    summary: 'Fragment shader sketches exploring x-ray and glitch aesthetics on organic forms.',
    status: 'wip',
  },
  {
    id: 'sq-02',
    title: 'Purple Yogis Finance',
    tag: '.org',
    summary: 'VP Finance — building sustainable ops for a student wellness community.',
    status: 'active',
  },
  {
    id: 'sq-03',
    title: 'Studio Arts Archive',
    tag: '.sketch',
    summary: 'Mixed-media work bridging art history research and digital documentation.',
    status: 'archived',
  },
];

export const artPlaceholder = {
  title: 'Visual Archive',
  status: 'Archive loading…',
  caption: 'Studio work and digital experiments — full gallery coming in Phase 2.',
};
