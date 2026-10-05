import type { Metadata } from "next";
import { site } from "@/content/site";

/**
 * Réglages de partage communs à tout le site, sans adresse : chaque page
 * annonce la sienne via `pageAddress`.
 *
 * Next.js fusionne les métadonnées en surface : une page qui déclare un
 * `openGraph` remplace d’un bloc celui de la racine. Ce socle est donc étalé
 * partout où un `openGraph` est déclaré.
 *
 * L’image y est recopiée pour la même raison : celle qu’attache le fichier
 * `app/opengraph-image.png` part avec l’`openGraph` de la racine, et l’image
 * Twitter, qui en est déduite, avec elle.
 */
export const sharedOpenGraph = {
  type: "website",
  locale: "fr_FR",
  siteName: site.name,
  images: [{ url: "/opengraph-image.png", width: 1200, height: 630, type: "image/png" }],
} satisfies Metadata["openGraph"];

/**
 * Adresse officielle d’une page publique, identique pour les moteurs
 * (canonique) et pour les réseaux sociaux (`og:url`). Si elles divergent,
 * Facebook suit `og:url` et fabrique l’aperçu d’une autre page.
 *
 * Le chemin est relatif : `metadataBase`, dans `app/layout.tsx`, le complète.
 */
export function pageAddress(path: string) {
  return {
    alternates: { canonical: path },
    openGraph: { ...sharedOpenGraph, url: path },
  } satisfies Metadata;
}
