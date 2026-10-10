"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import { desktopNav } from "@/content/navigation";
import { routes, site } from "@/content/site";
import { cn } from "@/lib/cn";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  /* À la fermeture, le focus revient au bouton qui a ouvert le menu. Fonction
     stable : le menu en dépend pour ses écouteurs. */
  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    menuButton.current?.focus();
  }, []);

  return (
    <header className="border-b border-slate/10 bg-cream">
      <div className="gutter flex items-center justify-between py-[14px] nav:py-4">
        <Link href={routes.home} aria-label="Lab’Orientation, retour à l’accueil">
          <Image
            src="/logo-full.png"
            alt="Lab’Orientation"
            width={340}
            height={100}
            priority
            className="h-6 w-auto nav:h-[34px]"
          />
        </Link>

        <div className="hidden items-center gap-[26px] nav:flex">
          <nav aria-label="Navigation principale" className="flex gap-[22px]">
            {desktopNav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "t-nav transition-colors",
                    /* De 900 à 1 023 px, avec « Les accompagnements », les cinq
                       liens et le bouton ne tiennent pas : « Accueil » s’efface,
                       le logo y mène déjà. */
                    item.href === routes.home && "max-lg:hidden",
                    active
                      ? "border-b-2 border-turquoise pb-1 text-slate"
                      : "text-slate/70 hover:text-slate",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          {/* Sur la page Contact, la maquette remplace l’appel à l’action par le
              téléphone : le visiteur y est déjà. */}
          {pathname === routes.contact ? (
            <a
              href={site.phoneHref}
              className="rounded-full bg-slate px-5 py-[11px] text-[14px]/none font-semibold text-cream"
            >
              {site.phone}
            </a>
          ) : (
            <Link
              href={routes.contact}
              className="rounded-full bg-terracotta px-5 py-[11px] text-[14px]/none font-semibold text-white transition-colors hover:bg-[#c04d2f]"
            >
              Prenons contact
            </Link>
          )}
        </div>

        <button
          ref={menuButton}
          type="button"
          onClick={() => setMenuOpen(true)}
          aria-label="Ouvrir le menu"
          aria-expanded={menuOpen}
          className="flex size-10 flex-none flex-col items-center justify-center gap-1 rounded-[9px] border border-slate/14 bg-offwhite nav:hidden"
        >
          <span className="h-0.5 w-4 rounded-sm bg-slate" />
          <span className="h-0.5 w-4 rounded-sm bg-slate" />
        </button>
      </div>

      <MobileMenu open={menuOpen} onClose={closeMenu} pathname={pathname} />
    </header>
  );
}

function isActive(pathname: string, href: string) {
  if (href === routes.home) return pathname === routes.home;
  return pathname === href || pathname.startsWith(`${href}/`);
}
