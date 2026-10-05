import type { MetadataRoute } from "next";
import { siteUrl } from "@/content/site";

/**
 * Génère `/robots.txt` : tout le site est ouvert, sauf les routes d’API, qui
 * ne servent qu’au formulaire.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: new URL("/sitemap.xml", siteUrl).toString(),
  };
}
