import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

/**
 * Gabarit des pages publiques. Le tunnel de réservation a le sien, avec un
 * header simplifié.
 */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
