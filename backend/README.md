# Backend — FastAPI

The AI service layer. Owns prompts, calls the Anthropic API, returns
structured JSON. The Next.js frontend forwards browser requests here once
`FASTAPI_BASE_URL` is set (see `frontend/src/lib/anthropic-server.ts`).

## Requirements

- Python **3.11+**
- An Anthropic API key

## Setup

```bash
cd backend
python3.11 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt        # or:  pip install -e ".[dev]"
cp .env.example .env                   # then paste your ANTHROPIC_API_KEY
python -m app                          # → http://localhost:8000
```

Once running, the OpenAPI docs are at `http://localhost:8000/docs`.

## Environment

| Variable | Default | Purpose |
|---|---|---|
| `ANTHROPIC_API_KEY` | — | Required at request time. Read inside `anthropic_client.py` only. |
| `ANTHROPIC_MODEL` | `claude-sonnet-4-6` | Model used by every route. |
| `CORS_ORIGINS` | `http://localhost:3000` | Comma-separated allowed origins. |
| `RATE_LIMIT_PER_MINUTE` | `30` | Per-IP rate limit, applied to every AI route. |
| `HOST` / `PORT` | `0.0.0.0` / `8000` | Dev-server bind. |

## Endpoints

| Method | Path                          | Body                          | Response                       |
|--------|-------------------------------|-------------------------------|--------------------------------|
| GET    | `/health`                     | —                             | service status                 |
| POST   | `/analyze`                    | `AnalyzeRequest`              | `AnalyzeResponse`              |
| POST   | `/rewrite`                    | `RewriteRequest`              | `RewriteResponse`              |
| POST   | `/interview/question`         | `InterviewQuestionRequest`    | `InterviewQuestionResponse`    |
| POST   | `/interview/feedback`         | `InterviewFeedbackRequest`    | `InterviewFeedbackResponse`    |
| GET    | `/profile/{user_id}`          | —                             | `501` until Priority 4 lands   |

Schemas are defined in `app/schemas.py` and must stay in sync with
`frontend/src/lib/schemas.ts`.

## Layout

```
backend/
├── pyproject.toml
├── requirements.txt
├── .env.example
└── app/
    ├── __init__.py
    ├── __main__.py            python -m app
    ├── main.py                FastAPI app + middleware + router registration
    ├── config.py              Settings via pydantic-settings
    ├── limiter.py             slowapi limiter instance
    ├── schemas.py             Pydantic v2 request/response models
    ├── prompts.py             Pattern A/B/C prompt templates
    ├── lang.py                langInstruction (en/ur/ar)
    ├── anthropic_client.py    lazy AsyncAnthropic + call_llm()
    ├── extract_json.py        parse JSON object from model output
    ├── structured_call.py     call → extract → pydantic validate
    └── routes/
        ├── health.py          GET /health
        ├── analyze.py         POST /analyze
        ├── rewrite.py         POST /rewrite
        ├── interview.py       POST /interview/{question,feedback}
        ├── profile.py         GET /profile/{user_id} — 501 stub
        └── _common.py         call_or_raise(): error → HTTP mapping
```

## Architecture

Every route is the same shape:

1. FastAPI deserializes + validates the request body against a Pydantic model.
2. The route builds a prompt from `app/prompts.py`.
3. `call_or_raise` invokes the model via `app/anthropic_client.py`, parses
   the JSON from the model's text output, validates with the response
   model, and maps any error to a meaningful HTTP status (`502` for AI
   failures, `503` if the key is missing, `400` for validation errors).
4. The validated payload is returned as JSON.

Rate limiting (`slowapi`) is applied per-route at `RATE_LIMIT_PER_MINUTE`.
The key function is the remote IP, which is fine behind a reverse proxy that
sets `X-Forwarded-For` — production deployments should configure that.

## Not yet wired (Priority 4+)

- Persistence (Postgres via SQLAlchemy 2.0): user history, saved analyses,
  cross-session profile aggregation. The `/profile/{user_id}` endpoint is
  a 501 stub until this lands.
- Vector storage (Pinecone): RAG over the user's past communications.
- Auth (Clerk) integration: routes are currently unauthenticated.

## Development

```bash
ruff check app/                    # lint
ruff format app/                   # format
python -m pytest                   # tests (once they exist)
python -m compileall app/          # quick syntax check
```
