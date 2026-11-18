# Kampüs Etkinlikleri API

Orhan Öztekin · 2416501017

## Çalıştırma komutları

```bash
cd backend
npm install
npm run seed
npm run dev
```

| Komut | Ne yapar |
|---|---|
| `npm install` | Paketleri yükler (express, dotenv, cors, mongoose) |
| `npm run seed` | Veritabanını 6 örnek etkinlikle doldurur (önce siler, sonra ekler) |
| `npm run dev` | `node --watch src/server.js` — dosya değişince sunucuyu yeniden başlatır |
| `npm start` | `node src/server.js` |

Sunucu `http://localhost:3000` adresinde açılır. Kontrol: `http://localhost:3000/health`

## Ortam değişkenleri

| Dosya | İçerik | GitHub |
|---|---|---|
| `.env` | `PORT=3000`, `MONGODB_URI=<gerçek Atlas adresi>` | Gitmez (`.gitignore`'da) |
| `.env.example` | `PORT=3000`, `MONGODB_URI=mongodb://127.0.0.1:27017/kampus` (yer tutucu) | Gider |

`server.js`'in ilk satırı `import "dotenv/config"`. Bağlantı `src/config/database.js`'te `process.env.MONGODB_URI` ile kurulur; önce veritabanı, sonra sunucu açılır.

## Veri katmanı (Sprint 8)

Etkinlikler MongoDB'de `kampus` veritabanının `events` collection'ında durur; sunucu kapanıp açılınca kayıtlar kaybolmaz.

| Dosya | Görev |
|---|---|
| `src/config/database.js` | Mongoose bağlantısı |
| `src/models/event-model.js` | Schema (required, trim, minlength/maxlength, enum, min/default, timestamps) ve `Event` modeli |
| `src/data/seed-events.js` | 6 örnek etkinlik (id alanı yok, MongoDB `_id` verir) |
| `src/seed.js` | `deleteMany` + `insertMany` |

`id` artık MongoDB'nin `_id`'si (ör. `6af57a00...`). Geçersiz biçimli id de `404` döner.

## REST sözleşmesi

| Method | Endpoint | Amaç | Başarılı | Hata | Durum |
|---|---|---|---|---|---|
| GET | `/events` | Listeyi getir (`?category=Atölye` isteğe bağlı) | 200 | — | Hazır |
| GET | `/events/:id` | Tek etkinlik | 200 | 404 | Hazır |
| POST | `/events` | Yeni etkinlik | 201 | 400 | Hazır |
| PATCH | `/events/:id` | Güncelle | 200 | 400, 404 | Sprint 9 |
| DELETE | `/events/:id` | Sil | 204 | 404 | Sprint 9 |

**Status code'lar:** 200 tamam · 201 oluşturuldu · 204 içerik yok · 400 eksik/yanlış veri (schema doğrulaması) · 404 bulunamadı (biçimi geçersiz id dahil) · 500 beklenmeyen sunucu hatası

Bütün hatalar aynı biçimde döner:

```json
{ "error": { "message": "Event not found" } }
```

Beklenmeyen hatalar `app.js` sonundaki hata middleware'ine gider; kullanıcıya sadece `"Server error"` döner, sunucu çökmez.

## Test

Postman collection: `requests/kampus-api.json` (3. istek için Variables → `eventId` değerine listeden bir `_id` yapıştır).

Kalıcılık testi: `npm run seed` → `npm run dev` → POST /events (201) → Ctrl+C → `npm run dev` → GET /events: yeni kayıt hâlâ listede.
