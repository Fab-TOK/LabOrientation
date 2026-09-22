import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Bits";
import { OfferCard } from "@/components/offres/OfferCard";
import { RecapTable } from "@/components/offres/RecapTable";
import { offerFamilies, recap } from "@/content/formulas";
import { routes, site } from "@/content/site";

export const metadata: Metadata = {
  title: "Nos offres",
  description:
    "Trois parcours d’accompagnement selon le niveau du jeune, de la 4ᵉ à la Terminale, et trois modules complémentaires : CV, lettre de motivation, Parcoursup. Tout commence par un échange gratuit de 30 minutes.",
  alternates: { canonical: routes.offers },
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
            Des parcours adaptés à chaque étape
          </h1>
          <p className="mt-4 max-w-[56ch] text-[14.5px]/[1.7] text-slate/78 text-pretty nav:mt-5 nav:text-[17px]">
            Trois parcours selon le niveau du jeune, trois modules pour un besoin précis.
            Aucune formule ne se choisit à l’aveugle : tout commence par un échange gratuit
            de 30 minutes.
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
        {offerFamilies.map((family, index) => (
          <section key={family.number} className={index > 0 ? "mt-9 nav:mt-14" : ""}>
            <FamilyHeading number={family.number} title={family.title} note={family.note} />

            <p className="mt-4 max-w-[74ch] text-[14.5px]/[1.7] text-slate/75 text-pretty nav:mt-[18px] nav:text-[15.5px]">
              {family.intro}
            </p>

            {/* `items-start` : chaque carte garde sa hauteur propre, une carte
                dépliée n’entraîne pas ses voisines.

                Trois colonnes seulement à partir de `xl`, la largeur du design.
                À 900 px elles ne laissaient que 22 caractères par ligne au
                paragraphe, et l’en-tête n’avait plus la place de tenir le badge
                et la pastille de niveau côte à côte. */}
            <ul className="mt-5 grid items-start gap-4 nav:mt-7 nav:gap-[22px] md:grid-cols-2 xl:grid-cols-3">
              {family.offers.map((offer) => (
                <OfferCard key={offer.slug} offer={offer} />
              ))}
            </ul>
          </section>
        ))}

        <section className="mt-9 nav:mt-14">
          <FamilyHeading number={recap.number} title={recap.title} />
          <RecapTable />
        </section>
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

function FamilyHeading({
  number,
  title,
  note,
}: {
  number: string;
  title: string;
  note?: string;
}) {
  return (
    <div className="flex items-center gap-[14px] border-b border-slate/16 pb-3">
      <span className="pill-num flex-none">{number}</span>
      <h2 className="font-serif text-[24px]/[1.2] nav:text-[30px]">{title}</h2>
      {note && (
        <span className="ml-auto hidden rounded-full bg-slate px-4 py-[9px] text-[12px]/none font-bold tracking-[0.03em] text-cream nav:inline-block">
          {note}
        </span>
      )}
    </div>
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
