# Design System

The PersonaFlow visual language. Every new component and every piece of marketing copy should pass these constraints.

## Aesthetic direction

**Editorial dark.** Reads like a thoughtful magazine about communication, not a SaaS dashboard. Restraint is the point. Bold typography, hairline borders, generous whitespace, a single accent color that punctuates rather than decorates.

## Colors

### Tokens

```css
--bg:        #0E0E10;  /* primary background — deep ink */
--surface:   #16161A;  /* secondary surface */
--card:      #1C1C22;  /* card background */
--card-hi:   #22222A;  /* elevated card */
--line:      #2A2A33;  /* borders */
--line-soft: #1F1F26;  /* hairline dividers */

--text:      #F5F1E8;  /* primary text — warm cream */
--text-2:    #A8A29B;  /* secondary text */
--text-3:    #6B6760;  /* tertiary text / labels */

--accent:    #FF6B47;  /* coral — single accent */
--accent-sft:#FF6B4722;/* coral, 22% alpha */

--sage:      #94A87A;  /* success / strengths only */
--amber:     #D4A574;  /* warning / suggestions only */
--ink:       #7D8FA8;  /* cool secondary, sparingly */
--rose:      #C97B7B;  /* errors only */
```

### Rules

- Coral is the **only** decorative accent. Never introduce purple, blue, or green for visual variety.
- Sage = positive findings. Amber = improvements needed. Don't use them ornamentally.
- Surface layering: `bg → surface → card → card-hi`. Borders, not shadows, separate layers.

## Typography

### Fonts (Google Fonts)

- **Display:** `Instrument Serif` — italic for emotional weight
- **Body / UI:** `Manrope` — weights 300, 400, 500, 600
- **Urdu:** `Noto Nastaliq Urdu`
- **Arabic:** `Noto Naskh Arabic`

### Forbidden

Inter · Roboto · Arial · Helvetica · system-ui as primary fonts. Always.

### Pairings

| Element | Font | Weight | Size | Notes |
|---|---|---|---|---|
| Page title | Manrope + Instrument Serif italic | 300 | clamp(34px, 5vw, 64px) | Mix: "Communication, *attuned.*" |
| H1 hero | Manrope | 300 | clamp(56px, 11vw, 156px) | letter-spacing: -0.045em |
| Section title | Manrope | 300 | clamp(34px, 5vw, 64px) | tracking-tight |
| Card title | Instrument Serif italic | 400 | 32px | for refined / AI output |
| Body | Manrope | 400 | 14-17px | line-height 1.5-1.7 |
| Label / eyebrow | Manrope | 500 | 10-11px | uppercase, tracking 0.22-0.3em |
| Numbers / stats | Instrument Serif italic | 400 | varies | gives weight |
| AI-generated text | Instrument Serif italic | 400 | 15-17px | literary feel |

### Tone

Considered. Editorial. Restrained. Short sentences. Never cute, never breathless, never salesy.

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
[serif italic number]  [eyebrow label]  ────────────────────
01                     CHAPTER LABEL
```

### Score display

```
88   /100
↑ serif italic, large
```

### Pill

```
[5px dot]  EYEBROW TEXT
1px border, rounded-full, 10.5px text, 0.18em tracking
```

### Quote / AI output card

```
[gradient backdrop with coral glow in corner]
Wand2 icon · REFINED VERSION
"<italic serif text>"
```

## Backgrounds

- Subtle SVG noise overlay across the whole page (~2.5% opacity)
- Radial coral gradient in heroes and CTA sections (50% opacity, 800-900px circle)
- No purple gradients. No animated mesh gradients. No glassmorphism.

## Layout primitives

- Sidebar nav (300px) with numbered modules on desktop
- Top tab strip on mobile
- Max content width: 1240px
- Asymmetric grids when there are 5+ items (don't force a 3×n)
