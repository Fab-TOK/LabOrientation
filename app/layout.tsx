import type { Metadata } from "next";
import { Figtree, Newsreader } from "next/font/google";
import { site, siteUrl } from "@/content/site";
import "./globals.css";

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-newsreader",
});

const figtree = Figtree({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-figtree",
});

export const metadata: Metadata = {
  /* Base de toutes les URL relatives des métadonnées : canoniques, og:image. */
  metadataBase: new URL(siteUrl),
  /* Séparateur : point médian, jamais de tiret cadratin. */
  title: {
    default: `${site.name} · ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description:
    "Cabinet de conseil en orientation scolaire, universitaire et professionnelle fondé par Johana Ghionda. Des collégiens aux adultes en reconversion, en présentiel au Bénin et en visioconférence partout ailleurs.",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: site.name,
    url: siteUrl,
  },
  /* L’image de partage vient de `app/opengraph-image.png` ; Twitter la reprend. */
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${newsreader.variable} ${figtree.variable}`}>
      <body>{children}</body>
    </html>
  );
}
