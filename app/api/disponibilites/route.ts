import { NextResponse } from "next/server";
import { getAvailabilityProvider } from "@/lib/availability";

/** Disponibilités d’un mois. `month` va de 1 à 12. */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const year = Number(searchParams.get("year"));
  const month = Number(searchParams.get("month"));

  if (!Number.isInteger(year) || year < 2024 || year > 2100) {
    return NextResponse.json({ error: "Année invalide." }, { status: 400 });
  }
  if (!Number.isInteger(month) || month < 1 || month > 12) {
    return NextResponse.json({ error: "Mois invalide." }, { status: 400 });
  }

  const days = await getAvailabilityProvider().getMonth(year, month);
  return NextResponse.json({ year, month, days });
}
