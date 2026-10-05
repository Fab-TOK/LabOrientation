"use client";

import type { CountryCode } from "libphonenumber-js";
import { useEffect, useRef, useState } from "react";
import { ContactConfirmation } from "@/components/contact/ContactConfirmation";
import { ContactForm, type ContactValues } from "@/components/contact/ContactForm";
import { ContactSidebar, WhatsAppCard } from "@/components/contact/ContactSidebar";
import { formulaLabel } from "@/content/formulas";
import { DEFAULT_PHONE_COUNTRY } from "@/content/phone-countries";
import { introMessage } from "@/content/whatsapp";
import { HONEYPOT_FIELD } from "@/lib/anti-spam";
import { contactSchema, fieldErrors, type ContactInput } from "@/lib/validation";

const EMPTY: ContactValues = {
  contactType: "",
  name: "",
  whatsapp: "",
  email: "",
  level: "",
  formula: "",
  message: "",
};

/**
 * La page Prenons contact, une fois la page servie : en-tête, formulaire,
 * colonne de droite, puis l’écran de confirmation à la place de l’ensemble
 * quand la demande est partie.
 *
 * `initialFormula` vient du lien cliqué (« Demander cette formule » →
 * `/contact?formule=…`), déjà vérifié côté serveur.
 */
export function ContactExperience({ initialFormula }: { initialFormula: string }) {
  const [values, setValues] = useState<ContactValues>({ ...EMPTY, formula: initialFormula });
  const [country, setCountry] = useState<CountryCode>(DEFAULT_PHONE_COUNTRY);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [sent, setSent] = useState<ContactInput | null>(null);
  /* Heure d’ouverture du formulaire, pour l’anti-robots (`lib/anti-spam.ts`). */
  const openedAt = useRef(0);
  useEffect(() => {
    openedAt.current = Date.now();
  }, []);

  const set = (field: keyof ContactValues) => (value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
  };

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const parsed = contactSchema.safeParse(values);
    if (!parsed.success) {
      setErrors(fieldErrors(parsed.error));
      /* Après le rendu des messages : on amène le premier champ en erreur à l’écran. */
      requestAnimationFrame(() =>
        document
          .querySelector(`[aria-invalid="true"], [data-error="true"], [data-invalid="true"]`)
          ?.scrollIntoView({ behavior: "smooth", block: "center" }),
      );
      return;
    }

    const honeypot = new FormData(event.currentTarget).get(HONEYPOT_FIELD) ?? "";

    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...parsed.data,
          [HONEYPOT_FIELD]: honeypot,
          elapsedMs: Date.now() - openedAt.current,
        }),
      });
      if (!response.ok) throw new Error("La demande n’a pas pu être envoyée.");
      setSent(parsed.data);
    } catch {
      setStatus("error");
    }
  }

  if (sent) return <ContactConfirmation request={sent} />;

  /* Le message WhatsApp de la colonne nomme l’offre choisie, s’il y en a une. */
  const whatsappMessage = introMessage(formulaLabel(values.formula));

  return (
    <>
      <section className="gutter grid gap-4 border-b border-slate/10 pt-[26px] pb-[22px] nav:grid-cols-[1fr_360px] nav:items-end nav:gap-12 nav:pt-14 nav:pb-10">
        <div>
          <div className="t-eyebrow text-terracotta">Prenons contact</div>
          <h1 className="mt-3 font-serif text-[36px]/[1.05] tracking-[-0.025em] nav:mt-4 nav:text-[54px]/[1.05]">
            Parlons de votre projet
          </h1>
          <p className="mt-3 max-w-[62ch] text-[15px]/[1.65] text-slate/80 text-pretty nav:mt-4 nav:text-[17px]/[1.7]">
            Quelques questions pour comprendre votre situation. Johana vous recontacte ensuite
            pour convenir de votre entretien préalable gratuit de 20 minutes.
          </p>
        </div>
        <p className="inline-flex items-center gap-[9px] justify-self-start rounded-full bg-peach px-[14px] py-[9px] text-[13px]/none font-semibold nav:gap-[10px] nav:px-4 nav:py-[10px] nav:text-[13.5px]">
          <span aria-hidden="true" className="size-[6px] rounded-full bg-terracotta nav:size-[7px]" />
          Gratuit et sans engagement
        </p>
      </section>

      {/* Téléphone : WhatsApp d’abord, le formulaire ensuite. */}
      <div className="gutter pt-5 nav:hidden">
        <WhatsAppCard message={whatsappMessage} />
        <div className="mt-5 flex items-center gap-3" aria-hidden="true">
          <span className="h-px flex-1 bg-slate/16" />
          <span className="text-[12px]/none font-semibold text-slate/55">
            ou remplissez le formulaire
          </span>
          <span className="h-px flex-1 bg-slate/16" />
        </div>
      </div>

      <div className="gutter grid items-start gap-12 pt-6 pb-8 nav:grid-cols-[1fr_360px] nav:pt-11 nav:pb-16">
        <ContactForm
          values={values}
          set={set}
          country={country}
          onCountryChange={setCountry}
          errors={errors}
          status={status}
          onSubmit={onSubmit}
        />
        <ContactSidebar message={whatsappMessage} />
      </div>
    </>
  );
}
