/**
 * Données structurées schema.org, décrites ici plutôt que dans les composants,
 * comme tout le reste du contenu éditorial.
 *
 * Aucune valeur n’est inventée : tout vient de `site.ts` et de `faq.ts`.
 */
import { faqSections } from "@/content/faq";
import { routes, site, siteUrl } from "@/content/site";

const absolute = (path: string) => new URL(path, siteUrl).toString();

/** Fiche du cabinet, reprise sur l’accueil. */
export const professionalService = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": absolute("/#cabinet"),
  name: site.name,
  slogan: site.tagline,
  description:
    "Cabinet de conseil en orientation scolaire, universitaire et professionnelle fondé par Johana Ghionda.",
  url: siteUrl,
  logo: absolute("/logo-full.png"),
  image: absolute("/opengraph-image.png"),
  telephone: site.phone,
  email: site.email,
  founder: { "@type": "Person", name: site.founder },
  address: { "@type": "PostalAddress", addressCountry: "BJ" },
  areaServed: [
    { "@type": "Country", name: "Bénin" },
    /* La visioconférence lève toute contrainte géographique. */
    { "@type": "Place", name: "International" },
  ],
  availableLanguage: ["fr", "en"],
  priceRange: site.pricing.benin.from,
  potentialAction: {
    "@type": "ReserveAction",
    name: `Séance de mise en contact de ${site.freeSessionMinutes} minutes, offerte`,
    target: absolute(routes.booking),
  },
};

/**
 * Page de FAQ, **restreinte aux questions réellement répondues**.
 *
 * Déclarer « Réponse à venir » à un moteur serait faux. Les onze autres
 * rejoindront le balisage d’elles-mêmes le jour où `answer` sera renseigné.
 */
export function faqPage() {
  const answered = faqSections
    .flatMap((section) => section.items)
    .filter((item): item is typeof item & { answer: string } => Boolean(item.answer));

  if (answered.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": absolute(`${routes.faq}#faq`),
    mainEntity: answered.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}
