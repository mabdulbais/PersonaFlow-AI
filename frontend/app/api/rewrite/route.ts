import { NextResponse } from "next/server";
import {
  RewriteRequestSchema,
  RewriteResponseSchema,
  type RewriteResponse,
} from "@/lib/schemas";
import { rewritePrompt } from "@/lib/prompts";
import { runStructuredCall } from "@/lib/run-structured-call";
import { readJSON, aiErrorResponse } from "@/lib/route-helpers";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const parsed = await readJSON(request, RewriteRequestSchema);
  if (!parsed.ok) return parsed.response;

  try {
    const result = await runStructuredCall<RewriteResponse>(
      rewritePrompt(parsed.data.text, parsed.data.tone, parsed.data.language),
      RewriteResponseSchema,
      { maxTokens: 1200 },
    );
    return NextResponse.json(result);
  } catch (e) {
    return aiErrorResponse(e);
  }
}
