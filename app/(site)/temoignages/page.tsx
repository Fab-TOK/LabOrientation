import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Bits";
import { TestimonialCard } from "@/components/testimonials/TestimonialCard";
import { routes } from "@/content/site";
import { testimonialCount, testimonials } from "@/content/testimonials";

export const metadata: Metadata = {
  title: "Témoignages",
  description:
    "Ce que disent les jeunes accompagnés par Lab’Orientation et leurs parents, dans leurs mots, repris intégralement.",
};

export default function TestimonialsPage() {
  const [laura, malika, shirley, lucie, cosme, zahra] = testimonials;

  return (
    <>
      <section className="gutter grid items-end gap-6 border-b border-slate/10 pt-7 pb-6 nav:grid-cols-[1fr_0.8fr] nav:gap-[52px] nav:pt-[60px] nav:pb-11">
        <div>
          <Eyebrow>Témoignages</Eyebrow>
          <h1 className="t-h1-page mt-3 max-w-[20ch] nav:mt-4 nav:text-[58px]/[1.04]">
            Ce que disent les jeunes et leurs parents
          </h1>
          <p className="mt-4 max-w-[58ch] text-[14.5px]/[1.7] text-slate/78 text-pretty nav:mt-5 nav:text-[17px]">
            Des élèves accompagnés au lycée, des étudiants partis à l’étranger, des familles
            qui cherchaient à y voir clair. Voici leurs mots, dans leur intégralité.
          </p>
        </div>

        <div className="flex gap-3 nav:gap-[14px]">
          <div className="flex-1 rounded-[14px] bg-slate px-5 py-5 text-cream nav:px-6 nav:py-[22px]">
            <div className="font-serif text-[26px]/none text-peach nav:text-[34px]">
              + de 1 000
            </div>
            <p className="mt-[7px] text-[13px]/[1.5] text-cream/80 nav:text-[13.5px]">
              jeunes accompagnés en 11 ans
            </p>
          </div>
          <div className="flex-1 rounded-[14px] bg-peach px-5 py-5 nav:px-6 nav:py-[22px]">
            <div className="font-serif text-[26px]/none text-terracotta nav:text-[34px]">
              {testimonialCount}
            </div>
            <p className="mt-[7px] text-[13px]/[1.5] text-slate/80 nav:text-[13.5px]">
              témoignages publiés, élèves et parents
            </p>
          </div>
        </div>
      </section>

      <div className="gutter flex flex-col gap-3 pt-7 pb-8 nav:gap-[22px] nav:pt-14 nav:pb-14">
        <TestimonialCard testimonial={laura} />
        <TestimonialCard testimonial={malika} />

        <div className="grid gap-3 md:grid-cols-2 nav:gap-[22px]">
          <TestimonialCard testimonial={shirley} />
          <TestimonialCard testimonial={lucie} />
        </div>

        <TestimonialCard testimonial={cosme} />
        <TestimonialCard testimonial={zahra} />
      </div>

      <section className="border-t border-slate/10 bg-offwhite">
        <div className="gutter section-y text-center">
          <h2 className="mx-auto max-w-[24ch] font-serif text-[27px]/[1.15] tracking-[-0.02em] text-balance nav:text-[40px]">
            Le prochain parcours pourrait être le vôtre
          </h2>
          <p className="mx-auto mt-3 max-w-[58ch] text-[14.5px]/[1.7] text-slate/75 nav:mt-[14px] nav:text-[16.5px]">
            Trente minutes offertes pour faire le point sur votre situation, sans engagement.
          </p>
          <ButtonLink href={routes.contact} className="mt-5 nav:mt-6">
            Prenons contact
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
