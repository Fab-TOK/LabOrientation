import type { MetadataRoute } from "next";
import { routes, siteUrl } from "@/content/site";

/**
 * Génère `/robots.txt`.
 *
 * `robots.txt` commande l’exploration, pas l’indexation : c’est la balise
 * `<meta name="robots" content="noindex">` qui empêche une page de ressortir
 * dans les résultats. Le tunnel de réservation porte déjà cette balise
 * (`app/reserver/layout.tsx`) ; on lui épargne ici l’exploration en plus.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [routes.booking, "/api/"],
    },
    sitemap: new URL("/sitemap.xml", siteUrl).toString(),
  };
}
