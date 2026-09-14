import { Fragment } from "react";
import type { Inline, Paragraph } from "@/content/rich-text";

/** Rend un paragraphe enrichi (gras / italique) fourni par la cliente. */
export function RichText({ paragraph }: { paragraph: Paragraph }) {
  return (
    <>
      {paragraph.map((segment, index) => (
        <Fragment key={index}>{renderSegment(segment)}</Fragment>
      ))}
    </>
  );
}

function renderSegment(segment: Inline) {
  if (typeof segment === "string") return segment;
  if (segment.strong) return <strong className="font-semibold">{segment.text}</strong>;
  if (segment.em) return <em className="italic">{segment.text}</em>;
  return segment.text;
}
