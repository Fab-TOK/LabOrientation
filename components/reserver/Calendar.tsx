"use client";

import { useEffect, useMemo, useState } from "react";
import {
  hasAnyAvailability,
  slotEnd,
  TIMEZONE_LABEL,
  type DayAvailability,
} from "@/lib/availability";
import { addMonths, capitalise, dayAndMonth, mondayIndex, monthTitle } from "@/lib/dates";
import { cn } from "@/lib/cn";

const WEEKDAYS = ["LUN", "MAR", "MER", "JEU", "VEN", "SAM", "DIM"];

export function Calendar({
  date,
  slot,
  onSelectDate,
  onSelectSlot,
}: {
  date: string;
  slot: string;
  onSelectDate: (date: string) => void;
  onSelectSlot: (slot: string) => void;
}) {
  const today = useMemo(() => new Date(), []);
  const [cursor, setCursor] = useState(() => ({
    year: today.getFullYear(),
    month: today.getMonth() + 1,
  }));
  const [days, setDays] = useState<DayAvailability[] | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setDays(null);
    setFailed(false);

    fetch(`/api/disponibilites?year=${cursor.year}&month=${cursor.month}`)
      .then((response) => {
        if (!response.ok) throw new Error("indisponible");
        return response.json();
      })
      .then((payload: { days: DayAvailability[] }) => {
        if (!cancelled) setDays(payload.days);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });

    return () => {
      cancelled = true;
    };
  }, [cursor]);

  const selectedDay = days?.find((day) => day.date === date);
  const leading = days ? mondayIndex(days[0].date) : 0;

  const goTo = (delta: number) => {
    setCursor((current) => addMonths(current.year, current.month, delta));
  };

  /* Le mois en cours est la borne basse : inutile de proposer le passé. */
  const atFirstMonth =
    cursor.year === today.getFullYear() && cursor.month === today.getMonth() + 1;

  return (
    <div className="rounded-[14px] border border-slate/14 bg-white p-5 nav:rounded-[16px] nav:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-[16px]/[1.3] font-semibold nav:text-[17px]">
          Choisissez une date
        </h2>
        <div className="flex items-center gap-2">
          <MonthButton label="Mois précédent" onClick={() => goTo(-1)} disabled={atFirstMonth}>
            ‹
          </MonthButton>
          <span className="min-w-[9.5rem] text-center text-[15px]/none font-semibold">
            {monthTitle(cursor.year, cursor.month)}
          </span>
          <MonthButton label="Mois suivant" onClick={() => goTo(1)}>
            ›
          </MonthButton>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-7 gap-1 text-center text-[10.5px]/none font-bold tracking-[0.08em] text-slate/50">
        {WEEKDAYS.map((weekday) => (
          <span key={weekday}>{weekday}</span>
        ))}
      </div>

      {failed ? (
        <p className="mt-5 rounded-[10px] bg-sand p-4 text-[14px]/[1.6] text-slate/75">
          Les disponibilités n’ont pas pu être chargées. Réessayez dans un instant, ou
          écrivez-nous sur WhatsApp.
        </p>
      ) : !days ? (
        <div className="mt-2 grid grid-cols-7 gap-1" aria-hidden="true">
          {Array.from({ length: 35 }).map((_, index) => (
            <div key={index} className="h-[45px] animate-pulse rounded-[10px] bg-slate/5" />
          ))}
        </div>
      ) : (
        <>
          <div className="mt-2 grid grid-cols-7 gap-1" role="grid">
            {Array.from({ length: leading }).map((_, index) => (
              <span key={`lead-${index}`} aria-hidden="true" />
            ))}
            {days.map((day) => (
              <DayCell
                key={day.date}
                day={day}
                selected={day.date === date}
                onSelect={() => onSelectDate(day.date)}
              />
            ))}
          </div>

          {!hasAnyAvailability(days) && (
            <p className="mt-4 rounded-[10px] bg-sand p-4 text-[14px]/[1.6] text-slate/75">
              Aucun créneau disponible ce mois-ci. Essayez le mois suivant, ou écrivez-nous
              sur WhatsApp et nous trouverons un moment.
            </p>
          )}

          <Legend />
        </>
      )}

      <div className="mt-6 border-t border-slate/12 pt-6">
        {selectedDay && selectedDay.slots.length > 0 ? (
          <>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-[15px]/[1.3] font-semibold">
                Créneaux du {dayAndMonth(selectedDay.date)}
              </h3>
              <span className="text-[12.5px]/none text-slate/60">{TIMEZONE_LABEL}</span>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-[10px] nav:grid-cols-4">
              {selectedDay.slots.map((entry) => {
                const full = entry.state === "full";
                const selected = entry.time === slot;
                return (
                  <button
                    key={entry.time}
                    type="button"
                    disabled={full}
                    onClick={() => onSelectSlot(entry.time)}
                    aria-pressed={selected}
                    title={full ? "Créneau complet" : `${entry.time} à ${slotEnd(entry.time)}`}
                    className={cn(
                      "rounded-[10px] border-[1.5px] py-[13px] text-[14.5px]/none transition-colors",
                      full
                        ? "cursor-not-allowed border-slate/12 text-slate/30 line-through"
                        : selected
                          ? "border-turquoise bg-turquoise font-semibold text-white"
                          : "border-slate/18 font-medium hover:border-slate/35",
                    )}
                  >
                    {entry.time}
                  </button>
                );
              })}
            </div>
          </>
        ) : (
          <p className="text-[14px]/[1.6] text-slate/60">
            Sélectionnez une date disponible pour voir les créneaux.
          </p>
        )}
      </div>

      <div className="mt-6 flex gap-3 rounded-[12px] bg-peach p-4 nav:p-5">
        <span
          aria-hidden="true"
          className="flex size-[22px] flex-none items-center justify-center rounded-full bg-slate text-[12px]/none font-bold text-peach"
        >
          i
        </span>
        <p className="text-[13.5px]/[1.6] text-slate/85">
          En présentiel à Cotonou ou en visioconférence, selon votre lieu de résidence. Le
          lien de visioconférence est joint à la confirmation et au rendez-vous ajouté dans
          votre agenda.
        </p>
      </div>
    </div>
  );
}

function DayCell({
  day,
  selected,
  onSelect,
}: {
  day: DayAvailability;
  selected: boolean;
  onSelect: () => void;
}) {
  const number = Number(day.date.slice(-2));
  const unavailable = day.state !== "available";

  if (unavailable) {
    return (
      <span
        className="py-[14px] text-center text-[14.5px]/none font-medium text-slate/30"
        aria-label={`${capitalise(dayAndMonth(day.date))}, indisponible`}
      >
        {number}
      </span>
    );
  }

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      aria-label={capitalise(dayAndMonth(day.date))}
      className={cn(
        "rounded-[10px] py-[14px] text-center text-[14.5px]/none transition-colors",
        selected
          ? "bg-slate font-semibold text-cream"
          : "border border-slate/14 bg-cream font-medium hover:border-slate/35",
      )}
    >
      {number}
    </button>
  );
}

function Legend() {
  return (
    <ul className="mt-5 flex flex-wrap gap-4 text-[12.5px]/none text-slate/65">
      <li className="flex items-center gap-2">
        <span className="size-3 rounded-[4px] border border-slate/14 bg-cream" aria-hidden="true" />
        Disponible
      </li>
      <li className="flex items-center gap-2">
        <span className="size-3 rounded-[4px] bg-slate" aria-hidden="true" />
        Sélectionné
      </li>
      <li className="flex items-center gap-2">
        <span className="size-3 rounded-[4px] bg-slate/15" aria-hidden="true" />
        Indisponible
      </li>
    </ul>
  );
}

function MonthButton({
  label,
  onClick,
  disabled,
  children,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="flex size-8 items-center justify-center rounded-[9px] border border-slate/14 text-[18px]/none text-slate transition-colors hover:border-slate/35 disabled:opacity-30"
    >
      {children}
    </button>
  );
}
