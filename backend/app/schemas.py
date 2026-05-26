"""Pydantic v2 schemas — must stay in sync with frontend/src/lib/schemas.ts.

This file is the single source of truth on the backend side. The TypeScript
zod schemas are the mirror used by the Next.js proxy until it is removed.
"""
from __future__ import annotations

from enum import StrEnum

from pydantic import BaseModel, ConfigDict, Field


class Language(StrEnum):
    EN = "en"
    UR = "ur"
    AR = "ar"


class ToneKey(StrEnum):
    FORMAL = "formal"
    EMPATHETIC = "empathetic"
    LEADERSHIP = "leadership"
    DIPLOMATIC = "diplomatic"
    DIRECT = "direct"
    ENCOURAGING = "encouraging"
    APOLOGETIC = "apologetic"
    PERSUASIVE = "persuasive"


class _Model(BaseModel):
    model_config = ConfigDict(extra="forbid", str_strip_whitespace=True)


# ────────────────────────── analyze ──────────────────────────

class AnalyzeRequest(_Model):
    text: str = Field(min_length=1, max_length=8000)
    language: Language


class Emotion(_Model):
    name: str
    intensity: int = Field(ge=0, le=100)


class PersonalitySignals(_Model):
    assertiveness: int = Field(ge=0, le=100)
    empathy:       int = Field(ge=0, le=100)
    clarity:       int = Field(ge=0, le=100)
    confidence:    int = Field(ge=0, le=100)


class AnalyzeResponse(_Model):
    communicationScore: int = Field(ge=0, le=100)
    currentTone: str
    emotions: list[Emotion]
    personality: PersonalitySignals
    strengths: list[str]
    suggestions: list[str]
    refinedMessage: str
    refinedTone: str


# ────────────────────────── rewrite ──────────────────────────

class RewriteRequest(_Model):
    text: str = Field(min_length=1, max_length=8000)
    tone: ToneKey
    language: Language


class RewriteResponse(_Model):
    rewritten: str
    rationale: str


# ───────────────────────── interview ─────────────────────────

class InterviewQuestionRequest(_Model):
    role: str = Field(min_length=1, max_length=120)
    language: Language


class InterviewQuestionResponse(_Model):
    question: str


class InterviewFeedbackRequest(_Model):
    role: str = Field(min_length=1, max_length=120)
    question: str = Field(min_length=1, max_length=2000)
    answer: str = Field(min_length=1, max_length=8000)
    language: Language


class InterviewFeedbackResponse(_Model):
    score: int = Field(ge=0, le=100)
    verdict: str
    strengths: list[str]
    improvements: list[str]
    refinedAnswer: str


# ──────────────────────── shared API ─────────────────────────

class ErrorResponse(_Model):
    error: str
    detail: str | None = None
