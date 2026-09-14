import { site } from "@/content/site";

/**
 * Envoi d’e-mails transactionnels.
 *
 * L’implémentation actuelle journalise le message et s’arrête là. Pour brancher
 * un vrai fournisseur (Resend, SendGrid, Postmark…), écrire un objet qui
 * respecte `Mailer` et le renvoyer depuis `getMailer()` : rien d’autre ne bouge
 * dans l’application.
 */

export type MailMessage = {
  to: string;
  subject: string;
  text: string;
  /** Pièces jointes — l’invitation `.ics` de la réservation, par exemple. */
  attachments?: { filename: string; content: string; contentType: string }[];
};

export interface Mailer {
  send(message: MailMessage): Promise<void>;
}

class ConsoleMailer implements Mailer {
  async send(message: MailMessage): Promise<void> {
    console.info(
      [
        "[mailer] e-mail simulé (aucun envoi réel)",
        `  à       : ${message.to}`,
        `  objet   : ${message.subject}`,
        message.attachments?.length
          ? `  pièces  : ${message.attachments.map((a) => a.filename).join(", ")}`
          : null,
        "  corps   :",
        message.text
          .split("\n")
          .map((line) => `    ${line}`)
          .join("\n"),
      ]
        .filter(Boolean)
        .join("\n"),
    );
  }
}

const mailer: Mailer = new ConsoleMailer();

export function getMailer(): Mailer {
  return mailer;
}

/** Adresse qui reçoit les demandes du site. */
export const INBOX = site.email;
