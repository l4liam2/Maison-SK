# Maison SK — Redesigned local prototype

A redesigned, self-contained version of [maisonsk.ca](https://www.maisonsk.ca/) using **all of the site's original text and wording** (English and French), rebuilt with an elevated editorial design system.

## Run it

```bash
node serve.mjs
```

Then open <http://localhost:4180>. (Any static server works — the site is plain HTML/CSS/JS.)

## Pages

| File | Page |
|---|---|
| `index.html` | Home (hero, services, philosophy, process, work, testimonials) |
| `services.html` | Full Service Renovation |
| `projects.html` | Completed Projects |
| `about.html` | About Maison SK (has a TODO slot for the founder story) |
| `grey-avenue.html` | Kitchen & Bathrooms on Grey Avenue |
| `avenue-laval.html` | Bathroom Remodel on Avenue Laval |
| `avenue-ethier.html` | Full Remodel on Avenue Éthier |
| `contact.html` | Contact — lead form (type + budget selects) & FAQ |
| `kitchen-renovation-montreal.html` | SEO landing page — kitchens |
| `bathroom-renovation-montreal.html` | SEO landing page — bathrooms |
| `century-home-renovation-montreal.html` | SEO landing page — century homes |
| `fr/*.html` | Generated French versions of every page (real URLs + hreflang) |

## Build scripts

- `npm run build` — runs `retrofit.mjs` (uniform head/nav/footer/srcset upgrades on English pages) then `build-fr.mjs` (generates `fr/*.html` from the `data-fr` attributes). **Re-run after editing any English page.**
- `npm run gen:landing` — regenerates the three SEO landing pages from `gen-landing.mjs`.
- `sitemap.xml` / `robots.txt` — hreflang-paired sitemap pointing at maisonsk.ca paths.

## What's inside

- `css/style.css` — the whole design system (tokens at the top: colors, type scale, spacing).
- `js/main.js` — header scroll state, mobile menu, scroll-reveal, testimonial carousel, gallery lightbox, EN/FR toggle, demo form handling.
- `assets/img/` — photography downloaded from the live site's CDN, optimized (JPEG, 800px `srcset` variants, intrinsic dimensions for zero layout shift).
- `assets/fonts/` — self-hosted woff2 fonts (no Google Fonts request; fully offline).

## Design notes

- **Typography**: serif display (Cormorant Garamond) echoes the wordmark; Outfit for UI/body. Fluid `clamp()` type scale.
- **Palette**: warm ivory `#FAF8F3`, deep navy `#17232F` (from the logo), brass `#A5834F` (from the hardware in the photography).
- **Bilingual with real URLs**: English pages carry the French copy in `data-fr` attributes; `build-fr.mjs` bakes them into crawlable `fr/*.html` pages with `hreflang` alternates. The EN/FR toggle navigates between the two and remembers the preference.
- **The contact form is a front-end demo** — it validates and shows the confirmation state, but nothing is sent. Wire it to a form backend (Formspree, Netlify Forms, or the existing Squarespace endpoint) for production.
- Accessibility: semantic landmarks, skip link, focus-visible states, `aria-current` nav, keyboard-navigable lightbox (arrows/Escape), `prefers-reduced-motion` support.
- SEO: real page titles, meta descriptions, Open Graph tags, and `GeneralContractor` JSON-LD on the homepage.
