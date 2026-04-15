/* ==========================================================================
   GenAI Quick Start — client app

   Routing:
     #/                      → home (hero + inlined Problem Statement and
                                Guide Purpose and Scope blocks)
     #<curriculum-section>   → reader view with left sidebar (Key Principles
                                tree) + single-column article
     #problem-statement      → home, smooth-scroll to that block
     #guide-purpose-and-scope → home, smooth-scroll to that block
   ========================================================================== */

(() => {
  const viewEl = document.getElementById('view');
  const versionEl = document.getElementById('doc-version');

  let manifest = null;
  /** Flat list of curriculum sections (+ children), in reading order. */
  let flatCurriculum = [];
  /** Ids of home scroll anchors (Problem Statement + Guide Purpose and Scope). */
  let homeAnchorIds = [];

  // ---------- Utilities ----------

  const escapeHtml = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
    }[c]));

  /** Walk the curriculum into a flat list preserving hierarchy metadata. */
  function flatten(sections, depth = 0, acc = []) {
    for (const s of sections) {
      acc.push({ ...s, depth });
      if (s.children && s.children.length) flatten(s.children, depth + 1, acc);
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

  // ---------- Nav helpers ----------

  function highlightHeaderNav(route) {
    document.querySelectorAll('.site-nav a').forEach((a) => {
      const key = a.dataset.nav;
      const match =
        (key === 'home' && route === '/') ||
        (key === 'principles' && route !== '/');
      a.classList.toggle('is-active', !!match);
    });
  }

  // ---------- HOME VIEW ----------

  async function renderHome(scrollAnchorId) {
    const blocks = (manifest.home && manifest.home.blocks) || [];
    const bodies = await Promise.all(
      blocks.map((b) =>
        loadMarkdown(b.file).then(
          (md) => ({ block: b, md }),
          (err) => ({ block: b, error: err.message }),
        ),
      ),
    );

    const blockHtml = bodies
      .map(({ block, md, error }) => {
        const body = error
          ? `<p><em>Unable to load: ${escapeHtml(error)}</em></p>`
          : marked.parse(md, { mangle: false, headerIds: false });
        return `
          <section class="home-block" id="${escapeHtml(block.id)}">
            <h2>${escapeHtml(block.title)}</h2>
            <div class="home-block__body">${body}</div>
          </section>
        `;
      })
      .join('');

    viewEl.innerHTML = `
      <section class="hero">
        <div class="wrap hero__inner">
          <span class="eyebrow">${escapeHtml(manifest.eyebrow || 'Delivery Playbook')}</span>
          <h1>Quick Start Guide for Project Teams Adopting <span class="gradient-text">GenAI Solutions</span></h1>
          <p class="hero__lede">${escapeHtml(manifest.subtitle || '')}</p>
          <div class="hero__ctas">
            <a class="btn btn--gradient" href="#key-principles">Explore Key Principles</a>
            <a class="btn btn--ghost" href="#problem-statement">Read Problem Statement</a>
          </div>
          <p class="hero__disclaimer">An internal EPAM community resource — ${escapeHtml(manifest.status || 'Draft')} v${escapeHtml(manifest.version || '0.1')}</p>
        </div>
      </section>

      <section class="home-blocks">
        <div class="wrap">
          ${blockHtml}
        </div>
      </section>

      <section class="home-cta">
        <div class="wrap">
          <div class="home-cta__inner">
            <h3>Ready to dive in?</h3>
            <p>Explore the six technology-agnostic principles that drive GenAI adoption, reliability, and measurable value.</p>
            <a class="btn btn--gradient" href="#key-principles">Browse Key Principles</a>
          </div>
        </div>
      </section>
    `;

    highlightHeaderNav('/');
    document.title = `${manifest.title} — Delivery Playbook`;

    // Scroll either to a specific block or to the top.
    if (scrollAnchorId) {
      requestAnimationFrame(() => {
        const el = document.getElementById(scrollAnchorId);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
    }
  }

  // ---------- SECTION VIEW ----------

  /** Build the curriculum sidebar HTML for the given active section. */
  function curriculumSidebarHtml(activeId) {
    // Figure out which top-level entry the active section belongs to.
    const activeTop = manifest.curriculum.find(
      (top) => top.id === activeId || (top.children || []).some((c) => c.id === activeId),
    );

    const items = manifest.curriculum.map((top) => {
      const isActiveTop = !!activeTop && activeTop.id === top.id;
      const isActive = activeId === top.id;
      const children = top.children || [];
      const subs = children
        .map((c) => `
          <li>
            <a href="#${escapeHtml(c.id)}" class="${c.id === activeId ? 'is-active' : ''}">
              <span class="curriculum__num">${escapeHtml(c.number)}</span>
              <span class="curriculum__title">${escapeHtml(c.title)}</span>
            </a>
          </li>
        `)
        .join('');

      return `
        <li class="curriculum__item ${isActiveTop ? 'is-expanded' : ''}">
          <a href="#${escapeHtml(top.id)}" class="curriculum__link ${isActive ? 'is-active' : ''}">
            <span class="curriculum__num">${escapeHtml(top.number)}</span>
            <span class="curriculum__title">${escapeHtml(top.title)}</span>
            <span class="curriculum__toggle" aria-hidden="true">${isActiveTop ? '∧' : '∨'}</span>
          </a>
          ${subs ? `<ul class="curriculum__sub">${subs}</ul>` : ''}
        </li>
      `;
    }).join('');

    return `
      <aside class="curriculum" aria-label="Curriculum navigation">
        <div class="curriculum__group">
          <h4 class="curriculum__heading">Study Tools</h4>
          <a class="curriculum__simple" href="#/">Home</a>
        </div>
        <div class="curriculum__group">
          <h4 class="curriculum__heading">Curriculum</h4>
          <ul class="curriculum__items">${items}</ul>
        </div>
      </aside>
    `;
  }

  function pagerHtml(idx) {
    const prev = idx > 0 ? flatCurriculum[idx - 1] : null;
    const next = idx < flatCurriculum.length - 1 ? flatCurriculum[idx + 1] : null;
    const linkHtml = (section, kind) => {
      if (!section) {
        return `<span class="pager__link pager__link--disabled" aria-hidden="true"></span>`;
      }
      const label = kind === 'prev' ? '← Previous' : 'Next →';
      return (
        `<a class="pager__link pager__link--${kind}" href="#${escapeHtml(section.id)}">` +
          `<span class="pager__label">${label}</span>` +
          `<span class="pager__title">${escapeHtml(section.number)} &middot; ${escapeHtml(section.title)}</span>` +
        `</a>`
      );
    };
    return `<nav class="pager" aria-label="Pager">${linkHtml(prev, 'prev')}${linkHtml(next, 'next')}</nav>`;
  }

  function findCurriculumParent(id) {
    for (const top of manifest.curriculum) {
      if (top.id === id) return null; // top-level
      if ((top.children || []).some((c) => c.id === id)) return top;
    }
    return null;
  }

  async function renderSection(id) {
    const idx = flatCurriculum.findIndex((s) => s.id === id);
    if (idx === -1) {
      viewEl.innerHTML = `
        <div class="wrap section-view">
          <article class="article">
            <h1>Section not found</h1>
            <p>No content is registered for <code>${escapeHtml(id)}</code>.</p>
            <p><a href="#/">← Back home</a></p>
          </article>
        </div>
      `;
      return;
    }

    const section = flatCurriculum[idx];
    const parent = findCurriculumParent(id);

    // Loading placeholder.
    viewEl.innerHTML = `
      <div class="wrap section-view">
        <div class="section-view__inner">
          ${curriculumSidebarHtml(id)}
          <div>
            <div class="skeleton">
              <div class="skeleton__line skeleton__line--title"></div>
              <div class="skeleton__line"></div>
              <div class="skeleton__line"></div>
              <div class="skeleton__line skeleton__line--short"></div>
            </div>
          </div>
        </div>
      </div>
    `;

    try {
      const md = await loadMarkdown(section.file);
      const html = marked.parse(md, { mangle: false, headerIds: false });

      const crumb = [
        `<a href="#/">Home</a>`,
        `<span class="breadcrumb__sep">/</span>`,
      ];
      if (parent) {
        crumb.push(`<a href="#${escapeHtml(parent.id)}">${escapeHtml(parent.title)}</a>`);
        crumb.push(`<span class="breadcrumb__sep">/</span>`);
      }
      crumb.push(`<span>${escapeHtml(section.title)}</span>`);

      viewEl.innerHTML = `
        <div class="wrap section-view">
          <div class="section-view__inner">
            ${curriculumSidebarHtml(id)}
            <article class="article">
              <nav class="breadcrumb" aria-label="Breadcrumb">${crumb.join('')}</nav>
              <span class="article__eyebrow">Section ${escapeHtml(section.number)}</span>
              <h1>${escapeHtml(section.title)}</h1>
              <div class="article__body">${html}</div>
              ${pagerHtml(idx)}
            </article>
          </div>
        </div>
      `;
    } catch (err) {
      viewEl.innerHTML = `
        <div class="wrap section-view">
          <article class="article">
            <h1>Unable to load section</h1>
            <p>${escapeHtml(err.message)}</p>
            <p><a href="#/">← Back home</a></p>
          </article>
        </div>
      `;
    }

    highlightHeaderNav(id);
    document.title = `${section.number} ${section.title} — ${manifest.title}`;
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
  }

  // ---------- Routing ----------

  function currentRoute() {
    const hash = window.location.hash.replace(/^#/, '').trim();
    if (!hash || hash === '/' || hash === '') return { kind: 'home' };

    // Home anchor scroll links
    if (homeAnchorIds.includes(hash)) return { kind: 'home', scrollTo: hash };

    // Curriculum section (top or child)
    if (flatCurriculum.some((s) => s.id === hash)) return { kind: 'section', id: hash };

    return { kind: 'home' };
  }

  function handleRoute() {
    const route = currentRoute();
    if (route.kind === 'home') renderHome(route.scrollTo);
    else renderSection(route.id);
  }

  // ---------- Boot ----------

  async function init() {
    try {
      manifest = await loadManifest();
    } catch (err) {
      viewEl.innerHTML = `
        <div class="wrap section-view">
          <article class="article">
            <h1>Unable to load knowledge base</h1>
            <p>${escapeHtml(err.message)}</p>
            <p>This site must be served over HTTP. From the project root run:</p>
            <pre><code>python3 -m http.server 8000</code></pre>
          </article>
        </div>
      `;
      return;
    }

    flatCurriculum = flatten(manifest.curriculum || []);
    homeAnchorIds = ((manifest.home && manifest.home.blocks) || []).map((b) => b.id);

    if (versionEl && manifest.version) {
      versionEl.textContent = `${manifest.status || 'Draft'} v${manifest.version}`;
    }

    handleRoute();
    window.addEventListener('hashchange', handleRoute);
  }

  init();
})();
