# PersonaFlow AI — Frontend

Next.js 14 (App Router) port of the original `PersonaFlowAI.jsx` prototype.
All AI calls now run server-side via `/api/*` routes — the Anthropic key never
reaches the browser.

## Setup

```bash
cd frontend
npm install
cp .env.example .env.local      # then paste your ANTHROPIC_API_KEY
npm run dev                     # → http://localhost:3000
```

`ANTHROPIC_API_KEY` must be present at runtime. It is read inside the API
route handlers only — there is no `NEXT_PUBLIC_*` exposure anywhere.

## Scripts

| Command           | Purpose                          |
|-------------------|----------------------------------|
| `npm run dev`     | Dev server on :3000              |
| `npm run build`   | Production build                 |
| `npm start`       | Run the production build         |
| `npm run typecheck` | `tsc --noEmit`                 |
| `npm run lint`    | `next lint`                      |

## Layout

```
frontend/
├── app/
│   ├── api/
│   │   ├── analyze/route.ts          POST → AnalyzeResponse
│   │   ├── rewrite/route.ts          POST → RewriteResponse
│   │   └── interview/
│   │       ├── question/route.ts     POST → InterviewQuestionResponse
│   │       └── feedback/route.ts     POST → InterviewFeedbackResponse
│   ├── globals.css                   CSS vars + base resets
│   ├── layout.tsx                    fonts + html shell
│   └── page.tsx                      renders <Workspace />
└── src/
    ├── Workspace.tsx                 client root: state + module routing
    ├── components/
    │   ├── chrome/                   Sidebar · MobileNav · TopBar · nav data
    │   └── ui/                       Pill · SectionLabel · Bar · EmotionDot · Score · panels
    ├── modules/
    │   ├── MessageStudio.tsx         01 · analyze + refine
    │   ├── ToneLibrary.tsx           02 · 8-tone rewriting
    │   ├── InterviewCoach.tsx        03 · interview practice
    │   └── InsightsView.tsx          04 · personality profile
    └── lib/
        ├── anthropic-server.ts       server-only Anthropic client
        ├── api-client.ts             typed fetch wrappers
        ├── extract-json.ts           parse JSON from model text
        ├── lang.ts                   language helpers + langInstruction
        ├── prompts.ts                centralized prompt templates
        ├── route-helpers.ts          shared request validation + error mapping
        ├── run-structured-call.ts    call the LLM → extract JSON → zod parse
        ├── schemas.ts                zod schemas + inferred TS types
        ├── tokens.ts                 JS mirror of design tokens
        └── tones.ts                  tone definitions (data only, no icons)
```

## Architecture

The browser only ever calls `/api/*`. Inside each route handler:

1. `readJSON` validates the request body against a zod schema from `lib/schemas.ts`.
2. The corresponding prompt is built from `lib/prompts.ts`.
3. `runStructuredCall` calls the LLM via `lib/anthropic-server.ts`, extracts the JSON
   from the model output, and re-validates with the response schema.
4. The validated payload is returned as JSON.

`lib/anthropic-server.ts` is the single seam for swapping to the FastAPI
backend later. When `FASTAPI_BASE_URL` is set, that file should forward
requests to FastAPI instead of calling Anthropic directly — and no other
file needs to change.

## Design tokens

Tokens are defined in three places that must stay in sync:

- `app/globals.css` — CSS custom properties
- `tailwind.config.ts` — Tailwind palette
- `src/lib/tokens.ts` — JS `C` constant for inline styles

Source of truth: `docs/design-system.md`.

## Languages

Three supported: English, Urdu, Arabic. The `langInstruction` helper in
`lib/lang.ts` is injected into every prompt; `isRTL(lang)` flips the `dir`
attribute on user-visible text. The HTML shell stays `dir="ltr"` so the
sidebar layout doesn't mirror — that's intentional, per the prototype.

## Model

Default model is `claude-sonnet-4-6`. Override via `ANTHROPIC_MODEL` in
`.env.local` if needed.
