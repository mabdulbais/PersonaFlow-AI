from __future__ import annotations

from typing import TypeVar

from fastapi import HTTPException
from pydantic import BaseModel, ValidationError

from app.extract_json import JSONExtractionError
from app.structured_call import run_structured_call

T = TypeVar("T", bound=BaseModel)


async def call_or_raise(
    prompt: str,
    response_model: type[T],
    *,
    max_tokens: int = 1600,
) -> T:
    """Wrap run_structured_call with HTTP-friendly error mapping."""
    try:
        return await run_structured_call(prompt, response_model, max_tokens=max_tokens)
    except JSONExtractionError as e:
        raise HTTPException(
            status_code=502,
            detail={"error": "model_output_not_json", "detail": str(e)},
        ) from e
    except ValidationError as e:
        raise HTTPException(
            status_code=502,
            detail={"error": "model_output_invalid", "detail": e.errors(include_url=False)},
        ) from e
    except RuntimeError as e:
        raise HTTPException(
            status_code=503,
            detail={"error": "service_unavailable", "detail": str(e)},
        ) from e
    except Exception as e:  # pragma: no cover — fallback for SDK-level errors
        raise HTTPException(
            status_code=502,
            detail={"error": "ai_call_failed", "detail": str(e)},
        ) from e
