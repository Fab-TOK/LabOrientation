import { ButtonLink } from "@/components/ui/Button";
import { CheckPill } from "@/components/ui/Bits";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";
import { routes, site } from "@/content/site";

export function Hero() {
  return (
    <section className="gutter grid items-center gap-[22px] pt-6 pb-7 nav:grid-cols-[1.1fr_0.9fr] nav:gap-[52px] nav:pt-[60px] nav:pb-[52px]">
      <div>
        <p className="inline-flex items-center gap-2 rounded-full bg-peach px-[14px] py-[7px] text-[11.5px]/none font-semibold nav:text-[12.5px]">
          <span className="size-[7px] flex-none rounded-full bg-terracotta" aria-hidden="true" />
          <span className="nav:hidden">Collégiens à adultes · FR / EN</span>
          <span className="hidden nav:inline">
            Des collégiens aux adultes en reconversion, en français ou en anglais
          </span>
        </p>

        <h1 className="t-h1-hero mt-[14px] nav:mt-5">{site.tagline}</h1>

        <p className="t-lede mt-3 max-w-[40ch] text-terracotta nav:mt-[18px]">
          L’orientation n’est pas un choix de filière. C’est un choix de vie.
        </p>

        <p className="t-body-lg mt-[14px] max-w-[54ch] text-slate/78 nav:mt-5">
          Choisir une orientation est une étape déterminante. Pourtant, il est souvent
          difficile de savoir quelle direction prendre lorsque les possibilités semblent
          infinies. Parce que chaque jeune est unique, son parcours doit l’être aussi.
        </p>

        <div className="mt-5 flex flex-col gap-[10px] nav:mt-7 nav:flex-row nav:gap-[14px]">
          <ButtonLink href={routes.booking} block className="nav:w-auto">
            <span className="nav:hidden">Réserver 30 min offertes</span>
            <span className="hidden nav:inline">Réserver ma séance gratuite de 30 min</span>
          </ButtonLink>
          <ButtonLink href={routes.offers} variant="secondary" block className="nav:w-auto">
            Voir les accompagnements
          </ButtonLink>
        </div>

        <p className="mt-[22px] hidden items-center gap-[10px] t-body-sm text-slate/65 nav:flex">
          <CheckPill />
          Premier échange sans engagement, en présentiel au Bénin ou en visioconférence
        </p>
      </div>

      <div className="relative mt-[22px] nav:mt-0">
        <div
          className="absolute inset-[18px_-14px_-18px_18px] hidden rounded-[20px] bg-turquoise nav:block"
          aria-hidden="true"
        />
        <PhotoPlaceholder
          label="photo pro de Johana · portrait vertical"
          className="relative h-[280px] rounded-[16px] nav:h-[450px] nav:rounded-[20px]"
        />
      </div>
    </section>
  );
}
