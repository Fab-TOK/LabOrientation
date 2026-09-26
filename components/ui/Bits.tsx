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

/*
 * Méridiens du globe. Chacun est l’arc avant d’un méridien, d’un pôle à
 * l’autre, et traverse le globe de gauche à droite : il part collé au contour
 * gauche et finit collé au contour droit, si bien que son retour au départ ne
 * se voit pas. Une ellipse entière, elle, est symétrique : l’œil ne sait pas
 * dans quel sens elle tourne, et le globe semblait changer de sens.
 *
 * Deux courbes de Bézier dont chaque point se déplace en ligne droite : c’est
 * ce que `<animate>` sait interpoler. Animé en SMIL et non en CSS, dont
 * l’animation de `d` n’est pas prise en charge partout. Conséquence, voulue
 * par la cliente : le globe tourne aussi pour les visiteurs qui demandent
 * moins de mouvement.
 */
const MERIDIAN_FROM = "M50 6C25.7 6 6 25.7 6 50S25.7 94 50 94";
const MERIDIAN_TO = "M50 6C74.3 6 94 25.7 94 50S74.3 94 50 94";
/** Dessin fixe, si l’animation ne part pas : position de départ de chaque méridien. */
const MERIDIAN_STILL = [
  MERIDIAN_FROM,
  "M50 6C37.85 6 28 25.7 28 50S37.85 94 50 94",
  "M50 6C62.15 6 72 25.7 72 50S62.15 94 50 94",
];
/** Durée d’une traversée. Les trois méridiens sont décalés d’un tiers. */
const MERIDIAN_SECONDS = 7;

/** Le globe du bandeau de chiffres de l’accueil — seule icône dessinée du site. */
export function GlobeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true" focusable="false">
      <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" strokeWidth="4" />
      {MERIDIAN_STILL.map((still, index) => (
        <path key={index} d={still} fill="none" stroke="currentColor" strokeWidth="4">
          {/* Courbe sinus : un point qui tourne à vitesse constante, vu de
              face, ralentit aux bords et file au centre. */}
          <animate
            attributeName="d"
            values={`${MERIDIAN_FROM};${MERIDIAN_TO}`}
            dur={`${MERIDIAN_SECONDS}s`}
            begin={`${-((index * MERIDIAN_SECONDS) / 3).toFixed(3)}s`}
            repeatCount="indefinite"
            calcMode="spline"
            keyTimes="0;1"
            keySplines="0.37 0 0.63 1"
          />
        </path>
      ))}
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
