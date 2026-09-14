import Image from "next/image";
import Link from "next/link";
import { routes, site } from "@/content/site";

/** Header simplifié du tunnel : pas de navigation, juste de quoi appeler. */
export function BookingHeader() {
  return (
    <header className="border-b border-slate/10 bg-cream">
      <div className="gutter flex items-center justify-between gap-4 py-[14px] nav:py-4">
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
        <a
          href={site.phoneHref}
          className="text-[13px]/[1.3] font-medium text-slate/75 hover:text-slate nav:text-[14px]"
        >
          Besoin d’aide ? {site.phone}
        </a>
      </div>
    </header>
  );
}
