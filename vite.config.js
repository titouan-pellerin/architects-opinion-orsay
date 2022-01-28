import { defineConfig } from "vite";
import glsl from "vite-plugin-glsl";

export default defineConfig({
  server: {
    port: "8080",
    https: false,
    open: true,
  },
  assetsInclude: ["**/*.gltf"],
  plugins: [glsl()],

  resolve: {
    alias: [
      { find: "@js", replacement: "/src/js" },
      { find: "@styles", replacement: "/src/styles" },
      { find: "@glsl", replacement: "/src/glsl" },
      { find: "@assets", replacement: "/src/assets" },
    ],
  },
  rollupOptions: {},
});
