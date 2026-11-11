import { useParams } from "react-router-dom";
import { useEvents } from "../context/EventsContext";
import { findEventById } from "../utils/filter-events";
import EventDetail from "../components/events/EventDetail";
import NotFoundPage from "./NotFoundPage";

// Garson: adresteki numaraya bakar, etkinliği listede bulur; yoksa "bulunamadı"
function EventDetailPage() {
  const { id = "" } = useParams(); // /events/event-2 → "event-2"
  const { events } = useEvents();
  const found = findEventById(events, id);

  if (!found) {
    return <NotFoundPage />;
  }

  return (
    <section aria-labelledby="detay-baslik">
      <h2 id="detay-baslik" className="bolum-baslik">
        {found.title}
      </h2>
      <EventDetail event={found} />
    </section>
  );
}

export default EventDetailPage;
