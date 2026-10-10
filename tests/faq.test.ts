import { describe, expect, it } from "vitest";
import { faqSections } from "@/content/faq";
import { fromPrice, site } from "@/content/site";

const answerOf = (id: string) => {
  const item = faqSections.flatMap((section) => section.items).find((entry) => entry.id === id);
  if (!item?.answer) throw new Error(`réponse absente : ${id}`);
  return item.answer;
};

describe("la FAQ", () => {
  it("annonce sur le coût les tarifs affichés, séance et parcours de chaque zone", () => {
    const answer = answerOf("cout-accompagnement");
    for (const zone of site.pricing.zones) {
      expect(answer).toContain(fromPrice(zone.session));
      expect(answer).toContain(fromPrice(zone.parcours));
    }
  });

  it("ne promet plus d’envoyer les tarifs après l’entretien", () => {
    expect(answerOf("cout-accompagnement")).not.toContain("seront envoyés");
  });
});
