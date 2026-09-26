/**
 * Les douze questions fréquentes, en trois sections.
 *
 * Réponses fournies par la cliente, corrigées pour l’orthographe, les accords
 * et la ponctuation seulement. NE PAS LES RÉÉCRIRE.
 *
 * Une question sans `answer` s’affiche avec la mention d’attente et reste hors
 * du balisage pour les moteurs : écrire `answer` suffit à la publier.
 */

export type FaqItem = {
  id: string;
  question: string;
  answer?: string;
};

export type FaqSection = {
  id: string;
  number: string;
  title: string;
  items: FaqItem[];
};

export const FAQ_PENDING_ANSWER = "Réponse à venir.";

export const faqSections: FaqSection[] = [
  {
    id: "avant-de-commencer",
    number: "01",
    title: "Avant de commencer",
    items: [
      {
        id: "a-qui-s-adresse",
        question: "À qui s’adresse Lab’Orientation ?",
        answer:
          "Des collégiens aux adultes en reconversion : dès la classe de 4ᵉ, sans limite d’âge. Également à leurs parents, ainsi qu’aux lycées et institutions qui souhaitent un accompagnement collectif. Les jeunes viennent aussi bien du système français que d’autres systèmes scolaires et s’orientent vers divers systèmes universitaires supérieurs.",
      },
      {
        id: "idee-de-projet",
        question: "Faut-il déjà avoir une idée de projet ?",
        answer:
          "Non, pas du tout. Que vous ayez une seule idée, trop d’idées ou aucune, je suis là pour vous accompagner.",
      },
      {
        id: "cout-accompagnement",
        question: "Combien coûte un accompagnement ?",
        answer:
          "Suite à l’entretien préalable gratuit, les tarifs seront envoyés. Il existe plusieurs formules d’accompagnement, chacune adaptée aux besoins spécifiques de l’élève et à son niveau de classe.",
      },
    ],
  },
  {
    id: "le-deroulement",
    number: "02",
    title: "Le déroulement",
    items: [
      {
        id: "comment-se-deroule",
        question: "Comment se déroule un accompagnement ?",
        answer:
          "Tout commence par un entretien préalable de 20 minutes, offert, qui sert à comprendre la situation et à choisir la formule adaptée. Viennent ensuite les séances de travail : connaissance de soi, exploration des filières et des métiers, puis construction du projet et des démarches. Un compte rendu écrit est remis à la famille.",
      },
      {
        id: "presentiel-ou-distance",
        question: "Les séances ont-elles lieu en présentiel ou à distance ?",
        answer:
          "Installée au Bénin, les séances pour les élèves de Cotonou sont préférablement en présentiel. Les séances en dehors du Bénin, elles, se font en visio.",
      },
      {
        id: "langue-des-consultations",
        question: "En quelle langue se déroulent les séances d’accompagnement ?",
        answer:
          "L’accompagnement se déroule généralement en français, mais il est également possible en anglais.",
      },
      {
        id: "parents-associes",
        question: "Les parents sont-ils associés au travail ?",
        answer:
          "Les parents ne participent pas aux séances, mais bénéficient d’un temps de synthèse et d’explication.",
      },
      {
        id: "duree-accompagnement",
        question: "Combien de temps dure un accompagnement ?",
        answer: "Cela dépend de la formule choisie.",
      },
    ],
  },
  {
    id: "situations-particulieres",
    number: "03",
    title: "Situations particulières",
    items: [
      {
        id: "hors-systeme-francais",
        question: "Mon enfant n’est pas dans le système français, est-ce possible ?",
        answer:
          "Bien sûr, j’accompagne les élèves venant d’horizons différents et se destinant à différents systèmes d’éducation.",
      },
      {
        id: "commencer-en-cours-d-annee",
        question: "Peut-on commencer en cours d’année, en pleine période Parcoursup ?",
        answer:
          "Oui, cela est possible, mais risqué. Il vaut mieux anticiper et prendre le temps de la réflexion pour aboutir à un projet solide et passer à sa réalisation sans stress.",
      },
      {
        id: "paiement",
        question: "Comment se fait le paiement ?",
        answer:
          "Pour le Bénin, le paiement se fait par MoMo ou en espèces, au début de l’accompagnement. Hors du Bénin, il s’effectue par virement bancaire.",
      },
      {
        id: "etablissements-et-professionnels",
        question: "Intervenez-vous auprès des établissements et des professionnels ?",
        answer:
          "Oui, j’interviens auprès d’établissements scolaires, notamment pour mener des ateliers de groupe destinés aux lycéens, mais aussi pour apporter mon expertise. Par ailleurs, je propose également des formations, notamment pour les conseillers Campus France.",
      },
    ],
  },
];

export const faqItemCount = faqSections.reduce(
  (total, section) => total + section.items.length,
  0,
);
