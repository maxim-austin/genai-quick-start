# Changelog

## 2026-04-24

<!-- last-commit: 9ef48565 -->

Replaced the Evaluation Approach placeholder with a full "Evaluating Talk-to-your-Data AI agents" section — intro plus four step-by-step subsections — and introduced a convention for embedding diagrams in guide content.

### Content

- Renamed the "Evaluation Approach" top-level section to **"Evaluating Talk-to-your-Data AI agents"** and expanded its intro with expectation-setting guidance and a three-track framework overview.
- Added four step-by-step child sections covering the full evaluation lifecycle:
  1. **Step 1 — Foundation: tracing and observability**
  2. **Step 2 — Offline evals: CI/CD quality gates** (with pipeline diagram)
  3. **Step 3 — Human evaluation: SME annotation**
  4. **Step 4 — Online evals: production feedback collection** — now also contains the "Closing the loop" wrap-up on how the three tracks compound

### Features

- Embedded SVG diagrams now render inside article content with vertical spacing, rounded corners, and a subtle border.

### Docs / Meta

- Added `content/images/` folder as the canonical location for guide diagrams; referenced from Markdown as `content/images/<file>.svg`.
- Added a CHANGELOG.md and published it alongside the project.

## 2026-04-16

<!-- last-commit: 0d6b9186e8444698247270bfd29878f26de9f9c2 -->

Built the GenAI Quick Start knowledge base from scratch — a static, dark-themed single-page application for EPAM project teams. The site is Markdown-driven with no build step: all content, routing, and sidebar navigation are controlled through a single `manifest.json` file. Adding a new section requires only a markdown file and a manifest entry.

**What's included:**

- **Home page** — hero banner with the `#data&analytics` brand wordmark, followed by inline prose blocks for Problem Statement and Guide Purpose and Scope, and a CTA leading into the guide.
- **Curriculum reader** — collapsible Table of Contents sidebar, breadcrumb trail, article view, and previous/next pager. Key Principles has six subsections; Evaluation Approach is a placeholder ready for content.
- **Top navigation** — Home / Guide / Contributors, with the active page underlined in cyan.
- **Contributors page** — standalone page listing guide contributors (Max Krupenin — Senior Data Solution Architect).
- **Design** — dark navy surfaces, cyan→purple gradient accents, Barlow Condensed display font, Source Sans 3 body copy.
- **Deployment** — hosted on GitHub Pages at `https://maxim-austin.github.io/genai-quick-start/`.
