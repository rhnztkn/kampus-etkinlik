import { useNavigate, useParams } from "react-router-dom";
import { useEvents } from "../context/EventsContext";
import type { EventFormData } from "../types/campus-event";
import { findEventById } from "../utils/filter-events";
import EventForm from "../components/forms/EventForm";
import NotFoundPage from "./NotFoundPage";

// /admin/:id/edit: aynı form, etkinliğin bilgileriyle dolu
function EditEventPage() {
  const { id = "" } = useParams();
  const navigate = useNavigate();
  const { events, updateEvent } = useEvents();

  const current = findEventById(events, id);
  if (current === undefined) {
    return <NotFoundPage />;
  }

  const filled: EventFormData = {
    ...current,
    capacity: String(current.capacity), // etkinlikte sayı, formda metin
  };

  function save(data: EventFormData) {
    updateEvent(id, data);
    navigate("/admin");
  }

  return (
    <section aria-labelledby="guncelle-baslik">
      <h2 id="guncelle-baslik" className="bolum-baslik">
        Etkinlik Güncelle
      </h2>
      <EventForm key={id} initialData={filled} submitText="Güncelle" onSubmit={save} />
    </section>
  );
}

export default EditEventPage;
