from __future__ import annotations

from fastapi import APIRouter, Request

from app.limiter import RATE_LIMIT, limiter
from app.prompts import analyze_prompt
from app.routes._common import call_or_raise
from app.schemas import AnalyzeRequest, AnalyzeResponse

router = APIRouter(tags=["analyze"])


@router.post("/analyze", response_model=AnalyzeResponse)
@limiter.limit(RATE_LIMIT)
async def analyze(request: Request, payload: AnalyzeRequest) -> AnalyzeResponse:
    return await call_or_raise(
        analyze_prompt(payload.text, payload.language),
        AnalyzeResponse,
        max_tokens=1800,
    )
