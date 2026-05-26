from __future__ import annotations

from typing import TypeVar

from pydantic import BaseModel

from app.anthropic_client import call_llm
from app.extract_json import extract_json

T = TypeVar("T", bound=BaseModel)


async def run_structured_call(
    prompt: str,
    response_model: type[T],
    *,
    max_tokens: int = 1600,
    system: str | None = None,
) -> T:
    """Call the LLM, extract a JSON object from the response, validate with Pydantic."""
    raw = await call_llm(prompt, system=system, max_tokens=max_tokens)
    parsed = extract_json(raw)
    return response_model.model_validate(parsed)
