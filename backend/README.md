# Kampüs Etkinlikleri API

Orhan Öztekin · 2416501017

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
| `.env` | `PORT=3000` | Gitmez (`.gitignore`'da) |
| `.env.example` | `PORT=3000` | Gider |

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
