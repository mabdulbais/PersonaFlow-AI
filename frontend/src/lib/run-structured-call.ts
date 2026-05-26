import "server-only";
import { z } from "zod";
import { callLLM, type CallOptions } from "./anthropic-server";
import { extractJSON } from "./extract-json";

export async function runStructuredCall<T>(
  prompt: string,
  responseSchema: z.ZodType<T>,
  opts: CallOptions = {},
): Promise<T> {
  const raw = await callLLM(prompt, opts);
  const parsed = extractJSON<unknown>(raw);
  return responseSchema.parse(parsed);
}
