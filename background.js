/* Andrea Palermo — animated background
   Subtle, low-opacity floating particles on a fixed full-viewport canvas.
   Lightweight, no dependencies. Uses requestAnimationFrame, scales to the
   device pixel ratio, is responsive to resize, pauses when the tab is
   hidden, and respects prefers-reduced-motion. */
(function () {
  "use strict";

  var canvas = document.getElementById("bg-canvas");
  if (!canvas) return;
  var ctx = canvas.getContext("2d");
  if (!ctx) return;

  var reduceMotion = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Palette pulled from the site theme: teal, sky, soft white.
  var COLORS = ["rgba(79,209,197,", "rgba(56,189,248,", "rgba(226,232,243,"];

  var w = 0, h = 0, dpr = 1;
  var particles = [];
  var rafId = null;

  function rand(min, max) { return min + Math.random() * (max - min); }

  // ~1 particle per 15000 px², clamped for performance on any screen size.
  function targetCount() {
    return Math.max(22, Math.min(90, Math.round((w * h) / 15000)));
  }

  function makeParticle() {
    return {
      x: Math.random() * w,
      y: Math.random() * h,
      r: rand(0.6, 1.9),               // radius
      a: rand(0.10, 0.40),             // opacity
      c: COLORS[(Math.random() * COLORS.length) | 0],
      vx: rand(-0.11, 0.11),           // slow horizontal drift
      vy: rand(-0.20, -0.03)           // gentle upward drift
    };
  }

  function initParticles() {
    var n = targetCount();
    particles = [];
    for (var i = 0; i < n; i++) particles.push(makeParticle());
  }

  function resize() {
    w = window.innerWidth;
    h = window.innerHeight;
    dpr = Math.min(window.devicePixelRatio || 1, 2); // cap DPR for perf
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);          // draw in CSS pixels
    initParticles();
    if (reduceMotion) render(); // draw one static frame
  }

  function render() {
    ctx.clearRect(0, 0, w, h);
    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.c + p.a + ")";
      ctx.fill();
    }
  }

  function step() {
    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      // Wrap around the edges (small margin so they slip off, not pop).
      if (p.x < -6) p.x = w + 6; else if (p.x > w + 6) p.x = -6;
      if (p.y < -6) p.y = h + 6; else if (p.y > h + 6) p.y = -6;
    }
    render();
    rafId = requestAnimationFrame(step);
  }

  function start() {
    if (reduceMotion) { render(); return; }
    if (rafId === null) rafId = requestAnimationFrame(step);
  }
  function stop() {
    if (rafId !== null) { cancelAnimationFrame(rafId); rafId = null; }
  }

  // Responsive: recompute size + particle field on resize (debounced).
  var resizeTimer = null;
  window.addEventListener("resize", function () {
    if (resizeTimer) clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 150);
  }, { passive: true });

  // Save CPU when the tab isn't visible.
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) stop(); else start();
  });

  resize();
  start();
})();
