/* Maison SK — shared behaviour: header, nav, reveal, carousel,
   lightbox, EN/FR toggle (uses data-fr attributes), demo form. */

(function () {
  "use strict";

  var doc = document;

  /* ---------- Header scroll state ---------- */
  var header = doc.querySelector(".header");
  var alwaysSolid = header && header.hasAttribute("data-solid");
  function onScroll() {
    if (!header) return;
    header.classList.toggle("header--solid", alwaysSolid || window.scrollY > 40);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile nav ---------- */
  var burger = doc.querySelector(".burger");
  if (burger) {
    burger.addEventListener("click", function () {
      var open = doc.body.classList.toggle("nav-open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
      doc.body.style.overflow = open ? "hidden" : "";
    });
    doc.querySelectorAll(".mobile-nav a").forEach(function (a) {
      a.addEventListener("click", function () {
        doc.body.classList.remove("nav-open");
        doc.body.style.overflow = "";
      });
    });
  }

  /* ---------- Reveal on scroll ---------- */
  var revealEls = doc.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- Testimonial carousel ---------- */
  var quotes = doc.querySelector(".quotes");
  if (quotes) {
    var slides = quotes.querySelectorAll(".quote");
    var dots = quotes.querySelectorAll(".quotes__dot");
    var idx = 0;
    var timer = null;

    function show(i) {
      idx = (i + slides.length) % slides.length;
      slides.forEach(function (s, n) { s.classList.toggle("active", n === idx); });
      dots.forEach(function (d, n) {
        d.classList.toggle("active", n === idx);
        d.setAttribute("aria-selected", n === idx ? "true" : "false");
      });
    }
    function auto() {
      stop();
      timer = setInterval(function () { show(idx + 1); }, 7000);
    }
    function stop() { if (timer) clearInterval(timer); }

    dots.forEach(function (d, n) {
      d.addEventListener("click", function () { show(n); auto(); });
    });
    quotes.addEventListener("mouseenter", stop);
    quotes.addEventListener("mouseleave", auto);
    show(0);
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) auto();
  }

  /* ---------- Lightbox ---------- */
  var gallery = doc.querySelectorAll(".masonry figure img");
  var lightbox = doc.querySelector(".lightbox");
  if (gallery.length && lightbox) {
    var lbImg = lightbox.querySelector("img");
    var lbCount = lightbox.querySelector(".lightbox__count");
    var current = 0;
    var lastFocus = null;

    function openLb(i) {
      current = (i + gallery.length) % gallery.length;
      var src = gallery[current].getAttribute("data-full") || gallery[current].src;
      lbImg.src = src;
      lbImg.alt = gallery[current].alt || "";
      if (lbCount) lbCount.textContent = (current + 1) + " / " + gallery.length;
      lightbox.classList.add("open");
      doc.body.style.overflow = "hidden";
      lastFocus = doc.activeElement;
      lightbox.querySelector(".lightbox__close").focus();
    }
    function closeLb() {
      lightbox.classList.remove("open");
      doc.body.style.overflow = "";
      if (lastFocus) lastFocus.focus();
    }

    gallery.forEach(function (img, i) {
      img.addEventListener("click", function () { openLb(i); });
      img.setAttribute("tabindex", "0");
      img.setAttribute("role", "button");
      img.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openLb(i); }
      });
    });
    lightbox.querySelector(".lightbox__close").addEventListener("click", closeLb);
    lightbox.querySelector(".lightbox__prev").addEventListener("click", function () { openLb(current - 1); });
    lightbox.querySelector(".lightbox__next").addEventListener("click", function () { openLb(current + 1); });
    lightbox.addEventListener("click", function (e) { if (e.target === lightbox) closeLb(); });
    doc.addEventListener("keydown", function (e) {
      if (!lightbox.classList.contains("open")) return;
      if (e.key === "Escape") closeLb();
      if (e.key === "ArrowLeft") openLb(current - 1);
      if (e.key === "ArrowRight") openLb(current + 1);
    });
  }

  /* ---------- Language toggle (EN default, FR via data-fr) ---------- */
  var LANG_KEY = "msk-lang";

  function applyLang(lang) {
    doc.documentElement.lang = lang;
    doc.querySelectorAll("[data-fr]").forEach(function (el) {
      if (!el.hasAttribute("data-en")) el.setAttribute("data-en", el.innerHTML);
      el.innerHTML = lang === "fr" ? el.getAttribute("data-fr") : el.getAttribute("data-en");
    });
    doc.querySelectorAll("[data-fr-placeholder]").forEach(function (el) {
      if (!el.hasAttribute("data-en-placeholder")) el.setAttribute("data-en-placeholder", el.getAttribute("placeholder") || "");
      el.setAttribute("placeholder", lang === "fr" ? el.getAttribute("data-fr-placeholder") : el.getAttribute("data-en-placeholder"));
    });
    doc.querySelectorAll("[data-fr-label]").forEach(function (el) {
      if (!el.hasAttribute("data-en-label")) el.setAttribute("data-en-label", el.getAttribute("aria-label") || "");
      el.setAttribute("aria-label", lang === "fr" ? el.getAttribute("data-fr-label") : el.getAttribute("data-en-label"));
    });
    var t = doc.documentElement.getAttribute(lang === "fr" ? "data-title-fr" : "data-title-en");
    if (t) doc.title = t;
    doc.querySelectorAll(".lang__btn").forEach(function (b) {
      b.setAttribute("aria-pressed", b.getAttribute("data-lang") === lang ? "true" : "false");
    });
    try { localStorage.setItem(LANG_KEY, lang); } catch (e) {}
  }

  doc.querySelectorAll(".lang__btn").forEach(function (b) {
    b.addEventListener("click", function () { applyLang(b.getAttribute("data-lang")); });
  });

  var saved = "en";
  try { saved = localStorage.getItem(LANG_KEY) || "en"; } catch (e) {}
  if (saved === "fr") applyLang("fr"); else applyLang("en");

  /* ---------- Demo form (no backend in this local prototype) ---------- */
  var form = doc.querySelector(".js-contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      form.closest(".form-card").classList.add("sent");
    });
  }

  /* ---------- Footer year is intentionally omitted (no invented copy) ---------- */
})();
