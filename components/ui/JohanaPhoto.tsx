import Image from "next/image";
import johanaPhoto from "@/content/photos/johana-ghionda.jpg";
import { cn } from "@/lib/cn";

/**
 * La photo de Johana, dans un cadre dont chaque emplacement fixe la taille.
 *
 * La photo est en portrait (1620 × 2160) et les cadres sont plus larges que
 * hauts : `object-position` garde le visage, des lunettes au menton, quelle que
 * soit la découpe, tant que le cadre n’est pas trop large pour sa hauteur :
 * - sur téléphone (moins de 400 px), une hauteur fixe suffit ;
 * - en une colonne à partir de 400 px, le cadre garde la forme 6/5
 *   (`aspect-[6/5]`) : avec une hauteur fixe, une tablette n’en montrerait plus
 *   que les yeux ;
 * - en deux colonnes (`nav`), sa hauteur grandit avec l’écran (`clamp`), pour
 *   la même raison sur les grands écrans.
 *
 * Pas de `min-h` avec `aspect-[6/5]` : la hauteur minimale imposerait aussi une
 * largeur minimale (280 px de haut donnent 336 px de large), et la photo
 * déborderait d’un écran de 320 px.
 *
 * `sizes` est le même partout : le navigateur choisit la même version de
 * l’image sur toutes les pages et ne la télécharge qu’une fois.
 *
 * Pour changer de photo, remplacer `content/photos/johana-ghionda.jpg` ; si le
 * visage n’est plus au même endroit, ajuster `object-position`.
 */
export function JohanaPhoto({
  className,
  priority,
}: {
  className?: string;
  /** À mettre sur la photo visible dès l’ouverture de la page. */
  priority?: boolean;
}) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <Image
        src={johanaPhoto}
        alt="Johana Ghionda, conseillère d’orientation, à son bureau"
        fill
        sizes="(min-width: 900px) 45vw, 100vw"
        priority={priority}
        placeholder="blur"
        className="object-cover object-[50%_28%]"
      />
    </div>
  );
}
