# Design System

The PersonaFlow visual language — codename **Cobalt**. Every new component and every piece of marketing copy should pass these constraints.

## Aesthetic direction

**Modern dark, no editorial flourish.** Reads like a 2025 AI tool — Linear, Vercel — not a magazine. Cool charcoal background, a single electric-indigo accent that punctuates rather than decorates, geometric sans typography end-to-end. No italic, no serif, no warmth.

## Colors

### Tokens

```css
--bg:         #0A0E18;  /* primary background — cool charcoal */
--surface:    #11162A;  /* secondary surface */
--card:       #161B30;  /* card background */
--card-hi:    #1D2440;  /* elevated card */
--line:       #2A3050;  /* borders */
--line-soft:  #1A1F38;  /* hairline dividers */

--text:       #E8ECF5;  /* primary text — clean white */
--text-2:     #A3AAC2;  /* secondary text */
--text-3:     #6B7280;  /* tertiary text / labels */

--accent:     #6366F1;  /* electric indigo — single accent */
--accent-sft: #6366F122;/* indigo, 22% alpha */

--sage:       #10B981;  /* success / strengths only */
--amber:      #F59E0B;  /* warning / suggestions only */
--ink:        #94A3B8;  /* cool slate, sparingly */
--rose:       #EF4444;  /* errors only */
```

### Rules

- Indigo is the **only** decorative accent. Never introduce orange, purple, green, or any second accent for visual variety.
- Sage = positive findings. Amber = improvements needed. Don't use them ornamentally.
- Surface layering: `bg → surface → card → card-hi`. Borders, not shadows, separate layers.

## Typography

### Fonts

- **Sans (everything):** `Geist Sans` via the `geist` npm package — weights 300, 400, 500, 600, 700
- **Mono (numbers, labels, codes):** `Geist Mono`
- **Urdu:** `Noto Nastaliq Urdu` (Google Fonts)
- **Arabic:** `Noto Naskh Arabic` (Google Fonts)

### Forbidden

- No italic serif anywhere. Use weight and color for emphasis, not slant.
- No system-ui as a primary font (Geist is required for chrome).
- No second sans-serif. One sans family for the whole product.

### Pairings

| Element | Font | Weight | Size | Notes |
|---|---|---|---|---|
| Page title (TopBar h1) | Geist Sans | 600 | 36px | `tracking-tight` |
| Hero title (landing) | Geist Sans | 300 | clamp(56px, 11vw, 156px) | `letter-spacing: -0.045em` |
| Section title | Geist Sans | 600 | clamp(34px, 5vw, 64px) | `tracking-tight` |
| Card title / empty state | Geist Sans | 600 | 20-22px | `tracking-tight` |
| Body | Geist Sans | 400 | 14-17px | `line-height: 1.5-1.7` |
| Label / eyebrow | Geist Sans | 500 | 10-11px | `uppercase`, `tracking-[0.22-0.3em]` |
| Numbers / stats | Geist Mono | 300 | varies | feels like data, not editorial |
| AI-generated text | Geist Sans | 300 | 15-17px | light weight gives the quote feel — no italic |

### Tone (of voice)

Considered. Restrained. Decisive. Short sentences. Never cute, never breathless, never salesy.

## Iconography

- **lucide-react only.** Single consistent family.
- **Never emoji as icons.** Decorative emoji in copy is also avoided.
- Default stroke width: 2.
- UI chrome icons: 11-14px. Feature icons: 16-22px.

## Spacing

- 4 / 8 / 16 / 24 / 32 / 48 / 64 / 96 / 128 grid.
- Card padding: typically 24-32px desktop, 18-22px mobile.
- Section padding: 88-140px vertical desktop, 64-88px mobile.

## Borders & lines

- 1px solid `--line` for cards and dividers.
- Hairline dividers between rows use `--line-soft`.
- Border radius: 6-14px for cards. Pills are fully rounded (999px).

## Motion

- Section reveal: 800ms `cubic-bezier(0.16, 1, 0.3, 1)` fade-up with `IntersectionObserver`.
- Hero stagger: opacity + 20px translateY, 0.1s/0.25s/0.45s/0.65s delays.
- Crossfade for tone changes: 220ms.
- Loading: `Loader2` spin from lucide-react.
- Respect `prefers-reduced-motion`.

## Composition patterns

### Section header

```
[mono number]  [eyebrow label]  ────────────────────
01             CHAPTER LABEL
```

### Score display

```
88    /100
↑ Geist Mono, light weight, 88px, tracking-tighter
```

### Pill

```
[5px dot]  EYEBROW TEXT
1px border, rounded-full, 10.5px text, 0.18em tracking
```

### Quote / AI output card

```
[gradient backdrop with indigo glow in corner]
Wand2 icon · REFINED VERSION
"<light-weight Geist text, slightly larger size>"
```

## Backgrounds

- Subtle SVG noise overlay across the whole page (~2.5% opacity).
- Radial **indigo** gradient in heroes and CTA sections (50% opacity, 800-900px circle).
- No purple gradients, no animated mesh gradients, no glassmorphism.

## Layout primitives

- Sidebar nav (300px) with numbered modules on desktop.
- Top tab strip on mobile.
- Max content width: 1240px.
- Asymmetric grids when there are 5+ items (don't force a 3×n).

## Favicon / brand mark

The mark is a solid indigo circle with a smaller bg-colored circle concentric inside — see `frontend/app/icon.svg` and the Sidebar brand. Inner circle is exactly the page background color so it reads as a void, not a dot.
