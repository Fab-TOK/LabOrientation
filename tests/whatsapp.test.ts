import { describe, expect, it } from "vitest";
import { followUpMessage, introMessage, whatsappHref } from "@/content/whatsapp";

describe("lien WhatsApp", () => {
  it("encode le message dans `?text=`, sans jamais afficher le numéro ailleurs", () => {
    const message = "Bonjour Johana, je suis Awa & co. 100 % motivée ?";
    const href = whatsappHref(message);

    expect(href.startsWith("https://wa.me/22997275797?text=")).toBe(true);
    expect(new URL(href).searchParams.get("text")).toBe(message);
    expect(href).not.toContain(" ");
  });
});

describe("messages déjà rédigés", () => {
  it("colonne de la page Contact : message général", () => {
    expect(introMessage()).toBe(
      "Bonjour Johana, je vous écris depuis le site Lab’Orientation. J’aimerais en savoir plus sur vos accompagnements.",
    );
  });

  it("colonne de la page Contact : nomme l’offre d’où vient le visiteur", () => {
    expect(introMessage("Cap sur soi")).toBe(
      "Bonjour Johana, je vous écris depuis le site Lab’Orientation. J’aimerais en savoir plus sur Cap sur soi.",
    );
  });

  it("après l’envoi : reprend le nom tel que tapé et l’offre choisie", () => {
    expect(followUpMessage("Awa Diallo", "Cap sur l’Avenir")).toBe(
      "Bonjour Johana, je suis Awa Diallo. Je viens de vous envoyer une demande depuis le site Lab’Orientation au sujet de l’offre Cap sur l’Avenir.",
    );
  });

  it("après l’envoi, sans offre choisie : pas de « au sujet de »", () => {
    expect(followUpMessage("Awa Diallo")).toBe(
      "Bonjour Johana, je suis Awa Diallo. Je viens de vous envoyer une demande depuis le site Lab’Orientation.",
    );
  });
});
