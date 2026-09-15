/* Machine Learning Knowledge System — static GitHub Pages client. */
(function () {
  'use strict';

  const app = document.getElementById('app');
  const title = document.getElementById('pageTitle');
  const search = document.getElementById('search');
  const cardTemplate = document.getElementById('unitCard');
  const state = { catalog: [], units: {}, topics: [], progress: {}, glossary: null, query: '', route: parseHash() };
  const sourceStyle = document.createElement('style'); sourceStyle.textContent = `.source-workspace{display:grid;grid-template-columns:270px minmax(0,1fr);gap:18px;margin-top:28px;align-items:start}.source-nav{position:sticky;top:20px;background:#f5f6fb;border:1px solid var(--line);border-radius:12px;padding:14px;max-height:calc(100vh - 40px);overflow:auto}.source-nav-title{color:#7a879b;font:10px 'DM Mono';letter-spacing:.08em;margin:4px 6px 9px}.visual-title{border-top:1px solid var(--line);padding-top:15px;margin-top:15px}.source-nav-button{display:block;width:100%;border:0;background:transparent;color:#526077;text-align:left;border-radius:7px;padding:9px 8px;font:11px Manrope;cursor:pointer;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.source-nav-button:hover,.source-nav-button.active{background:var(--lav);color:#49398b}.source-article{min-width:0;background:#fff;border:1px solid var(--line);border-radius:12px;padding:clamp(22px,4vw,52px)}.source-article h2{font-size:25px;line-height:1.25;margin:6px 0 8px}.article-kicker{color:#6751c4;font:10px 'DM Mono';letter-spacing:.08em;text-transform:uppercase}.article-source{color:#8792a3;font:10px 'DM Mono';word-break:break-all;border-bottom:1px solid var(--line);padding-bottom:16px}.docx-reading{max-width:850px;font-size:14px;line-height:1.9}.docx-reading p{margin:0 0 1.2em;white-space:normal}.visual-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(190px,1fr));gap:18px}.visual-grid figure{margin:0}.visual-grid img{width:100%;height:150px;object-fit:contain;background:#f6f7fb;border:1px solid var(--line);border-radius:9px}.visual-grid figcaption{font-size:10px;color:var(--muted);line-height:1.5;margin-top:6px}@media(max-width:820px){.source-workspace{grid-template-columns:1fr}.source-nav{position:static;max-height:300px}}`; document.head.appendChild(sourceStyle);
  const articleStyle = document.createElement('style'); articleStyle.textContent = `.article-layout{display:grid;grid-template-columns:180px minmax(0,1fr);gap:28px;margin-top:28px}.article-toc{position:sticky;top:20px;align-self:start;max-height:calc(100vh - 50px);overflow:auto;border-left:2px solid #e4defd;padding:2px 0 2px 14px}.article-toc strong{display:block;color:#7a879b;font:9px 'DM Mono';letter-spacing:.08em;margin-bottom:10px}.article-toc a{display:block;color:#68758a;font-size:10px;line-height:1.45;text-decoration:none;padding:4px 0}.article-toc a:hover{color:#49398b}.article-section{scroll-margin-top:24px}.article-section h3{font-size:18px;line-height:1.35;margin:30px 0 12px;color:#253042}.article-section:first-child h3{margin-top:0}.article-figures{border-top:1px solid var(--line);margin-top:36px;padding-top:24px}@media(max-width:820px){.article-layout{grid-template-columns:1fr}.article-toc{position:static;max-height:160px}}`; document.head.appendChild(articleStyle);

  const module1Style = document.createElement('style'); module1Style.textContent = `.module1-hero{margin-bottom:22px}.module1-hero h2{max-width:780px}.module1-meta{display:flex;flex-wrap:wrap;gap:8px;margin-top:16px}.module1-layout{display:grid;grid-template-columns:245px minmax(0,1fr);gap:22px;align-items:start}.module1-unit-nav{position:sticky;top:20px;background:#f5f6fb;border:1px solid var(--line);border-radius:14px;padding:14px;max-height:calc(100vh - 40px);overflow:auto}.module1-unit-nav strong{display:block;color:#7a879b;font:10px 'DM Mono';letter-spacing:.08em;margin:4px 6px 10px}.module1-unit-button{display:block;width:100%;border:1px solid transparent;background:transparent;color:#526077;text-align:left;border-radius:8px;padding:10px 9px;font:600 11px Manrope;cursor:pointer}.module1-unit-button small{display:block;color:#8c98aa;font:9px 'DM Mono';margin-top:4px}.module1-unit-button:hover,.module1-unit-button.active{background:#ebe7ff;border-color:#d5cdf8;color:#49398b}.module1-article{min-width:0;background:#fff;border:1px solid var(--line);border-radius:14px;padding:clamp(22px,4vw,52px)}.module1-article-header{border-bottom:1px solid var(--line);padding-bottom:22px;margin-bottom:25px}.module1-article-header h2{font-size:31px;line-height:1.18;margin:7px 0 12px}.module1-article-summary{font-size:15px;line-height:1.85;color:#526077;max-width:820px}.module1-breadcrumb{color:#6751c4;font:10px 'DM Mono';letter-spacing:.08em;text-transform:uppercase}.module1-content{max-width:880px}.module1-content h3{font-size:22px;line-height:1.3;margin:42px 0 14px;padding-top:10px;border-top:1px solid #eeeaf9;scroll-margin-top:20px}.module1-content h3:first-child{margin-top:0}.chapter-body{font-size:15px;line-height:2;color:#263247}.chapter-body p{margin:0 0 1.25em}.chapter-card{margin:20px 0 28px;padding:18px 20px;border:1px solid #eadfbe;border-left:4px solid #c59632;border-radius:10px;background:linear-gradient(135deg,#fffaf0,#fff)}.chapter-card h4{margin:0 0 10px;color:#7a5619;font-size:14px}.chapter-card p{margin:7px 0;color:#4e4a42;font-size:12px;line-height:1.7}.chapter-card .card-label{display:inline-block;margin-right:7px;color:#a16e1e;font:10px 'DM Mono';letter-spacing:.05em}.formula-panel{margin:18px 0 30px;padding:18px;background:#f6f4ff;border:1px solid #ddd6fa;border-radius:12px}.formula-panel h4{margin:0 0 12px;color:#49398b;font-size:14px}.formula-block{margin:9px 0;padding:12px 14px;background:#fff;border:1px solid #e4defb;border-radius:7px;overflow:auto;color:#231c4c;font:14px/1.7 'DM Mono',monospace;white-space:pre-wrap}.figure-strip{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:15px;margin:16px 0 30px}.figure-strip figure{margin:0;padding:11px;background:#fbfbfd;border:1px solid var(--line);border-radius:10px}.figure-strip img{display:block;width:100%;height:190px;object-fit:contain;background:#f1f2f6;border-radius:6px}.figure-strip figcaption{margin-top:8px;color:#69758a;font-size:11px;line-height:1.55}.module1-details{margin:28px 0;border-top:1px solid var(--line);padding-top:17px}.module1-details summary{cursor:pointer;color:#49398b;font-weight:700}.module1-source-note{padding:13px 15px;margin:14px 0;background:#fff8e8;border:1px solid #f0d7a3;border-radius:9px;color:#76521d;font-size:12px;line-height:1.7}.pdf-frame{width:100%;height:600px;border:1px solid var(--line);border-radius:9px;margin-top:14px;background:#f5f6fb}.module1-toc{position:sticky;top:20px;max-height:calc(100vh - 40px);overflow:auto;border-left:2px solid #e4defd;padding-left:14px}.module1-toc strong{display:block;color:#7a879b;font:9px 'DM Mono';letter-spacing:.08em;margin-bottom:9px}.module1-toc a{display:block;color:#68758a;text-decoration:none;font-size:10px;line-height:1.45;padding:4px 0}.module1-toc a:hover{color:#49398b}.module1-reading-grid{display:grid;grid-template-columns:minmax(0,1fr) 150px;gap:28px}.framework-map{display:grid;grid-template-columns:repeat(5,1fr);gap:8px;margin:24px 0}.framework-level{padding:13px 12px;background:#fff;border:1px solid var(--line);border-radius:10px}.framework-level .level{color:#6751c4;font:10px 'DM Mono'}.framework-level strong{display:block;margin-top:7px;font-size:13px}.framework-level span{display:block;margin-top:5px;color:#7b8799;font-size:10px;line-height:1.5}@media(max-width:980px){.module1-layout{grid-template-columns:1fr}.module1-unit-nav{position:static;max-height:270px}.module1-reading-grid{grid-template-columns:1fr}.module1-toc{position:static;max-height:150px;order:-1}.framework-map{grid-template-columns:repeat(2,1fr)}}@media(max-width:600px){.module1-article{padding:20px 16px}.module1-article-header h2{font-size:25px}.framework-map{grid-template-columns:1fr}}`; document.head.appendChild(module1Style);
  const module1LayoutFix = document.createElement('style'); module1LayoutFix.textContent = `.module1-article-header{display:block!important;min-height:0!important;align-items:initial!important;justify-content:initial!important;gap:0!important}.module1-article-header h2{display:block!important}.module1-article-header .module1-article-summary{display:block!important;width:auto!important;max-width:820px!important}.module1-article-header .module1-meta{display:flex!important;flex-wrap:wrap!important}`; document.head.appendChild(module1LayoutFix);
  const module1V2Style = document.createElement('style'); module1V2Style.textContent = `.module1-shell{max-width:1440px}.module1-workspace{display:grid;grid-template-columns:minmax(0,800px) 320px;gap:28px;align-items:start;justify-content:center}.context-rail{position:sticky;top:20px;max-height:calc(100vh - 40px);overflow:auto;background:#f5f6fb;border:1px solid var(--line);border-radius:14px;padding:16px}.context-rail h3{font-size:14px;margin:0 0 12px}.context-tabs{display:flex;gap:6px;margin-bottom:16px}.context-tabs button{border:1px solid var(--line);background:#fff;border-radius:7px;padding:7px 9px;color:#68758a;font:600 10px Manrope;cursor:pointer}.context-tabs button.active{background:#ebe7ff;border-color:#cfc4f7;color:#49398b}.flow-rail{display:grid;gap:4px}.flow-rail button{display:flex;gap:9px;align-items:center;border:0;background:transparent;text-align:left;border-radius:7px;padding:8px;color:#69758a;font:10px Manrope;cursor:pointer}.flow-rail button span{display:grid;place-items:center;width:20px;height:20px;border-radius:50%;background:#e8eaf0;color:#7c8797;font:9px 'DM Mono'}.flow-rail button.active{background:#ebe7ff;color:#49398b}.flow-rail button.active span{background:#6751c4;color:#fff}.tutor-panel{display:none}.tutor-panel.open{display:block}.tutor-intro{font-size:12px;line-height:1.65;color:#56647a}.tutor-prompt{padding:12px;background:#fff;border:1px solid var(--line);border-radius:8px;color:#8893a4;font-size:11px;margin:12px 0}.tutor-actions{display:grid;gap:7px}.tutor-actions button{border:1px solid #d7cff8;background:#fff;color:#57449f;border-radius:7px;padding:9px;text-align:left;font:600 10px Manrope;cursor:pointer}.flow-progress{display:flex;gap:4px;overflow:auto;margin:0 0 22px;padding-bottom:5px}.flow-progress span{min-width:27px;height:6px;border-radius:99px;background:#e3e5ec}.flow-progress span.current{background:#6751c4}.flow-progress span.done{background:#58a187}.flow-step{padding:24px 0;border-top:1px solid #eeeaf9;scroll-margin-top:20px}.flow-step:first-of-type{border-top:0;padding-top:0}.flow-step-kicker{color:#6751c4;font:10px 'DM Mono';letter-spacing:.08em;text-transform:uppercase}.flow-step h3{font-size:22px!important;border:0!important;padding:0!important;margin:7px 0 12px!important}.flow-step p{font-size:15px;line-height:1.85;color:#263247}.variable-table{width:100%;border-collapse:collapse;margin:15px 0;font-size:12px}.variable-table th,.variable-table td{border:1px solid var(--line);padding:9px;text-align:left;vertical-align:top}.variable-table th{background:#f5f6fb;color:#53617a}.code-cell{margin:14px 0;border:1px solid #243653;border-radius:10px;overflow:hidden;background:#10203a}.code-cell .cell-head{padding:8px 12px;color:#acbad0;background:#182b49;font:10px 'DM Mono'}.code-cell pre{margin:0;padding:15px;color:#e6edf7;font:12px/1.7 'DM Mono';white-space:pre-wrap;overflow:auto}.output-cell{padding:12px 14px;margin-top:8px;background:#f7f8fb;border:1px solid var(--line);border-radius:8px;color:#45536b;font:12px/1.7 'DM Mono'}.quiz-card{padding:18px;margin-top:12px;background:#fff;border:1px solid #d9d2f5;border-radius:10px}.quiz-card button{display:block;width:100%;margin-top:8px;border:1px solid var(--line);background:#fff;border-radius:7px;padding:10px;text-align:left;color:#4f5d73;font:12px Manrope;cursor:pointer}.quiz-card button:hover{border-color:#a79adb;background:#f7f5ff}.quiz-feedback{margin-top:10px;color:#247a62;font-size:12px}.module1-side{display:none;margin-top:30px}.module1-side-title{color:#7a879b;font:9px 'DM Mono';letter-spacing:.08em;margin-bottom:8px}.module1-side button{display:block;width:100%;border:0;background:transparent;color:#aeb7c7;text-align:left;border-radius:7px;padding:7px 5px;font:10px Manrope;cursor:pointer}.module1-side button:hover,.module1-side button.active{background:#ebe7ff;color:#49398b}@media(max-width:1120px){.module1-workspace{grid-template-columns:minmax(0,1fr) 280px}}@media(max-width:900px){.module1-workspace{grid-template-columns:1fr}.context-rail{position:static;max-height:none;order:-1}.context-rail .flow-rail{display:flex;overflow:auto}.context-rail .flow-rail button{min-width:max-content}.module1-side{display:none}}@media(min-width:761px){body.module1-active #module1Side{display:block}}@media(max-width:760px){.module1-workspace{display:block}.context-rail{margin-bottom:16px}.module1-article{padding:24px 18px}.flow-step{padding:19px 0}.flow-step p{font-size:15px;line-height:1.8}}`; document.head.appendChild(module1V2Style);
  const module1SemanticFix = document.createElement('style'); module1SemanticFix.textContent = `.chapter-card{display:block!important;flex-direction:initial!important}.context-rail{box-sizing:border-box!important}.module1-content{min-width:0;overflow-wrap:anywhere}.formula-block,.code-cell pre{max-width:100%;overflow-x:auto}`; document.head.appendChild(module1SemanticFix);
  const readingPolish = document.createElement('style'); readingPolish.textContent = `.docx-reading{max-width:760px;font-size:16px;line-height:1.82;overflow-wrap:anywhere}.docx-reading p{margin:0 0 1.35em}.visual-grid img{height:auto!important;max-height:360px;object-fit:contain}.source-article{min-width:0;overflow-wrap:anywhere}.source-article h2{line-height:1.35}@media(max-width:820px){.source-workspace{gap:12px}.source-nav{max-height:220px}.source-article{padding:22px 18px}}`; document.head.appendChild(readingPolish);
  const courseOrderStyle = document.createElement('style'); courseOrderStyle.textContent = `.course-outline{margin:22px 0 28px;border:1px solid var(--line);border-radius:14px;background:#fff;overflow:hidden}.course-outline>summary{cursor:pointer;padding:17px 20px;color:#253042;font-weight:800;list-style:none}.course-outline>summary::-webkit-details-marker{display:none}.course-outline>summary:before{content:'▾';color:#6751c4;margin-right:9px}.outline-section{padding:15px 20px;border-top:1px solid var(--line)}.outline-section-title{color:#52617a;font-weight:800;font-size:13px;margin-bottom:8px}.outline-item{display:flex;gap:10px;align-items:center;padding:8px 0;color:#526077;font-size:12px}.outline-item button{flex:1;border:0;background:transparent;text-align:left;color:#263247;padding:0;font:inherit;cursor:pointer}.outline-item button:hover{color:#6751c4}.outline-item .outline-status{width:8px;height:8px;border-radius:50%;background:#58a187;flex:none}.outline-item.missing{color:#9aa4b4}.outline-item.missing .outline-status{background:#d7dbe3}.outline-type{margin-left:auto;color:#8792a3;font:9px 'DM Mono';white-space:nowrap}.module2-article-list{display:grid;gap:12px;margin-top:22px}.module2-article-card{padding:18px 20px;background:#fff;border:1px solid var(--line);border-radius:12px}.module2-article-card h3{margin:0 0 7px;color:#253042;font-size:17px}.module2-article-card p{margin:0;color:#68758a;font-size:12px;line-height:1.7}.module2-article-card button{margin-top:13px;border:1px solid #d5cdf8;background:#f7f5ff;color:#57449f;border-radius:7px;padding:8px 11px;font:600 11px Manrope;cursor:pointer}`; document.head.appendChild(courseOrderStyle);
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const escapeHtml = (value) => String(value == null ? '' : value)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

  function parseHash() {
    const parts = decodeURIComponent(location.hash.slice(1)).split('/').filter(Boolean);
    if (parts[0] === 'unit' && parts[1]) return { page: 'unit', slug: parts[1], lesson: parts[2] || null };
    if (parts[0] === 'sources') return { page: 'sources', sourceId: parts[1] || null };
    if (parts[0] === 'module1') return { page: 'module1', unit: parts[1] || null };
    if (parts[0] === 'module2') return { page: 'module2' };
    if (parts[0] === 'glossary') return { page: 'glossary', termId: parts[1] || null };
    if (parts[0] === 'big-picture' || parts[0] === 'path') return { page: 'big-picture' };
    if (parts[0] === 'search') return { page: 'search', query: parts.slice(1).join('/') || '' };
    if (parts[0] === 'topics') return { page: 'topics', topicId: parts[1] || null };
    return { page: 'home', filter: parts[0] || 'all' };
  }

  const staticFiles = {
    '/api/catalog': 'data/catalog.json', '/api/sources': 'data/sources.json', '/api/articles': 'data/articles.json',
    '/api/module1': 'data/module1.json', '/api/module2': 'data/module2.json', '/api/glossary': 'data/glossary.json',
    '/api/course-order': 'data/course-order.json', '/api/topics': 'data/topics.json',
  };
  const dataCache = new Map();
  const assetUrl = (value) => new URL(String(value || ''), document.baseURI).href;
  async function loadJson(file) {
    if (dataCache.has(file)) return dataCache.get(file);
    const response = await fetch(new URL(file, document.baseURI));
    if (!response.ok) throw new Error(`Unable to load ${file} (${response.status})`);
    const value = await response.json(); dataCache.set(file, value); return value;
  }
  function searchStatic(records, query) {
    const norm = (value) => String(value || '').normalize('NFKC').toLowerCase().replace(/[‐‑‒–—−]/g, '-').replace(/\s+/g, ' ').trim();
    const needle = norm(query); if (!needle) return { query: '', total: 0, results: [] };
    const results = records.map((item) => {
      const haystack = norm([item.title, ...(item.aliases || []), item.text, item.module, item.unit].join(' '));
      if (!haystack.includes(needle)) return null;
      const exact = norm(item.title) === needle; const titleHit = norm(item.title).includes(needle);
      const clean = String(item.text || '').replace(/\s+/g, ' ').trim(); const at = norm(clean).indexOf(needle);
      const start = Math.max(0, at < 0 ? 0 : at - 80); const snippet = `${start ? '…' : ''}${clean.slice(start, start + 240)}${start + 240 < clean.length ? '…' : ''}`;
      return { ...item, score: exact ? 100 : titleHit ? 70 : 40, snippet };
    }).filter(Boolean).sort((a, b) => b.score - a.score || a.title.localeCompare(b.title)).slice(0, 100);
    return { query, total: results.length, results };
  }
  async function api(path, options = {}) {
    const url = new URL(path, 'https://static.local');
    if (url.pathname === '/api/progress') {
      if ((options.method || 'GET').toUpperCase() === 'PUT') {
        const value = JSON.parse(options.body || '{}'); localStorage.setItem('ml-study-progress', JSON.stringify(value)); return value;
      }
      try { return JSON.parse(localStorage.getItem('ml-study-progress') || '{}'); } catch { return {}; }
    }
    if (url.pathname.startsWith('/api/unit/')) return loadJson(`data/units/${decodeURIComponent(url.pathname.slice(10))}.json`);
    if (url.pathname === '/api/search') {
      const index = await loadJson('data/search-index.json'); return searchStatic(index.records || [], url.searchParams.get('q') || '');
    }
    const file = staticFiles[url.pathname]; if (!file) throw new Error(`Unknown static endpoint: ${url.pathname}`);
    return loadJson(file);
  }

  function setHash(hash) { if (location.hash !== hash) location.hash = hash; else render(); }
  function goHome() { setHash('#home'); }
  function openUnit(slug, lesson) { setHash(`#unit/${encodeURIComponent(slug)}${lesson ? `/${encodeURIComponent(lesson)}` : ''}`); }
  function openModule1(unit) { setHash(`#module1${unit ? `/${encodeURIComponent(unit)}` : ''}`); }
  function openGlossary(termId) { setHash(`#glossary${termId ? `/${encodeURIComponent(termId)}` : ''}`); }
  function openSearch(query) { const value = String(query || '').trim(); setHash(value ? `#search/${encodeURIComponent(value)}` : '#search'); }

  function markdownInline(value) {
    let text = escapeHtml(value);
    text = text.replace(/`([^`\n]+)`/g, '<code>$1</code>');
    text = text.replace(/\*\*([^*\n]+)\*\*/g, '<strong>$1</strong>');
    text = text.replace(/__([^_\n]+)__/g, '<strong>$1</strong>');
    text = text.replace(/\*([^*\n]+)\*/g, '<em>$1</em>');
    text = text.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
    return text;
  }

  // Deliberately small renderer: all text is escaped before the supported markup is added.
  function renderMarkdown(markdown) {
    const lines = String(markdown || '').replace(/\r\n?/g, '\n').split('\n');
    const out = []; let i = 0; let paragraph = [];
    const flushParagraph = () => { if (paragraph.length) { out.push(`<p>${paragraph.map(markdownInline).join('<br>')}</p>`); paragraph = []; } };
    while (i < lines.length) {
      const line = lines[i];
      if (/^\s*```/.test(line)) {
        flushParagraph(); const language = line.trim().slice(3).trim(); const code = []; i += 1;
        while (i < lines.length && !/^\s*```/.test(lines[i])) { code.push(lines[i]); i += 1; }
        if (i < lines.length) i += 1;
        out.push(`<pre><code${language ? ` data-language="${escapeHtml(language)}"` : ''}>${escapeHtml(code.join('\n'))}</code></pre>`); continue;
      }
      const heading = line.match(/^\s*(#{1,6})\s+(.+?)\s*#*\s*$/);
      if (heading) { flushParagraph(); const level = heading[1].length; out.push(`<h${level}>${markdownInline(heading[2])}</h${level}>`); i += 1; continue; }
      if (/^\s*([-*+] |\d+\. )/.test(line)) {
        flushParagraph(); const ordered = /^\s*\d+\. /.test(line); const items = [];
        while (i < lines.length && new RegExp(`^\\s*${ordered ? '\\d+\\. ' : '[-*+] '}`).test(lines[i])) {
          items.push(lines[i].replace(/^\s*(?:[-*+] |\d+\. )/, '')); i += 1;
        }
        out.push(`<${ordered ? 'ol' : 'ul'}>${items.map((item) => `<li>${markdownInline(item)}</li>`).join('')}</${ordered ? 'ol' : 'ul'}>`); continue;
      }
      if (line.includes('|') && i + 1 < lines.length && /^\s*\|?\s*:?-{3,}/.test(lines[i + 1])) {
        flushParagraph(); const cells = (row) => row.trim().replace(/^\||\|$/g, '').split('|').map((cell) => cell.trim());
        const headers = cells(line); i += 2; const rows = [];
        while (i < lines.length && lines[i].includes('|') && lines[i].trim()) { rows.push(cells(lines[i])); i += 1; }
        out.push(`<table><thead><tr>${headers.map((cell) => `<th>${markdownInline(cell)}</th>`).join('')}</tr></thead><tbody>${rows.map((row) => `<tr>${headers.map((_, index) => `<td>${markdownInline(row[index] || '')}</td>`).join('')}</tr>`).join('')}</tbody></table>`); continue;
      }
      if (!line.trim()) { flushParagraph(); i += 1; continue; }
      paragraph.push(line.trim()); i += 1;
    }
    flushParagraph(); return out.join('');
  }

  function lessonProgress(slug, id) {
    const unit = state.progress && state.progress[slug];
    return Boolean(unit && (unit.lessons ? unit.lessons[id] : unit[id]));
  }

  async function saveProgress(slug, lessonId, checked) {
    if (!state.progress || typeof state.progress !== 'object' || Array.isArray(state.progress)) state.progress = {};
    const current = state.progress[slug] && typeof state.progress[slug] === 'object' ? state.progress[slug] : {};
    current.lessons = current.lessons && typeof current.lessons === 'object' ? current.lessons : {};
    current.lessons[lessonId] = checked;
    current.updatedAt = new Date().toISOString();
    state.progress[slug] = current;
    try { await api('/api/progress', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(state.progress) }); }
    catch (error) { console.warn('Progress could not be saved:', error); }
  }

  function progressSummary(unit) {
    const done = unit.lessons.filter((lesson) => lessonProgress(unit.slug, lesson.id)).length;
    return `${done}/${unit.lessons.length} 課已完成`;
  }

  function catalogProgressSummary(unit) {
    const saved = state.progress && state.progress[unit.slug];
    const lessons = saved && saved.lessons && typeof saved.lessons === 'object' ? saved.lessons : {};
    const done = Object.keys(lessons).filter((id) => lessons[id]).length;
    return `${done}/${unit.lessonCount || 0} 課已完成`;
  }

  function unitMatches(unit, query) {
    const haystack = [unit.title, unit.slug, unit.learningPath, ...(unit.lessons || []).map((lesson) => `${lesson.title} ${lesson.markdown || ''}`)].join(' ').toLowerCase();
    return haystack.includes(query.toLowerCase());
  }

  async function ensureUnit(slug) {
    if (!state.units[slug] || !Array.isArray(state.units[slug].lessons)) state.units[slug] = await api(`/api/unit/${encodeURIComponent(slug)}`);
    return state.units[slug];
  }

  function renderHome() {
    title.textContent = 'Machine Learning Library';
    const supervised = state.topics.filter((item) => item.courseKey === 'supervised');
    const unsupervised = state.topics.filter((item) => item.courseKey === 'unsupervised');
    const curated = state.topics.filter((item) => item.status === 'curated').length;
    app.innerHTML = `<section class="hero knowledge-hero"><div><span class="pill">OBSIDIAN-FIRST · PUBLIC NOTES</span><h2>從資料、模型到可靠判斷，一張可搜尋的 Machine Learning 知識地圖。</h2><p>Supervised 與 Unsupervised Learning 共 ${state.topics.length} 個主題，按照 Module、Topic、Glossary 與概念關聯組織。原始課程檔案不在公開網站。</p><div class="module1-meta"><span class="pill">${state.topics.length} TOPICS</span><span class="pill">${curated} CURATED NOTES</span><span class="pill">88 DEFINITIONS</span></div></div><div class="hero-compass" aria-hidden="true">ML</div></section><section class="course-cards"><article><p class="eyebrow">PREDICTION · INFERENCE · EVALUATION</p><h2>Supervised Learning</h2><p>${supervised.length} topics across 5 modules—from mathematical foundations and regression to classification and ensembles.</p><button type="button" data-course="supervised">Explore course →</button></article><article><p class="eyebrow">STRUCTURE · REPRESENTATION · DISCOVERY</p><h2>Unsupervised Learning</h2><p>${unsupervised.length} topics across 5 modules—from PCA and dimensionality reduction to clustering and generative models.</p><button type="button" data-course="unsupervised">Explore course →</button></article></section><section class="home-actions"><button type="button" id="homeBigPicture">Open Big Picture</button><button type="button" id="homeGlossary">Browse Glossary</button><button type="button" id="homeArticles">Read curated articles</button></section>`;
    app.querySelectorAll('[data-course]').forEach((button) => button.addEventListener('click', () => setHash(`#topics/${button.dataset.course}`)));
    $('#homeBigPicture').addEventListener('click', () => setHash('#big-picture'));
    $('#homeGlossary').addEventListener('click', () => setHash('#glossary'));
    $('#homeArticles').addEventListener('click', () => setHash('#sources'));
  }

  function renderUnit(unit) {
    title.textContent = unit.title || unit.slug;
    const selected = unit.routeLesson || unit.lessons[0];
    const current = unit.lessons.find((lesson) => lesson.id === selected) || unit.lessons[0];
    app.innerHTML = `<div class="unit-head"><div><button class="back" type="button">← 回到首頁</button><p class="eyebrow" style="margin-top:20px">${escapeHtml(unit.learningPath || 'LEARNING UNIT')}</p><h2>${escapeHtml(unit.title || unit.slug)}</h2><p class="unit-detail">${escapeHtml(unit.status || '')} · ${escapeHtml(progressSummary(unit))}</p></div><span class="pill">${unit.lessons.length} LESSONS</span></div><div class="tabs" role="tablist"></div><article class="reading">${current ? renderMarkdown(current.markdown) : '<p class="empty">目前沒有課文。</p>'}</article><div class="tool-row"><label><input id="lessonDone" type="checkbox" ${current && lessonProgress(unit.slug, current.id) ? 'checked' : ''}> 完成這一課</label><button class="secondary" id="confused" type="button">我不明白</button></div><p class="notice" id="promptNotice" hidden>已複製提問 prompt，可以貼到 ChatGPT 繼續討論。</p>`;
    $('.back', app).addEventListener('click', goHome);
    const tabs = $('.tabs', app);
    unit.lessons.forEach((lesson, index) => {
      const button = document.createElement('button'); button.type = 'button'; button.setAttribute('role', 'tab'); button.textContent = `${String(index + 1).padStart(2, '0')} · ${lesson.title}`; button.className = lesson.id === current.id ? 'active' : '';
      button.addEventListener('click', () => openUnit(unit.slug, lesson.id)); tabs.appendChild(button);
    });
    if (current) $('#lessonDone', app).addEventListener('change', (event) => { saveProgress(unit.slug, current.id, event.target.checked).then(() => render()); });
    $('#confused', app).addEventListener('click', () => copyPrompt(unit, current));
  }

  async function renderSources() {
    title.textContent = 'Source Library';
    const [sources, docx] = await Promise.all([api('/api/sources'), api('/api/articles')]);
    const visuals = sources.filter((item) => /\.(png|jpe?g|webp)$/i.test(item.extension || ''));
    const fileTitle = (item) => String(item.sourcePath || item.path || '').split('/').pop();
    const docxCount = docx.filter((item) => item.contentKind !== 'TXT').length;
    const textCount = docx.filter((item) => item.contentKind === 'TXT').length;
    app.innerHTML = `<section class="hero"><div><span class="pill">CURATED NOTE LIBRARY</span><h2>先讀整理文章，再用圖像建立直覺。</h2><p>${docxCount} 份 DOCX-derived notes 與 ${textCount} 份文字筆記已整理成網站文章，${visuals.length} 張必要概念圖可直接查看。原始課程檔案不在公開網站。</p></div><div aria-hidden="true" style="font-size:48px;align-self:center">▦</div></section><div class="source-workspace"><aside class="source-nav"><div class="source-nav-title">ARTICLES · ${docx.length}</div><div id="docxNav"></div><div class="source-nav-title visual-title">VISUALS · ${visuals.length}</div><button id="showVisuals" class="source-nav-button" type="button">查看全部概念圖</button></aside><section id="sourceArticle" class="source-article"><p class="empty">從左側選擇一份整理筆記。</p></section></div>`;
    const nav = document.querySelector('#docxNav');
    const article = document.querySelector('#sourceArticle');
    const showDoc = (item, button) => {
      document.querySelectorAll('.source-nav-button.active').forEach((node) => node.classList.remove('active')); button.classList.add('active');
      const name = item.title || fileTitle(item);
      const sectionMarkup = (item.sections || []).map((section, index) => `<section class="article-section" id="section-${index}"><h3>${escapeHtml(section.heading)}</h3>${(section.paragraphs || []).map((part) => `<p>${escapeHtml(part)}</p>`).join('')}</section>`).join('');
      const visualMarkup = (item.visuals || []).length ? `<div class="article-figures"><div class="article-kicker">RELATED FIGURES</div><div class="visual-grid">${item.visuals.map((visual) => { const src = assetUrl(visual.path); return `<figure><a href="${src}" target="_blank" rel="noopener"><img src="${src}" loading="lazy" alt="${escapeHtml(visual.relativePath || 'concept image')}"></a><figcaption>${escapeHtml(visual.relativePath || '')}</figcaption></figure>`; }).join('')}</div></div>` : '';
      const toc = (item.sections || []).slice(0, 40).map((section, index) => `<a href="#section-${index}">${escapeHtml(section.heading)}</a>`).join('');
      article.innerHTML = `<div class="article-kicker">${escapeHtml(item.module || '')} · ${escapeHtml(item.contentKind || 'NOTE')} · ${item.paragraphCount || 0} 段</div><h2>${escapeHtml(name)}</h2><p class="article-source">${escapeHtml(item.courseSection || '')}<br>整理來源：${escapeHtml(item.sourcePath || '')}</p><div class="article-layout"><aside class="article-toc"><strong>ON THIS ARTICLE</strong>${toc}</aside><div class="docx-reading">${sectionMarkup}${visualMarkup}</div></div>`;
      article.scrollIntoView({ block: 'start', behavior: 'smooth' });
    };
    docx.forEach((item) => { const button = document.createElement('button'); button.type = 'button'; button.className = 'source-nav-button'; button.textContent = `${item.module.replace('Module ', 'M')} · ${fileTitle(item)}`; button.title = item.sourcePath || ''; button.addEventListener('click', () => showDoc(item, button)); nav.appendChild(button); });
    document.querySelector('#showVisuals').addEventListener('click', () => { document.querySelectorAll('.source-nav-button.active').forEach((node) => node.classList.remove('active')); article.innerHTML = `<div class="article-kicker">MODULE 1–2 · VISUAL NOTES</div><h2>概念圖</h2><p class="article-source">點擊圖片可放大。</p><div class="visual-grid">${visuals.map((item) => { const src = assetUrl(item.path); return `<figure><a href="${src}" target="_blank" rel="noopener"><img src="${src}" loading="lazy" alt="${escapeHtml(item.relativePath || 'concept image')}"></a><figcaption>${escapeHtml(item.module || '')} · ${escapeHtml(item.relativePath || '')}</figcaption></figure>`; }).join('')}</div>`; });
    const initial = docx.find((item) => item.id === state.route.sourceId) || docx[0];
    if (initial) showDoc(initial, Array.from(nav.querySelectorAll('button')).find((button) => button.textContent.endsWith(fileTitle(initial))) || nav.querySelector('button'));
  }

  function articleParagraphs(text) {
    const sentences = String(text || '').replace(/\s+/g, ' ').trim().split(/(?<=[.!?。！？])\s+/).filter(Boolean);
    const paragraphs = []; let current = '';
    sentences.forEach((sentence) => {
      if (current && current.length + sentence.length > 720) { paragraphs.push(current); current = ''; }
      current += `${current ? ' ' : ''}${sentence}`;
    });
    if (current) paragraphs.push(current);
    return paragraphs.map((part) => `<p>${escapeHtml(part)}</p>`).join('');
  }

  function module1Figure(item, related = false) {
    const label = item.relativePath || item.path || 'course figure';
    const note = related ? '公式／概念圖：先看圖，再回到上方公式與章節文字。' : '原始課程圖像：保留在本文作為視覺證據。';
    const src = assetUrl(item.path);
    return `<figure><a href="${src}" target="_blank" rel="noopener"><img src="${src}" alt="${escapeHtml(label)}" loading="lazy"></a><figcaption>${escapeHtml(label)}<br><span>${note}</span></figcaption></figure>`;
  }

  async function getGlossary() {
    if (!state.glossary) state.glossary = await api('/api/glossary');
    return state.glossary;
  }

  function glossaryCard(entry, compact = false) {
    const category = (state.glossary?.categories || []).find((item) => item.id === entry.category);
    return `<article class="glossary-card${compact ? ' compact' : ''}">
      <div class="glossary-card-top"><span class="glossary-category">${escapeHtml(category?.label || entry.category || 'Glossary')}</span><span class="glossary-module">${escapeHtml(entry.module || '')}</span></div>
      <h3>${escapeHtml(entry.term)}</h3>
      ${entry.aliases?.length ? `<p class="glossary-aliases">${entry.aliases.map(escapeHtml).join(' · ')}</p>` : ''}
      <p class="glossary-definition">${escapeHtml(entry.definition)}</p>
      ${compact ? '' : `<p class="glossary-why"><strong>為什麼重要</strong> ${escapeHtml(entry.why)}</p>`}
      <button type="button" class="text-link" data-glossary-term="${escapeHtml(entry.id)}">查看完整定義 <span>→</span></button>
    </article>`;
  }

  async function renderGlossary() {
    title.textContent = 'Glossary';
    const data = await getGlossary();
    const selected = data.entries.find((entry) => entry.id === state.route.termId) || null;
    const categoryLabel = (id) => data.categories.find((item) => item.id === id)?.label || id;
    const entryMarkup = selected ? `<section class="glossary-detail">
      <button type="button" class="back" id="glossaryBack">← 回到 Glossary</button>
      <div class="glossary-detail-kicker">${escapeHtml(categoryLabel(selected.category))} · ${escapeHtml(selected.module || 'Module 1–2')}</div>
      <h2>${escapeHtml(selected.term)}</h2>
      ${selected.aliases?.length ? `<p class="glossary-aliases large">${selected.aliases.map(escapeHtml).join(' · ')}</p>` : ''}
      <div class="definition-lead"><span>DEFINITION</span><p>${escapeHtml(selected.definition)}</p></div>
      <div class="glossary-detail-grid"><section><h3>為什麼重要</h3><p>${escapeHtml(selected.why)}</p></section>${selected.formula ? `<section><h3>核心公式</h3><div class="formula-block">${escapeHtml(selected.formula)}</div></section>` : ''}</div>
      <section class="glossary-related"><h3>相關術語</h3><div class="related-terms">${(selected.related || []).map((id) => { const item = data.entries.find((entry) => entry.id === id); return item ? `<button type="button" data-glossary-term="${escapeHtml(item.id)}">${escapeHtml(item.term)}</button>` : ''; }).join('') || '<span>暫無已連結術語</span>'}</div></section>
      <section class="glossary-provenance"><h3>回到課程脈絡</h3><p>${escapeHtml(selected.module || 'Module 1–2')} · ${escapeHtml(selected.unitId || '跨文章共同術語')}</p>${selected.unitId ? (selected.module === 'Unsupervised Learning' ? '<button type="button" class="secondary" data-topic-course="unsupervised">瀏覽 Unsupervised Topics →</button>' : `<button type="button" class="secondary" data-open-unit="${escapeHtml(selected.unitId)}">閱讀相關 Article →</button>`) : ''}</section>
    </section>` : `<section class="glossary-index"><div class="glossary-toolbar"><label class="glossary-filter">分類<select id="glossaryCategory"><option value="all">全部分類</option>${data.categories.map((item) => `<option value="${escapeHtml(item.id)}">${escapeHtml(item.label)}</option>`).join('')}</select></label><span id="glossaryCount" class="result-count"></span></div><div id="glossaryGrid" class="glossary-grid"></div></section>`;
    app.innerHTML = `<section class="hero glossary-hero"><div><span class="pill">10 MODULES · KNOWLEDGE INDEX</span><h2>Glossary：先查清楚術語，再回到完整文章。</h2><p>${escapeHtml(data.description)} 每個定義都保留模組與相關課程入口，Glossary 是速查層，深度解釋仍在 Topic／Article。</p><div class="module1-meta"><span class="pill">${data.entries.length} TERMS</span><span class="pill">${data.categories.length} CATEGORIES</span><span class="pill">SEARCHABLE</span></div></div><div class="glossary-hero-mark" aria-hidden="true">Aa</div></section>${entryMarkup}`;
    if (selected) {
      $('#glossaryBack').addEventListener('click', () => openGlossary());
    } else {
      const grid = $('#glossaryGrid'); const category = $('#glossaryCategory');
      const paint = () => { const filtered = data.entries.filter((entry) => category.value === 'all' || entry.category === category.value); $('#glossaryCount').textContent = `${filtered.length} 個術語`; grid.innerHTML = filtered.map((entry) => glossaryCard(entry)).join(''); bindGlossaryActions(grid); };
      category.addEventListener('change', paint); paint();
    }
    bindGlossaryActions(app);
  }

  function bindGlossaryActions(root = document) {
    root.querySelectorAll('[data-glossary-term]').forEach((button) => button.addEventListener('click', () => openGlossary(button.dataset.glossaryTerm)));
    root.querySelectorAll('[data-open-unit]').forEach((button) => button.addEventListener('click', () => openModule1(button.dataset.openUnit)));
    root.querySelectorAll('[data-topic-course]').forEach((button) => button.addEventListener('click', () => setHash(`#topics/${button.dataset.topicCourse}`)));
  }

  async function renderBigPicture() {
    title.textContent = 'Big Picture';
    const data = await getGlossary(); const map = data.bigPicture || { nodes: [] }; const entries = data.entries || [];
    const term = (id) => entries.find((entry) => entry.id === id);
    const nodes = (map.nodes || []).map((node, index) => `<article class="big-picture-node"><div class="big-picture-node-number">${escapeHtml(node.number || String(index + 1).padStart(2, '0'))}</div><div><p class="eyebrow">${escapeHtml(node.subtitle || '')}</p><h3>${escapeHtml(node.title)}</h3><p>${escapeHtml(node.description)}</p><div class="node-terms">${(node.glossaryIds || []).slice(0, 6).map((id) => { const item = term(id); return item ? `<button type="button" data-glossary-term="${escapeHtml(item.id)}">${escapeHtml(item.term)}</button>` : ''; }).join('')}</div></div></article>`).join('<div class="big-picture-arrow" aria-hidden="true">→</div>');
    app.innerHTML = `<section class="hero big-picture-hero"><div><span class="pill">COURSE MAP · 10 MODULES</span><h2>${escapeHtml(map.title || '從問題到可靠模型')}</h2><p>${escapeHtml(map.subtitle || '')} 這張圖連接 Supervised 與 Unsupervised Learning 的共同主線；點節點內的術語可直接進入 Glossary 定義。</p><div class="module1-meta"><span class="pill">${(map.nodes || []).length} STAGES</span><span class="pill">${data.relationships?.length || 0} CONNECTIONS</span><span class="pill">CLICKABLE MAP</span></div></div><div class="big-picture-orbit" aria-hidden="true"><span>DATA</span><strong>→</strong><span>MODEL</span><strong>→</strong><span>TRUST</span></div></section><section class="big-picture-map"><div class="big-picture-map-head"><div><p class="eyebrow">LEARNING SYSTEM</p><h2>一條完整的學習主線</h2></div><button type="button" class="secondary" id="openGlossaryFromMap">開啟完整 Glossary →</button></div><div class="big-picture-flow">${nodes}</div></section><section class="big-picture-principles"><article><span>01</span><h3>先定義問題</h3><p>Feature、target 與任務類型先說清楚，模型才有正確方向。</p></article><article><span>02</span><h3>讓資料可被理解</h3><p>矩陣、公式與模型不是孤立章節，而是同一條資料表示鏈。</p></article><article><span>03</span><h3>最後才相信分數</h3><p>泛化、residual、leakage 與可解釋性決定模型是否真的可靠。</p></article></section>`;
    bindGlossaryActions(app); $('#openGlossaryFromMap').addEventListener('click', () => openGlossary());
  }

  async function renderTopics() {
    title.textContent = 'All Topics';
    const data = state.topics.length ? { topics: state.topics } : await api('/api/topics');
    state.topics = data.topics || [];
    const courseKeys = new Set(['supervised', 'unsupervised']);
    const selected = state.topics.find((item) => item.id === state.route.topicId);
    if (selected) {
      const neighbours = state.topics.filter((item) => item.courseKey === selected.courseKey && item.module === selected.module && item.id !== selected.id).slice(0, 8);
      app.innerHTML = `<article class="topic-detail"><button type="button" class="back" id="topicBack">← 回到全部 Topics</button><p class="eyebrow">${escapeHtml(selected.course)} · MODULE ${selected.module} · ${escapeHtml(selected.status)}</p><h2>${escapeHtml(selected.title)}</h2><div class="topic-tags">${selected.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join('')}</div><div class="reading topic-reading">${renderMarkdown(selected.body)}</div><aside class="topic-connections"><p class="eyebrow">SAME MODULE · CONNECTIONS</p>${neighbours.map((item) => `<button type="button" data-topic-id="${escapeHtml(item.id)}">${escapeHtml(item.title)} <span>→</span></button>`).join('')}</aside></article>`;
      $('#topicBack').addEventListener('click', () => setHash(`#topics/${selected.courseKey}`));
      app.querySelectorAll('[data-topic-id]').forEach((button) => button.addEventListener('click', () => setHash(`#topics/${button.dataset.topicId}`)));
      return;
    }
    const courseFilter = courseKeys.has(state.route.topicId) ? state.route.topicId : null;
    const courses = courseFilter ? [courseFilter] : ['supervised', 'unsupervised'];
    const markup = courses.map((courseKey) => {
      const items = state.topics.filter((item) => item.courseKey === courseKey);
      const name = items[0]?.course || courseKey;
      const modules = Array.from(new Set(items.map((item) => item.module))).sort((a, b) => a - b);
      return `<section class="topic-course"><div class="topic-course-head"><div><p class="eyebrow">5 MODULES · OBSIDIAN MOC</p><h2>${escapeHtml(name)}</h2></div><span>${items.length} topics</span></div>${modules.map((number) => { const moduleItems = items.filter((item) => item.module === number); return `<details class="topic-module" open><summary><strong>Module ${number}</strong><span>${moduleItems.length} topics</span></summary><div class="topic-grid">${moduleItems.map((item) => `<article class="topic-card"><div><span class="topic-status ${escapeHtml(item.status)}">${escapeHtml(item.status)}</span><h3>${escapeHtml(item.title)}</h3><p>${item.sourceCount} indexed note files · ${item.sourceTypes.join(' · ') || 'source index'}</p></div><button type="button" data-topic-id="${escapeHtml(item.id)}">Read note →</button></article>`).join('')}</div></details>`; }).join('')}</section>`;
    }).join('');
    app.innerHTML = `<section class="hero"><div><span class="pill">OBSIDIAN VAULT · 10 MODULES</span><h2>每個主題都有位置、狀態與可延伸的連結。</h2><p>Curated 表示已有 Markdown／DOCX 整理內容；Outline 表示已建立學習框架，等待進一步精煉。</p></div><div aria-hidden="true" style="font-size:48px;align-self:center">⌘</div></section><div class="course-filter"><button type="button" data-topic-filter="all">All</button><button type="button" data-topic-filter="supervised">Supervised</button><button type="button" data-topic-filter="unsupervised">Unsupervised</button></div>${markup}`;
    app.querySelectorAll('[data-topic-id]').forEach((button) => button.addEventListener('click', () => setHash(`#topics/${button.dataset.topicId}`)));
    app.querySelectorAll('[data-topic-filter]').forEach((button) => button.addEventListener('click', () => setHash(button.dataset.topicFilter === 'all' ? '#topics' : `#topics/${button.dataset.topicFilter}`)));
  }

  async function renderSearch() {
    const query = state.route.query || ''; state.query = query; search.value = query; title.textContent = query ? 'Search' : 'Search Library';
    if (!query) { app.innerHTML = `<section class="hero search-hero"><div><span class="pill">FULL-TEXT SEARCH</span><h2>搜尋術語、公式、文章與章節。</h2><p>輸入英文、繁體中文、公式符號或常見別名；結果會優先顯示 Glossary definition，再帶你回到原始課程脈絡。</p></div><div class="search-hero-mark" aria-hidden="true">⌕</div></section><p class="empty">請在上方搜尋框輸入關鍵字。</p>`; return; }
    const data = await api(`/api/search?q=${encodeURIComponent(query)}`); const groups = ['glossary', 'topic', 'chapter', 'article'].map((type) => ({ type, items: data.results.filter((item) => item.type === type) })).filter((group) => group.items.length);
    const labels = { glossary: 'Glossary definitions', topic: 'Supervised + Unsupervised topics', chapter: 'Module 1 chapters', article: 'Curated articles' };
    app.innerHTML = `<section class="hero search-results-hero"><div><span class="pill">SEARCH RESULTS</span><h2>「${escapeHtml(query)}」</h2><p>${data.total} 個結果。先看定義，再按需要深入 Article／Chapter。</p></div><div class="search-result-count">${data.total}<span>matches</span></div></section>${groups.length ? groups.map((group) => `<section class="search-group"><div class="search-group-heading"><p class="eyebrow">${escapeHtml(labels[group.type])}</p><span>${group.items.length}</span></div><div class="search-results-list">${group.items.map((item) => `<article class="search-result"><div class="search-result-type">${escapeHtml(item.label || item.type)}</div><div><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.snippet || '')}</p><small>${escapeHtml([item.module, item.unit].filter(Boolean).join(' · '))}</small></div><button type="button" class="text-link" data-search-route="${escapeHtml(item.route)}">開啟 <span>→</span></button></article>`).join('')}</div></section>`).join('') : '<p class="empty">找不到結果。試試 slope、斜率、residual、β₁ 或 regression。</p>'}`;
    app.querySelectorAll('[data-search-route]').forEach((button) => button.addEventListener('click', () => { location.hash = button.dataset.searchRoute; }));
  }

  function renderFramework() {
    title.textContent = 'Learning Path';
    app.innerHTML = `<section class="hero"><div><span class="pill">COURSE ARCHITECTURE</span><h2>由 Course 走到可以獨立解題的 Glossary。</h2><p>兩條 learning paths 共 10 個 Module；每個 Topic 連接正文、公式／圖像、學習狀態與相鄰概念。Glossary 負責跨課程速查與定義，Obsidian MOC 負責長期整理。</p></div><div aria-hidden="true" style="font-size:48px;align-self:center">⌘</div></section><div class="framework-map"><div class="framework-level"><span class="level">01 · COURSE</span><strong>2 Learning Paths</strong><span>Supervised → Unsupervised</span></div><div class="framework-level"><span class="level">02 · MODULE</span><strong>10 Modules</strong><span>Foundations · Models · Evaluation · Discovery</span></div><div class="framework-level"><span class="level">03 · TOPIC</span><strong>86 Topics</strong><span>一個問題、一組核心概念</span></div><div class="framework-level"><span class="level">04 · NOTE</span><strong>可讀筆記</strong><span>解釋、公式、例子與狀態</span></div><div class="framework-level"><span class="level">05 · GLOSSARY</span><strong>${88} Definitions</strong><span>術語、關聯、回到 Topic</span></div></div><div class="units"><article class="unit-card"><div><p class="eyebrow">SUPERVISED + UNSUPERVISED</p><h2>Machine Learning Knowledge Map</h2><p class="unit-detail">問題定義 → 資料表示 → 模型／探索 → 評估與解釋</p></div><button type="button" id="openModule1FromPath">查看全部 Topics <span>→</span></button></article></div>`;
    $('#openModule1FromPath').addEventListener('click', () => setHash('#topics'));
  }

  async function renderModule1() {
    title.textContent = 'Module 1 · Data Science Foundations';
    const data = await api('/api/module1');
    const units = data.units || [];
    const selected = units.find((unit) => unit.id === state.route.unit) || units[0];
    app.innerHTML = `<section class="hero module1-hero"><div><span class="pill">MODULE 1 · ARTICLE-FIRST COURSE</span><h2>先建立數學與任務的共同語言，再進入模型。</h2><p>${escapeHtml(data.description || '')}</p><div class="module1-meta"><span class="pill">${units.length} UNITS</span><span class="pill">MODULE → UNIT → ARTICLE → CHAPTER → CARD</span><span class="pill">${units.reduce((sum, unit) => sum + (unit.chapters || []).length, 0)} CHAPTERS</span></div></div><div aria-hidden="true" style="font-size:48px;align-self:center">∑</div></section><div class="module1-layout"><aside class="module1-unit-nav"><strong>MODULE 1 · UNITS</strong><div id="module1UnitNav"></div></aside><section id="module1Article" class="module1-article"><p class="empty">正在載入文章……</p></section></div>`;
    const nav = $('#module1UnitNav'); const article = $('#module1Article');
    const show = (unit, button) => {
      $$('.module1-unit-button.active', nav).forEach((node) => node.classList.remove('active')); if (button) button.classList.add('active');
      const chapters = unit.chapters || []; const cards = unit.learningCards || [];
      const toc = chapters.map((chapter) => `<a href="#${unit.id}-${chapter.id}">${escapeHtml(chapter.title)}</a>`).join('');
      const formulaMarkup = unit.formulas && unit.formulas.length ? `<section class="formula-panel"><h4>公式與推導線索 · ${unit.formulas.length} 條</h4>${unit.formulas.map((formula) => `<div class="formula-block">${escapeHtml(formula)}</div>`).join('')}</section>` : `<div class="module1-source-note">本單元原始文字沒有可可靠擷取成獨立公式的行；正文與原 PDF 仍完整保留。</div>`;
      const related = unit.formulaFigures || []; const allFigures = unit.figures || []; const otherFigures = allFigures.filter((item) => !related.some((figure) => figure.path === item.path));
      const relatedMarkup = related.length ? `<section><h3 id="${unit.id}-figures">公式與概念圖</h3><div class="figure-strip">${related.map((item) => module1Figure(item, true)).join('')}</div></section>` : '';
      const allFiguresMarkup = allFigures.length ? `<details class="module1-details" open><summary>查看本單元全部 PNG／圖像（${allFigures.length} 張）</summary><div class="figure-strip">${allFigures.map((item) => module1Figure(item, related.some((figure) => figure.path === item.path))).join('')}</div></details>` : '';
      const chaptersMarkup = chapters.map((chapter, index) => { const card = cards[index] || {}; return `<section class="module1-chapter" id="${unit.id}-${chapter.id}"><h3>${escapeHtml(chapter.title)}</h3><div class="chapter-body">${articleParagraphs(chapter.body)}</div><aside class="chapter-card"><h4>✦ ${escapeHtml(card.title || '學習卡')}</h4><p><span class="card-label">必記</span>${escapeHtml(card.takeaway || '')}</p><p><span class="card-label">例子</span>${escapeHtml(card.example || '')}</p><p><span class="card-label">自測</span>${escapeHtml(card.selfCheck || '')}</p></aside></section>`; }).join('');
      const originalMarkup = unit.article && unit.article.text ? `<details class="module1-details"><summary>原始 TXT／逐字稿全文（${unit.article.characterCount || 0} 字元）</summary><div class="chapter-body">${articleParagraphs(unit.article.text)}</div></details>` : '';
      const supplementMarkup = (unit.docxSupplements || []).map((item) => `<details class="module1-details"><summary>DOCX 補充全文：${escapeHtml(item.title)}（${item.paragraphCount || 0} 段）</summary><div class="chapter-body">${articleParagraphs(item.text)}</div><p class="article-source">來源：${escapeHtml(item.sourcePath || '')}</p></details>`).join('');
      const pdfMarkup = unit.pdf ? `<details class="module1-details"><summary>原始 PDF：${escapeHtml(unit.pdf.name)}（${(unit.pdf.pages || []).length || '原始'} 頁）</summary>${unit.pdf.duplicateOf ? `<div class="module1-source-note">資料品質提示：這份 PDF 與另一份 Module 1 PDF 的檔案內容相同（SHA-256 相同）。本文正文採用本單元 TXT／DOCX 內容，避免四個數學單元互相錯配。</div>` : ''}<iframe class="pdf-frame" title="${escapeHtml(unit.pdf.name)}" src="/api/source-file?path=${encodeURIComponent(unit.pdf.path)}"></iframe><p class="article-source">來源：${escapeHtml(unit.pdf.path || '')}</p></details>` : '';
      const summary = chapters[0] ? chapters[0].body : unit.summary;
      article.innerHTML = `<header class="module1-article-header"><div class="module1-breadcrumb">${escapeHtml(unit.framework || 'MODULE 1')} · UNIT · ARTICLE</div><h2>${escapeHtml(unit.title)}</h2><p class="module1-article-summary">${escapeHtml(summary || '')}</p><div class="module1-meta"><span class="pill">${chapters.length} CHAPTERS</span><span class="pill">${(unit.formulas || []).length} FORMULAS</span><span class="pill">${allFigures.length} FIGURES</span><span class="pill">${(unit.docxSupplements || []).length} DOCX</span></div></header><div class="module1-reading-grid"><div class="module1-content">${formulaMarkup}${chaptersMarkup}${relatedMarkup}${allFiguresMarkup}${originalMarkup}${supplementMarkup}${pdfMarkup}</div><aside class="module1-toc"><strong>ON THIS ARTICLE</strong>${toc}${related.length ? `<a href="#${unit.id}-figures">公式與概念圖</a>` : ''}</aside></div>`;
      article.scrollIntoView({ block: 'start', behavior: 'smooth' });
    };
    units.forEach((unit) => { const button = document.createElement('button'); button.type = 'button'; button.className = 'module1-unit-button'; button.innerHTML = `${escapeHtml(unit.title)}<small>${escapeHtml(unit.framework || '')} · ${(unit.chapters || []).length} chapters</small>`; button.addEventListener('click', () => { openModule1(unit.id); }); nav.appendChild(button); if (selected && unit.id === selected.id) show(unit, button); });
  }

  const module1Flow = [
    ['Overview', '這一課要學會什麼，以及它在 Data Science 路徑中的位置。'],
    ['Intuition', '先用直覺理解問題，再進入符號與公式。'],
    ['Visual', '用圖像看見資料、模型或公式正在描述的關係。'],
    ['Formula', '把核心公式獨立出來，並說明每個變數。'],
    ['Formula breakdown', '逐步拆解公式，避免只背一整行符號。'],
    ['Worked example', '用具體數字或情境，把概念走完一次。'],
    ['Python', '把概念放進可重跑的資料科學程式流程。'],
    ['Output', '讀懂輸出、圖表與指標，而不是只看分數。'],
    ['Common mistakes', '辨認最容易造成錯誤解讀的地方。'],
    ['Quick quiz', '用一題低負擔檢查自己是否真的理解。'],
    ['Summary', '把本課的 Learning Cards 收束成下一步。'],
  ];

  function courseOutlineMarkup(course, units, moduleNumber) {
    const sourceUnits = new Set(units.map((unit) => unit.title));
    const sections = (course && course.sections) || [];
    return `<details class="course-outline" open><summary>Module ${moduleNumber} · ${escapeHtml(course?.unit?.title || course?.title || '')} · 課程順序</summary>${sections.map((section) => `<section class="outline-section"><div class="outline-section-title">${escapeHtml(section.title)}</div>${(section.items || []).map((item) => { const sourceUnit = (item.sourceUnit || '').trim(); const available = sourceUnit && sourceUnits.has(sourceUnit); const label = item.title || sourceUnit; return `<div class="outline-item ${available ? '' : 'missing'}"><span class="outline-status"></span>${available ? `<button type="button" data-outline-unit="${escapeHtml(sourceUnit)}">${escapeHtml(label)}</button>` : `<span>${escapeHtml(label)}</span>`}<span class="outline-type">${escapeHtml(item.type || (available ? 'article' : 'planned'))}</span></div>`; }).join('')}</section>`).join('')}</details>`;
  }

  function flowVariableTable(unit) {
    const title = unit.title.toLowerCase();
    const rows = title.includes('calculus') ? [['x', '輸入或參數所在的位置'], ['y / ŷ', '真實值與模型預測'], ['L', '衡量預測錯誤的損失'], ['η', '每次更新的 learning rate'], ['∇L', '多個參數方向的梯度']] : title.includes('linear algebra') ? [['X', '樣本 × 特徵的資料矩陣'], ['β', '模型要學習的權重'], ['ŷ', '模型產生的預測'], ['i, j', 'row 與 column 的索引']] : title.includes('probability') ? [['P(A)', '事件 A 發生的機率'], ['E[X]', '隨機變數的期望值'], ['μ', '分布的平均中心'], ['σ', '分布的標準差'], ['P(A|B)', '已知 B 後 A 的條件機率']] : [['X', '模型可使用的輸入特徵'], ['y', '希望預測的目標'], ['ŷ', '模型輸出的預測'], ['metric', '用來評估表現的指標']];
    return `<table class="variable-table"><thead><tr><th>符號</th><th>在本課代表什麼</th></tr></thead><tbody>${rows.map((row) => `<tr><td><strong>${escapeHtml(row[0])}</strong></td><td>${escapeHtml(row[1])}</td></tr>`).join('')}</tbody></table>`;
  }

  function module1Code(unit) {
    const title = unit.title.toLowerCase();
    if (title.includes('calculus')) return `# one gradient-descent update\nloss = loss_fn(y_true, y_pred)\ngradient = compute_gradient(loss, parameters)\nparameters = parameters - learning_rate * gradient`;
    if (title.includes('linear algebra')) return `import numpy as np\n\n# X: samples × features, beta: feature weights\ny_hat = X @ beta\nprint(y_hat.shape)`;
    if (title.includes('probability')) return `import numpy as np\n\nvalues = np.array([0, 1, 1, 0, 1])\nprobability = values.mean()\nprint(probability)`;
    return `# keep the learning workflow explicit\nX_train, X_test, y_train, y_test = split_data(X, y)\nmodel.fit(X_train, y_train)\nreport(model, X_test, y_test)`;
  }

  async function renderModule1V2() {
    title.textContent = 'Module 1 · Data Science Foundations';
    document.body.classList.add('module1-active');
    const data = await api('/api/module1'); const units = data.units || [];
    const selected = units.find((unit) => unit.id === state.route.unit) || units[0];
    const side = $('#module1Side');
    side.className = 'module1-side'; side.innerHTML = `<div class="module1-side-title">MODULE 1 · UNITS</div>`;
    app.innerHTML = `<section class="hero module1-hero"><div><span class="pill">MODULE 1 · STUDY WORKSPACE</span><h2>把 Data Science 變成一條可學、可練、可回看的路徑。</h2><p>按照 Overview → Intuition → Visual → Formula → Example → Python → Quiz 的學習流閱讀；整理後內容與必要圖像放在同一篇文章。</p><div class="module1-meta"><span class="pill">${units.length} ARTICLES</span><span class="pill">11-STEP LESSON FLOW</span><span class="pill">STATIC NOTES</span></div></div><div aria-hidden="true" style="font-size:48px;align-self:center">⌘</div></section>${courseOutlineMarkup(data.courseOrder, units, 1)}<div class="module1-workspace"><article id="module1Article" class="module1-article"><p class="empty">正在載入文章……</p></article><aside class="context-rail"><div class="context-tabs"><button type="button" class="active" data-context="steps">Steps</button><button type="button" data-context="tutor">✦ Tutor</button></div><div id="flowRail" class="flow-rail"></div><div id="tutorPanel" class="tutor-panel"><h3>✦ AI Tutor</h3><p class="tutor-intro">目前 Tutor 會帶入你所在的 Unit、Chapter 和 Flow step；之後可接到 ChatGPT／Grok／Gemini connector。</p><div class="tutor-prompt">Context-aware prompt<br><strong id="tutorContext">選擇一個 step 開始</strong></div><div class="tutor-actions"><button type="button">用初學者方式解釋</button><button type="button">給我一個數字例子</button><button type="button">考我這一節</button></div></div></aside></div>`;
    const article = $('#module1Article'); const rail = $('#flowRail'); const tutor = $('#tutorPanel');
    side.querySelector('.module1-side-title').insertAdjacentHTML('afterend', units.map((unit) => `<button type="button" data-module-unit="${escapeHtml(unit.id)}">${escapeHtml(unit.title)}<small>${escapeHtml(unit.framework || '')} · ${(unit.chapters || []).length} chapters</small></button>`).join(''));
    side.querySelectorAll('[data-module-unit]').forEach((button) => button.addEventListener('click', () => openModule1(button.dataset.moduleUnit)));
    app.querySelectorAll('[data-outline-unit]').forEach((button) => button.addEventListener('click', () => openModule1(button.dataset.outlineUnit)));
    const selectUnit = (unit) => {
      side.querySelectorAll('[data-module-unit]').forEach((button) => button.classList.toggle('active', button.dataset.moduleUnit === unit.id));
      const chapters = unit.chapters || []; const cards = unit.learningCards || []; const formulaList = unit.formulas || []; const figures = unit.figures || []; const related = unit.formulaFigures || [];
      const sourceChapter = (index) => chapters[index % Math.max(chapters.length, 1)]?.body || unit.summary || '';
      const figureMarkup = (items, label) => items.length ? `<div class="flow-figure-label">${label}</div><div class="figure-strip">${items.map((item) => module1Figure(item, related.some((figure) => figure.path === item.path))).join('')}</div>` : `<div class="module1-source-note">本單元沒有可對應的 PNG；請使用下方原始 PDF／TXT 來源核對。</div>`;
      const formulaMarkup = formulaList.length ? `<div class="formula-panel"><h4>核心公式 · ${formulaList.length} 條</h4>${formulaList.slice(0, 10).map((formula) => `<div class="formula-block">${escapeHtml(formula)}</div>`).join('')}</div>${flowVariableTable(unit)}` : `<div class="module1-source-note">本單元主要是概念與流程，沒有需要獨立排版的核心公式。</div>`;
      const breakdown = formulaList.slice(0, 4).map((formula, index) => `<div class="chapter-card"><h4>Step ${index + 1} · 讀懂這條公式</h4><p><span class="card-label">公式</span>${escapeHtml(formula)}</p><p><span class="card-label">問自己</span>這條公式的輸入、輸出，以及每個符號在目前問題中扮演什麼角色？</p></div>`).join('') || `<div class="chapter-card"><h4>Step 1 · 讀懂概念</h4><p><span class="card-label">問自己</span>我能不能用一句話說明這個 Unit 的輸入、處理和輸出？</p></div>`;
      const worked = cards[0] ? `<div class="chapter-card"><h4>✦ ${escapeHtml(cards[0].title || 'Worked example')}</h4><p><span class="card-label">情境</span>${escapeHtml(cards[0].example || '')}</p><p><span class="card-label">做法</span>先寫出已知值，再選擇本課公式／流程，最後檢查結果的尺度與意義。</p></div>` : '';
      const mistakes = ['把 training score 當成 unseen data 的表現。', '只看公式結果，不檢查輸入的尺度、shape 或單位。', '看到模型輸出就直接下結論，沒有回到資料與評估設計。'];
      const quiz = `<div class="quiz-card"><strong>快速檢查：${escapeHtml(chapters[0]?.title || unit.title)} 最重要的第一步是什麼？</strong><button type="button" data-quiz="wrong">只挑最複雜的模型</button><button type="button" data-quiz="right">先說清楚資料、目標與評估方式</button><p class="quiz-feedback" hidden></p></div>`;
      const stepContents = [
        `<p>${escapeHtml(unit.summary || sourceChapter(0))}</p><div class="chapter-card"><h4>本課完成標準</h4><p>讀完正文、看懂公式／圖、完成一個例子，最後用 Quick Quiz 檢查自己。</p></div>`,
        `<p>${escapeHtml(sourceChapter(1))}</p>`,
        figureMarkup(related.length ? related : figures.slice(0, 3), 'VISUAL EXPLANATION'),
        formulaMarkup,
        breakdown,
        worked || `<p>${escapeHtml(sourceChapter(2))}</p>`,
        `<div class="code-cell"><div class="cell-head">Python · learning workflow</div><pre>${escapeHtml(module1Code(unit))}</pre></div><p>這個 code cell 先展示概念如何落地；正式執行環境會在同一位置顯示 output。</p>`,
        `<div class="output-cell">Output interpretation\n────────────────────\n先確認 shape、尺度與錯誤指標，再解讀模型表現。\n\n目前：這是教材中的預期讀圖／讀輸出提示，不冒充一次實際執行結果。</div>`,
        `<div class="figure-strip" style="display:block">${mistakes.map((mistake, index) => `<div class="chapter-card" style="margin:10px 0"><h4>⚠ 常見錯誤 ${index + 1}</h4><p>${escapeHtml(mistake)}</p><p><span class="card-label">修正</span>回到本課的資料定義、公式變數表或 validation step 重新檢查。</p></div>`).join('')}</div>`,
        quiz,
        `<div class="summary-deck">${cards.map((card) => `<aside class="chapter-card"><h4>✦ ${escapeHtml(card.title || 'Learning Card')}</h4><p><span class="card-label">必記</span>${escapeHtml(card.takeaway || '')}</p><p><span class="card-label">例子</span>${escapeHtml(card.example || '')}</p><p><span class="card-label">自測</span>${escapeHtml(card.selfCheck || '')}</p></aside>`).join('')}</div>`,
      ];
      const flowMarkup = module1Flow.map((step, index) => `<section class="flow-step" id="${unit.id}-flow-${index + 1}"><div class="flow-step-kicker">${String(index + 1).padStart(2, '0')} · ${escapeHtml(step[0])}</div><h3>${escapeHtml(step[0])}</h3><p class="flow-description">${escapeHtml(step[1])}</p>${stepContents[index]}</section>`).join('');
      const chapterMap = chapters.length ? `<details class="module1-details"><summary>Chapter map · ${chapters.length} chapters / ${cards.length} cards</summary>${chapters.map((chapter, index) => `<div class="chapter-card"><h4>${escapeHtml(chapter.title)}</h4><p><span class="card-label">Learning Card</span>${escapeHtml(cards[index]?.takeaway || '')}</p><p><span class="card-label">例子</span>${escapeHtml(cards[index]?.example || '')}</p></div>`).join('')}</details>` : '';
      const allFiguresMarkup = figures.length > 3 ? `<details class="module1-details" open><summary>本單元全部 PNG／圖像（${figures.length} 張）</summary>${figureMarkup(figures, 'ALL SOURCE FIGURES')}</details>` : '';
      const original = unit.article?.text ? `<details class="module1-details"><summary>原始 TXT／逐字稿全文（${unit.article.characterCount || 0} 字元）</summary><div class="chapter-body">${articleParagraphs(unit.article.text)}</div></details>` : '';
      const docs = (unit.docxSupplements || []).map((item) => `<details class="module1-details"><summary>DOCX 補充全文：${escapeHtml(item.title)}（${item.paragraphCount || 0} 段）</summary><div class="chapter-body">${articleParagraphs(item.text)}</div><p class="article-source">來源：${escapeHtml(item.sourcePath || '')}</p></details>`).join('');
      const pdf = unit.pdf ? `<details class="module1-details"><summary>原始 PDF：${escapeHtml(unit.pdf.name)}（${(unit.pdf.pages || []).length || '原始'} 頁）</summary>${unit.pdf.duplicateOf ? `<div class="module1-source-note">來源提示：這份 PDF 與另一份 Module 1 PDF 內容相同；本文以本單元的 TXT／DOCX 作為教學正文。</div>` : ''}<iframe class="pdf-frame" title="${escapeHtml(unit.pdf.name)}" src="/api/source-file?path=${encodeURIComponent(unit.pdf.path)}"></iframe><p class="article-source">來源：${escapeHtml(unit.pdf.path || '')}</p></details>` : '';
      article.innerHTML = `<div class="module1-article-header"><div class="module1-breadcrumb">${escapeHtml(unit.framework || 'MODULE 1')} · UNIT · ARTICLE</div><h2>${escapeHtml(unit.title)}</h2><p class="module1-article-summary">${escapeHtml(chapters[0]?.body || unit.summary || '')}</p><div class="module1-meta"><span class="pill">${chapters.length} CHAPTERS</span><span class="pill">${formulaList.length} FORMULAS</span><span class="pill">${figures.length} FIGURES</span><span class="pill">${docs ? 'DOCX' : 'SOURCE'}</span></div></div><div class="flow-progress" aria-label="Lesson progress">${module1Flow.map((_, index) => `<span class="${index === 0 ? 'current' : ''}" title="${module1Flow[index][0]}"></span>`).join('')}</div><div class="module1-content">${flowMarkup}${allFiguresMarkup}${chapterMap}${original}${docs}${pdf}</div>`;
      rail.innerHTML = module1Flow.map((step, index) => `<button type="button" data-flow="${index + 1}" class="${index === 0 ? 'active' : ''}"><span>${String(index + 1).padStart(2, '0')}</span>${escapeHtml(step[0])}</button>`).join('');
      rail.querySelectorAll('[data-flow]').forEach((button) => button.addEventListener('click', () => { document.getElementById(`${unit.id}-flow-${button.dataset.flow}`).scrollIntoView({ behavior: 'smooth', block: 'start' }); $('#tutorContext').textContent = `${unit.title} · ${module1Flow[Number(button.dataset.flow) - 1][0]}`; }));
      article.querySelectorAll('[data-quiz]').forEach((button) => button.addEventListener('click', () => { const feedback = button.parentElement.querySelector('.quiz-feedback'); feedback.hidden = false; feedback.textContent = button.dataset.quiz === 'right' ? '✓ 正確：先定義資料與目標，才知道模型是否真的有用。' : '再想一步：模型複雜度不能取代清楚的問題定義。'; }));
    };
    document.querySelectorAll('.context-tabs button').forEach((button) => button.addEventListener('click', () => { document.querySelectorAll('.context-tabs button').forEach((node) => node.classList.remove('active')); button.classList.add('active'); const isTutor = button.dataset.context === 'tutor'; rail.style.display = isTutor ? 'none' : 'grid'; tutor.classList.toggle('open', isTutor); }));
    units.forEach((unit) => { if (selected && unit.id === selected.id) selectUnit(unit); });
  }

  async function renderModule2() {
    title.textContent = 'Module 2 · Linear Regression';
    const data = await api('/api/module2');
    const articles = data.articles || [];
    const units = Array.from(new Map(articles.map((article) => [article.unit, { title: article.unit }])).values());
    const articleCards = articles.map((article) => `<article class="module2-article-card"><p class="eyebrow">${String(article.courseOrder || '').padStart(2, '0')} · ${escapeHtml(article.courseSection || '')} · ${escapeHtml(article.contentKind || 'SOURCE')}</p><h3>${escapeHtml(article.title)}</h3><p>${article.paragraphCount || 0} 段 · ${article.sections?.length || 0} 個可閱讀章節 · ${article.visuals?.length || 0} 張相關 PNG</p><button type="button" data-source-id="${escapeHtml(article.id)}">在網站閱讀全文 →</button></article>`).join('');
    app.innerHTML = `<section class="hero module1-hero"><div><span class="pill">MODULE 2 · STUDY WORKSPACE</span><h2>Linear Regression for Prediction &amp; Inference</h2><p>依課程順序：先建立 simple regression，再進入 fit、least squares、multiple regression，最後做 diagnostics、flexibility 與 results interpretation。</p><div class="module1-meta"><span class="pill">${articles.length} CURATED ARTICLES</span><span class="pill">UNIT 2</span><span class="pill">STATIC NOTES</span></div></div><div aria-hidden="true" style="font-size:48px;align-self:center">β</div></section>${courseOutlineMarkup(data.courseOrder, units, 2)}<section class="module2-article-list"><div class="eyebrow">ARTICLE INDEX · FULL TEXT AVAILABLE</div>${articleCards}</section>`;
    app.querySelectorAll('[data-source-id]').forEach((button) => button.addEventListener('click', () => setHash(`#sources/${encodeURIComponent(button.dataset.sourceId)}`)));
  }

  async function copyPrompt(unit, lesson) {
    const term = lesson ? lesson.title : unit.title;
    const prompt = `我正在學習「${unit.title}」。\n\n單元：${unit.slug}\n術語：${term}\n問題：我不明白這一課，請用直覺、簡單例子和逐步推導解釋，並先問我卡在哪一步。`;
    try { await navigator.clipboard.writeText(prompt); } catch {
      const area = document.createElement('textarea'); area.value = prompt; area.style.position = 'fixed'; area.style.opacity = '0'; document.body.appendChild(area); area.select(); document.execCommand('copy'); area.remove();
    }
    const notice = $('#promptNotice', app); notice.hidden = false; setTimeout(() => { notice.hidden = true; }, 3000);
  }

  async function render() {
    state.route = parseHash();
    document.body.classList.toggle('module1-active', state.route.page === 'module1');
    const module1Side = $('#module1Side'); if (module1Side && state.route.page !== 'module1') module1Side.innerHTML = '';
    $$('.active', document).forEach((node) => node.classList.remove('active'));
    const navFilter = state.route.page === 'home' ? state.route.filter : state.route.page;
    const navButton = navFilter && document.querySelector(`[data-route="${CSS.escape(navFilter)}"]`); if (navButton) navButton.classList.add('active');
    if (state.route.page === 'home' && state.route.filter === 'path') { renderFramework(); return; }
    if (state.route.page === 'home') { renderHome(); return; }
    if (state.route.page === 'big-picture') { try { await renderBigPicture(); } catch (error) { app.innerHTML = `<p class="empty">無法載入 Big Picture：${escapeHtml(error.message)}</p>`; } return; }
    if (state.route.page === 'glossary') { try { await renderGlossary(); } catch (error) { app.innerHTML = `<p class="empty">無法載入 Glossary：${escapeHtml(error.message)}</p>`; } return; }
    if (state.route.page === 'topics') { try { await renderTopics(); } catch (error) { app.innerHTML = `<p class="empty">無法載入 Topics：${escapeHtml(error.message)}</p>`; } return; }
    if (state.route.page === 'search') { try { await renderSearch(); } catch (error) { app.innerHTML = `<p class="empty">搜尋服務暫時不可用：${escapeHtml(error.message)}</p>`; } return; }
    if (state.route.page === 'sources') { await renderSources(); return; }
    if (state.route.page === 'module1') { try { await renderModule1V2(); } catch (error) { app.innerHTML = `<p class="empty">無法載入 Module 1：${escapeHtml(error.message)}</p>`; } return; }
    if (state.route.page === 'module2') { try { await renderModule2(); } catch (error) { app.innerHTML = `<p class="empty">無法載入 Module 2：${escapeHtml(error.message)}</p>`; } return; }
    try { const unit = await ensureUnit(state.route.slug); unit.routeLesson = state.route.lesson; renderUnit(unit); }
    catch (error) { app.innerHTML = `<p class="empty">無法載入單元：${escapeHtml(error.message)}</p>`; }
  }

  async function init() {
    try {
      const [catalog, progress, topicData] = await Promise.all([api('/api/catalog'), api('/api/progress'), api('/api/topics')]);
      state.catalog = catalog; state.progress = progress; state.topics = topicData.topics || [];
    }
    catch (error) { app.innerHTML = `<p class="empty">無法載入學習資料：${escapeHtml(error.message)}</p>`; return; }
    state.catalog.forEach((unit) => { state.units[unit.slug] = unit; });
    if (!document.querySelector('#module1Side')) { const module1Side = document.createElement('div'); module1Side.id = 'module1Side'; document.querySelector('aside').insertBefore(module1Side, document.querySelector('aside .local')); }
    search.addEventListener('input', (event) => { state.query = event.target.value.trim(); });
    search.addEventListener('keydown', (event) => { if (event.key === 'Enter') { event.preventDefault(); openSearch(search.value); } });
    $('#searchForm').addEventListener('submit', (event) => { event.preventDefault(); openSearch(search.value); });
    const module1Link = document.createElement('button'); module1Link.type = 'button'; module1Link.dataset.route = 'module1'; module1Link.textContent = 'Module 1 · Foundations'; document.querySelector('nav').appendChild(module1Link);
    const module2Link = document.createElement('button'); module2Link.type = 'button'; module2Link.dataset.route = 'module2'; module2Link.textContent = 'Module 2 · Regression'; document.querySelector('nav').appendChild(module2Link);
    const sourceLink = document.createElement('button'); sourceLink.type = 'button'; sourceLink.dataset.route = 'sources'; sourceLink.textContent = 'Source Library'; document.querySelector('nav').appendChild(sourceLink);
    $$('nav [data-route]').forEach((button) => button.addEventListener('click', () => setHash(`#${button.dataset.route}`)));
    window.addEventListener('hashchange', render); render();
  }
  init();
})();
