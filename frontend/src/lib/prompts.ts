import type { Language, ToneKey } from "./schemas";
import { toneByKey } from "./tones";
import { langInstruction } from "./lang";

/**
 * Prompt templates live here as product code. Each function returns
 * a single user prompt that asks the model to emit a strict JSON object.
 * The route handler extracts JSON and validates with the zod schemas
 * in ./schemas.
 */

export function analyzePrompt(text: string, language: Language): string {
  return `Analyze this written message for communication quality. ${langInstruction(language)}

Message:
"""${text}"""

Return ONLY a JSON object with this exact structure (no prose, no markdown fences):
{
  "communicationScore": <integer 0-100 reflecting overall effectiveness>,
  "currentTone": "<2-3 word description e.g. 'Frustrated & Direct'>",
  "emotions": [{"name": "<emotion>", "intensity": <0-100>}, ... up to 4 items],
  "personality": {
    "assertiveness": <0-100>,
    "empathy": <0-100>,
    "clarity": <0-100>,
    "confidence": <0-100>
  },
  "strengths": ["<short strength>", "<short strength>"],
  "suggestions": ["<actionable suggestion>", "<actionable suggestion>", "<actionable suggestion>"],
  "refinedMessage": "<rewritten version that keeps the intent but improves tone, clarity & impact. Same approximate length.>",
  "refinedTone": "<2-3 word tone label for the refined version>"
}`;
}

export function rewritePrompt(text: string, tone: ToneKey, language: Language): string {
  const t = toneByKey(tone);
  return `Rewrite the following message in a strictly ${t.label.toUpperCase()} tone (${t.blurb}). ${langInstruction(language)}
Keep the intent, preserve approximate length, and improve impact.

Message:
"""${text}"""

Return ONLY a JSON object (no prose, no markdown fences):
{ "rewritten": "<the rewritten message>", "rationale": "<one short sentence on what you changed and why>" }`;
}

export function interviewQuestionPrompt(role: string, language: Language): string {
  return `Generate ONE concise, realistic interview question for a ${role} role. ${langInstruction(language)}
Avoid clichés like "tell me about yourself". Pick a behavioral, situational, or skill-based question.
Return ONLY a JSON object (no prose, no markdown fences):
{ "question": "<the question>" }`;
}

export function interviewFeedbackPrompt(
  role: string,
  question: string,
  answer: string,
  language: Language,
): string {
  return `You are an interview coach. Evaluate the candidate's answer to a ${role} interview question. ${langInstruction(language)}

QUESTION: """${question}"""
ANSWER: """${answer}"""

Return ONLY a JSON object (no prose, no markdown fences):
{
  "score": <integer 0-100>,
  "verdict": "<one short phrase e.g. 'Strong with room to sharpen'>",
  "strengths": ["<short>", "<short>"],
  "improvements": ["<short, actionable>", "<short, actionable>", "<short, actionable>"],
  "refinedAnswer": "<a rewritten 3-5 sentence model answer using STAR or similar framework, in the candidate's voice>"
}`;
}
