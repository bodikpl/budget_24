//
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

const manifestForPlugin: any = {
  registerType: "prompt",
  includeAssets: ["favicon.ico", "apple-touch-icon.png", "masked-icon.svg"],
  manifest: {
    name: "Budget",
    short_name: "Budget",
    description: "Budget",
    screenshots: [
      {
        src: "320.png",
        sizes: "320x320",
        type: "image/png",
        form_factor: "narrow",
        label: "Screen",
      },
      {
        src: "320.png",
        sizes: "320x320",
        type: "image/png",
        form_factor: "wide",
        label: "Screen",
      },
    ],
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/budget_24/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "apple touch icon",
      },
      {
        src: "/maskable_icon.png",
        sizes: "2400x1080",
        type: "image/png",
        purpose: "any maskable",
      },
    ],
    theme_color: "#f5f5f5",
    background_color: "#f5f5f5",
    display: "standalone",
    scope: "/budget_24/",
    start_url: "/budget_24/",
    orientation: "portrait",
  },
};

export default defineConfig({
  plugins: [react(), VitePWA(manifestForPlugin)],
  base: "/budget_24",
});
