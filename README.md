# Quick Start Guide for Project Teams Adopting GenAI Solutions

A static knowledge base for EPAM project teams delivering GenAI solutions — from POC to MVP. Dark-themed, single-page application with hash routing, collapsible sidebar navigation, and Markdown-driven content.

**Live site:** deployed via GitHub Pages from `main`.

## Running locally

The site loads content via `fetch()`, so it must be served over HTTP
(`file://` will not work).

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

Any static server works (`npx serve`, `caddy file-server`, nginx, etc.).

## Project structure

```
genai-quick-start/
├── index.html                          # App shell (header, #view mount point)
├── css/
│   └── styles.css                      # Design tokens + all component styles
├── js/
│   └── app.js                          # Manifest loader, SPA router, renderers
├── content/
│   ├── manifest.json                   # Content registry (drives sidebar, routing, pager)
│   └── sections/
│       ├── 01-problem-statement.md     # Home block
│       ├── 02-guide-purpose-and-scope.md  # Home block
│       ├── 03-key-principles.md        # Curriculum: Key Principles (parent)
│       ├── 03-01-stakeholder-expectations.md
│       ├── 03-02-context-engineering.md
│       ├── 03-03-data-products.md
│       ├── 03-04-measurement.md
│       ├── 03-05-roi.md
│       ├── 03-06-start-small.md
│       ├── evaluation-approach.md      # Curriculum: Evaluation Approach
│       └── contributors.md            # Standalone page
├── .nojekyll                           # Bypass Jekyll on GitHub Pages
└── README.md
```

## How routing works

Hash-based SPA routing — no server rewrites needed:

| Hash | View |
|------|------|
| `#/` or empty | Home (hero + inlined home blocks) |
| `#problem-statement`, `#guide-purpose-and-scope` | Home, smooth-scrolled to that block |
| `#contributors` | Standalone page |
| `#key-principles`, `#stakeholder-expectations`, etc. | Curriculum reader with sidebar |

## Adding new content

All content is driven by `content/manifest.json`. No JS or HTML changes needed.

### Add a new curriculum section (top-level)

1. Create a Markdown file in `content/sections/`, e.g. `delivery-practices.md`.

2. Add an entry to the `curriculum` array in `manifest.json`:

   ```json
   {
     "id": "delivery-practices",
     "title": "Delivery Practices",
     "file": "sections/delivery-practices.md",
     "description": "Optional description for metadata."
   }
   ```

3. Refresh — sidebar, routing, and prev/next pager rebuild automatically.

### Add a subsection (child of an existing section)

Add an entry to the parent's `children` array:

```json
{
  "id": "key-principles",
  "title": "Key Principles",
  "file": "sections/03-key-principles.md",
  "children": [
    {
      "id": "new-principle",
      "title": "New Principle Title",
      "file": "sections/03-07-new-principle.md"
    }
  ]
}
```

Children appear as collapsible sub-items in the sidebar under their parent.

### Add a standalone page

Add to the `pages` array in `manifest.json`:

```json
{
  "id": "glossary",
  "title": "Glossary",
  "file": "sections/glossary.md"
}
```

Standalone pages render without the sidebar and are accessed via `#glossary`.

### Add a home block

Add to the `home.blocks` array — content is inlined on the home page:

```json
{
  "id": "overview",
  "title": "Overview",
  "file": "sections/overview.md"
}
```

### Manifest field reference

| Field | Required | Description |
|-------|----------|-------------|
| `id` | Yes | URL hash fragment (must be unique across all entries) |
| `title` | Yes | Display title in sidebar, breadcrumbs, and pager |
| `file` | Yes | Path relative to `content/` |
| `description` | No | Metadata description |
| `lede` | No | Subtitle shown on standalone pages |
| `children` | No | Array of subsections (same shape, nested under parent in sidebar) |

## Design tokens

All design tokens live in the `:root` block at the top of `css/styles.css` — colors, typography, spacing, radii, and layout values. Override those variables to re-skin the site without touching component rules.

**Brand colors:** cyan `#04F1FF`, purple `#753EFE`, pink `#FF50A1`, lilac `#CC93FB`, navy `#001D42`/`#01142D`.

**Typography:** Barlow Condensed (display), Source Sans 3 (body), Roboto Mono (metadata) — loaded from Google Fonts.

## Dependencies

- [`marked`](https://github.com/markedjs/marked) — Markdown to HTML (CDN)
- Google Fonts: Barlow Condensed, Source Sans 3, Roboto Mono

No build step, no package manager, no framework.
