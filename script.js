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
     Internationalization (IT default in HTML, EN dictionary here)
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

  /* English strings, keyed to data-i18n attributes. HTML holds the Italian. */
  var EN = {
    "meta.title": "Andrea Palermo — Logistics Consulting & Project Management",
    "meta.description": "Andrea Palermo — logistics/IT project manager and process engineer. Process analysis, warehouse optimization, WMS/ERP integration and logistics automation for multinational key accounts.",
    "skip": "Skip to content",

    "nav.about": "About",
    "nav.services": "Services",
    "nav.experience": "Experience",
    "nav.cases": "Case studies",
    "nav.skills": "Skills",
    "nav.contact": "Contact",

    "hero.eyebrow": "Logistics Project Manager &middot; IT &middot; Process Engineer",
    "hero.title": 'I turn complex logistics processes into <span class="hero__accent">efficient architectures.</span>',
    "hero.lead": "Process analysis, warehouse optimization and integrated logistics, with a strong focus on mapping physical flows and translating them into scalable IT solutions for multinational key accounts.",
    "hero.cta": "Let's talk about your project",
    "hero.cv": "Download CV",
    "hero.stat1": "Years in integrated logistics",
    "hero.stat2": "Multinational key accounts",
    "hero.stat3": "sqm of warehouse managed",

    "about.eyebrow": "About",
    "about.title": "From the warehouse floor to process governance.",
    "about.p1": "I'm a logistics and IT project manager with a career built from the ground up: I started as a hybrid warehouse operator and data-entry clerk and, thanks to the trust I built with management, moved through every stage of the value chain — stock control, application development, invoicing, project management, launching a startup, key-client and supplier management — up to the role of PM with full decision-making autonomy.",
    "about.p2": "This path lets me speak the language of those working in the warehouse and of those designing the IT systems, bridging the gap between the physical flow and its digital representation. My approach is pragmatic and focused on solving operational problems.",
    "about.hl1": '<span class="about__hl-title">Selected network</span> A network of partners and suppliers enabling favourable rates and preferential logistics services.',
    "about.hl2": '<span class="about__hl-title">End-to-end automation</span> Design of IT interfaces for full logistics and e-commerce automation.',
    "about.hl3": '<span class="about__hl-title">Cross-cutting view</span> Experience across many product categories and the operational constraints each one brings.',
    "about.card.sub": "PM / Consultant / Process Engineer",
    "about.fact1.k": "Company",
    "about.fact2.k": "Since",
    "about.fact2.v": "November 2019",
    "about.fact3.k": "Focus",
    "about.fact3.v": "Integrated logistics &amp; IT",
    "about.fact4.k": "Languages",
    "about.fact4.v": "Italian, English (C1 &middot; EF SET)",
    "about.card.cta": "Contact me",

    "services.eyebrow": "Services",
    "services.title": "How I can add value.",
    "services.intro": "Consulting support that starts from the analysis of the physical process and reaches the IT solution, with the constant goal of cutting costs and increasing operational efficiency.",
    "svc1.t": "Process Mapping & Reengineering",
    "svc1.d": "Mapping of physical flows, time-and-motion analysis and process redesign to remove waste and bottlenecks.",
    "svc2.t": "WMS & ERP Integration",
    "svc2.d": "Interfacing between systems (SAP, AS400/IBM, Oracle) and e-commerce platforms via API and FTP/SFTP, for continuous and reliable data exchange.",
    "svc3.t": "Data Analysis & Business Intelligence",
    "svc3.d": "From historical data to decisions: analysis with SQL, Python and Power BI to make metrics and statistics available in real time.",
    "svc4.t": "Inventory Management",
    "svc4.d": "Management of batches, expiry dates and FEFO/FIFO logic, with accurate stock control even for critical categories such as food and medical.",
    "svc5.t": "KPI, SLA & ROI",
    "svc5.d": "Definition and monitoring of KPIs and SLAs, ROI calculation and cost control for strategic, scalable governance.",
    "svc6.t": "Project Management",
    "svc6.d": "Running projects with Agile, Waterfall, Hybrid and Prince2 methodologies, coordinating cross-functional teams from budget to go-live.",

    "exp.eyebrow": "Experience & Education",
    "exp.title": "A fast-rising career path.",
    "exp1.p": "Nov 2019 — Present",
    "exp1.r": "PM / Consultant / Process Engineer",
    "exp1.d": "A career built in-house: from warehouse operator/data entry to stock controller, Access developer, project and supplier management, key client and process engineering, up to Project Manager with decision-making autonomy.",
    "exp2.p": "Mar 2019 — Jul 2019",
    "exp2.r": "Metrology application internship",
    "exp2.d": "Experience in customer service, metrology application and data entry.",
    "exp3.p": "Sep 2017 — Jul 2019",
    "exp3.r": "ITS Aircraft Construction & Maintenance",
    "exp3.o": "Higher technical education",
    "exp3.d": "A strongly technical programme, with a pragmatic approach geared to solving operational problems.",
    "exp4.p": "Sep 2012 — Jul 2017",
    "exp4.r": "IT Technician Diploma",
    "exp4.o": "Technical diploma",
    "exp4.d": "Technical background focused on systems and data analysis.",

    "cases.eyebrow": "Case studies",
    "cases.title": "Real projects, concrete results.",
    "cases.intro": "A selection of projects delivered for multinational key accounts, where process analysis generated measurable efficiency.",
    "case1.tag": "E-commerce & Logistics",
    "case1.d": "Bringing e-commerce in-house while outsourcing logistics only. Analysis of historical data revealed an average basket of 10 items/order, handled with batch and expiry tracking in FEFO/FIFO logic and continuous WMS integration.",
    "case2.tag": "Integration & Cost",
    "case2.d": "An e-commerce built from scratch, avoiding the integration costs of SAP. Sales, VAT registration, logistics and delivery handled by Armonia Teklog: thousands of hours of data re-keying between Shopify and SAP saved.",
    "case3.tag": "B2B as B2C",
    "case3.d": "With Audes, dedicated \"corporate\" e-commerce stores for workwear at every site worldwide. Treating each shipment as a managed exception: 4 garments delivered to a BMW workshop in Azerbaijan in just 72 hours.",
    "case4.tag": "Data Platform",
    "case4.d": "Replaced dozens of Excel files with 2 bespoke applications and an in-cloud platform holding the entire database. A single autonomous manager over 300,000 sqm of warehouse, with metrics and statistics available instantly.",
    "case5.tag": "Flash Sales",
    "case5.d": "IT, logistics and operational management of flash-sale peaks (from 0 to 20,000 orders in a day) with a warehouse system easy to learn even for newly hired staff. The philosophy: manage the chaos, don't impose order.",
    "case6.tag": "Medical",
    "case6.d": "Interfacing with a rigid ERP and strict medical constraints (batches, expiry dates, serial numbers). In 6 weeks: documentation study, IT specifications, partial and full testing and go-live with no adjustments needed.",

    "skills.eyebrow": "Skills",
    "skills.title": "Tools and method.",
    "skills.g1": "Systems & Platforms",
    "skills.g2": "Development & Data",
    "skills.g3": "Integration",
    "skills.g4": "Method & Governance",
    "skills.office": "Advanced Office",
    "skills.autolog": "Logistics automation",

    "contact.eyebrow": "Contact",
    "contact.title": "Let's build your logistics together.",
    "contact.intro": "Whether it's optimizing a warehouse, integrating systems or launching a new e-commerce project, I'm available for an initial, no-obligation conversation.",
    "contact.phone": "Phone",
    "contact.cv.k": "Résumé",
    "contact.cv.v": "Download CV (PDF)",

    "footer.copy": "Andrea Palermo &middot; Logistics Consulting & Project Management"
  };

  var i18nEls = Array.prototype.slice.call(document.querySelectorAll("[data-i18n]"));
  var IT = {}; // cache of original Italian content

  i18nEls.forEach(function (el) {
    var key = el.getAttribute("data-i18n");
    var attr = el.getAttribute("data-i18n-attr");
    IT[key] = attr ? el.getAttribute(attr) : el.innerHTML;
  });

  var flagEl = document.getElementById("langFlag");
  var codeEl = document.getElementById("langCode");
  var switchBtn = document.getElementById("langSwitch");

  function applyLang(lang) {
    var dict = lang === "en" ? EN : IT;
    i18nEls.forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      var val = dict[key];
      if (val == null) return; // no translation → keep Italian
      var attr = el.getAttribute("data-i18n-attr");
      if (attr) el.setAttribute(attr, val);
      else el.innerHTML = val;
    });

    document.documentElement.setAttribute("lang", lang);

    // The button offers the OTHER language.
    var toEN = lang !== "en";
    flagEl.innerHTML = toEN ? FLAGS.gb : FLAGS.it;
    codeEl.textContent = toEN ? "EN" : "IT";
    switchBtn.setAttribute("aria-label", toEN ? "Switch to English" : "Passa all'italiano");

    try { localStorage.setItem("ap-lang", lang); } catch (e) {}
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
