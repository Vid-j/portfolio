export type RouteId = 'hub' | 'gallery' | 'dev' | 'thoughts';

const base = import.meta.env.BASE_URL;

export const routes = {
  hub: base.endsWith('/') ? base : `${base}/`,
  dev: `${base}dev.html`,
  gallery: `${base}gallery.html`,
  thoughts: `${base}thoughts.html`,
} as const;

export const ROUTE_ENTER_KEY = 'route-enter';

export function setRouteEnter(route: RouteId): void {
  sessionStorage.setItem(ROUTE_ENTER_KEY, route);
}

export function consumeRouteEnter(): RouteId | null {
  const value = sessionStorage.getItem(ROUTE_ENTER_KEY);
  if (!value) return null;
  sessionStorage.removeItem(ROUTE_ENTER_KEY);
  if (value === 'hub' || value === 'gallery' || value === 'dev' || value === 'thoughts') {
    return value;
  }
  return null;
}
