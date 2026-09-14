import { GlobeIcon } from "@/components/ui/Bits";

const stats = [
  {
    value: "11 ans",
    label:
      "d’expérience en orientation scolaire et universitaire, notamment en lycées français à l’étranger du réseau AEFE",
  },
  {
    value: "+ de 1 000",
    label:
      "jeunes guidés dans les moments clés de leur parcours, du choix de spécialités à Parcoursup",
  },
];

export function StatsBanner() {
  return (
    <section className="gutter">
      <div className="grid gap-[18px] rounded-[16px] bg-slate px-[22px] py-6 nav:grid-cols-[1fr_1fr_1.15fr] nav:gap-[34px] nav:px-10 nav:py-[34px]">
        {stats.map((stat, index) => (
          <div
            key={stat.value}
            className={
              index === 0
                ? ""
                : "border-t border-cream/18 pt-[18px] nav:border-t-0 nav:border-l nav:pt-0 nav:pl-[34px]"
            }
          >
            <div className="t-stat font-serif text-peach">{stat.value}</div>
            <p className="mt-1 text-[13.5px]/[1.5] text-cream/82 nav:mt-2 nav:text-[14px] nav:text-cream/80">
              {stat.label}
            </p>
          </div>
        ))}

        <div className="border-t border-cream/18 pt-[18px] nav:border-t-0 nav:border-l nav:pt-0 nav:pl-[34px]">
          <div className="flex items-center gap-3 nav:gap-[14px]">
            <GlobeIcon className="size-[26px] flex-none text-peach nav:size-[34px]" />
            <div className="font-serif text-[24px]/[1.15] text-peach nav:whitespace-nowrap nav:text-[34px]/none">
              Partout dans le monde
            </div>
          </div>
          <p className="mt-2 text-[13.5px]/[1.5] text-cream/82 nav:mt-3 nav:text-[14px] nav:text-cream/80">
            En présentiel au Bénin, en visioconférence dans le reste du monde
          </p>
        </div>
      </div>
    </section>
  );
}
