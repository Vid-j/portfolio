import { thoughtPosts, thoughtsIntro } from '../content/thoughts';
import { profile } from '../content/profile';
import { routes } from '../routes';
import { escapeHtml } from '../ui/helpers';

export function renderThoughts(): string {
  const posts = thoughtPosts
    .map(
      (post, i) => `
      <article class="thought-post reveal${i > 0 ? ` reveal-d${Math.min(i, 3)}` : ''}">
        <time class="thought-post__date" datetime="${escapeHtml(post.date)}">${escapeHtml(post.date)}</time>
        <h2 class="thought-post__title">
          <a href="#${escapeHtml(post.slug)}">${escapeHtml(post.title)}</a>
        </h2>
        <p class="thought-post__excerpt">${escapeHtml(post.excerpt)}</p>
        <p class="thought-post__meta">${escapeHtml(post.readTime)} · Full posts coming in Phase 2</p>
      </article>
    `,
    )
    .join('');

  return `
    <a class="skip-link" href="#main">Skip to content</a>

    <header class="thoughts-nav" role="banner">
      <a class="back-home" href="${escapeHtml(routes.hub)}">← Home</a>
      <span class="thoughts-nav__mark">THOUGHTS</span>
    </header>

    <main class="thoughts-main" id="main">
      <header class="thoughts-header">
        <h1 class="thoughts-header__title">${escapeHtml(thoughtsIntro.title)}</h1>
        <p class="thoughts-header__subtitle">${escapeHtml(thoughtsIntro.subtitle)}</p>
      </header>

      <section class="thoughts-list" aria-label="Blog posts">
        ${posts}
      </section>

      <footer class="thoughts-footer">
        <p>${escapeHtml(profile.copyright)} · ${escapeHtml(profile.email)}</p>
      </footer>
    </main>
  `;
}
