"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Bits";
import { Calendar } from "@/components/reserver/Calendar";
import { ProgressSteps } from "@/components/reserver/ProgressSteps";
import { BookingSummary } from "@/components/reserver/BookingSummary";
import { routes } from "@/content/site";
import { useBooking } from "@/lib/booking-context";

export default function BookingDatePage() {
  const router = useRouter();
  const { booking, update } = useBooking();
  const ready = Boolean(booking.date && booking.slot);

  return (
    <>
      <section className="gutter pt-6 pb-6 nav:pt-10 nav:pb-8">
        <Eyebrow>Séance de mise en contact</Eyebrow>
        <h1 className="t-h1-page mt-3 nav:mt-4 nav:text-[48px]/[1.05]">
          Réserver mes 30 minutes offertes
        </h1>
        <p className="mt-3 max-w-[74ch] text-[14.5px]/[1.7] text-slate/78 text-pretty nav:mt-[14px] nav:text-[16.5px]">
          Cet échange est gratuit et sans engagement. Il sert à comprendre votre situation et
          à identifier ensemble la formule adaptée. Le tarif et les modalités de paiement
          sont abordés pendant l’entretien.
        </p>
        <ProgressSteps current={1} />
      </section>

      <div className="gutter grid items-start gap-5 nav:grid-cols-[1.35fr_0.65fr] nav:gap-8">
        <Calendar
          date={booking.date}
          slot={booking.slot}
          onSelectDate={(date) => update({ date, slot: "" })}
          onSelectSlot={(slot) => update({ slot })}
        />

        <BookingSummary
          booking={booking}
          note="Aucun paiement sur le site. Le tarif de l’accompagnement est discuté pendant cet échange, une fois la formule identifiée."
        >
          <Button
            block
            className="mt-5"
            disabled={!ready}
            onClick={() => router.push(routes.bookingInfo)}
          >
            Continuer
          </Button>
          {!ready && (
            <p className="mt-3 text-[12.5px]/[1.5] text-cream/70">
              Choisissez une date puis un créneau pour continuer.
            </p>
          )}
        </BookingSummary>
      </div>
    </>
  );
}
