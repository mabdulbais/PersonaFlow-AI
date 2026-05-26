import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg:        "#0A0E18",
        surface:   "#11162A",
        card:      "#161B30",
        "card-hi": "#1D2440",
        line:      "#2A3050",
        "line-soft": "#1A1F38",
        text:      "#E8ECF5",
        "text-2":  "#A3AAC2",
        "text-3":  "#6B7280",
        accent:    "#6366F1",
        "accent-sft": "#6366F122",
        sage:      "#10B981",
        amber:     "#F59E0B",
        ink:       "#94A3B8",
        rose:      "#EF4444",
      },
      fontFamily: {
        sans:    ["var(--font-geist-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono:    ["var(--font-geist-mono)", "ui-monospace", "monospace"],
        urdu:    ["var(--font-noto-nastaliq)", "serif"],
        arabic:  ["var(--font-noto-naskh)", "serif"],
      },
      letterSpacing: {
        eyebrow: "0.25em",
        label:   "0.18em",
      },
      maxWidth: {
        content: "1240px",
      },
      transitionTimingFunction: {
        "out-soft": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
