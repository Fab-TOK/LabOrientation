"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ProgressSteps } from "@/components/reserver/ProgressSteps";
import { formatLabels } from "@/content/form-options";
import { routes, site } from "@/content/site";
import { SESSION_MINUTES, slotEnd, TIMEZONE_LABEL } from "@/lib/availability";
import { useBooking } from "@/lib/booking-context";
import { capitalise, longDate } from "@/lib/dates";
import { buildIcs, googleCalendarUrl, type CalendarEvent } from "@/lib/ics";

const nextSteps = [
  {
    title: "Avant l’échange",
    text: "Rien à préparer. Si le jeune peut être présent, c’est mieux, mais ce n’est pas obligatoire.",
  },
  {
    title: "Pendant les 30 minutes",
    text: "Nous faisons le point sur la situation et j’identifie avec vous la formule adaptée, son tarif et les modalités de paiement.",
  },
  {
    title: "Après",
    text: "Vous recevez un récapitulatif écrit. Vous décidez ensuite librement de poursuivre ou non.",
  },
];

export default function BookingConfirmationPage() {
  const router = useRouter();
  const { booking, ready } = useBooking();

  useEffect(() => {
    if (ready && !booking.confirmed) router.replace(routes.booking);
  }, [ready, booking.confirmed, router]);

  if (!ready || !booking.confirmed) return null;

  const event: CalendarEvent = {
    date: booking.date,
    slot: booking.slot,
    title: `Séance de mise en contact · ${site.name}`,
    description: `Échange de ${SESSION_MINUTES} minutes avec ${site.founder}. Le lien de visioconférence vous est envoyé par e-mail. Une question : ${site.phone}.`,
    location:
      booking.format === "presentiel" ? "Cotonou, Bénin" : "Visioconférence, lien par e-mail",
  };

  const icsHref = `data:text/calendar;charset=utf-8,${encodeURIComponent(buildIcs(event))}`;

  return (
    <>
      <section className="gutter pt-6 nav:pt-10">
        <ProgressSteps current={3} />
      </section>

      <div className="gutter mt-6 grid items-start gap-4 nav:mt-9 nav:grid-cols-[1.15fr_0.85fr] nav:gap-6">
        <div className="rounded-[18px] bg-peach p-6 nav:rounded-[20px] nav:p-11">
          <span
            className="flex size-12 items-center justify-center rounded-full bg-slate text-[22px]/none text-peach"
            aria-hidden="true"
          >
            ✓
          </span>
          <h1 className="mt-5 font-serif text-[30px]/[1.1] tracking-[-0.02em] text-balance nav:text-[44px]">
            C’est confirmé, à très bientôt
          </h1>
          <p className="mt-4 max-w-[54ch] text-[14.5px]/[1.7] text-slate/85 nav:text-[16.5px]">
            Un e-mail de confirmation vient de partir vers{" "}
            <strong className="font-semibold">{booking.email}</strong>, avec le lien de
            visioconférence et l’invitation à ajouter à votre agenda.
          </p>
        </div>

        <div className="rounded-[18px] border border-slate/14 bg-cream p-6 nav:rounded-[20px] nav:p-9">
          <div className="t-label text-slate/50">Votre rendez-vous</div>
          <p className="mt-3 font-serif text-[24px]/[1.15] nav:text-[28px]">
            {capitalise(longDate(booking.date))}
          </p>
          <p className="mt-1 text-[15px]/[1.4] text-slate/75">
            {booking.slot} à {slotEnd(booking.slot)}, {TIMEZONE_LABEL}
          </p>

          <dl className="mt-5 flex flex-col gap-[10px] border-t border-slate/12 pt-4">
            <Row label="Séance" value={`Mise en contact, ${SESSION_MINUTES} min`} />
            <Row
              label="Format"
              value={booking.format ? formatLabels[booking.format] : "À préciser ensemble"}
            />
            <Row label="Montant" value="Gratuit" />
          </dl>

          <div className="mt-6 flex flex-col gap-3">
            <a
              href={googleCalendarUrl(event)}
              target="_blank"
              rel="noreferrer noopener"
              className="btn btn-secondary btn-block"
            >
              Ajouter à mon agenda Google
            </a>
            <a
              href={icsHref}
              download="laborientation-rendez-vous.ics"
              className="btn btn-secondary btn-block"
            >
              Télécharger l’invitation .ics
            </a>
          </div>
        </div>
      </div>

      <section className="gutter mt-8 nav:mt-12">
        <h2 className="t-h2">Ce qui se passe maintenant</h2>
        <ul className="mt-5 grid gap-3 md:grid-cols-2 nav:grid-cols-3 nav:gap-[22px]">
          {nextSteps.map((step) => (
            <li
              key={step.title}
              className="rounded-[14px] border border-slate/14 bg-sand p-5 nav:rounded-[16px] nav:p-7"
            >
              <h3 className="text-[15.5px]/[1.3] font-semibold">{step.title}</h3>
              <p className="mt-2 text-[14px]/[1.65] text-slate/78 nav:text-[14.5px]">
                {step.text}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-4 flex flex-col gap-4 rounded-[14px] bg-slate p-5 text-cream nav:mt-[22px] nav:flex-row nav:items-center nav:justify-between nav:rounded-[16px] nav:px-8 nav:py-7">
          <div>
            <h2 className="font-serif text-[22px]/[1.2] nav:text-[26px]">Un empêchement ?</h2>
            <p className="mt-2 max-w-[60ch] text-[14px]/[1.65] text-cream/82">
              Prévenez-moi par WhatsApp et nous décalerons le rendez-vous, sans aucune
              formalité.
            </p>
          </div>
          <a
            href={site.whatsapp}
            target="_blank"
            rel="noreferrer noopener"
            className="btn btn-on-slate flex-none"
          >
            {site.phone}
          </a>
        </div>
      </section>
    </>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt className="text-[13px]/none text-slate/60">{label}</dt>
      <dd className="text-right text-[13.5px]/[1.3] font-medium">{value}</dd>
    </div>
  );
}
