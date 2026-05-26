"""Prompt templates — kept semantically aligned with frontend/src/lib/prompts.ts.

Prompts are product code. Edit them deliberately. When this file changes,
mirror the change in the frontend until the proxy is removed.
"""
from __future__ import annotations

from app.lang import lang_instruction
from app.schemas import Language, ToneKey

TONES: dict[ToneKey, tuple[str, str]] = {
    ToneKey.FORMAL:      ("Formal",       "Polished, professional, structured."),
    ToneKey.EMPATHETIC:  ("Empathetic",   "Warm, validating, emotionally aware."),
    ToneKey.LEADERSHIP:  ("Leadership",   "Confident, decisive, vision-led."),
    ToneKey.DIPLOMATIC:  ("Diplomatic",   "Tactful, balanced, conflict-soothing."),
    ToneKey.DIRECT:      ("Direct",       "Clear, concise, no fluff."),
    ToneKey.ENCOURAGING: ("Encouraging",  "Uplifting, motivating, positive."),
    ToneKey.APOLOGETIC:  ("Apologetic",   "Accountable, sincere, reparative."),
    ToneKey.PERSUASIVE:  ("Persuasive",   "Compelling, evidence-led, magnetic."),
}


def analyze_prompt(text: str, language: Language) -> str:
    return f"""Analyze this written message for communication quality. {lang_instruction(language)}

Message:
\"\"\"{text}\"\"\"

Return ONLY a JSON object with this exact structure (no prose, no markdown fences):
{{
  "communicationScore": <integer 0-100 reflecting overall effectiveness>,
  "currentTone": "<2-3 word description e.g. 'Frustrated & Direct'>",
  "emotions": [{{"name": "<emotion>", "intensity": <0-100>}}, ... up to 4 items],
  "personality": {{
    "assertiveness": <0-100>,
    "empathy": <0-100>,
    "clarity": <0-100>,
    "confidence": <0-100>
  }},
  "strengths": ["<short strength>", "<short strength>"],
  "suggestions": ["<actionable suggestion>", "<actionable suggestion>", "<actionable suggestion>"],
  "refinedMessage": "<rewritten version that keeps the intent but improves tone, clarity & impact. Same approximate length.>",
  "refinedTone": "<2-3 word tone label for the refined version>"
}}"""


def rewrite_prompt(text: str, tone: ToneKey, language: Language) -> str:
    label, blurb = TONES[tone]
    return f"""Rewrite the following message in a strictly {label.upper()} tone ({blurb}). {lang_instruction(language)}
Keep the intent, preserve approximate length, and improve impact.

Message:
\"\"\"{text}\"\"\"

Return ONLY a JSON object (no prose, no markdown fences):
{{ "rewritten": "<the rewritten message>", "rationale": "<one short sentence on what you changed and why>" }}"""


def interview_question_prompt(role: str, language: Language) -> str:
    return f"""Generate ONE concise, realistic interview question for a {role} role. {lang_instruction(language)}
Avoid clichés like "tell me about yourself". Pick a behavioral, situational, or skill-based question.
Return ONLY a JSON object (no prose, no markdown fences):
{{ "question": "<the question>" }}"""


def interview_feedback_prompt(role: str, question: str, answer: str, language: Language) -> str:
    return f"""You are an interview coach. Evaluate the candidate's answer to a {role} interview question. {lang_instruction(language)}

QUESTION: \"\"\"{question}\"\"\"
ANSWER: \"\"\"{answer}\"\"\"

Return ONLY a JSON object (no prose, no markdown fences):
{{
  "score": <integer 0-100>,
  "verdict": "<one short phrase e.g. 'Strong with room to sharpen'>",
  "strengths": ["<short>", "<short>"],
  "improvements": ["<short, actionable>", "<short, actionable>", "<short, actionable>"],
  "refinedAnswer": "<a rewritten 3-5 sentence model answer using STAR or similar framework, in the candidate's voice>"
}}"""
