export interface GalleryPiece {
  id: string;
  title: string;
  medium: string;
  year: string;
}

export const galleryIntro = {
  title: 'Visual Archive',
  subtitle: 'Studio work · digital experiments · spatial studies',
  status: 'Archive loading…',
  caption: 'Full immersive gallery — Phase 2 expands with lightbox and orbit navigation.',
};

export const galleryPieces: GalleryPiece[] = [
  {
    id: 'piece-01',
    title: 'X-Ray Flora Study',
    medium: 'Mixed media · digital composite',
    year: '2025',
  },
  {
    id: 'piece-02',
    title: 'Subject File: Portrait',
    medium: 'Charcoal · GLSL overlay',
    year: '2024',
  },
  {
    id: 'piece-03',
    title: 'Poster Series — Sensory Story',
    medium: 'Print · Affinity',
    year: '2024',
  },
  {
    id: 'piece-04',
    title: 'Organic Form Sketches',
    medium: 'Ink · studio archive',
    year: '2023',
  },
  {
    id: 'piece-05',
    title: 'Shader Experiments I',
    medium: 'GLSL · fragment studies',
    year: '2025',
  },
  {
    id: 'piece-06',
    title: 'Archive Fragment',
    medium: 'Documentation · research',
    year: '2026',
  },
];
