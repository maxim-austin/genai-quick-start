# Quick Start Guide for Project Teams Adopting GenAI Solutions

A lightweight static knowledge base built from the source document
*Quick Start Guide for Project Teams Adopting GenAI Solutions (Draft)*.

Visual style is inspired by the [EPAM Elements / UUI](https://elements.epam.com/)
design system (Source Sans 3 typography, EPAM sky-blue `#007BBD` primary,
flat low-shadow aesthetic, 6-px spacing scale).

## Running locally

The site loads content via `fetch()`, so it must be served over HTTP
(opening `index.html` directly via `file://` will not work).

```bash
# from the project root
python3 -m http.server 8000
# then open http://localhost:8000
```

Any static server works (`npx serve`, `caddy file-server`, nginx, etc.).

## Deploying to GitHub Pages

The site is 100% static with no build step, so it can be served directly
from a repository.

1. **Push the repo to GitHub.**
2. In the repo, go to **Settings → Pages**.
3. Under **Source**, pick **Deploy from a branch**, select your default
   branch (e.g. `main`) and folder **`/ (root)`**, then **Save**.
4. Wait a minute — Pages will publish the site at
   `https://<user>.github.io/<repo>/`.

Notes:
- A `.nojekyll` file is included at the repo root so GitHub Pages serves
  every file verbatim and skips the default Jekyll build step (which
  would otherwise ignore files and folders starting with `_` and slow
  down publishing).
- All asset and `fetch()` paths in the site are **relative**, so it works
  whether it's served from `https://<user>.github.io/<repo>/` or from a
  custom domain at the site root — no base-path changes required.
- Hash-based routing (`#section-id`) is client-side, so deep links work
  without any server rewrites or 404 fallback.
- To use a custom domain, add a `CNAME` file at the repo root containing
  the domain (e.g. `docs.example.com`) and configure DNS per the
  [GitHub Pages docs](https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site).

## Project structure

```
genai-quick-start/
├── index.html                  # App shell: header, sidebar, content area
├── css/
│   └── styles.css              # Design tokens + components (EPAM-inspired)
├── js/
│   └── app.js                  # Manifest loader, router, nav, renderer
├── content/
│   ├── manifest.json           # Ordered section tree — edit to add pages
│   └── sections/
│       ├── 01-problem-statement.md
│       ├── 02-document-purpose-and-scope.md
│       ├── 03-key-principles.md
│       ├── 03-01-stakeholder-expectations.md
│       ├── 03-02-context-engineering.md
│       ├── 03-03-data-products.md
│       ├── 03-04-measurement.md
│       ├── 03-05-roi.md
│       └── 03-06-start-small.md
└── README.md
```

Each section is a standalone Markdown file, so the content is easy to edit
without touching HTML, CSS, or JS.

## Adding a new section

1. **Write the Markdown** — drop a new file into `content/sections/`,
   e.g. `04-governance.md`. Use standard Markdown (headings, lists,
   `**bold**`, links, code blocks, etc.).

2. **Register it in `content/manifest.json`** — add an entry to the
   `sections` array (or to a parent section's `children` array):

   ```json
   {
     "id": "governance",
     "number": "4",
     "title": "Governance",
     "file": "sections/04-governance.md"
   }
   ```

   Fields:
   - `id` — URL hash fragment (must be unique, e.g. `#governance`)
   - `number` — section number shown in the sidebar and eyebrow
   - `title` — display title
   - `file` — path relative to `content/`
   - `children` — optional array of subsections (same shape, rendered
     as an indented group under the parent in the sidebar)

3. **Refresh** — the sidebar, routing, and prev/next pager all rebuild
   from the manifest automatically. No code changes needed.

## Adding or changing nested subsections

Nested subsections work out of the box — just add a `children` array
to any section in `manifest.json`. Depth is unlimited, but the sidebar
styling currently highlights two levels (parent + children) clearly.

## Changing the visual theme

All design tokens live at the top of `css/styles.css` in the `:root`
block — colors, typography, spacing scale, radius, and shadows.
Override those variables to re-skin the whole site without touching
component rules.

## Dependencies

- [`marked`](https://github.com/markedjs/marked) — Markdown → HTML
  (loaded from jsDelivr CDN in `index.html`)
- Google Fonts: Source Sans 3, Roboto Mono

No build step, no package manager, no framework.
