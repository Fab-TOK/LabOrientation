import { NextResponse } from "next/server";
import { countries } from "@/content/countries";
import {
  contactFormulaOptions,
  UNDECIDED_FORMULA,
  UNDECIDED_FORMULA_LABEL,
} from "@/content/formulas";
import { contactTypes, formatLabels, levelLabels } from "@/content/form-options";
import { site } from "@/content/site";
import { getMailer, INBOX } from "@/lib/mailer";
import { contactSchema, fieldErrors } from "@/lib/validation";

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Requête illisible." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ errors: fieldErrors(parsed.error) }, { status: 422 });
  }

  const data = parsed.data;

  await getMailer().send({
    to: INBOX,
    subject: `Nouvelle demande : ${data.name}`,
    text: [
      `Qui nous contacte : ${label(contactTypes, data.contactType)}`,
      `Niveau du jeune : ${data.level ? (levelLabels[data.level] ?? data.level) : "non renseigné"}`,
      `Accompagnement : ${formulaLabel(data.formula)}`,
      `Format souhaité : ${data.format ? formatLabels[data.format] : "non renseigné"}`,
      "",
      "Besoin exprimé :",
      data.message || "non renseigné",
      "",
      `Nom : ${data.name}`,
      `Nom du jeune : ${data.youngName || "non renseigné"}`,
      `Téléphone : ${data.phone || "non renseigné"}`,
      `E-mail : ${data.email}`,
      `Pays : ${countryLabel(data.country)}`,
    ].join("\n"),
  });

  await getMailer().send({
    to: data.email,
    subject: `Votre demande a bien été reçue · ${site.name}`,
    text: [
      `Bonjour ${data.name},`,
      "",
      `Merci pour votre message. ${site.name} vous recontactera sous ${site.responseDelay}`,
      "pour convenir de la séance de mise en contact de 30 minutes, offerte et sans engagement.",
      "",
      `Une question d’ici là ? Écrivez sur WhatsApp : ${site.whatsapp}`,
      "",
      site.signature,
    ].join("\n"),
  });

  return NextResponse.json({ ok: true });
}

function label(options: readonly { value: string; label: string }[], value: string) {
  return options.find((option) => option.value === value)?.label ?? value;
}

function formulaLabel(slug: string | undefined) {
  if (!slug) return "non renseigné";
  if (slug === UNDECIDED_FORMULA) return UNDECIDED_FORMULA_LABEL;
  return contactFormulaOptions.find((option) => option.slug === slug)?.label ?? slug;
}

function countryLabel(code: string | undefined) {
  if (!code) return "non renseigné";
  return countries.find((country) => country.code === code)?.name ?? code;
}
