export interface ThoughtPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  readTime: string;
}

export const thoughtsIntro = {
  title: 'Thoughts',
  subtitle: 'Notes on craft, research, and the overlap of art and code',
};

export const thoughtPosts: ThoughtPost[] = [
  {
    slug: 'logic-becomes-beauty',
    title: 'When Logic Becomes Beauty',
    date: 'March 2026',
    excerpt:
      'Building interfaces at the intersection of computer science and studio arts means treating every system as both a proof and a composition.',
    readTime: '4 min read',
  },
  {
    slug: 'sketchbook-as-tool',
    title: 'The Sketchbook as a Technical Tool',
    date: 'January 2026',
    excerpt:
      'Why I document projects like dossier files — and how that habit shapes the way I ship software and archive visual work.',
    readTime: '3 min read',
  },
];
