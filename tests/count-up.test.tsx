import { cleanup, render } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";
import { CountUp } from "@/components/ui/CountUp";

describe("CountUp", () => {
  /* Vitest tourne sans globals : le nettoyage automatique ne s’accroche pas. */
  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("livre la valeur finale dans le HTML, une seule fois", () => {
    const html = renderToString(<CountUp value={1000} />);
    const text = html.replace(/<[^>]+>/g, "");

    // Moteurs, lecteurs d’écran et navigateurs sans JavaScript lisent ce texte.
    expect(text).toBe((1000).toLocaleString("fr-FR"));
    // La largeur réservée passe par un attribut, pas par une copie du texte.
    expect(html).toContain(`data-final="${(1000).toLocaleString("fr-FR")}"`);
  });

  it("affiche la valeur finale d’emblée quand le visiteur demande moins de mouvement", () => {
    vi.stubGlobal("matchMedia", (query: string) => ({ matches: query.includes("reduce") }));
    vi.stubGlobal("IntersectionObserver", class {
      observe() {}
      disconnect() {}
    });

    const { container } = render(<CountUp value={11} />);
    const box = container.querySelector(".count-up") as HTMLElement;

    expect(box.hasAttribute("data-ready")).toBe(true);
    expect(box.textContent).toBe("11");
  });

  it("repart de 0 et attend d’être à l’écran pour compter", () => {
    vi.stubGlobal("matchMedia", () => ({ matches: false }));
    const observed: Element[] = [];
    vi.stubGlobal("IntersectionObserver", class {
      observe(el: Element) {
        observed.push(el);
      }
      disconnect() {}
    });

    const { container } = render(<CountUp value={1000} />);
    const box = container.querySelector(".count-up") as HTMLElement;

    expect(box.hasAttribute("data-ready")).toBe(true);
    expect(box.querySelector("[data-count]")?.textContent).toBe("0");
    expect(observed).toEqual([box]);
  });

  it("compte jusqu’à la valeur une fois à l’écran, en ralentissant vers la fin", () => {
    vi.stubGlobal("matchMedia", () => ({ matches: false }));
    let onSeen: (entries: { isIntersecting: boolean }[]) => void = () => {};
    vi.stubGlobal("IntersectionObserver", class {
      constructor(callback: typeof onSeen) {
        onSeen = callback;
      }
      observe() {}
      disconnect() {}
    });
    // Horloge simulée : chaque image est rejouée à la main avec son horodatage.
    const frames: FrameRequestCallback[] = [];
    vi.stubGlobal("requestAnimationFrame", (cb: FrameRequestCallback) => frames.push(cb));
    vi.stubGlobal("cancelAnimationFrame", () => {});
    vi.spyOn(performance, "now").mockReturnValue(1000);

    const { container } = render(<CountUp value={1000} />);
    const shown = () => container.querySelector("[data-count]")?.textContent;
    const frameAt = (t: number) => frames.shift()?.(t);

    onSeen([{ isIntersecting: true }]);
    frameAt(1000);
    expect(shown()).toBe("0");

    frameAt(1000 + 650); // mi-parcours : la courbe a déjà fait l’essentiel
    const half = Number(shown()?.replace(/\D/g, ""));
    expect(half).toBeGreaterThan(800);
    expect(half).toBeLessThan(1000);

    frameAt(1000 + 1300);
    expect(shown()).toBe((1000).toLocaleString("fr-FR"));
    expect(frames).toHaveLength(0); // plus aucune image demandée : c’est fini
  });

  it("montre la valeur finale sans IntersectionObserver", () => {
    vi.stubGlobal("matchMedia", () => ({ matches: false }));
    vi.stubGlobal("IntersectionObserver", undefined);

    const { container } = render(<CountUp value={7} />);
    const box = container.querySelector(".count-up") as HTMLElement;

    expect(box.hasAttribute("data-ready")).toBe(true);
    expect(box.textContent).toBe("7");
  });
});
