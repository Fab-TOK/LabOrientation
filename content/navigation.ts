import { routes } from "./site";

export type NavItem = { label: string; href: string };

/**
 * Navigation desktop — cinq entrées, conformément à la maquette.
 * « Ma vision » n’y figure volontairement pas : la page reste accessible
 * depuis l’accueil, la page Qui suis-je ? et le menu mobile.
 */
export const desktopNav: NavItem[] = [
  { label: "Accueil", href: routes.home },
  { label: "Qui suis-je ?", href: routes.about },
  { label: "Nos offres", href: routes.offers },
  { label: "Témoignages", href: routes.testimonials },
  { label: "FAQ", href: routes.faq },
];

/** Menu mobile — sept entrées, dont « Ma vision » et « Prenons contact ». */
export const mobileNav: NavItem[] = [
  { label: "Accueil", href: routes.home },
  { label: "Qui suis-je ?", href: routes.about },
  { label: "Ma vision", href: routes.vision },
  { label: "Nos offres", href: routes.offers },
  { label: "Témoignages", href: routes.testimonials },
  { label: "FAQ", href: routes.faq },
  { label: "Prenons contact", href: routes.contact },
];

/** Colonne « Le site » du footer — cinq entrées, comme sur la maquette. */
export const footerNav: NavItem[] = [
  { label: "Qui suis-je ?", href: routes.about },
  { label: "Ma vision", href: routes.vision },
  { label: "Nos offres", href: routes.offers },
  { label: "Témoignages", href: routes.testimonials },
  { label: "FAQ", href: routes.faq },
];
