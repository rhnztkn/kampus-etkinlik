import { events } from "./data.js";

const form = document.querySelector("#etkinlik-formu");
const messageBox = document.querySelector("#form-mesaj");
const isUpdate = form.dataset.mode === "guncelle";

// Formdaki Türkçe name → nesnedeki İngilizce alan
const FIELDS = {
  ad: "title",
  kategori: "category",
  tarih: "date",
  saat: "time",
  yer: "location",
  kontenjan: "capacity",
  aciklama: "description",
};

let current = null;

// ----- Güncelleme sayfası: adresteki id ile formu doldur -----
if (isUpdate) {
  const id = new URLSearchParams(location.search).get("id");
  current = events.find((e) => e.id === id);

  if (!current) {
    document.querySelector("#form-bilgi")?.remove();
    messageBox.remove();
    form.outerHTML = `
      <p class="mesaj mesaj-hata">Güncellenecek etkinlik seçilmedi. Önce listeden bir etkinlik seçin,
        detay sayfasındaki "Bu etkinliği güncelle" butonunu kullanın.</p>
      <a class="buton" href="etkinlikler.html">Etkinliklere git</a>`;
  } else {
    for (const [name, key] of Object.entries(FIELDS)) {
      form.elements[name].value = current[key];
    }
  }
}

// ----- Kurallar: hata varsa { alanAdı: mesaj } döner -----
function check(data) {
  const errors = {};
  if (data.title.length < 3) errors.ad = "Etkinlik adı en az 3 karakter olmalı.";
  if (data.category === "") errors.kategori = "Bir kategori seçin.";
  if (data.date === "") errors.tarih = "Tarih seçin.";
  if (data.time === "") errors.saat = "Saat seçin.";
  if (data.location === "") errors.yer = "Yer bilgisini yazın.";
  if (
    data.capacity !== null &&
    (!Number.isInteger(data.capacity) || data.capacity < 1 || data.capacity > 1000)
  ) {
    errors.kontenjan = "Kontenjan 1 ile 1000 arasında bir tam sayı olmalı.";
  }
  return errors;
}

// Her alanın altındaki hata yerini doldur ya da temizle
function showErrors(errors) {
  for (const name of Object.keys(FIELDS)) {
    const field = form.elements[name];
    const slot = document.querySelector(`#${name}-hata`);
    if (!slot) continue;
    slot.textContent = errors[name] ?? "";
    if (errors[name]) field.setAttribute("aria-invalid", "true");
    else field.removeAttribute("aria-invalid");
  }
}

function showMessage(kind, title, json) {
  const box = document.createElement("div");
  box.className = `mesaj mesaj-${kind}`;
  const p = document.createElement("p");
  p.textContent = title;
  box.append(p);
  if (json) {
    const pre = document.createElement("pre");
    pre.textContent = json; // textContent: yazılanlar HTML olarak çalışmaz
    box.append(pre);
  }
  messageBox.replaceChildren(box);
}

form?.addEventListener("submit", (e) => {
  e.preventDefault(); // sayfa yenilenmesin, yazılanlar kaybolmasın

  const fd = new FormData(form);
  const capacityText = fd.get("kontenjan").trim();
  const data = {
    id: current ? current.id : `event-${events.length + 1}`,
    title: fd.get("ad").trim(),
    category: fd.get("kategori"),
    date: fd.get("tarih"),
    time: fd.get("saat"),
    location: fd.get("yer").trim(),
    capacity: capacityText === "" ? null : Number(capacityText),
    description: fd.get("aciklama").trim(),
  };
  console.log(data);

  const errors = check(data);
  showErrors(errors);

  if (Object.keys(errors).length > 0) {
    showMessage("hata", "Formda hatalı alanlar var.");
    return;
  }

  const verb = isUpdate ? "güncellendi" : "oluşturuldu";
  showMessage("basari", `Etkinlik ${verb} (bu sprintte kaydedilmez):`, JSON.stringify(data, null, 2));
});
