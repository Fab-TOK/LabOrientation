import { describe, expect, it } from "vitest";
import {
  contactFormulaOptions,
  homeParcours,
  isValidFormulaChoice,
  offerFamilies,
  offers,
  recap,
  type AudienceLabel,
} from "@/content/formulas";

/** « 3ᵉ et 2ⁿᵈᵉ » à plat : « 3e et 2nde ». */
const flat = (label: AudienceLabel) =>
  label.map((part) => (typeof part === "string" ? part : part.sup)).join("");

const bySlug = (slug: string) => {
  const offer = offers.find((entry) => entry.slug === slug);
  if (!offer) throw new Error(`offre absente : ${slug}`);
  return offer;
};

describe("la gamme", () => {
  it("est rangée en trois familles : parcours, candidatures, modules", () => {
    expect(offerFamilies.map((family) => family.title)).toEqual([
      "Les parcours",
      "Les candidatures",
      "Les modules complémentaires",
    ]);
    expect(offerFamilies.map((family) => family.offers.length)).toEqual([4, 3, 3]);
  });

  it("compte dix offres aux identifiants uniques, sans le module Parcoursup", () => {
    const slugs = offers.map((offer) => offer.slug);
    expect(slugs).toHaveLength(10);
    expect(new Set(slugs).size).toBe(10);
    expect(slugs).not.toContain("module-parcoursup");
  });

  it("reprend les points imposés par la maquette", () => {
    expect(flat(bySlug("cap-sur-soi").audience)).toBe("3e et 2nde");

    const avenir = bySlug("cap-sur-l-avenir");
    expect(avenir.stats[0].value).toBe("6 × 1h");
    expect(avenir.detail?.items).toHaveLength(6);

    const reussite = bySlug("cap-reussite");
    expect(reussite.stats[0].value).toBe("10 × 1h");
    expect(reussite.featured?.composition).toEqual([
      "Cap sur l’Avenir",
      "Parcoursup phase principale",
    ]);

    expect(flat(bySlug("candidatures-hors-de-france").audience)).toBe("Terminale");
  });

  it("garde mot pour mot les trois descriptions de parcours de la cliente", () => {
    expect(bySlug("premiers-pas").description).toMatch(/^Un accompagnement pour aider le jeune/);
    expect(bySlug("cap-sur-soi").description).toMatch(/^Un accompagnement permettant au lycéen/);
    expect(bySlug("cap-sur-l-avenir").description).toMatch(/cohérent avec son profil\.$/);
  });

  it("montre les trois premiers parcours sur l’accueil", () => {
    expect(homeParcours.map((offer) => offer.slug)).toEqual([
      "premiers-pas",
      "cap-sur-soi",
      "cap-sur-l-avenir",
    ]);
  });

  it("récapitule les dix offres en trois groupes", () => {
    expect(recap.groups.map((group) => group.offers.length)).toEqual([4, 3, 3]);
  });

  it("propose les dix offres dans le formulaire de contact", () => {
    expect(contactFormulaOptions).toHaveLength(10);
    for (const option of contactFormulaOptions) {
      expect(isValidFormulaChoice(option.slug), option.slug).toBe(true);
    }
  });
});
