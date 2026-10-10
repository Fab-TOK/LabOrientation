"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { mobileNav } from "@/content/navigation";
import { routes } from "@/content/site";
import { ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

/**
 * Menu plein écran du téléphone.
 *
 * Il reste toujours dans la page : retiré dès la fermeture, il disparaîtrait
 * d’un coup, sans laisser le temps au fondu. Fermé, il est invisible et inactif
 * (`inert`) : ni cliquable, ni atteignable au clavier, ni lu par les lecteurs
 * d’écran. L’animation, fondu puis liens en cascade, est dans `globals.css`
 * (`.mobile-menu`).
 */
export function MobileMenu({
  open,
  onClose,
  pathname,
}: {
  open: boolean;
  onClose: () => void;
  pathname: string;
}) {
  const panel = useRef<HTMLDivElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);

  /* Ouvert : défilement du corps bloqué, menu repris en haut, focus sur la croix. */
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    if (panel.current) panel.current.scrollTop = 0;
    closeButton.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  return (
    <div
      ref={panel}
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      data-open={open}
      inert={!open}
      className="mobile-menu fixed inset-0 z-50 flex flex-col overflow-y-auto bg-slate text-cream nav:hidden"
    >
      <div className="flex items-center justify-between border-b border-cream/18 px-[18px] py-[14px]">
        <Image
          src="/logo-icon.png"
          alt="Lab’Orientation"
          width={120}
          height={120}
          className="h-7 w-auto brightness-0 invert"
        />
        <button
          ref={closeButton}
          type="button"
          onClick={onClose}
          aria-label="Fermer le menu"
          className="flex size-10 items-center justify-center rounded-full border border-cream/25 bg-cream/10 text-[22px] font-light leading-none text-cream"
        >
          ×
        </button>
      </div>

      <div className="flex-1 px-[18px] pt-[22px] pb-8">
        <div className="t-eyebrow text-cream/50">Menu</div>

        {/* Liens numérotés 01 à 07, comme les sections du site ; `--i` donne
            leur rang dans la cascade. */}
        <nav className="mt-[6px]" aria-label="Navigation mobile">
          {mobileNav.map((item, index) => {
            const active =
              item.href === routes.home
                ? pathname === routes.home
                : pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                aria-current={active ? "page" : undefined}
                className="mobile-menu-item flex items-center gap-[14px] border-b border-cream/12 py-[13px]"
                style={{ "--i": index } as React.CSSProperties}
              >
                <span
                  className="w-5 flex-none text-[12px]/none font-semibold text-turquoise"
                  aria-hidden="true"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                {/* 26 px sous 340 px : avec le numéro, « Les accompagnements »
                    passerait sinon sur deux lignes. */}
                <span
                  className={cn(
                    "flex-1 font-serif text-[28px]/[1.15] max-[340px]:text-[26px]",
                    active ? "text-peach" : "text-cream",
                  )}
                >
                  {item.label}
                </span>
                {active && (
                  <span className="size-[7px] flex-none rounded-full bg-turquoise" aria-hidden="true" />
                )}
              </Link>
            );
          })}
        </nav>

        <div
          className="mobile-menu-item mt-[26px] rounded-[16px] border border-cream/18 bg-cream/8 p-[22px]"
          style={{ "--i": mobileNav.length } as React.CSSProperties}
        >
          <span className="badge-peach text-[10.5px]">Gratuit</span>
          <div className="mt-3 font-serif text-[22px]/[1.2] text-peach">
            20 minutes pour faire le point
          </div>
          <p className="mt-2 t-body-sm text-cream/82">
            Sans engagement, en présentiel au Bénin ou en visioconférence.
          </p>
          <ButtonLink href={routes.contact} block className="mt-4" onClick={onClose}>
            Réserver mes 20 min offertes
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
