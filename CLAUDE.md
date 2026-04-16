# CLAUDE.md

## Project overview

Static single-page knowledge base for EPAM Data & Analytics — "Quick Start Guide for Project Teams Adopting GenAI Solutions". Dark-themed, Markdown-driven, deployed on GitHub Pages.

## Architecture

- **No build step.** Plain HTML + CSS + vanilla JS. Served as static files.
- **Content model:** `content/manifest.json` is the single source of truth for all routing, sidebar navigation, and pager links. Markdown files in `content/sections/` are fetched at runtime and rendered with `marked.js`.
- **Routing:** Hash-based SPA (`#section-id`). Three route kinds: `home` (hero + inlined blocks), `page` (standalone pages like Contributors), `section` (curriculum reader with collapsible sidebar).
- **Styling:** CSS custom properties in `:root` for all design tokens. No preprocessor.

## Key files

| File | Purpose |
|------|---------|
| `content/manifest.json` | Content registry — add sections here, no code changes needed |
| `js/app.js` | Router, renderers, sidebar logic (single IIFE, ~420 lines) |
| `css/styles.css` | All styles (~700 lines, no dead code) |
| `index.html` | App shell with header nav and `#view` mount point |

## Adding content

All content changes go through `manifest.json` — see README.md for the full guide. The three content types:

1. **Curriculum sections** → `manifest.curriculum[]` (appear in sidebar, support nested `children`)
2. **Standalone pages** → `manifest.pages[]` (no sidebar, e.g. Contributors)
3. **Home blocks** → `manifest.home.blocks[]` (inlined on the home page)

## Common tasks

- **Local dev:** `python3 -m http.server 8000`
- **Deploy:** Push to `main` — GitHub Pages auto-deploys.
- **Cache busting:** Bump the `?v=N` query string on CSS/JS references in `index.html` when making significant asset changes.

## Conventions

- Markdown filenames use `NN-` prefix for ordering within a group (e.g. `03-01-stakeholder-expectations.md`).
- Manifest `id` values are kebab-case and must be unique across all entries (they become URL hash fragments).
- No footer — removed by design.
- Sidebar heading reads "Table of Contents", not "Curriculum".
