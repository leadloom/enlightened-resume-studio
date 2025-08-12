import type { Config } from "tailwindcss";
export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {50:"#f6f9ff",100:"#e8f0fe",200:"#dbe8fd",300:"#c7dbfb",400:"#9cc0f7",500:"#4a90e2",600:"#2f6fc1",700:"#244f8c",800:"#1e3b66",900:"#182a49"},
        graylite: "#f5f7fa",
        dark: "#111827"
      },
      borderRadius: { "2xl": "1rem" }
    }
  },
  plugins: []
} satisfies Config;