import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface EventDetailProps {
  event: CampusEvent;
  onBack: () => void;
  onEdit: (id: string) => void;
}

// Hazır etkinliği gösterir; veriyi nereden geldiğini bilmez
function EventDetail({ event, onBack, onEdit }: EventDetailProps) {
  return (
    <article className="detay">
      {event.image && (
        <figure>
          <img src={event.image} alt={`${event.title} afişi`} width={600} height={400} />
          <figcaption>{event.title} afişi</figcaption>
        </figure>
      )}
      <div>
        <section className="kunye">
          <h2>Etkinlik Künyesi</h2>
          <dl>
            <dt>Tarih</dt>
            <dd>
              {formatDate(event.date)}, {event.time}
            </dd>
            <dt>Yer</dt>
            <dd>{event.location}</dd>
            <dt>Kategori</dt>
            <dd>{event.category}</dd>
            <dt>Kontenjan</dt>
            <dd>{event.capacity} kişi</dd>
          </dl>
        </section>
        <h2>Açıklama</h2>
        <p>{event.description}</p>
        <div className="buton-grubu">
          <button type="button" onClick={onBack}>
            ← Listeye dön
          </button>
          <button type="button" onClick={() => onEdit(event.id)}>
            Bu etkinliği güncelle
          </button>
        </div>
      </div>
    </article>
  );
}

export default EventDetail;
