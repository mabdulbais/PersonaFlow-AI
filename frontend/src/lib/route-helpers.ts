import "server-only";
import { NextResponse } from "next/server";
import { z } from "zod";
import type { ErrorResponse } from "./schemas";

export async function readJSON<T>(
  request: Request,
  schema: z.ZodType<T>,
): Promise<{ ok: true; data: T } | { ok: false; response: NextResponse<ErrorResponse> }> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return {
      ok: false,
      response: NextResponse.json(
        { error: "invalid_json", detail: "Request body must be JSON." },
        { status: 400 },
      ),
    };
  }
  const result = schema.safeParse(body);
  if (!result.success) {
    return {
      ok: false,
      response: NextResponse.json(
        { error: "invalid_request", detail: result.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join("; ") },
        { status: 400 },
      ),
    };
  }
  return { ok: true, data: result.data };
}

export function aiErrorResponse(e: unknown): NextResponse<ErrorResponse> {
  const message = e instanceof Error ? e.message : String(e);
  return NextResponse.json(
    { error: "ai_call_failed", detail: message },
    { status: 502 },
  );
}
