import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    historyApiFallback: true, // SPA 라우팅 지원
    proxy: {
      "/api": {
        target: "https://mitgosa.onrender.com",
        changeOrigin: true,
      },
    },
  },
  base: "/", // 절대 경로로 변경
});
