import { NextResponse } from "next/server";
import { participantTypes, formatLabels, levelLabels } from "@/content/form-options";
import { site } from "@/content/site";
import {
  getAvailabilityProvider,
  SESSION_MINUTES,
  slotEnd,
  TIMEZONE_LABEL,
} from "@/lib/availability";
import { capitalise, longDate } from "@/lib/dates";
import { buildIcs, type CalendarEvent } from "@/lib/ics";
import { getMailer, INBOX } from "@/lib/mailer";
import { bookingSchema, fieldErrors } from "@/lib/validation";

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Requête illisible." }, { status: 400 });
  }

  const parsed = bookingSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ errors: fieldErrors(parsed.error) }, { status: 422 });
  }

  const data = parsed.data;

  /* Le créneau est revérifié côté serveur : la page a pu rester ouverte
     pendant qu’il était pris par quelqu’un d’autre. */
  const [year, month] = data.date.split("-").map(Number);
  const days = await getAvailabilityProvider().getMonth(year, month);
  const day = days.find((entry) => entry.date === data.date);
  const slot = day?.slots.find((entry) => entry.time === data.slot);

  if (!day || day.state !== "available" || !slot || slot.state !== "free") {
    return NextResponse.json(
      { error: "Ce créneau vient d’être pris. Choisissez-en un autre." },
      { status: 409 },
    );
  }

  const when = `${capitalise(longDate(data.date))}, ${data.slot} à ${slotEnd(data.slot)} (${TIMEZONE_LABEL})`;

  const event: CalendarEvent = {
    date: data.date,
    slot: data.slot,
    title: `Séance de mise en contact · ${site.name}`,
    description: `Échange de ${SESSION_MINUTES} minutes avec ${site.founder}. Le lien de visioconférence est envoyé par e-mail. Une question : ${site.phone}.`,
    location:
      data.format === "presentiel" ? "Cotonou, Bénin" : "Visioconférence, lien par e-mail",
  };

  const ics = buildIcs(event);

  await getMailer().send({
    to: INBOX,
    subject: `Réservation : ${data.name}, ${data.date} ${data.slot}`,
    text: [
      when,
      "",
      `Participant : ${label(participantTypes, data.participant)}`,
      `Nom : ${data.name}`,
      `Nom du jeune : ${data.youngName || "non renseigné"}`,
      `E-mail : ${data.email}`,
      `Téléphone : ${data.phone || "non renseigné"}`,
      `Niveau : ${data.level ? (levelLabels[data.level] ?? data.level) : "non renseigné"}`,
      `Format : ${data.format ? formatLabels[data.format] : "non renseigné"}`,
      "",
      "Où en êtes-vous :",
      data.situation || "non renseigné",
    ].join("\n"),
    attachments: [
      { filename: "rendez-vous.ics", content: ics, contentType: "text/calendar" },
    ],
  });

  await getMailer().send({
    to: data.email,
    subject: `Votre rendez-vous est confirmé · ${site.name}`,
    text: [
      `Bonjour ${data.name},`,
      "",
      "Votre séance de mise en contact est confirmée :",
      when,
      "",
      "L’invitation est jointe à ce message. Le lien de visioconférence vous parviendra avant l’échange.",
      `Un empêchement ? Écrivez sur WhatsApp : ${site.whatsapp}`,
      "",
      site.signature,
    ].join("\n"),
    attachments: [
      { filename: "rendez-vous.ics", content: ics, contentType: "text/calendar" },
    ],
  });

  return NextResponse.json({ ok: true, date: data.date, slot: data.slot });
}

function label(options: readonly { value: string; label: string }[], value: string) {
  return options.find((option) => option.value === value)?.label ?? value;
}
