import { NextResponse } from "next/server";
import {
  InterviewQuestionRequestSchema,
  InterviewQuestionResponseSchema,
  type InterviewQuestionResponse,
} from "@/lib/schemas";
import { interviewQuestionPrompt } from "@/lib/prompts";
import { runStructuredCall } from "@/lib/run-structured-call";
import { readJSON, aiErrorResponse } from "@/lib/route-helpers";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const parsed = await readJSON(request, InterviewQuestionRequestSchema);
  if (!parsed.ok) return parsed.response;

  try {
    const result = await runStructuredCall<InterviewQuestionResponse>(
      interviewQuestionPrompt(parsed.data.role, parsed.data.language),
      InterviewQuestionResponseSchema,
      { maxTokens: 400 },
    );
    return NextResponse.json(result);
  } catch (e) {
    return aiErrorResponse(e);
  }
}
