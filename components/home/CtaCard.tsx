import { ButtonLink } from "@/components/ui/Button";
import { routes, site } from "@/content/site";

export function CtaCard() {
  return (
    <section className="gutter section-y">
      <div className="rounded-[18px] bg-peach px-[22px] py-8 text-center nav:rounded-[20px] nav:p-[60px]">
        <h2 className="mx-auto max-w-[22ch] font-serif text-[30px]/[1.12] tracking-[-0.02em] text-balance nav:text-[46px]/[1.1]">
          Prêt à construire votre avenir ?
        </h2>
        <p className="mx-auto mt-3 max-w-[60ch] text-[14.5px]/[1.7] text-slate/82 nav:mt-4 nav:text-[16.5px]">
          Prenons rendez-vous pour un premier échange et faisons ensemble le premier pas
          vers un projet d’avenir clair, réfléchi et ambitieux.
        </p>
        <div className="mt-[18px] flex flex-col justify-center gap-[10px] nav:mt-[26px] nav:flex-row nav:gap-[14px]">
          <ButtonLink href={routes.booking} block className="nav:w-auto">
            <span className="nav:hidden">Réserver mes 20 min offertes</span>
            <span className="hidden nav:inline">Réserver mon entretien gratuit de 20 minutes</span>
          </ButtonLink>
          <ButtonLink
            href={site.whatsapp}
            external
            variant="secondary"
            block
            className="bg-white nav:w-auto"
          >
            Écrire sur WhatsApp
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
