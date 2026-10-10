import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Bits";
import { routes } from "@/content/site";
import SiteLayout from "./(site)/layout";

/* Next.js répond 404 et ajoute lui-même la consigne de non-indexation. */
export const metadata: Metadata = {
  title: "Page introuvable",
};

/**
 * Page d’erreur de toute adresse inconnue. Elle vit à la racine, hors du
 * groupe `(site)` dont elle n’hérite donc pas : elle reprend son gabarit
 * (header et footer) explicitement.
 */
export default function NotFound() {
  return (
    <SiteLayout>
      <section className="gutter pt-10 pb-16 nav:pt-[90px] nav:pb-[120px]">
        <Eyebrow>Page introuvable</Eyebrow>
        {/* `text-wrap` remplace l’équilibrage des titres : sur téléphone, il
            couperait en « Cette page / est introuvable » alors que « est »
            tient sur la première ligne. */}
        <h1 className="t-h1-page mt-3 text-wrap nav:mt-4">Cette page est introuvable</h1>
        <p className="mt-4 max-w-[52ch] text-[14.5px]/[1.7] text-slate/80 text-pretty nav:mt-[18px] nav:text-[17px]">
          L’adresse est peut-être mal saisie, ou la page a changé de place. Repartez de
          l’accueil, ou allez directement à ce qui vous intéresse.
        </p>

        <div className="mt-6 flex flex-wrap gap-3 nav:mt-8">
          <ButtonLink href={routes.home}>Retour à l’accueil</ButtonLink>
          <ButtonLink href={routes.offers} variant="secondary">
            Voir les offres
          </ButtonLink>
        </div>

        <div className="mt-6 flex flex-wrap gap-x-7 gap-y-4 nav:mt-7">
          <Link href={routes.faq} className="link-underline text-[14px]">
            Questions fréquentes <span aria-hidden="true">→</span>
          </Link>
          <Link href={routes.contact} className="link-underline text-[14px]">
            Prenons contact <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
