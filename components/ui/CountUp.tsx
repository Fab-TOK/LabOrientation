"use client";

import { useEffect, useRef } from "react";

const DURATION = 1300;
const format = (n: number) => n.toLocaleString("fr-FR");

/**
 * Nombre qui compte de 0 à `value` la première fois qu’il arrive à l’écran.
 *
 * Le rendu serveur contient déjà la valeur finale : c’est ce que lisent les
 * moteurs, les lecteurs d’écran et les navigateurs sans JavaScript. Côté
 * client, le chiffre reste masqué (`.count-up` dans `globals.css`) jusqu’à ce
 * que ce composant l’ait remis à 0, pour ne jamais montrer 1 000 puis 0.
 *
 * La valeur finale, recopiée en pseudo-élément invisible, réserve la largeur :
 * le texte autour ne bouge pas pendant le comptage. Un pseudo-élément et non
 * une copie dans le texte, pour que la page ne contienne le nombre qu’une fois.
 */
export function CountUp({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const box = ref.current;
    const out = box?.querySelector<HTMLSpanElement>("[data-count]");
    if (!box || !out) return;

    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    if (reduced || typeof IntersectionObserver === "undefined") {
      box.dataset.ready = "";
      return;
    }

    out.textContent = format(0);
    box.dataset.ready = "";

    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const step = (now: number) => {
          const progress = Math.min(1, (now - start) / DURATION);
          const eased = 1 - Math.pow(1 - progress, 3);
          out.textContent = format(Math.round(eased * value));
          if (progress < 1) frame = requestAnimationFrame(step);
        };
        frame = requestAnimationFrame(step);
      },
      { threshold: 0.6 },
    );
    observer.observe(box);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      out.textContent = format(value);
    };
  }, [value]);

  return (
    <span ref={ref} className="count-up" data-final={format(value)}>
      <span data-count>{format(value)}</span>
    </span>
  );
}
