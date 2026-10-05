import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { afterEach, describe, expect, it } from "vitest";
import { PricingToggle } from "@/components/offres/PricingToggle";

/** Texte d’un élément, espaces insécables ramenés à des espaces simples. */
const text = (element: Element | null) => element?.textContent?.replace(/\s+/g, " ").trim();

describe("PricingToggle", () => {
  /* Vitest tourne sans globals : le nettoyage automatique ne s’accroche pas. */
  afterEach(cleanup);

  it("affiche les tarifs du Bénin dès le HTML, avant tout script", () => {
    const html = renderToString(<PricingToggle />).replace(/ |&nbsp;/g, " ");
    /* Les montants des autres zones sont aussi présents, invisibles, pour
       réserver la largeur : seul compte le montant visible. */
    expect(html).toMatch(/data-testid="price-session"[^>]*>30 000/);
    expect(html).toMatch(/data-testid="price-parcours"[^>]*>45 000/);
  });

  it("sélectionne le Bénin par défaut", () => {
    render(<PricingToggle />);
    expect(screen.getByRole("radio", { name: "Bénin" }).getAttribute("aria-checked")).toBe("true");
    expect(screen.getByRole("radio", { name: "International" }).getAttribute("aria-checked")).toBe(
      "false",
    );
    expect(text(screen.getByTestId("price-session"))).toBe("30 000 FCFA");
    expect(text(screen.getByTestId("price-parcours"))).toBe("45 000 FCFA");
  });

  it("bascule vers les tarifs internationaux, et revient", () => {
    render(<PricingToggle />);

    fireEvent.click(screen.getByRole("radio", { name: "International" }));
    expect(screen.getByRole("radio", { name: "International" }).getAttribute("aria-checked")).toBe(
      "true",
    );
    expect(text(screen.getByTestId("price-session"))).toBe("80 €");
    expect(text(screen.getByTestId("price-parcours"))).toBe("140 €");

    fireEvent.click(screen.getByRole("radio", { name: "Bénin" }));
    expect(text(screen.getByTestId("price-session"))).toBe("30 000 FCFA");
  });

  it("se pilote au clavier avec les flèches, comme un groupe de boutons radio", () => {
    render(<PricingToggle />);
    const benin = screen.getByRole("radio", { name: "Bénin" });

    fireEvent.keyDown(benin, { key: "ArrowRight" });
    const international = screen.getByRole("radio", { name: "International" });
    expect(international.getAttribute("aria-checked")).toBe("true");
    expect(document.activeElement).toBe(international);
    /* Un seul arrêt de tabulation dans le groupe : celui de l’option choisie. */
    expect(benin.getAttribute("tabindex")).toBe("-1");
    expect(international.getAttribute("tabindex")).toBe("0");
  });
});
