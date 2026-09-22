/**
 * Les six offres, réparties en deux familles : trois parcours par niveau et
 * trois modules complémentaires.
 *
 * Règle explicite de la cliente : aucun prix ne figure sur les fiches.
 *
 * Les trois paragraphes `description` sont fournis par la cliente et repris
 * mot pour mot. NE PAS LES RÉÉCRIRE. Les modules n’en ont pas : le design ne
 * leur donne qu’une ligne d’accroche.
 */

/**
 * Public visé, avec ses ordinaux en exposant.
 * « 4ᵉ et 3ᵉ » s’écrit `["4", sup("e"), " et 3", sup("e")]`.
 */
export type AudienceLabel = (string | { sup: string })[];

export const sup = (text: string) => ({ sup: text });

export type OfferKind = "parcours" | "module";

export type OfferStat = { label: string; value: string };

export type Offer = {
  slug: string;
  /** Commande le style du badge, la pastille de public et le libellé du bouton. */
  kind: OfferKind;
  /** Badge turquoise : « Parcours 1 », « Module ». */
  badge: string;
  /** Pastille pêche des parcours, et colonne « Public » du tableau pour tous. */
  audience: AudienceLabel;
  title: string;
  /** Ligne terracotta sous le titre. */
  tagline: string;
  /** Parcours seulement. Sert aussi aux cartes de l’accueil. */
  description?: string;
  /** Pied de carte, deux blocs séparés par un filet. */
  stats: [OfferStat, OfferStat];
  /** Dépliant, replié par défaut. */
  detail: { label: string; items: string[] };
  cta: string;
  /** Une seule carte porte la bordure ardoise épaisse. */
  featured?: true;
  /** Colonne « Durée » du tableau récapitulatif. */
  recapDuration: string;
  /** Nom complet, hors de sa famille : formulaire de contact et tableau. */
  fullName?: string;
};

export type OfferFamily = {
  number: string;
  title: string;
  /** Pastille ardoise en bout de ligne de titre. */
  note: string;
  intro: string;
  offers: Offer[];
};

export const offerFamilies: OfferFamily[] = [
  {
    number: "01",
    title: "Les parcours",
    note: "En présentiel ou en visioconférence",
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
        featured: true,
        recapDuration: "3 × 1h",
      },
      {
        slug: "cap-sur-soi",
        kind: "parcours",
        badge: "Parcours 2",
        audience: ["2", sup("nde")],
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
            "Séance 4 : Choisir et se projeter",
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
          { label: "Séances", value: "5 × 1h" },
          { label: "Durée totale", value: "5 h + bilan" },
        ],
        detail: {
          label: "Le détail des séances",
          items: [
            "Séance 1 : Faire le point sur soi",
            "Séance 2 : Bilan de compétences",
            "Séance 3 : Explorer les métiers et les domaines",
            "Séance 4 : Explorer les formations",
            "Séance 5 : Construire son projet et son plan d’action",
          ],
        },
        cta: "Demander cette formule",
        recapDuration: "5 × 1h + bilan",
      },
    ],
  },
  {
    number: "02",
    title: "Les modules complémentaires",
    note: "En présentiel ou en visioconférence",
    intro:
      "Des modules indépendants pour répondre à un besoin précis. Ils peuvent être réservés seuls ou ajoutés à l’un des parcours.",
    offers: [
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
      {
        slug: "module-parcoursup",
        kind: "module",
        badge: "Module",
        audience: ["Terminale"],
        title: "Parcoursup",
        fullName: "Module Parcoursup",
        tagline: "Être accompagné à chaque étape",
        stats: [
          { label: "Séances", value: "3 × 1h" },
          { label: "Public", value: "Terminale" },
        ],
        detail: {
          label: "Le détail des séances",
          items: [
            "Séance 1 : Créer et comprendre",
            "Séance 2 : Construire ses vœux",
            "Séance 3 : Comprendre les résultats",
          ],
        },
        cta: "Demander ce module",
        recapDuration: "3 × 1h",
      },
    ],
  },
];

export const offers: Offer[] = offerFamilies.flatMap((family) => family.offers);

/** Les trois parcours, repris en cartes sur l’accueil. */
export const parcours: Offer[] = offerFamilies[0].offers;

/** Les trois modules complémentaires. */
export const modules: Offer[] = offerFamilies[1].offers;

/** Nom de l’offre hors de son contexte : « Module CV » plutôt que « CV ». */
export const offerName = (offer: Offer) => offer.fullName ?? offer.title;

/** Tableau récapitulatif, section 03 de la page Nos offres. */
export const recap = {
  number: "03",
  title: "La gamme en un coup d’œil",
  columns: { offer: "Offre", audience: "Public", duration: "Durée" },
  groups: [
    { title: "Les parcours", offers: parcours },
    { title: "Les modules", offers: modules },
  ],
  note: "Tous les accompagnements individuels sont proposés en présentiel ou en visioconférence.",
};

/** Les six offres, telles que proposées dans le formulaire de contact. */
export const contactFormulaOptions: { slug: string; label: string }[] = offers.map((offer) => ({
  slug: offer.slug,
  label: offerName(offer),
}));

export const UNDECIDED_FORMULA = "je-ne-sais-pas-encore";
export const UNDECIDED_FORMULA_LABEL = "Je ne sais pas encore, aidez-moi à choisir";

/** Valeurs acceptées par le champ `formule` du formulaire de contact. */
export function isValidFormulaChoice(slug: string): boolean {
  return (
    slug === UNDECIDED_FORMULA || contactFormulaOptions.some((option) => option.slug === slug)
  );
}
