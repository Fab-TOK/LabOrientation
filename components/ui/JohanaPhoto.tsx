import Image from "next/image";
import johanaPhoto from "@/content/photos/johana-ghionda.jpg";
import { cn } from "@/lib/cn";

/**
 * La photo de Johana, dans un cadre dont chaque emplacement fixe la taille.
 *
 * La photo est en portrait (1620 × 2160) et les cadres sont verticaux, en 4/5
 * (`aspect-[4/5]`) : on la voit presque entière, visage, buste et bureau. Un
 * cadre plus large que haut n’en garderait que le visage. Seule exception,
 * le haut de l’accueil : carré, pour que la photo y reste moins haute.
 * - téléphone : toute la largeur ; tablette : 440 px au plus, centrée ;
 * - ordinateur : en haut de l’accueil, toute la colonne (540 px au plus) ;
 *   plus bas sur l’accueil, 86 % de la colonne (480 px au plus) ; sur la page
 *   Qui suis-je, hauteur fixée.
 *
 * `sizes` suit ces largeurs et reste le même partout : le navigateur choisit
 * la même version de l’image sur toutes les pages et ne la télécharge qu’une
 * fois.
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
        sizes="(min-width: 1380px) 540px, (min-width: 900px) 40vw, (min-width: 480px) 440px, 100vw"
        priority={priority}
        placeholder="blur"
        className="object-cover object-[50%_28%]"
      />
    </div>
  );
}
