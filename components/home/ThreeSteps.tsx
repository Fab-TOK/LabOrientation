import { Eyebrow, NumberPill } from "@/components/ui/Bits";

const steps = [
  {
    number: "01",
    title: "Se connaître",
    items: [
      "Identifier vos forces et votre personnalité",
      "Explorer les métiers et les formations",
    ],
  },
  {
    number: "02",
    title: "Choisir",
    items: [
      "Choisir les spécialités au lycée",
      "Construire un projet d’études cohérent",
      "Préparer une réorientation",
    ],
  },
  {
    number: "03",
    title: "Concrétiser",
    items: [
      "Préparer Parcoursup",
      "Préparer vos CV, lettres de motivation, dossiers",
      "Construire un projet réaliste et motivant",
    ],
  },
];

export function ThreeSteps() {
  return (
    <section className="border-y border-slate/10 bg-sand">
      <div className="gutter section-y">
        <div className="nav:flex nav:items-end nav:justify-between nav:gap-[52px]">
          <div>
            <Eyebrow>Un accompagnement entièrement personnalisé</Eyebrow>
            <h2 className="t-h2 mt-3 max-w-[24ch] nav:mt-[14px]">
              Trois temps, du premier doute au dossier envoyé
            </h2>
          </div>
          <p className="t-body mt-3 max-w-[36ch] text-slate/72 nav:mt-0 nav:mb-[6px]">
            Chaque parcours emprunte ces trois temps, dans l’ordre qui lui convient.
            Consultations en présentiel ou à distance, en français ou en anglais.
          </p>
        </div>

        <ul className="mt-[22px] grid gap-3 nav:mt-10 md:grid-cols-2 nav:grid-cols-3 nav:items-stretch nav:gap-5">
          {steps.map((step) => (
            <li
              key={step.number}
              className="flex flex-col bg-cream p-[22px] nav:px-7 nav:pt-[26px] nav:pb-7 card"
            >
              <div className="flex items-center gap-[11px] border-b border-slate/14 pb-[14px] nav:gap-3 nav:pb-[18px]">
                <NumberPill outline className="size-[30px] nav:size-[34px] nav:text-[13px]">
                  {step.number}
                </NumberPill>
                <span className="text-[17px]/[1.2] font-semibold nav:text-[19px]">
                  {step.title}
                </span>
              </div>
              <ul className="mt-[14px] flex flex-1 flex-col gap-3 nav:mt-[18px] nav:gap-[14px]">
                {step.items.map((item) => (
                  <li
                    key={item}
                    className="flex gap-[10px] text-[14.5px]/[1.5] text-slate/85 nav:gap-[11px] nav:text-[15.5px]"
                  >
                    <span className="font-bold text-turquoise" aria-hidden="true">
                      ·
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
