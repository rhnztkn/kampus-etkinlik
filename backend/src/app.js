import express from "express";
import cors from "cors";
import eventRoutes from "./routes/event-routes.js";

const app = express();

// Middleware: her istek route'a gelmeden önce buradan geçer
app.use(cors()); // frontend'in (5173) istek atmasına izin verir
app.use(express.json()); // JSON gövdeyi req.body'ye çevirir

// Sağlık kontrolü: sunucu ayakta mı?
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    time: new Date().toISOString(),
    student: "2416501017",
  });
});

// /events ile başlayan bütün istekler event-routes.js'e gider
app.use("/events", eventRoutes);

// Hiçbir route eşleşmezse
app.use((req, res) => {
  res.status(404).json({ error: { message: "Route not found" } });
});

// Hata yakalayıcı: 4 parametre görünce Express bunu hata middleware'i sayar.
// Kullanıcıya sadece "Server error" gider; ayrıntı terminalde kalır.
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).json({ error: { message: "Server error" } });
});

export default app;
