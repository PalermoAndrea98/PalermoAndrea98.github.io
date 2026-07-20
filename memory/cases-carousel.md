---
name: cases-carousel
description: The "Casi studio" section is a marquee carousel; brand list hardcoded in script.js
metadata:
  type: project
---

The "Casi studio" (`#cases`) section is a continuously-moving marquee carousel, NOT hand-written cards. Each item shows only a **company name** + a **macro-area label**.

- The brand list is a **hardcoded `CASES` array in `script.js`** (inside the carousel IIFE, clearly marked ">>> MAINTAIN THE BRAND LIST HERE <<<"). Each row is `["Nome azienda", "Macro-area"]`. Edit/add/remove rows there. Company names show as-is; **area labels auto-translate** to English via the shared translation cache (see [[i18n-architecture]]).
- We originally used a `cases.csv` loaded via `fetch`, but that left the carousel empty when the page was opened as a local `file://` (browsers block file reads). Switched to a hardcoded array so it works everywhere (local, GitHub Pages) with no fetch. `cases.csv` was deleted.
- Build: `script.js` splits `CASES` across **two rows** (`#casesTrack1`, `#casesTrack2`) that scroll in opposite directions (row 2 uses `.carousel__track--rev` → `animation-direction: reverse`). Each track holds two identical copies for a seamless `translateX(-50%)` loop (paused on hover). Text is small and centered. CSS: `.carousel` / `.carousel__track` / `.carousel__item` in `style.css`; right margin on items (not flex `gap`) keeps the loop seamless. Respects `prefers-reduced-motion` (becomes plain scrollable rows).
