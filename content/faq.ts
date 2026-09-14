/**
 * Les treize questions fréquentes, en trois sections.
 *
 * Seules deux réponses sont rédigées à ce jour. Les onze autres restent à
 * fournir par la cliente : la question s’affiche, la réponse porte la mention
 * d’attente. Écrire `answer` suffit à publier la réponse.
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
          "Des collégiens aux adultes en reconversion : à partir de 14 ans et de la classe de 3ᵉ, sans limite d’âge. Également à leurs parents, ainsi qu’aux lycées et institutions qui souhaitent un accompagnement collectif. Les jeunes viennent aussi bien du système français que d’autres systèmes scolaires.",
      },
      {
        id: "idee-de-projet",
        question: "Faut-il déjà avoir une idée de projet ?",
      },
      {
        id: "premiere-seance-gratuite",
        question: "La première séance est-elle vraiment gratuite ?",
      },
      {
        id: "cout-accompagnement",
        question: "Combien coûte un accompagnement ?",
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
          "Tout commence par la séance de mise en contact de 30 minutes, offerte, qui sert à comprendre la situation et à choisir la formule adaptée. Viennent ensuite les séances de travail : connaissance de soi, exploration des filières et des métiers, puis construction du projet et des démarches. Un compte rendu écrit est remis à la famille.",
      },
      {
        id: "presentiel-ou-distance",
        question: "Les séances ont-elles lieu en présentiel ou à distance ?",
      },
      {
        id: "langue-des-consultations",
        question: "En quelle langue se déroulent les consultations ?",
      },
      {
        id: "parents-associes",
        question: "Les parents sont-ils associés au travail ?",
      },
      {
        id: "duree-accompagnement",
        question: "Combien de temps dure un accompagnement ?",
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
      },
      {
        id: "commencer-en-cours-d-annee",
        question: "Peut-on commencer en cours d’année, en pleine période Parcoursup ?",
      },
      {
        id: "paiement",
        question: "Comment se fait le paiement ?",
      },
      {
        id: "etablissements-et-professionnels",
        question: "Intervenez-vous auprès des établissements et des professionnels ?",
      },
    ],
  },
];

export const faqItemCount = faqSections.reduce(
  (total, section) => total + section.items.length,
  0,
);
