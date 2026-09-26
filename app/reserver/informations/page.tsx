"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Bits";
import {
  ChoiceChip,
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
import { ProgressSteps } from "@/components/reserver/ProgressSteps";
import { BookingSummary } from "@/components/reserver/BookingSummary";
import { countries } from "@/content/countries";
import { levels, participantTypes } from "@/content/form-options";
import { routes, site } from "@/content/site";
import { slotEnd } from "@/lib/availability";
import { useBooking } from "@/lib/booking-context";
import { dayAndMonth } from "@/lib/dates";
import { bookingSchema, fieldErrors } from "@/lib/validation";

export default function BookingInfoPage() {
  const router = useRouter();
  const { booking, update, ready } = useBooking();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");

  /* Sans créneau choisi, l’étape 2 n’a pas de sens : retour à l’étape 1. */
  useEffect(() => {
    if (ready && (!booking.date || !booking.slot)) router.replace(routes.booking);
  }, [ready, booking.date, booking.slot, router]);

  if (!ready || !booking.date || !booking.slot) return null;

  const clearError = (field: string) =>
    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });

  const set = (field: keyof typeof booking) => (value: string) => {
    update({ [field]: value });
    clearError(field);
  };

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const parsed = bookingSchema.safeParse(booking);
    if (!parsed.success) {
      setErrors(fieldErrors(parsed.error));
      return;
    }

    setStatus("sending");
    try {
      const response = await fetch("/api/reservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (!response.ok) throw new Error("réservation refusée");
      update({ confirmed: true });
      router.push(routes.bookingConfirmation);
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <section className="gutter pt-6 pb-6 nav:pt-10 nav:pb-8">
        <Eyebrow>Entretien préalable gratuit</Eyebrow>
        <h1 className="t-h1-page mt-3 nav:mt-4 nav:text-[48px]/[1.05]">Vos informations</h1>
        <p className="mt-3 max-w-[74ch] text-[14.5px]/[1.7] text-slate/78 nav:mt-[14px] nav:text-[16.5px]">
          Ces quelques éléments me permettent de préparer l’entretien et de vous envoyer la
          confirmation.
        </p>
        <ProgressSteps current={2} />
      </section>

      {/* Rappel compact du créneau retenu, propre au mobile. */}
      <div className="gutter nav:hidden">
        <div className="flex items-center justify-between gap-3 rounded-[12px] bg-sand px-4 py-3">
          <span className="text-[13.5px]/[1.4]">
            {dayAndMonth(booking.date)}, {booking.slot} à {slotEnd(booking.slot)}
          </span>
          <Link href={routes.booking} className="text-[13px]/none font-semibold underline">
            Modifier
          </Link>
        </div>
      </div>

      <div className="gutter mt-5 grid items-start gap-5 nav:mt-0 nav:grid-cols-[1.35fr_0.65fr] nav:gap-8">
        <form
          onSubmit={onSubmit}
          noValidate
          className="card rounded-[18px] bg-offwhite p-5 nav:rounded-[20px] nav:px-10 nav:py-9"
        >
          <FormStep number="01" title="Qui participe à l’entretien ?">
            <div className="mt-5 grid gap-3 nav:grid-cols-3">
              {participantTypes.map((type) => (
                <RadioCard
                  key={type.value}
                  name="participant"
                  value={type.value}
                  checked={booking.participant === type.value}
                  onChange={set("participant")}
                >
                  {type.label}
                </RadioCard>
              ))}
            </div>
            <FieldError id="participant-error" message={errors.participant} />
          </FormStep>

          <StepDivider />

          <FormStep number="02" title="Vos coordonnées">
            <div className="mt-5 grid gap-4 nav:grid-cols-2">
              <TextField
                label="Nom et prénom"
                placeholder="Votre nom"
                autoComplete="name"
                value={booking.name}
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
                value={booking.youngName}
                onChange={(event) => set("youngName")(event.target.value)}
                error={errors.youngName}
              />
              <TextField
                label="Téléphone / WhatsApp"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="+229 …"
                value={booking.phone}
                onChange={(event) => set("phone")(event.target.value)}
                error={errors.phone}
              />
              <TextField
                label="Adresse e-mail"
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="prenom@exemple.com"
                value={booking.email}
                onChange={(event) => set("email")(event.target.value)}
                error={errors.email}
              />
              <SelectField
                label="Pays de résidence"
                placeholder="Sélectionnez votre pays"
                options={countries.map((country) => ({
                  value: country.code,
                  label: country.name,
                }))}
                value={booking.country}
                onChange={(event) => set("country")(event.target.value)}
                error={errors.country}
              />
            </div>

            <SubLabel className="mt-6">Niveau du jeune</SubLabel>
            <div className="mt-3 flex flex-wrap gap-[10px]">
              {levels.map((level) => (
                <ChoiceChip
                  key={level.value}
                  name="level"
                  value={level.value}
                  checked={booking.level === level.value}
                  onChange={set("level")}
                >
                  {level.label}
                </ChoiceChip>
              ))}
            </div>
          </FormStep>

          <StepDivider />

          <FormStep number="03" title="Où en êtes-vous ?">
            <p className="mt-4 text-[14px]/[1.6] text-slate/70">
              Quelques lignes suffisent. Pas besoin d’avoir toutes les réponses.
            </p>
            <div className="mt-3">
              <TextArea
                rows={5}
                value={booking.situation}
                onChange={(event) => set("situation")(event.target.value)}
                error={errors.situation}
                aria-label="Où en êtes-vous ?"
                placeholder="Exemple : « Mon fils est en 2nde et hésite entre plusieurs spécialités. Il aime les sciences mais ne sait pas encore vers quelles études s’orienter. »"
              />
            </div>
          </FormStep>

          <div className="mt-7">
            <Checkbox
              checked={booking.consent}
              onChange={(consent) => {
                update({ consent });
                clearError("consent");
              }}
              error={errors.consent}
            >
              J’accepte que ces informations soient utilisées uniquement pour préparer notre
              entretien et me recontacter.
            </Checkbox>
          </div>

          <div className="mt-6 flex flex-col gap-3 nav:flex-row nav:justify-end">
            <ButtonLink href={routes.booking} variant="secondary" block className="nav:w-auto">
              <span aria-hidden="true">←</span> Retour
            </ButtonLink>
            <Button type="submit" block disabled={status === "sending"} className="nav:w-auto">
              {status === "sending" ? "Confirmation…" : "Confirmer mon rendez-vous"}
            </Button>
          </div>

          {status === "error" && (
            <p role="alert" className="mt-3 text-[13.5px]/[1.6] text-terracotta">
              La réservation n’a pas pu être enregistrée. Réessayez, ou écrivez-nous sur{" "}
              <a href={site.whatsapp} target="_blank" rel="noreferrer noopener" className="underline">
                WhatsApp
              </a>
              .
            </p>
          )}
        </form>

        <div className="hidden nav:block">
          <BookingSummary
            booking={booking}
            note="Vous pourrez modifier ou annuler ce rendez-vous depuis le lien reçu par e-mail."
          />
        </div>
      </div>
    </>
  );
}
