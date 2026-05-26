export class JSONExtractionError extends Error {
  constructor(message: string, public readonly raw: string) {
    super(message);
    this.name = "JSONExtractionError";
  }
}

export function extractJSON<T = unknown>(text: string): T {
  const cleaned = text.replace(/```json|```/g, "").trim();
  const match = cleaned.match(/\{[\s\S]*\}/);
  const candidate = match ? match[0] : cleaned;
  try {
    return JSON.parse(candidate) as T;
  } catch (e) {
    throw new JSONExtractionError(
      `Failed to parse JSON from model output: ${(e as Error).message}`,
      text,
    );
  }
}
