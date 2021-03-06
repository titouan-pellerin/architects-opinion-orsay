import { defineConfig } from "vite";
import glsl from "vite-plugin-glsl";

export default defineConfig({
  server: {
    port: "8080",
    https: false,
    open: true,
  },
  plugins: [glsl()],

  resolve: {
    alias: [
      { find: "@js", replacement: "/src/js" },
      { find: "@styles", replacement: "/src/styles" },
      { find: "@glsl", replacement: "/src/glsl" },
    ],
  },
});
