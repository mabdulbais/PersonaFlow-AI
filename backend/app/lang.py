from __future__ import annotations

from app.schemas import Language


def lang_instruction(lang: Language) -> str:
    if lang == Language.UR:
        return (
            "Respond in natural, fluent Urdu (اردو) using Urdu script for all string "
            "fields. Use culturally adapted register, not literal translation."
        )
    if lang == Language.AR:
        return (
            "Respond in natural, fluent Arabic (العربية) using Arabic script for all "
            "string fields. Use culturally adapted register, not literal translation."
        )
    return "Respond in clear, natural English for all string fields."
