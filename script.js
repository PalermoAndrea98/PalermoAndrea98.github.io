/* Andrea Palermo — site interactions
   Lightweight, no dependencies. */
(function () {
  "use strict";

  var nav = document.getElementById("nav");
  var toggle = document.getElementById("navToggle");
  var links = document.getElementById("navLinks");

  /* --- Sticky nav background on scroll --- */
  function onScroll() {
    if (window.scrollY > 24) nav.classList.add("is-scrolled");
    else nav.classList.remove("is-scrolled");
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* --- Mobile menu --- */
  function closeMenu() {
    links.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  }
  function openMenu() {
    links.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
  }
  toggle.addEventListener("click", function () {
    if (links.classList.contains("is-open")) closeMenu();
    else openMenu();
  });
  links.addEventListener("click", function (e) {
    if (e.target.closest("a")) closeMenu();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeMenu();
  });

  /* --- Reveal on scroll --- */
  var revealTargets = document.querySelectorAll(
    ".section__head, .card, .case, .timeline__item, .skills__group, .about__text, .about__card, .contact__text, .contact__row, .hero__inner > *"
  );
  revealTargets.forEach(function (el) { el.classList.add("reveal"); });

  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    revealTargets.forEach(function (el) { io.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* --- Current year --- */
  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  /* ==========================================================
     Internationalization — Italian is written in the HTML.
     English is produced AUTOMATICALLY by machine translation
     and cached in the browser, keyed by the Italian source text
     (so editing the Italian re-translates it on its own).

     You normally never touch this file. Two exceptions:
       • OVERRIDES below — hand-picked English for short labels
         (nav, buttons, dates) where you want an exact wording.
         Keyed by the element's data-i18n value.
       • Clear a bad cached translation: in the browser console run
         localStorage.removeItem("ap-tr-it-en"); then reload.
     ========================================================== */

  var FLAGS = {
    it: '<svg viewBox="0 0 3 2" preserveAspectRatio="none"><rect width="1" height="2" x="0" fill="#008C45"/><rect width="1" height="2" x="1" fill="#F4F5F0"/><rect width="1" height="2" x="2" fill="#CD212A"/></svg>',
    gb: '<svg viewBox="0 0 60 30" preserveAspectRatio="none">' +
        '<clipPath id="ukc"><rect width="60" height="30"/></clipPath>' +
        '<g clip-path="url(#ukc)">' +
        '<rect width="60" height="30" fill="#012169"/>' +
        '<path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" stroke-width="6"/>' +
        '<path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" stroke-width="4" clip-path="url(#ukc)"/>' +
        '<path d="M30,0 V30 M0,15 H60" stroke="#fff" stroke-width="10"/>' +
        '<path d="M30,0 V30 M0,15 H60" stroke="#C8102E" stroke-width="6"/>' +
        '</g></svg>'
  };

  /* Hand-picked English for short/stable labels. Everything NOT listed
     here is translated automatically from the Italian in index.html. */
  var OVERRIDES = {
    "skip": "Skip to content",
    "meta.title": "Andrea Palermo — Logistics Consulting & Project Management",

    "nav.about": "About",
    "nav.services": "Services",
    "nav.experience": "Experience",
    "nav.cases": "Case studies",
    "nav.skills": "Skills",
    "nav.contact": "Contact",

    "hero.cv": "Download CV",
    "hero.stat3.v": "2.5M/yr",

    "about.eyebrow": "About",
    "about.card.cta": "Contact me",
    "about.fact2.v": "November 2019",

    "services.eyebrow": "Services",

    "exp.eyebrow": "Experience & Education",
    "exp1.p": "Nov 2019 — Present",
    "exp2.p": "Mar 2019 — Jul 2019",
    "exp3.p": "Sep 2017 — Jul 2019",
    "exp4.p": "Sep 2012 — Jul 2017",

    "cases.eyebrow": "Case studies",
    "skills.eyebrow": "Skills",

    "contact.eyebrow": "Contact",
    "contact.phone": "Phone",
    "contact.cv.k": "Résumé",
    "contact.cv.v": "Download CV (PDF)"
  };

  var i18nEls = Array.prototype.slice.call(document.querySelectorAll("[data-i18n]"));
  var IT = {}; // original Italian, read from the page

  i18nEls.forEach(function (el) {
    var key = el.getAttribute("data-i18n");
    var attr = el.getAttribute("data-i18n-attr");
    IT[key] = attr ? el.getAttribute(attr) : el.textContent.replace(/\s+/g, " ").trim();
  });

  /* --- Translation cache (localStorage), keyed by Italian source text --- */
  var CACHE_KEY = "ap-tr-it-en";
  var cache = {};
  try { cache = JSON.parse(localStorage.getItem(CACHE_KEY) || "{}") || {}; } catch (e) { cache = {}; }
  var saveTimer = null;
  function saveCacheSoon() {
    if (saveTimer) return;
    saveTimer = setTimeout(function () {
      saveTimer = null;
      try { localStorage.setItem(CACHE_KEY, JSON.stringify(cache)); } catch (e) {}
    }, 500);
  }

  /* --- Machine translation: Google (unofficial) with MyMemory fallback --- */
  function viaGoogle(text) {
    var url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=it&tl=en&dt=t&q=" +
      encodeURIComponent(text);
    return fetch(url).then(function (r) {
      if (!r.ok) throw new Error("google");
      return r.json();
    }).then(function (data) {
      if (!data || !data[0]) throw new Error("google-shape");
      return data[0].map(function (seg) { return seg[0]; }).join("");
    });
  }
  function viaMyMemory(text) {
    var url = "https://api.mymemory.translated.net/get?langpair=it|en&q=" + encodeURIComponent(text);
    return fetch(url).then(function (r) {
      if (!r.ok) throw new Error("mymemory");
      return r.json();
    }).then(function (data) {
      var t = data && data.responseData && data.responseData.translatedText;
      if (!t) throw new Error("mymemory-shape");
      return t;
    });
  }
  function translate(text) {
    return viaGoogle(text).catch(function () { return viaMyMemory(text); });
  }

  /* --- Apply a language to the page --- */
  var flagEl = document.getElementById("langFlag");
  var codeEl = document.getElementById("langCode");
  var switchBtn = document.getElementById("langSwitch");
  var applyToken = 0; // guards against out-of-order async updates

  function setEl(el, value) {
    var attr = el.getAttribute("data-i18n-attr");
    if (attr) el.setAttribute(attr, value);
    else el.textContent = value;
  }

  function applyLang(lang) {
    var isEN = lang === "en";
    var token = ++applyToken;
    document.documentElement.setAttribute("lang", lang);

    // Toggle button offers the OTHER language.
    flagEl.innerHTML = isEN ? FLAGS.it : FLAGS.gb;
    codeEl.textContent = isEN ? "IT" : "EN";
    switchBtn.setAttribute("aria-label", isEN ? "Passa all'italiano" : "Switch to English");
    try { localStorage.setItem("ap-lang", lang); } catch (e) {}

    i18nEls.forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      var src = IT[key];

      if (!isEN) { setEl(el, src); return; }              // back to Italian
      if (OVERRIDES[key] != null) { setEl(el, OVERRIDES[key]); return; }
      if (!src) return;
      if (cache[src] != null) { setEl(el, cache[src]); return; }

      // Not translated yet: keep Italian, fetch, then swap in.
      setEl(el, src);
      translate(src).then(function (en) {
        if (!en) return;
        cache[src] = en;
        saveCacheSoon();
        if (token === applyToken) setEl(el, en); // still on English, not superseded
      }).catch(function () { /* leave Italian on failure */ });
    });
  }

  var saved;
  try { saved = localStorage.getItem("ap-lang"); } catch (e) {}
  if (!saved) {
    saved = (navigator.language || "").toLowerCase().indexOf("it") === 0 ? "it" : "en";
  }
  applyLang(saved === "en" ? "en" : "it");

  switchBtn.addEventListener("click", function () {
    var current = document.documentElement.getAttribute("lang");
    applyLang(current === "en" ? "it" : "en");
  });
})();
