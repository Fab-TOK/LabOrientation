import type { MetadataRoute } from "next";
import { publicRoutes, routes, siteUrl } from "@/content/site";

/**
 * Génère `/sitemap.xml` à partir de `publicRoutes`, pour qu’une page ajoutée
 * à la navigation ne puisse pas être oubliée ici.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return publicRoutes.map((route) => ({
    url: new URL(route, siteUrl).toString(),
    lastModified,
    changeFrequency: "monthly",
    priority: route === routes.home ? 1 : 0.8,
  }));
}
