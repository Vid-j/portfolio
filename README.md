# Portfolio — Artistic Tech Sketchbook

Personal portfolio for [Vidhi Joshi](https://vid-j.github.io/portfolio/), built as a Vite + TypeScript multi-page site with a landing hub, WebGL background effects, GSAP scroll motion, and route transitions between three distinct experiences.

Live site: https://vid-j.github.io/portfolio/

## Stack

- **Vite + TypeScript** — multi-page app (MPA) with four entry points
- **Raw WebGL particle morph** — ambient background on dev and gallery routes
- **GSAP + ScrollTrigger** — scroll-driven reveals on the dev portfolio
- **Lenis** — smooth scroll (disabled when `prefers-reduced-motion` is on)
- **Formspree** — email capture on the landing hub (optional, via env var)

## Routes

| URL (Vercel) | URL (GitHub Pages) | Page |
|--------------|-------------------|------|
| `/` | `/portfolio/` | Landing hub |
| `/dev.html` | `/portfolio/dev.html` | Dev portfolio |
| `/gallery.html` | `/portfolio/gallery.html` | Art gallery |
| `/thoughts.html` | `/portfolio/thoughts.html` | Thoughts blog |

Each route has a distinct visual language and GSAP transition when entering from or returning to the hub.

## Deploy

### Vercel (recommended)

The build auto-detects Vercel (`VERCEL=1`) and uses `/` as the asset base path. Push to your connected repo — `vercel.json` sets `outputDirectory: dist`.

If assets 404 after a previous deploy, trigger a **fresh redeploy** so the build picks up the new base path.

### GitHub Pages

Build uses `/portfolio/` as the base path (project-site hosting). Deploy the contents of `dist/` to GitHub Pages.

To force a base path: `VITE_BASE_PATH=/portfolio/ npm run build`

## Project structure

```
portfolio/
├── index.html              # Landing hub
├── dev.html                # Dev portfolio
├── gallery.html            # Art gallery
├── thoughts.html           # Blog / thoughts
├── vite.config.ts          # MPA build + base: '/portfolio/'
├── src/
│   ├── main.ts             # Hub bootstrap
│   ├── hub/                # Landing page + email form
│   ├── dev/main.ts         # Dev portfolio bootstrap
│   ├── gallery/            # Gallery page
│   ├── thoughts/           # Thoughts page
│   ├── motion/             # Lenis, GSAP reveals, route transitions
│   ├── content/            # Typed copy & data
│   ├── webgl/              # Particle scene + shaders
│   ├── ui/                 # Dev page render
│   └── styles/             # hub, sketchbook, gallery, thoughts CSS
└── dist/                   # production build output
```

## Email capture setup

1. Create a form at [formspree.io](https://formspree.io)
2. Copy `.env.example` to `.env`
3. Set `VITE_FORMSPREE_ID` to your form ID (the segment after `/f/` in the form URL)

Without a Formspree ID, the form shows a friendly configuration error on submit. Subscribed emails are remembered in `localStorage`.

## Editing content

Update typed modules in `src/content/`:

| File | Contents |
|------|----------|
| `profile.ts` | Hero, about, education, nav, social links |
| `projects.ts` | Project dossiers (add demo/repo URLs when ready) |
| `experience.ts` | Work history |
| `skills.ts` | Skill groups + subject metadata |
| `sideQuests.ts` | Side quests |
| `gallery.ts` | Gallery pieces (Phase 1 placeholders) |
| `thoughts.ts` | Blog post stubs |

## Development

```bash
npm install
npm run dev
```

Open the URL Vite prints (typically `http://localhost:5173/portfolio/` because of the GitHub Pages base path).

## Build & deploy

```bash
npm run build
npm run preview   # optional local preview of dist/
```

All four HTML entry points are emitted to `dist/`.

## Legacy files

`styles.legacy.css` is the previous static-site stylesheet, kept for reference only. The active styles live in `src/styles/`.

## License

MIT
