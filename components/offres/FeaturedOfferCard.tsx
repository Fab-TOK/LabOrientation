import Link from "next/link";
import { Audience } from "@/components/ui/Bits";
import type { Offer } from "@/content/formulas";
import { routes } from "@/content/site";

/**
 * Cap Réussite : grande carte ardoise sous les trois autres parcours.
 *
 * À gauche l’identité de l’offre, à droite sa composition (deux
 * accompagnements reliés par un « + »), ses chiffres et le bouton. Une seule
 * colonne sur téléphone. Pas de dépliant : la composition dit déjà tout.
 */
export function FeaturedOfferCard({ offer }: { offer: Offer & Required<Pick<Offer, "featured">> }) {
  const [first, second] = offer.featured.composition;

  return (
    <article
      id={offer.slug}
      className="mt-4 grid scroll-mt-24 gap-6 rounded-[14px] bg-slate p-[22px] text-cream nav:mt-[22px] nav:gap-12 nav:rounded-[16px] nav:px-9 nav:py-[34px] lg:grid-cols-[1.2fr_1fr] lg:items-center"
    >
      <div>
        {/* Ordinateur : les trois pastilles sur une ligne, le public à droite.
            Téléphone : « Le plus complet » passe seul à la ligne suivante. */}
        <div className="flex flex-wrap items-center gap-x-[10px] gap-y-3">
          <span className="badge-formule">{offer.badge}</span>
          <span className="order-last basis-full nav:order-none nav:basis-auto">
            <span className="badge-featured">{offer.featured.highlight}</span>
          </span>
          <span className="badge-level ml-auto">
            <Audience label={offer.audience} />
          </span>
        </div>
        <h3 className="mt-[14px] font-serif text-[26px]/[1.15] nav:mt-5 nav:text-[32px]/[1.12]">
          {offer.title}
        </h3>
        <p className="mt-[7px] text-[14px]/[1.45] font-medium text-peach nav:mt-2 nav:text-[15px]">
          {offer.tagline}
        </p>
        <p className="mt-[14px] max-w-[52ch] text-[14.5px]/[1.65] text-cream/85 text-pretty nav:text-[15.5px]/[1.7]">
          {offer.description}
        </p>
      </div>

      <div>
        <div className="flex flex-wrap items-center gap-2 nav:gap-[10px]">
          <span className="composition-chip">{first}</span>
          <span aria-hidden="true" className="text-[20px]/none font-bold text-turquoise">
            +
          </span>
          <span className="sr-only">et</span>
          <span className="composition-chip">{second}</span>
        </div>

        <div className="mt-4 grid grid-cols-[1fr_1px_1fr] items-center gap-4 border-t border-cream/20 py-[14px] text-center nav:mt-[22px] nav:gap-5 nav:py-4">
          <Stat stat={offer.stats[0]} />
          <span className="h-[34px] w-px justify-self-center bg-cream/20" aria-hidden="true" />
          <Stat stat={offer.stats[1]} />
        </div>

        <Link
          href={`${routes.contact}?formule=${offer.slug}`}
          className="mt-[6px] block rounded-full bg-peach p-[14px] text-center text-[14px]/none font-bold text-slate transition-colors hover:bg-peach/90"
        >
          {offer.cta}
        </Link>
      </div>
    </article>
  );
}

function Stat({ stat }: { stat: { label: string; value: string } }) {
  return (
    <div>
      <div className="text-[10.5px]/none font-bold tracking-[0.1em] text-cream/55 uppercase nav:text-[11px]">
        {stat.label}
      </div>
      <div className="mt-[6px] font-serif text-[19px]/none nav:mt-[7px] nav:text-[22px]">
        {stat.value}
      </div>
    </div>
  );
}
