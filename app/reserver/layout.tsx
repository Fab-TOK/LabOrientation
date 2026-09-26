import type { Metadata } from "next";
import { BookingHeader } from "@/components/reserver/BookingHeader";
import { BookingProvider } from "@/lib/booking-context";

export const metadata: Metadata = {
  title: "Réserver mon entretien gratuit de 20 minutes",
  description:
    "Choisissez une date et un créneau pour l’entretien préalable gratuit de 20 minutes, sans engagement.",
  robots: { index: false },
};

export default function BookingLayout({ children }: { children: React.ReactNode }) {
  return (
    <BookingProvider>
      <div className="flex min-h-dvh flex-col">
        <BookingHeader />
        <main className="flex-1 pb-10">{children}</main>
      </div>
    </BookingProvider>
  );
}
