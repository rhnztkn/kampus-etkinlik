import { events } from "./data.js";

const container = document.querySelector("#detay");
const pageTitle = document.querySelector(".site-baslik h1");

// Adresten gelen metin HTML olarak yorumlanmasın
function escapeHtml(text) {
  return String(text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function readableDate(isoDate) {
  return new Date(`${isoDate}T00:00`).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

const id = new URLSearchParams(location.search).get("id");
const event = events.find((e) => e.id === id);

if (!event) {
  // Önce kontrol: bulunamazsa event.title okunmaz, konsol temiz kalır
  pageTitle.textContent = "Etkinlik bulunamadı";
  document.title = "Etkinlik bulunamadı · Kampüs Etkinlikleri";
  const reason = id
    ? `"${escapeHtml(id)}" numaralı bir etkinlik yok.`
    : "Adreste bir etkinlik numarası yok.";
  container.innerHTML = `
    <p class="mesaj mesaj-hata">${reason} Listeden bir etkinlik seçin.</p>
    <a class="buton" href="etkinlikler.html">← Listeye dön</a>`;
} else {
  pageTitle.textContent = event.title;
  document.title = `${event.title} · Kampüs Etkinlikleri`;
  container.innerHTML = `
    <article class="detay">
      <figure>
        <img src="images/afis.svg" alt="${event.title} afişi" width="600" height="400">
        <figcaption>${event.title} afişi</figcaption>
      </figure>
      <div>
        <section class="kunye">
          <h2>Etkinlik Künyesi</h2>
          <dl>
            <dt>Tarih</dt>
            <dd>${readableDate(event.date)}, ${event.time}</dd>
            <dt>Yer</dt>
            <dd>${event.location}</dd>
            <dt>Kategori</dt>
            <dd>${event.category}</dd>
            <dt>Kontenjan</dt>
            <dd>${event.capacity} kişi</dd>
          </dl>
        </section>
        <h2>Açıklama</h2>
        <p>${event.description}</p>
        <div class="buton-grubu">
          <a class="buton" href="etkinlikler.html">← Listeye dön</a>
          <a class="buton" href="etkinlik-guncelle.html?id=${event.id}">Bu etkinliği güncelle</a>
        </div>
      </div>
    </article>`;
}
