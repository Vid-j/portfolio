import { profile } from '../content/profile';
import { routes } from '../routes';
import { escapeHtml } from '../ui/helpers';

export function renderHub(): string {
  return `
    <div class="hub">
      <header class="hub__header">
        <p class="hub__eyebrow">Welcome</p>
        <h1 class="hub__title">
          ${escapeHtml(profile.nameLines[0])} ${escapeHtml(profile.nameLines[1])}
        </h1>
        <p class="hub__tagline">${escapeHtml(profile.tagline)}</p>
      </header>

      <section class="hub__subscribe" aria-labelledby="hub-subscribe-heading">
        <h2 class="hub__subscribe-heading" id="hub-subscribe-heading">Stay connected</h2>
        <p class="hub__subscribe-desc">Leave your email to stay connected.</p>
        <form class="hub__form" id="hub-email-form" data-state="idle" novalidate>
          <label class="hub__form-label" for="hub-email">Email address</label>
          <div class="hub__form-row">
            <input
              class="hub__form-input"
              type="email"
              id="hub-email"
              name="email"
              autocomplete="email"
              placeholder="you@example.com"
              required
            />
            <button class="hub__form-submit" type="submit">Connect</button>
          </div>
          <p class="hub__form-status" data-form-status hidden role="status" aria-live="polite"></p>
        </form>
        <a class="hub__skip" href="#hub-destinations">Continue without sharing email</a>
      </section>

      <section class="hub__destinations" id="hub-destinations" aria-labelledby="hub-dest-heading">
        <h2 class="hub__dest-heading" id="hub-dest-heading">Choose a path</h2>
        <div class="hub__cards">
          <a class="hub-card hub-card--gallery" href="${escapeHtml(routes.gallery)}" data-route="gallery">
            <span class="hub-card__label">01 · Gallery</span>
            <h3 class="hub-card__title">Virtual Art Gallery</h3>
            <p class="hub-card__desc">Immersive studio work, digital experiments, and spatial archives.</p>
            <span class="hub-card__preview hub-card__preview--gallery" aria-hidden="true"></span>
          </a>

          <a class="hub-card hub-card--dev" href="${escapeHtml(routes.dev)}" data-route="dev">
            <span class="hub-card__label">02 · Dev</span>
            <h3 class="hub-card__title">Software Portfolio</h3>
            <p class="hub-card__desc">Projects, experience, and systems — terminal-grade documentation.</p>
            <span class="hub-card__preview hub-card__preview--dev" aria-hidden="true">
              <code>$ renderPortfolio()</code>
            </span>
          </a>

          <a class="hub-card hub-card--thoughts" href="${escapeHtml(routes.thoughts)}" data-route="thoughts">
            <span class="hub-card__label">03 · Thoughts</span>
            <h3 class="hub-card__title">Writing & Notes</h3>
            <p class="hub-card__desc">Essays on craft, research, and the overlap of art and code.</p>
            <span class="hub-card__preview hub-card__preview--thoughts" aria-hidden="true">
              <em>On building at the edge…</em>
            </span>
          </a>
        </div>
      </section>

      <footer class="hub__footer">
        <p class="hub__privacy">
          Email used only to stay in touch; you can ask to be removed anytime.
          <a href="mailto:${escapeHtml(profile.email)}">Contact directly</a>
        </p>
        <p class="hub__copy">${escapeHtml(profile.copyright)} · ${escapeHtml(profile.locations)}</p>
      </footer>
    </div>
  `;
}
