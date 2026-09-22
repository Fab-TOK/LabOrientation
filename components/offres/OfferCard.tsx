"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { Audience } from "@/components/ui/Bits";
import type { Offer } from "@/content/formulas";
import { routes } from "@/content/site";
import { cn } from "@/lib/cn";

/**
 * Fiche d’offre de la page Nos offres.
 *
 * Le dépliant est replié au chargement et s’anime via `.accordion-panel`,
 * la même mécanique que l’accordéon de la FAQ. La carte s’allonge seule :
 * la grille parente est en `items-start`, aucune voisine ne suit.
 */
export function OfferCard({ offer }: { offer: Offer }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <li
      id={offer.slug}
      className={cn(
        "scroll-mt-24 overflow-hidden rounded-[14px] bg-offwhite nav:rounded-[16px]",
        offer.featured ? "border-[1.5px] border-slate" : "border border-slate/14",
      )}
    >
      <div className="flex flex-col p-[22px] pb-0 nav:p-[30px] nav:pb-0">
        {/* Garde-fou : si un libellé s’allonge, la pastille descend d’une
            ligne au lieu d’écraser le badge, qui ne se coupe jamais. */}
        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
          <span className={offer.kind === "module" ? "badge-module" : "badge-formule"}>
            {offer.badge}
          </span>
          {offer.kind === "parcours" && (
            <span className="badge-level">
              <Audience label={offer.audience} />
            </span>
          )}
        </div>

        <h3 className="mt-4 font-serif text-[23px]/[1.15] nav:mt-[18px] nav:text-[28px]">
          {offer.title}
        </h3>

        <p className="mt-2 text-[14.5px]/[1.45] font-medium text-terracotta nav:text-[15px]">
          {offer.tagline}
        </p>

        {offer.description && (
          <p className="mt-3 text-[14.5px]/[1.65] text-slate/78 text-pretty nav:mt-[14px] nav:text-[15px]/[1.7]">
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
                  key={item}
                  className="flex gap-[11px] text-[14.5px]/[1.5] text-slate/85 nav:gap-3 nav:text-[15px]"
                >
                  <span aria-hidden="true" className="font-bold text-turquoise">
                    ·
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

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
