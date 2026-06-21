import { galleryIntro, galleryPieces } from '../content/gallery';
import { profile } from '../content/profile';
import { routes } from '../routes';
import { escapeHtml } from '../ui/helpers';

export function renderGallery(): string {
  const pieces = galleryPieces
    .map(
      (piece, i) => `
      <article class="gallery-piece reveal${i > 0 ? ` reveal-d${Math.min(i, 3)}` : ''}" id="${escapeHtml(piece.id)}">
        <div class="gallery-piece__frame" aria-hidden="true">
          <div class="gallery-piece__placeholder"></div>
        </div>
        <div class="gallery-piece__meta">
          <h3 class="gallery-piece__title">${escapeHtml(piece.title)}</h3>
          <p class="gallery-piece__medium">${escapeHtml(piece.medium)}</p>
          <p class="gallery-piece__year">${escapeHtml(piece.year)}</p>
        </div>
      </article>
    `,
    )
    .join('');

  return `
    <a class="skip-link" href="#main">Skip to content</a>

    <header class="gallery-nav" role="banner">
      <a class="back-home" href="${escapeHtml(routes.hub)}">← Home</a>
      <span class="gallery-nav__mark">GALLERY</span>
    </header>

    <main class="gallery-main" id="main">
      <section class="gallery-hero" aria-labelledby="gallery-heading">
        <p class="gallery-hero__status">${escapeHtml(galleryIntro.status)}</p>
        <h1 class="gallery-hero__title" id="gallery-heading">${escapeHtml(galleryIntro.title)}</h1>
        <p class="gallery-hero__subtitle">${escapeHtml(galleryIntro.subtitle)}</p>
        <p class="gallery-hero__caption">${escapeHtml(galleryIntro.caption)}</p>
      </section>

      <section class="gallery-grid" aria-label="Artworks">
        ${pieces}
      </section>

      <footer class="gallery-footer">
        <p>${escapeHtml(profile.copyright)}</p>
      </footer>
    </main>
  `;
}
