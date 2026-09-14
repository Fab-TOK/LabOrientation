import { SESSION_MINUTES, slotEnd } from "@/lib/availability";
import { shortDate } from "@/lib/dates";
import { formatLabels } from "@/content/form-options";
import type { BookingState } from "@/lib/booking-context";

/** Récapitulatif collant, mis à jour à chaque sélection. */
export function BookingSummary({
  booking,
  note,
  children,
}: {
  booking: BookingState;
  note: string;
  children?: React.ReactNode;
}) {
  const rows = [
    { label: "Durée", value: `${SESSION_MINUTES} minutes` },
    { label: "Date", value: booking.date ? shortDate(booking.date) : "À choisir" },
    {
      label: "Créneau",
      value: booking.slot ? `${booking.slot} à ${slotEnd(booking.slot)}` : "À choisir",
    },
    {
      label: "Format",
      value: booking.format ? formatLabels[booking.format] : "À préciser",
    },
    { label: "Langue", value: "Français ou anglais" },
  ];

  return (
    <aside className="rounded-[14px] bg-slate p-5 text-cream nav:sticky nav:top-5 nav:rounded-[16px] nav:p-7">
      <div className="t-label text-cream/55">Récapitulatif</div>
      <p className="mt-3 font-serif text-[21px]/[1.25] text-peach nav:text-[24px]">
        Séance de mise en contact
      </p>

      <dl className="mt-5 flex flex-col gap-3 border-t border-cream/20 pt-4">
        {rows.map((row) => (
          <div key={row.label} className="flex items-baseline justify-between gap-4">
            <dt className="text-[13px]/none text-cream/70">{row.label}</dt>
            <dd className="text-right text-[13.5px]/[1.3] font-medium">{row.value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-5 flex items-baseline justify-between gap-4 border-t border-cream/20 pt-4">
        <span className="t-label text-cream/55">À régler</span>
        <span className="font-serif text-[26px]/none text-peach">Gratuit</span>
      </div>

      {children}

      <p className="mt-4 text-[12.5px]/[1.6] text-cream/70">{note}</p>
    </aside>
  );
}
