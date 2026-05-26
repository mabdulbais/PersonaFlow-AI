# PersonaFlow AI — Pitch Deck

> Course presentation deck. Editorial draft.
> Slide breaks marked with `---`. Speaker notes follow each slide as a blockquote.
> Tone: considered, restrained, italic serif for emotional weight. Short sentences. Never cute, never breathless, never salesy.

---

## 01 · Cover

# Communication, *attuned.*

PersonaFlow AI · Adaptive intelligence for human communication.

*Course prototype · 2026*

> Speaker notes: Open quietly. Don't oversell. The thesis lives in the title — "attuned" not "improved," not "optimized." We are listening to people, not correcting them.

---

## 02 · The friction

**86%** of workplace failures trace back to miscommunication.
**7 seconds** is the average time before tone forms a first impression.
**1 in 4** professionals say they avoid conversations they need to have.

> *Most messages aren't read for what they say. They're read for how they sound.*

> Speaker notes: Three numbers, one quiet pull-quote. Don't editorialize — let the statistics speak. The pull-quote is the entire thesis of the problem space: tone is the channel, not the carrier.

---

## 03 · Why now

Remote work made text the medium of consequence.
Models got good enough to read tone, not just spelling.
Most tools still autocomplete. Almost none *interpret.*

> Speaker notes: The "why now" is the convergence of two curves — distributed work and instruction-following models. The market is for interpretation, not correction. Frame this as the negative space competitors aren't in.

---

## 04 · The solution

PersonaFlow reads **tone**, **emotion**, and **intent** — then rewrites your words to land exactly how you mean them.

*Five intelligences. One quiet engine.*

> Speaker notes: One sentence. Don't elaborate. The five intelligences come next.

---

## 05 · Five capabilities

| | | |
|---|---|---|
| **i.** | Adaptive tone engine     | Eight registers — formal, empathetic, leadership, diplomatic, direct, encouraging, apologetic, persuasive. |
| **ii.** | Personality intelligence | Reads assertiveness, empathy, clarity, confidence from a single message. |
| **iii.** | Real-time coaching       | Whisper-quiet feedback during emails, meetings, interviews. Never autocomplete. |
| **iv.** | Emotion & sentiment radar | Surfaces frustration, confusion, stress, confidence — in their words and yours. |
| **v.** | Multilingual adaptation   | English, اردو, العربية. Cultural register, not literal translation. |

> Speaker notes: Walk left-to-right. The ordering is intentional: tone is the hook, personality is the depth, real-time is the daily-use, sentiment is the listening, multilingual is the moat.

---

## 06 · The product

Four working modules — *each one ships today.*

**01 · Message Studio** — paste any message, get a 0–100 communication score, tone reading, emotional intensities, four personality dimensions, strengths, suggestions, and a refined rewrite.

**02 · Tone Library** — one source, eight rewritten versions, each with a one-sentence rationale.

**03 · Interview Coach** — pick a role, generate a behavioral question, write your answer, receive scored feedback and a STAR-framed model answer.

**04 · Personality Insights** — your communication profile, aggregated.

> Speaker notes: This slide is where the demo happens. Open the prototype live — Message Studio first (the wow moment is the refined rewrite), then Tone Library (the one-click magic), then Interview Coach (the practical value). Insights is a bonus.

---

## 07 · The multilingual edge

A leadership memo in Urdu should land like a leadership memo — not like an English sentence translated word for word.

PersonaFlow ships **English, Urdu, and Arabic** as first-class citizens. Hierarchy, formality, and cultural register adapt per language. RTL is shipped, not retrofitted.

> Speaker notes: This is the differentiator slide. Most communication AI is English-mono. We chose three languages with three different conventions for politeness, authority, and indirection. This is also where the team's lived experience matters — frame as authentic, not academic.

---

## 08 · Architecture

```
┌──────────────┐   ┌──────────────┐   ┌──────────────┐   ┌───────────┐
│ Next.js UI   │ ▸ │ Next.js API  │ ▸ │ FastAPI      │ ▸ │ Anthropic │
│ (React 18)   │   │ proxy route  │   │ AI engine    │   │ API       │
└──────────────┘   └──────────────┘   └──────────────┘   └───────────┘
                                              │
                                              ▼
                                       ┌──────────────┐
                                       │ Postgres +   │
                                       │ Pinecone     │
                                       └──────────────┘
```

The browser never sees the API key. Prompt engineering lives in FastAPI. Pinecone holds tone memory.

> Speaker notes: One sentence per layer. The architectural point is the separation: UI is dumb, Next.js is the auth boundary, FastAPI is the brain, Anthropic is the model. Each layer is replaceable.

---

## 09 · Trust & ethics

| | | |
|---|---|---|
| **i.** | Assist, never author.       | PersonaFlow suggests. You decide. The final voice is always yours. |
| **ii.** | Privacy is foundational.    | No training on user messages. End-to-end encrypted at rest. |
| **iii.** | Refuses manipulation.      | Will not generate coercive, deceptive, or dark-pattern communication. |
| **iv.** | Audits its own bias.        | Tone models evaluated across gender, culture, language on every release. |

*These are not marketing claims. They are constraints on the architecture.*

> Speaker notes: Slow down here. Read each principle. The italicized line at the bottom is load-bearing — the difference between an ethics statement and an ethics commitment is whether it shows up in the codebase. We can answer that.

---

## 10 · Who it serves

Executives · Support teams · Job seekers · Sales · HR & people teams · Remote teams · Students · Founders.

*Anyone whose words have stakes.*

> Speaker notes: One breath. Don't list every segment slowly — the volume itself is the point. The italic line is the actual market definition.

---

## 11 · Business model

**Freemium consumer.** Three analyses a day, single-tone rewrites, English only. Funnel into Pro.

**Pro individual.** All tones, all languages, unlimited analyses, profile history. Target price band: $10–$15 / month.

**Team.** Shared style guides, team voice fingerprints, collaborative review. Per-seat pricing.

**Enterprise.** SSO, audit logs, regional data residency, on-prem option. For support orgs, HR teams, customer-experience platforms.

**Multilingual licensing.** Tone APIs licensed to support-platform vendors and localization tools whose translation pipelines stop at words.

> Speaker notes: Don't commit to specific numbers. Frame as where the levers are, not as a financial projection. The multilingual licensing line is the strongest non-obvious wedge — most pitch decks would miss it.

---

## 12 · Roadmap

**Shipped.**
Four modules. Three languages. Server-side AI calls. FastAPI service. Design system.

**Next.**
Auth + persistence (save analyses, build a real profile over time). Browser extension for Gmail and Slack. Conversation-level analysis (whole email threads, not single messages).

**Stretch.**
Voice tone (Whisper + audio features). Meeting transcript summarizer. Team compatibility analysis. Negotiation simulator.

> Speaker notes: Shipped → next → stretch. The "shipped" column is the credibility. The "next" column is the 90-day plan. The "stretch" column is the long arc — don't promise it, but signal direction.

---

## 13 · The team

**Abdul Bais**

*Solo course project.*

> Speaker notes: Fill in the one-line context before the talk. Lean into the breadth — full-stack, design, AI, multilingual — and the multilingual angle is the most credible if it's grounded in lived experience.

---

## 14 · Closing

The prototype is live.
Try Message Studio. Try the Tone Library. Practice an interview.

We're looking for:
**design critique** · **testers in Urdu and Arabic** · **a partner support platform for a small pilot**

# Communication, *attuned.*

> Speaker notes: End on the title. The "we're looking for" is the ask — make it specific. Design critique reads as humble. Testers in two non-English languages signals the multilingual commitment. The partner pilot is the conversation you actually want.

---

## Appendix · One-line elevator

PersonaFlow AI reads tone, emotion, and intent — then rewrites your words to land exactly how you mean them.

## Appendix · Tone of voice

Considered. Editorial. Restrained. Short sentences. Italic serif for emotional weight. Never cute, never breathless, never salesy. The voice of the deck is the voice of the product.
