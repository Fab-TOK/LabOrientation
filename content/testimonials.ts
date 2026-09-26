/**
 * Les six témoignages, reproduits tels que fournis par leurs auteurs.
 *
 * NE PAS CORRIGER : l’orthographe et l’accentuation du témoignage de
 * M. Cosme Zinsou Capo sont conservées telles quelles. C’est une décision
 * assumée, signalée dans le handoff.
 */

export type TestimonialVariant =
  | "wide-light"
  | "wide-slate"
  | "split-light"
  | "split-peach"
  | "turquoise";

export type AvatarTone = "turquoise" | "peach" | "slate" | "terracotta" | "white";

export type Testimonial = {
  id: string;
  name: string;
  initial: string;
  avatarTone: AvatarTone;
  context: string;
  badge?: string;
  variant: TestimonialVariant;
  /** Premier paragraphe, en Newsreader. */
  lead: string;
  /** Paragraphes suivants, en Figtree. */
  body: string[];
  /** Bloc « Mon parcours depuis », séparé par un filet. */
  since?: { label: string; paragraphs: string[] };
  /** Extrait repris sur l’accueil, avec la ligne de contexte raccourcie. */
  excerpt?: { quote: string; context: string };
};

export const testimonials: Testimonial[] = [
  {
    id: "laura-l",
    name: "Laura L.",
    initial: "L",
    avatarTone: "turquoise",
    context:
      "Accompagnée au lycée. Master en management, Louvain School of Management. Aujourd’hui entrepreneure sur l’île de Samos, en Grèce.",
    badge: "Ancienne élève",
    variant: "wide-light",
    lead: "J’ai rencontré Johana au lycée, à l’âge où tout le monde autour de vous a un avis sur votre avenir. Elle était la conseillère d’orientation. Ce qui m’a frappée chez elle, c’est à quel point elle est accessible. Elle connaît les ados, elle sait comment ils fonctionnent, et elle arrive à les mettre à l’aise en quelques minutes.",
    body: [
      "La communication avec elle est simple et jamais oppressante. Aucun discours moralisateur, aucune pression sur le fait de devoir savoir à 17 ans ce qu’on veut faire de sa vie. Chacun avance à son rythme et elle s’adapte à celui de la personne en face d’elle. Il y a toujours la petite pointe d’humour ou le mot qui détend l’atmosphère quand le sujet devient lourd, et l’orientation, à cet âge-là, ça devient vite lourd. Cela ne l’empêche pas d’être franche pour autant : quand quelque chose ne tient pas debout, elle vous le dit, et c’est souvent à ce moment-là que la réflexion avance vraiment au lieu de tourner en rond. C’est ce qui fait qu’on ose lui parler honnêtement, et c’est exactement ce dont on a besoin quand il faut prendre des décisions qui engagent les années suivantes.",
    ],
    since: {
      label: "Mon parcours depuis",
      paragraphs: [
        "J’ai commencé par un bachelier en marketing à l’EPHEC, en Belgique, puis j’ai fait une année passerelle pour rejoindre le master en management de la Louvain School of Management, que j’ai terminé en deux ans avec la mention Distinction. Mon stage de fin de master m’a menée à Cotonou, au Bénin, dans une plateforme de livraison, où j’ai supervisé les opérations quotidiennes et le suivi des flux financiers.",
        "Aujourd’hui je vis sur l’île de Samos, en Grèce, où je gère mes propres commerces : des studios en location saisonnière, un café et un mini-market. Je m’occupe de tout, des clients aux fournisseurs, de l’équipe à la communication et aux systèmes internes. Rien de ce parcours n’était tracé d’avance, et c’est justement pour ça que ces rendez-vous ont compté. On ne m’a jamais poussée dans une case, on m’a aidée à réfléchir par moi-même, et ça me sert encore aujourd’hui.",
      ],
    },
    excerpt: {
      quote:
        "Aucun discours moralisateur, aucune pression sur le fait de devoir savoir à 17 ans ce qu’on veut faire de sa vie. Chacun avance à son rythme et elle s’adapte à celui de la personne en face d’elle.",
      context: "Master LSM, aujourd’hui entrepreneure en Grèce",
    },
  },
  {
    id: "malika-assouma",
    name: "Malika Assouma",
    initial: "M",
    avatarTone: "peach",
    context:
      "18 ans. Première année d’ingénierie, Bachelor of Applied Science, UBC Okanagan, Canada. Spécialisation visée en intelligence artificielle.",
    badge: "Études à l’étranger",
    variant: "wide-slate",
    lead: "Bonjour, je m’appelle Malika, j’ai 18 ans et je suis aujourd’hui en première année d’ingénierie dans le Bachelor of Applied Science (BASc) à l’UBC Okanagan, au Canada, avec une spécialisation visée en intelligence artificielle.",
    body: [
      "Avant d’arriver là, Madame Ghionda m’a accompagnée pendant toute mon année de première et de terminale. Elle m’a orientée, guidée, et a pris le temps de m’écouter, alors même qu’elle était officiellement assignée au programme français.",
      "Même si j’étais assez sûre de vouloir étudier aux États-Unis ou au Canada, elle ne m’a jamais mise de côté pour autant : elle m’a suivie aussi bien sur mes démarches pour la France que pour l’étranger. Comme je ne passais pas par Parcoursup, elle a pris en charge l’envoi de mes dossiers à chaque université à laquelle je postulais, avec mes lettres de motivation et mes bulletins.",
      "Elle a toujours été disponible pour des réunions et pour faire le point sur mon dossier. Grâce à cet accompagnement, j’ai eu les ressources et le suivi nécessaires pour construire mon projet et intégrer l’école où je suis aujourd’hui.",
    ],
    excerpt: {
      quote:
        "Comme je ne passais pas par Parcoursup, elle a pris en charge l’envoi de mes dossiers à chaque université à laquelle je postulais, avec mes lettres de motivation et mes bulletins.",
      context: "Ingénierie, UBC Okanagan, Canada",
    },
  },
  {
    id: "shirley",
    name: "Shirley",
    initial: "S",
    avatarTone: "turquoise",
    context: "Ancienne élève, aujourd’hui à l’université",
    variant: "split-light",
    lead: "J’ai eu la chance d’être accompagnée par Madame Ghionda, et ce qui m’a particulièrement marquée chez elle, c’est son implication auprès de chacun de ses élèves. Elle était toujours là pour nous pousser à anticiper, à respecter les deadlines et à ne pas attendre le dernier moment pour faire nos démarches.",
    body: [
      "Aujourd’hui encore, à l’université, je me rends compte que j’ai gardé cette habitude de tout faire le plus tôt possible et c’est pour le mieux !",
      "J’ai beaucoup apprécié sa disponibilité pour chacun de ses élèves même si nous étions parfois + de 150 elle faisait tout pour qu’on avance au même rythme. On se sentait vraiment accompagnés !",
    ],
  },
  {
    id: "lucie-romera-pradal",
    name: "Lucie Romera Pradal",
    initial: "L",
    avatarTone: "slate",
    context: "Parent de deux élèves",
    variant: "split-peach",
    lead: "Johana a accompagné le projet de mes enfants avec une conviction, une lucidité et une bienveillance rare. Elle a su pointer les lacunes, les difficultés. Elle a su anticiper les complications, nous permettant, à nous, parents, de réorienter les désidératas et donc de se re positionner sur les établissements les plus susceptibles d’accompagner leurs projets.",
    body: [
      "Résultat : une enfant inscrite et acceptée à l’école des pupilles de l’air et de l’espace de Montbonnot Saint Martin en classe de seconde. Un garçon en sport études Basket à Paris en seconde également. Elle a accompagné deux enfants et leur rêves pour en faire une réalité. Merci infiniment Johana. Reconnaissance éternelle.",
    ],
    excerpt: {
      quote:
        "Elle a su anticiper les complications, nous permettant, à nous, parents, de réorienter les désidératas et donc de se repositionner sur les établissements les plus susceptibles d’accompagner leurs projets.",
      context: "Parent de deux élèves",
    },
  },
  {
    id: "cosme-zinsou-capo",
    name: "M. Cosme Zinsou Capo",
    initial: "C",
    avatarTone: "terracotta",
    context:
      "Parent de deux élèves accompagnés au lycée français Montaigne, réseau AEFE, entre 2017 et 2020.",
    badge: "Parent",
    variant: "wide-light",
    lead: "Madame GHIONDA, je tiens a vous remercier sincerement pour votre Accompagnement lors de l’orientation de ma Fille Sara Adjoba CAPO en 2017 d’abord et en 2018 ensuite. Par votre Sens aigu de la Responsabilite, de l’Ecoute des Parents d’eleves et de votre Souci de les voir reussir leur cursus academique ou professionnel. Je me souviens de nos nombreuses seances de travail dans votre bureau au lycée français Montaigne (AEFE).",
    body: [
      "Le Resultat est la. Sara a terminé ses etudes a Trith Saint Leger. En 2021, Elle a travaillé à Paris avant de rentrer definitivement en 2022 a Abidjan en Cote d’Ivoire. Aujourd’hui, Elle travaille a Cotonou au BENIN et est autonome financierement.",
      "En ce qui concerne mon fils Claude, votre Accompagnement specifique et l’appui que vous nous aviez apporté dans le cadre de la recherche supplementaire d’une Famille d’accueil lui a permis d’être Aujourd’hui en fin de Licence en Comptabilite après avoir validé son BAC PRO COMPTABILITE ET GESTION au Lycee Simone VEIL a CONFLANS SAINTE HONORINE et ensuite son BTS en COMPTABILITE a l’ECOLE NORMALE DE COMMERCE a Bessieres dans le 17 Arrondissement de Paris. En Octobre 2026, et si tout va bien, il debutera son cursus de Master en COMPTABILITE. Il vise l’Expertise comptable. Depuis Septembre 2025, il travaille chez AXA en alternance. Il est autonome financierement aussi.",
      "Merci infiniment pour votre Accompagnement dans le cadre de l’orientation de mes deux enfants à MONTAIGNE entre 2017 et 2020. Mes sinceres remerciements.",
    ],
  },
  {
    id: "sara-capo",
    name: "Sara Capo",
    initial: "S",
    avatarTone: "turquoise",
    context:
      "Accompagnée en 3ᵉ au lycée français Montaigne, Cotonou. Aujourd’hui pâtissière et boulangère.",
    badge: "Ancienne élève",
    variant: "wide-slate",
    lead: "J’aimerais remercier Mme Ghionda, qui m’a suivie et orientée dans mon cursus professionnel, lorsque j’étais en 3ᵉ à Cotonou, à Montaigne. Et cette orientation a été un succès : j’ai obtenu mon diplôme et je vis aujourd’hui de ce métier, qui est la pâtisserie ainsi que la boulangerie. Je me lance même en autodidacte. Si c’était à refaire, je me réfèrerais encore à elle.",
    body: [],
  },
  {
    id: "zahra-wazni",
    name: "Mme Zahra Wazni",
    initial: "Z",
    avatarTone: "white",
    context: "Parent d’un élève accompagné jusque dans les démarches Parcoursup.",
    variant: "turquoise",
    lead: "Mme Ghionda, je tiens à vous remercier pour votre accompagnement dans l’orientation de mon fils. Grâce à vos conseils, votre écoute et votre disponibilité, il a pu y voir plus clair et trouver une orientation qui lui correspond, alors qu’au départ, nous étions vraiment perdus entre les différentes universités, écoles et formations. Vous m’avez également beaucoup aidée dans les démarches Parcoursup et avez toujours été présente lorsque nous avions besoin d’aide. Un grand merci pour votre professionnalisme et votre précieux accompagnement !",
    body: [],
  },
];

/** Les trois extraits repris sur l’accueil, dans l’ordre de la maquette. */
export const testimonialExcerpts = testimonials.filter(
  (testimonial): testimonial is Testimonial & { excerpt: NonNullable<Testimonial["excerpt"]> } =>
    Boolean(testimonial.excerpt),
);

/** Compteur du hero de la page Témoignages — dérivé, jamais codé en dur. */
export const testimonialCount = testimonials.length;
