"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import {
  ChoiceChip,
  ChoiceTile,
  Checkbox,
  FieldError,
  FormStep,
  RadioCard,
  SelectField,
  StepDivider,
  SubLabel,
  TextArea,
  TextField,
} from "@/components/ui/Form";
import { countries } from "@/content/countries";
import {
  contactFormulaOptions,
  isValidFormulaChoice,
  UNDECIDED_FORMULA,
  UNDECIDED_FORMULA_LABEL,
} from "@/content/formulas";
import { contactTypes, formats, levels } from "@/content/form-options";
import { site } from "@/content/site";
import { contactSchema, fieldErrors } from "@/lib/validation";

type Values = {
  contactType: string;
  level: string;
  formula: string;
  format: string;
  message: string;
  name: string;
  youngName: string;
  phone: string;
  email: string;
  country: string;
};

const EMPTY: Values = {
  contactType: "",
  level: "",
  formula: "",
  format: "",
  message: "",
  name: "",
  youngName: "",
  phone: "",
  email: "",
  country: "",
};

export function ContactForm() {
  const searchParams = useSearchParams();
  /* Pré-sélection depuis « Demander cette formule », page Nos offres. */
  const requested = searchParams.get("formule") ?? "";

  const [values, setValues] = useState<Values>({
    ...EMPTY,
    formula: isValidFormulaChoice(requested) ? requested : "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [consent, setConsent] = useState(false);

  const clearError = (field: string) =>
    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });

  const set = (field: keyof Values) => (value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    clearError(field);
  };

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const parsed = contactSchema.safeParse(values);
    if (!parsed.success) {
      setErrors(fieldErrors(parsed.error));
      document
        .querySelector(`[aria-invalid="true"], [data-error="true"]`)
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    if (!consent) {
      setErrors({ consent: "Merci de confirmer votre accord pour être recontacté(e)." });
      return;
    }

    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (!response.ok) throw new Error("La demande n’a pas pu être envoyée.");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="card rounded-[18px] bg-offwhite p-6 nav:rounded-[20px] nav:px-[46px] nav:py-11">
        <span className="badge-peach">Demande envoyée</span>
        <h2 className="mt-4 font-serif text-[26px]/[1.2] nav:text-[32px]">
          Merci, votre message est parti.
        </h2>
        <p className="mt-3 max-w-[60ch] text-[15px]/[1.7] text-slate/80">
          Lab’Orientation vous recontactera sous {site.responseDelay} pour convenir de la
          séance de mise en contact de 30 minutes, offerte et sans engagement.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="card rounded-[18px] bg-offwhite p-6 nav:rounded-[20px] nav:px-[46px] nav:py-11"
    >
      <FormStep number="01" title="Qui nous contacte ?">
        <div className="mt-5 grid gap-3 nav:grid-cols-3">
          {contactTypes.map((type) => (
            <RadioCard
              key={type.value}
              name="contactType"
              value={type.value}
              checked={values.contactType === type.value}
              onChange={set("contactType")}
            >
              {type.label}
            </RadioCard>
          ))}
        </div>
        <div data-error={errors.contactType ? "true" : undefined}>
          <FieldError id="contactType-error" message={errors.contactType} />
        </div>
      </FormStep>

      <StepDivider />

      <FormStep number="02" title="Quelle est votre situation ?">
        <SubLabel className="mt-[22px]">Niveau du jeune</SubLabel>
        <div className="mt-3 flex flex-wrap gap-[10px]">
          {levels.map((level) => (
            <ChoiceChip
              key={level.value}
              name="level"
              value={level.value}
              checked={values.level === level.value}
              onChange={set("level")}
            >
              {level.label}
            </ChoiceChip>
          ))}
        </div>

        <SubLabel className="mt-7">L’accompagnement qui vous intéresse</SubLabel>
        <div className="mt-3 grid gap-[10px] sm:grid-cols-2 nav:grid-cols-3">
          {contactFormulaOptions.map((option) => (
            <ChoiceTile
              key={option.slug}
              name="formula"
              value={option.slug}
              checked={values.formula === option.slug}
              onChange={set("formula")}
            >
              {option.label}
            </ChoiceTile>
          ))}
          <ChoiceTile
            name="formula"
            value={UNDECIDED_FORMULA}
            checked={values.formula === UNDECIDED_FORMULA}
            onChange={set("formula")}
            dashed
            className="sm:col-span-2 nav:col-span-2"
          >
            {UNDECIDED_FORMULA_LABEL}
          </ChoiceTile>
        </div>
        <FieldError id="formula-error" message={errors.formula} />

        <SubLabel className="mt-7">Comment souhaitez-vous être accompagné(e) ?</SubLabel>
        <div className="mt-3 grid gap-[10px] nav:grid-cols-3">
          {formats.map((format) => (
            <RadioCard
              key={format.value}
              name="format"
              value={format.value}
              checked={values.format === format.value}
              onChange={set("format")}
            >
              {format.label}
            </RadioCard>
          ))}
        </div>
      </FormStep>

      <StepDivider />

      <FormStep number="03" title="Parlez-nous un peu de votre besoin">
        <p className="mt-4 text-[14px]/[1.6] text-slate/70">Quelques lignes suffisent.</p>
        <div className="mt-3">
          <TextArea
            rows={5}
            value={values.message}
            onChange={(event) => set("message")(event.target.value)}
            error={errors.message}
            placeholder="Exemple : « Mon fils est en 2nde et hésite entre plusieurs spécialités. Il aime les sciences mais ne sait pas encore vers quelles études s’orienter. »"
            aria-label="Votre besoin"
          />
        </div>
      </FormStep>

      <StepDivider />

      <FormStep number="04" title="Vos coordonnées">
        <div className="mt-5 grid gap-4 nav:grid-cols-2">
          <TextField
            label="Nom et prénom"
            placeholder="Votre nom"
            autoComplete="name"
            value={values.name}
            onChange={(event) => set("name")(event.target.value)}
            error={errors.name}
          />
          <TextField
            label={
              <>
                Nom et prénom du jeune{" "}
                <span className="font-normal text-slate/55">si différent</span>
              </>
            }
            placeholder="Nom du jeune"
            value={values.youngName}
            onChange={(event) => set("youngName")(event.target.value)}
            error={errors.youngName}
          />
          <TextField
            label="Téléphone / WhatsApp"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="+229 …"
            value={values.phone}
            onChange={(event) => set("phone")(event.target.value)}
            error={errors.phone}
          />
          <TextField
            label="Adresse e-mail"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="prenom@exemple.com"
            value={values.email}
            onChange={(event) => set("email")(event.target.value)}
            error={errors.email}
          />
          <SelectField
            label="Pays de résidence"
            placeholder="Sélectionnez votre pays"
            options={countries.map((country) => ({ value: country.code, label: country.name }))}
            value={values.country}
            onChange={(event) => set("country")(event.target.value)}
            error={errors.country}
          />
        </div>
      </FormStep>

      <div className="mt-7 nav:mt-9">
        <Checkbox
          checked={consent}
          onChange={(next) => {
            setConsent(next);
            clearError("consent");
          }}
          error={errors.consent}
        >
          J’accepte d’être recontacté(e) par Lab’Orientation au sujet de cette demande.
        </Checkbox>

        <Button type="submit" size="lg" block disabled={status === "sending"} className="mt-5">
          {status === "sending" ? "Envoi en cours…" : "Prendre contact avec Lab’Orientation"}
        </Button>

        <p className="mt-3 text-[13px]/[1.6] text-slate/70">
          Vos informations ne servent qu’à préparer notre échange. Réponse sous{" "}
          {site.responseDelay}.
        </p>

        {status === "error" && (
          <p role="alert" className="mt-3 text-[13.5px]/[1.6] text-terracotta">
            L’envoi a échoué. Réessayez, ou écrivez directement à{" "}
            <a href={site.emailHref} className="underline">
              {site.email}
            </a>
            .
          </p>
        )}
      </div>
    </form>
  );
}
