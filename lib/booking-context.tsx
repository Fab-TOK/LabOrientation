"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

/**
 * État du tunnel de réservation, persisté d’une étape à l’autre.
 *
 * `sessionStorage` plutôt que `localStorage` : une réservation abandonnée ne
 * doit pas ressurgir des semaines plus tard dans un autre onglet.
 */

const STORAGE_KEY = "laborientation.booking";

export type BookingState = {
  date: string;
  slot: string;
  participant: string;
  name: string;
  youngName: string;
  email: string;
  phone: string;
  country: string;
  level: string;
  format: string;
  situation: string;
  consent: boolean;
  /** Passe à vrai une fois l’étape 2 validée par le serveur. */
  confirmed: boolean;
};

export const EMPTY_BOOKING: BookingState = {
  date: "",
  slot: "",
  participant: "",
  name: "",
  youngName: "",
  email: "",
  phone: "",
  country: "",
  level: "",
  format: "",
  situation: "",
  consent: false,
  confirmed: false,
};

type BookingContextValue = {
  booking: BookingState;
  update: (patch: Partial<BookingState>) => void;
  reset: () => void;
  /** Faux tant que `sessionStorage` n’a pas été relu : évite les redirections hâtives. */
  ready: boolean;
};

const BookingContext = createContext<BookingContextValue | null>(null);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [booking, setBooking] = useState<BookingState>(EMPTY_BOOKING);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (stored) setBooking({ ...EMPTY_BOOKING, ...JSON.parse(stored) });
    } catch {
      /* Stockage indisponible : on repart d’un état vide, sans casser la page. */
    }
    setReady(true);
  }, []);

  const update = useCallback((patch: Partial<BookingState>) => {
    setBooking((current) => {
      const next = { ...current, ...patch };
      try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        /* idem */
      }
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    setBooking(EMPTY_BOOKING);
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      /* idem */
    }
  }, []);

  const value = useMemo(
    () => ({ booking, update, reset, ready }),
    [booking, update, reset, ready],
  );

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export function useBooking(): BookingContextValue {
  const value = useContext(BookingContext);
  if (!value) throw new Error("useBooking doit être utilisé dans un BookingProvider.");
  return value;
}
