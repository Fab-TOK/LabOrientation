"use client";

import type { CountryCode } from "libphonenumber-js";
import { Button } from "@/components/ui/Button";
import {
  FieldError,
  FormStep,
  RadioCard,
  Required,
  SelectField,
  StepDivider,
  TextArea,
  TextField,
} from "@/components/ui/Form";
import { PhoneField } from "@/components/contact/PhoneField";
import { HowItWorks } from "@/components/contact/ContactSidebar";
import { contactFormulaOptions, UNDECIDED_FORMULA_LABEL } from "@/content/formulas";
import { contactTypes, levels } from "@/content/form-options";
import { site } from "@/content/site";
import { HONEYPOT_FIELD } from "@/lib/anti-spam";

export type ContactValues = {
  contactType: string;
  name: string;
  whatsapp: string;
  email: string;
  level: string;
  formula: string;
  message: string;
};

/**
 * Le formulaire de la page Contact, en trois blocs : qui vous êtes, vos
 * coordonnées (obligatoires), votre situation (facultative). L’état vit dans
 * `ContactExperience`, qui l’envoie et affiche la confirmation.
 *
 * Ordinateur : carte blanche. Téléphone : à même la page, « Comment ça se
 * passe » en bas, et le bouton d’envoi collé en bas de l’écran tant que le
 * formulaire est visible.
 */
export function ContactForm({
  values,
  set,
  country,
  onCountryChange,
  errors,
  status,
  onSubmit,
}: {
  values: ContactValues;
  set: (field: keyof ContactValues) => (value: string) => void;
  country: CountryCode;
  onCountryChange: (country: CountryCode) => void;
  errors: Record<string, string>;
  status: "idle" | "sending" | "error";
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="nav:rounded-[20px] nav:border nav:border-slate/14 nav:bg-white nav:px-[42px] nav:py-10"
    >
      <p className="mb-5 text-[13px]/[1.5] text-slate/65 nav:mb-[26px]">
        <span aria-hidden="true" className="font-bold text-terracotta">
          *
        </span>{" "}
        Champs obligatoires
      </p>

      {/* Champ piège (`lib/anti-spam.ts`) : hors de l’écran, hors tabulation,
          tu aux lecteurs d’écran. Un humain le laisse vide, un robot le remplit. */}
      <div aria-hidden="true" className="sr-only">
        <label>
          Site web
          <input type="text" name={HONEYPOT_FIELD} tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>

      <FormStep number="01" title="Vous êtes" status="required">
        <div
          className="mt-[14px] grid gap-[10px] nav:mt-5 nav:gap-3 lg:grid-cols-3"
          data-error={errors.contactType ? "true" : undefined}
        >
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
        <FieldError id="contactType-error" message={errors.contactType} />
      </FormStep>

      <StepDivider />

      <FormStep number="02" title="Vos coordonnées" status="required">
        {/* Deux colonnes à partir de `xl` seulement : de 1 024 à 1 279 px, la
            case du numéro, à côté de l’indicatif, ne montrait que « 01 97 27 ». */}
        <div className="mt-4 grid gap-4 nav:mt-5 nav:gap-[18px] xl:grid-cols-2">
          <TextField
            label={
              <>
                Nom et prénom
                <Required />
              </>
            }
            placeholder="Votre nom"
            autoComplete="name"
            aria-required="true"
            value={values.name}
            onChange={(event) => set("name")(event.target.value)}
            error={errors.name}
          />
          <PhoneField
            label={
              <>
                Numéro WhatsApp
                <Required />
              </>
            }
            country={country}
            onCountryChange={onCountryChange}
            value={values.whatsapp}
            onChange={set("whatsapp")}
            error={errors.whatsapp}
          />
          <div className="xl:col-span-2">
            <TextField
              label={
                <>
                  Adresse e-mail
                  <Required />
                </>
              }
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="prenom@exemple.com"
              aria-required="true"
              value={values.email}
              onChange={(event) => set("email")(event.target.value)}
              error={errors.email}
            />
          </div>
        </div>
      </FormStep>

      <StepDivider />

      <FormStep number="03" title="Votre situation" status="optional">
        {/* `xl`, comme le bloc 02 : plus tôt, « Parcoursup étudiants
            internationaux » était coupé dans la liste des offres. */}
        <div className="mt-4 grid gap-4 nav:mt-5 nav:gap-[18px] xl:grid-cols-2">
          <SelectField
            label="Classe ou situation actuelle"
            placeholder="Sélectionnez"
            options={levels.map((level) => ({ value: level.value, label: level.label }))}
            value={values.level}
            onChange={(event) => set("level")(event.target.value)}
            error={errors.level}
          />
          <SelectField
            label="L’offre qui vous intéresse"
            placeholder={UNDECIDED_FORMULA_LABEL}
            options={contactFormulaOptions.map((option) => ({
              value: option.slug,
              label: option.label,
            }))}
            value={values.formula}
            onChange={(event) => set("formula")(event.target.value)}
            error={errors.formula}
          />
          <div className="xl:col-span-2">
            <TextArea
              label="Votre message"
              rows={4}
              value={values.message}
              onChange={(event) => set("message")(event.target.value)}
              error={errors.message}
              placeholder="Exemple : « Ma fille est en 1re et hésite entre plusieurs filières après le bac. »"
              className="min-h-[104px] placeholder:italic"
            />
          </div>
        </div>
      </FormStep>

      <HowItWorks className="mt-[22px] nav:hidden" />

      {/* Téléphone : barre collée en bas de l’écran, sur toute la largeur.
          Fond plein (la maquette le laisse transparent à 3 %) : rien ne doit
          se deviner sous le bouton. */}
      <div className="sticky bottom-0 -mx-[18px] mt-6 border-t border-slate/12 bg-cream px-[18px] pt-3 pb-4 nav:static nav:mx-0 nav:mt-7 nav:flex nav:items-center nav:gap-5 nav:border-0 nav:bg-transparent nav:p-0">
        <Button
          type="submit"
          size="lg"
          block
          disabled={status === "sending"}
          className="nav:w-auto nav:px-9 nav:py-[19px] nav:text-[16px]"
        >
          {status === "sending" ? "Envoi en cours…" : "Envoyer ma demande"}
        </Button>
        <p className="mt-2 text-center text-[12px]/[1.4] text-slate/60 nav:mt-0 nav:text-left nav:text-[13.5px]/[1.55] nav:text-slate/65">
          Réponse sous {site.responseDelay}.
        </p>
      </div>

      {status === "error" && (
        <p role="alert" className="mt-3 text-[13.5px]/[1.6] text-terracotta">
          L’envoi a échoué. Réessayez, ou écrivez directement à{" "}
          <a href={site.emailHref} className="underline">
            {site.email}
          </a>
          .
        </p>
      )}
    </form>
  );
}
