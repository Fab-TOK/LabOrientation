import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Bits";
import { FeaturedOfferCard } from "@/components/offres/FeaturedOfferCard";
import { OfferCard } from "@/components/offres/OfferCard";
import { PricingToggle } from "@/components/offres/PricingToggle";
import { RecapTable } from "@/components/offres/RecapTable";
import { offerFamilies, recap, type Offer } from "@/content/formulas";
import { routes } from "@/content/site";
import { pageAddress } from "@/lib/metadata";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Nos offres",
  description:
    "Quatre parcours de la 4ᵉ à la Terminale, des accompagnements aux candidatures et trois modules. Tout commence par un entretien préalable gratuit.",
  ...pageAddress(routes.offers),
};

const isFeatured = (offer: Offer): offer is Offer & Required<Pick<Offer, "featured">> =>
  Boolean(offer.featured);

const howItWorks = [
  "Vous remplissez le formulaire de contact et décrivez votre situation.",
  "Nous fixons l’entretien préalable gratuit de 20 minutes.",
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
            Quatre parcours selon le niveau du jeune, des accompagnements dédiés aux
            candidatures et des modules pour un besoin précis. Aucune formule ne se choisit
            à l’aveugle : tout commence par un échange gratuit de 20 minutes.
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
                      Nous fixons l’entretien préalable{" "}
                      <strong className="font-bold">gratuit</strong> de 20 minutes.
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

      <section className="gutter nav:mb-[52px]">
        <PricingToggle />
      </section>

      <div className="gutter pt-8 pb-8 nav:pt-0 nav:pb-14">
        {offerFamilies.map((family, index) => {
          const featured = family.offers.filter(isFeatured);
          const cards = family.offers.filter((offer) => !offer.featured);
          /* Sans dépliant (candidatures), les cartes s’étirent à la hauteur de
             la plus haute et alignent leurs pieds de carte. */
          const hasDetails = cards.some((offer) => offer.detail);

          return (
            <section key={family.number} className={index > 0 ? "mt-[38px] nav:mt-14" : ""}>
              <FamilyHeading number={family.number} title={family.title} note={family.note} />

              <p className="mt-[14px] max-w-[74ch] text-[14.5px]/[1.65] text-slate/75 text-pretty nav:mt-[18px] nav:text-[15.5px]/[1.7]">
                {family.intro}
              </p>

              {/* `items-start` : chaque carte garde sa hauteur propre, une carte
                  dépliée n’entraîne pas ses voisines.

                  Trois colonnes seulement à partir de `xl`, la largeur du design.
                  À 900 px elles ne laissaient que 22 caractères par ligne au
                  paragraphe, et l’en-tête n’avait plus la place de tenir le badge
                  et la pastille de niveau côte à côte. */}
              <ul
                className={cn(
                  "mt-5 grid gap-4 nav:mt-7 nav:gap-[22px] md:grid-cols-2 xl:grid-cols-3",
                  hasDetails ? "items-start" : "items-stretch",
                )}
              >
                {cards.map((offer) => (
                  <OfferCard key={offer.slug} offer={offer} />
                ))}
              </ul>

              {featured.map((offer) => (
                <FeaturedOfferCard key={offer.slug} offer={offer} />
              ))}
            </section>
          );
        })}

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
              C’est normal, et c’est exactement à cela que sert l’entretien préalable gratuit. Décrivez
              simplement où vous en êtes, je vous aiderai à identifier la formule la plus
              adaptée.
            </p>
          </div>
          <ButtonLink href={routes.contact} block className="flex-none nav:w-auto">
            Réserver mes 20 min offertes
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
  /* Pastille « En présentiel… » : en bout de ligne sur ordinateur, sous le
     titre sur téléphone, comme sur la maquette. */
  const pill = "rounded-full bg-slate font-bold tracking-[0.03em] text-cream";

  return (
    <>
      <div className="flex items-center gap-[11px] border-b border-slate/16 pb-3 nav:gap-[14px] nav:pb-[14px]">
        <span className="pill-num flex-none nav:size-[30px] nav:text-[12px]">{number}</span>
        <h2 className="caps-align font-serif text-[24px]/[1.2] nav:text-[30px]">{title}</h2>
        {note && (
          <span className={cn(pill, "ml-auto hidden px-4 py-[9px] text-[12px]/none nav:inline-block")}>
            {note}
          </span>
        )}
      </div>
      {note && (
        <div className="mt-[14px] nav:hidden">
          <span className={cn(pill, "inline-block px-[14px] py-2 text-[11px]/none")}>{note}</span>
        </div>
      )}
    </>
  );
}
