import nodemailer from "nodemailer";
import { site } from "@/content/site";

/**
 * Envoi d’e-mails transactionnels, par le serveur SMTP de Hostinger.
 *
 * Le site se connecte avec la boîte de Johana et envoie sous l’alias
 * `site.senderEmail`. Les quatre variables `SMTP_*` sont dans `.env.local` sur
 * l’ordinateur, et dans les réglages du projet chez Vercel pour le site en
 * ligne. Sans elles, les e-mails sont seulement notés dans le journal ; sur
 * Vercel, c’est une erreur : aucune demande ne doit se perdre en silence.
 */

export type MailMessage = {
  to: string;
  subject: string;
  text: string;
  /** Version mise en page, envoyée avec la version texte dans le même e-mail. */
  html?: string;
  /** Adresse qui reçoit la réponse quand on clique « Répondre ». */
  replyTo?: string;
};

export interface Mailer {
  send(message: MailMessage): Promise<void>;
}

type Env = Record<string, string | undefined>;

export type SmtpConfig = { host: string; port: number; user: string; password: string };

/** La configuration SMTP, ou `null` tant qu’une variable manque (le mot de passe vide compte). */
export function smtpConfig(env: Env): SmtpConfig | null {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD } = env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASSWORD) return null;
  return { host: SMTP_HOST, port: Number(SMTP_PORT) || 465, user: SMTP_USER, password: SMTP_PASSWORD };
}

class SmtpMailer implements Mailer {
  private transport;

  constructor(config: SmtpConfig) {
    this.transport = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      /* SSL d’emblée sur le port 465 ; STARTTLS sur le 587. */
      secure: config.port === 465,
      auth: { user: config.user, pass: config.password },
    });
  }

  async send(message: MailMessage): Promise<void> {
    await this.transport.sendMail({
      from: { name: site.name, address: site.senderEmail },
      to: message.to,
      replyTo: message.replyTo,
      subject: message.subject,
      text: message.text,
      html: message.html,
    });
  }
}

class ConsoleMailer implements Mailer {
  async send(message: MailMessage): Promise<void> {
    console.info(
      [
        "[mailer] e-mail simulé (aucun envoi réel : variables SMTP absentes)",
        `  à       : ${message.to}`,
        message.replyTo ? `  réponse : ${message.replyTo}` : null,
        `  objet   : ${message.subject}`,
        message.html ? "  version : texte + mise en page" : null,
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

class MissingConfigMailer implements Mailer {
  async send(): Promise<void> {
    throw new Error(
      "Envoi d’e-mails impossible : SMTP_HOST, SMTP_USER ou SMTP_PASSWORD manque dans les réglages du projet Vercel.",
    );
  }
}

export function createMailer(env: Env): Mailer {
  const config = smtpConfig(env);
  if (config) return new SmtpMailer(config);
  return env.VERCEL ? new MissingConfigMailer() : new ConsoleMailer();
}

let mailer: Mailer | undefined;

export function getMailer(): Mailer {
  mailer ??= createMailer(process.env);
  return mailer;
}

/** Adresse qui reçoit les demandes du site. */
export const INBOX = site.email;
