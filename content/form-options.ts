/** Options partagées par le formulaire de contact et l’étape 2 de la réservation. */

export const contactTypes = [
  { value: "eleve", label: "Un élève / étudiant" },
  { value: "parent", label: "Un parent" },
  { value: "institution", label: "Un lycée ou une institution" },
] as const;

export const participantTypes = [
  { value: "eleve", label: "L’élève / l’étudiant" },
  { value: "parent", label: "Un parent" },
  { value: "institution", label: "Un lycée ou une institution" },
] as const;

export const levels = [
  { value: "4e", label: "4ᵉ" },
  { value: "3e", label: "3ᵉ" },
  { value: "2nde", label: "2ⁿᵈᵉ" },
  { value: "1re", label: "1ʳᵉ" },
  { value: "terminale", label: "Terminale" },
  { value: "autre", label: "Autre" },
] as const;

export const formats = [
  { value: "presentiel", label: "En présentiel" },
  { value: "visio", label: "En visioconférence" },
  { value: "indecis", label: "Je ne sais pas encore" },
] as const;

export const formatLabels: Record<string, string> = Object.fromEntries(
  formats.map((format) => [format.value, format.label]),
);

export const levelLabels: Record<string, string> = Object.fromEntries(
  levels.map((level) => [level.value, level.label]),
);
