import Link from "next/link";
import { routes } from "@/content/site";
import { testimonialExcerpts } from "@/content/testimonials";

export function TestimonialsTeaser() {
  return (
    <section className="bg-slate text-cream">
      <div className="gutter section-y">
        <div className="flex items-end justify-between gap-10">
          <h2 className="t-h2">Ils sont passés par là</h2>
          <Link
            href={routes.testimonials}
            className="link-underline link-underline-on-slate hidden text-[14px] font-medium nav:inline-flex"
          >
            Tous les témoignages <span aria-hidden="true">→</span>
          </Link>
        </div>

        <ul className="mt-5 grid gap-3 nav:mt-8 md:grid-cols-2 nav:grid-cols-3 nav:gap-[22px]">
          {testimonialExcerpts.map((testimonial) => (
            <li
              key={testimonial.id}
              className="flex flex-col rounded-[14px] border border-cream/16 bg-cream/7 p-[22px] nav:p-[30px]"
            >
              <span className="font-serif text-[30px]/none text-turquoise" aria-hidden="true">
                “
              </span>
              <p className="mt-2 flex-1 text-[15px]/[1.7] text-cream/92 text-pretty nav:mt-[10px] nav:text-[15.5px]">
                {testimonial.excerpt.quote}
              </p>
              <div className="mt-5 flex items-center gap-3 nav:mt-[22px] nav:gap-[13px]">
                <span
                  className="size-10 flex-none rounded-full nav:size-[42px]"
                  style={{
                    background:
                      "repeating-linear-gradient(135deg,rgba(251,247,240,.2),rgba(251,247,240,.2) 5px,rgba(251,247,240,.07) 5px,rgba(251,247,240,.07) 10px)",
                  }}
                  aria-hidden="true"
                />
                <div>
                  <div className="text-[13.5px]/[1.2] font-semibold nav:text-[14px]">
                    {testimonial.name}
                  </div>
                  <div className="mt-[3px] text-[12px]/[1.35] text-cream/68 nav:text-[12.5px]">
                    {testimonial.excerpt.context}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-5 text-center nav:hidden">
          <Link
            href={routes.testimonials}
            className="link-underline link-underline-on-slate text-[14px] font-medium"
          >
            Tous les témoignages <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
