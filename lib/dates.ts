/**
 * Formatage des dates en français. Les jours circulent sous forme de chaînes
 * `AAAA-MM-JJ` : on les interprète toujours en UTC pour qu’un fuseau négatif
 * ne fasse pas reculer l’affichage d’un jour.
 */

const utc = (iso: string) => new Date(`${iso}T12:00:00Z`);

const format = (iso: string, options: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat("fr-FR", { ...options, timeZone: "UTC" }).format(utc(iso));

/** « mardi 13 octobre 2026 ». */
export const longDate = (iso: string) =>
  format(iso, { weekday: "long", day: "numeric", month: "long", year: "numeric" });

/** « mardi 13 octobre ». */
export const dayAndMonth = (iso: string) =>
  format(iso, { weekday: "long", day: "numeric", month: "long" });

/** « mar. 13 oct. 2026 ». */
export const shortDate = (iso: string) =>
  format(iso, { weekday: "short", day: "numeric", month: "short", year: "numeric" });

/** « Octobre 2026 ». */
export function monthTitle(year: number, month: number): string {
  const label = new Intl.DateTimeFormat("fr-FR", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, 1)));
  return label.charAt(0).toUpperCase() + label.slice(1);
}

export function capitalise(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

/** Jour de la semaine, 0 = lundi, pour aligner la grille du calendrier. */
export function mondayIndex(iso: string): number {
  return (utc(iso).getUTCDay() + 6) % 7;
}

export function addMonths(year: number, month: number, delta: number) {
  const date = new Date(Date.UTC(year, month - 1 + delta, 1));
  return { year: date.getUTCFullYear(), month: date.getUTCMonth() + 1 };
}
