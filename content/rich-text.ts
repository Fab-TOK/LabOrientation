/**
 * Texte enrichi minimal : juste ce que les contenus fournis par la cliente
 * contiennent, c’est-à-dire du gras et de l’italique à l’intérieur d’un
 * paragraphe. Assez pour restituer sa mise en forme sans passer par du HTML
 * brut, donc sans `dangerouslySetInnerHTML`.
 */

export type Inline = string | { text: string; em?: true; strong?: true };

export type Paragraph = Inline[];

export const em = (text: string): Inline => ({ text, em: true });

export const strong = (text: string): Inline => ({ text, strong: true });
