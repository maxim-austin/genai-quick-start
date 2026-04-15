/* ==========================================================================
   Quick Start Guide — client app
   Loads content/manifest.json, builds the sidebar nav, and hash-routes
   to markdown files rendered into the main content area.
   ========================================================================== */

(() => {
  const tocEl = document.getElementById('toc');
  const contentEl = document.getElementById('content-root');
  const pagerEl = document.getElementById('pager');
  const versionEl = document.getElementById('doc-version');
  const docTitleEl = document.querySelector('[data-js="doc-title"]');

  let manifest = null;
  /** Flattened list of navigable sections, in reading order. */
  let flatSections = [];

  // ---------- Utilities ----------

  const escapeHtml = (s) =>
    s.replace(/[&<>"']/g, (c) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
    }[c]));

  /** Walk the manifest into a flat list preserving hierarchy metadata. */
  function flatten(sections, depth = 0, acc = []) {
    for (const s of sections) {
      acc.push({ ...s, depth });
      if (s.children && s.children.length) {
        flatten(s.children, depth + 1, acc);
      }
    }
    return acc;
  }

  // ---------- Data loading ----------

  async function loadManifest() {
    const res = await fetch('content/manifest.json', { cache: 'no-cache' });
    if (!res.ok) throw new Error(`Failed to load manifest: ${res.status}`);
    return res.json();
  }

  async function loadMarkdown(file) {
    const res = await fetch('content/' + file, { cache: 'no-cache' });
    if (!res.ok) throw new Error(`Failed to load ${file}: ${res.status}`);
    return res.text();
  }

  // ---------- Rendering ----------

  function renderToc() {
    const build = (sections, isChildren = false) => {
      const nav = document.createElement('nav');
      nav.className = isChildren ? 'toc--children' : 'toc';
      for (const s of sections) {
        const a = document.createElement('a');
        a.href = '#' + s.id;
        a.dataset.id = s.id;
        a.innerHTML =
          `<span class="toc__number">${escapeHtml(s.number)}</span>` +
          `<span class="toc__title">${escapeHtml(s.title)}</span>`;
        nav.appendChild(a);
        if (s.children && s.children.length) {
          nav.appendChild(build(s.children, true));
        }
      }
      return nav;
    };
    tocEl.replaceChildren(build(manifest.sections));
  }

  function highlightToc(activeId) {
    tocEl.querySelectorAll('a').forEach((a) => {
      a.classList.toggle('is-active', a.dataset.id === activeId);
    });
  }

  function renderPager(idx) {
    const prev = idx > 0 ? flatSections[idx - 1] : null;
    const next = idx < flatSections.length - 1 ? flatSections[idx + 1] : null;
    const linkHtml = (section, kind) => {
      if (!section) {
        return `<span class="pager__link pager__link--disabled" aria-hidden="true"></span>`;
      }
      const label = kind === 'prev' ? 'Previous' : 'Next';
      return (
        `<a class="pager__link pager__link--${kind}" href="#${section.id}">` +
          `<span class="pager__label">${label}</span>` +
          `<span class="pager__title">${escapeHtml(section.number)} &middot; ${escapeHtml(section.title)}</span>` +
        `</a>`
      );
    };
    pagerEl.innerHTML = linkHtml(prev, 'prev') + linkHtml(next, 'next');
  }

  async function renderSection(id) {
    const idx = flatSections.findIndex((s) => s.id === id);
    if (idx === -1) {
      contentEl.innerHTML =
        `<h1>Section not found</h1>` +
        `<p>No content is registered for <code>${escapeHtml(id)}</code>. ` +
        `Check <code>content/manifest.json</code>.</p>`;
      pagerEl.innerHTML = '';
      return;
    }

    const section = flatSections[idx];
    highlightToc(id);
    document.title = `${section.number} ${section.title} — ${manifest.title}`;

    try {
      const md = await loadMarkdown(section.file);
      const html = marked.parse(md, { mangle: false, headerIds: false });
      contentEl.innerHTML =
        `<div class="eyebrow">Section ${escapeHtml(section.number)}</div>` +
        html;
    } catch (err) {
      contentEl.innerHTML =
        `<h1>Unable to load section</h1>` +
        `<p>${escapeHtml(err.message)}</p>`;
    }

    renderPager(idx);
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
  }

  // ---------- Routing ----------

  function currentRouteId() {
    const hash = window.location.hash.replace(/^#/, '').trim();
    if (hash && flatSections.some((s) => s.id === hash)) return hash;
    return flatSections[0] && flatSections[0].id;
  }

  function handleRoute() {
    const id = currentRouteId();
    if (id) renderSection(id);
  }

  // ---------- Boot ----------

  async function init() {
    try {
      manifest = await loadManifest();
    } catch (err) {
      contentEl.innerHTML =
        `<h1>Unable to load knowledge base</h1>` +
        `<p>${escapeHtml(err.message)}</p>` +
        `<p>This site needs to be served over HTTP. From the project root run:</p>` +
        `<pre><code>python3 -m http.server 8000</code></pre>` +
        `<p>then open <a href="http://localhost:8000">http://localhost:8000</a>.</p>`;
      return;
    }

    flatSections = flatten(manifest.sections);
    if (docTitleEl && manifest.title) docTitleEl.textContent = manifest.title;
    if (versionEl && manifest.version) versionEl.textContent = 'v' + manifest.version;

    renderToc();
    handleRoute();
    window.addEventListener('hashchange', handleRoute);
  }

  init();
})();
