# Changelog

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
