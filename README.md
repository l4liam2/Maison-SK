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
| `index.html` | Home |
| `services.html` | Full Service Renovation |
| `projects.html` | Completed Projects |
| `grey-avenue.html` | Kitchen & Bathrooms on Grey Avenue |
| `avenue-laval.html` | Bathroom Remodel on Avenue Laval |
| `avenue-ethier.html` | Full Remodel on Avenue Éthier |
| `contact.html` | Contact / Let's work together |

## What's inside

- `css/style.css` — the whole design system (tokens at the top: colors, type scale, spacing).
- `js/main.js` — header scroll state, mobile menu, scroll-reveal, testimonial carousel, gallery lightbox, EN/FR toggle, demo form handling.
- `assets/img/` — photography downloaded from the live site's CDN (self-contained, works offline). Google Fonts (Cormorant Garamond + Outfit) load from the network; system serif/sans fallbacks apply offline.

## Design notes

- **Typography**: serif display (Cormorant Garamond) echoes the wordmark; Outfit for UI/body. Fluid `clamp()` type scale.
- **Palette**: warm ivory `#FAF8F3`, deep navy `#17232F` (from the logo), brass `#A5834F` (from the hardware in the photography).
- **Bilingual**: the header EN/FR toggle swaps every string using the live site's actual French copy (`data-fr` attributes), persists via `localStorage`, and updates `<html lang>` + page titles.
- **The contact form is a front-end demo** — it validates and shows the confirmation state, but nothing is sent. Wire it to a form backend (Formspree, Netlify Forms, or the existing Squarespace endpoint) for production.
- Accessibility: semantic landmarks, skip link, focus-visible states, `aria-current` nav, keyboard-navigable lightbox (arrows/Escape), `prefers-reduced-motion` support.
- SEO: real page titles, meta descriptions, Open Graph tags, and `GeneralContractor` JSON-LD on the homepage.
