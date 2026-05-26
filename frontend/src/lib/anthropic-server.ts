import "server-only";
import Anthropic from "@anthropic-ai/sdk";

// Anthropic client is the seam for swapping to FastAPI later.
// When FASTAPI_BASE_URL is set, callLLM could forward there instead of
// hitting Anthropic directly — a one-place change.

const DEFAULT_MODEL = "claude-sonnet-4-6";
const DEFAULT_MAX_TOKENS = 1600;

let _client: Anthropic | null = null;

function getClient(): Anthropic {
  if (_client) return _client;
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error(
      "ANTHROPIC_API_KEY is not set. Add it to frontend/.env.local — never to NEXT_PUBLIC_* or client code.",
    );
  }
  _client = new Anthropic({ apiKey });
  return _client;
}

export interface CallOptions {
  system?: string;
  maxTokens?: number;
  model?: string;
}

export async function callLLM(
  userPrompt: string,
  opts: CallOptions = {},
): Promise<string> {
  const client = getClient();
  const model = opts.model ?? process.env.ANTHROPIC_MODEL ?? DEFAULT_MODEL;
  const message = await client.messages.create({
    model,
    max_tokens: opts.maxTokens ?? DEFAULT_MAX_TOKENS,
    ...(opts.system ? { system: opts.system } : {}),
    messages: [{ role: "user", content: userPrompt }],
  });
  return message.content
    .map((block) => (block.type === "text" ? block.text : ""))
    .join("");
}
