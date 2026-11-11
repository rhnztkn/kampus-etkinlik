import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { CampusEvent, Category, EventFormData } from "../types/campus-event";
import { events as seedEvents } from "../data/events";

/** Context'in taşıdığı değer: ortak liste + onu değiştiren üç işlem */
interface EventsContextValue {
  events: CampusEvent[];
  addEvent(data: EventFormData): void;
  updateEvent(id: string, data: EventFormData): void;
  deleteEvent(id: string): void;
}

// Başlangıçta null; Provider dışından okunursa useEvents hata fırlatır
const EventsContext = createContext<EventsContextValue | null>(null);

/** Formdan gelen metin alanları CampusEvent kaydına dönüştürür */
function toEvent(id: string, form: EventFormData): CampusEvent {
  const { title, category, date, time, location, capacity, description } = form;
  return {
    id,
    title: title.trim(),
    category: category as Category,
    date,
    time,
    location: location.trim(),
    capacity: Number(capacity),
    description: description.trim(),
  };
}

export function EventsProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<CampusEvent[]>(seedEvents);

  // Üç işlem de eski diziye dokunmaz, yeni bir dizi kurar (push / splice yok)
  const value: EventsContextValue = {
    events,
    addEvent(data) {
      setEvents((list) => [...list, toEvent(`event-${Date.now()}`, data)]);
    },
    updateEvent(id, data) {
      // Afiş gibi formda olmayan alanlar eski kayıttan korunur
      setEvents((list) =>
        list.map((item) => (item.id === id ? { ...item, ...toEvent(id, data) } : item)),
      );
    },
    deleteEvent(id) {
      setEvents((list) => list.filter((item) => item.id !== id));
    },
  };

  return <EventsContext.Provider value={value}>{children}</EventsContext.Provider>;
}

// Kendi hook'umuz: her sayfada useContext(EventsContext) yazmak yerine useEvents()
// eslint-disable-next-line react/only-export-components -- hook, Provider ile aynı dosyada
export function useEvents(): EventsContextValue {
  const ctx = useContext(EventsContext);
  if (!ctx) {
    throw new Error("useEvents yalnızca <EventsProvider> içinde kullanılabilir.");
  }
  return ctx;
}
