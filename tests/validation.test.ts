import { describe, expect, it } from "vitest";
import { bookingSchema, contactSchema, fieldErrors } from "@/lib/validation";

const validContact = {
  contactType: "parent",
  level: "2nde",
  formula: "cap-sur-soi",
  format: "visio",
  message: "Mon fils hésite entre plusieurs spécialités.",
  name: "Awa Koffi",
  youngName: "",
  phone: "+229 97 27 57 97",
  email: "awa@exemple.com",
  country: "BJ",
};

const validBooking = {
  date: "2026-10-13",
  slot: "14:00",
  participant: "parent",
  name: "Awa Koffi",
  youngName: "",
  email: "awa@exemple.com",
  phone: "",
  level: "2nde",
  format: "visio",
  situation: "",
  consent: true,
};

describe("contactSchema", () => {
  it("accepte une demande complète", () => {
    expect(contactSchema.safeParse(validContact).success).toBe(true);
  });

  it("accepte une demande minimale", () => {
    const minimal = { contactType: "eleve", name: "Awa Koffi", email: "awa@exemple.com" };
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

  it("refuse une adresse e-mail mal formée", () => {
    for (const email of ["", "awa", "awa@", "awa@exemple", "awa exemple.com"]) {
      const result = contactSchema.safeParse({ ...validContact, email });
      expect(result.success, `« ${email} » devrait être refusée`).toBe(false);
    }
  });

  it("accepte un téléphone international, avec ou sans séparateurs", () => {
    for (const phone of ["+229 97 27 57 97", "+33612345678", "0033-6-12-34-56-78", ""]) {
      const result = contactSchema.safeParse({ ...validContact, phone });
      expect(result.success, `« ${phone} » devrait être acceptée`).toBe(true);
    }
  });

  it("refuse un téléphone trop court ou alphabétique", () => {
    for (const phone of ["12345", "appelez-moi"]) {
      const result = contactSchema.safeParse({ ...validContact, phone });
      expect(result.success, `« ${phone} » devrait être refusée`).toBe(false);
    }
  });

  it("refuse une formule inconnue mais accepte « je ne sais pas encore »", () => {
    expect(contactSchema.safeParse({ ...validContact, formula: "formule-inventee" }).success).toBe(
      false,
    );
    expect(
      contactSchema.safeParse({ ...validContact, formula: "je-ne-sais-pas-encore" }).success,
    ).toBe(true);
    expect(
      contactSchema.safeParse({ ...validContact, formula: "module-parcoursup" }).success,
    ).toBe(true);
  });

  it("refuse les formules retirées de la gamme", () => {
    for (const slug of [
      "ateliers-collectifs",
      "bilan-d-orientation",
      "parcours-complet",
      "formation-aux-professionnels",
      "premier-pas",
    ]) {
      const result = contactSchema.safeParse({ ...validContact, formula: slug });
      expect(result.success, `« ${slug} » ne devrait plus être accepté`).toBe(false);
    }
  });

  it("refuse un pays hors liste", () => {
    expect(contactSchema.safeParse({ ...validContact, country: "ZZ" }).success).toBe(false);
  });
});

describe("bookingSchema", () => {
  it("accepte une réservation complète", () => {
    expect(bookingSchema.safeParse(validBooking).success).toBe(true);
  });

  it("exige une date au format ISO", () => {
    for (const date of ["", "13/10/2026", "2026-10"]) {
      expect(bookingSchema.safeParse({ ...validBooking, date }).success).toBe(false);
    }
  });

  it("exige un créneau au format HH:MM", () => {
    for (const slot of ["", "14h", "9:00"]) {
      expect(bookingSchema.safeParse({ ...validBooking, slot }).success).toBe(false);
    }
  });

  it("exige le consentement", () => {
    const result = bookingSchema.safeParse({ ...validBooking, consent: false });
    expect(result.success).toBe(false);
    if (!result.success) expect(fieldErrors(result.error).consent).toBeTruthy();
  });
});

describe("fieldErrors", () => {
  it("ne garde qu’un message par champ", () => {
    const result = contactSchema.safeParse({ contactType: "", name: "", email: "" });
    expect(result.success).toBe(false);
    if (result.success) return;

    const errors = fieldErrors(result.error);
    expect(Object.keys(errors).sort()).toEqual(["contactType", "email", "name"]);
    expect(Object.values(errors).every((message) => typeof message === "string")).toBe(true);
  });
});
