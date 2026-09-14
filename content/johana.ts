import { em, strong, type Paragraph } from "./rich-text";

/**
 * Texte de présentation de Johana, page Qui suis-je ?
 *
 * NE PAS RÉÉCRIRE. Fourni par la cliente et repris mot pour mot, y compris
 * les passages en gras et en italique.
 */

export const johanaHero = {
  eyebrow: "Qui suis-je ?",
  name: "Johana Ghionda",
  role: "Conseillère d’orientation et fondatrice de Lab’Orientation.",
  stats: [
    { value: "11 ans", label: "en orientation scolaire et universitaire" },
    { value: "+ de 1 000", label: "élèves guidés dans les moments clés" },
    { value: "5", label: "régions du monde vécues de l’intérieur" },
  ],
};

/** Première ligne, en Newsreader italique. */
export const johanaLead =
  "Je suis Johana, conseillère d’orientation et fondatrice de Lab’Orientation.";

/** Paragraphes précédant l’encart de conviction. */
export const johanaIntro: Paragraph[] = [
  [
    "Depuis l’enfance, j’ai vécu dans différents environnements culturels : ",
    em("Moyen-Orient, France, Amérique du Nord, Espagne, Afrique de l’Ouest…"),
    " Ce parcours international a développé mon ouverture, ma capacité d’adaptation et surtout une ",
    strong(
      "compréhension fine des différences culturelles et des codes qui influencent les parcours scolaires et professionnels",
    ),
    ". Il me permet aujourd’hui de porter un regard particulièrement adapté aux jeunes qui évoluent entre plusieurs cultures, pays ou systèmes scolaires.",
  ],
  [
    strong(
      "Juriste de formation, j’ai ensuite évolué dans la gestion des ressources humaines, puis dirigé une entreprise de services.",
    ),
    " Ces expériences m’ont permis de développer des compétences en ",
    strong("management, recrutement et gestion des talents"),
    ", mais aussi une connaissance concrète du monde professionnel et des réalités du tissu économique.",
  ],
  [
    "Depuis ",
    strong(
      "11 ans, je me consacre à l’orientation scolaire et universitaire, notamment au sein de lycées français à l’étranger du réseau AEFE",
    ),
    ", mais également auprès de jeunes issus d’autres systèmes scolaires et de parcours internationaux.",
  ],
  [
    "J’ai ainsi eu la chance de guider ",
    strong("plus de 1 000 élèves"),
    " dans les moments clés de leur parcours : choix de spécialités, construction du projet d’études, orientation vers le supérieur, ",
    strong("Parcoursup, dossiers de candidature"),
    " ou réorientation.",
  ],
];

/** Paragraphe de conviction, mis en exergue dans une carte pêche. */
export const johanaConviction: Paragraph = [
  "Toutes ces expériences ont nourri une conviction forte : ",
  em("l’orientation ne consiste pas simplement à choisir une formation ou un métier."),
  " Il s’agit d’abord de mieux se connaître, de comprendre ses forces et ses envies, ",
  em("d’explorer les possibles avec réalisme"),
  " et de construire un projet à la fois enthousiasmant et réalisable.",
];

/** Paragraphes suivant l’encart de conviction. */
export const johanaOutro: Paragraph[] = [
  [
    "C’est dans cet esprit que j’ai créé ",
    strong("Lab’Orientation"),
    " : un espace bienveillant où chaque jeune peut prendre le temps de réfléchir, poser ses questions, découvrir ses ressources, ouvrir le champ des possibles et avancer avec davantage de confiance.",
  ],
  [
    "Mon parcours m’a également permis de développer d’autres compétences, notamment autour de la ",
    strong("gestion du stress et de la respiration"),
    ", que je peux mobiliser lorsque cela est pertinent dans le parcours du jeune.",
  ],
];

/** Phrase de clôture, séparée par un filet, en Newsreader italique. */
export const johanaClosing =
  "Une expérience internationale, une expertise de l’orientation scolaire et universitaire et une connaissance du monde professionnel : trois regards complémentaires que je mets au service de chaque projet.";

export const johanaSignature = {
  main: "Explorer. Comprendre. Choisir.",
  sub: "C’est l’esprit de Lab’Orientation.",
};

export const troisRegards = [
  "Une expérience internationale",
  "Une expertise de l’orientation scolaire et universitaire",
  "Une connaissance du monde professionnel",
];

export const parcours = [
  "Juriste de formation",
  "Gestion des ressources humaines",
  "Direction d’une entreprise de services",
  "Conseil en orientation, réseau AEFE",
  "Formatrice de conseillers, Campus France",
];

/** Chips de la section Qui suis-je ? de l’accueil. */
export const johanaChips = [
  "Réseau AEFE",
  "Formatrice Campus France",
  "Systèmes français et internationaux",
  "Méthode certifiée",
];

/** Deux paragraphes de présentation, version courte, pour l’accueil. */
export const johanaTeaser = [
  "Conseillère d’orientation et fondatrice de Lab’Orientation. Un parcours entre le Moyen-Orient, la France, l’Amérique du Nord, l’Espagne et l’Afrique de l’Ouest, une formation de juriste, puis la gestion des ressources humaines et la direction d’une entreprise de services. Depuis onze ans, l’orientation scolaire et universitaire, en lycées français à l’étranger comme auprès de jeunes venus d’autres systèmes.",
  "Une expérience internationale, une expertise de l’orientation et une connaissance du monde professionnel : trois regards complémentaires au service de chaque projet.",
];
