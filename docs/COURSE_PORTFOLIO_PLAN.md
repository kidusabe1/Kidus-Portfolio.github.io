# Implementation Plan: Signal and Data Analysis for Neuroscience

## Overview

Add a course-study page to the existing React portfolio, publish it as a clean
GitHub Pages subpath, and make it discoverable from the homepage project grid.
The page will reuse the existing theme and component language while giving the
course material a distinct scientific-data presentation.

## Architecture Decisions

- Use Vite's multi-page build support so the course has the clean path
  `/course/signal-data-analysis/` and works on direct GitHub Pages loads.
- Reuse the existing `ThemeProvider`, Tailwind theme, Framer Motion, and Lucide
  icons; add no dependencies.
- Keep four curated, factual studies in a dedicated data module derived from
  the notebooks.
- Use CSS/HTML data motifs and the portfolio's existing imagery rather than
  generic stock illustrations.

## Task List

### Phase 1: Page foundation

- [ ] Add the secondary HTML and React entry points.
  - Acceptance: Vite discovers both page entries.
  - Verify: `npm run build` emits both `index.html` files.
  - Files: `vite.config.js`, `course/signal-data-analysis/index.html`,
    `src/course-main.jsx`

- [ ] Add the repository-grounded course content model.
  - Acceptance: four selected project stories are present.
  - Verify: compare copy with source notebooks.
  - Files: `src/data/coursePortfolio.js`

### Checkpoint: Foundation

- [ ] Both entries compile without changing the homepage.

### Phase 2: Course experience

- [ ] Build the responsive course page.
  - Acceptance: hero, learning path, project stories, methods, and course
    reflection render in both themes.
  - Verify: keyboard and responsive browser checks.
  - Files: `src/components/course/CoursePage.jsx`, `src/index.css`

- [ ] Add the course to the homepage project grid.
  - Acceptance: the card opens the internal course page in the same tab.
  - Verify: homepage link resolves in the production preview.
  - Files: `src/data/portfolio.js`, `src/components/Projects.jsx`

### Checkpoint: Complete

- [ ] `npm run lint` passes.
- [ ] `npm run build` passes.
- [ ] Main and course pages have clean browser consoles.
- [ ] Course page works at 320, 768, 1024, and 1440 pixels.
- [ ] The final diff contains no unrelated edits or new dependencies.

## Risks and Mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| SPA routes return 404 on direct GitHub Pages loads | High | Use a real multi-page HTML entry instead of client-only routing |
| Course page feels detached from the portfolio | Medium | Reuse shared theme, typography, surfaces, footer, and motion |
| Claims overstate notebook results | High | Use only observations and methods present in the repository |
| Large data files bloat the portfolio | Medium | Do not copy raw datasets or notebooks into the site build |

## Open Questions

- Institution and academic term remain intentionally omitted.
- Notebook links can be added when the course repository has a public URL.
