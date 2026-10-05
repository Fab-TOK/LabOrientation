import { parsePhoneNumber } from "libphonenumber-js";
import { contactTypeLabels, levelLabels } from "@/content/form-options";
import { formulaLabel, UNDECIDED_FORMULA_LABEL } from "@/content/formulas";
import { site, siteUrl } from "@/content/site";
import { followUpMessage, whatsappHref } from "@/content/whatsapp";
import type { ContactInput } from "@/lib/validation";
import {
  block,
  button,
  color,
  detailRows,
  emailLayout,
  escapeHtml,
  multiline,
  sans,
  sectionLabel,
  serif,
} from "./layout";

/**
 * Les deux e-mails du formulaire de contact, chacun en version mise en page
 * et en version texte : l’une s’affiche, l’autre sert aux messageries qui
 * n’affichent pas le HTML, et leur présence conjointe rassure les filtres.
 */

export type EmailContent = { subject: string; text: string; html: string };

const siteHost = new URL(siteUrl).hostname.replace(/^www\./, "");

const beninTime = new Intl.DateTimeFormat("fr-FR", {
  dateStyle: "full",
  timeStyle: "short",
  timeZone: "Africa/Porto-Novo",
});

/** « lundi 5 octobre 2026 à 18 h 56 », à l’heure du Bénin, où travaille Johana. */
export const receivedAtLabel = (date: Date) =>
  beninTime.format(date).replace(/(\d{1,2}):(\d{2})/, (_, hours: string, minutes: string) => `${Number(hours)} h ${minutes}`);

function describe(data: ContactInput) {
  const phone = parsePhoneNumber(data.whatsapp);
  return {
    who: contactTypeLabels[data.contactType],
    level: data.level ? levelLabels[data.level] : "Non renseignée",
    offer: formulaLabel(data.formula) ?? UNDECIDED_FORMULA_LABEL,
    /* « +229 0197275797 » : l’indicatif, puis le numéro d’un seul bloc, au goût de Johana. */
    whatsapp: `+${phone.countryCallingCode} ${phone.nationalNumber}`,
    /* wa.me attend le numéro international sans « + » : ouvre une conversation avec le visiteur. */
    whatsappLink: `https://wa.me/${data.whatsapp.replace(/\D/g, "")}`,
  };
}

/** L’e-mail reçu par Johana : qui a écrit, comment le joindre, ce qu’il a répondu. */
export function requestNotification(data: ContactInput, receivedAt = new Date()): EmailContent {
  const { who, level, offer, whatsapp, whatsappLink } = describe(data);
  const name = escapeHtml(data.name);
  const when = receivedAtLabel(receivedAt);
  const subject = `Nouvelle demande de contact : ${data.name}`;
  const footer = `Ces informations ont été saisies par le visiteur dans le formulaire « Prenons contact » de ${siteHost}. Pour lui répondre, répondez simplement à cet e-mail.`;

  /* Sans message, pas de rubrique : les boutons suivent directement la fiche. */
  const message = data.message
    ? block(
        `${sectionLabel("Son message")}<div style="border-left:3px solid ${color.peach};padding:4px 0 4px 16px;font-family:${serif};font-size:16px;line-height:1.55;font-style:italic;color:${color.slate}">« ${multiline(data.message)} »</div>`,
        "12px 28px 0",
      )
    : "";

  const html = emailLayout({
    title: subject,
    preheader: `${data.name} (${who.toLowerCase()}) a rempli le formulaire de contact du site.`,
    badge: "Nouvelle demande",
    body: [
      block(
        `<h1 style="margin:0;font-family:${serif};font-size:25px;line-height:1.25;font-weight:normal;color:${color.slate}">${name} vous a écrit depuis le site</h1>
<p style="margin:6px 0 0;font-family:${sans};font-size:14px;color:${color.muted}">${escapeHtml(who)} · ${escapeHtml(when)}</p>`,
        "26px 28px 0",
      ),
      block(
        `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#ffffff;border:1px solid ${color.border};border-radius:12px">
<tr><td style="padding:4px 18px 12px">
${sectionLabel("Ses coordonnées")}
${detailRows([
  ["Nom et prénom", `<strong>${name}</strong>`],
  ["WhatsApp", escapeHtml(whatsapp)],
  ["E-mail", `<a href="mailto:${escapeHtml(data.email)}" style="color:${color.slate};text-decoration:none">${escapeHtml(data.email)}</a>`],
])}
${sectionLabel("Sa situation")}
${detailRows([
  ["Qui écrit", escapeHtml(who)],
  ["Classe ou situation", escapeHtml(level)],
  ["Offre qui l’intéresse", escapeHtml(offer)],
])}
</td></tr></table>`,
        "18px 28px 0",
      ),
      message,
      /* Les boutons de réponse viennent après ce que le visiteur a écrit. */
      block(
        `${button(whatsappLink, "Répondre sur WhatsApp", "terracotta")}${button(`mailto:${data.email}`, "Répondre par e-mail", "outline")}`,
        "22px 28px 0",
      ),
    ].join("\n"),
    footer: escapeHtml(footer),
  });

  const text = [
    `Nouvelle demande de contact depuis le site ${siteHost}`,
    `${data.name} vous a écrit le ${when}.`,
    "",
    "SES COORDONNÉES",
    `Nom et prénom : ${data.name}`,
    `WhatsApp : ${whatsapp} (${whatsappLink})`,
    `E-mail : ${data.email}`,
    "",
    "SA SITUATION",
    `Qui écrit : ${who}`,
    `Classe ou situation : ${level}`,
    `Offre qui l’intéresse : ${offer}`,
    "",
    "SON MESSAGE",
    data.message || "Pas de message.",
    "",
    "—",
    footer,
  ].join("\n");

  return { subject, text, html };
}

/** L’accusé de réception du visiteur, sur le modèle de l’écran de confirmation du site. */
export function requestConfirmation(data: ContactInput): EmailContent {
  const { who, offer } = describe(data);
  const whatsapp = whatsappHref(followUpMessage(data.name, formulaLabel(data.formula)));
  const subject = `Votre demande a bien été reçue · ${site.name}`;
  const delay = `Johana vous recontacte sous ${site.responseDelay}, par téléphone ou par e-mail, pour convenir de votre entretien préalable gratuit de ${site.freeSessionMinutes} minutes, sans engagement.`;
  const footer = `Vous recevez cet e-mail parce que vous avez rempli le formulaire de contact sur ${siteHost}. Si ce n’est pas vous, ignorez simplement ce message.`;
  const paragraph = `margin:0;font-family:${sans};font-size:15.5px;line-height:1.65;color:${color.slate}`;

  const html = emailLayout({
    title: subject,
    preheader: `Johana vous recontacte sous ${site.responseDelay} pour convenir de votre entretien gratuit.`,
    body: [
      block(
        `<table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
<td width="40" height="40" align="center" style="width:40px;height:40px;border-radius:20px;background:${color.turquoise};font-family:${sans};font-size:21px;font-weight:bold;line-height:40px;color:#ffffff">&#10003;</td>
<td style="padding-left:14px;vertical-align:middle"><h1 style="margin:0;font-family:${serif};font-size:26px;line-height:1.25;font-weight:normal;color:${color.slate}">Merci, votre demande est bien arrivée</h1></td>
</tr></table>
<p style="${paragraph};padding-top:16px">Bonjour ${escapeHtml(data.name)},</p>
<p style="${paragraph};padding-top:10px">${escapeHtml(delay).replace(escapeHtml(site.responseDelay), `<strong>${escapeHtml(site.responseDelay)}</strong>`)}</p>`,
        "28px 28px 0",
      ),
      block(
        `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${color.sand};border-radius:12px">
<tr><td style="padding:4px 18px 10px">
${sectionLabel("Votre demande", color.sandLabel)}
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="font-family:${sans};font-size:14.5px;color:${color.slate}">
<tr><td style="padding:7px 0;color:${color.muted}">Vous êtes</td><td align="right" style="padding:7px 0">${escapeHtml(who)}</td></tr>
<tr><td style="padding:7px 0;border-top:1px solid ${color.sandLine};color:${color.muted}">Offre</td><td align="right" style="padding:7px 0;border-top:1px solid ${color.sandLine}">${escapeHtml(offer)}</td></tr>
</table>
</td></tr></table>`,
      ),
      block(
        `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${color.slate};border-radius:12px">
<tr><td style="padding:20px 22px 12px">
<p style="margin:0;font-family:${serif};font-size:19px;color:${color.peach}">Pour aller plus vite</p>
<p style="margin:0;padding:6px 0 14px;font-family:${sans};font-size:14.5px;line-height:1.6;color:#e3e8eb">Vous pouvez aussi prévenir Johana sur WhatsApp : le message est déjà rédigé.</p>
${button(whatsapp, "Écrire à Johana sur WhatsApp", "peach")}
</td></tr></table>`,
      ),
      block(
        `<p style="margin:0;font-family:${sans};font-size:15px;line-height:1.6;color:${color.slate}">À très bientôt,<br>
<span style="font-family:${serif};font-size:17px">${escapeHtml(site.founder)}</span></p>`,
        "22px 28px 0",
      ),
    ].join("\n"),
    footer: escapeHtml(footer),
  });

  const text = [
    "Merci, votre demande est bien arrivée",
    "",
    `Bonjour ${data.name},`,
    "",
    delay,
    "",
    "VOTRE DEMANDE",
    `Vous êtes : ${who}`,
    `Offre : ${offer}`,
    "",
    "Pour aller plus vite, vous pouvez aussi prévenir Johana sur WhatsApp, le message est déjà rédigé :",
    whatsapp,
    "",
    "À très bientôt,",
    site.founder,
    "",
    "—",
    footer,
  ].join("\n");

  return { subject, text, html };
}
