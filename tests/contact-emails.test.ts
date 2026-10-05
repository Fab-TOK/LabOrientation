import { describe, expect, it } from "vitest";
import { followUpMessage } from "@/content/whatsapp";
import { receivedAtLabel, requestConfirmation, requestNotification } from "@/lib/emails/contact-emails";
import { escapeHtml } from "@/lib/emails/layout";
import type { ContactInput } from "@/lib/validation";

const request: ContactInput = {
  contactType: "parent",
  name: "Awa Koffi",
  whatsapp: "+2290197275797",
  email: "awa@exemple.com",
  level: "2nde",
  formula: "cap-sur-soi",
  message: "Mon fils hésite entre plusieurs spécialités.\nNous aimerions en parler.",
};

/* 17 h 56 UTC : 18 h 56 au Bénin. */
const receivedAt = new Date("2026-10-05T17:56:00Z");

describe("escapeHtml", () => {
  it("neutralise les caractères du HTML", () => {
    expect(escapeHtml(`<b>"Awa" & l'autre</b>`)).toBe(
      "&lt;b&gt;&quot;Awa&quot; &amp; l&#39;autre&lt;/b&gt;",
    );
  });
});

describe("receivedAtLabel", () => {
  it("donne la date et l’heure du Bénin, en toutes lettres", () => {
    expect(receivedAtLabel(receivedAt)).toBe("lundi 5 octobre 2026 à 18 h 56");
    expect(receivedAtLabel(new Date("2026-10-05T08:05:00Z"))).toBe("lundi 5 octobre 2026 à 9 h 05");
  });
});

describe("requestNotification, l’e-mail reçu par Johana", () => {
  const email = requestNotification(request, receivedAt);

  it("annonce clairement une demande venue du formulaire", () => {
    expect(email.subject).toBe("Nouvelle demande de contact : Awa Koffi");
    expect(email.html).toContain("Awa Koffi vous a écrit depuis le site");
    expect(email.html).toContain("Un parent · lundi 5 octobre 2026 à 18 h 56");
    expect(email.html).toContain("formulaire « Prenons contact »");
  });

  it("propose de répondre sur WhatsApp au numéro du visiteur, ou par e-mail", () => {
    expect(email.html).toContain('href="https://wa.me/2290197275797"');
    expect(email.html).toContain('href="mailto:awa@exemple.com"');
  });

  it("range les réponses : coordonnées, situation, message", () => {
    for (const value of ["+229 0197275797", "2ⁿᵈᵉ", "Cap sur soi", "Ses coordonnées", "Sa situation", "Son message"]) {
      expect(email.html).toContain(value);
    }
    expect(email.html).toContain("Mon fils hésite entre plusieurs spécialités.<br>Nous aimerions en parler.");
  });

  it("écrit le numéro « +indicatif numéro », d’un seul bloc", () => {
    expect(requestNotification({ ...request, whatsapp: "+22997275797" }, receivedAt).text).toContain(
      "WhatsApp : +229 97275797",
    );
    expect(requestNotification({ ...request, whatsapp: "+33612345678" }, receivedAt).html).toContain(
      "+33 612345678",
    );
  });

  it("neutralise ce que tape le visiteur", () => {
    const hostile = requestNotification(
      { ...request, name: "Awa <b>Koffi</b>", message: "<script>alert(1)</script>" },
      receivedAt,
    );
    expect(hostile.html).not.toContain("<b>Koffi</b>");
    expect(hostile.html).not.toContain("<script>");
    expect(hostile.html).toContain("Awa &lt;b&gt;Koffi&lt;/b&gt;");
  });

  it("masque la rubrique « Son message » quand il n’y en a pas", () => {
    const bare = requestNotification({ ...request, message: "", level: "", formula: "" }, receivedAt);
    expect(bare.html).not.toContain("Son message");
    expect(bare.text).toContain("Pas de message.");
    expect(bare.html).toContain("Non renseignée");
    expect(bare.html).toContain("Je ne sais pas encore");
  });

  it("place les boutons de réponse après les réponses du visiteur", () => {
    const message = email.html.indexOf("Nous aimerions en parler.");
    expect(message).toBeGreaterThan(0);
    expect(email.html.indexOf("Répondre sur WhatsApp")).toBeGreaterThan(message);
    expect(email.html.indexOf("Répondre par e-mail")).toBeGreaterThan(message);
  });

  it("affiche l’adresse e-mail du visiteur dans la couleur du texte", () => {
    expect(email.html).toMatch(/<a href="mailto:awa@exemple.com" style="color:#2f4858;/);
    expect(email.html).not.toContain("#1f7f7d");
  });

  it("a une version texte complète", () => {
    for (const line of [
      "Nom et prénom : Awa Koffi",
      "WhatsApp : +229 0197275797",
      "E-mail : awa@exemple.com",
      "Qui écrit : Un parent",
      "Classe ou situation : 2ⁿᵈᵉ",
      "Offre qui l’intéresse : Cap sur soi",
      "Mon fils hésite entre plusieurs spécialités.",
    ]) {
      expect(email.text).toContain(line);
    }
  });
});

describe("requestConfirmation, l’e-mail reçu par le visiteur", () => {
  const email = requestConfirmation(request);

  it("confirme la demande et annonce le délai", () => {
    expect(email.subject).toBe("Votre demande a bien été reçue · Lab’Orientation");
    expect(email.html).toContain("Merci, votre demande est bien arrivée");
    expect(email.html).toContain("Bonjour Awa Koffi,");
    expect(email.html).toContain("48h ouvrées");
    expect(email.html).toContain("Cap sur soi");
  });

  it("propose WhatsApp avec le message déjà rédigé", () => {
    const encoded = encodeURIComponent(followUpMessage("Awa Koffi", "Cap sur soi"));
    expect(email.html).toContain(encoded);
    expect(email.text).toContain(encoded);
  });

  it("signe du seul nom de Johana, sans la devise", () => {
    expect(email.html).toContain("Johana Ghionda");
    expect(email.html).not.toContain("Explorer. Comprendre. Choisir.");
    expect(email.text).not.toContain("Explorer. Comprendre. Choisir.");
  });

  it("explique pourquoi on reçoit cet e-mail", () => {
    expect(email.html).toContain("Vous recevez cet e-mail parce que vous avez rempli le formulaire de contact");
    expect(email.text).toContain("Vous recevez cet e-mail parce que vous avez rempli le formulaire de contact");
  });
});
