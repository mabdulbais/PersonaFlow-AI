"use client";

import { useState } from "react";
import {
  Activity,
  AlertCircle,
  Award,
  Check,
  Copy,
  Heart,
  Loader2,
  MessageSquare,
  MoveRight,
  Quote,
  Shield,
  Sparkles,
  Wand2,
  Zap,
} from "lucide-react";
import { Pill } from "@/components/ui/Pill";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Bar } from "@/components/ui/Bar";
import { EmotionDot } from "@/components/ui/EmotionDot";
import { Score } from "@/components/ui/Score";
import { LoadingPanel } from "@/components/ui/LoadingPanel";
import { ErrorPanel } from "@/components/ui/ErrorPanel";
import { EmptyState } from "@/components/ui/EmptyState";
import { apiAnalyze } from "@/lib/api-client";
import { isRTL } from "@/lib/lang";
import type { AnalyzeResponse, Language } from "@/lib/schemas";
import { C } from "@/lib/tokens";
import type { SharedAnalysis } from "@/Workspace";

const SAMPLE_MESSAGE =
  "hey just wanted to check why the report hasnt been sent yet?? this was supposed to be done by friday and now my whole presentation is going to be late because of this. need it ASAP";

interface MessageStudioProps {
  language: Language;
  onAnalysis: (a: SharedAnalysis) => void;
}

export function MessageStudio({ language, onAnalysis }: MessageStudioProps) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<AnalyzeResponse | null>(null);
  const [err, setErr] = useState("");

  const analyze = async () => {
    if (!text.trim()) return;
    setLoading(true);
    setErr("");
    setAnalysis(null);
    try {
      const result = await apiAnalyze({ text, language });
      setAnalysis(result);
      onAnalysis({ source: text, ...result });
    } catch {
      setErr("Analysis failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setText("");
    setAnalysis(null);
    setErr("");
  };

  const dir = isRTL(language) ? "rtl" : "ltr";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-6">
      {/* LEFT — input */}
      <div className="space-y-5">
        <SectionLabel num="01.1">Input</SectionLabel>
        <div
          className="rounded-lg overflow-hidden"
          style={{ background: C.card, border: `1px solid ${C.line}` }}
        >
          <div
            className="flex items-center justify-between px-5 py-3 border-b"
            style={{ borderColor: C.lineSoft }}
          >
            <div className="flex items-center gap-2">
              <MessageSquare size={13} style={{ color: C.text3 }} />
              <span
                className="text-[11px] tracking-[0.2em] uppercase"
                style={{ color: C.text2 }}
              >
                Your message
              </span>
            </div>
            <span className="text-[10px] font-mono" style={{ color: C.text3 }}>
              {text.length} chars
            </span>
          </div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste an email, message, or any text you want to analyze and improve…"
            className="w-full px-5 py-4 bg-transparent outline-none resize-none text-[15px] leading-relaxed"
            style={{ color: C.text, minHeight: 280 }}
            dir={dir}
          />
          <div
            className="flex items-center justify-between px-5 py-3 border-t"
            style={{ borderColor: C.lineSoft }}
          >
            <button
              onClick={() => setText(SAMPLE_MESSAGE)}
              className="text-[11px] tracking-[0.15em] uppercase flex items-center gap-1.5 transition-colors hover:opacity-80"
              style={{ color: C.text3 }}
            >
              <Quote size={11} /> Try sample
            </button>
            <div className="flex gap-2">
              <button
                onClick={reset}
                className="text-[11px] tracking-[0.15em] uppercase px-3 py-2 rounded transition-colors hover:opacity-80"
                style={{ color: C.text2 }}
              >
                Reset
              </button>
              <button
                onClick={analyze}
                disabled={!text.trim() || loading}
                className="text-[11px] tracking-[0.18em] uppercase px-4 py-2 rounded flex items-center gap-2 transition-all disabled:opacity-40"
                style={{ background: C.accent, color: C.bg }}
              >
                {loading ? (
                  <Loader2 size={12} className="animate-spin" />
                ) : (
                  <Sparkles size={12} />
                )}
                {loading ? "Analyzing" : "Analyze"}
              </button>
            </div>
          </div>
        </div>

        <div
          className="rounded-lg p-5"
          style={{ background: C.surface, border: `1px solid ${C.lineSoft}` }}
        >
          <p
            className="text-[10.5px] tracking-[0.22em] uppercase mb-4"
            style={{ color: C.text3 }}
          >
            We analyze
          </p>
          <div
            className="grid grid-cols-2 gap-x-4 gap-y-3 text-[12.5px]"
            style={{ color: C.text2 }}
          >
            {[
              ["Emotional tone", Heart],
              ["Clarity & flow", Zap],
              ["Assertiveness", Shield],
              ["Empathy signals", Activity],
              ["Confidence", Award],
              ["Conflict risk", AlertCircle],
            ].map(([label, Icon]) => {
              const I = Icon as typeof Heart;
              return (
                <div key={label as string} className="flex items-center gap-2">
                  <I size={12} style={{ color: C.accent }} />
                  {label as string}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* RIGHT — output */}
      <div className="space-y-5">
        <SectionLabel num="01.2">Intelligence</SectionLabel>
        {!analysis && !loading && !err && (
          <EmptyState
            icon={Sparkles}
            title="Awaiting your words."
            body="Paste a message on the left. PersonaFlow will surface tone, emotion, personality signals and a refined rewrite."
          />
        )}
        {loading && <LoadingPanel />}
        {err && <ErrorPanel message={err} />}
        {analysis && <AnalysisResult data={analysis} language={language} />}
      </div>
    </div>
  );
}

interface AnalysisResultProps {
  data: AnalyzeResponse;
  language: Language;
}

function AnalysisResult({ data, language }: AnalysisResultProps) {
  const [copied, setCopied] = useState(false);
  const dir = isRTL(language) ? "rtl" : "ltr";

  const copy = async () => {
    await navigator.clipboard.writeText(data.refinedMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className="space-y-4">
      {/* Score card */}
      <div
        className="rounded-lg p-6"
        style={{ background: C.card, border: `1px solid ${C.line}` }}
      >
        <div className="flex items-start justify-between mb-2">
          <div>
            <p
              className="text-[10px] tracking-[0.25em] uppercase mb-3"
              style={{ color: C.text3 }}
            >
              Communication Score
            </p>
            <Score value={data.communicationScore} />
          </div>
          <div className="text-right">
            <p
              className="text-[10px] tracking-[0.25em] uppercase mb-2"
              style={{ color: C.text3 }}
            >
              Current Tone
            </p>
            <Pill color={C.accent} bg={C.accentSft} border={`${C.accent}44`}>
              {data.currentTone}
            </Pill>
          </div>
        </div>
      </div>

      {/* Emotions */}
      <div
        className="rounded-lg p-5"
        style={{ background: C.card, border: `1px solid ${C.line}` }}
      >
        <p
          className="text-[10px] tracking-[0.25em] uppercase mb-4"
          style={{ color: C.text3 }}
        >
          Emotional Signal
        </p>
        <div className="flex flex-wrap gap-2">
          {data.emotions.map((e) => (
            <EmotionDot key={e.name} {...e} />
          ))}
        </div>
      </div>

      {/* Personality bars */}
      <div
        className="rounded-lg p-5"
        style={{ background: C.card, border: `1px solid ${C.line}` }}
      >
        <p
          className="text-[10px] tracking-[0.25em] uppercase mb-5"
          style={{ color: C.text3 }}
        >
          Personality Signals
        </p>
        <div className="grid grid-cols-2 gap-x-6 gap-y-4">
          <Bar value={data.personality.assertiveness} label="Assertiveness" />
          <Bar value={data.personality.empathy} label="Empathy" />
          <Bar value={data.personality.clarity} label="Clarity" />
          <Bar value={data.personality.confidence} label="Confidence" />
        </div>
      </div>

      {/* Strengths + Suggestions */}
      <div className="grid grid-cols-2 gap-4">
        <div
          className="rounded-lg p-5"
          style={{ background: C.card, border: `1px solid ${C.line}` }}
        >
          <p
            className="text-[10px] tracking-[0.25em] uppercase mb-4"
            style={{ color: C.sage }}
          >
            Strengths
          </p>
          <ul className="space-y-2.5">
            {data.strengths.map((s, i) => (
              <li
                key={i}
                className="flex gap-2.5 text-[12.5px] leading-relaxed"
                style={{ color: C.text }}
              >
                <Check
                  size={13}
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
            className="text-[10px] tracking-[0.25em] uppercase mb-4"
            style={{ color: C.amber }}
          >
            Suggestions
          </p>
          <ul className="space-y-2.5">
            {data.suggestions.map((s, i) => (
              <li
                key={i}
                className="flex gap-2.5 text-[12.5px] leading-relaxed"
                style={{ color: C.text }}
              >
                <MoveRight
                  size={13}
                  className="mt-0.5 flex-shrink-0"
                  style={{ color: C.amber }}
                />
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Refined */}
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
        <div className="relative flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Wand2 size={13} style={{ color: C.accent }} />
            <span
              className="text-[10px] tracking-[0.25em] uppercase"
              style={{ color: C.accent }}
            >
              Refined Version
            </span>
            <span className="ml-2">
              <Pill color={C.text2} border={C.line}>
                {data.refinedTone}
              </Pill>
            </span>
          </div>
          <button
            onClick={copy}
            className="text-[10px] tracking-[0.18em] uppercase flex items-center gap-1.5 px-2.5 py-1.5 rounded transition-all"
            style={{
              color: copied ? C.sage : C.text2,
              border: `1px solid ${copied ? C.sage : C.line}`,
            }}
          >
            {copied ? (
              <>
                <Check size={11} /> Copied
              </>
            ) : (
              <>
                <Copy size={11} /> Copy
              </>
            )}
          </button>
        </div>
        <p
          className="relative text-[15px] leading-[1.75] font-light"
          style={{ color: C.text }}
          dir={dir}
        >
          “{data.refinedMessage}”
        </p>
      </div>
    </div>
  );
}
