import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";
import { routes } from "@/content/site";
import {
  visionCommitment,
  visionConclusion,
  visionDimensions,
  visionDimensionsTitle,
  visionHero,
  visionQuotes,
} from "@/content/vision";

export const metadata: Metadata = {
  title: "Ma vision de l’orientation",
  description:
    "Une orientation réussie repose sur l’équilibre de trois dimensions : les aspirations, les aptitudes et la réalité des parcours.",
  alternates: { canonical: routes.vision },
};

export default function VisionPage() {
  return (
    <>
      <section className="bg-slate text-cream">
        <div className="gutter pt-8 pb-7 nav:pt-[70px] nav:pb-14">
          <div className="t-eyebrow text-peach">{visionHero.eyebrow}</div>
          <h1 className="t-h1-page mt-4 max-w-[20ch] nav:mt-[18px] nav:text-[64px]/[1.03]">
            {visionHero.title}
          </h1>
          {visionHero.paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className={`max-w-[72ch] text-[15px]/[1.7] text-cream/85 text-pretty nav:text-[18px]/[1.75] ${
                index === 0 ? "mt-4 nav:mt-6" : "mt-3 nav:mt-[18px]"
              }`}
            >
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      <section className="grid gap-px bg-slate/12 nav:grid-cols-2">
        <Quote text={visionQuotes[0]} tone="peach" />
        <Quote text={visionQuotes[1]} tone="sand" />
      </section>

      <section className="gutter pt-8 pb-9 nav:pt-16 nav:pb-16">
        <h2 className="t-h2 max-w-[36ch] nav:text-[40px]/[1.2]">{visionDimensionsTitle}</h2>

        <ol className="mt-6 grid gap-3 nav:mt-[38px] md:grid-cols-2 nav:grid-cols-3 nav:gap-[22px]">
          {visionDimensions.map((dimension) => (
            <li
              key={dimension.number}
              className="rounded-[14px] border border-slate/14 bg-sand p-[22px] nav:rounded-[16px] nav:p-[34px]"
            >
              <span className="flex size-[34px] items-center justify-center rounded-[10px] bg-turquoise text-[14px]/none font-semibold text-white nav:size-[38px] nav:text-[15px]">
                {dimension.number}
              </span>
              <h3 className="mt-4 font-serif text-[24px]/[1.15] nav:mt-[18px] nav:text-[30px]">
                {dimension.title}
              </h3>
              <p className="mt-[10px] text-[14.5px]/[1.7] text-slate/78 nav:mt-3 nav:text-[15.5px]">
                {dimension.text}
              </p>
            </li>
          ))}
        </ol>

        <p className="mx-auto mt-7 max-w-[60ch] text-center font-serif text-[19px]/[1.55] italic text-terracotta text-pretty nav:mt-8 nav:text-[24px]">
          {visionConclusion}
        </p>
      </section>

      <section className="bg-peach">
        <div className="gutter flex flex-col gap-5 py-8 nav:flex-row nav:items-center nav:justify-between nav:gap-10 nav:py-14">
          <div>
            <h2 className="font-serif text-[27px]/[1.15] nav:text-[34px]">
              {visionCommitment.title}
            </h2>
            <p className="mt-3 max-w-[64ch] text-[14.5px]/[1.7] text-slate/80 text-pretty nav:text-[16.5px]/[1.75]">
              {visionCommitment.text}
            </p>
          </div>
          <ButtonLink href={routes.booking} block className="flex-none nav:w-auto">
            <span className="nav:hidden">Réserver mes 20 min offertes</span>
            <span className="hidden nav:inline">Réserver mon entretien gratuit de 20 minutes</span>
          </ButtonLink>
        </div>
      </section>
    </>
  );
}

function Quote({ text, tone }: { text: string; tone: "peach" | "sand" }) {
  const peach = tone === "peach";
  return (
    <figure
      className={`px-[18px] py-7 nav:px-12 nav:py-[52px] ${peach ? "bg-peach" : "bg-sand"}`}
    >
      <span
        className={`block font-serif text-[32px]/none nav:text-[40px] ${
          peach ? "text-terracotta" : "text-turquoise"
        }`}
        aria-hidden="true"
      >
        “
      </span>
      <blockquote className="mt-[10px] font-serif text-[20px]/[1.5] text-slate text-pretty nav:text-[26px]">
        {text}
      </blockquote>
    </figure>
  );
}
