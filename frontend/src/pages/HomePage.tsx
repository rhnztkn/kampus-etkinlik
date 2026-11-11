import { Link } from "react-router-dom";
import { useEvents } from "../context/EventsContext";
import type { CampusEvent } from "../types/campus-event";
import EventList from "../components/events/EventList";

const byDate = (a: CampusEvent, b: CampusEvent) => a.date.localeCompare(b.date);

function HomePage() {
  const { events } = useEvents();
  // sort asıl diziyi bozmasın diye önce kopya alınır
  const nextTwo = [...events].sort(byDate).slice(0, 2);

  return (
    <section aria-labelledby="yaklasan-baslik">
      <h2 id="yaklasan-baslik" className="bolum-baslik">
        Yaklaşan 2 Etkinlik
      </h2>
      <EventList events={nextTwo} emptyText="Şu an yaklaşan bir etkinlik yok." />
      <Link className="buton" to="/events">
        Tüm etkinlikleri gör →
      </Link>
    </section>
  );
}

export default HomePage;
