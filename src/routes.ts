export type RouteId = 'hub' | 'gallery' | 'dev' | 'thoughts';

const base = import.meta.env.BASE_URL;

export const routes = {
  hub: base.endsWith('/') ? base : `${base}/`,
  dev: `${base}dev.html`,
  gallery: `${base}gallery.html`,
  thoughts: `${base}thoughts.html`,
} as const;

