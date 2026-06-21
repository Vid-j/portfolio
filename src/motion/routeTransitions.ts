import gsap from 'gsap';
import { consumeRouteEnter, routes, setRouteEnter, type RouteId } from '../routes';

const OVERLAY_ID = 'route-transition-overlay';

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function ensureOverlay(): HTMLElement {
  let overlay = document.getElementById(OVERLAY_ID);
  if (overlay) return overlay;

  overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;
  overlay.className = 'route-overlay';
  overlay.setAttribute('aria-hidden', 'true');
  document.body.appendChild(overlay);
  return overlay;
}

function navigateTo(url: string): void {
  window.location.href = url;
}

export function playHubExitTransition(route: Exclude<RouteId, 'hub'>, onComplete?: () => void): void {
  if (prefersReducedMotion()) {
    onComplete?.();
    return;
  }

  const overlay = ensureOverlay();
  overlay.className = `route-overlay route-overlay--${route}`;
  gsap.killTweensOf(overlay);
  gsap.set(overlay, { clearProps: 'all' });

  const tl = gsap.timeline({ onComplete: () => onComplete?.() });

  switch (route) {
    case 'gallery':
      tl.fromTo(
        overlay,
        { clipPath: 'circle(0% at 50% 50%)', opacity: 1, backgroundColor: '#0a0a0c' },
        { clipPath: 'circle(150% at 50% 50%)', duration: 0.9, ease: 'power2.inOut' },
      );
      if (document.querySelector('.hub')) {
        tl.to('.hub', { scale: 0.92, opacity: 0, duration: 0.7, ease: 'power2.in' }, 0);
      }
      break;
    case 'dev':
      tl.fromTo(
        overlay,
        { scaleX: 0, transformOrigin: 'left center', backgroundColor: '#050508' },
        { scaleX: 1, duration: 0.45, ease: 'power4.in' },
      );
      break;
    case 'thoughts':
      tl.fromTo(
        overlay,
        { x: '100%', backgroundColor: '#f5f0e6' },
        { x: '0%', duration: 0.65, ease: 'power3.inOut' },
      );
      break;
  }
}

export function playSubpageExitTransition(route: Exclude<RouteId, 'hub'>, onComplete?: () => void): void {
  if (prefersReducedMotion()) {
    onComplete?.();
    return;
  }

  const overlay = ensureOverlay();
  overlay.className = `route-overlay route-overlay--${route}`;
  gsap.killTweensOf(overlay);

  const tl = gsap.timeline({ onComplete: () => onComplete?.() });

  switch (route) {
    case 'gallery':
      gsap.set(overlay, {
        clipPath: 'circle(150% at 50% 50%)',
        opacity: 1,
        backgroundColor: '#0a0a0c',
      });
      tl.to(overlay, { clipPath: 'circle(0% at 50% 50%)', duration: 0.75, ease: 'power2.in' });
      break;
    case 'dev':
      gsap.set(overlay, {
        scaleX: 1,
        transformOrigin: 'left center',
        backgroundColor: '#050508',
      });
      tl.to(overlay, { scaleX: 0, duration: 0.4, ease: 'power4.in' });
      break;
    case 'thoughts':
      gsap.set(overlay, { x: '0%', backgroundColor: '#f5f0e6' });
      tl.to(overlay, { x: '100%', duration: 0.6, ease: 'power3.in' });
      break;
  }
}

export function playEnterTransition(route: RouteId, onComplete?: () => void): void {
  if (prefersReducedMotion()) {
    onComplete?.();
    return;
  }

  const overlay = ensureOverlay();
  overlay.className = `route-overlay route-overlay--${route}`;
  gsap.killTweensOf(overlay);

  const tl = gsap.timeline({
    onComplete: () => {
      gsap.set(overlay, { clearProps: 'all' });
      overlay.className = 'route-overlay';
      onComplete?.();
    },
  });

  switch (route) {
    case 'gallery':
      gsap.set(overlay, {
        clipPath: 'circle(150% at 50% 50%)',
        opacity: 1,
        backgroundColor: '#0a0a0c',
      });
      tl.to(overlay, { clipPath: 'circle(0% at 50% 50%)', duration: 0.85, ease: 'power2.out' });
      tl.to(overlay, { opacity: 0, duration: 0.3 }, '-=0.2');
      break;
    case 'dev':
      gsap.set(overlay, {
        scaleX: 1,
        transformOrigin: 'right center',
        backgroundColor: '#050508',
      });
      tl.to(overlay, { scaleX: 0, duration: 0.5, ease: 'power4.out' });
      break;
    case 'thoughts':
      gsap.set(overlay, { x: '0%', backgroundColor: '#f5f0e6' });
      tl.to(overlay, { x: '-100%', duration: 0.7, ease: 'power3.out' });
      break;
    case 'hub':
      gsap.set(overlay, { opacity: 1, backgroundColor: '#0e0e10' });
      tl.to(overlay, { opacity: 0, duration: 0.5, ease: 'power2.out' });
      break;
  }
}

export function navigateWithTransition(route: Exclude<RouteId, 'hub'>, url: string): void {
  setRouteEnter(route);
  if (prefersReducedMotion()) {
    navigateTo(url);
    return;
  }
  playHubExitTransition(route, () => navigateTo(url));
}

export function navigateHome(from: Exclude<RouteId, 'hub'>): void {
  setRouteEnter('hub');
  if (prefersReducedMotion()) {
    navigateTo(routes.hub);
    return;
  }
  playSubpageExitTransition(from, () => navigateTo(routes.hub));
}

export function initEnterTransition(currentPage: RouteId): void {
  const entering = consumeRouteEnter();
  if (!entering || entering !== currentPage) return;
  playEnterTransition(entering);
}

export function initBackToHome(from: Exclude<RouteId, 'hub'>, buttonSelector = '.back-home'): void {
  document.querySelectorAll<HTMLAnchorElement>(buttonSelector).forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      navigateHome(from);
    });
  });
}

export function initHubDestinations(): void {
  document.querySelectorAll<HTMLAnchorElement>('[data-route]').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const route = link.dataset.route as Exclude<RouteId, 'hub'> | undefined;
      const href = link.getAttribute('href');
      if (!route || !href) return;
      navigateWithTransition(route, href);
    });
  });
}
