import * as flags from "country-flag-icons/string/3x2";
import { phoneCountries } from "@/content/phone-countries";

/**
 * `/drapeaux/BJ.svg` : les drapeaux du champ « Numéro WhatsApp », tirés de la
 * bibliothèque country-flag-icons (licence MIT). Aucun fichier de drapeau dans
 * le projet : chacun est écrit au build, servi comme un fichier statique, et
 * le navigateur ne télécharge que celui du pays choisi.
 */
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return phoneCountries.map(({ code }) => ({ code: `${code}.svg` }));
}

export async function GET(_request: Request, { params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const svg = flags[code.replace(/\.svg$/, "") as keyof typeof flags];
  if (!svg) return new Response("Drapeau introuvable", { status: 404 });

  return new Response(svg, {
    headers: { "Content-Type": "image/svg+xml; charset=utf-8" },
  });
}
