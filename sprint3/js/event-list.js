import { events } from "./data.js";

const list = document.querySelector("#etkinlik-listesi");
const filterForm = document.querySelector("#filtre-formu");
const searchInput = document.querySelector("#arama");
const categorySelect = document.querySelector("#kategori-filtre");
const resultLine = document.querySelector("#sonuc");

// "2026-10-14" → "14 Ekim 2026" (yerel saatle okunur, gün kaymaz)
function readableDate(isoDate) {
  return new Date(`${isoDate}T00:00`).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// Bir etkinlikten Sprint 2'deki sınıflarla bir kart üretir
function createCard(event) {
  return `
    <article class="kart">
      <h2>${event.title}</h2>
      <span class="etiket">${event.category}</span>
      <p class="kart-bilgi">Tarih: ${readableDate(event.date)}, ${event.time}</p>
      <p class="kart-bilgi">Yer: ${event.location}</p>
      <p class="kart-bilgi">Kontenjan: ${event.capacity} kişi</p>
      <p>${event.description}</p>
      <a href="etkinlik-detay.html?id=${event.id}">Detayları gör</a>
    </article>`;
}

function render(items) {
  list.innerHTML = items.map(createCard).join("");
}

// Sonuç satırı: kaç etkinlik listelendiği ya da hiç bulunamadığı
function showResult(count) {
  if (!resultLine) return;
  resultLine.textContent =
    count === 0
      ? "Aramanıza uygun etkinlik bulunamadı."
      : `${count} etkinlik listeleniyor.`;
}

// Arama metni ve kategori birlikte uygulanır
function applyFilters() {
  const query = searchInput.value.trim().toLocaleLowerCase("tr-TR");
  const chosen = categorySelect.value;

  const matches = events.filter((e) => {
    const textOk =
      e.title.toLocaleLowerCase("tr-TR").includes(query) ||
      e.description.toLocaleLowerCase("tr-TR").includes(query);
    const categoryOk = chosen === "" || e.category === chosen;
    return textOk && categoryOk;
  });

  render(matches);
  showResult(matches.length);
}

// Kategori seçenekleri veriden, her biri bir kez
function fillCategories() {
  const unique = [...new Set(events.map((e) => e.category))];
  for (const name of unique) {
    categorySelect.append(new Option(name, name));
  }
}

if (list.dataset.limit) {
  // Ana sayfa: kopyayı tarihe göre sırala, ilk N tanesini göster
  const upcoming = [...events]
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, Number(list.dataset.limit));
  render(upcoming);
} else {
  // Etkinlikler sayfası: hepsi + filtre
  render(events);
  showResult(events.length);

  if (filterForm) {
    fillCategories();
    searchInput.addEventListener("input", applyFilters);
    categorySelect.addEventListener("change", applyFilters);
    filterForm.addEventListener("submit", (e) => e.preventDefault());
  }
}
