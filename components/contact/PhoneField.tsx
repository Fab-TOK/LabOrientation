"use client";

import { AsYouType, parsePhoneNumber, type CountryCode } from "libphonenumber-js";
import { useId, useRef } from "react";
import PhoneInput from "react-phone-number-input/input";
import { FieldError } from "@/components/ui/Form";
import { FAVORITE_COUNT, phoneCountries } from "@/content/phone-countries";

const byCode = new Map(phoneCountries.map((country) => [country.code, country]));

/**
 * Numéro WhatsApp : indicatif à gauche (drapeau, « +229 », ▾), numéro à droite.
 *
 * L’indicatif est une liste native, posée en transparence sur son étiquette
 * visible : au clic s’ouvre la liste du système (le sélecteur du téléphone
 * sur mobile), avec le nom et l’indicatif de chaque pays. Le numéro se met en
 * forme pendant la frappe (react-phone-number-input) ; la valeur transmise
 * est au format international, `+2290197275797`.
 */
export function PhoneField({
  label,
  country,
  onCountryChange,
  value,
  onChange,
  error,
}: {
  label: React.ReactNode;
  country: CountryCode;
  onCountryChange: (country: CountryCode) => void;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}) {
  const id = useId();
  const errorId = `${id}-error`;
  const input = useRef<HTMLInputElement>(null);
  const selected = byCode.get(country) ?? phoneCountries[0];

  /** Change d’indicatif en gardant les chiffres déjà tapés. */
  function changeCountry(next: CountryCode) {
    const digits = value ? nationalDigits(value) : "";
    onCountryChange(next);
    if (digits) {
      const typed = new AsYouType(next);
      typed.input(digits);
      onChange(typed.getNumber()?.number ?? "");
    }
    input.current?.focus();
  }

  return (
    <div>
      <label htmlFor={id} className="t-field-label block text-slate/75">
        {label}
      </label>
      <div className="field-group mt-[9px]" data-invalid={error ? "true" : undefined}>
        <div className="relative flex flex-none items-center gap-2 border-r border-slate/14 px-[14px]">
          {/* Drapeau servi par `app/drapeaux`. Une image neuve à chaque pays
              (`key`) : pendant son chargement, une case grise, jamais le
              drapeau du pays précédent à côté du nouvel indicatif. */}
          {/* eslint-disable-next-line @next/next/no-img-element -- drapeau de 20 px, sans optimisation utile */}
          <img
            key={selected.code}
            src={`/drapeaux/${selected.code}.svg`}
            alt=""
            width={20}
            height={14}
            className="h-[14px] w-5 flex-none rounded-[2px] bg-slate/10 object-cover shadow-[0_0_0_1px_rgb(47_72_88/0.15)]"
          />
          <span className="text-[15px]/none font-semibold text-slate">+{selected.dial}</span>
          <span aria-hidden="true" className="text-[12px]/none text-slate/50">
            ▾
          </span>
          <select
            aria-label="Indicatif du pays"
            value={selected.code}
            onChange={(event) => changeCountry(event.target.value as CountryCode)}
            className="absolute inset-0 cursor-pointer opacity-0"
          >
            {phoneCountries.map((entry, index) => (
              <FragmentOption key={entry.code} separator={index === FAVORITE_COUNT}>
                <option value={entry.code}>
                  {entry.name} +{entry.dial}
                </option>
              </FragmentOption>
            ))}
          </select>
        </div>
        <PhoneInput
          id={id}
          ref={input}
          country={country}
          value={value || undefined}
          onChange={(next) => onChange(next ?? "")}
          type="tel"
          autoComplete="tel-national"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className="field-group-input"
        />
      </div>
      <FieldError id={errorId} message={error} />
    </div>
  );
}

/** Un trait non sélectionnable sépare les pays favoris des autres. */
function FragmentOption({ separator, children }: { separator: boolean; children: React.ReactNode }) {
  return (
    <>
      {separator && <option disabled>──────────</option>}
      {children}
    </>
  );
}

function nationalDigits(value: string): string {
  try {
    return parsePhoneNumber(value).formatNational().replace(/\D/g, "");
  } catch {
    return value.replace(/^\+\d{1,3}/, "").replace(/\D/g, "");
  }
}
