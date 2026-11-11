import { Link } from "react-router-dom";

// "*" route'u ve bulunamayan etkinlikler buraya düşer
function NotFoundPage() {
  return (
    <section aria-labelledby="bulunamadi-baslik">
      <h2 id="bulunamadi-baslik" className="bolum-baslik">
        Sayfa bulunamadı
      </h2>
      <p>Bu adreste bir sayfa ya da etkinlik yok; bağlantı eskimiş olabilir.</p>
      <Link className="buton" to="/">
        ← Ana sayfaya dön
      </Link>
    </section>
  );
}

export default NotFoundPage;
