import express from "express";
import cors from "cors";

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

// Hiçbir route eşleşmezse
app.use((req, res) => {
  res.status(404).json({ error: { message: "Route not found" } });
});

export default app;
