import { describe, expect, it } from "vitest";
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";
import { publicRoutes, routes, siteUrl } from "@/content/site";
import { pageAddress, sharedOpenGraph } from "@/lib/metadata";

describe("adresse du site", () => {
  /* Vercel redirige laborientation.com vers www : l’adresse annoncée aux
     moteurs doit être celle où la redirection aboutit, pas celle qui redirige. */
  it.skipIf(process.env.NEXT_PUBLIC_SITE_URL)("annonce par défaut l’adresse avec www", () => {
    expect(siteUrl).toBe("https://www.laborientation.com");
  });
});

describe("adresse d’une page", () => {
  const address = pageAddress(routes.offers);

  it("est la même pour les moteurs et pour les réseaux sociaux", () => {
    /* Sinon Facebook suit `og:url` et fabrique l’aperçu d’une autre page. */
    expect(address.alternates.canonical).toBe(routes.offers);
    expect(address.openGraph.url).toBe(routes.offers);
  });

  it("garde les réglages de partage communs au site", () => {
    /* Next.js remplace d’un bloc l’`openGraph` de la racine : il doit tout reprendre. */
    expect(address.openGraph).toMatchObject(sharedOpenGraph);
  });

  it("garde l’image de partage", () => {
    /* L’image attachée par `app/opengraph-image.png` disparaît avec l’`openGraph`
       de la racine : elle doit être reprise explicitement. */
    expect(address.openGraph.images).toEqual([
      expect.objectContaining({ url: "/opengraph-image.png", width: 1200, height: 630 }),
    ]);
  });
});

describe("sitemap", () => {
  const entries = sitemap();

  it("liste exactement les sept pages publiques", () => {
    expect(entries.map((entry) => entry.url)).toEqual(
      publicRoutes.map((route) => new URL(route, siteUrl).toString()),
    );
  });

  it("n’expose pas les routes d’API", () => {
    const urls = entries.map((entry) => entry.url).join(" ");
    expect(urls).not.toContain("/api");
  });

  it("donne des URL absolues sur le domaine du site", () => {
    for (const entry of entries) {
      expect(entry.url.startsWith(siteUrl)).toBe(true);
    }
  });
});

describe("robots", () => {
  const { rules, sitemap: sitemapUrl } = robots();

  it("ouvre tout le site, sauf les routes d’API", () => {
    expect(Array.isArray(rules) ? rules[0].disallow : rules.disallow).toEqual(["/api/"]);
  });

  it("indique où trouver le sitemap", () => {
    expect(sitemapUrl).toBe(`${siteUrl}/sitemap.xml`);
  });
});
