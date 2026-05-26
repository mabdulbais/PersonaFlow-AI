"""Lazy async Anthropic client.

The client is constructed on first use so the FastAPI app can start even when
ANTHROPIC_API_KEY is unset — useful for health-check probes during deploys.
"""
from __future__ import annotations

from anthropic import AsyncAnthropic

from app.config import settings

_client: AsyncAnthropic | None = None


def get_client() -> AsyncAnthropic:
    global _client
    if _client is not None:
        return _client
    if not settings.anthropic_api_key:
        raise RuntimeError(
            "ANTHROPIC_API_KEY is not set. Add it to backend/.env."
        )
    _client = AsyncAnthropic(api_key=settings.anthropic_api_key)
    return _client


async def call_llm(
    user_prompt: str,
    *,
    system: str | None = None,
    max_tokens: int = 1600,
    model: str | None = None,
) -> str:
    client = get_client()
    kwargs: dict[str, object] = {
        "model": model or settings.anthropic_model,
        "max_tokens": max_tokens,
        "messages": [{"role": "user", "content": user_prompt}],
    }
    if system is not None:
        kwargs["system"] = system

    message = await client.messages.create(**kwargs)  # type: ignore[arg-type]
    return "".join(
        block.text for block in message.content if getattr(block, "type", None) == "text"
    )
