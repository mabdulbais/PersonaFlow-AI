import { z } from "zod";

/* ────────────────────────── primitives ────────────────────────── */

export const LanguageSchema = z.enum(["en", "ur", "ar"]);
export type Language = z.infer<typeof LanguageSchema>;

export const ToneKeySchema = z.enum([
  "formal",
  "empathetic",
  "leadership",
  "diplomatic",
  "direct",
  "encouraging",
  "apologetic",
  "persuasive",
]);
export type ToneKey = z.infer<typeof ToneKeySchema>;

/* ─────────────────────────── analyze ──────────────────────────── */

export const AnalyzeRequestSchema = z.object({
  text: z.string().min(1).max(8000),
  language: LanguageSchema,
});
export type AnalyzeRequest = z.infer<typeof AnalyzeRequestSchema>;

export const EmotionSchema = z.object({
  name: z.string(),
  intensity: z.number().min(0).max(100),
});
export type Emotion = z.infer<typeof EmotionSchema>;

export const PersonalitySignalsSchema = z.object({
  assertiveness: z.number().min(0).max(100),
  empathy:       z.number().min(0).max(100),
  clarity:       z.number().min(0).max(100),
  confidence:    z.number().min(0).max(100),
});
export type PersonalitySignals = z.infer<typeof PersonalitySignalsSchema>;

export const AnalyzeResponseSchema = z.object({
  communicationScore: z.number().min(0).max(100),
  currentTone:        z.string(),
  emotions:           z.array(EmotionSchema),
  personality:        PersonalitySignalsSchema,
  strengths:          z.array(z.string()),
  suggestions:        z.array(z.string()),
  refinedMessage:     z.string(),
  refinedTone:        z.string(),
});
export type AnalyzeResponse = z.infer<typeof AnalyzeResponseSchema>;

/* ─────────────────────────── rewrite ──────────────────────────── */

export const RewriteRequestSchema = z.object({
  text:     z.string().min(1).max(8000),
  tone:     ToneKeySchema,
  language: LanguageSchema,
});
export type RewriteRequest = z.infer<typeof RewriteRequestSchema>;

export const RewriteResponseSchema = z.object({
  rewritten: z.string(),
  rationale: z.string(),
});
export type RewriteResponse = z.infer<typeof RewriteResponseSchema>;

/* ───────────────────────── interview ──────────────────────────── */

export const InterviewQuestionRequestSchema = z.object({
  role:     z.string().min(1).max(120),
  language: LanguageSchema,
});
export type InterviewQuestionRequest = z.infer<typeof InterviewQuestionRequestSchema>;

export const InterviewQuestionResponseSchema = z.object({
  question: z.string(),
});
export type InterviewQuestionResponse = z.infer<typeof InterviewQuestionResponseSchema>;

export const InterviewFeedbackRequestSchema = z.object({
  role:     z.string().min(1).max(120),
  question: z.string().min(1).max(2000),
  answer:   z.string().min(1).max(8000),
  language: LanguageSchema,
});
export type InterviewFeedbackRequest = z.infer<typeof InterviewFeedbackRequestSchema>;

export const InterviewFeedbackResponseSchema = z.object({
  score:         z.number().min(0).max(100),
  verdict:       z.string(),
  strengths:     z.array(z.string()),
  improvements:  z.array(z.string()),
  refinedAnswer: z.string(),
});
export type InterviewFeedbackResponse = z.infer<typeof InterviewFeedbackResponseSchema>;

/* ────────────────────────── shared API ────────────────────────── */

export const ErrorResponseSchema = z.object({
  error: z.string(),
  detail: z.string().optional(),
});
export type ErrorResponse = z.infer<typeof ErrorResponseSchema>;
