import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow, FormulaTitle } from "@/components/ui/Bits";
import { featuredFormulas } from "@/content/formulas";
import { routes, site } from "@/content/site";

export function FormulasTeaser() {
  return (
    <section className="gutter section-y">
      <div className="nav:flex nav:items-end nav:justify-between nav:gap-10">
        <div>
          <Eyebrow>Les accompagnements</Eyebrow>
          <h2 className="t-h2 mt-3 nav:mt-[14px]">Par où commencer</h2>
        </div>
        <p className="t-body mt-3 max-w-[40ch] text-slate/72 nav:mt-0 nav:mb-[6px]">
          Trois formules parmi les neuf proposées. On choisit celle qui correspond à votre
          situation, une seule suffit.
        </p>
      </div>

      <ul className="mt-[18px] grid gap-3 nav:mt-[34px] md:grid-cols-2 nav:grid-cols-3 nav:gap-[22px]">
        {featuredFormulas.map((formula, index) => (
          <li key={formula.slug} className="card card-link flex flex-col p-[22px] nav:p-[30px]">
            <span className="badge-formule text-[11.5px] nav:text-[12px]">
              Formule {index + 1}
            </span>
            <h3 className="t-card-title mt-[14px] font-serif nav:mt-[18px] nav:text-[28px]">
              <FormulaTitle formula={formula} />
            </h3>
            <p className="t-body mt-[10px] flex-1 text-slate/75 nav:mt-3">{formula.teaser}</p>
            <Link
              href={`${routes.offers}#${formula.slug}`}
              className="mt-[14px] text-[14px]/none font-semibold text-slate nav:mt-[22px] nav:border-t nav:border-slate/12 nav:pt-[18px]"
            >
              En savoir plus <span aria-hidden="true">→</span>
            </Link>
          </li>
        ))}
      </ul>

      <Link href={routes.offers} className="link-underline mt-4 text-[14px] nav:mt-5">
        Voir les neuf accompagnements <span aria-hidden="true">→</span>
      </Link>

      <FreeSessionBanner />
    </section>
  );
}

/** Bandeau ardoise : la séance offerte à gauche, les tarifs planchers à droite. */
function FreeSessionBanner() {
  return (
    <div className="mt-[22px] rounded-[14px] bg-slate px-[22px] py-6 text-cream nav:mt-[34px] nav:grid nav:grid-cols-[1.3fr_1px_1fr] nav:items-center nav:gap-10 nav:rounded-[16px] nav:px-10 nav:py-[38px]">
      <div>
        <span className="badge-peach text-[10.5px] nav:text-[11.5px]">Gratuit</span>
        <p className="mt-[14px] font-serif text-[25px]/[1.2] text-peach nav:mt-4 nav:text-[34px]/[1.15]">
          Tout commence par un échange de 30 minutes
        </p>
        <p className="mt-[10px] max-w-[56ch] text-[14px]/[1.65] text-cream/85 nav:mt-3 nav:text-[15.5px]/[1.7]">
          Aucune formule ne se choisit à l’aveugle. Cette séance sert à comprendre votre
          situation et à vous orienter vers l’accompagnement adapté. Le tarif et les
          modalités de paiement sont discutés à ce moment-là.
        </p>
        <ButtonLink href={routes.booking} block className="mt-[18px] nav:mt-[22px] nav:w-auto">
          <span className="nav:hidden">Réserver 30 min offertes</span>
          <span className="hidden nav:inline">Réserver ma séance gratuite de 30min</span>
        </ButtonLink>
      </div>

      <div className="hidden self-stretch bg-cream/20 nav:block" aria-hidden="true" />

      <div className="mt-[18px] border-t border-cream/20 pt-4 nav:mt-0 nav:border-t-0 nav:pt-0">
        <div className="t-label hidden text-cream/55 nav:block">Ensuite, selon la formule</div>
        <dl className="flex flex-col gap-3 nav:mt-[18px] nav:gap-[14px]">
          <div className="flex items-baseline justify-between gap-[14px] nav:border-b nav:border-cream/20 nav:pb-[14px]">
            <dt className="text-[13.5px]/none text-cream/70 nav:text-[14px]">
              {site.pricing.benin.label}
            </dt>
            <dd className="text-[17px]/none font-semibold nav:text-[19px]">
              {site.pricing.benin.from}
            </dd>
          </div>
          <div className="flex items-baseline justify-between gap-[14px]">
            <dt className="text-[13.5px]/none text-cream/70 nav:text-[14px]">
              {site.pricing.international.label}
            </dt>
            <dd className="text-[17px]/none font-semibold nav:text-[19px]">
              {site.pricing.international.from}
            </dd>
          </div>
        </dl>
        <p className="mt-[14px] text-[12.5px]/[1.6] text-cream/70 nav:mt-4 nav:text-[13px]">
          {site.pricing.note}
        </p>
      </div>
    </div>
  );
}
