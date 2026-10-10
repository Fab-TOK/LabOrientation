import Link from "next/link";
import { Eyebrow } from "@/components/ui/Bits";
import { JohanaPhoto } from "@/components/ui/JohanaPhoto";
import { johanaChips, johanaTeaser } from "@/content/johana";
import { routes } from "@/content/site";

export function AboutTeaser() {
  return (
    <section className="gutter grid items-center gap-6 pt-[34px] pb-[30px] nav:grid-cols-[0.85fr_1.15fr] nav:gap-[52px] nav:py-[72px]">
      <JohanaPhoto className="hidden h-[clamp(400px,29vw,600px)] rounded-[18px] nav:block" />

      <div>
        <Eyebrow>Qui suis-je ?</Eyebrow>
        <h2 className="t-h2 mt-3 nav:mt-[14px]">Johana Ghionda</h2>

        {johanaTeaser.map((paragraph, index) => (
          <p
            key={index}
            className="t-body-lg mt-3 max-w-[58ch] text-slate/78 nav:mt-[18px] nav:first-of-type:mt-[18px] nav:[&+p]:mt-[14px]"
          >
            {paragraph}
          </p>
        ))}

        <ul className="mt-4 flex flex-wrap gap-2 nav:mt-[22px] nav:gap-[10px]">
          {johanaChips.map((chip) => (
            <li key={chip} className="chip text-[12.5px] nav:text-[13.5px]">
              {chip}
            </li>
          ))}
        </ul>

        <Link href={routes.about} className="link-underline mt-[18px] nav:mt-[26px]">
          Lire ma présentation complète <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
