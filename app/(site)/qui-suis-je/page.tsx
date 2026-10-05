import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow, Label } from "@/components/ui/Bits";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";
import { RichText } from "@/components/ui/RichText";
import {
  johanaClosing,
  johanaConviction,
  johanaHero,
  johanaIntro,
  johanaLead,
  johanaOutro,
  johanaSignature,
  parcours,
  troisRegards,
} from "@/content/johana";
import { routes } from "@/content/site";
import { pageAddress } from "@/lib/metadata";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Qui suis-je ?",
  description:
    "Johana Ghionda, conseillère d’orientation et fondatrice de Lab’Orientation : un parcours international, une expertise de l’orientation et une connaissance du monde professionnel.",
  ...pageAddress(routes.about),
};

const bodyParagraph =
  "t-body-lg mt-[18px] text-slate/82 nav:mt-[22px] nav:text-[17px]/[1.8]";

export default function AboutPage() {
  return (
    <>
      <section className="gutter grid items-center gap-6 border-b border-slate/10 pt-7 pb-8 nav:grid-cols-[1fr_0.8fr] nav:gap-[52px] nav:pt-[60px] nav:pb-12">
        <div>
          <Eyebrow>{johanaHero.eyebrow}</Eyebrow>
          <h1 className="t-h1-page mt-3 nav:mt-4 nav:text-[62px]/[1.02]">{johanaHero.name}</h1>
          <p className="mt-3 max-w-[46ch] font-serif text-[18px]/[1.5] italic nav:mt-4 nav:text-[22px]">
            {johanaHero.role}
          </p>

          <PhotoPlaceholder
            label="portrait de Johana"
            className="mt-5 h-[260px] rounded-[16px] nav:hidden"
          />

          <dl className="mt-5 flex gap-4 border-t border-slate/14 pt-5 nav:mt-[30px] nav:gap-[26px] nav:pt-[26px]">
            {johanaHero.stats.map((stat, index) => (
              <div key={stat.value} className="flex gap-4 nav:gap-[26px]">
                {index > 0 && (
                  <span className="w-px flex-none bg-slate/14" aria-hidden="true" />
                )}
                <div className={index === 2 ? "hidden nav:block" : ""}>
                  <dt className="font-serif text-[26px]/none text-terracotta nav:text-[34px]">
                    {stat.value}
                  </dt>
                  <dd className="mt-[5px] max-w-[20ch] text-[12.5px]/[1.45] text-slate/70 nav:text-[13px]">
                    {stat.label}
                  </dd>
                </div>
              </div>
            ))}
          </dl>
        </div>

        <PhotoPlaceholder
          label="portrait de Johana"
          className="hidden h-[380px] rounded-[18px] nav:flex"
        />
      </section>

      <div className="gutter grid items-start gap-8 pt-7 pb-8 nav:grid-cols-[1fr_300px] nav:gap-14 nav:pt-14 nav:pb-16">
        <article className="max-w-[70ch]">
          <p className="font-serif text-[18px]/[1.6] italic text-slate/85 nav:text-[19.5px]/[1.8]">
            {johanaLead}
          </p>

          {johanaIntro.map((paragraph, index) => (
            <p key={index} className={bodyParagraph}>
              <RichText paragraph={paragraph} />
            </p>
          ))}

          <blockquote className="my-7 rounded-[14px] bg-peach px-[22px] py-6 nav:my-8 nav:rounded-[16px] nav:px-[34px] nav:py-[30px]">
            <p className="font-serif text-[19px]/[1.6] text-slate text-pretty nav:text-[21px]">
              <RichText paragraph={johanaConviction} />
            </p>
          </blockquote>

          {johanaOutro.map((paragraph, index) => (
            <p
              key={index}
              className={cn(
                "t-body-lg text-slate/82 nav:text-[17px]/[1.8]",
                index === 0 ? "mt-0" : "mt-[18px] nav:mt-[22px]",
              )}
            >
              <RichText paragraph={paragraph} />
            </p>
          ))}

          <p className="mt-6 border-t border-slate/14 pt-6 font-serif text-[18px]/[1.65] italic text-slate text-pretty nav:mt-[26px] nav:pt-[26px] nav:text-[20px]">
            {johanaClosing}
          </p>

          <p className="mt-5 font-serif text-[22px]/[1.3] font-semibold text-terracotta nav:mt-6 nav:text-[26px]">
            {johanaSignature.main}
            <br />
            <span className="text-[15px] font-normal text-slate/70 nav:text-[17px]">
              {johanaSignature.sub}
            </span>
          </p>
        </article>

        <aside className="flex flex-col gap-4 nav:sticky nav:top-5">
          <div className="rounded-[14px] bg-slate p-[22px] text-cream nav:rounded-[16px] nav:p-[26px]">
            <Label className="text-cream/55">Trois regards</Label>
            <ol className="mt-4 flex flex-col gap-[14px] text-[14.5px]/[1.55] text-cream/90">
              {troisRegards.map((item, index) => (
                <li key={item} className="flex gap-[11px]">
                  <span className="font-bold text-turquoise">{`0${index + 1}`}</span>
                  {item}
                </li>
              ))}
            </ol>
          </div>

          <div className="card p-[22px] nav:p-[26px]">
            <Label className="text-slate/50">Parcours</Label>
            <ul className="mt-[14px] flex flex-col gap-[11px] text-[14px]/[1.5] text-slate/80">
              {parcours.map((step, index) => (
                <li key={step}>
                  {index > 0 && (
                    <span className="mb-[11px] block h-px bg-slate/10" aria-hidden="true" />
                  )}
                  {step}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[14px] bg-peach p-[22px] nav:rounded-[16px] nav:p-[26px]">
            <div className="text-[16px]/[1.3] font-semibold">Faisons connaissance</div>
            <p className="mt-2 text-[13.5px]/[1.6] text-slate/80">
              20 minutes offertes pour comprendre votre situation, sans engagement.
            </p>
            <ButtonLink href={routes.contact} block className="mt-4">
              Prenons contact
            </ButtonLink>
          </div>
        </aside>
      </div>

      <section className="hidden bg-slate text-cream nav:block">
        <div className="gutter flex items-center justify-between gap-10 py-11">
          <div>
            <h2 className="font-serif text-[30px]/[1.2]">Ma vision de l’orientation</h2>
            <p className="mt-2 max-w-[60ch] text-[15px]/[1.65] text-cream/80">
              Ce en quoi je crois, et l’équilibre sur lequel repose chaque projet que je
              construis avec un jeune.
            </p>
          </div>
          <Link href={routes.vision} className="btn btn-on-slate flex-none">
            Lire ma vision <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
