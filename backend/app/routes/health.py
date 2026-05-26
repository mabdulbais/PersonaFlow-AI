from __future__ import annotations

from fastapi import APIRouter

from app import __version__
from app.config import settings

router = APIRouter(tags=["meta"])


@router.get("/health")
async def health() -> dict[str, object]:
    return {
        "status": "ok",
        "version": __version__,
        "model": settings.anthropic_model,
        "anthropic_key_present": bool(settings.anthropic_api_key),
    }
