from __future__ import annotations

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from slowapi import _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded

from app import __version__
from app.config import settings
from app.limiter import limiter
from app.routes import analyze, health, interview, profile, rewrite

app = FastAPI(
    title="PersonaFlow AI",
    version=__version__,
    description="Adaptive communication intelligence — FastAPI service.",
)

app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)


@app.exception_handler(ValueError)
async def value_error_handler(_request: Request, exc: ValueError) -> JSONResponse:
    return JSONResponse(
        status_code=400,
        content={"error": "invalid_request", "detail": str(exc)},
    )


app.include_router(health.router)
app.include_router(analyze.router)
app.include_router(rewrite.router)
app.include_router(interview.router)
app.include_router(profile.router)
