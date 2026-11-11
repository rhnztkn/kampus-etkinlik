import "dotenv/config"; // .env dosyasını process.env'e yükler (ilk satırda olmalı)
import app from "./app.js";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`API: http://localhost:${PORT}`);
});
