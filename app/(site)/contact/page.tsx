import type { Metadata } from "next";
import { Suspense } from "react";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactSidebar } from "@/components/contact/ContactSidebar";
import { routes } from "@/content/site";

export const metadata: Metadata = {
  title: "Prenons contact",
  description:
    "Élève, parent ou institution : décrivez votre situation et convenons d’une séance de mise en contact de 30 minutes, offerte et sans engagement.",
  alternates: { canonical: routes.contact },
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-peach">
        <div className="gutter pt-7 pb-6 text-center nav:pt-14 nav:pb-10">
          <div className="t-eyebrow text-[#8E3416]">Prenons contact</div>
          <h1 className="t-h1-page mx-auto mt-3 max-w-[22ch] nav:mt-4 nav:text-[52px]/[1.05]">
            Vous souhaitez des informations ou un rendez-vous ?
          </h1>
          <p className="mx-auto mt-4 max-w-[74ch] text-[14.5px]/[1.7] text-slate/85 text-pretty nav:mt-[18px] nav:text-[17px]">
            Que vous soyez élève, parent ou une institution, vous pouvez me contacter pour
            échanger sur votre situation et vérifier que l’accompagnement choisi correspond
            bien à votre besoin.
          </p>
          <p className="mx-auto mt-3 max-w-[64ch] font-serif text-[17px]/[1.5] italic text-slate text-pretty nav:mt-[14px] nav:text-[20px]">
            Pas besoin d’avoir toutes les réponses. Expliquez simplement où vous en êtes. Je
            vous aiderai à identifier la formule la plus adaptée.
          </p>
        </div>
      </section>

      <div className="gutter grid items-start gap-6 pt-6 pb-8 nav:grid-cols-[1fr_330px] nav:gap-10 nav:pt-12 nav:pb-15">
        <Suspense fallback={<FormSkeleton />}>
          <ContactForm />
        </Suspense>
        <ContactSidebar />
      </div>
    </>
  );
}

function FormSkeleton() {
  return (
    <div
      className="card min-h-[600px] rounded-[18px] bg-offwhite nav:rounded-[20px]"
      aria-hidden="true"
    />
  );
}
