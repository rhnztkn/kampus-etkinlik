import { Link } from "react-router-dom";
import { useEvents } from "../context/EventsContext";
import type { CampusEvent } from "../types/campus-event";
import { formatDate } from "../utils/format-date";

// Yönetim: bütün etkinlikler tabloda; Düzenle formu açar, Sil önce onay ister
function AdminPage() {
  const { events, deleteEvent } = useEvents();

  function askAndDelete(item: CampusEvent) {
    const ok = window.confirm(`"${item.title}" silinsin mi?`);
    if (ok) deleteEvent(item.id);
  }

  const rows = events.map((item) => (
    <tr key={item.id}>
      <td data-baslik="Etkinlik">{item.title}</td>
      <td data-baslik="Tarih">{formatDate(item.date)}</td>
      <td data-baslik="Kategori">{item.category}</td>
      <td className="islemler">
        <Link className="buton" to={`/admin/${item.id}/edit`}>
          Düzenle
        </Link>
        <button className="buton buton-sil" type="button" onClick={() => askAndDelete(item)}>
          Sil
        </button>
      </td>
    </tr>
  ));

  return (
    <section aria-labelledby="yonetim-baslik">
      <h2 id="yonetim-baslik" className="bolum-baslik">
        Etkinlik Yönetimi
      </h2>
      <Link className="buton" to="/admin/new">
        + Yeni etkinlik
      </Link>

      {rows.length > 0 ? (
        <table className="tablo">
          <caption className="ekran-okuyucu">Kayıtlı etkinlikler ve işlemler</caption>
          <thead>
            <tr>
              <th scope="col">Etkinlik</th>
              <th scope="col">Tarih</th>
              <th scope="col">Kategori</th>
              <th scope="col">İşlemler</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      ) : (
        <p className="sonuc">Henüz etkinlik yok. "+ Yeni etkinlik" ile ilkini ekleyebilirsin.</p>
      )}
    </section>
  );
}

export default AdminPage;
