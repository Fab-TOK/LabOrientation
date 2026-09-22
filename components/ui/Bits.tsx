import { Fragment } from "react";
import { cn } from "@/lib/cn";
import type { AudienceLabel } from "@/content/formulas";

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

/**
 * Cercle d’initiale des témoignages. La teinte et la taille viennent de
 * `className` ; seul le centrage optique est ici, pour qu’il ne vive qu’à un
 * endroit (voir `.avatar-initial` dans `globals.css`).
 *
 * Masqué aux lecteurs d’écran : le nom complet suit toujours, juste à côté.
 */
export function InitialCircle({ letter, className }: { letter: string; className?: string }) {
  return (
    <span
      className={cn(
        "avatar-initial flex flex-none items-center justify-center rounded-full font-serif",
        className,
      )}
      aria-hidden="true"
    >
      {letter}
    </span>
  );
}

/** Public visé, avec ses ordinaux en exposant : « 4ᵉ et 3ᵉ », « 2ⁿᵈᵉ ». */
export function Audience({ label }: { label: AudienceLabel }) {
  return (
    <>
      {label.map((segment, index) =>
        typeof segment === "string" ? (
          <Fragment key={index}>{segment}</Fragment>
        ) : (
          <sup key={index} className="ord">
            {segment.sup}
          </sup>
        ),
      )}
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
