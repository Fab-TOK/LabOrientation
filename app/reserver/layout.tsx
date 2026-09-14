import type { Metadata } from "next";
import { BookingHeader } from "@/components/reserver/BookingHeader";
import { BookingProvider } from "@/lib/booking-context";

export const metadata: Metadata = {
  title: "Réserver 30 minutes offertes",
  description:
    "Choisissez une date et un créneau pour la séance de mise en contact de 30 minutes, gratuite et sans engagement.",
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
