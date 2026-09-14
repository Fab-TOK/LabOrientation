import { describe, expect, it } from "vitest";
import { buildIcs, googleCalendarUrl, type CalendarEvent } from "@/lib/ics";

const event: CalendarEvent = {
  date: "2026-10-13",
  slot: "14:00",
  title: "Séance de mise en contact — Lab’Orientation",
  description: "Échange de 30 minutes, gratuit; sans engagement",
  location: "Visioconférence, lien par e-mail",
};

const ics = buildIcs(event, new Date("2026-09-14T08:30:00Z"));

describe("buildIcs", () => {
  it("porte les en-têtes obligatoires", () => {
    expect(ics.startsWith("BEGIN:VCALENDAR")).toBe(true);
    expect(ics.endsWith("END:VCALENDAR")).toBe(true);
    expect(ics).toContain("VERSION:2.0");
    expect(ics).toContain("BEGIN:VEVENT");
    expect(ics).toContain("END:VEVENT");
    expect(ics).toMatch(/^UID:.+@laborientation$/m);
  });

  it("sépare les lignes par CRLF, comme l’exige la RFC 5545", () => {
    expect(ics).toContain("\r\n");
    expect(ics.split("\r\n").length).toBeGreaterThan(10);
  });

  it("convertit l’heure de Cotonou (UTC+1) en UTC", () => {
    expect(ics).toContain("DTSTART:20261013T130000Z");
    expect(ics).toContain("DTEND:20261013T133000Z");
  });

  it("horodate l’événement", () => {
    expect(ics).toContain("DTSTAMP:20260914T083000Z");
  });

  it("échappe les virgules et les points-virgules", () => {
    expect(ics).toContain("DESCRIPTION:Échange de 30 minutes\\, gratuit\\; sans engagement");
    expect(ics).toContain("LOCATION:Visioconférence\\, lien par e-mail");
  });

  it("échappe les sauts de ligne", () => {
    const multiline = buildIcs({ ...event, description: "Ligne 1\nLigne 2" });
    expect(multiline).toContain("DESCRIPTION:Ligne 1\\nLigne 2");
  });
});

describe("googleCalendarUrl", () => {
  it("compose un lien de modèle avec la plage horaire en UTC", () => {
    const url = new URL(googleCalendarUrl(event));

    expect(url.origin + url.pathname).toBe("https://calendar.google.com/calendar/render");
    expect(url.searchParams.get("action")).toBe("TEMPLATE");
    expect(url.searchParams.get("dates")).toBe("20261013T130000Z/20261013T133000Z");
    expect(url.searchParams.get("text")).toBe(event.title);
    expect(url.searchParams.get("location")).toBe(event.location);
  });
});
