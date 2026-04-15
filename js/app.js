/* ==========================================================================
   GenAI Quick Start — client app
   Two-route SPA:
     #/                  → home (hero + card grid)
     #<section-id>       → section reader view

   Content is driven by content/manifest.json and individual Markdown files.
   ========================================================================== */

(() => {
  const viewEl = document.getElementById('view');
  const versionEl = document.getElementById('doc-version');

  let manifest = null;
  /** Flattened list of navigable sections, in reading order. */
  let flatSections = [];
  /** Top-level sections only (for home cards). */
  let topSections = [];

  // ---------- Utilities ----------

  const escapeHtml = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
    }[c]));

  /** Slugify arbitrary heading text for anchor ids on the right rail. */
  const slugify = (s) =>
    s.toLowerCase().trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');

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

  // ---------- Nav helpers ----------

  function highlightNav(route) {
    const map = {
      home: '/',
      principles: 'key-principles',
      guide: 'problem-statement',
    };
    document.querySelectorAll('.site-nav a').forEach((a) => {
      const key = a.dataset.nav;
      const match =
        (key === 'home' && route === '/') ||
        (key !== 'home' && map[key] === route);
      a.classList.toggle('is-active', !!match);
    });
  }

  // ---------- HOME VIEW ----------

  function statsHtml() {
    const topCount = topSections.length;
    const principleCount = (topSections.find((s) => s.id === 'key-principles') || {}).children?.length || 0;
    const sectionCount = flatSections.length;
    const status = manifest.status || 'Draft';
    const rows = [
      { label: 'Top-Level Sections', value: topCount },
      { label: 'Key Principles', value: principleCount, gradient: true },
      { label: 'Total Pages', value: sectionCount },
      { label: 'Status', value: `${escapeHtml(status)} v${escapeHtml(manifest.version || '0.1')}` },
    ];
    return `
      <section class="stats" aria-label="At a glance">
        <div class="wrap">
          <div class="stats__grid">
            ${rows.map((r) => `
              <div class="stat">
                <div class="stat__label">${escapeHtml(r.label)}</div>
                <div class="stat__value">${r.gradient ? `<span class="gradient-text">${r.value}</span>` : r.value}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>
    `;
  }

  function cardHtml(section, variant = '') {
    const meta = section.children?.length
      ? `${section.children.length} sub-sections`
      : 'Read section';
    return `
      <a class="card ${variant}" href="#${escapeHtml(section.id)}">
        <div class="card__number">${escapeHtml(section.number)}</div>
        <h3 class="card__title">${escapeHtml(section.title)}</h3>
        <p class="card__desc">${escapeHtml(section.description || '')}</p>
        <div class="card__footer">
          <span>${meta}</span>
          <span class="card__arrow" aria-hidden="true">→</span>
        </div>
      </a>
    `;
  }

  function renderHome() {
    const principles = topSections.find((s) => s.id === 'key-principles')?.children || [];
    const fundamentals = topSections.filter((s) => s.id !== 'key-principles');

    viewEl.innerHTML = `
      <section class="hero">
        <div class="wrap hero__inner">
          <span class="eyebrow">${escapeHtml(manifest.eyebrow || 'Delivery Playbook')}</span>
          <h1>Quick Start Guide for Project Teams Adopting <span class="gradient-text">GenAI Solutions</span></h1>
          <p class="hero__lede">${escapeHtml(manifest.subtitle || '')}</p>
          <div class="hero__ctas">
            <a class="btn btn--gradient" href="#problem-statement">Start Reading</a>
            <a class="btn btn--ghost" href="#key-principles">Browse Principles</a>
          </div>
          <p class="hero__disclaimer">An internal EPAM community resource — ${escapeHtml(manifest.status || 'Draft')} v${escapeHtml(manifest.version || '0.1')}</p>
        </div>
      </section>

      ${statsHtml()}

      <section class="home-section">
        <div class="wrap">
          <header class="home-section__head">
            <h2 class="home-section__title">Key Principles</h2>
            <p class="home-section__lede">Six technology-agnostic principles covering the business and organizational practices that drive GenAI adoption, reliability, and measurable value.</p>
          </header>
          <div class="card-grid card-grid--cols-3">
            ${principles.map((s) => cardHtml(s)).join('')}
          </div>
        </div>
      </section>

      <section class="home-section">
        <div class="wrap">
          <header class="home-section__head">
            <h2 class="home-section__title">Start Here</h2>
            <p class="home-section__lede">The problem this playbook solves and what it covers.</p>
          </header>
          <div class="card-grid card-grid--cols-2">
            ${fundamentals.map((s) => cardHtml(s, 'card--fundamentals')).join('')}
          </div>
        </div>
      </section>
    `;

    highlightNav('/');
    document.title = `${manifest.title} — Delivery Playbook`;
  }

  // ---------- SECTION VIEW ----------

  /** Build the "On this page" rail from rendered h2/h3 headings. */
  function buildRail(container) {
    const headings = container.querySelectorAll('h2, h3');
    if (!headings.length) return '';
    const items = [];
    headings.forEach((h) => {
      if (!h.id) h.id = slugify(h.textContent);
      items.push({ id: h.id, text: h.textContent, level: h.tagName });
    });
    return `
      <aside class="rail" aria-label="On this page">
        <p class="rail__heading">On this page</p>
        <ul>
          ${items.map((i) => `<li><a href="#${escapeHtml(flatSections.sectionId || '')}/${escapeHtml(i.id)}" data-anchor="${escapeHtml(i.id)}">${escapeHtml(i.text)}</a></li>`).join('')}
        </ul>
      </aside>
    `;
  }

  function pagerHtml(idx) {
    const prev = idx > 0 ? flatSections[idx - 1] : null;
    const next = idx < flatSections.length - 1 ? flatSections[idx + 1] : null;
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

  async function renderSection(id) {
    const idx = flatSections.findIndex((s) => s.id === id);
    if (idx === -1) {
      viewEl.innerHTML = `
        <div class="wrap section-view">
          <h1 class="article h1">Section not found</h1>
          <p>No content is registered for <code>${escapeHtml(id)}</code>. Check <code>content/manifest.json</code>.</p>
          <p><a href="#/">← Back home</a></p>
        </div>
      `;
      return;
    }

    const section = flatSections[idx];
    const parent = findParent(id);

    // Loading placeholder while fetching
    viewEl.innerHTML = `
      <div class="wrap section-view">
        <div class="skeleton">
          <div class="skeleton__line skeleton__line--title"></div>
          <div class="skeleton__line"></div>
          <div class="skeleton__line"></div>
          <div class="skeleton__line skeleton__line--short"></div>
        </div>
      </div>
    `;

    try {
      const md = await loadMarkdown(section.file);
      const html = marked.parse(md, { mangle: false, headerIds: false });

      const crumbParts = [
        `<a href="#/">Home</a>`,
      ];
      if (parent && parent.id !== section.id) {
        crumbParts.push(`<span class="breadcrumb__sep">/</span>`);
        crumbParts.push(`<a href="#${escapeHtml(parent.id)}">${escapeHtml(parent.title)}</a>`);
      }
      crumbParts.push(`<span class="breadcrumb__sep">/</span>`);
      crumbParts.push(`<span>${escapeHtml(section.title)}</span>`);

      viewEl.innerHTML = `
        <div class="wrap section-view">
          <nav class="breadcrumb" aria-label="Breadcrumb">${crumbParts.join('')}</nav>
          <div class="section-view__inner">
            <article class="article">
              <span class="article__eyebrow">Section ${escapeHtml(section.number)}</span>
              <div class="article__body">${html}</div>
              ${pagerHtml(idx)}
            </article>
            <div id="rail-slot"></div>
          </div>
        </div>
      `;

      // Build the on-this-page rail from the rendered article headings
      const articleBody = viewEl.querySelector('.article__body');
      const railSlot = viewEl.querySelector('#rail-slot');
      if (articleBody && railSlot) {
        const headings = articleBody.querySelectorAll('h2, h3');
        if (headings.length) {
          const items = [];
          headings.forEach((h, i) => {
            const anchorId = slugify(h.textContent) || `h-${i}`;
            h.id = anchorId;
            items.push({ id: anchorId, text: h.textContent });
          });
          railSlot.innerHTML = `
            <aside class="rail" aria-label="On this page">
              <p class="rail__heading">On this page</p>
              <ul>
                ${items.map((i) => `<li><a href="javascript:void(0)" data-scroll="${escapeHtml(i.id)}">${escapeHtml(i.text)}</a></li>`).join('')}
              </ul>
            </aside>
          `;
          // Rail click = smooth scroll (avoids clobbering the main hash route)
          railSlot.querySelectorAll('[data-scroll]').forEach((a) => {
            a.addEventListener('click', (e) => {
              e.preventDefault();
              const target = document.getElementById(a.dataset.scroll);
              if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
              railSlot.querySelectorAll('a').forEach((x) => x.classList.remove('is-active'));
              a.classList.add('is-active');
            });
          });
        }
      }
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

    highlightNav(section.id === 'key-principles' ? 'key-principles' : (parent && parent.id === 'key-principles' ? 'key-principles' : 'problem-statement'));
    document.title = `${section.number} ${section.title} — ${manifest.title}`;
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
  }

  function findParent(id) {
    for (const top of manifest.sections) {
      if (top.id === id) return top;
      if (top.children) {
        for (const child of top.children) {
          if (child.id === id) return top;
        }
      }
    }
    return null;
  }

  // ---------- Routing ----------

  function currentRoute() {
    const hash = window.location.hash.replace(/^#/, '').trim();
    if (!hash || hash === '/' || hash === '') return '/';
    if (flatSections.some((s) => s.id === hash)) return hash;
    return '/';
  }

  function handleRoute() {
    const route = currentRoute();
    if (route === '/') renderHome();
    else renderSection(route);
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

    topSections = manifest.sections;
    flatSections = flatten(manifest.sections);
    if (versionEl && manifest.version) versionEl.textContent = `${manifest.status || 'Draft'} v${manifest.version}`;

    handleRoute();
    window.addEventListener('hashchange', handleRoute);
  }

  init();
})();
