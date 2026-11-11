# Kampüs Etkinlikleri API

Kampüs Etkinlikleri uygulamasının Express ile yazılmış REST API'si. Etkinlikleri JSON olarak verir; veri şimdilik bellekte tutulur (sunucu yeniden başlayınca POST ile eklenenler kaybolur).

**Öğrenci:** Orhan Öztekin · 2416501017

## Çalıştırma

```bash
cd backend
npm install
cp .env.example .env    # Windows: copy .env.example .env
npm run dev             # node --watch: dosya değişince yeniden başlar
```

Sunucu `http://localhost:3000` adresinde açılır. Sağlık kontrolü: `http://localhost:3000/health`

| Komut | Ne yapar |
|---|---|
| `npm run dev` | Geliştirme: `node --watch src/server.js` |
| `npm start` | `node src/server.js` |

## Ortam değişkenleri

| Değişken | Örnek | Açıklama |
|---|---|---|
| `PORT` | `3000` | Sunucunun dinleyeceği port |

Gerçek değerler `.env` dosyasında durur ve GitHub'a gönderilmez; gereken değişkenler `.env.example` dosyasında yazılıdır.

## REST sözleşmesi

| Method | Endpoint | Amaç | Başarılı | Hata | Durum |
|---|---|---|---|---|---|
| GET | `/events` | Listeyi getir (`?category=Atölye` isteğe bağlı) | 200 | — | Sprint 7 |
| GET | `/events/:id` | Tek etkinlik | 200 | 404 | Sprint 7 |
| POST | `/events` | Yeni etkinlik | 201 | 400 | Sprint 7 |
| PATCH | `/events/:id` | Güncelle | 200 | 400, 404 | Sprint 9 |
| DELETE | `/events/:id` | Sil | 204 | 404 | Sprint 9 |

Ek olarak `GET /health` → `200 { "status": "ok", "time": "...", "student": "2416501017" }`.

**Status code'lar:** 200 tamam · 201 oluşturuldu · 204 içerik yok · 400 eksik/yanlış veri · 404 bulunamadı

Bütün hatalar aynı biçimde döner:

```json
{ "error": { "message": "Event not found" } }
```

POST için `title`, `category` ve `date` zorunludur; eksikse `400 { "error": { "message": "title, category and date are required" } }`.

## Klasör yapısı

```
backend/
  src/
    app.js                          Express uygulaması, middleware, route bağlama
    server.js                       .env'i okur, portu dinler
    routes/event-routes.js          Hangi adres hangi fonksiyona gider
    controllers/event-controller.js İsteği işler, yanıtı döndürür
    data/events.js                  Bellek içi etkinlik dizisi
  requests/kampus-api.json          Postman collection (6 istek)
  .env.example  .gitignore  package.json  README.md
```

## Test (Postman)

`requests/kampus-api.json` dosyası Postman'de **Import** ile açılır. Altı istek:

| # | İstek | Beklenen |
|---|---|---|
| 1 | `GET /health` | 200 · ok + student |
| 2 | `GET /events` | 200 · 6 kayıt |
| 3 | `GET /events/event-2` | 200 · event-2 |
| 4 | `GET /events/yok` | 404 · error |
| 5 | `POST /events` (tam body) | 201 · yeni id |
| 6 | `POST /events` (sadece title) | 400 · error |
