/**
 * Disponibilités de l’entretien préalable gratuit.
 *
 * Les vraies disponibilités viendront de l’agenda Google de la conseillère.
 * En attendant, `MockAvailabilityProvider` produit un mois cohérent et
 * reproductible. Pour brancher Google, écrire une classe qui respecte
 * `AvailabilityProvider` et la renvoyer depuis `getAvailabilityProvider()` :
 * ni l’interface HTTP ni l’interface utilisateur ne changent.
 */

import { site } from "@/content/site";

/** Durée de la séance, lue dans `content/site.ts` : un seul chiffre à changer. */
export const SESSION_MINUTES = site.freeSessionMinutes;
export const TIMEZONE_LABEL = "GMT+1, Cotonou";

/** Au-delà, l’agenda n’est pas encore ouvert : le mois revient vide. */
export const MONTHS_OPEN_AHEAD = 3;

export type SlotState = "free" | "full";
export type DayState = "available" | "full" | "closed";

export type DaySlot = { time: string; state: SlotState };

export type DayAvailability = {
  /** Jour au format ISO `AAAA-MM-JJ`. */
  date: string;
  state: DayState;
  slots: DaySlot[];
};

export interface AvailabilityProvider {
  /** `month` est le numéro du mois, de 1 à 12. */
  getMonth(year: number, month: number): Promise<DayAvailability[]>;
}

const DAY_SLOTS = ["09:00", "10:30", "14:00", "15:30", "17:00", "18:30"];

export class MockAvailabilityProvider implements AvailabilityProvider {
  constructor(private readonly today = new Date()) {}

  async getMonth(year: number, month: number): Promise<DayAvailability[]> {
    const daysInMonth = new Date(Date.UTC(year, month, 0)).getUTCDate();
    const days: DayAvailability[] = [];

    for (let day = 1; day <= daysInMonth; day += 1) {
      const date = toIsoDate(year, month, day);
      days.push({ date, ...this.describe(date) });
    }

    return days;
  }

  private describe(date: string): { state: DayState; slots: DaySlot[] } {
    const closed = { state: "closed" as const, slots: [] };

    if (date <= this.todayIso()) return closed;
    if (!this.withinOpenWindow(date)) return closed;

    const weekday = new Date(`${date}T00:00:00Z`).getUTCDay();
    if (weekday === 0 || weekday === 6) return closed;

    const seed = hash(date);

    /* Environ un jour ouvré sur six est complet. */
    if (seed % 6 === 0) return { state: "full", slots: [] };

    const slots = DAY_SLOTS.map((time, index) => ({
      time,
      state: (seed >> index) % 5 === 0 ? ("full" as const) : ("free" as const),
    }));

    if (slots.every((slot) => slot.state === "full")) {
      return { state: "full", slots: [] };
    }

    return { state: "available", slots };
  }

  private todayIso(): string {
    return toIsoDate(
      this.today.getFullYear(),
      this.today.getMonth() + 1,
      this.today.getDate(),
    );
  }

  private withinOpenWindow(date: string): boolean {
    const limit = new Date(this.today);
    limit.setMonth(limit.getMonth() + MONTHS_OPEN_AHEAD);
    return date <= toIsoDate(limit.getFullYear(), limit.getMonth() + 1, limit.getDate());
  }
}

const provider: AvailabilityProvider = new MockAvailabilityProvider();

export function getAvailabilityProvider(): AvailabilityProvider {
  return provider;
}

export function toIsoDate(year: number, month: number, day: number): string {
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

/** Hachage déterministe : le même jour donne toujours les mêmes créneaux. */
function hash(value: string): number {
  let result = 0;
  for (let index = 0; index < value.length; index += 1) {
    result = (result * 31 + value.charCodeAt(index)) >>> 0;
  }
  return result;
}

export function hasAnyAvailability(days: DayAvailability[]): boolean {
  return days.some((day) => day.state === "available");
}

/** Heure de fin du créneau, `HH:MM` + la durée de la séance. */
export function slotEnd(time: string): string {
  const [hours, minutes] = time.split(":").map(Number);
  const total = hours * 60 + minutes + SESSION_MINUTES;
  return `${String(Math.floor(total / 60) % 24).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
}
