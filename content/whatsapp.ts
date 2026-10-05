import { site } from "@/content/site";

/**
 * Liens WhatsApp avec un message déjà rédigé : le visiteur n’a plus qu’à
 * l’envoyer. Le numéro reste caché dans `site.whatsapp`, jamais affiché.
 */
export const whatsappHref = (message: string) =>
  `${site.whatsapp}?text=${encodeURIComponent(message)}`;

/** Colonne de la page Contact, avant toute demande. Nomme l’offre d’où vient le visiteur. */
export const introMessage = (offer?: string) =>
  `Bonjour Johana, je vous écris depuis le site ${site.name}. J’aimerais en savoir plus sur ${
    offer ?? "vos accompagnements"
  }.`;

/** Écran de confirmation : le nom tel que tapé dans le formulaire, et l’offre choisie s’il y en a une. */
export const followUpMessage = (name: string, offer?: string) =>
  `Bonjour Johana, je suis ${name}. Je viens de vous envoyer une demande depuis le site ${site.name}${
    offer ? ` au sujet de l’offre ${offer}` : ""
  }.`;
