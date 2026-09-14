/**
 * Les neuf formules, réparties en trois familles.
 *
 * Règle explicite de la cliente : aucun prix ne figure sur les fiches.
 * Les tarifs planchers vivent dans `site.pricing` et n’apparaissent que
 * sur les bandeaux ardoise.
 */

export type FormulaTone = "light" | "slate" | "peach";

export type Formula = {
  slug: string;
  /** Libellé simple, utilisé dans les listes et les formulaires. */
  title: string;
  /** Titre à exposant, quand le libellé en comporte un (« 1ᵉʳ pas »). */
  titleSup?: { lead: string; sup: string; rest: string };
  /** Version courte, cartes « Par où commencer » de l’accueil. */
  teaser?: string;
  /** Version longue, fiches de la page Nos offres. */
  description: string;
  tone: FormulaTone;
  /** Pastille d’angle, sur la seule formule mise en avant. */
  highlight?: string;
};

export type FormulaFamily = {
  number: string;
  title: string;
  formulas: Formula[];
};

export const formulaFamilies: FormulaFamily[] = [
  {
    number: "01",
    title: "Se connaître et s’orienter",
    formulas: [
      {
        slug: "premier-pas",
        title: "1er pas",
        titleSup: { lead: "1", sup: "er", rest: " pas" },
        teaser:
          "Pour commencer à avancer, sans avoir besoin d’avoir déjà un projet. On pose la situation, on met des mots sur les doutes, et on identifie la première marche.",
        description:
          "Pour commencer à avancer, sans avoir besoin d’avoir déjà un projet. On pose la situation, on met des mots sur ce qui bloque, et on repart avec une première direction de travail.",
        tone: "light",
      },
      {
        slug: "cap-sur-soi",
        title: "Cap sur soi",
        teaser:
          "Parce qu’une spécialité ne devrait pas être choisie parce qu’elle semble facile, populaire ou recommandée par d’autres. Un travail sur les forces réelles du jeune.",
        description:
          "Parce qu’une spécialité ne devrait pas être choisie parce qu’elle semble facile, populaire ou recommandée par d’autres. Un travail sur la personnalité, les forces réelles et les centres d’intérêt.",
        tone: "light",
      },
      {
        slug: "cap-sur-l-avenir",
        title: "Cap sur l’Avenir",
        teaser:
          "Passer de « je ne sais pas quoi faire » à des pistes concrètes et réfléchies, avec un projet d’études tenable et les démarches qui vont avec.",
        description:
          "Passer de « je ne sais pas quoi faire » à des pistes concrètes et réfléchies. On explore les métiers et les formations, puis on construit un projet d’études tenable.",
        tone: "slate",
        highlight: "Le plus demandé",
      },
    ],
  },
  {
    number: "02",
    title: "Construire et sécuriser le projet",
    formulas: [
      {
        slug: "bilan-d-orientation",
        title: "Bilan d’orientation",
        description:
          "Le parcours de connaissance de soi au complet : tests d’intérêts et d’aptitudes, exploration des pistes, puis une synthèse écrite remise à la famille.",
        tone: "light",
      },
      {
        slug: "parcoursup",
        title: "Parcoursup",
        description:
          "Des vœux cohérents plutôt qu’une liste au hasard. Stratégie de candidature, rédaction des éléments du dossier et respect du calendrier, étape par étape.",
        tone: "light",
      },
      {
        slug: "parcours-complet",
        title: "Parcours complet",
        description:
          "L’accompagnement de bout en bout, du bilan jusqu’aux dossiers envoyés. Un suivi continu sur toute l’année scolaire, pour le jeune comme pour ses parents.",
        tone: "peach",
      },
    ],
  },
  {
    number: "03",
    title: "Candidatures et ateliers",
    formulas: [
      {
        slug: "redaction-de-cv",
        title: "Rédaction de CV",
        description:
          "Un CV clair et crédible, adapté aux codes du pays visé, qui met en valeur un parcours encore court sans le gonfler.",
        tone: "light",
      },
      {
        slug: "lettre-de-motivation",
        title: "Lettre de motivation",
        description:
          "Une lettre qui ressemble vraiment au candidat et répond aux attentes de l’établissement, travaillée ensemble plutôt qu’écrite à sa place.",
        tone: "light",
      },
      {
        slug: "ateliers-collectifs",
        title: "Ateliers collectifs",
        description:
          "En petit groupe, en classe ou en établissement : découverte des filières, méthodes de choix et préparation des démarches. Sur devis pour les institutions.",
        tone: "light",
      },
    ],
  },
];

export const formulas: Formula[] = formulaFamilies.flatMap((family) => family.formulas);

/** Les trois formules mises en avant sur l’accueil. */
export const featuredFormulas: Formula[] = formulaFamilies[0].formulas;

/**
 * Options d’« accompagnement souhaité » du formulaire de contact.
 *
 * « Formation aux professionnels » ne correspond à aucune fiche de la page
 * Nos offres : c’est un service réel (confirmé par la FAQ) que la cliente a
 * choisi de garder côté formulaire sans lui créer de dixième carte.
 */
export const contactFormulaOptions: { slug: string; label: string }[] = [
  ...formulas.map((formula) => ({ slug: formula.slug, label: formula.title })),
  { slug: "formation-aux-professionnels", label: "Formation aux professionnels" },
];

export const UNDECIDED_FORMULA = "je-ne-sais-pas-encore";
export const UNDECIDED_FORMULA_LABEL = "Je ne sais pas encore, aidez-moi à choisir";

export function findFormula(slug: string | undefined | null): Formula | undefined {
  if (!slug) return undefined;
  return formulas.find((formula) => formula.slug === slug);
}

/** Vrai pour toute valeur acceptée par le champ « accompagnement souhaité ». */
export function isValidFormulaChoice(slug: string): boolean {
  return (
    slug === UNDECIDED_FORMULA ||
    contactFormulaOptions.some((option) => option.slug === slug)
  );
}
