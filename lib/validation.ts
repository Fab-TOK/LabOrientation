import { isValidPhoneNumber } from "libphonenumber-js";
import { z } from "zod";
import { levelValues } from "@/content/form-options";
import { isValidFormulaChoice } from "@/content/formulas";

/**
 * Schéma partagé entre le formulaire (validation immédiate côté client) et la
 * route API (validation de confiance côté serveur). Les messages sont rédigés
 * en français : ils s’affichent tels quels sous les champs.
 */

/**
 * Ni lien ni adresse : le nom est recopié dans l’accusé de réception, qui
 * part vers l’adresse tapée. Un robot s’en servirait pour expédier sa
 * publicité depuis le domaine du site.
 */
const requiredName = z
  .string()
  .trim()
  .min(2, "Indiquez votre nom et prénom.")
  .max(120, "Ce nom est trop long.")
  .refine((value) => !/http|www\.|@/i.test(value), "Indiquez seulement votre nom et prénom.");

const requiredEmail = z
  .string()
  .trim()
  .min(1, "Indiquez une adresse e-mail.")
  .email("Cette adresse e-mail ne semble pas valide.")
  .max(180, "Cette adresse est trop longue.");

/**
 * Numéro WhatsApp au format international (`+2290197275797`), tel que le
 * produit le champ à indicatif. libphonenumber-js vérifie qu’il existe pour
 * son pays : longueur, préfixes.
 *
 * Sauf au Bénin : passé à 10 chiffres en 2024, mais bien des comptes WhatsApp
 * gardent l’ancien numéro à 8 chiffres. Les deux longueurs sont acceptées,
 * quels que soient les premiers chiffres.
 */
const BENIN_WHATSAPP = /^\+229(\d{8}|\d{10})$/;

const requiredWhatsapp = z
  .string()
  .trim()
  .superRefine((value, context) => {
    if (value === "" || /^\+\d{1,3}$/.test(value)) {
      context.addIssue({ code: "custom", message: "Indiquez votre numéro WhatsApp." });
    } else if (value.startsWith("+229")) {
      if (!BENIN_WHATSAPP.test(value)) {
        context.addIssue({
          code: "custom",
          message: "Au Bénin, un numéro WhatsApp a 8 ou 10 chiffres.",
        });
      }
    } else if (!isValidPhoneNumber(value)) {
      context.addIssue({
        code: "custom",
        message: "Ce numéro ne semble pas valide pour le pays choisi.",
      });
    }
  });

const optional = (schema: z.ZodString) => schema.optional().or(z.literal(""));

export const contactSchema = z.object({
  contactType: z.enum(["eleve", "parent", "institution"], {
    message: "Dites-nous qui vous êtes.",
  }),
  name: requiredName,
  whatsapp: requiredWhatsapp,
  email: requiredEmail,
  level: optional(
    z.string().refine((value) => (levelValues as string[]).includes(value), {
      message: "Choisissez une classe ou une situation dans la liste.",
    }),
  ),
  formula: optional(
    z.string().trim().refine(isValidFormulaChoice, "Choisissez une offre dans la liste."),
  ),
  message: optional(z.string().trim().max(4000, "Ce message est trop long.")),
});

export type ContactInput = z.infer<typeof contactSchema>;

/** Aplatit les erreurs Zod en `{ champ: message }`, prêt à afficher. */
export function fieldErrors(error: z.ZodError): Record<string, string> {
  const result: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path[0];
    if (typeof key === "string" && !result[key]) result[key] = issue.message;
  }
  return result;
}
