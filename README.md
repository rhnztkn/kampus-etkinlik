https://orhanoztekin-frontend.vercel.app

# Kampüs Etkinlikleri

Fakültedeki seminer, atölye, söyleşi ve yarışmaları tek yerden takip etmek için hazırlanan web uygulaması.

**Öğrenci:** Orhan Öztekin · 2416501017

## Sprint 1 · HTML

`sprint1/` klasöründe yalnızca HTML ile yazılmış beş sayfa vardır (CSS ve JavaScript yok):

| Dosya | İçerik |
|---|---|
| `index.html` | Ana sayfa, yaklaşan etkinlikler tablosu |
| `etkinlikler.html` | Tüm etkinlikler tablosu |
| `etkinlik-detay.html` | Tek etkinliğin afişi ve künyesi |
| `etkinlik-ekle.html` | Yeni etkinlik formu |
| `etkinlik-guncelle.html` | Değerleri dolu güncelleme formu |

## Sprint 2 · CSS ve Responsive

`sprint2/css/2416501017.css` dosyası beş sayfaya bağlıdır. Renk tonu ve font öğrenci numarasından gelir:

- `--no: 2416501017` → `--ton: mod(2416501017, 360) = 297`
- Numaranın son hanesi **7** → `--font: "Palatino Linotype"`

Etkinlikler `section > article` kartlarla listelenir; telefonda tek sütun, geniş ekranda birden fazla sütun.

## Sprint 3 · JavaScript ve DOM

`sprint3/` sayfaları Live Server ile açılmalıdır (`http://127.0.0.1:5500/sprint3/`); `type="module"` dosyadan çift tıklayınca çalışmaz.

| Sayfa | Modül |
|---|---|
| `index.html`, `etkinlikler.html` | `js/event-list.js` |
| `etkinlik-detay.html` | `js/event-detail.js` |
| `etkinlik-ekle.html`, `etkinlik-guncelle.html` | `js/event-form.js` |

`js/data.js` altı etkinliği tutar; diğer modüller onu `import` eder. Detay ve güncelleme sayfası adresteki `?id=event-3` gibi değeri okur.
