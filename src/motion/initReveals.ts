import gsap from 'gsap';
import type Lenis from 'lenis';

export function initReveals(lenis: Lenis | null): void {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reducedMotion) {
    document.querySelectorAll('.reveal').forEach((el) => {
      el.classList.add('is-visible');
    });
    return;
  }

  const scroller = lenis ? document.documentElement : undefined;

  gsap.utils.toArray<HTMLElement>('.reveal').forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: 28, x: el.classList.contains('side-quest-card') ? 12 : 0 },
      {
        opacity: 1,
        y: 0,
        x: 0,
        duration: 0.85,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          scroller,
          start: 'top 88%',
          toggleActions: 'play none none none',
          onEnter: () => el.classList.add('is-visible'),
        },
      },
    );
  });

  gsap.utils.toArray<HTMLElement>('.hud-corner').forEach((el, i) => {
    gsap.fromTo(
      el,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1.2,
        delay: 0.2 + i * 0.1,
        ease: 'power2.out',
      },
    );
  });

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      if (lenis) {
        lenis.scrollTo(target as HTMLElement, { offset: -80 });
      } else {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}
