"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { site, type Price, type PricingZone } from "@/content/site";
import { cn } from "@/lib/cn";

const zones = site.pricing.zones;

/**
 * Bloc « Les tarifs » de la page Nos offres, avec l’interrupteur
 * Bénin / International.
 *
 * Le Bénin est sélectionné dans le rendu serveur : les bons montants sont
 * dans le HTML, sans attendre le script. L’interrupteur est un groupe de
 * boutons radio (une seule tabulation, flèches pour changer).
 *
 * Disposition dans `globals.css` (`.pricing`) : sur téléphone titre,
 * interrupteur, prix, texte ; sur ordinateur titre, texte et interrupteur à
 * gauche, les deux prix à droite. L’ordre du document reste celui du
 * téléphone, le plus logique à la lecture : choisir une zone, puis lire ses
 * prix.
 */
export function PricingToggle() {
  const [active, setActive] = useState<PricingZone["id"]>(zones[0].id);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);

  function select(index: number) {
    setActive(zones[index].id);
    buttons.current[index]?.focus();
  }

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const last = zones.length - 1;
    const next =
      event.key === "ArrowRight" || event.key === "ArrowDown"
        ? index === last ? 0 : index + 1
        : event.key === "ArrowLeft" || event.key === "ArrowUp"
          ? index === 0 ? last : index - 1
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? last
              : null;
    if (next === null) return;
    event.preventDefault();
    select(next);
  }

  return (
    <div className="pricing rounded-[16px] bg-slate px-5 py-6 text-cream nav:rounded-[18px] nav:px-10 nav:py-[34px]">
      <h2 className="pricing-title font-serif text-[24px]/[1.15] nav:text-[30px]">Les tarifs</h2>

      <div className="pricing-toggle mt-[14px] nav:mt-5">
        <div
          role="radiogroup"
          aria-label="Zone des tarifs"
          className="inline-flex rounded-full border border-cream/22 bg-cream/8 p-1"
        >
          {zones.map((zone, index) => {
            const checked = zone.id === active;
            return (
              <button
                key={zone.id}
                ref={(element) => {
                  buttons.current[index] = element;
                }}
                type="button"
                role="radio"
                aria-checked={checked}
                tabIndex={checked ? 0 : -1}
                onClick={() => setActive(zone.id)}
                onKeyDown={(event) => onKeyDown(event, index)}
                /* 10,35 px en haut, 9,65 px en bas : mesuré, c’est ce qui centre
                   exactement les capitales de Figtree dans la bulle. */
                className={cn(
                  "toggle-option rounded-full px-[18px] pt-[10.35px] pb-[9.65px] text-[13.5px]/none transition-colors nav:px-5",
                  checked
                    ? "bg-peach font-semibold text-slate"
                    : "font-medium text-cream/78 hover:text-cream",
                )}
              >
                {/* Le libellé en gras, invisible, réserve la largeur : la bulle ne
                    change pas de taille quand l’option passe en gras. */}
                <span className="toggle-option-label" data-label={zone.label}>
                  {zone.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Les nouveaux montants sont annoncés aux lecteurs d’écran. */}
      <div aria-live="polite" className="pricing-prices mt-5 grid grid-cols-2 nav:mt-0 nav:flex">
        <PriceColumn label="La séance, à partir de" slot="session" active={active} />
        <PriceColumn
          label="Un parcours, à partir de"
          slot="parcours"
          active={active}
          className="border-l border-cream/20 pl-4 nav:pl-11"
        />
      </div>

      <p className="pricing-text mt-[18px] max-w-[40ch] text-[13px]/[1.6] text-cream/80 text-pretty nav:mt-[10px] nav:text-[14px]/[1.65]">
        Le tarif exact dépend de la formule. Il est précisé lors de l’entretien préalable
        gratuit. {site.pricing.note}
      </p>
    </div>
  );
}

function PriceColumn({
  label,
  slot,
  active,
  className,
}: {
  label: string;
  slot: "session" | "parcours";
  active: PricingZone["id"];
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-2 pr-[14px] nav:gap-[10px] nav:border-l nav:border-cream/20 nav:px-11 nav:last:pr-0",
        className,
      )}
    >
      <span className="text-[12px]/[1.3] font-medium text-cream/72 nav:text-[12.5px]">{label}</span>
      {/* Tous les montants dans la même case : la colonne prend la largeur du
          plus long, et rien ne bouge à la bascule. Seul le montant actif est
          visible et lu. */}
      <span className="grid">
        {zones.map((zone) =>
          zone.id === active ? (
            <Amount key={zone.id} price={zone[slot]} testId={`price-${slot}`} />
          ) : (
            <Amount key={zone.id} price={zone[slot]} hidden />
          ),
        )}
      </span>
    </div>
  );
}

function Amount({ price, hidden, testId }: { price: Price; hidden?: boolean; testId?: string }) {
  return (
    <span
      data-testid={testId}
      aria-hidden={hidden || undefined}
      className={cn(
        "[grid-area:1/1] font-serif text-[28px]/none tracking-[-0.01em] whitespace-nowrap text-peach nav:text-[50px]",
        hidden && "invisible",
      )}
    >
      {price.amount}
      {/* Espace pour la lecture et la copie ; l’écart visible vient de la marge. */}
      <span className="sr-only"> </span>
      <span className="ml-[5px] font-sans text-[11px]/none font-semibold tracking-normal nav:text-[20px]">
        {price.currency}
      </span>
    </span>
  );
}
