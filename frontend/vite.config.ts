import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// Vite ayarları: React eklentisi + geliştirme sunucusu portu (npm run dev → 5173)
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
});
