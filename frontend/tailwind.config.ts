import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg:        "#0E0E10",
        surface:   "#16161A",
        card:      "#1C1C22",
        "card-hi": "#22222A",
        line:      "#2A2A33",
        "line-soft": "#1F1F26",
        text:      "#F5F1E8",
        "text-2":  "#A8A29B",
        "text-3":  "#6B6760",
        accent:    "#FF6B47",
        "accent-sft": "#FF6B4722",
        sage:      "#94A87A",
        amber:     "#D4A574",
        ink:       "#7D8FA8",
        rose:      "#C97B7B",
      },
      fontFamily: {
        sans:    ["var(--font-manrope)", "ui-sans-serif"],
        serif:   ["var(--font-instrument-serif)", "ui-serif"],
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
