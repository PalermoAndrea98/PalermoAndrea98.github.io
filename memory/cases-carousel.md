---
name: cases-carousel
description: The "Casi studio" section is a marquee carousel fed by cases.csv
metadata:
  type: project
---

The "Casi studio" (`#cases`) section is a continuously-moving marquee carousel, NOT hand-written cards. Each item shows only a **company name** + a **macro-area label**.

- Content lives in **`cases.csv`** (root), a 2-column table: `Azienda,Area` (first row is a header, skipped). The owner maintains this file freely — edit/add/remove rows, no code changes needed.
- `script.js` fetches `cases.csv`, parses it (splits each row on the FIRST comma, so the Area column may contain commas), and builds the track with two identical copies for a seamless `translateX(-50%)` loop (paused on hover). Company names are shown as-is; **Area labels are auto-translated** to English via the shared translation cache (see [[i18n-architecture]]).
- CSS: `.carousel` / `.carousel__track` / `.carousel__item` in `style.css`. Right margin on items (not flex `gap`) keeps the loop seamless. Respects `prefers-reduced-motion` (becomes a plain scrollable row).
- **Caveat:** the carousel uses `fetch`, so opening `index.html` via `file://` leaves it empty. Local preview needs a server (`python -m http.server`); GitHub Pages works normally.
