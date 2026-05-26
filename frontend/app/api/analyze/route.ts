import { NextResponse } from "next/server";
import {
  AnalyzeRequestSchema,
  AnalyzeResponseSchema,
  type AnalyzeResponse,
} from "@/lib/schemas";
import { analyzePrompt } from "@/lib/prompts";
import { runStructuredCall } from "@/lib/run-structured-call";
import { readJSON, aiErrorResponse } from "@/lib/route-helpers";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const parsed = await readJSON(request, AnalyzeRequestSchema);
  if (!parsed.ok) return parsed.response;

  try {
    const result = await runStructuredCall<AnalyzeResponse>(
      analyzePrompt(parsed.data.text, parsed.data.language),
      AnalyzeResponseSchema,
      { maxTokens: 1800 },
    );
    return NextResponse.json(result);
  } catch (e) {
    return aiErrorResponse(e);
  }
}
