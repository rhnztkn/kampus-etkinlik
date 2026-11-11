import "./App.css";
import { useEffect, useState } from "react";
import type { CampusEvent, Category } from "./types/campus-event";
import { events } from "./data/events";
import {
  filterByCategory,
  findEventById,
  searchEvents,
} from "./utils/filter-events";

// Router yok: hangi sayfanın açık olduğunu bir state tutar
type PageName = "home" | "events" | "detail" | "add" | "update";

const menuItems: { name: PageName; label: string }[] = [
  { name: "home", label: "Ana Sayfa" },
  { name: "events", label: "Etkinlikler" },
  { name: "add", label: "Ekle" },
];

const formatDate = (iso: string) =>
  new Date(`${iso}T00:00`).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });

function App() {
  const [page, setPage] = useState<PageName>("home");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<Category | "">("");

  // Sayfayı değiştiren tek fonksiyon
  function go(next: PageName, id: string | null = null) {
    setPage(next);
    setSelectedId(id);
    window.scrollTo(0, 0);
  }

  // Ana sayfa: tarihi en yakın 2 etkinlik (kopya sıralanır, asıl dizi bozulmaz)
  const upcoming = [...events].sort((a, b) => a.date.localeCompare(b.date)).slice(0, 2);

  // Etkinlikler sayfası: filtreli liste state değil, her çizimde hesaplanır
  const categories = [...new Set(events.map((e) => e.category))];
  const filtered = filterByCategory(searchEvents(events, searchText), category);

  // Detay: seçili id'den etkinlik
  const selected = selectedId ? findEventById(events, selectedId) : undefined;

  // Başlık ve alt yazı açık sayfaya göre değişir
  let title = "Kampüs Etkinlikleri";
  let text: string | null = "Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin.";
  if (page === "events") {
    title = "Tüm Etkinlikler";
    text = "Bu dönem kampüste düzenlenen etkinlikler.";
  } else if (page === "detail") {
    title = selected ? selected.title : "Etkinlik bulunamadı";
    text = null;
  } else if (page === "add") {
    title = "Etkinlik Ekle";
    text = null;
  } else if (page === "update") {
    title = "Etkinlik Güncelle";
    text = null;
  }

  // Yan etki: sekme adı başlıkla birlikte değişir
  useEffect(() => {
    document.title = `Kampüs Etkinlikleri — ${title}`;
  }, [title]);

  // Ana sayfa ve Etkinlikler aynı kart JSX'ini kullanır
  function renderCard(event: CampusEvent) {
    return (
      <article className="kart" key={event.id}>
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
            go("detail", event.id);
          }}
        >
          Detayları gör
        </a>
      </article>
    );
  }

  return (
    <>
      <header className="site-baslik">
        <h1>{title}</h1>
        {text && <p>{text}</p>}
      </header>

      <nav className="menu" aria-label="Ana menü">
        <ul>
          {menuItems.map((item) => (
            <li key={item.name}>
              <a
                href="#"
                aria-current={page === item.name ? "page" : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  go(item.name);
                }}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <main>
        {page === "home" && (
          <>
            <h2 className="bolum-baslik">Yaklaşan 2 Etkinlik</h2>
            <section className="etkinlik-listesi">{upcoming.map(renderCard)}</section>
            <button type="button" onClick={() => go("events")}>
              Tüm etkinlikleri gör
            </button>
          </>
        )}

        {page === "events" && (
          <>
            <form className="filtre" role="search" onSubmit={(e) => e.preventDefault()}>
              <div className="alan">
                <label htmlFor="arama">Etkinlik ara</label>
                <input
                  id="arama"
                  type="search"
                  placeholder="Örn. atölye, veri"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>
              <div className="alan">
                <label htmlFor="kategori-filtre">Kategori</label>
                <select
                  id="kategori-filtre"
                  value={category}
                  onChange={(e) => setCategory(e.target.value as Category | "")}
                >
                  <option value="">Tümü</option>
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </form>

            <p className="sonuc" aria-live="polite">
              {filtered.length === 0
                ? "Aramanıza uygun etkinlik bulunamadı."
                : `${filtered.length} etkinlik listeleniyor.`}
            </p>
            <section className="etkinlik-listesi">{filtered.map(renderCard)}</section>
          </>
        )}

        {page === "detail" && !selected && (
          <>
            <p className="mesaj mesaj-hata">
              Böyle bir etkinlik yok. Listeden bir etkinlik seçin.
            </p>
            <button type="button" onClick={() => go("events")}>
              ← Listeye dön
            </button>
          </>
        )}

        {page === "detail" && selected && (
          <article className="detay">
            {selected.image && (
              <figure>
                <img src={selected.image} alt={`${selected.title} afişi`} width={600} height={400} />
                <figcaption>{selected.title} afişi</figcaption>
              </figure>
            )}
            <div>
              <section className="kunye">
                <h2>Etkinlik Künyesi</h2>
                <dl>
                  <dt>Tarih</dt>
                  <dd>
                    {formatDate(selected.date)}, {selected.time}
                  </dd>
                  <dt>Yer</dt>
                  <dd>{selected.location}</dd>
                  <dt>Kategori</dt>
                  <dd>{selected.category}</dd>
                  <dt>Kontenjan</dt>
                  <dd>{selected.capacity} kişi</dd>
                </dl>
              </section>
              <h2>Açıklama</h2>
              <p>{selected.description}</p>
              <div className="buton-grubu">
                <button type="button" onClick={() => go("events")}>
                  ← Listeye dön
                </button>
                <button type="button" onClick={() => go("update", selected.id)}>
                  Bu etkinliği güncelle
                </button>
              </div>
            </div>
          </article>
        )}

        {(page === "add" || page === "update") && (
          <>
            <p className="bilgi-notu">Bu sprintte form sadece görünüm; kayıt yapılmaz.</p>
            <form className="form" noValidate onSubmit={(e) => e.preventDefault()}>
              <div className="alan">
                <label htmlFor="title">Etkinlik Adı</label>
                <input id="title" type="text" maxLength={80} placeholder="Örn. Mobil Uygulama Atölyesi" />
              </div>
              <div className="alan">
                <label htmlFor="category">Kategori</label>
                <select id="category" defaultValue="">
                  <option value="">Seçiniz</option>
                  <option value="Seminer">Seminer</option>
                  <option value="Atölye">Atölye</option>
                  <option value="Söyleşi">Söyleşi</option>
                  <option value="Yarışma">Yarışma</option>
                </select>
              </div>
              <div className="alan">
                <label htmlFor="date">Tarih</label>
                <input id="date" type="date" />
              </div>
              <div className="alan">
                <label htmlFor="time">Saat</label>
                <input id="time" type="time" />
              </div>
              <div className="alan">
                <label htmlFor="location">Yer</label>
                <input id="location" type="text" placeholder="Örn. C Blok Seminer Odası" />
              </div>
              <div className="alan">
                <label htmlFor="capacity">Kontenjan</label>
                <input id="capacity" type="number" min={1} max={1000} />
              </div>
              <div className="alan">
                <label htmlFor="description">Açıklama</label>
                <textarea id="description" rows={5} />
              </div>
              <button type="submit">{page === "add" ? "Kaydet" : "Güncelle"}</button>
            </form>
          </>
        )}
      </main>

      <footer className="site-alt">
        <p>Orhan Öztekin · 2416501017 · 2026</p>
      </footer>
    </>
  );
}

export default App;
