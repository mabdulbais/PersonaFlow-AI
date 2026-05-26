# Screenshots

This directory holds the imagery referenced from the root [README.md](../../README.md). Capture these before pushing the repo public — they're the single biggest first-impression signal for a GitHub AI product.

## What to capture

| File | What it shows | Notes |
|---|---|---|
| `hero.png`               | Workspace landing on Message Studio with a sample message analyzed. | 2400×1500 (2× retina). Make sure the score card, emotion dots, personality bars, and refined rewrite are all in frame. |
| `01-message-studio.png`  | Message Studio after a real analysis.                              | Same as hero, but cropped tighter to the right column (the intelligence panel). |
| `02-tone-library.png`    | Tone Library with a tone selected and the rewritten card visible.  | Use the prototype's sample message. Pick "Diplomatic" — it has the most visible delta from the input. |
| `03-interview-coach.png` | Interview Coach mid-feedback (showing score, strengths, sharpening, model answer). | Use the default Product Manager role. |
| `04-insights.png`        | Personality Insights with the four dimension bars filled in.       | Capture *after* running an analysis in Message Studio so the panel has data. |
| `multilingual.png`       | Same module rendered in Urdu *and* Arabic, side by side.           | Use Tone Library — the refined card in italic serif Nastaliq/Naskh is the strongest visual. |
| `tone-shifter.gif`       | Short GIF of the Tone Library cycling through 3-4 tones.           | ~6 seconds. 1200px wide. Keep under 4 MB so GitHub renders it inline. |

## How to capture

1. Run the frontend: `cd frontend && npm run dev`
2. Set your browser to 1280×800 (use the responsive design mode at exactly that viewport so screenshots are consistent).
3. Use the prototype sample message (the "missed report" example) for Message Studio and Tone Library — it gives strong, recognizable AI output.
4. For the GIF: macOS users can use [Gifox](https://gifox.app) or `ffmpeg`. Aim for 20fps, 1200px width, 6-second loop.

## Format

PNG for stills, GIF (or short MP4 if file size is a problem) for motion. Avoid JPEG — the editorial dark UI compresses badly.

## Where they're referenced

Update [README.md](../../README.md) to point to these:

- Replace the commented-out `<!-- ![PersonaFlow AI — hero](docs/screenshots/hero.png) -->` line with the real image tag.
- Optionally add a "Gallery" section after "Why it's interesting" with the four module shots in a 2×2 grid.
