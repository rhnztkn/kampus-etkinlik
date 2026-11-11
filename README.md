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

## Sprint 4 · Vite, TypeScript ve React

Uygulama artık `frontend/` klasöründe bir Vite + React + TypeScript projesidir.

```bash
cd frontend
npm install
npm run dev      # http://localhost:5173
npm run build    # hatasız bitmeli
```

| Dosya | Görevi |
|---|---|
| `package.json` | Proje adı, `dev`/`build` komutları ve paket listesi |
| `package-lock.json` | Yüklenen paketlerin tam sürümleri (`npm install` oluşturur) |
| `node_modules/` | İndirilen paketler; GitHub'a gitmez |
| `tsconfig*.json` | TypeScript derleyici ayarları |
| `vite.config.ts` | Vite ayarları ve React eklentisi |
| `index.html` | Tek HTML dosyası; içinde boş `div#root` |
| `src/main.tsx` | React'i başlatır, `App`'i root'a çizer |
| `src/App.tsx` | Uygulamanın ana bileşeni |
| `src/App.css` | Uygulamanın stilleri (Sprint 3 CSS'i) |
| `src/index.css` | Genel stil dosyası; bu sprintte boş |
| `public/` | Olduğu gibi kopyalanan dosyalar (afiş, ikon) |

Vercel ayarı: **Root Directory** `frontend`, **Framework Preset** `Vite`.
