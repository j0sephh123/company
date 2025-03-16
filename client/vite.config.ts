import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import packageJson from "./package.json";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/company/",
  define: {
    // Make version available as import.meta.env.VITE_APP_VERSION
    "import.meta.env.VITE_APP_VERSION": JSON.stringify(packageJson.version),
  },
});
