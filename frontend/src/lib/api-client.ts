import type {
  AnalyzeRequest,
  AnalyzeResponse,
  ErrorResponse,
  InterviewFeedbackRequest,
  InterviewFeedbackResponse,
  InterviewQuestionRequest,
  InterviewQuestionResponse,
  RewriteRequest,
  RewriteResponse,
} from "./schemas";

export class APIError extends Error {
  constructor(
    public readonly status: number,
    public readonly body: ErrorResponse,
  ) {
    super(body.detail || body.error);
    this.name = "APIError";
  }
}

async function post<TReq, TRes>(path: string, body: TReq): Promise<TRes> {
  const res = await fetch(path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const errBody = (await res
      .json()
      .catch(() => ({ error: "unknown_error" }))) as ErrorResponse;
    throw new APIError(res.status, errBody);
  }
  return (await res.json()) as TRes;
}

export const apiAnalyze = (req: AnalyzeRequest) =>
  post<AnalyzeRequest, AnalyzeResponse>("/api/analyze", req);

export const apiRewrite = (req: RewriteRequest) =>
  post<RewriteRequest, RewriteResponse>("/api/rewrite", req);

export const apiInterviewQuestion = (req: InterviewQuestionRequest) =>
  post<InterviewQuestionRequest, InterviewQuestionResponse>(
    "/api/interview/question",
    req,
  );

export const apiInterviewFeedback = (req: InterviewFeedbackRequest) =>
  post<InterviewFeedbackRequest, InterviewFeedbackResponse>(
    "/api/interview/feedback",
    req,
  );
