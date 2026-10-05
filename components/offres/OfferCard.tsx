"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { Audience } from "@/components/ui/Bits";
import type { DetailItem, Offer } from "@/content/formulas";
import { routes } from "@/content/site";
import { cn } from "@/lib/cn";

const BADGE_CLASS: Record<Offer["kind"], string> = {
  parcours: "badge-formule",
  candidature: "badge-candidature",
  module: "badge-module",
};

/**
 * Fiche d’offre de la page Nos offres.
 *
 * Le dépliant est replié au chargement et s’anime via `.accordion-panel`,
 * la même mécanique que l’accordéon de la FAQ. Dans les familles à dépliant,
 * la grille parente est en `items-start` : une carte dépliée s’allonge seule.
 * Les candidatures n’en ont pas : leurs cartes prennent la hauteur de la plus
 * haute, et le paragraphe extensible aligne leurs pieds de carte.
 */
export function OfferCard({ offer }: { offer: Offer }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <li
      id={offer.slug}
      className="flex scroll-mt-24 flex-col overflow-hidden rounded-[14px] border border-slate/14 bg-offwhite nav:rounded-[16px]"
    >
      <div className="flex flex-1 flex-col p-[22px] pb-0 nav:p-[30px] nav:pb-0">
        {/* Garde-fou : si un libellé s’allonge, la pastille descend d’une
            ligne au lieu d’écraser le badge, qui ne se coupe jamais. */}
        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
          <span className={BADGE_CLASS[offer.kind]}>{offer.badge}</span>
          {offer.kind !== "module" && (
            <span className="badge-level">
              <Audience label={offer.audience} />
            </span>
          )}
        </div>

        <h3
          className={cn(
            "mt-4 font-serif text-[23px]/[1.15] text-balance nav:mt-[18px]",
            offer.kind === "candidature" ? "nav:text-[26px]" : "nav:text-[28px]",
          )}
        >
          {offer.title}
        </h3>

        <p className="mt-2 text-[14.5px]/[1.45] font-medium text-terracotta nav:text-[15px]">
          {offer.tagline}
        </p>

        {offer.description && (
          <p className="mt-3 flex-1 text-[14.5px]/[1.65] text-slate/78 text-pretty nav:mt-[14px] nav:text-[15px]/[1.7]">
            {offer.description}
          </p>
        )}

        {/* Deux colonnes centrées, séparées par un filet court. */}
        <div className="mt-4 grid grid-cols-[1fr_1px_1fr] items-center gap-4 border-t border-slate/12 py-[14px] text-center nav:mt-[22px] nav:gap-5 nav:py-4">
          <Stat stat={offer.stats[0]} />
          <span className="h-[34px] w-px justify-self-center bg-slate/14" aria-hidden="true" />
          <Stat stat={offer.stats[1]} />
        </div>
      </div>

      {/* Boîte encastrée, pas un bandeau : les marges horizontales valent le
          `padding` de la carte pour s’aligner sur le texte au-dessus. */}
      {offer.detail && (
        <div className="mx-[22px] mt-2 rounded-xl bg-sand nav:mx-[30px] nav:mt-[10px]">
          <h4>
            <button
              type="button"
              onClick={() => setOpen((current) => !current)}
              aria-expanded={open}
              aria-controls={panelId}
              className="flex w-full items-center justify-between gap-3 px-4 py-[14px] text-left nav:gap-[14px] nav:px-5 nav:py-[15px]"
            >
              <span className="text-[11px]/none font-bold tracking-[0.08em] text-slate/62 uppercase nav:text-[12px]">
                {offer.detail.label}
              </span>
              <span
                aria-hidden="true"
                className="flex-none text-[18px]/none text-terracotta nav:text-[20px]"
              >
                {open ? "−" : "+"}
              </span>
            </button>
          </h4>

          <div id={panelId} className="accordion-panel" data-open={open}>
            <div>
              <ul className="flex flex-col gap-[10px] px-4 pb-4 nav:gap-[11px] nav:px-5 nav:pb-[18px]">
                {offer.detail.items.map((item) => (
                  <li
                    key={typeof item === "string" ? item : `${item.text}-${item.aside.join("")}`}
                    className="flex gap-[11px] text-[14.5px]/[1.5] text-slate/85 nav:gap-3 nav:text-[15px]"
                  >
                    <span aria-hidden="true" className="font-bold text-turquoise">
                      ·
                    </span>
                    <DetailText item={item} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      <div className="p-[22px] pt-[18px] nav:p-[30px] nav:pt-[22px]">
        <Link
          href={`${routes.contact}?formule=${offer.slug}`}
          className="block rounded-full bg-slate p-[14px] text-center text-[14px]/none font-bold text-cream transition-colors hover:bg-slate/90"
        >
          {offer.cta}
        </Link>
      </div>
    </li>
  );
}

/** « Faire le point sur soi (1ʳᵉ partie) », la parenthèse en gris. */
function DetailText({ item }: { item: DetailItem }) {
  if (typeof item === "string") return <span>{item}</span>;
  return (
    <span>
      {item.text}{" "}
      <span className="text-slate/50">
        <Audience label={item.aside} />
      </span>
    </span>
  );
}

function Stat({ stat }: { stat: { label: string; value: string } }) {
  return (
    <div>
      <div className="text-[10.5px]/none font-bold tracking-[0.1em] text-slate/50 uppercase nav:text-[11px]">
        {stat.label}
      </div>
      <div className="mt-[6px] font-serif text-[19px]/none nav:mt-[7px] nav:text-[22px]">
        {stat.value}
      </div>
    </div>
  );
}
