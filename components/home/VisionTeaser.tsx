import Link from "next/link";
import { Eyebrow, Label } from "@/components/ui/Bits";
import { routes } from "@/content/site";
import { visionConclusion, visionDimensions, visionQuotes } from "@/content/vision";

export function VisionTeaser() {
  return (
    <section className="border-b border-slate/8 bg-offwhite">
      <div className="gutter section-y grid items-start gap-7 nav:grid-cols-[0.9fr_1.1fr] nav:gap-14">
        <div>
          <Eyebrow>Ma vision de l’orientation</Eyebrow>
          <h2 className="t-h2 mt-3 max-w-[19ch] nav:mt-[14px]">
            Chaque jeune mérite un projet à la hauteur de son potentiel
          </h2>

          <figure className="mt-5 rounded-[16px] bg-peach px-[22px] py-6 nav:mt-7 nav:px-[34px] nav:py-8">
            <span className="block font-serif text-[30px]/none text-terracotta nav:text-[36px]" aria-hidden="true">
              “
            </span>
            <blockquote className="mt-0.5 font-serif text-[19px]/[1.55] text-slate text-pretty nav:text-[22px]">
              {visionQuotes[0]}
            </blockquote>
          </figure>

          <Link href={routes.vision} className="link-underline mt-5 nav:mt-[26px]">
            Lire ma vision <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div>
          <Label className="text-slate/50">L’équilibre de trois dimensions</Label>
          <ol className="mt-4 nav:mt-[18px]">
            {visionDimensions.map((dimension, index) => (
              <li
                key={dimension.number}
                className={`grid grid-cols-[44px_1fr] gap-4 border-t border-slate/14 py-5 nav:grid-cols-[64px_1fr] nav:gap-5 nav:py-[22px] ${
                  index === visionDimensions.length - 1 ? "border-b" : ""
                }`}
              >
                <span className="font-serif text-[28px]/none text-turquoise nav:text-[36px]">
                  {dimension.number}
                </span>
                <div>
                  <h3 className="t-card-title font-serif">{dimension.title}</h3>
                  <p className="mt-2 max-w-[48ch] text-[14.5px]/[1.65] text-slate/75 nav:text-[15.5px]">
                    {dimension.text}
                  </p>
                </div>
              </li>
            ))}
          </ol>
          <p className="t-quote mt-5 max-w-[52ch] text-terracotta nav:mt-[26px] nav:text-[20px]">
            {visionConclusion}
          </p>
        </div>
      </div>
    </section>
  );
}
