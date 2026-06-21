import { education, heroCodeFragments, navLinks, profile, socialLinks } from '../content/profile';
import { projects } from '../content/projects';
import type { Project } from '../content/projects';
import { experience } from '../content/experience';
import { skills, subjectMeta } from '../content/skills';
import { sideQuests } from '../content/sideQuests';
import { routes } from '../routes';
import { escapeHtml, hudCoords, hudTag, sectionLabel } from './helpers';

function renderProjectLinks(project: Project): string {
  const demo = project.links.demo
    ? `<a class="is-available" href="${escapeHtml(project.links.demo)}" target="_blank" rel="noopener noreferrer">Demo</a>`
    : `<a>Demo — soon</a>`;
  const repo = project.links.repo
    ? `<a class="is-available" href="${escapeHtml(project.links.repo)}" target="_blank" rel="noopener noreferrer">Repo</a>`
    : `<a>Repo — soon</a>`;
  return `<div class="dossier-card__links">${demo}${repo}</div>`;
}

function renderProjectCard(project: Project, index: number): string {
  const delay = index > 0 ? ` reveal-d${Math.min(index, 3)}` : '';
  const tags = project.tags.map((t) => hudTag(t)).join('');

  return `
    <article class="dossier-card glitch-hover reveal${delay}" id="${escapeHtml(project.id)}">
      <div class="dossier-card__frame" aria-hidden="true"></div>
      <header class="dossier-card__header">
        ${hudTag(project.fileTag)}
        ${hudCoords(project.coords)}
      </header>
      <h3 class="dossier-card__title">${escapeHtml(project.title)}</h3>
      <div class="dossier-card__tags">${tags}</div>
      <p class="dossier-card__summary">${escapeHtml(project.summary)}</p>
      ${renderProjectLinks(project)}
    </article>
  `;
}

export function renderDevPage(): string {
  const codeLines = heroCodeFragments.map((l) => escapeHtml(l)).join('<br>');
  const nav = navLinks
    .map(
      (l) =>
        `<li><a href="${escapeHtml(l.href)}">${escapeHtml(l.label)}</a></li>`,
    )
    .join('');

  const social = socialLinks
    .map((l) => {
      const external =
        l.href.startsWith('http')
          ? ' target="_blank" rel="noopener noreferrer"'
          : '';
      return `<a href="${escapeHtml(l.href)}"${external}>${escapeHtml(l.label)}</a>`;
    })
    .join('');

  const aboutPills = profile.aboutPills
    .map((p) => `<span class="pill">${escapeHtml(p)}</span>`)
    .join('');

  const eduActivities = education.activities
    .map((a) => escapeHtml(a))
    .join('<br>');

  const projectCards = projects.map(renderProjectCard).join('');

  const expEntries = experience
    .map(
      (exp, i) => {
        const delay = i > 0 ? ` reveal-d${Math.min(i, 3)}` : '';
        const bullets = exp.bullets
          .map((b) => `<li>${escapeHtml(b)}</li>`)
          .join('');
        return `
        <article class="exp-entry reveal${delay}">
          <div class="exp-entry__meta">
            <div class="exp-entry__marker">${escapeHtml(exp.marker)} · ${escapeHtml(exp.coords)}</div>
            <h3 class="exp-entry__title">${escapeHtml(exp.title)}</h3>
            <p class="exp-entry__company">${escapeHtml(exp.company)}</p>
            <p class="exp-entry__date">${escapeHtml(exp.date)}</p>
            <p class="exp-entry__location">${escapeHtml(exp.location)}</p>
          </div>
          <ul class="exp-entry__bullets">${bullets}</ul>
        </article>
      `;
      },
    )
    .join('');

  const skillGroups = skills
    .map(
      (g, i) => {
        const delay = i > 0 ? ` reveal-d${Math.min(i, 3)}` : '';
        const items = g.items.map((item) => `<li>${escapeHtml(item)}</li>`).join('');
        return `
        <div class="skill-group reveal${delay}">
          <h3>${escapeHtml(g.category)}</h3>
          <ul>${items}</ul>
        </div>
      `;
      },
    )
    .join('');

  const sideQuestCards = sideQuests
    .map(
      (sq, i) => {
        const delay = i > 0 ? ` reveal-d${Math.min(i, 3)}` : '';
        return `
        <article class="side-quest-card reveal${delay}">
          <div class="side-quest-card__tag">${escapeHtml(sq.tag)}</div>
          <h3 class="side-quest-card__title">${escapeHtml(sq.title)}</h3>
          <p class="side-quest-card__summary">${escapeHtml(sq.summary)}</p>
          <div class="side-quest-card__status">${escapeHtml(sq.status)}</div>
        </article>
      `;
      },
    )
    .join('');

  const contactLinks = socialLinks
    .map((l) => {
      const external =
        l.href.startsWith('http')
          ? ' target="_blank" rel="noopener noreferrer"'
          : '';
      const display = l.label === 'Email' ? profile.email : l.label;
      return `<a class="contact__link" href="${escapeHtml(l.href)}"${external}>${escapeHtml(display)}<span></span></a>`;
    })
    .join('');

  return `
    <a class="skip-link" href="#main">Skip to content</a>

    <header class="nav" role="banner">
      <a class="back-home" href="${escapeHtml(routes.hub)}">← Home</a>
      <a class="nav__logo" href="#hero">V·J</a>
      <button class="nav__toggle" type="button" aria-expanded="false" aria-controls="nav-menu">Menu</button>
      <ul class="nav__links" id="nav-menu">
        ${nav}
      </ul>
    </header>

    <main id="main">
      <section class="hero" id="hero" aria-label="Introduction">
        <span class="hud-corner hud-corner--tl">SENS.STORY</span>
        <span class="hud-corner hud-corner--tr">DESIGN</span>
        <span class="hud-corner hud-corner--bl">POSTER</span>
        <span class="hud-corner hud-corner--br">V·JOSHI</span>

        <div class="hero__panel reveal">
          <p class="hero__tag">${escapeHtml(profile.tagline)}</p>
          <h1 class="hero__name">
            ${escapeHtml(profile.nameLines[0])}<br><em>${escapeHtml(profile.nameLines[1])}</em>
          </h1>
          <p class="hero__desc">${escapeHtml(profile.heroDesc)}</p>
          <div class="hero__links">${social}</div>
        </div>

        <div class="hero__meta">
          <div class="hero__code" aria-hidden="true">${codeLines}</div>
          <p class="hero__locations">${escapeHtml(profile.locations)}</p>
        </div>

        <div class="hero__scroll" aria-hidden="true">
          <p>Scroll</p>
          <span></span>
        </div>
      </section>

      <section class="section about" id="about" aria-labelledby="about-heading">
        <div class="about__intro reveal">
          ${sectionLabel('About')}
          <h2 class="section-heading" id="about-heading">Where code<br>meets <em>craft</em></h2>
        </div>
        <div class="about__text reveal reveal-d1">
          ${profile.aboutParagraphs.map((p) => `<p>${escapeHtml(p)}</p>`).join('')}
          <div class="about__pills">${aboutPills}</div>
          <div class="edu-block reveal reveal-d2">
            <div class="edu-block__marker">EDU-01</div>
            <div class="edu-block__school">${escapeHtml(education.school)}</div>
            <div class="edu-block__degree">${escapeHtml(education.degree)}</div>
            <div class="edu-block__activities">${eduActivities}</div>
            <div class="edu-block__meta">${escapeHtml(education.period)} · ${escapeHtml(education.location)}</div>
          </div>
        </div>
      </section>

      <section class="section" id="projects" aria-labelledby="projects-heading">
        ${sectionLabel('Projects')}
        <h2 class="section-heading reveal" id="projects-heading">Documented <em>builds</em></h2>
        <div class="projects-grid" style="margin-top: 2.5rem">
          ${projectCards}
        </div>
      </section>

      <section class="section" id="experience" aria-labelledby="experience-heading">
        ${sectionLabel('Experience')}
        <h2 class="section-heading reveal" id="experience-heading">Work <em>log</em></h2>
        <div class="exp-list" style="margin-top: 2rem">${expEntries}</div>
      </section>

      <section class="section" id="skills" aria-labelledby="skills-heading">
        ${sectionLabel('Skills & Toolkit')}
        <h2 class="section-heading reveal" id="skills-heading">Subject <em>file</em></h2>
        <div class="skills-panel reveal reveal-d1" style="margin-top: 2.5rem">
          <dl class="skills-panel__meta">
            <div><dt>ID</dt><dd>${escapeHtml(subjectMeta.id)}</dd></div>
            <div><dt>Function</dt><dd>${escapeHtml(subjectMeta.function)}</dd></div>
            <div><dt>Status</dt><dd>${escapeHtml(subjectMeta.status)}</dd></div>
            <div><dt>State</dt><dd>${escapeHtml(subjectMeta.mentalState)}</dd></div>
          </dl>
          <div class="skills-grid">${skillGroups}</div>
        </div>
      </section>

      <section class="section" id="gallery-link" aria-labelledby="gallery-link-heading">
        ${sectionLabel('Art')}
        <h2 class="section-heading reveal" id="gallery-link-heading">Visual <em>archive</em></h2>
        <div class="gallery-teaser reveal reveal-d1" style="margin-top: 2rem">
          <p class="gallery-teaser__text">Studio work and digital experiments live in the immersive gallery.</p>
          <a class="gallery-teaser__link" href="${escapeHtml(routes.gallery)}">View full gallery →</a>
        </div>
      </section>

      <section class="section" id="side-quests" aria-labelledby="side-quests-heading">
        ${sectionLabel('Side Quests')}
        <h2 class="section-heading reveal" id="side-quests-heading">Off-path <em>experiments</em></h2>
        <div class="side-quests" style="margin-top: 2rem">${sideQuestCards}</div>
      </section>

      <footer class="section contact" id="contact" aria-labelledby="contact-heading">
        <div class="reveal">
          ${sectionLabel('Get in touch')}
          <h2 class="section-heading" id="contact-heading">Let's make<br>something <em>real</em></h2>
        </div>
        <div class="contact__links reveal reveal-d1">${contactLinks}</div>
        <div class="contact__copy">
          <span>${escapeHtml(profile.copyright)}</span>
          <span>${escapeHtml(profile.locations)}</span>
        </div>
      </footer>
    </main>
  `;
}

export function initMobileNav(): void {
  const toggle = document.querySelector<HTMLButtonElement>('.nav__toggle');
  const menu = document.querySelector<HTMLUListElement>('.nav__links');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const open = menu.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
  });

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menu.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}
