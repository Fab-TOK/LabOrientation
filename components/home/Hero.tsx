import { ButtonLink } from "@/components/ui/Button";
import { CheckPill } from "@/components/ui/Bits";
import { JohanaPhoto } from "@/components/ui/JohanaPhoto";
import { routes, site } from "@/content/site";

export function Hero() {
  return (
    <section className="gutter grid items-center gap-[22px] pt-6 pb-7 nav:grid-cols-[1.1fr_0.9fr] nav:gap-[52px] nav:pt-[60px] nav:pb-[52px]">
      <div>
        {/* Arrivée en cascade : `--i` est le rang de chaque élément (voir `.anim-rise`). */}
        <p
          className="anim-rise inline-flex items-center gap-2 rounded-full bg-peach px-[14px] py-[7px] text-[11.5px]/none font-semibold nav:text-[12.5px]"
          style={{ "--i": 0 } as React.CSSProperties}
        >
          <span className="dot-halo size-[7px] flex-none rounded-full bg-terracotta" aria-hidden="true" />
          <span className="nav:hidden">Collégiens à adultes · FR / EN</span>
          <span className="hidden nav:inline">
            Des collégiens aux adultes en reconversion, en français ou en anglais
          </span>
        </p>

        <h1 className="anim-rise t-h1-hero mt-[14px] nav:mt-5" style={{ "--i": 1 } as React.CSSProperties}>
          {site.tagline}
        </h1>

        <p
          className="anim-rise t-lede mt-3 max-w-[40ch] text-terracotta nav:mt-[18px]"
          style={{ "--i": 2 } as React.CSSProperties}
        >
          L’orientation n’est pas un choix de filière. C’est une réflexion globale.
        </p>

        <p
          className="anim-rise t-body-lg mt-[14px] max-w-[54ch] text-slate/78 nav:mt-5"
          style={{ "--i": 3 } as React.CSSProperties}
        >
          Choisir une orientation est une étape déterminante. Pourtant, il est souvent
          difficile de savoir quelle direction prendre lorsque les possibilités semblent
          infinies, lorsque l’on est jeune, indécis, perdu et parfois effrayé par l’idée
          de choisir une filière plutôt qu’une autre. Parce que chaque jeune est unique,
          son parcours doit l’être aussi.
        </p>

        {/* `flex-wrap` : le bouton long et « Voir les accompagnements » demandent
            624 px, la colonne n’en offre que 614 à 1280 px. Le second passe dessous
            plutôt que de couper le texte du premier sur deux lignes. */}
        <div
          className="anim-rise mt-5 flex flex-col gap-[10px] nav:mt-7 nav:flex-row nav:flex-wrap nav:gap-[14px]"
          style={{ "--i": 4 } as React.CSSProperties}
        >
          <ButtonLink href={routes.contact} block className="nav:w-auto">
            <span className="nav:hidden">Réserver mes 20 min offertes</span>
            <span className="hidden nav:inline">Réserver mon entretien gratuit de 20 minutes</span>
          </ButtonLink>
          <ButtonLink href={routes.offers} variant="secondary" block className="nav:w-auto">
            Voir les accompagnements
          </ButtonLink>
        </div>

        <p
          className="anim-rise mt-[22px] hidden items-center gap-[10px] t-body-sm text-slate/65 nav:flex"
          style={{ "--i": 5 } as React.CSSProperties}
        >
          <CheckPill />
          Premier échange gratuit sans engagement, en présentiel au Bénin ou en visioconférence
        </p>
      </div>

      <div className="relative mt-[22px] nav:mt-0">
        <div
          className="anim-frame absolute inset-[18px_-14px_-18px_18px] hidden rounded-[20px] bg-turquoise nav:block"
          aria-hidden="true"
        />
        <JohanaPhoto
          priority
          className="anim-settle h-[280px] rounded-[16px] min-[400px]:h-auto min-[400px]:aspect-[6/5] nav:aspect-auto nav:h-[clamp(450px,32vw,640px)] nav:rounded-[20px]"
        />
      </div>
    </section>
  );
}
