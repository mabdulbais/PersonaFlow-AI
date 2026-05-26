from __future__ import annotations

from fastapi import APIRouter, Request

from app.limiter import RATE_LIMIT, limiter
from app.prompts import rewrite_prompt
from app.routes._common import call_or_raise
from app.schemas import RewriteRequest, RewriteResponse

router = APIRouter(tags=["rewrite"])


@router.post("/rewrite", response_model=RewriteResponse)
@limiter.limit(RATE_LIMIT)
async def rewrite(request: Request, payload: RewriteRequest) -> RewriteResponse:
    return await call_or_raise(
        rewrite_prompt(payload.text, payload.tone, payload.language),
        RewriteResponse,
        max_tokens=1200,
    )
