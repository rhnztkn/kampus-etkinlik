# Kampüs Etkinlikleri API · Sprint 7

Orhan Öztekin · 2416501017

Aynı repoda iki uygulama var: `frontend/` (React + Vite, bu sprintte değişmedi) ve `backend/` (Node + Express, etkinlikleri JSON olarak veren sunucu). Veri şimdilik bellekte tutulur.

## Çalıştırma komutları

```bash
cd backend
npm install
npm run dev
```

| Komut | Ne yapar |
|---|---|
| `npm install` | Paketleri yükler (express, dotenv, cors) |
| `npm run dev` | `node --watch src/server.js` — dosya değişince sunucuyu yeniden başlatır |
| `npm start` | `node src/server.js` |

Sunucu `http://localhost:3000` adresinde açılır. Kontrol: `http://localhost:3000/health`

## PORT değişkeni

| Dosya | İçerik | GitHub |
|---|---|---|
| `backend/.env` | `PORT=3000` | Gitmez (`.gitignore`'da) |
| `backend/.env.example` | `PORT=3000` | Gider |

Port `process.env.PORT` ile okunur; `server.js`'in ilk satırı `import "dotenv/config"`. `.env` yoksa 3000 kullanılır.

## REST sözleşmesi

| Method | Endpoint | Amaç | Başarılı | Hata | Durum |
|---|---|---|---|---|---|
| GET | `/events` | Listeyi getir | 200 | — | Bu sprint |
| GET | `/events/:id` | Tek etkinlik | 200 | 404 | Bu sprint |
| POST | `/events` | Yeni etkinlik | 201 | 400 | Bu sprint |
| PATCH | `/events/:id` | Güncelle | 200 | 400, 404 | Sprint 9 |
| DELETE | `/events/:id` | Sil | 204 | 404 | Sprint 9 |

**Status code'lar:** 200 tamam · 201 oluşturuldu · 204 içerik yok · 400 eksik/yanlış veri · 404 bulunamadı

Bütün hatalar aynı biçimde döner:

```json
{ "error": { "message": "Event not found" } }
```

## Test

Postman collection: `backend/requests/kampus-api.json`

| # | İstek | Beklenen |
|---|---|---|
| 1 | GET /health | 200 · ok + student |
| 2 | GET /events | 200 · 6 kayıt |
| 3 | GET /events/event-2 | 200 · event-2 |
| 4 | GET /events/yok | 404 · error |
| 5 | POST /events (tam body) | 201 · yeni id |
| 6 | POST /events (sadece title) | 400 · error |
