import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cosmic: {
          950: "#05060a",
          900: "#080a11",
          850: "#0d101b",
          800: "#131726",
          700: "#1b2137",
          600: "#262e4c",
        },
        lime: {
          neon: "#00ff87",
          glow: "#10b981",
          accent: "#22c55e",
          soft: "#86efac",
        },
        violet: {
          nebula: "#8b5cf6",
          deep: "#6366f1",
          glow: "#a855f7",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        display: ["Outfit", "system-ui", "-apple-system", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      boxShadow: {
        "glow-lime": "0 0 25px -5px rgba(0, 255, 135, 0.35)",
        "glow-lime-lg": "0 0 45px -5px rgba(0, 255, 135, 0.45)",
        "glow-violet": "0 0 25px -5px rgba(139, 92, 246, 0.35)",
        "glow-violet-lg": "0 0 45px -5px rgba(139, 92, 246, 0.45)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "cosmic-gradient": "linear-gradient(180deg, #05060a 0%, #080a11 50%, #05060a 100%)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "spin-slow": "spin 20s linear infinite",
        "float": "float 6s ease-in-out infinite",
        "radar-sweep": "radar 4s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        radar: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
