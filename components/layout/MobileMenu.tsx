"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { mobileNav } from "@/content/navigation";
import { routes } from "@/content/site";
import { ButtonLink } from "@/components/ui/Button";

export function MobileMenu({
  open,
  onClose,
  pathname,
}: {
  open: boolean;
  onClose: () => void;
  pathname: string;
}) {
  const closeButton = useRef<HTMLButtonElement>(null);

  /* Défilement du corps bloqué tant que le menu est ouvert. */
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
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

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-slate text-cream nav:hidden"
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
          className="flex size-10 items-center justify-center rounded-[10px] border border-cream/25 bg-cream/10 text-[22px] font-light leading-none text-cream"
        >
          ×
        </button>
      </div>

      <div className="flex-1 px-[18px] pt-[26px] pb-8">
        <div className="t-eyebrow text-cream/50">Navigation</div>

        <nav className="mt-[10px]" aria-label="Navigation mobile">
          {mobileNav.map((item) => {
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
                className="flex items-center justify-between border-b border-cream/18 py-[18px]"
              >
                <span
                  className={`font-serif text-[27px]/[1.15] ${active ? "text-peach" : "text-cream"}`}
                >
                  {item.label}
                </span>
                {active ? (
                  <span className="size-[7px] rounded-full bg-turquoise" aria-hidden="true" />
                ) : (
                  <span className="text-[17px]/none text-cream/40" aria-hidden="true">
                    →
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="mt-[26px] rounded-[16px] border border-cream/18 bg-cream/8 p-[22px]">
          <span className="badge-peach text-[10.5px]">Gratuit</span>
          <div className="mt-3 font-serif text-[22px]/[1.2] text-peach">
            30 minutes pour faire le point
          </div>
          <p className="mt-2 t-body-sm text-cream/82">
            Sans engagement, en présentiel au Bénin ou en visioconférence.
          </p>
          <ButtonLink href={routes.booking} block className="mt-4" onClick={onClose}>
            Réserver 30 min offertes
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
