import { SESSION_MINUTES } from "./availability";

/**
 * Génération de l’invitation `.ics` et du lien « Ajouter à Google Agenda ».
 *
 * Les créneaux sont exprimés à l’heure de Cotonou (UTC+1, sans heure d’été),
 * convertis en UTC pour le fichier : c’est ce que lisent tous les agendas.
 */

const COTONOU_OFFSET_HOURS = 1;

export type CalendarEvent = {
  /** Jour au format `AAAA-MM-JJ`. */
  date: string;
  /** Début du créneau au format `HH:MM`, heure de Cotonou. */
  slot: string;
  title: string;
  description: string;
  location: string;
};

function toUtc(date: string, time: string): Date {
  const [year, month, day] = date.split("-").map(Number);
  const [hours, minutes] = time.split(":").map(Number);
  return new Date(Date.UTC(year, month - 1, day, hours - COTONOU_OFFSET_HOURS, minutes));
}

/** Horodatage ICS : `20261013T130000Z`. */
function stamp(date: Date): string {
  return `${date.toISOString().replace(/[-:]/g, "").split(".")[0]}Z`;
}

/** Les virgules, points-virgules et sauts de ligne doivent être échappés. */
function escapeText(value: string): string {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\r?\n/g, "\\n");
}

export function buildIcs(event: CalendarEvent, now = new Date()): string {
  const start = toUtc(event.date, event.slot);
  const end = new Date(start.getTime() + SESSION_MINUTES * 60_000);
  const uid = `${event.date}-${event.slot.replace(":", "")}@laborientation`;

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Lab'Orientation//Reservation//FR",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${stamp(now)}`,
    `DTSTART:${stamp(start)}`,
    `DTEND:${stamp(end)}`,
    `SUMMARY:${escapeText(event.title)}`,
    `DESCRIPTION:${escapeText(event.description)}`,
    `LOCATION:${escapeText(event.location)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

export function googleCalendarUrl(event: CalendarEvent): string {
  const start = toUtc(event.date, event.slot);
  const end = new Date(start.getTime() + SESSION_MINUTES * 60_000);

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.title,
    dates: `${stamp(start)}/${stamp(end)}`,
    details: event.description,
    location: event.location,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
