from __future__ import annotations

from fastapi import APIRouter, HTTPException

router = APIRouter(tags=["profile"])


@router.get("/profile/{user_id}")
async def profile(user_id: str) -> dict[str, str]:
    """Aggregated communication profile.

    Returns 501 until auth + Postgres land (Priority 4).
    """
    _ = user_id
    raise HTTPException(
        status_code=501,
        detail={
            "error": "not_implemented",
            "detail": "Profile aggregation requires auth + Postgres (Priority 4).",
        },
    )
