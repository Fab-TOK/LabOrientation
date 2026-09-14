import { act, cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { BookingProvider, useBooking } from "@/lib/booking-context";

const STORAGE_KEY = "laborientation.booking";

function Probe() {
  const { booking, update, reset, ready } = useBooking();
  return (
    <div>
      <span data-testid="ready">{String(ready)}</span>
      <span data-testid="date">{booking.date}</span>
      <span data-testid="slot">{booking.slot}</span>
      <span data-testid="confirmed">{String(booking.confirmed)}</span>
      <button onClick={() => update({ date: "2026-10-13", slot: "14:00" })}>choisir</button>
      <button onClick={() => update({ name: "Awa" })}>nommer</button>
      <button onClick={reset}>vider</button>
    </div>
  );
}

const click = (label: string) => act(() => screen.getByText(label).click());

describe("BookingProvider", () => {
  beforeEach(() => sessionStorage.clear());
  /* Vitest tourne sans globals : le nettoyage automatique ne s’accroche pas. */
  afterEach(cleanup);

  it("démarre vide et signale qu’il est prêt", () => {
    render(
      <BookingProvider>
        <Probe />
      </BookingProvider>,
    );

    expect(screen.getByTestId("ready").textContent).toBe("true");
    expect(screen.getByTestId("date").textContent).toBe("");
    expect(screen.getByTestId("confirmed").textContent).toBe("false");
  });

  it("écrit chaque mise à jour dans sessionStorage", () => {
    render(
      <BookingProvider>
        <Probe />
      </BookingProvider>,
    );

    click("choisir");

    expect(screen.getByTestId("date").textContent).toBe("2026-10-13");
    expect(JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? "{}")).toMatchObject({
      date: "2026-10-13",
      slot: "14:00",
    });
  });

  it("fusionne les mises à jour au lieu de remplacer l’état", () => {
    render(
      <BookingProvider>
        <Probe />
      </BookingProvider>,
    );

    click("choisir");
    click("nommer");

    const stored = JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? "{}");
    expect(stored).toMatchObject({ date: "2026-10-13", slot: "14:00", name: "Awa" });
  });

  it("restaure l’état d’une étape à l’autre", () => {
    sessionStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ date: "2026-11-02", slot: "10:30", confirmed: true }),
    );

    render(
      <BookingProvider>
        <Probe />
      </BookingProvider>,
    );

    expect(screen.getByTestId("date").textContent).toBe("2026-11-02");
    expect(screen.getByTestId("slot").textContent).toBe("10:30");
    expect(screen.getByTestId("confirmed").textContent).toBe("true");
  });

  it("survit à un contenu stocké illisible", () => {
    sessionStorage.setItem(STORAGE_KEY, "{ ceci n’est pas du JSON");

    render(
      <BookingProvider>
        <Probe />
      </BookingProvider>,
    );

    expect(screen.getByTestId("ready").textContent).toBe("true");
    expect(screen.getByTestId("date").textContent).toBe("");
  });

  it("vide l’état et le stockage", () => {
    render(
      <BookingProvider>
        <Probe />
      </BookingProvider>,
    );

    click("choisir");
    click("vider");

    expect(screen.getByTestId("date").textContent).toBe("");
    expect(sessionStorage.getItem(STORAGE_KEY)).toBeNull();
  });
});
