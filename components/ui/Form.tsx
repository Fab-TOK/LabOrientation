"use client";

import { useId, type ReactNode, type SelectHTMLAttributes, type InputHTMLAttributes, type TextareaHTMLAttributes } from "react";
import { NumberPill } from "@/components/ui/Bits";
import { cn } from "@/lib/cn";

/** En-tête d’un bloc numéroté du formulaire. */
export function FormStep({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <fieldset>
      <legend className="flex items-center gap-[14px]">
        <NumberPill className="size-[30px]">{number}</NumberPill>
        <span className="font-serif text-[22px]/[1.2] nav:text-[28px]">{title}</span>
      </legend>
      {children}
    </fieldset>
  );
}

export function StepDivider() {
  return <div className="my-7 h-px bg-slate/12 nav:my-9" aria-hidden="true" />;
}

export function SubLabel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("text-[14px]/none font-semibold text-slate/75", className)}>{children}</div>
  );
}

export function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-[6px] text-[13px]/[1.4] text-terracotta">
      {message}
    </p>
  );
}

/** Grande option cliquable avec un rond de radio, blocs 01 et 04. */
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
        "flex cursor-pointer items-center gap-3 rounded-[12px] border-[1.5px] px-5 py-[18px] transition-colors",
        checked
          ? "border-slate bg-slate text-cream"
          : "border-slate/18 hover:border-slate/35",
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
      <span className={cn("text-[15px]/[1.3]", checked ? "font-semibold" : "font-medium")}>
        {children}
      </span>
    </label>
  );
}

/** Pastille de sélection, niveaux scolaires. */
export function ChoiceChip({
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
        "cursor-pointer rounded-full border-[1.5px] px-[22px] py-3 text-[14.5px]/none transition-colors",
        checked
          ? "border-turquoise bg-turquoise font-semibold text-white"
          : "border-slate/18 font-medium hover:border-slate/35",
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
      {children}
    </label>
  );
}

/** Tuile de sélection, accompagnements souhaités. */
export function ChoiceTile({
  name,
  value,
  checked,
  onChange,
  dashed,
  className,
  children,
}: {
  name: string;
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
  dashed?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <label
      className={cn(
        "cursor-pointer rounded-[11px] border-[1.5px] px-[18px] py-[14px] text-[14.5px]/[1.3] transition-colors",
        checked
          ? "border-turquoise bg-turquoise/12 font-semibold"
          : dashed
            ? "border-dashed border-slate/30 font-medium text-slate/70 hover:border-slate/50"
            : "border-slate/18 font-medium hover:border-slate/35",
        className,
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
      {children}
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
        className="field mt-2"
      />
      <FieldError id={errorId} message={error} />
    </div>
  );
}

type SelectFieldProps = {
  label: ReactNode;
  error?: string;
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
      <div className="relative mt-2">
        <select
          id={id}
          {...select}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className="field cursor-pointer appearance-none pr-11"
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
          className="pointer-events-none absolute top-1/2 right-[18px] -translate-y-1/2 text-slate/50"
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

export function TextArea({ label, error, ...textarea }: TextAreaProps) {
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
        className={cn("field resize-y", label ? "mt-2" : undefined)}
      />
      <FieldError id={errorId} message={error} />
    </div>
  );
}

export function Checkbox({
  checked,
  onChange,
  error,
  children,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  error?: string;
  children: ReactNode;
}) {
  const id = useId();
  const errorId = `${id}-error`;
  return (
    <div>
      <label className="flex cursor-pointer items-start gap-3">
        <input
          type="checkbox"
          checked={checked}
          onChange={(event) => onChange(event.target.checked)}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className="sr-only"
        />
        <span
          aria-hidden="true"
          className={cn(
            "mt-px flex size-5 flex-none items-center justify-center rounded-[5px] border text-[12px] font-bold text-white transition-colors",
            checked ? "border-turquoise bg-turquoise" : "border-slate/30",
          )}
        >
          {checked ? "✓" : ""}
        </span>
        <span className="text-[13.5px]/[1.6] text-slate/80">{children}</span>
      </label>
      <FieldError id={errorId} message={error} />
    </div>
  );
}
