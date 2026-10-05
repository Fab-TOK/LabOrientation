import type { Metadata } from "next";
import { ContactExperience } from "@/components/contact/ContactExperience";
import { isValidFormulaChoice, UNDECIDED_FORMULA } from "@/content/formulas";
import { routes } from "@/content/site";
import { pageAddress } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "Prenons contact",
  description:
    "Élève, parent ou établissement : décrivez votre situation et convenons d’un entretien préalable gratuit de 20 minutes, sans engagement.",
  ...pageAddress(routes.contact),
};

/**
 * Le formulaire unique du site : « Prenons contact », « Réserver… » et
 * « Demander cette formule » y mènent tous. Ce dernier passe l’offre dans
 * `?formule=` ; elle est lue ici, côté serveur, pour arriver présélectionnée
 * dès le premier affichage.
 */
export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ formule?: string | string[] }>;
}) {
  const { formule } = await searchParams;
  const initialFormula =
    typeof formule === "string" && formule !== UNDECIDED_FORMULA && isValidFormulaChoice(formule)
      ? formule
      : "";

  return <ContactExperience initialFormula={initialFormula} />;
}
