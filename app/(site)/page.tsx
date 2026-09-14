import { Hero } from "@/components/home/Hero";
import { StatsBanner } from "@/components/home/StatsBanner";
import { AboutTeaser } from "@/components/home/AboutTeaser";
import { ThreeSteps } from "@/components/home/ThreeSteps";
import { FormulasTeaser } from "@/components/home/FormulasTeaser";
import { TrustSection } from "@/components/home/TrustSection";
import { VisionTeaser } from "@/components/home/VisionTeaser";
import { TestimonialsTeaser } from "@/components/home/TestimonialsTeaser";
import { CtaCard } from "@/components/home/CtaCard";

export default function HomePage() {
  return (
    <>
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
