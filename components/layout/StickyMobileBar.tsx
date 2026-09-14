import Link from "next/link";
import { routes, site } from "@/content/site";

/**
 * Barre d’action collante du mobile.
 *
 * `position: sticky; bottom: 0` sur le dernier enfant d’un conteneur qui
 * couvre toute la page : la barre reste épinglée au bas de la fenêtre pendant
 * tout le défilement, conformément au handoff.
 */
export function StickyMobileBar() {
  return (
    <div className="sticky bottom-0 z-40 flex gap-[10px] border-t border-slate/12 bg-cream/96 px-[18px] pt-3 pb-4 backdrop-blur-sm nav:hidden">
      <Link
        href={routes.booking}
        className="flex-1 rounded-full bg-terracotta p-[15px] text-center text-[14.5px]/none font-semibold text-white"
      >
        Réserver 30 min offertes
      </Link>
      <a
        href={site.whatsapp}
        target="_blank"
        rel="noreferrer noopener"
        aria-label={`Écrire sur WhatsApp au ${site.phone}`}
        className="flex size-[50px] flex-none items-center justify-center rounded-full bg-turquoise text-[10.5px]/none font-semibold text-white"
      >
        WA
      </a>
    </div>
  );
}
