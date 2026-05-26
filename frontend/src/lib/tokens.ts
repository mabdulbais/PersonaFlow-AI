// JS-side mirror of the design tokens defined in app/globals.css and
// tailwind.config.ts. Used for inline styles that interpolate colors
// (gradients, box-shadows, dynamic opacity, etc.).
//
// Keep this in sync with docs/design-system.md and globals.css.

export const C = {
  bg:        "#0A0E18",
  surface:   "#11162A",
  card:      "#161B30",
  cardHi:    "#1D2440",
  line:      "#2A3050",
  lineSoft:  "#1A1F38",
  text:      "#E8ECF5",
  text2:     "#A3AAC2",
  text3:     "#6B7280",
  accent:    "#6366F1",
  accentSft: "#6366F122",
  sage:      "#10B981",
  amber:     "#F59E0B",
  ink:       "#94A3B8",
  rose:      "#EF4444",
} as const;
