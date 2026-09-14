import { cn } from "@/lib/cn";
import type { Formula } from "@/content/formulas";

/** Surtitre de section, en capitales terracotta. */
export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("t-eyebrow text-terracotta", className)}>{children}</div>;
}

/** Étiquette en capitales, sur fond clair ou ardoise selon la classe passée. */
export function Label({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("t-label", className)}>{children}</div>;
}

/** Pastille numérotée, pleine par défaut, en contour avec `outline`. */
export function NumberPill({
  children,
  outline,
  className,
}: {
  children: React.ReactNode;
  outline?: boolean;
  className?: string;
}) {
  return (
    <span className={cn("pill-num", outline && "pill-num-outline", className)}>
      {children}
    </span>
  );
}

/** Titre de formule, avec exposant quand le libellé en comporte un. */
export function FormulaTitle({ formula }: { formula: Formula }) {
  if (!formula.titleSup) return <>{formula.title}</>;
  const { lead, sup, rest } = formula.titleSup;
  return (
    <>
      {lead}
      <sup className="align-super text-[0.55em]">{sup}</sup>
      {rest}
    </>
  );
}

/** Le globe du bandeau de chiffres de l’accueil — seule icône dessinée du site. */
export function GlobeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true" focusable="false">
      <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" strokeWidth="4" />
      <ellipse cx="50" cy="50" rx="20" ry="44" fill="none" stroke="currentColor" strokeWidth="4" />
      <path d="M6 50h88M14 28h72M14 72h72" stroke="currentColor" strokeWidth="4" fill="none" />
    </svg>
  );
}

/** Coche dans une pastille turquoise, ligne de réassurance du hero. */
export function CheckPill({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "flex size-[26px] flex-none items-center justify-center rounded-full bg-turquoise text-[13px] font-bold text-white",
        className,
      )}
      aria-hidden="true"
    >
      ✓
    </span>
  );
}
