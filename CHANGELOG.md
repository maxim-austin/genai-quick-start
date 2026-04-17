# Changelog

## 2026-04-16

<!-- last-commit: 0d6b9186e8444698247270bfd29878f26de9f9c2 -->

Initial changelog creation covering the full project build — from blank repo to a polished, deployed knowledge base.

### Features

- Built a static hash-based SPA with three route types: `home` (hero + inlined prose blocks), `page` (standalone pages without sidebar), and `section` (curriculum reader with collapsible sidebar, breadcrumb, and prev/next pager).
- Implemented a manifest-driven content model where all routing, sidebar, and pager data flows from `content/manifest.json` — adding a new section requires only a markdown file and a manifest entry.
- Added collapsible sidebar Table of Contents with a dedicated chevron toggle button (separate from the nav link to avoid click conflicts) that remembers expand/collapse state within a session.
- Added Guide Contributors standalone page listing Max Krupenin — Senior Data Solution Architect.
- Added Evaluation Approach as a second top-level curriculum item (placeholder, ready for content).
- Added "Guide" link to the top nav (Home / Guide / Contributors order) that highlights when viewing any curriculum section.
- Active nav link shows a cyan underline to indicate the current page.

### Style / UI

- Designed and implemented a full dark-navy theme aligned to the `#data&analytics` brand: surfaces `#01142D`/`#001D42`, cyan `#04F1FF` and purple `#753EFE` gradient accents for CTAs and headings.
- Built the `#data&analytics` text wordmark logo in pure CSS — `#` and `&` use the cyan→purple gradient, `data` and `analytics` are white.
- Applied Barlow Condensed (Google Fonts) as the display typeface and Source Sans 3 for body copy; Roboto Mono for metadata labels.
- Removed the stats strip and card-grid sections from the home view, replacing them with inline prose blocks (Problem Statement and Guide Purpose and Scope) and a closing CTA.
- Removed the site footer entirely.
- Cleaned up 212 lines of dead CSS (stats strip, card grid, home-section headings, article eyebrow, curriculum simple-link, and their responsive rules).

### Content

- Home page carries the hero, Problem Statement, and Guide Purpose and Scope as inline prose — not cards — followed by a "Ready to dive in?" CTA.
- Renamed section from "Document Purpose and Scope" to "Guide Purpose and Scope".
- Removed the GenAI MLOps bullet from the Out of scope list in Guide Purpose and Scope.
- Stripped 3.1–3.6 numbering from the Key Principles TOC and sidebar.
- H1 headings removed from all section markdown files; titles are injected by the renderer from manifest metadata.

### Docs / Meta

- Rewrote README.md to match the current project structure: hash routing table, manifest field reference, and step-by-step guides for adding each content type (curriculum section, subsection, standalone page, home block).
- Created CLAUDE.md with architecture overview, key files map, content model, common tasks, cache-busting convention, and naming conventions.
- Added `?v=N` cache-busting query strings on `app.js` and `styles.css` in `index.html` to force browsers to load updated assets after each significant change.
- Added `.nojekyll` for GitHub Pages; deployed site at `https://maxim-austin.github.io/genai-quick-start/`.
