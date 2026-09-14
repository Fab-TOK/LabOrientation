import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Bits";
import { FormulaCard } from "@/components/offres/FormulaCard";
import { formulaFamilies } from "@/content/formulas";
import { routes, site } from "@/content/site";

export const metadata: Metadata = {
  title: "Nos offres",
  description:
    "Neuf formules d’accompagnement en trois familles : se connaître et s’orienter, construire et sécuriser le projet, candidatures et ateliers. Tout commence par un échange gratuit de 30 minutes.",
};

const howItWorks = [
  "Vous remplissez le formulaire de contact et décrivez votre situation.",
  "Nous fixons la séance de mise en contact de 30 minutes, offerte.",
  "Nous identifions ensemble la formule adaptée, son tarif et le mode de paiement.",
];

export default function OffersPage() {
  return (
    <>
      <section className="gutter grid items-end gap-6 pt-7 pb-6 nav:grid-cols-[1fr_0.85fr] nav:gap-[52px] nav:pt-[60px] nav:pb-11">
        <div>
          <Eyebrow>Nos offres</Eyebrow>
          <h1 className="t-h1-page mt-3 max-w-[20ch] nav:mt-4 nav:text-[58px]/[1.04]">
            Neuf façons d’avancer, une seule porte d’entrée
          </h1>
          <p className="mt-4 max-w-[56ch] text-[14.5px]/[1.7] text-slate/78 text-pretty nav:mt-5 nav:text-[17px]">
            Chaque accompagnement est construit autour d’un profil, d’un rythme et
            d’objectifs. Aucune formule ne se choisit à l’aveugle : tout commence par un
            échange gratuit de 30 minutes. Les neuf formules sont regroupées ci-dessous en
            trois familles : vous n’en choisissez qu’une.
          </p>
        </div>

        <div className="rounded-[14px] bg-peach p-[22px] nav:rounded-[16px] nav:px-[34px] nav:py-8">
          <h2 className="text-[17px]/[1.3] font-semibold nav:text-[18px]">
            Comment ça se passe
          </h2>
          <ol className="mt-4 flex flex-col gap-[14px] nav:mt-[18px]">
            {howItWorks.map((step, index) => (
              <li key={step} className="flex items-start gap-[13px]">
                <span className="flex size-[26px] flex-none items-center justify-center rounded-full bg-slate text-[12px]/none font-bold text-peach">
                  {index + 1}
                </span>
                <span className="text-[14.5px]/[1.55] text-slate/85">
                  {index === 1 ? (
                    <>
                      Nous fixons la séance de mise en contact de 30 minutes,{" "}
                      <strong className="font-bold">offerte</strong>.
                    </>
                  ) : (
                    step
                  )}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="gutter">
        <div className="flex flex-col gap-4 rounded-[14px] bg-slate px-[22px] py-6 text-cream nav:mb-11 nav:flex-row nav:items-center nav:justify-between nav:gap-10 nav:rounded-[16px] nav:px-[34px] nav:py-[26px]">
          <div className="flex items-center gap-6 nav:gap-10">
            <PriceBlock label={site.pricing.benin.label} value={site.pricing.benin.long} />
            <span className="h-11 w-px flex-none bg-cream/20" aria-hidden="true" />
            <PriceBlock
              label={site.pricing.international.label}
              value={site.pricing.international.long}
            />
          </div>
          <p className="max-w-[46ch] text-[13.5px]/[1.6] text-cream/78 nav:text-[14px]">
            Les tarifs dépendent de la formule et du volume de séances. Ils sont précisés
            lors de l’échange gratuit, jamais avant. {site.pricing.note}
          </p>
        </div>
      </section>

      <div className="gutter pt-7 pb-8 nav:pt-0 nav:pb-14">
        {formulaFamilies.map((family, index) => (
          <section key={family.number} className={index > 0 ? "mt-9 nav:mt-13" : ""}>
            <div className="flex items-baseline gap-[14px] border-b border-slate/16 pb-3">
              <span className="t-eyebrow text-turquoise">{family.number}</span>
              <h2 className="font-serif text-[24px]/[1.2] nav:text-[30px]">{family.title}</h2>
              <span className="ml-auto hidden rounded-full bg-peach px-[13px] py-[7px] text-[11.5px]/none font-bold tracking-[0.04em] text-slate uppercase nav:inline-block">
                3 formules
              </span>
            </div>

            <ul className="mt-5 grid gap-4 nav:mt-[26px] md:grid-cols-2 nav:grid-cols-3 nav:gap-[22px]">
              {family.formulas.map((formula) => (
                <FormulaCard key={formula.slug} formula={formula} />
              ))}
            </ul>
          </section>
        ))}
      </div>

      <section className="bg-slate text-cream">
        <div className="gutter flex flex-col gap-5 py-8 nav:flex-row nav:items-center nav:justify-between nav:gap-11 nav:py-14">
          <div>
            <h2 className="t-h2 nav:text-[38px]/[1.15]">
              Vous hésitez entre plusieurs formules ?
            </h2>
            <p className="mt-3 max-w-[62ch] text-[14.5px]/[1.7] text-cream/82 text-pretty nav:text-[16px]">
              C’est normal, et c’est exactement à cela que sert le premier échange. Décrivez
              simplement où vous en êtes, je vous aiderai à identifier la formule la plus
              adaptée.
            </p>
          </div>
          <ButtonLink href={routes.booking} block className="flex-none nav:w-auto">
            Réserver mes 30 min offertes
          </ButtonLink>
        </div>
      </section>
    </>
  );
}

function PriceBlock({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[11px]/none tracking-[0.1em] text-cream/55 uppercase">{label}</div>
      <div className="mt-[7px] font-serif text-[22px]/none text-peach nav:text-[30px]">
        {value}
      </div>
    </div>
  );
}
