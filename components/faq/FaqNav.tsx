"use client";

import { useEffect, useState } from "react";
import type { FaqSection } from "@/content/faq";
import { cn } from "@/lib/cn";

/**
 * Les trois catégories de la colonne de gauche.
 *
 * La maquette montre les trois sections affichées en même temps avec une seule
 * catégorie en surbrillance : ce sont donc des repères de navigation, pas un
 * filtre qui masquerait du contenu. La catégorie active suit le défilement.
 */
export function FaqNav({ sections }: { sections: FaqSection[] }) {
  const [active, setActive] = useState(sections[0]?.id);

  useEffect(() => {
    const headings = sections
      .map((section) => document.getElementById(section.id))
      .filter((element): element is HTMLElement => element !== null);

    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 },
    );

    headings.forEach((heading) => observer.observe(heading));
    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav
      aria-label="Catégories de questions"
      className="-mx-[18px] flex gap-0.5 overflow-x-auto px-[18px] pb-1 nav:mx-0 nav:flex-col nav:overflow-visible nav:px-0 nav:pb-0"
    >
      {sections.map((section) => {
        const current = active === section.id;
        return (
          <a
            key={section.id}
            href={`#${section.id}`}
            aria-current={current ? "true" : undefined}
            className={cn(
              "flex-none rounded-[10px] px-[18px] py-[13px] text-[14px]/none whitespace-nowrap transition-colors",
              current
                ? "bg-slate font-semibold text-cream"
                : "font-medium text-slate/75 hover:bg-slate/5",
            )}
          >
            {section.title}
          </a>
        );
      })}
    </nav>
  );
}
