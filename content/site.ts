/**
 * Informations transverses du cabinet.
 * Reprises telles quelles des maquettes — ne pas reformuler.
 */
export const site = {
  name: "Lab’Orientation",
  founder: "Johana Ghionda",
  signature: "Explorer. Comprendre. Choisir.",
  tagline: "Trouver sa voie, construire son avenir.",
  /** Numéro d’appel, le seul affiché sur le site. */
  phone: "+229 01 97 27 57 97",
  phoneHref: "tel:+2290197275797",
  /**
   * Le numéro WhatsApp (+229 97 27 57 97, sans le 01) n’est JAMAIS affiché en clair :
   * il ne vit que dans ce lien. Les liens WhatsApp portent un libellé, pas le numéro.
   */
  whatsapp: "https://wa.me/22997275797",
  email: "johana@laborientation.com",
  emailHref: "mailto:johana@laborientation.com",
  /** Adresse d’expédition des e-mails du site : un alias de la boîte de Johana. */
  senderEmail: "contact@laborientation.com",
  /**
   * Tarifs planchers par zone : une séance, un parcours. Le Bénin vient en
   * premier : c’est la zone affichée par défaut.
   */
  pricing: {
    /* \u00a0 : espace insécable, pour que le montant ne se coupe jamais en fin de ligne. */
    zones: [
      {
        id: "benin",
        label: "Bénin",
        session: { amount: "30\u00a0000", currency: "FCFA" },
        parcours: { amount: "45\u00a0000", currency: "FCFA" },
      },
      {
        id: "international",
        label: "International",
        session: { amount: "80", currency: "€" },
        parcours: { amount: "140", currency: "€" },
      },
    ],
    note: "Aucun paiement ne se fait sur le site.",
  },
  /** Durée de l’entretien préalable gratuit, en minutes. */
  freeSessionMinutes: 20,
  /** Délai de réponse annoncé sur le formulaire de contact. */
  responseDelay: "48h ouvrées",
} as const;

export type PricingZone = (typeof site.pricing.zones)[number];
export type Price = { readonly amount: string; readonly currency: string };

/** « à partir de 30 000 FCFA » : le prix d’une séance, plancher d’une zone. */
export const fromPrice = (price: Price) => `à partir de ${price.amount}\u00a0${price.currency}`;

/**
 * Adresse publique du site, base de toutes les URL absolues : canoniques,
 * image de partage, sitemap. Surchargeable pour une préproduction.
 *
 * Avec www : c’est le domaine principal dans Vercel, qui y redirige
 * laborientation.com. Les deux doivent toujours rester d’accord.
 */
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.laborientation.com";

export const routes = {
  home: "/",
  about: "/qui-suis-je",
  vision: "/ma-vision",
  offers: "/offres",
  contact: "/contact",
  testimonials: "/temoignages",
  faq: "/faq",
} as const;

/** Les sept pages publiques, celles qui entrent dans le sitemap. */
export const publicRoutes = [
  routes.home,
  routes.about,
  routes.vision,
  routes.offers,
  routes.testimonials,
  routes.faq,
  routes.contact,
] as const;
