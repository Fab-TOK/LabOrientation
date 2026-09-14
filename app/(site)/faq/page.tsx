import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow, NumberPill } from "@/components/ui/Bits";
import { FaqAccordion } from "@/components/faq/FaqAccordion";
import { FaqNav } from "@/components/faq/FaqNav";
import { faqSections } from "@/content/faq";
import { routes } from "@/content/site";

export const metadata: Metadata = {
  title: "Questions fréquentes",
  description:
    "À qui s’adresse Lab’Orientation, comment se déroule un accompagnement, en quelle langue, à quel tarif : les réponses aux questions les plus posées.",
};

export default function FaqPage() {
  return (
    <>
      <section className="gutter border-b border-slate/10 pt-7 pb-6 nav:pt-[60px] nav:pb-10">
        <Eyebrow>Questions fréquentes</Eyebrow>
        <h1 className="t-h1-page mt-3 max-w-[22ch] nav:mt-4 nav:text-[58px]/[1.04]">
          Tout ce qu’on me demande avant de commencer
        </h1>
        <p className="mt-4 max-w-[64ch] text-[14.5px]/[1.7] text-slate/78 text-pretty nav:mt-[18px] nav:text-[17px]">
          Si votre question n’est pas ici, écrivez-la simplement dans le formulaire de
          contact. J’y réponds personnellement.
        </p>
      </section>

      <div className="gutter grid items-start gap-6 pt-6 pb-8 nav:grid-cols-[260px_1fr] nav:gap-12 nav:pt-12 nav:pb-15">
        {/* `min-w-0` : sans lui, la ligne de filtres défilante élargit la
            colonne de grille au lieu de défiler. */}
        <div className="flex min-w-0 flex-col gap-5 nav:sticky nav:top-5">
          <FaqNav sections={faqSections} />

          <div className="hidden rounded-[16px] bg-peach p-6 nav:block">
            <p className="text-[15.5px]/[1.3] font-semibold">Votre question n’y est pas ?</p>
            <p className="mt-2 text-[13.5px]/[1.6] text-slate/82">
              Posez-la lors de la séance offerte de 30 minutes.
            </p>
            <ButtonLink href={routes.contact} variant="slate" block className="mt-[14px]">
              Prenons contact
            </ButtonLink>
          </div>
        </div>

        <div>
          {faqSections.map((section, index) => (
            <section key={section.id} className={index > 0 ? "mt-9 nav:mt-11" : ""}>
              <div
                id={section.id}
                className="flex scroll-mt-24 items-center gap-[14px] border-b border-slate/16 pb-3"
              >
                <NumberPill className="size-[30px]">{section.number}</NumberPill>
                <h2 className="font-serif text-[24px]/[1.2] nav:text-[28px]">{section.title}</h2>
              </div>

              <FaqAccordion items={section.items} />
            </section>
          ))}

          <div className="mt-7 rounded-[12px] bg-peach p-5 nav:hidden">
            <p className="text-[15.5px]/[1.3] font-semibold">Votre question n’y est pas ?</p>
            <p className="mt-2 text-[13.5px]/[1.6] text-slate/82">
              Posez-la lors de la séance offerte de 30 minutes.
            </p>
            <ButtonLink href={routes.contact} variant="slate" block className="mt-[14px]">
              Prenons contact
            </ButtonLink>
          </div>
        </div>
      </div>
    </>
  );
}
