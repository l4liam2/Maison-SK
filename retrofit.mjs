// Idempotent upgrade pass over all English pages.
// Run: node retrofit.mjs
import { readFileSync, writeFileSync } from "node:fs";
import * as cheerio from "cheerio";

const PAGES = [
  "index.html", "services.html", "projects.html", "contact.html", "about.html",
  "grey-avenue.html", "avenue-laval.html", "avenue-ethier.html",
  "kitchen-renovation-montreal.html", "bathroom-renovation-montreal.html",
  "century-home-renovation-montreal.html",
];

const DESC_FR = {
  "index.html": "Maison SK est l’entrepreneur général de confiance pour la transformation de maisons centenaires et haut de gamme en chefs-d’œuvre. Agréée RBQ, basée à Montréal, Québec.",
  "services.html": "Nous sommes une entreprise générale de construction, basée à Montréal, Québec, agréée par la RBQ, et cautionnée par l’APCHQ. Un service clé en main du début à la fin.",
  "projects.html": "Découvrez notre portfolio de projets réalisés, qu’il s’agisse d’améliorations à petite échelle ou de transformations complètes.",
  "contact.html": "Intéressé par une collaboration ? Remplissez un formulaire et nous vous contacterons dans les plus brefs délais.",
  "about.html": "Entreprise générale de construction agréée RBQ, basée à Montréal, Québec, cautionnée par l’APCHQ — transformation de maisons centenaires et haut de gamme.",
  "grey-avenue.html": "De janvier à avril 2024, Maison SK s’est vu confier une cuisine complète et quatre salles de bains à réaménager.",
  "avenue-laval.html": "Sur l’avenue Laval, Maison SK et Cave Studio ont réimaginé la salle de bain de notre client pour en faire un havre de paix et de chaleur.",
  "avenue-ethier.html": "De juin à septembre 2024, Maison SK a complètement transformé cette maison — planchers chauffants, maison intelligente, nouvelle cuisine et salles de bains.",
  "kitchen-renovation-montreal.html": "Rénovation de cuisine sur mesure à Montréal par Maison SK, entrepreneur général agréé RBQ.",
  "bathroom-renovation-montreal.html": "Rénovation de salle de bains à Montréal par Maison SK — planchers chauffants, éléments encastrés et finitions soignées.",
  "century-home-renovation-montreal.html": "Rénovation de maisons centenaires à Montréal par Maison SK — préserver le charme, relever les défis uniques. Agréée RBQ.",
};

const dims = JSON.parse(readFileSync("assets/img/dims.json", "utf8"));
const hasVariant = (name) => !!dims[name.replace(/\.(jpg|png)$/, "-800.jpg")];

const ARROW = `<svg viewBox="0 0 24 10" aria-hidden="true"><path d="M0 5h22M18 1l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.3"/></svg>`;

for (const file of PAGES) {
  const $ = cheerio.load(readFileSync(file, "utf8"));

  // 1. Drop Google Fonts tags (fonts are self-hosted now)
  $('link[href*="fonts.googleapis.com"], link[href*="fonts.gstatic.com"]').remove();

  // 2. Font preloads (once)
  if (!$('link[rel="preload"][as="font"]').length) {
    $("head link[rel='stylesheet']").first().before(
      `<link rel="preload" as="font" type="font/woff2" href="assets/fonts/CormorantGaramond-500-normal-latin.woff2" crossorigin>\n` +
      `<link rel="preload" as="font" type="font/woff2" href="assets/fonts/Outfit-300-600-normal-latin.woff2" crossorigin>\n`);
  }

  // 3. Renamed PNG photos → JPG
  $("img").each((_, el) => {
    const src = $(el).attr("src") || "";
    if (/assets\/img\/al-\d+\.png$/.test(src)) $(el).attr("src", src.replace(/\.png$/, ".jpg"));
  });

  // 4. About nav link (desktop + mobile), before Contact
  const isAbout = file === "about.html";
  $("nav.nav, .mobile-nav nav").each((_, nav) => {
    const $nav = $(nav);
    if ($nav.find('a[href="about.html"]').length) return;
    const cls = $nav.is(".nav") ? "nav__link" : "mobile-nav__link";
    const cur = isAbout ? ' aria-current="page"' : "";
    $nav.find('a[href="contact.html"]').before(
      `<a class="${cls}" href="about.html"${cur} data-fr="À propos">About</a>\n`);
  });

  // 5. Footer: About link + landing-page links line
  const $flinks = $(".footer__grid ul").first();
  if ($flinks.length && !$flinks.find('a[href="about.html"]').length) {
    $flinks.find('a[href="contact.html"]').parent().before(
      `<li><a href="about.html" data-fr="À propos">About</a></li>\n`);
  }
  if (!$(".footer__seo").length) {
    $(".footer__bottom").before(
      `<p class="footer__seo" style="padding-top:2rem;font-size:.8rem;color:rgba(250,248,243,.45);display:flex;flex-wrap:wrap;gap:.4rem 1.6rem">` +
      `<a href="kitchen-renovation-montreal.html" data-fr="Rénovation de cuisine à Montréal">Kitchen renovation in Montreal</a>` +
      `<a href="bathroom-renovation-montreal.html" data-fr="Rénovation de salle de bains à Montréal">Bathroom renovation in Montreal</a>` +
      `<a href="century-home-renovation-montreal.html" data-fr="Rénovation de maison centenaire à Montréal">Century home renovation in Montreal</a></p>\n`);
  }

  // 6. Sticky mobile CTA (not on the contact page)
  if (file !== "contact.html" && !$(".sticky-cta").length) {
    $("footer.footer").after(
      `\n<a class="sticky-cta" href="contact.html"><span data-fr="Planifier une visite">Schedule a visit</span>${ARROW}</a>\n`);
  }

  // 7. hreflang alternates + lang metadata on <html>
  $('link[rel="alternate"][hreflang]').remove();
  $("head title").after(
    `\n<link rel="alternate" hreflang="en" href="${file}">` +
    `\n<link rel="alternate" hreflang="fr" href="fr/${file}">` +
    `\n<link rel="alternate" hreflang="x-default" href="${file}">`);
  $("html").attr("data-page-lang", "en").attr("data-alt-url", `fr/${file}`);
  if (DESC_FR[file]) $("html").attr("data-desc-fr", DESC_FR[file]);

  // 8. Responsive srcset + intrinsic dimensions
  $("img").each((_, el) => {
    const $el = $(el);
    const src = $el.attr("src") || "";
    const m = src.match(/^assets\/img\/([^/]+)$/);
    if (!m) return;
    const name = m[1];
    if (dims[name]) {
      const [w, h] = dims[name];
      $el.attr("width", w).attr("height", h);
    }
    if (/logo|icon/.test(name) || $el.attr("srcset")) return;
    if (hasVariant(name)) {
      const v800 = "assets/img/" + name.replace(/\.(jpg|png)$/, "-800.jpg");
      const fullW = dims[name] ? dims[name][0] : 1800;
      $el.attr("srcset", `${v800} 800w, ${src} ${fullW}w`);
      const inHero = $el.closest(".hero__media").length;
      const inMasonry = $el.closest(".masonry").length;
      const inCardGrid = $el.closest(".svc-grid, .svc-block, .proj-grid").length;
      $el.attr("sizes", inHero ? "100vw"
        : inMasonry ? "(max-width: 720px) 100vw, (max-width: 1020px) 50vw, 33vw"
        : inCardGrid ? "(max-width: 720px) 100vw, (max-width: 1020px) 50vw, 33vw"
        : "(max-width: 720px) 100vw, 55vw");
    }
  });

  writeFileSync(file, $.html());
  console.log("retrofitted", file);
}
