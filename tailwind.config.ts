import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark"],
  },
} satisfies Config;
