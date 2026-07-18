// One-off generator for the three SEO landing pages.
// Run: node gen-landing.mjs  (safe to re-run; overwrites the three files)
import { writeFileSync } from "node:fs";

const pages = [
  {
    file: "kitchen-renovation-montreal.html",
    titleEn: "Kitchen Renovation in Montreal — Maison SK",
    titleFr: "Rénovation de cuisine à Montréal — Maison SK",
    desc: "Custom kitchen renovation in Montreal by Maison SK, an RBQ-licensed general contractor. From counters and cabinets to high-end appliances and lighting.",
    service: "Kitchen renovation",
    h1En: "Kitchen renovation in Montreal", h1Fr: "Rénovation de cuisine à Montréal",
    hero: "svc-kitchen.jpg", heroAlt: "Custom kitchen renovation in Montreal by Maison SK",
    ledeEn: "From counters and cabinets to installation of high-end appliances and lighting, we will bring your kitchen design to life with stunning attention to detail.",
    ledeFr: "Des comptoirs et armoires, à l’installation d’appareils électroménagers et d’éclairages haut de gamme, nous donnerons vie à votre projet de cuisine en accordant une attention toute particulière aux détails.",
    introEn: "We design and build custom kitchens for century and high-end homes across Montreal.",
    introFr: "Nous concevons et réalisons des cuisines sur mesure pour des maisons centenaires et haut de gamme partout à Montréal.",
    bodyEn: "From raw materials to high-end appliances and custom finishings, we only source and install the best.",
    bodyFr: "Nous sélectionnons les meilleurs matériaux, effectuons des finitions sur mesure et proposons des solutions haut de gamme pour vos électroménagers.",
    splitImg: "ga-08.jpg", splitAlt: "Custom stone and millwork detail by Maison SK",
    proj: { href: "grey-avenue.html", img: "ga-02.jpg", alt: "Renovated kitchen on Grey Avenue with marble island and brass pendants",
      tEn: "Kitchen &amp; Bathrooms", tFr: "Cuisine et salle de bains", lEn: "on Grey Avenue", lFr: "sur l’avenue Grey",
      metaEn: "January – April 2024", metaFr: "Janvier – Avril 2024",
      pEn: "From January to April 2024, Maison SK was entrusted with a full kitchen and four bathrooms to remodel.",
      pFr: "De janvier à avril 2024, Maison SK s’est vu confier une cuisine complète et quatre salles de bains à réaménager." },
    quote: null,
  },
  {
    file: "bathroom-renovation-montreal.html",
    titleEn: "Bathroom Renovation in Montreal — Maison SK",
    titleFr: "Rénovation de salle de bains à Montréal — Maison SK",
    desc: "Bathroom renovation in Montreal by Maison SK, an RBQ-licensed general contractor. Heated floors, built-ins, and all the finishing touches.",
    service: "Bathroom renovation",
    h1En: "Bathroom renovation in Montreal", h1Fr: "Rénovation de salle de bains à Montréal",
    hero: "al-05.jpg", heroAlt: "Stone-clad bathroom renovation in Montreal by Maison SK",
    ledeEn: "Heated floors, built-ins, and all the finishing touches to make you feel right at home.",
    ledeFr: "Planchers chauffants, éléments encastrés et toutes les touches de finition pour un chez-soi parfait.",
    introEn: "We remodel bathrooms across Montreal — from powder rooms to spa-like master baths.",
    introFr: "Nous réaménageons des salles de bains partout à Montréal — de la salle d’eau à la salle de bains principale digne d’un spa.",
    bodyEn: "We excel at interior and exterior projects that require fine finishing and craftsmanship.",
    bodyFr: "Nous excellons dans les projets d’intérieur et d’extérieur qui nécessitent des finitions et un savoir-faire de qualité.",
    splitImg: "al-04.jpg", splitAlt: "Bathroom vanity with lit mirror by Maison SK",
    proj: { href: "avenue-laval.html", img: "al-01.jpg", alt: "Warm stone-clad bathroom on Avenue Laval",
      tEn: "Bathroom Remodel", tFr: "Remodelage de la salle de bains", lEn: "on Avenue Laval", lFr: "sur l’avenue Laval",
      metaEn: "November – December 2024", metaFr: "Novembre – Décembre 2024",
      pEn: "On Avenue Laval, from November to December 2024, Maison SK and Cave Studio (designer) re-imagined our client’s bathroom as a warm and grounding haven.",
      pFr: "Sur l’avenue Laval, de novembre à décembre 2024, Maison SK et Cave Studio (designer) ont réimaginé la salle de bain de notre client pour en faire un havre de paix et de chaleur." },
    quote: {
      en: "“Throughout the process they kept me up-to-date with the issues they encountered and always had an action plan that respected my budget. In the end, I have a worry-free bathroom that is built to code and looks amazing.”",
      fr: "« J’ai été tenu au courant des défis rencontrés tout au long du processus et ils m’ont proposé des solutions selon mon budget. Au final, j’ai une salle de bains impeccable, construite dans les règles de l’art et des plus remarquables. »",
      citeEn: "Bathroom renovation · Montreal", citeFr: "Rénovation de salle de bains · Montréal" },
  },
  {
    file: "century-home-renovation-montreal.html",
    titleEn: "Century Home Renovation in Montreal — Maison SK",
    titleFr: "Rénovation de maison centenaire à Montréal — Maison SK",
    desc: "Century home renovation in Montreal by Maison SK — specialists in transforming old Montreal buildings while preserving their charm. RBQ-licensed, CESGM-bonded.",
    service: "Century home renovation",
    h1En: "Century home renovation in Montreal", h1Fr: "Rénovation de maison centenaire à Montréal",
    hero: "ga-04.jpg", heroAlt: "Renovated century home interior in Montreal by Maison SK",
    ledeEn: "We are your trusted general contractor for transforming century and high-end homes into breathtaking masterpieces.",
    ledeFr: "Maison SK est l’entrepreneur général de confiance pour la transformation de maisons centenaires et haut de gamme en chefs-d’œuvre.",
    introEn: "Renovating Montreal’s century homes takes specialists who can handle their unique challenges while preserving their charm.",
    introFr: "La rénovation des maisons centenaires de Montréal exige des spécialistes capables de relever leurs défis uniques tout en préservant leur charme.",
    bodyEn: "At Maison SK, we understand that your home is more than just a building; it’s a reflection of your aspirations, values, and history.",
    bodyFr: "Chez Maison SK, nous comprenons que votre maison est plus qu’un simple bâtiment; c’est le reflet de vos aspirations, de vos valeurs et de votre histoire.",
    splitImg: "ga-05.jpg", splitAlt: "Fine interior finishing in a Montreal century home",
    proj: { href: "grey-avenue.html", img: "ga-02.jpg", alt: "Renovated kitchen in a century home on Grey Avenue",
      tEn: "Kitchen &amp; Bathrooms", tFr: "Cuisine et salle de bains", lEn: "on Grey Avenue", lFr: "sur l’avenue Grey",
      metaEn: "January – April 2024", metaFr: "Janvier – Avril 2024",
      pEn: "We executed—with careful understanding &amp; intention—our clients vision for these cherished spaces in their century home.",
      pFr: "Nous avons exécuté — avec une compréhension et une intention minutieuses — la vision de nos clients pour ces espaces précieux dans leur maison centenaire." },
    quote: {
      en: "“Anyone who owns an old building in Montreal knows they're complicated and that it can be difficult to find professionals capable of handling their unique challenges while preserving their charm. Maison SK delivered a high-quality renovation that stayed within budget nonetheless.”",
      fr: "« Quiconque possède un vieux bâtiment à Montréal sait qu’ils sont complexes et qu’il peut être difficile de trouver des professionnels capables de relever leurs défis spécifique tout en préservant leur charme. »",
      citeEn: "Century home renovation · Montreal", citeFr: "Rénovation d’une maison centenaire · Montréal" },
  },
];

const arrow = `<svg viewBox="0 0 24 10" aria-hidden="true"><path d="M0 5h22M18 1l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.3"/></svg>`;
const arrowL = `<svg viewBox="0 0 30 10" aria-hidden="true"><path d="M0 5h28M24 1l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.2"/></svg>`;

const headerFooter = (navCurrent) => ({
  header: `<header class="header">
  <div class="wrap--wide">
    <a class="header__logo" href="index.html" aria-label="Maison SK">
      <img class="logo--white" src="assets/img/logo-white.png" alt="Maison SK" width="178" height="30">
      <img class="logo--navy" src="assets/img/logo-navy.png" alt="" aria-hidden="true" width="178" height="30">
    </a>
    <nav class="nav" aria-label="Primary">
      <a class="nav__link" href="index.html" data-fr="Accueil">Home</a>
      <a class="nav__link" href="services.html">Services</a>
      <a class="nav__link" href="projects.html" data-fr="Projets">Projects</a>
      <a class="nav__link" href="contact.html">Contact</a>
    </nav>
    <div class="lang" role="group" aria-label="Language">
      <button class="lang__btn" data-lang="en" aria-pressed="true">EN</button>
      <span class="lang__sep">/</span>
      <button class="lang__btn" data-lang="fr" aria-pressed="false">FR</button>
    </div>
    <a class="btn btn--ghost header__cta" href="contact.html" data-fr="Planifier une visite">Schedule a visit</a>
    <button class="burger" aria-label="Open Menu" data-fr-label="Ouvrir le menu" aria-expanded="false" aria-controls="mobile-nav"><span></span><span></span></button>
  </div>
</header>

<div class="mobile-nav" id="mobile-nav">
  <nav aria-label="Menu">
    <a class="mobile-nav__link" href="index.html" data-fr="Accueil">Home</a>
    <a class="mobile-nav__link" href="services.html">Services</a>
    <a class="mobile-nav__link" href="projects.html" data-fr="Projets">Projects</a>
    <a class="mobile-nav__link" href="contact.html">Contact</a>
  </nav>
  <div class="mobile-nav__foot">
    <div class="lang" role="group" aria-label="Language">
      <button class="lang__btn" data-lang="en" aria-pressed="true">EN</button>
      <span class="lang__sep">/</span>
      <button class="lang__btn" data-lang="fr" aria-pressed="false">FR</button>
    </div>
    <a class="btn btn--paper" href="contact.html" data-fr="Planifier une visite">Schedule a visit</a>
  </div>
</div>`,
  footer: `<footer class="footer">
  <div class="wrap">
    <div class="footer__grid">
      <div>
        <a class="footer__logo" href="index.html"><img src="assets/img/logo-white.png" alt="Maison SK" width="178" height="30"></a>
        <p class="footer__tagline" data-fr="Rénovations sur mesure. Qualité supérieure. Gestion 360°">Custom renovations. Superior quality. 360° management.</p>
      </div>
      <div>
        <ul>
          <li><a href="services.html" data-fr="Nos services">Our services</a></li>
          <li><a href="projects.html" data-fr="Nos projets réalisés">Our completed projects</a></li>
          <li><a href="contact.html">Contact</a></li>
        </ul>
      </div>
      <div>
        <ul>
          <li><span data-fr="Montréal, Québec">Montreal, Quebec</span></li>
          <li><a href="mailto:info@maisonsk.ca">info@maisonsk.ca</a></li>
          <li><a href="tel:+15149517662">(514) 951-7662</a></li>
        </ul>
      </div>
    </div>
    <div class="footer__bottom">
      <span data-fr="Licence RBQ : 5831-9435-01">RBQ license: 5831-9435-01</span>
      <a class="footer__social" href="http://instagram.com/maisonsk.ca" target="_blank" rel="noopener" aria-label="Instagram">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><rect x="2.5" y="2.5" width="19" height="19" rx="5.5"/><circle cx="12" cy="12" r="4.4"/><circle cx="17.6" cy="6.4" r="1.1" fill="currentColor" stroke="none"/></svg>
      </a>
    </div>
  </div>
</footer>`,
});

for (const p of pages) {
  const { header, footer } = headerFooter();
  const quoteBlock = p.quote ? `
  <section class="section on-dark">
    <div class="wrap">
      <div class="quotes reveal" style="max-width:900px">
        <span class="quotes__mark" aria-hidden="true">“</span>
        <div class="quote active" style="opacity:1;transform:none;visibility:visible">
          <blockquote data-fr="${p.quote.fr}">${p.quote.en}</blockquote>
          <cite data-fr="${p.quote.citeFr}">${p.quote.citeEn}</cite>
        </div>
      </div>
    </div>
  </section>` : "";

  const html = `<!DOCTYPE html>
<html lang="en"
      data-title-en="${p.titleEn.replace(/&/g, "&amp;")}"
      data-title-fr="${p.titleFr}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${p.titleEn}</title>
<meta name="description" content="${p.desc}">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' fill='%2317232F'/%3E%3Ctext x='32' y='44' font-family='Georgia,serif' font-size='30' fill='%23FAF8F3' text-anchor='middle'%3ESK%3C/text%3E%3C/svg%3E">
<link rel="stylesheet" href="css/style.css">
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "${p.service}",
  "areaServed": "Montreal, QC",
  "provider": { "@type": "GeneralContractor", "name": "Maison SK", "telephone": "(514) 951-7662", "email": "info@maisonsk.ca" }
}
</script>
</head>
<body>
<a class="skip-link" href="#main" data-fr="Aller au Contenu">Skip to Content</a>

${header}

<main id="main">

  <section class="hero hero--page">
    <div class="hero__media">
      <img src="assets/img/${p.hero}" alt="${p.heroAlt}" fetchpriority="high">
    </div>
    <div class="hero__content wrap">
      <h1 class="hero__title reveal in" style="font-size:var(--fs-h2)" data-fr="${p.h1Fr}">${p.h1En}</h1>
      <p class="hero__sub reveal in" style="--d:.15s" data-fr="${p.ledeFr}">${p.ledeEn}</p>
    </div>
  </section>

  <section class="section">
    <div class="wrap split">
      <div class="reveal">
        <p class="pull-quote" data-fr="${p.introFr}">${p.introEn}</p>
        <p style="margin-top:1.6rem;color:var(--muted);max-width:34em" data-fr="${p.bodyFr}">${p.bodyEn}</p>
        <p style="margin-top:1rem;color:var(--muted);max-width:34em" data-fr="Nous sommes une entreprise générale de construction, basée à Montréal, Québec, agréée par la RBQ, et cautionnée par l’CESGM.">We are an RBQ-licensed general contracting company based in Montreal, Quebec, bonded through the CESGM.</p>
        <a class="btn btn--solid" style="margin-top:2.4rem" href="contact.html"><span data-fr="Planifier une visite">Schedule a visit</span>
          ${arrow}</a>
      </div>
      <div class="split__media frame-offset reveal" style="--d:.15s">
        <img src="assets/img/${p.splitImg}" alt="${p.splitAlt}" loading="lazy">
      </div>
    </div>
  </section>

  <section class="section section--flush-top">
    <div class="wrap">
      <p class="eyebrow reveal" data-fr="Notre travail">Our work</p>
      <a class="proj-feature reveal" href="${p.proj.href}">
        <div class="proj-feature__media">
          <img src="assets/img/${p.proj.img}" alt="${p.proj.alt}" loading="lazy">
        </div>
        <div>
          <h2 class="proj-title"><span data-fr="${p.proj.tFr}">${p.proj.tEn}</span>
            <small data-fr="${p.proj.lFr}">${p.proj.lEn}</small></h2>
          <p class="proj-meta" data-fr="${p.proj.metaFr}">${p.proj.metaEn}</p>
          <p style="margin-top:1.4rem;color:var(--muted);max-width:30em" data-fr="${p.proj.pFr}">${p.proj.pEn}</p>
          <p class="link-arrow" style="margin-top:1.8rem"><span data-fr="Voir le projet">See Project</span>
            ${arrowL}</p>
        </div>
      </a>
    </div>
  </section>
${quoteBlock}
  <section class="section cta-band" style="background:var(--cream)">
    <div class="wrap reveal">
      <h2><span data-fr="Rehaussez votre propriété.">Elevate your <em>home</em>.</span></h2>
      <a class="btn btn--solid" href="contact.html"><span data-fr="Planifier une visite">Schedule a visit</span>
        ${arrow}</a>
    </div>
  </section>

</main>

${footer}

<script src="js/main.js"></script>
</body>
</html>
`;
  writeFileSync(p.file, html);
  console.log("wrote", p.file);
}
