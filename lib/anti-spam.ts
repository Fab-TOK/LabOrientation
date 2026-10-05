/**
 * Anti-robots du formulaire de contact, sans service externe ni rien de
 * visible pour les visiteurs.
 *
 * - Champ piège : caché aux visiteurs, un robot le remplit.
 * - Délai minimal : un humain met plus de 3 secondes à remplir le formulaire.
 *   Le formulaire envoie le temps écoulé depuis son ouverture ; une demande
 *   qui ne l’a pas n’est pas passée par la page.
 *
 * Une demande écartée reçoit la même réponse qu’une demande envoyée : le robot
 * croit avoir réussi et n’a pas de raison de chercher à contourner.
 */

export const HONEYPOT_FIELD = "website";
export const MIN_FILL_MS = 3000;

export function looksLikeBot(payload: unknown): boolean {
  if (!payload || typeof payload !== "object") return true;
  const fields = payload as Record<string, unknown>;

  const honeypot = fields[HONEYPOT_FIELD];
  if (typeof honeypot === "string" && honeypot.trim() !== "") return true;

  const elapsed = fields.elapsedMs;
  return typeof elapsed !== "number" || !Number.isFinite(elapsed) || elapsed < MIN_FILL_MS;
}
