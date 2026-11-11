import { Link } from "react-router-dom";
import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface EventCardProps {
  event: CampusEvent;
}

function EventCard({ event }: EventCardProps) {
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
      <Link to={`/events/${event.id}`}>Detayları gör</Link>
    </article>
  );
}

export default EventCard;
