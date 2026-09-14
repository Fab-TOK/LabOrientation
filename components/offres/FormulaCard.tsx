import Link from "next/link";
import { FormulaTitle } from "@/components/ui/Bits";
import type { Formula } from "@/content/formulas";
import { routes } from "@/content/site";
import { cn } from "@/lib/cn";

const tone = {
  light: {
    card: "border border-slate/14 bg-offwhite",
    text: "text-slate/78",
    divider: "border-slate/12",
    button: "bg-slate text-cream hover:bg-slate/90",
  },
  slate: {
    card: "border-[1.5px] border-slate bg-slate text-cream",
    text: "text-cream/85",
    divider: "border-cream/20",
    button: "bg-peach text-slate hover:bg-[#eeb28b]",
  },
  peach: {
    card: "bg-peach",
    text: "text-slate/82",
    divider: "border-slate/25",
    button: "bg-slate text-cream hover:bg-slate/90",
  },
} as const;

export function FormulaCard({ formula }: { formula: Formula }) {
  const style = tone[formula.tone];

  return (
    <li
      id={formula.slug}
      className={cn(
        "relative flex scroll-mt-24 flex-col rounded-[14px] p-[22px] nav:rounded-[16px] nav:p-[30px]",
        style.card,
      )}
    >
      {formula.highlight && (
        <span className="absolute -top-3 left-[22px] rounded-full bg-terracotta px-[13px] py-1.5 text-[11.5px]/none font-semibold text-white nav:left-[30px]">
          {formula.highlight}
        </span>
      )}

      <h3 className="font-serif text-[23px]/[1.15] nav:text-[28px]">
        <FormulaTitle formula={formula} />
      </h3>

      <p className={cn("mt-3 flex-1 text-[14.5px]/[1.65] text-pretty nav:mt-[14px] nav:text-[15px]/[1.7]", style.text)}>
        {formula.description}
      </p>

      <div className={cn("mt-[18px] border-t pt-[18px] nav:mt-[22px]", style.divider)}>
        <Link
          href={`${routes.contact}?formule=${formula.slug}`}
          className={cn(
            "block rounded-full p-[14px] text-center text-[14px]/none font-bold transition-colors",
            style.button,
          )}
        >
          Demander cette formule
        </Link>
      </div>
    </li>
  );
}
