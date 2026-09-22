import { describe, expect, it } from "vitest";
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";
import { publicRoutes, routes, siteUrl } from "@/content/site";

describe("sitemap", () => {
  const entries = sitemap();

  it("liste exactement les sept pages publiques", () => {
    expect(entries.map((entry) => entry.url)).toEqual(
      publicRoutes.map((route) => new URL(route, siteUrl).toString()),
    );
  });

  it("n’expose ni le tunnel de réservation ni les routes d’API", () => {
    const urls = entries.map((entry) => entry.url).join(" ");
    expect(urls).not.toContain(routes.booking);
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

  it("ferme le tunnel de réservation et les routes d’API", () => {
    expect(Array.isArray(rules) ? rules[0].disallow : rules.disallow).toEqual([
      routes.booking,
      "/api/",
    ]);
  });

  it("indique où trouver le sitemap", () => {
    expect(sitemapUrl).toBe(`${siteUrl}/sitemap.xml`);
  });
});
