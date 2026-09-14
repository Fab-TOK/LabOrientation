import { z } from "zod";
import { isValidCountry } from "@/content/countries";
import { isValidFormulaChoice } from "@/content/formulas";

/**
 * Schémas partagés entre le formulaire (validation immédiate côté client) et
 * les routes API (validation de confiance côté serveur). Les messages sont
 * rédigés en français : ils s’affichent tels quels sous les champs.
 */

/** Format international tolérant : +, espaces, points, tirets, parenthèses. */
const PHONE = /^\+?[0-9][0-9 .\-()]{7,19}$/;

const requiredName = z
  .string()
  .trim()
  .min(2, "Indiquez votre nom et prénom.")
  .max(120, "Ce nom est trop long.");

const requiredEmail = z
  .string()
  .trim()
  .min(1, "Indiquez une adresse e-mail.")
  .email("Cette adresse e-mail ne semble pas valide.")
  .max(180, "Cette adresse est trop longue.");

const optionalPhone = z
  .string()
  .trim()
  .max(24, "Ce numéro est trop long.")
  .refine((value) => value === "" || PHONE.test(value), {
    message: "Indiquez un numéro au format international, par exemple +229 97 27 57 97.",
  })
  .optional()
  .or(z.literal(""));

const optionalCountry = z
  .string()
  .trim()
  .refine((value) => value === "" || isValidCountry(value), "Choisissez un pays dans la liste.")
  .optional()
  .or(z.literal(""));

export const contactSchema = z.object({
  contactType: z.enum(["eleve", "parent", "institution"], {
    message: "Dites-nous qui nous contacte.",
  }),
  level: z.string().trim().max(40).optional().or(z.literal("")),
  formula: z
    .string()
    .trim()
    .refine(
      (value) => value === "" || isValidFormulaChoice(value),
      "Choisissez un accompagnement dans la liste.",
    )
    .optional()
    .or(z.literal("")),
  format: z.enum(["presentiel", "visio", "indecis"]).optional().or(z.literal("")),
  message: z.string().trim().max(4000, "Ce message est trop long.").optional().or(z.literal("")),
  name: requiredName,
  youngName: z.string().trim().max(120).optional().or(z.literal("")),
  phone: optionalPhone,
  email: requiredEmail,
  country: optionalCountry,
});

export type ContactInput = z.infer<typeof contactSchema>;

export const bookingSchema = z.object({
  /** Jour retenu, au format ISO `AAAA-MM-JJ`. */
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Choisissez une date."),
  /** Créneau retenu, au format `HH:MM`. */
  slot: z.string().regex(/^\d{2}:\d{2}$/, "Choisissez un créneau horaire."),
  participant: z.enum(["eleve", "parent", "institution"], {
    message: "Dites-nous qui participera à l’échange.",
  }),
  name: requiredName,
  youngName: z.string().trim().max(120).optional().or(z.literal("")),
  email: requiredEmail,
  phone: optionalPhone,
  level: z.string().trim().max(40).optional().or(z.literal("")),
  format: z.enum(["presentiel", "visio", "indecis"]).optional().or(z.literal("")),
  situation: z.string().trim().max(4000, "Ce message est trop long.").optional().or(z.literal("")),
  consent: z.literal(true, {
    message: "Merci de confirmer votre accord pour être recontacté(e).",
  }),
});

export type BookingInput = z.infer<typeof bookingSchema>;

/** Aplatit les erreurs Zod en `{ champ: message }`, prêt à afficher. */
export function fieldErrors(error: z.ZodError): Record<string, string> {
  const result: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path[0];
    if (typeof key === "string" && !result[key]) result[key] = issue.message;
  }
  return result;
}
