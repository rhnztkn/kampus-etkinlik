import { useNavigate } from "react-router-dom";
import { useEvents } from "../context/EventsContext";
import type { EventFormData } from "../types/campus-event";
import EventForm from "../components/forms/EventForm";

// /admin/new: aynı form, boş başlangıç değerleriyle
const BLANK: EventFormData = {
  title: "",
  category: "",
  date: "",
  time: "",
  location: "",
  capacity: "",
  description: "",
};

function AddEventPage() {
  const navigate = useNavigate();
  const { addEvent } = useEvents();

  function save(data: EventFormData) {
    addEvent(data);
    navigate("/admin"); // kayıttan sonra yönetim tablosuna dön
  }

  return (
    <section aria-labelledby="ekle-baslik">
      <h2 id="ekle-baslik" className="bolum-baslik">
        Etkinlik Ekle
      </h2>
      <EventForm initialData={BLANK} submitText="Kaydet" onSubmit={save} />
    </section>
  );
}

export default AddEventPage;
