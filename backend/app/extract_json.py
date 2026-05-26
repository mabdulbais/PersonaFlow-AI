from __future__ import annotations

import json
import re
from typing import Any


class JSONExtractionError(ValueError):
    """Raised when the model output cannot be parsed as JSON."""

    def __init__(self, message: str, raw: str) -> None:
        super().__init__(message)
        self.raw = raw


_FENCE_RE = re.compile(r"```json|```")
_OBJECT_RE = re.compile(r"\{[\s\S]*\}")


def extract_json(text: str) -> Any:
    cleaned = _FENCE_RE.sub("", text).strip()
    match = _OBJECT_RE.search(cleaned)
    candidate = match.group(0) if match else cleaned
    try:
        return json.loads(candidate)
    except json.JSONDecodeError as e:
        raise JSONExtractionError(
            f"Failed to parse JSON from model output: {e}", raw=text
        ) from e
