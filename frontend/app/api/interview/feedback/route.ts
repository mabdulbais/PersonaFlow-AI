import { NextResponse } from "next/server";
import {
  InterviewFeedbackRequestSchema,
  InterviewFeedbackResponseSchema,
  type InterviewFeedbackResponse,
} from "@/lib/schemas";
import { interviewFeedbackPrompt } from "@/lib/prompts";
import { runStructuredCall } from "@/lib/run-structured-call";
import { readJSON, aiErrorResponse } from "@/lib/route-helpers";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const parsed = await readJSON(request, InterviewFeedbackRequestSchema);
  if (!parsed.ok) return parsed.response;

  try {
    const result = await runStructuredCall<InterviewFeedbackResponse>(
      interviewFeedbackPrompt(
        parsed.data.role,
        parsed.data.question,
        parsed.data.answer,
        parsed.data.language,
      ),
      InterviewFeedbackResponseSchema,
      { maxTokens: 1800 },
    );
    return NextResponse.json(result);
  } catch (e) {
    return aiErrorResponse(e);
  }
}
