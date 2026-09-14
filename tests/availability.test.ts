import { describe, expect, it } from "vitest";
import {
  hasAnyAvailability,
  MockAvailabilityProvider,
  MONTHS_OPEN_AHEAD,
  slotEnd,
  toIsoDate,
} from "@/lib/availability";

/** Date de référence fixe : un mercredi, pour des tests reproductibles. */
const TODAY = new Date(2026, 9, 7); // 7 octobre 2026
const provider = new MockAvailabilityProvider(TODAY);

describe("MockAvailabilityProvider", () => {
  it("renvoie un jour par date du mois", async () => {
    const october = await provider.getMonth(2026, 10);
    expect(october).toHaveLength(31);
    expect(october[0].date).toBe("2026-10-01");
    expect(october.at(-1)?.date).toBe("2026-10-31");
  });

  it("gère un mois de 28 jours", async () => {
    const february = await provider.getMonth(2027, 2);
    expect(february).toHaveLength(28);
  });

  it("ferme les samedis et les dimanches", async () => {
    const october = await provider.getMonth(2026, 10);
    const weekend = october.filter((day) => {
      const weekday = new Date(`${day.date}T00:00:00Z`).getUTCDay();
      return weekday === 0 || weekday === 6;
    });

    expect(weekend.length).toBeGreaterThan(0);
    expect(weekend.every((day) => day.state === "closed")).toBe(true);
  });

  it("ferme le passé et le jour même", async () => {
    const october = await provider.getMonth(2026, 10);
    const past = october.filter((day) => day.date <= "2026-10-07");

    expect(past).toHaveLength(7);
    expect(past.every((day) => day.state === "closed")).toBe(true);
  });

  it("laisse vide un mois au-delà de la fenêtre d’ouverture", async () => {
    const far = new Date(TODAY);
    far.setMonth(far.getMonth() + MONTHS_OPEN_AHEAD + 1);

    const days = await provider.getMonth(far.getFullYear(), far.getMonth() + 1);

    expect(days.every((day) => day.state === "closed")).toBe(true);
    expect(hasAnyAvailability(days)).toBe(false);
  });

  it("propose des créneaux sur le mois courant", async () => {
    const october = await provider.getMonth(2026, 10);
    expect(hasAnyAvailability(october)).toBe(true);
  });

  it("ne laisse jamais un jour disponible sans créneau libre", async () => {
    const october = await provider.getMonth(2026, 10);

    for (const day of october) {
      if (day.state === "available") {
        expect(day.slots.some((slot) => slot.state === "free")).toBe(true);
      } else {
        expect(day.slots).toHaveLength(0);
      }
    }
  });

  it("est déterministe : deux appels donnent le même mois", async () => {
    const first = await provider.getMonth(2026, 11);
    const second = await provider.getMonth(2026, 11);
    expect(first).toEqual(second);
  });
});

describe("toIsoDate", () => {
  it("complète le mois et le jour sur deux chiffres", () => {
    expect(toIsoDate(2026, 1, 3)).toBe("2026-01-03");
    expect(toIsoDate(2026, 12, 31)).toBe("2026-12-31");
  });
});

describe("slotEnd", () => {
  it("ajoute trente minutes", () => {
    expect(slotEnd("09:00")).toBe("09:30");
    expect(slotEnd("10:30")).toBe("11:00");
    expect(slotEnd("18:30")).toBe("19:00");
  });

  it("repasse à zéro après minuit", () => {
    expect(slotEnd("23:45")).toBe("00:15");
  });
});
