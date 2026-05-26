from __future__ import annotations

from slowapi import Limiter
from slowapi.util import get_remote_address

from app.config import settings


def _rate_limit() -> str:
    return f"{settings.rate_limit_per_minute}/minute"


limiter = Limiter(key_func=get_remote_address)
RATE_LIMIT = _rate_limit
