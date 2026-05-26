// JS-side mirror of the design tokens defined in app/globals.css and
// tailwind.config.ts. Used for inline styles that interpolate colors
// (gradients, box-shadows, dynamic opacity, etc.).
//
// Keep this in sync with docs/design-system.md and globals.css.

export const C = {
  bg:        "#0E0E10",
  surface:   "#16161A",
  card:      "#1C1C22",
  cardHi:    "#22222A",
  line:      "#2A2A33",
  lineSoft:  "#1F1F26",
  text:      "#F5F1E8",
  text2:     "#A8A29B",
  text3:     "#6B6760",
  accent:    "#FF6B47",
  accentSft: "#FF6B4722",
  sage:      "#94A87A",
  amber:     "#D4A574",
  ink:       "#7D8FA8",
  rose:      "#C97B7B",
} as const;
