"use client";

import { useId, type ReactNode, type SelectHTMLAttributes, type InputHTMLAttributes, type TextareaHTMLAttributes } from "react";
import { NumberPill } from "@/components/ui/Bits";
import { cn } from "@/lib/cn";

/** Astérisque terracotta des champs obligatoires ; l’obligation est aussi portée par `aria-required`. */
export function Required() {
  return (
    <span aria-hidden="true" className="ml-[3px] font-bold text-terracotta">
      *
    </span>
  );
}

/** En-tête d’un bloc numéroté du formulaire, avec sa mention obligatoire ou facultative. */
export function FormStep({
  number,
  title,
  status,
  children,
}: {
  number: string;
  title: string;
  status?: "required" | "optional";
  children: ReactNode;
}) {
  return (
    <fieldset>
      <legend className="flex items-center gap-[11px] nav:gap-[14px]">
        <NumberPill className="size-7 text-[11.5px] nav:size-[30px] nav:text-[12px]">{number}</NumberPill>
        <span className="caps-align font-serif text-[23px]/[1.2] nav:text-[26px]">
          {title}
          {status === "required" && <Required />}
          {status === "optional" && (
            <span className="ml-[10px] font-sans text-[13px]/none text-slate/55 nav:text-[14px]">
              (facultatif)
            </span>
          )}
        </span>
      </legend>
      {children}
    </fieldset>
  );
}

export function StepDivider() {
  return <div className="my-7 h-px bg-slate/12 nav:my-[34px]" aria-hidden="true" />;
}

export function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-[6px] text-[13px]/[1.4] text-terracotta">
      {message}
    </p>
  );
}

/** Grande option cliquable avec un rond de radio. */
export function RadioCard({
  name,
  value,
  checked,
  onChange,
  children,
}: {
  name: string;
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
  children: ReactNode;
}) {
  return (
    <label
      className={cn(
        "flex cursor-pointer items-center gap-3 rounded-[12px] border-[1.5px] px-[18px] py-[17px] transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-turquoise nav:px-5 nav:py-[18px]",
        checked ? "border-slate bg-slate text-cream" : "border-slate/18 bg-white hover:border-slate/35",
      )}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        className="sr-only"
      />
      <span
        aria-hidden="true"
        className={cn(
          "size-[18px] flex-none rounded-full border-2",
          checked ? "border-turquoise bg-turquoise" : "border-slate/30",
        )}
        style={checked ? { boxShadow: "inset 0 0 0 3px var(--color-slate)" } : undefined}
      />
      {/* Décalage de 0,083em : les capitales de Figtree remontent dans leur
          ligne ; ainsi centrées sur le rond (mesuré). */}
      <span
        className={cn(
          "pt-[0.083em] -mb-[0.083em] text-[15px]/[1.3]",
          checked ? "font-semibold" : "font-medium",
        )}
      >
        {children}
      </span>
    </label>
  );
}

type TextFieldProps = {
  label: ReactNode;
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export function TextField({ label, error, ...input }: TextFieldProps) {
  const id = useId();
  const errorId = `${id}-error`;
  return (
    <div>
      <label htmlFor={id} className="t-field-label block text-slate/75">
        {label}
      </label>
      <input
        id={id}
        {...input}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className="field mt-[9px]"
      />
      <FieldError id={errorId} message={error} />
    </div>
  );
}

type SelectFieldProps = {
  label: ReactNode;
  error?: string;
  /** Première option, valeur vide : affichée en gris, comme un texte indicatif. */
  placeholder: string;
  options: { value: string; label: string }[];
} & SelectHTMLAttributes<HTMLSelectElement>;

export function SelectField({ label, error, placeholder, options, ...select }: SelectFieldProps) {
  const id = useId();
  const errorId = `${id}-error`;
  return (
    <div>
      <label htmlFor={id} className="t-field-label block text-slate/75">
        {label}
      </label>
      <div className="relative mt-[9px]">
        <select
          id={id}
          {...select}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={cn("field cursor-pointer appearance-none pr-11", !select.value && "text-slate/40")}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 right-[18px] -translate-y-1/2 text-[13px]/none text-slate/45"
        >
          ▾
        </span>
      </div>
      <FieldError id={errorId} message={error} />
    </div>
  );
}

type TextAreaProps = {
  label?: ReactNode;
  error?: string;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

export function TextArea({ label, error, className, ...textarea }: TextAreaProps) {
  const id = useId();
  const errorId = `${id}-error`;
  return (
    <div>
      {label && (
        <label htmlFor={id} className="t-field-label block text-slate/75">
          {label}
        </label>
      )}
      <textarea
        id={id}
        {...textarea}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={cn("field resize-y", label ? "mt-[9px]" : undefined, className)}
      />
      <FieldError id={errorId} message={error} />
    </div>
  );
}
