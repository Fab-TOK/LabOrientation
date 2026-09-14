"use client";

import { useId, useState } from "react";
import { FAQ_PENDING_ANSWER, type FaqItem } from "@/content/faq";

/**
 * Accordéon de la FAQ. Plusieurs réponses peuvent rester ouvertes ;
 * la hauteur s’anime en 220 ms via `.accordion-panel` (grid-template-rows).
 */
export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<string[]>([]);

  const toggle = (id: string) =>
    setOpen((current) =>
      current.includes(id) ? current.filter((value) => value !== id) : [...current, id],
    );

  return (
    <ul className="mt-4 flex flex-col gap-3 nav:mt-5">
      {items.map((item) => (
        <AccordionRow
          key={item.id}
          item={item}
          open={open.includes(item.id)}
          onToggle={() => toggle(item.id)}
        />
      ))}
    </ul>
  );
}

function AccordionRow({
  item,
  open,
  onToggle,
}: {
  item: FaqItem;
  open: boolean;
  onToggle: () => void;
}) {
  const panelId = useId();
  const answered = Boolean(item.answer);

  return (
    <li className="card overflow-hidden bg-offwhite">
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={panelId}
          className="flex w-full items-start justify-between gap-5 px-5 py-5 text-left nav:px-[30px] nav:py-6"
        >
          <span className="font-serif text-[19px]/[1.35] nav:text-[23px]">{item.question}</span>
          <span
            aria-hidden="true"
            className={`flex-none text-[20px]/none ${open ? "text-terracotta" : "text-slate/40"}`}
          >
            {open ? "−" : "+"}
          </span>
        </button>
      </h3>

      <div id={panelId} className="accordion-panel" data-open={open}>
        <div>
          <p
            className={`max-w-[78ch] px-5 pb-5 text-[15px]/[1.75] text-pretty nav:px-[30px] nav:pb-7 nav:text-[15.5px] ${
              answered ? "text-slate/80" : "text-slate/55 italic"
            }`}
          >
            {item.answer ?? FAQ_PENDING_ANSWER}
          </p>
        </div>
      </div>
    </li>
  );
}
