---
name: i18n-architecture
description: How the bilingual (IT/EN) system works on the site — auto machine translation
metadata:
  type: project
---

The site is bilingual (IT default, EN via flag toggle in nav top-right). It uses **automatic machine translation** — the owner only ever edits Italian.

- **Italian** text is written directly in `index.html`, tagged `data-i18n="some.key"` (attributes also carry `data-i18n-attr="content"`, e.g. meta description). It's the default and no-JS/SEO fallback.
- **English** is generated at runtime in `script.js`: for each `data-i18n` element the Italian is machine-translated (Google's unofficial `translate.googleapis.com/translate_a/single` endpoint, MyMemory `api.mymemory.translated.net` as fallback) and **cached in localStorage keyed by the Italian source text** (`ap-tr-it-en`). Editing the Italian changes the source text → cache miss → auto re-translation. On API failure it falls back to showing Italian.
- **`OVERRIDES`** object in `script.js` (keyed by `data-i18n` key) holds hand-picked English for short/stable labels (nav, buttons, dates) where exact wording matters. Everything not in OVERRIDES auto-translates. To hand-fix a phrase, add its key to OVERRIDES.
- Both translation endpoints return `Access-Control-Allow-Origin: *`, so browser fetch from GitHub Pages works. Verified 2026-07-20.
- To clear a bad cached translation: browser console `localStorage.removeItem("ap-tr-it-en")` then reload.

Language choice persisted in `localStorage` key `ap-lang`; first visit auto-detects browser language.

Note: elements with inline emphasis were split into separate plain-text `data-i18n` spans (e.g. `hero.title.a`/`hero.title.b`, `about.hlN.t`/`about.hlN.b`) so machine translation never touches HTML tags.
