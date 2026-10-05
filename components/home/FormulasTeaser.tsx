import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { Audience, Eyebrow } from "@/components/ui/Bits";
import { homeParcours } from "@/content/formulas";
import { fromPrice, routes, site } from "@/content/site";

export function FormulasTeaser() {
  return (
    <section className="gutter section-y">
      <div className="nav:flex nav:items-end nav:justify-between nav:gap-10">
        <div>
          <Eyebrow>Les accompagnements</Eyebrow>
          <h2 className="t-h2 mt-3 nav:mt-[14px]">Par où commencer</h2>
        </div>
        <p className="t-body mt-3 max-w-[40ch] text-slate/72 nav:mt-0 nav:mb-[6px]">
          Des parcours selon le niveau du jeune, complétés si besoin par un accompagnement
          aux candidatures ou par des modules : bilan d’orientation, CV, lettre de motivation.
        </p>
      </div>

      {/* Trois colonnes à partir de `xl` seulement : voir la grille de la page
          Offres, mêmes cartes et même contrainte de largeur. */}
      <ul className="mt-[18px] grid gap-3 nav:mt-[34px] nav:gap-[22px] md:grid-cols-2 xl:grid-cols-3">
        {homeParcours.map((offer) => (
          <li key={offer.slug} className="card card-link flex flex-col p-[22px] nav:p-[30px]">
            {/* Garde-fou : si un libellé s’allonge, la pastille descend d’une
                ligne au lieu d’écraser le badge, qui ne se coupe jamais. */}
            <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
              <span className="badge-formule text-[11.5px] nav:text-[12px]">{offer.badge}</span>
              <span className="badge-level">
                <Audience label={offer.audience} />
              </span>
            </div>
            <h3 className="t-card-title mt-[14px] font-serif nav:mt-[18px] nav:text-[28px]">
              {offer.title}
            </h3>
            <p className="t-body mt-[10px] flex-1 text-slate/75 nav:mt-3">{offer.description}</p>
            {/* Le lien s’étend sur toute la carte (`after:inset-0`, la carte est
                en `position: relative`) : un clic n’importe où y mène, comme le
                laisse attendre la carte qui se soulève au survol. */}
            <Link
              href={`${routes.offers}#${offer.slug}`}
              aria-label={`En savoir plus sur ${offer.title}`}
              className="mt-[14px] text-[14px]/none font-semibold text-slate after:absolute after:inset-0 nav:mt-[22px] nav:border-t nav:border-slate/12 nav:pt-[18px]"
            >
              En savoir plus{" "}
              <span aria-hidden="true" className="card-link-arrow">
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <Link href={routes.offers} className="link-underline mt-4 text-[14px] nav:mt-5">
        Voir tous les accompagnements <span aria-hidden="true">→</span>
      </Link>

      <FreeSessionBanner />
    </section>
  );
}

/** Bandeau ardoise : l’entretien préalable gratuit à gauche, les tarifs planchers à droite. */
function FreeSessionBanner() {
  return (
    <div className="mt-[22px] rounded-[14px] bg-slate px-[22px] py-6 text-cream nav:mt-[34px] nav:grid nav:grid-cols-[1.3fr_1px_1fr] nav:items-center nav:gap-10 nav:rounded-[16px] nav:px-10 nav:py-[38px]">
      <div>
        <span className="badge-peach text-[10.5px] nav:text-[11.5px]">Gratuit</span>
        <p className="mt-[14px] font-serif text-[25px]/[1.2] text-peach nav:mt-4 nav:text-[34px]/[1.15]">
          Tout commence par un échange de 20 minutes
        </p>
        <p className="mt-[10px] max-w-[56ch] text-[14px]/[1.65] text-cream/85 nav:mt-3 nav:text-[15.5px]/[1.7]">
          Aucune formule ne se choisit à l’aveugle. Cet entretien sert à comprendre votre
          situation et à vous orienter vers l’accompagnement adapté. Le tarif et les
          modalités de paiement sont discutés à ce moment-là.
        </p>
        <ButtonLink href={routes.contact} block className="mt-[18px] nav:mt-[22px] nav:w-auto">
          {/* Texte long à partir de `lg` seulement : entre 900 et 1023 px, la colonne
              (355 px) est plus étroite que lui (367 px) et le couperait en deux. */}
          <span className="lg:hidden">Réserver mes 20 min offertes</span>
          <span className="hidden lg:inline">Réserver mon entretien gratuit de 20 minutes</span>
        </ButtonLink>
      </div>

      <div className="hidden self-stretch bg-cream/20 nav:block" aria-hidden="true" />

      <div className="mt-[18px] border-t border-cream/20 pt-4 nav:mt-0 nav:border-t-0 nav:pt-0">
        <div className="t-label hidden text-cream/55 nav:block">Ensuite, selon la formule</div>
        {/* Le prix d’une séance, plancher de chaque zone ; le détail est sur
            la page Offres, avec l’interrupteur. */}
        <dl className="flex flex-col gap-3 nav:mt-[18px] nav:gap-[14px]">
          {site.pricing.zones.map((zone, index) => (
            <div
              key={zone.id}
              className={
                index === 0
                  ? "flex items-baseline justify-between gap-[14px] nav:border-b nav:border-cream/20 nav:pb-[14px]"
                  : "flex items-baseline justify-between gap-[14px]"
              }
            >
              <dt className="text-[13.5px]/none text-cream/70 nav:text-[14px]">{zone.label}</dt>
              <dd className="text-[17px]/none font-semibold nav:text-[19px]">
                {fromPrice(zone.session)}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
