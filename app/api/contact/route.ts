import { NextResponse } from "next/server";
import { looksLikeBot } from "@/lib/anti-spam";
import { requestConfirmation, requestNotification } from "@/lib/emails/contact-emails";
import { getMailer, INBOX } from "@/lib/mailer";
import { contactSchema, fieldErrors } from "@/lib/validation";

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Requête illisible." }, { status: 400 });
  }

  /* Même réponse qu’un envoi réussi : le robot n’apprend rien. */
  if (looksLikeBot(payload)) {
    console.info("[contact] demande écartée par l’anti-robots");
    return NextResponse.json({ ok: true });
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ errors: fieldErrors(parsed.error) }, { status: 422 });
  }

  const data = parsed.data;

  /* L’essentiel : sans cet e-mail, la demande est perdue, le visiteur doit le savoir.
     « Répondre » écrit directement au visiteur. */
  try {
    await getMailer().send({ to: INBOX, replyTo: data.email, ...requestNotification(data) });
  } catch (error) {
    console.error("[contact] e-mail à Johana non envoyé :", error);
    return NextResponse.json({ error: "L’envoi a échoué." }, { status: 502 });
  }

  /* Accessoire : Johana a la demande, une adresse fausse ne doit pas faire croire à un échec.
     Pas d’adresse de réponse distincte de l’expéditeur, signal d’arnaque pour les
     filtres : les réponses vont à contact@, alias de la boîte de Johana. */
  try {
    await getMailer().send({ to: data.email, ...requestConfirmation(data) });
  } catch (error) {
    console.error("[contact] accusé de réception non envoyé :", error);
  }

  return NextResponse.json({ ok: true });
}
