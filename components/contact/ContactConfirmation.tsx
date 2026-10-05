"use client";

import { useEffect } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { contactTypeLabels } from "@/content/form-options";
import { formulaLabel, UNDECIDED_FORMULA_LABEL } from "@/content/formulas";
import { routes, site } from "@/content/site";
import { followUpMessage, whatsappHref } from "@/content/whatsapp";
import type { ContactInput } from "@/lib/validation";

/**
 * Écran affiché à la place du formulaire une fois la demande envoyée.
 *
 * À gauche, la confirmation et le récapitulatif ; à droite, facultatif, le
 * message WhatsApp déjà rédigé (le nom tel que tapé, l’offre choisie).
 */
export function ContactConfirmation({ request }: { request: ContactInput }) {
  const offer = formulaLabel(request.formula);
  const message = followUpMessage(request.name, offer);

  /* Le formulaire était peut-être long : on remonte en haut de l’écran. */
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <section className="gutter pt-6 pb-8 nav:pt-14 nav:pb-16">
      <div className="grid gap-4 nav:gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-stretch">
        <div className="rounded-[18px] bg-peach px-[22px] py-7 nav:rounded-[20px] nav:p-[52px]">
          <span
            aria-hidden="true"
            className="flex size-12 items-center justify-center rounded-full bg-slate text-[21px]/none font-bold text-peach nav:size-14 nav:text-[24px]"
          >
            ✓
          </span>
          <h1 className="mt-[18px] max-w-[18ch] font-serif text-[31px]/[1.08] tracking-[-0.025em] text-balance nav:mt-[22px] nav:text-[48px]/[1.05]">
            Merci, votre demande est bien envoyée
          </h1>
          <p className="mt-3 max-w-[52ch] text-[14.5px]/[1.65] text-slate/85 text-pretty nav:mt-4 nav:text-[17px]/[1.7]">
            Johana vous recontacte sous {site.responseDelay}, par téléphone ou par e-mail, pour
            convenir de votre entretien préalable gratuit de 20 minutes.
          </p>
          <dl className="mt-[18px] rounded-[12px] bg-cream px-[18px] py-1 text-[14px]/[1.4] nav:mt-[26px] nav:rounded-[14px] nav:px-6 nav:py-[6px] nav:text-[15px]">
            <SummaryRow label="Vous êtes" value={contactTypeLabels[request.contactType]} />
            <SummaryRow label="Offre" value={offer ?? UNDECIDED_FORMULA_LABEL} last />
          </dl>
        </div>

        <div className="flex flex-col rounded-[18px] bg-slate px-[22px] py-6 text-cream nav:rounded-[20px] nav:p-10">
          <span className="self-start rounded-full border border-cream/25 bg-cream/12 px-[11px] py-[5px] text-[10px]/none font-bold tracking-[0.08em] uppercase nav:px-[13px] nav:py-[6px] nav:text-[11px]">
            Facultatif
          </span>
          <h2 className="mt-[14px] font-serif text-[24px]/[1.15] text-peach nav:mt-[18px] nav:text-[30px]">
            Pour aller plus vite
          </h2>
          <p className="mt-[9px] text-[14px]/[1.65] text-cream/85 text-pretty nav:mt-3 nav:text-[15px]">
            Vous pouvez aussi prévenir Johana sur WhatsApp. Votre message est déjà rédigé :
          </p>
          <p className="mt-4 rounded-[14px_14px_14px_4px] border border-cream/20 bg-cream/10 px-[18px] py-4 text-[14px]/[1.6] text-cream/92 nav:mt-[18px] nav:text-[15px]">
            {message}
          </p>
          <div className="flex-1" />
          <a
            href={whatsappHref(message)}
            target="_blank"
            rel="noreferrer noopener"
            className="mt-[18px] block rounded-full bg-peach p-[15px] text-center text-[14.5px]/none font-bold text-slate transition-colors hover:bg-peach/90 nav:mt-6 nav:p-4 nav:text-[15px]"
          >
            Envoyer sur WhatsApp <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row nav:mt-7 nav:gap-[14px]">
        <ButtonLink href={routes.offers} variant="secondary" block className="sm:w-auto">
          Retour aux offres
        </ButtonLink>
        <ButtonLink href={routes.testimonials} variant="secondary" block className="sm:w-auto">
          Lire les témoignages
        </ButtonLink>
      </div>
    </section>
  );
}

function SummaryRow({ label, value, last }: { label: string; value: string; last?: boolean }) {
  return (
    <div
      className={`flex justify-between gap-[14px] py-3 nav:py-[13px] ${last ? "" : "border-b border-slate/14"}`}
    >
      <dt className="text-slate/62">{label}</dt>
      <dd className="text-right font-semibold">{value}</dd>
    </div>
  );
}
