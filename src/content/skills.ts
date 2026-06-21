export interface SkillGroup {
  id: string;
  category: string;
  items: string[];
}

export const skills: SkillGroup[] = [
  {
    id: 'skill-coding',
    category: 'Coding',
    items: ['CSS / HTML / JS', 'Python', 'C++', 'SQL', 'GLSL'],
  },
  {
    id: 'skill-design',
    category: 'Design & Visual',
    items: ['Figma', 'Affinity Suite', 'Visual Thinking', 'Studio Arts', 'UI / UX Design'],
  },
  {
    id: 'skill-technical',
    category: 'Technical',
    items: ['Arduino & Raspberry Pi', 'UML', 'OOD & Analysis', 'User Research', 'Excel'],
  },
  {
    id: 'skill-soft',
    category: 'Soft Skills',
    items: ['Communications', 'Adaptability', 'Problem Solving', 'Teamwork', 'Fast Learner'],
  },
];

export const subjectMeta = {
  id: 'SUBJECT V-J',
  function: 'DESIGNER · DEVELOPER',
  status: 'ACTIVE',
  mentalState: 'CURIOUS',
};
