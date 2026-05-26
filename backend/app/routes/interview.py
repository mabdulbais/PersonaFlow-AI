from __future__ import annotations

from fastapi import APIRouter, Request

from app.limiter import RATE_LIMIT, limiter
from app.prompts import interview_feedback_prompt, interview_question_prompt
from app.routes._common import call_or_raise
from app.schemas import (
    InterviewFeedbackRequest,
    InterviewFeedbackResponse,
    InterviewQuestionRequest,
    InterviewQuestionResponse,
)

router = APIRouter(prefix="/interview", tags=["interview"])


@router.post("/question", response_model=InterviewQuestionResponse)
@limiter.limit(RATE_LIMIT)
async def question(
    request: Request, payload: InterviewQuestionRequest
) -> InterviewQuestionResponse:
    return await call_or_raise(
        interview_question_prompt(payload.role, payload.language),
        InterviewQuestionResponse,
        max_tokens=400,
    )


@router.post("/feedback", response_model=InterviewFeedbackResponse)
@limiter.limit(RATE_LIMIT)
async def feedback(
    request: Request, payload: InterviewFeedbackRequest
) -> InterviewFeedbackResponse:
    return await call_or_raise(
        interview_feedback_prompt(
            payload.role, payload.question, payload.answer, payload.language
        ),
        InterviewFeedbackResponse,
        max_tokens=1800,
    )
