import { Fragment } from "react";
import { cn } from "@/lib/cn";

const STEPS = ["Date et créneau", "Vos informations", "Confirmation"];

/** Trois jalons reliés par des filets ; le jalon franchi passe en turquoise. */
export function ProgressSteps({ current }: { current: 1 | 2 | 3 }) {
  return (
    <ol className="mt-6 flex items-center nav:mt-[34px]">
      {STEPS.map((label, index) => {
        const step = index + 1;
        const done = step < current;
        const active = step === current;

        return (
          <Fragment key={label}>
            {index > 0 && (
              <li
                aria-hidden="true"
                className="mx-3 h-0.5 flex-1 bg-slate/15 nav:mx-[18px]"
              />
            )}
            <li
              className="flex items-center gap-[11px]"
              aria-current={active ? "step" : undefined}
            >
              <span
                className={cn(
                  "flex size-[30px] flex-none items-center justify-center rounded-full text-[13px]/none font-bold",
                  done || active
                    ? "bg-turquoise text-white"
                    : "bg-slate/10 text-slate/50",
                )}
              >
                {done ? "✓" : step}
              </span>
              <span
                className={cn(
                  "hidden text-[14px]/none font-semibold nav:inline",
                  active ? "text-slate" : "text-slate/65",
                )}
              >
                {label}
              </span>
              <span className="sr-only nav:hidden">{label}</span>
            </li>
          </Fragment>
        );
      })}
    </ol>
  );
}
