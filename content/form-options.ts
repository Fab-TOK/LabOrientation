/** Options du formulaire de contact. */

export const contactTypes = [
  { value: "eleve", label: "Un élève ou étudiant" },
  { value: "parent", label: "Un parent" },
  { value: "institution", label: "Un établissement" },
] as const;

/** Liste « Classe ou situation actuelle » : des collégiens aux adultes en reconversion. */
export const levels = [
  { value: "4e", label: "4ᵉ" },
  { value: "3e", label: "3ᵉ" },
  { value: "2nde", label: "2ⁿᵈᵉ" },
  { value: "1re", label: "1ʳᵉ" },
  { value: "terminale", label: "Terminale" },
  { value: "etudes-superieures", label: "Études supérieures" },
  { value: "vie-active", label: "Vie active ou reconversion" },
  { value: "autre", label: "Autre" },
] as const;

export const levelValues = levels.map((level) => level.value);

export const levelLabels: Record<string, string> = Object.fromEntries(
  levels.map((level) => [level.value, level.label]),
);

export const contactTypeLabels: Record<string, string> = Object.fromEntries(
  contactTypes.map((type) => [type.value, type.label]),
);
