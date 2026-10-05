/**
 * Les dix offres, en trois familles : quatre parcours par niveau, trois
 * accompagnements aux candidatures et trois modules complémentaires.
 *
 * Règle explicite de la cliente : aucun prix ne figure sur les fiches. Les
 * tarifs « à partir de » vivent dans `content/site.ts`, bloc des tarifs.
 *
 * Les trois paragraphes `description` des parcours 1 à 3 sont fournis par la
 * cliente et repris mot pour mot, y compris quand la maquette les raccourcit.
 * NE PAS LES RÉÉCRIRE. Les autres textes suivent la maquette de la nouvelle
 * gamme.
 */

/**
 * Public visé, avec ses ordinaux en exposant.
 * « 4ᵉ et 3ᵉ » s’écrit `["4", sup("e"), " et 3", sup("e")]`.
 */
export type AudienceLabel = (string | { sup: string })[];

export const sup = (text: string) => ({ sup: text });

export type OfferKind = "parcours" | "candidature" | "module";

export type OfferStat = { label: string; value: string };

/**
 * Ligne du dépliant. `aside` s’affiche en gris après le texte : il distingue
 * deux séances de même intitulé, « (1ʳᵉ partie) », « (2ᵉ partie) ».
 */
export type DetailItem = string | { text: string; aside: AudienceLabel };

export type Offer = {
  slug: string;
  /** Commande le style du badge, la pastille de public et le libellé du bouton. */
  kind: OfferKind;
  /** Badge : « Parcours 1 », « Candidature », « Module ». */
  badge: string;
  /** Pastille pêche, et colonne « Public » du tableau. */
  audience: AudienceLabel;
  title: string;
  /** Ligne terracotta sous le titre. */
  tagline: string;
  /** Sert aussi aux cartes de l’accueil pour les parcours. */
  description?: string;
  /** Pied de carte, deux blocs séparés par un filet. */
  stats: [OfferStat, OfferStat];
  /** Dépliant, replié par défaut. Les candidatures et Cap Réussite n’en ont pas. */
  detail?: { label: string; items: DetailItem[] };
  cta: string;
  /** Colonne « Durée » du tableau récapitulatif. */
  recapDuration: string;
  /** Nom complet, hors de sa famille : formulaire de contact et tableau. */
  fullName?: string;
  /**
   * Grande carte ardoise sous les autres : pastille de mise en avant et
   * composition de l’offre, deux accompagnements reliés par un « + ».
   */
  featured?: { highlight: string; composition: [string, string] };
};

export type OfferFamily = {
  number: string;
  title: string;
  /** Pastille ardoise en bout de ligne de titre. */
  note: string;
  intro: string;
  offers: Offer[];
};

const PRESENTIEL_OU_VISIO = "En présentiel ou en visioconférence";

export const offerFamilies: OfferFamily[] = [
  {
    number: "01",
    title: "Les parcours",
    note: PRESENTIEL_OU_VISIO,
    intro:
      "Choisissez le parcours qui vous convient le mieux. Les modules viennent le compléter si besoin.",
    offers: [
      {
        slug: "premiers-pas",
        kind: "parcours",
        badge: "Parcours 1",
        audience: ["4", sup("e"), " et 3", sup("e")],
        title: "Premiers Pas",
        tagline: "Commencer à explorer son orientation",
        description:
          "Un accompagnement pour aider le jeune à mieux se connaître, découvrir les possibilités qui s’offrent à lui et commencer à faire émerger ses premières pistes.",
        stats: [
          { label: "Séances", value: "3 × 1h" },
          { label: "Durée totale", value: "3 heures" },
        ],
        detail: {
          label: "Le détail des séances",
          items: [
            "Séance 1 : Mieux se connaître",
            "Séance 2 : Explorer les métiers et les filières",
            "Séance 3 : Faire le point et se projeter",
          ],
        },
        cta: "Demander cette formule",
        recapDuration: "3 × 1h",
      },
      {
        slug: "cap-sur-soi",
        kind: "parcours",
        badge: "Parcours 2",
        audience: ["3", sup("e"), " et 2", sup("nde")],
        title: "Cap sur soi",
        tagline: "Se connaître pour mieux choisir ses spécialités",
        description:
          "Un accompagnement permettant au lycéen de mieux comprendre son profil et de réfléchir à ses choix de spécialités en lien avec ses intérêts, ses compétences.",
        stats: [
          { label: "Séances", value: "4 × 1h" },
          { label: "Durée totale", value: "4 heures" },
        ],
        detail: {
          label: "Le détail des séances",
          items: [
            "Séance 1 : Mieux se connaître",
            "Séance 2 : Explorer les spécialités",
            "Séance 3 : Croiser profil et spécialités",
            "Séance 4 : Choisir sa spécialité de bac et se projeter",
          ],
        },
        cta: "Demander cette formule",
        recapDuration: "4 × 1h",
      },
      {
        slug: "cap-sur-l-avenir",
        kind: "parcours",
        badge: "Parcours 3",
        audience: ["1", sup("re"), " et Terminale"],
        title: "Cap sur l’Avenir",
        tagline: "Construire son projet d’études",
        description:
          "Un accompagnement approfondi pour aider le jeune à mieux se connaître, identifier ses ressources et construire un projet d’études cohérent avec son profil.",
        stats: [
          { label: "Séances", value: "6 × 1h" },
          { label: "Durée totale", value: "6 heures" },
        ],
        detail: {
          label: "Le détail des séances",
          items: [
            /* Même intitulé voulu par la cliente : une séance en deux temps. */
            { text: "Séance 1 : Faire le point sur soi", aside: ["(1", sup("re"), " partie)"] },
            { text: "Séance 2 : Faire le point sur soi", aside: ["(2", sup("e"), " partie)"] },
            "Séance 3 : Bilan d’orientation",
            "Séance 4 : Explorer les formations",
            "Séance 5 : Construire son projet et son plan d’action",
            "Séance 6 : Restitution",
          ],
        },
        cta: "Demander cette formule",
        recapDuration: "6 × 1h",
      },
      {
        slug: "cap-reussite",
        kind: "parcours",
        badge: "Parcours 4",
        audience: ["Terminale"],
        title: "Cap Réussite",
        tagline: "Du projet d’études jusqu’aux vœux",
        description:
          "Le parcours Cap sur l’Avenir prolongé par l’accompagnement Parcoursup phase principale : on construit le projet, puis on le traduit en vœux et en dossiers solides.",
        stats: [
          { label: "Séances", value: "10 × 1h" },
          { label: "Durée totale", value: "10 heures" },
        ],
        cta: "Demander cette formule",
        recapDuration: "10 × 1h",
        featured: {
          highlight: "Le plus complet",
          composition: ["Cap sur l’Avenir", "Parcoursup phase principale"],
        },
      },
    ],
  },
  {
    number: "02",
    title: "Les candidatures",
    note: PRESENTIEL_OU_VISIO,
    intro:
      "Un accompagnement ciblé sur les dossiers et les procédures, en France comme à l’étranger.",
    offers: [
      {
        slug: "parcoursup-phase-principale",
        kind: "candidature",
        badge: "Candidature",
        audience: ["Terminale"],
        title: "Parcoursup phase principale",
        tagline: "Formuler ses vœux et soigner ses dossiers",
        description:
          "Un suivi sur toute la phase principale : choix et hiérarchie des vœux, projets de formation motivés, préparation aux réponses.",
        stats: [
          { label: "Séances", value: "4 × 1h" },
          { label: "Durée totale", value: "4 heures" },
        ],
        cta: "Demander cette formule",
        recapDuration: "4 × 1h",
      },
      {
        slug: "parcoursup-etudiants-internationaux",
        kind: "candidature",
        badge: "Candidature",
        audience: ["Hors de France"],
        title: "Parcoursup étudiants internationaux",
        tagline: "Candidater en France depuis l’étranger",
        description:
          "Pour les élèves scolarisés hors de France ou dans un autre système : comprendre la procédure, son calendrier propre et constituer un dossier recevable.",
        stats: [
          { label: "Séances", value: "5 × 1h" },
          { label: "Durée totale", value: "5 heures" },
        ],
        cta: "Demander cette formule",
        recapDuration: "5 × 1h",
      },
      {
        slug: "candidatures-hors-de-france",
        kind: "candidature",
        badge: "Candidature",
        audience: ["Terminale"],
        title: "Candidatures hors de France",
        tagline: "Préparer ses candidatures à l’international",
        description:
          "Choisir ses destinations et ses établissements, comprendre les attendus de chaque pays et préparer des dossiers convaincants.",
        stats: [
          { label: "Séances", value: "4 × 1h" },
          { label: "Durée totale", value: "4 heures" },
        ],
        cta: "Demander cette formule",
        recapDuration: "4 × 1h",
      },
    ],
  },
  {
    number: "03",
    title: "Les modules complémentaires",
    note: PRESENTIEL_OU_VISIO,
    intro:
      "Des modules indépendants pour répondre à un besoin précis. Ils peuvent être réservés seuls ou ajoutés à l’un des parcours.",
    offers: [
      {
        slug: "module-bilan-d-orientation",
        kind: "module",
        badge: "Module",
        audience: ["Tous niveaux"],
        title: "Bilan d’orientation",
        fullName: "Module Bilan d’orientation",
        tagline: "Faire le point à tout moment",
        stats: [
          { label: "Séances", value: "4 × 1h" },
          { label: "Public", value: "Tous niveaux" },
        ],
        detail: {
          label: "Le contenu du module",
          items: [
            "un portrait global : personnalité, aptitudes, motivations et intérêts",
            "des entretiens individuels d’1h, au cabinet ou en visio",
            "un travail d’analyse et de recherche entre les séances",
            "une restitution avec des pistes d’études concrètes",
          ],
        },
        cta: "Demander ce module",
        recapDuration: "4 × 1h",
      },
      {
        slug: "module-cv",
        kind: "module",
        badge: "Module",
        audience: ["Tous niveaux"],
        title: "CV",
        fullName: "Module CV",
        tagline: "Construire un CV qui valorise son parcours",
        stats: [
          { label: "Séances", value: "1 × 1h" },
          { label: "Public", value: "Tous niveaux" },
        ],
        detail: {
          label: "Le contenu du module",
          items: [
            "comprendre les objectifs d’un CV",
            "identifier les expériences à valoriser",
            "repérer ses compétences",
            "structurer les différentes rubriques",
            "améliorer la présentation",
            "adapter son CV à une candidature",
          ],
        },
        cta: "Demander ce module",
        recapDuration: "1 × 1h",
      },
      {
        slug: "module-lettre-de-motivation",
        kind: "module",
        badge: "Module",
        audience: ["Tous niveaux"],
        title: "Lettre de motivation",
        fullName: "Module Lettre de motivation",
        tagline: "Apprendre à valoriser son profil",
        stats: [
          { label: "Séances", value: "1 × 1h" },
          { label: "Public", value: "Tous niveaux" },
        ],
        detail: {
          label: "Le contenu du module",
          items: [
            "comprendre les attentes d’une lettre",
            "structurer son argumentation",
            "valoriser son parcours",
            "mettre en avant ses compétences",
            "personnaliser son contenu",
            "travailler sur une candidature concrète",
          ],
        },
        cta: "Demander ce module",
        recapDuration: "1 × 1h",
      },
    ],
  },
];

export const offers: Offer[] = offerFamilies.flatMap((family) => family.offers);

/** Les quatre parcours. */
export const parcours: Offer[] = offerFamilies[0].offers;

/** Les trois parcours repris en cartes sur l’accueil : Cap Réussite reste sur la page Offres. */
export const homeParcours: Offer[] = parcours.filter((offer) => !offer.featured);

/** Nom de l’offre hors de son contexte : « Module CV » plutôt que « CV ». */
export const offerName = (offer: Offer) => offer.fullName ?? offer.title;

/** Tableau récapitulatif, section 04 de la page Nos offres. */
export const recap = {
  number: "04",
  title: "La gamme en un coup d’œil",
  columns: { offer: "Offre", audience: "Public", duration: "Durée" },
  groups: [
    { title: "Les parcours", offers: parcours },
    { title: "Les candidatures", offers: offerFamilies[1].offers },
    { title: "Les modules", offers: offerFamilies[2].offers },
  ],
  note: "Tous les accompagnements individuels sont proposés en présentiel ou en visioconférence.",
};

/** Les dix offres, telles que proposées dans le formulaire de contact. */
export const contactFormulaOptions: { slug: string; label: string }[] = offers.map((offer) => ({
  slug: offer.slug,
  label: offerName(offer),
}));

export const UNDECIDED_FORMULA = "je-ne-sais-pas-encore";
export const UNDECIDED_FORMULA_LABEL = "Je ne sais pas encore";

/** Valeurs acceptées par le champ `formule` du formulaire de contact. */
export function isValidFormulaChoice(slug: string): boolean {
  return (
    slug === UNDECIDED_FORMULA || contactFormulaOptions.some((option) => option.slug === slug)
  );
}

/** Nom de l’offre choisie dans le formulaire ; rien pour « je ne sais pas encore ». */
export function formulaLabel(slug: string | undefined): string | undefined {
  return contactFormulaOptions.find((option) => option.slug === slug)?.label;
}
