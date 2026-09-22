/**
 * Informations transverses du cabinet.
 * Reprises telles quelles des maquettes — ne pas reformuler.
 */
export const site = {
  name: "Lab’Orientation",
  founder: "Johana Ghionda",
  signature: "Explorer. Comprendre. Choisir.",
  tagline: "Trouver sa voie, construire son avenir.",
  phone: "+229 97 27 57 97",
  phoneHref: "tel:+22997275797",
  whatsapp: "https://wa.me/22997275797",
  email: "johana@laborientation.com",
  emailHref: "mailto:johana@laborientation.com",
  pricing: {
    benin: { label: "Bénin", from: "dès 65 000 FCFA", long: "à partir de 65 000 FCFA" },
    international: { label: "International", from: "dès 150 €", long: "à partir de 150 €" },
    note: "Aucun paiement ne se fait sur le site.",
  },
  /** Durée de la séance de mise en contact, en minutes. */
  freeSessionMinutes: 30,
  /** Délai de réponse annoncé sur le formulaire de contact. */
  responseDelay: "48 h ouvrées",
} as const;

/**
 * Adresse publique du site, base de toutes les URL absolues : canoniques,
 * image de partage, sitemap. Surchargeable pour une préproduction.
 */
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://laborientation.com";

export const routes = {
  home: "/",
  about: "/qui-suis-je",
  vision: "/ma-vision",
  offers: "/offres",
  contact: "/contact",
  testimonials: "/temoignages",
  faq: "/faq",
  booking: "/reserver",
  bookingInfo: "/reserver/informations",
  bookingConfirmation: "/reserver/confirmation",
} as const;

/**
 * Les sept pages publiques, celles qui entrent dans le sitemap.
 * Le tunnel de réservation en est volontairement absent : il porte déjà
 * `robots: { index: false }` et n'a aucun sens hors d'un parcours entamé.
 */
export const publicRoutes = [
  routes.home,
  routes.about,
  routes.vision,
  routes.offers,
  routes.testimonials,
  routes.faq,
  routes.contact,
] as const;
