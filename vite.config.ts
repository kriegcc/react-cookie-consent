/// <reference types="vitest/config" />
import { resolve } from "path"

import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import dts from "vite-plugin-dts"

export default defineConfig({
  // need to be in-sync with paths aliases in tsconfig
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      "@demo": resolve(__dirname, "demo"),
    },
  },
  plugins: [react(), dts({ include: ["src"], exclude: ["demo"] })],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "ReactCookieConsent",
      fileName: (format) => `react-cookie-consent.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
  test: {
    // custom Vitest options
    watch: false,
    environment: "happy-dom",
    setupFiles: ["tests/setup.ts"],
    include: [
      "src/**/*.{test,spec}.{ts,tsx}",
      "tests/**/*.{test,spec}.{ts,tsx}",
      "demo/**/*.{test,spec}.{ts,tsx}",
    ],
  },
})
