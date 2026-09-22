import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { StatsBanner } from "@/components/home/StatsBanner";
import { AboutTeaser } from "@/components/home/AboutTeaser";
import { ThreeSteps } from "@/components/home/ThreeSteps";
import { FormulasTeaser } from "@/components/home/FormulasTeaser";
import { TrustSection } from "@/components/home/TrustSection";
import { VisionTeaser } from "@/components/home/VisionTeaser";
import { TestimonialsTeaser } from "@/components/home/TestimonialsTeaser";
import { CtaCard } from "@/components/home/CtaCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { professionalService } from "@/content/structured-data";
import { routes } from "@/content/site";

/* Titre et description viennent de la racine : l’accueil les porte déjà. */
export const metadata: Metadata = {
  alternates: { canonical: routes.home },
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={professionalService} />
      <Hero />
      <StatsBanner />
      <AboutTeaser />
      <ThreeSteps />
      <FormulasTeaser />
      <TrustSection />
      <VisionTeaser />
      <TestimonialsTeaser />
      <CtaCard />
    </>
  );
}
