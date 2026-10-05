import { site } from "@/content/site";

/**
 * Enveloppe commune des e-mails du site.
 *
 * HTML en tableaux et styles en ligne : la seule forme que Gmail, Outlook et
 * Apple Mail affichent tous de la même façon. Les polices du site n’y sont pas
 * disponibles : Georgia remplace Newsreader, Helvetica remplace Figtree.
 */

export const color = {
  slate: "#2f4858",
  cream: "#fbf7f0",
  sand: "#f5eee3",
  peach: "#f2c1a0",
  terracotta: "#d65a3a",
  turquoise: "#2bb3b1",
  muted: "#5c6f7c",
  faint: "#8a9aa5",
  line: "#f0ebe2",
  border: "#e8e1d6",
  sandLine: "#e8dccb",
  sandLabel: "#8a7f6e",
} as const;

export const serif = "Georgia, 'Times New Roman', serif";
export const sans = "Helvetica, Arial, sans-serif";

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Texte tapé par le visiteur : neutralisé, retours à la ligne conservés. */
export const multiline = (value: string) => escapeHtml(value).replace(/\r?\n/g, "<br>");

/** Petit intitulé de bloc, en capitales espacées. */
export const sectionLabel = (text: string, tone: string = color.faint) =>
  `<p style="margin:0;padding:14px 0 6px;font-family:${sans};font-size:11px;font-weight:bold;letter-spacing:0.1em;text-transform:uppercase;color:${tone}">${escapeHtml(text)}</p>`;

/** Lignes « intitulé / valeur », séparées d’un filet. La valeur est déjà du HTML sûr. */
export function detailRows(rows: [label: string, valueHtml: string][]): string {
  const cells = rows
    .map(
      ([label, value]) => `<tr>
  <td class="detail-label" style="padding:9px 12px 9px 0;border-top:1px solid ${color.line};width:42%;vertical-align:top;font-family:${sans};font-size:14.5px;line-height:1.4;color:${color.muted}">${escapeHtml(label)}</td>
  <td class="detail-value" style="padding:9px 0;border-top:1px solid ${color.line};vertical-align:top;font-family:${sans};font-size:14.5px;line-height:1.4;color:${color.slate}">${value}</td>
</tr>`,
    )
    .join("\n");
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${cells}</table>`;
}

type ButtonStyle = "terracotta" | "outline" | "peach";

const buttonStyles: Record<ButtonStyle, { cell: string; text: string }> = {
  terracotta: { cell: `background:${color.terracotta};`, text: "#ffffff" },
  peach: { cell: `background:${color.peach};`, text: color.slate },
  outline: { cell: `border:1.5px solid ${color.slate};`, text: color.slate },
};

/** Bouton en tableau : cliquable sur toute sa surface, y compris dans Outlook. */
export function button(href: string, label: string, style: ButtonStyle): string {
  const { cell, text } = buttonStyles[style];
  /* Le contour de 1,5 px est compté dans la hauteur : même taille que les boutons pleins (mesuré). */
  const padding = style === "outline" ? "11.2px 20px" : "12px 20px";
  /* `vertical-align: middle` : deux boutons côte à côte restent alignés, avec ou sans bordure. */
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="display:inline-table;vertical-align:middle;margin:0 10px 10px 0">
<tr><td style="${cell}border-radius:99px">
<a href="${escapeHtml(href)}" style="display:inline-block;padding:${padding};font-family:${sans};font-size:14px;font-weight:bold;line-height:1.2;color:${text};text-decoration:none;border-radius:99px">${escapeHtml(label)}</a>
</td></tr></table>`;
}

/** Une rangée du corps de l’e-mail, avec ses marges latérales. */
export const block = (html: string, padding = "18px 28px 0") =>
  `<tr><td class="email-px" style="padding:${padding}">${html}</td></tr>`;

/**
 * Téléphone : marges réduites, pastille masquée (le titre dit déjà tout),
 * intitulés au-dessus de leur valeur. Gmail, Apple Mail et Outlook appliquent
 * cette règle ; ailleurs, la version large reste lisible.
 */
const narrowScreen = `@media (max-width: 480px) {
  .email-px { padding-left: 20px !important; padding-right: 20px !important; }
  .email-badge { display: none !important; }
  .detail-label, .detail-value { display: block !important; width: auto !important; }
  .detail-label { padding: 10px 0 2px !important; }
  .detail-value { padding: 0 0 10px !important; border-top: 0 !important; }
}`;

export function emailLayout({
  title,
  preheader,
  badge,
  body,
  footer,
}: {
  title: string;
  /** Ligne d’aperçu affichée sous l’objet, dans la liste des e-mails. */
  preheader: string;
  badge?: string;
  body: string;
  footer: string;
}): string {
  const badgeCell = badge
    ? `<td class="email-badge" align="right" style="vertical-align:middle;padding-left:12px"><span style="display:inline-block;white-space:nowrap;background:${color.peach};color:${color.slate};font-family:${sans};font-size:11px;font-weight:bold;letter-spacing:0.08em;text-transform:uppercase;padding:6px 12px;border-radius:99px">${escapeHtml(badge)}</span></td>`
    : "";

  return `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light">
<meta name="supported-color-schemes" content="light">
<title>${escapeHtml(title)}</title>
<style>${narrowScreen}</style>
</head>
<body style="margin:0;padding:0;background:${color.sand}">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;mso-hide:all">${escapeHtml(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${color.sand}">
<tr><td align="center" style="padding:24px 12px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;background:${color.cream};border-radius:12px;overflow:hidden">
<tr><td class="email-px" style="background:${color.slate};padding:18px 28px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
<td style="vertical-align:middle;font-family:${serif};font-size:20px;letter-spacing:0.5px;color:${color.cream}">${escapeHtml(site.name)}</td>
${badgeCell}
</tr></table>
</td></tr>
${body}
<tr><td class="email-px" style="padding:22px 28px 26px;font-family:${sans};font-size:12.5px;line-height:1.55;color:${color.faint}">${footer}</td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;
}
