import { useState } from "react";
import { useEvents } from "../context/EventsContext";
import type { Category } from "../types/campus-event";
import { filterByCategory, searchEvents } from "../utils/filter-events";
import EventFilter from "../components/events/EventFilter";
import EventList from "../components/events/EventList";

function EventsPage() {
  const { events } = useEvents();

  // Filtre sadece bu sayfanın işi; bu yüzden context'te değil, burada
  const [query, setQuery] = useState("");
  const [chosen, setChosen] = useState<Category | "">("");

  const options = [...new Set(events.map((item) => item.category))];
  const visible = filterByCategory(searchEvents(events, query), chosen);

  return (
    <section aria-labelledby="liste-baslik">
      <h2 id="liste-baslik" className="bolum-baslik">
        Tüm Etkinlikler
      </h2>
      <EventFilter
        searchText={query}
        category={chosen}
        categories={options}
        onSearchChange={setQuery}
        onCategoryChange={setChosen}
      />
      {visible.length > 0 && (
        <p className="sonuc" aria-live="polite">
          {visible.length} etkinlik listeleniyor.
        </p>
      )}
      <EventList events={visible} emptyText="Aramanıza uygun etkinlik bulunamadı." />
    </section>
  );
}

export default EventsPage;
