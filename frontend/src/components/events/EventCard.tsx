import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface EventCardProps {
  event: CampusEvent;
  onShowDetail: (id: string) => void;
}

function EventCard({ event, onShowDetail }: EventCardProps) {
  return (
    <article className="kart">
      <h2>{event.title}</h2>
      <span className="etiket">{event.category}</span>
      <p className="kart-bilgi">
        Tarih: {formatDate(event.date)}, {event.time}
      </p>
      <p className="kart-bilgi">Yer: {event.location}</p>
      <p className="kart-bilgi">Kontenjan: {event.capacity} kişi</p>
      <p>{event.description}</p>
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          onShowDetail(event.id);
        }}
      >
        Detayları gör
      </a>
    </article>
  );
}

export default EventCard;
