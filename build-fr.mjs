// Generates fr/*.html from the English pages by applying every data-fr
// attribute server-side. Re-run after any English page changes:
//   node build-fr.mjs
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import * as cheerio from "cheerio";

const PAGES = [
  "index.html", "services.html", "projects.html", "contact.html", "about.html",
  "grey-avenue.html", "avenue-laval.html", "avenue-ethier.html",
  "kitchen-renovation-montreal.html", "bathroom-renovation-montreal.html",
  "century-home-renovation-montreal.html",
];

mkdirSync("fr", { recursive: true });

// Root-relative asset prefixes that need ../ from inside fr/
const ASSET = /^(css\/|js\/|assets\/)/;

for (const file of PAGES) {
  const $ = cheerio.load(readFileSync(file, "utf8"));

  // Swap translated content
  $("[data-fr]").each((_, el) => {
    $(el).html($(el).attr("data-fr")).removeAttr("data-fr").removeAttr("data-en");
  });
  $("[data-fr-placeholder]").each((_, el) => {
    $(el).attr("placeholder", $(el).attr("data-fr-placeholder")).removeAttr("data-fr-placeholder");
  });
  $("[data-fr-label]").each((_, el) => {
    $(el).attr("aria-label", $(el).attr("data-fr-label")).removeAttr("data-fr-label");
  });

  // Document metadata
  const $html = $("html");
  $html.attr("lang", "fr").attr("data-page-lang", "fr").attr("data-alt-url", `../${file}`);
  const titleFr = $html.attr("data-title-fr");
  if (titleFr) $("title").text(titleFr);
  const descFr = $html.attr("data-desc-fr");
  if (descFr) $('meta[name="description"]').attr("content", descFr);
  $html.removeAttr("data-desc-fr");

  // hreflang: from fr/, EN lives one level up, FR is the local file
  $('link[rel="alternate"][hreflang="en"], link[rel="alternate"][hreflang="x-default"]').attr("href", `../${file}`);
  $('link[rel="alternate"][hreflang="fr"]').attr("href", file);

  // Open Graph (index only has one) — keep asset path working
  $('meta[property="og:image"]').each((_, el) => {
    const c = $(el).attr("content");
    if (ASSET.test(c)) $(el).attr("content", "../" + c);
  });

  // Rewrite asset paths (page-to-page links stay relative within fr/)
  $("[src], [href]").each((_, el) => {
    for (const attr of ["src", "href"]) {
      const v = $(el).attr(attr);
      if (v && ASSET.test(v)) $(el).attr(attr, "../" + v);
    }
  });
  $("[srcset]").each((_, el) => {
    $(el).attr("srcset", $(el).attr("srcset").replace(/(^|,\s*)assets\//g, "$1../assets/"));
  });

  writeFileSync(`fr/${file}`, $.html());
  console.log("built fr/" + file);
}
