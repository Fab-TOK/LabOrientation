import { describe, expect, it } from "vitest";
import { contactSchema, fieldErrors } from "@/lib/validation";

const validContact = {
  contactType: "parent",
  name: "Awa Koffi",
  whatsapp: "+2290197275797",
  email: "awa@exemple.com",
  level: "2nde",
  formula: "cap-sur-soi",
  message: "Mon fils hésite entre plusieurs spécialités.",
};

describe("contactSchema", () => {
  it("accepte une demande complète", () => {
    expect(contactSchema.safeParse(validContact).success).toBe(true);
  });

  it("accepte une demande minimale : qui, nom, WhatsApp, e-mail", () => {
    const minimal = {
      contactType: "eleve",
      name: "Awa Koffi",
      whatsapp: "+2290197275797",
      email: "awa@exemple.com",
    };
    expect(contactSchema.safeParse(minimal).success).toBe(true);
  });

  it("exige de savoir qui contacte", () => {
    const result = contactSchema.safeParse({ ...validContact, contactType: "" });
    expect(result.success).toBe(false);
    if (!result.success) expect(fieldErrors(result.error).contactType).toBeTruthy();
  });

  it("exige un nom d’au moins deux caractères", () => {
    const result = contactSchema.safeParse({ ...validContact, name: "A" });
    expect(result.success).toBe(false);
    if (!result.success) expect(fieldErrors(result.error).name).toMatch(/nom et prénom/i);
  });

  it("refuse un lien ou une adresse dans le nom, anti-robots", () => {
    for (const name of ["Gagnez http://spam.example", "www.spam.example", "awa@spam.example"]) {
      const result = contactSchema.safeParse({ ...validContact, name });
      expect(result.success, `« ${name} » devrait être refusé`).toBe(false);
      if (!result.success) {
        expect(fieldErrors(result.error).name).toBe("Indiquez seulement votre nom et prénom.");
      }
    }
  });

  it("accepte un nom avec accents, trait d’union et apostrophe", () => {
    for (const name of ["Éloïse N’Guessan-Adjovi", "Jean-Baptiste Hounkpè"]) {
      expect(contactSchema.safeParse({ ...validContact, name }).success, name).toBe(true);
    }
  });

  it("refuse une adresse e-mail mal formée", () => {
    for (const email of ["", "awa", "awa@", "awa@exemple", "awa exemple.com"]) {
      const result = contactSchema.safeParse({ ...validContact, email });
      expect(result.success, `« ${email} » devrait être refusée`).toBe(false);
    }
  });

  describe("numéro WhatsApp", () => {
    it("est obligatoire", () => {
      const result = contactSchema.safeParse({ ...validContact, whatsapp: "" });
      expect(result.success).toBe(false);
      if (!result.success) expect(fieldErrors(result.error).whatsapp).toMatch(/WhatsApp/);
    });

    it("accepte un numéro valable pour son pays", () => {
      for (const whatsapp of [
        "+2290197275797", // Bénin, 10 chiffres
        "+22890123456", // Togo
        "+2250701020304", // Côte d’Ivoire
        "+33612345678", // France
        "+32470123456", // Belgique
      ]) {
        const result = contactSchema.safeParse({ ...validContact, whatsapp });
        expect(result.success, `« ${whatsapp} » devrait être accepté`).toBe(true);
      }
    });

    it("accepte un numéro béninois à 8 ou 10 chiffres, quels que soient les premiers", () => {
      for (const whatsapp of ["+22997275797", "+2290197275797", "+2299727579700"]) {
        const result = contactSchema.safeParse({ ...validContact, whatsapp });
        expect(result.success, `« ${whatsapp} » devrait être accepté`).toBe(true);
      }
    });

    it("refuse un numéro béninois de 7 ou 9 chiffres, en rappelant le format", () => {
      for (const whatsapp of ["+2299727579", "+229972757970"]) {
        const result = contactSchema.safeParse({ ...validContact, whatsapp });
        expect(result.success, `« ${whatsapp} » devrait être refusé`).toBe(false);
        if (!result.success) expect(fieldErrors(result.error).whatsapp).toMatch(/8 ou 10 chiffres/);
      }
    });

    it("refuse un numéro incomplet ou fantaisiste", () => {
      for (const whatsapp of ["+229", "+2291234", "+33123", "appelez-moi"]) {
        const result = contactSchema.safeParse({ ...validContact, whatsapp });
        expect(result.success, `« ${whatsapp} » devrait être refusé`).toBe(false);
      }
    });
  });

  it("accepte les classes de la liste, et rien d’autre", () => {
    for (const level of ["", "4e", "terminale", "etudes-superieures", "vie-active", "autre"]) {
      expect(contactSchema.safeParse({ ...validContact, level }).success, level).toBe(true);
    }
    expect(contactSchema.safeParse({ ...validContact, level: "cm2" }).success).toBe(false);
  });

  it("accepte les dix offres et « je ne sais pas encore », refuse les autres", () => {
    for (const formula of [
      "",
      "je-ne-sais-pas-encore",
      "cap-reussite",
      "parcoursup-phase-principale",
      "module-bilan-d-orientation",
    ]) {
      expect(contactSchema.safeParse({ ...validContact, formula }).success, formula).toBe(true);
    }
    for (const formula of ["formule-inventee", "module-parcoursup", "ateliers-collectifs"]) {
      expect(contactSchema.safeParse({ ...validContact, formula }).success, formula).toBe(false);
    }
  });
});

describe("fieldErrors", () => {
  it("ne garde qu’un message par champ", () => {
    const result = contactSchema.safeParse({ contactType: "", name: "", whatsapp: "", email: "" });
    expect(result.success).toBe(false);
    if (result.success) return;

    const errors = fieldErrors(result.error);
    expect(Object.keys(errors).sort()).toEqual(["contactType", "email", "name", "whatsapp"]);
    expect(Object.values(errors).every((message) => typeof message === "string")).toBe(true);
  });
});
