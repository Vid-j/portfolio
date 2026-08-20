/** Highlights the nav link for the section currently in view. */
export function initNavSpy(): void {
  const links = Array.from(
    document.querySelectorAll<HTMLAnchorElement>('.nav__links a[href^="#"]'),
  );
  if (links.length === 0) return;

  const sections = links
    .map((link) => {
      const id = link.getAttribute('href')?.slice(1);
      if (!id) return null;
      const el = document.getElementById(id);
      return el ? { id, el, link } : null;
    })
    .filter((s): s is { id: string; el: HTMLElement; link: HTMLAnchorElement } => s !== null);

  if (sections.length === 0) return;

  const setActive = (id: string | null) => {
    links.forEach((link) => {
      const match = id !== null && link.getAttribute('href') === `#${id}`;
      link.classList.toggle('is-active', match);
      if (match) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      if (visible[0]?.target instanceof HTMLElement) {
        setActive(visible[0].target.id);
      }
    },
    {
      root: null,
      rootMargin: '-20% 0px -55% 0px',
      threshold: [0.1, 0.25, 0.5],
    },
  );

  sections.forEach(({ el }) => observer.observe(el));
}
