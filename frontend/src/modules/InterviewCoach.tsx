"use client";

import { useState } from "react";
import {
  Activity,
  Check,
  Loader2,
  MoveRight,
  Quote,
  Sparkles,
  Wand2,
} from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Score } from "@/components/ui/Score";
import {
  apiInterviewFeedback,
  apiInterviewQuestion,
} from "@/lib/api-client";
import { isRTL } from "@/lib/lang";
import type { InterviewFeedbackResponse, Language } from "@/lib/schemas";
import { C } from "@/lib/tokens";

const ROLES = [
  "Product Manager",
  "Software Engineer",
  "Designer",
  "Data Scientist",
  "Marketing Lead",
  "Sales Representative",
  "HR Manager",
  "Founder / CEO",
];

const FALLBACK_QUESTION =
  "Tell me about a time you turned around a difficult situation. What did you do, and what was the outcome?";

interface InterviewCoachProps {
  language: Language;
}

export function InterviewCoach({ language }: InterviewCoachProps) {
  const [role, setRole] = useState(ROLES[0]);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState<InterviewFeedbackResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingQ, setLoadingQ] = useState(false);
  const dir = isRTL(language) ? "rtl" : "ltr";

  const newQuestion = async () => {
    setLoadingQ(true);
    setQuestion("");
    setAnswer("");
    setFeedback(null);
    try {
      const result = await apiInterviewQuestion({ role, language });
      setQuestion(result.question);
    } catch {
      setQuestion(FALLBACK_QUESTION);
    } finally {
      setLoadingQ(false);
    }
  };

  const review = async () => {
    if (!answer.trim() || !question) return;
    setLoading(true);
    setFeedback(null);
    try {
      const result = await apiInterviewFeedback({
        role,
        question,
        answer,
        language,
      });
      setFeedback(result);
    } catch {
      setFeedback({
        score: 0,
        verdict: "Could not evaluate. Please try again.",
        strengths: [],
        improvements: [],
        refinedAnswer: "",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <SectionLabel num="03.1">Configure</SectionLabel>
      <div
        className="rounded-lg p-5"
        style={{ background: C.card, border: `1px solid ${C.line}` }}
      >
        <p
          className="text-[10px] tracking-[0.25em] uppercase mb-3"
          style={{ color: C.text3 }}
        >
          Role
        </p>
        <div className="flex flex-wrap gap-2 mb-5">
          {ROLES.map((r) => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className="text-[11.5px] px-3 py-1.5 rounded-full transition-all"
              style={{
                background: role === r ? C.accent : "transparent",
                color: role === r ? C.bg : C.text2,
                border: `1px solid ${role === r ? C.accent : C.line}`,
              }}
            >
              {r}
            </button>
          ))}
        </div>
        <button
          onClick={newQuestion}
          disabled={loadingQ}
          className="text-[11px] tracking-[0.18em] uppercase px-4 py-2 rounded flex items-center gap-2 transition-all disabled:opacity-40"
          style={{ background: C.cardHi, color: C.text, border: `1px solid ${C.line}` }}
        >
          {loadingQ ? (
            <Loader2 size={11} className="animate-spin" />
          ) : (
            <Sparkles size={11} />
          )}
          {question ? "Next question" : "Get question"}
        </button>
      </div>

      {question && (
        <>
          <SectionLabel num="03.2">Question</SectionLabel>
          <div
            className="rounded-lg p-7 relative overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${C.cardHi}, ${C.card})`,
              border: `1px solid ${C.line}`,
            }}
          >
            <div
              className="absolute top-3 left-5"
              style={{ color: C.accent, opacity: 0.3 }}
            >
              <Quote size={36} />
            </div>
            <p
              className="text-[20px] leading-[1.5] font-light relative pl-10"
              style={{ color: C.text }}
              dir={dir}
            >
              {question}
            </p>
          </div>

          <SectionLabel num="03.3">Your answer</SectionLabel>
          <div
            className="rounded-lg overflow-hidden"
            style={{ background: C.card, border: `1px solid ${C.line}` }}
          >
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Take your time. Speak naturally — we'll help you sharpen it."
              className="w-full px-5 py-4 bg-transparent outline-none resize-none text-[14.5px] leading-relaxed"
              style={{ color: C.text, minHeight: 180 }}
              dir={dir}
            />
            <div
              className="flex items-center justify-between px-5 py-3 border-t"
              style={{ borderColor: C.lineSoft }}
            >
              <span className="text-[10px] font-mono" style={{ color: C.text3 }}>
                {answer.split(/\s+/).filter(Boolean).length} words
              </span>
              <button
                onClick={review}
                disabled={!answer.trim() || loading}
                className="text-[11px] tracking-[0.18em] uppercase px-4 py-2 rounded flex items-center gap-2 transition-all disabled:opacity-40"
                style={{ background: C.accent, color: C.bg }}
              >
                {loading ? (
                  <Loader2 size={11} className="animate-spin" />
                ) : (
                  <Activity size={11} />
                )}
                {loading ? "Reviewing" : "Get feedback"}
              </button>
            </div>
          </div>
        </>
      )}

      {feedback && (
        <>
          <SectionLabel num="03.4">Feedback</SectionLabel>
          <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-4">
            <div
              className="rounded-lg p-6 flex flex-col justify-center"
              style={{ background: C.card, border: `1px solid ${C.line}` }}
            >
              <p
                className="text-[10px] tracking-[0.25em] uppercase mb-3"
                style={{ color: C.text3 }}
              >
                Verdict
              </p>
              <Score value={feedback.score} />
              <p
                className="text-[12px] mt-3 leading-snug"
                style={{ color: C.text2 }}
              >
                {feedback.verdict}
              </p>
            </div>
            <div className="space-y-4">
              <div
                className="rounded-lg p-5"
                style={{ background: C.card, border: `1px solid ${C.line}` }}
              >
                <p
                  className="text-[10px] tracking-[0.25em] uppercase mb-3"
                  style={{ color: C.sage }}
                >
                  What worked
                </p>
                <ul className="space-y-2">
                  {feedback.strengths.map((s, i) => (
                    <li
                      key={i}
                      className="flex gap-2.5 text-[12.5px]"
                      style={{ color: C.text }}
                    >
                      <Check
                        size={12}
                        className="mt-0.5 flex-shrink-0"
                        style={{ color: C.sage }}
                      />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div
                className="rounded-lg p-5"
                style={{ background: C.card, border: `1px solid ${C.line}` }}
              >
                <p
                  className="text-[10px] tracking-[0.25em] uppercase mb-3"
                  style={{ color: C.amber }}
                >
                  Sharpen this
                </p>
                <ul className="space-y-2">
                  {feedback.improvements.map((s, i) => (
                    <li
                      key={i}
                      className="flex gap-2.5 text-[12.5px]"
                      style={{ color: C.text }}
                    >
                      <MoveRight
                        size={12}
                        className="mt-0.5 flex-shrink-0"
                        style={{ color: C.amber }}
                      />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {feedback.refinedAnswer && (
            <div
              className="rounded-lg p-6 relative overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${C.cardHi}, ${C.card})`,
                border: `1px solid ${C.accent}33`,
              }}
            >
              <div
                className="absolute top-0 right-0 w-32 h-32 opacity-20"
                style={{
                  background: `radial-gradient(circle, ${C.accent}, transparent 70%)`,
                }}
              />
              <div className="relative flex items-center gap-2 mb-4">
                <Wand2 size={13} style={{ color: C.accent }} />
                <span
                  className="text-[10px] tracking-[0.25em] uppercase"
                  style={{ color: C.accent }}
                >
                  Model answer
                </span>
              </div>
              <p
                className="relative text-[14.5px] leading-[1.8] font-light"
                style={{ color: C.text }}
                dir={dir}
              >
                “{feedback.refinedAnswer}”
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
