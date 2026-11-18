# Kampüs Etkinlikleri API · Sprint 8

Orhan Öztekin · 2416501017

Aynı repoda iki uygulama var: `frontend/` (React + Vite, bu sprintte değişmedi) ve `backend/` (Node + Express + Mongoose). Sprint 8 ile etkinlikler bellekteki diziden **MongoDB Atlas**'a taşındı: sunucu kapanıp açılınca POST ile eklenen kayıtlar kaybolmaz. Adresler ve status kodları Sprint 7 ile aynı.

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
| `npm run seed` | `events` collection'ını siler ve 6 örnek etkinlik ekler; kaç kez çalışırsa çalışsın 6 kayıt kalır |
| `npm run dev` | `node --watch src/server.js`: önce MongoDB'ye bağlanır, sonra sunucuyu açar; dosya değişince yeniden başlatır |
| `npm start` | `node src/server.js` |

Sunucu `http://localhost:3000` adresinde açılır. Kontrol: `http://localhost:3000/health`. Bağlantı başarılıysa terminalde `MongoDB bağlandı (Atlas): .../kampus` yazar.

## Ortam değişkenleri

| Dosya | İçerik | GitHub |
|---|---|---|
| `backend/.env` | `PORT=3000`, `MONGODB_URI=<gerçek Atlas adresi>/kampus` | Gitmez (`.gitignore`'da) |
| `backend/.env.example` | `PORT=3000`, `MONGODB_URI=mongodb://127.0.0.1:27017/kampus` (yer tutucu) | Gider |

Bağlantı adresi yalnızca `process.env.MONGODB_URI` ile okunur; kodda, README'de veya Postman collection'ında gerçek adres ya da şifre yoktur.

## Veri katmanı

| Kavram | Bu projede |
|---|---|
| Database | `kampus` |
| Collection | `events` |
| Model | `Event` (`backend/src/models/event-model.js`) |
| Kimlik | MongoDB'nin `_id`'si (ör. `6afd4822bc7055a2409a88ad`); `event-2` gibi eski id'ler artık yok |

Schema kuralları: `title` zorunlu, 3–100 karakter, trim · `category` zorunlu, sadece `Seminer`, `Atölye`, `Söyleşi`, `Yarışma` · `date` zorunlu · `capacity` en az 0 (varsayılan 0) · `description` en fazla 500 karakter · `timestamps` ile `createdAt` ve `updatedAt` kendiliğinden eklenir.

```
backend/src/
  config/database.js      Mongoose bağlantısı
  models/event-model.js   Schema + Event modeli
  data/seed-events.js     6 örnek etkinlik (id alanı yok)
  seed.js                 deleteMany + insertMany
  controllers/            Event.find / findById / create (async/await, try/catch)
  routes/  app.js  server.js
```

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

Beklenmeyen hatalar hata middleware'ine gider; kullanıcıya sadece `"Server error"` döner, ayrıntı terminalde kalır ve sunucu çökmez.

## Test

Postman collection: `backend/requests/kampus-api.json`. 3. istekteki `_id` GET /events listesinden kopyalandı; seed tekrar çalışınca id'ler değişir, yeni listeden bir `_id` yazılır.

| # | İstek | Beklenen |
|---|---|---|
| 1 | GET /health | 200 · ok + student |
| 2 | GET /events | 200 · 6 kayıt (seed sonrası), `_id` + `createdAt` + `updatedAt` |
| 3 | GET /events/<listeden bir _id> | 200 · tek etkinlik |
| 4 | GET /events/yok | 404 · Event not found (500 değil) |
| 5 | POST /events (tam body) | 201 · yeni `_id` + `createdAt` |
| 6 | POST /events (sadece title) | 400 · date ve category zorunlu |

**Kalıcılık testi:** `npm run seed` → `npm run dev` → POST /events (201) → Ctrl+C → `npm run dev` → GET /events: 7 kayıt, yenisi listede.
