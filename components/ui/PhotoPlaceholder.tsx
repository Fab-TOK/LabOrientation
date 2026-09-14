import { cn } from "@/lib/cn";

/**
 * Emplacement réservé pour une photographie non encore fournie.
 *
 * Quand la cliente livrera les images, remplacer ce composant par un
 * `next/image` aux mêmes dimensions : les proportions sont déjà celles
 * attendues par les maquettes.
 */
export function PhotoPlaceholder({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <div className={cn("photo-ph", className)} role="img" aria-label={label}>
      <span className="photo-ph-tag" aria-hidden="true">
        {label}
      </span>
    </div>
  );
}
