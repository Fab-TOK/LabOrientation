import type { AvatarTone, Testimonial } from "@/content/testimonials";
import { cn } from "@/lib/cn";

const avatarTone: Record<AvatarTone, string> = {
  turquoise: "bg-turquoise text-white",
  peach: "bg-peach text-slate",
  slate: "bg-slate text-peach",
  terracotta: "bg-terracotta text-white",
  white: "bg-white/90 text-turquoise",
};

const surface = {
  "wide-light": "border border-slate/14 bg-offwhite",
  "wide-slate": "bg-slate text-cream",
  "split-light": "border border-slate/14 bg-offwhite",
  "split-peach": "bg-peach",
  turquoise: "bg-turquoise text-white",
} as const;

/** Deux gabarits : une carte large en deux colonnes, ou une carte compacte. */
export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const wide = testimonial.variant.startsWith("wide") || testimonial.variant === "turquoise";
  return wide ? <WideCard testimonial={testimonial} /> : <SplitCard testimonial={testimonial} />;
}

function WideCard({ testimonial }: { testimonial: Testimonial }) {
  const onDark = testimonial.variant !== "wide-light";
  const muted = onDark ? "text-cream/85" : "text-slate/82";

  return (
    <article
      className={cn(
        "grid gap-5 rounded-[18px] p-[22px] nav:grid-cols-[250px_1fr] nav:gap-11 nav:rounded-[20px] nav:p-11",
        surface[testimonial.variant],
      )}
    >
      <header>
        <Avatar testimonial={testimonial} size="lg" />
        <h2 className="mt-4 font-serif text-[22px]/[1.2] nav:mt-[18px] nav:text-[26px]">
          {testimonial.name}
        </h2>
        <p
          className={cn(
            "mt-2 text-[13.5px]/[1.6] nav:text-[14px]",
            testimonial.variant === "turquoise"
              ? "text-white/85"
              : onDark
                ? "text-cream/78"
                : "text-slate/70",
          )}
        >
          {testimonial.context}
        </p>
        {testimonial.badge && (
          <span
            className={cn(
              "mt-4 inline-block rounded-full px-[13px] py-[7px] text-[12px]/none font-semibold nav:mt-[18px]",
              onDark ? "border border-cream/25 bg-cream/14 text-cream" : "bg-peach text-slate",
            )}
          >
            {testimonial.badge}
          </span>
        )}
      </header>

      <div>
        <p
          className={cn(
            "font-serif text-[20px]/[1.55] text-pretty nav:text-[24px]/[1.6]",
            onDark ? "text-cream" : "text-slate",
            testimonial.variant === "turquoise" && "text-white",
          )}
        >
          {testimonial.lead}
        </p>

        {testimonial.body.map((paragraph, index) => (
          <p
            key={index}
            className={cn(
              "mt-4 text-[15px]/[1.8] text-pretty nav:mt-[18px] nav:text-[16.5px]",
              muted,
              testimonial.variant === "turquoise" && "text-white/90",
            )}
          >
            {paragraph}
          </p>
        ))}

        {testimonial.since && (
          <div className="mt-6 border-t border-slate/12 pt-5 nav:mt-[26px] nav:pt-[22px]">
            <div className="t-label text-turquoise">{testimonial.since.label}</div>
            {testimonial.since.paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className={cn("mt-3 text-[15px]/[1.8] text-pretty nav:mt-4 nav:text-[16.5px]", muted)}
              >
                {paragraph}
              </p>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

function SplitCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <article
      className={cn(
        "flex flex-col rounded-[18px] p-[22px] nav:rounded-[20px] nav:p-10",
        surface[testimonial.variant],
      )}
    >
      <header className="flex items-center gap-4">
        <Avatar testimonial={testimonial} size="md" />
        <div>
          <h2 className="font-serif text-[21px]/[1.2] nav:text-[24px]">{testimonial.name}</h2>
          <p
            className={cn(
              "mt-[3px] text-[12.5px]/[1.4] nav:text-[13px]",
              testimonial.variant === "split-peach" ? "text-slate/70" : "text-slate/65",
            )}
          >
            {testimonial.context}
          </p>
        </div>
      </header>

      <p className="mt-5 font-serif text-[18px]/[1.6] text-slate text-pretty nav:mt-6 nav:text-[20px]">
        {testimonial.lead}
      </p>

      {testimonial.body.map((paragraph, index) => (
        <p
          key={index}
          className={cn(
            "mt-4 text-[15px]/[1.8] text-pretty nav:text-[16px]",
            testimonial.variant === "split-peach" ? "text-slate/85" : "text-slate/82",
          )}
        >
          {paragraph}
        </p>
      ))}
    </article>
  );
}

function Avatar({ testimonial, size }: { testimonial: Testimonial; size: "md" | "lg" }) {
  return (
    <span
      className={cn(
        "flex flex-none items-center justify-center rounded-full font-serif",
        avatarTone[testimonial.avatarTone],
        size === "lg"
          ? "size-[46px] text-[20px]/none nav:size-16 nav:text-[26px]"
          : "size-[46px] text-[20px]/none nav:size-[52px] nav:text-[22px]",
      )}
      aria-hidden="true"
    >
      {testimonial.initial}
    </span>
  );
}
