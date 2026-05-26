"use client";

import { Eye } from "lucide-react";
import { Pill } from "@/components/ui/Pill";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Score } from "@/components/ui/Score";
import { EmotionDot } from "@/components/ui/EmotionDot";
import { C } from "@/lib/tokens";
import type { SharedAnalysis } from "@/Workspace";

interface InsightsViewProps {
  shared: SharedAnalysis | null;
}

interface Dimension {
  key: keyof SharedAnalysis["personality"];
  label: string;
  lo: string;
  hi: string;
  val: number;
}

export function InsightsView({ shared }: InsightsViewProps) {
  if (!shared) {
    return (
      <div className="space-y-6">
        <SectionLabel num="04.1">Profile</SectionLabel>
        <div
          className="rounded-lg flex flex-col items-center justify-center text-center px-8 py-20"
          style={{ background: C.card, border: `1px dashed ${C.line}` }}
        >
          <Eye size={20} style={{ color: C.text3 }} className="mb-4" />
          <p
            className="text-[20px] font-serif italic mb-2"
            style={{ color: C.text }}
          >
            No reading yet.
          </p>
          <p
            className="text-[12.5px] max-w-sm leading-relaxed"
            style={{ color: C.text3 }}
          >
            Analyze a message in{" "}
            <span style={{ color: C.text }}>Message Studio</span> to populate
            your communication profile.
          </p>
        </div>
      </div>
    );
  }

  const p = shared.personality;
  const dimensions: Dimension[] = [
    {
      key: "assertiveness",
      label: "Assertiveness",
      lo: "Receptive, deferential",
      hi: "Decisive, direct",
      val: p.assertiveness,
    },
    {
      key: "empathy",
      label: "Empathy",
      lo: "Task-focused",
      hi: "People-attuned",
      val: p.empathy,
    },
    {
      key: "clarity",
      label: "Clarity",
      lo: "Exploratory",
      hi: "Crystalline",
      val: p.clarity,
    },
    {
      key: "confidence",
      label: "Confidence",
      lo: "Tentative",
      hi: "Self-assured",
      val: p.confidence,
    },
  ];

  const avg = Math.round(
    dimensions.reduce((s, d) => s + d.val, 0) / dimensions.length,
  );

  return (
    <div className="space-y-6">
      <SectionLabel num="04.1">Communication Profile</SectionLabel>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_280px] gap-4">
        <div
          className="rounded-lg p-6 relative overflow-hidden"
          style={{ background: C.card, border: `1px solid ${C.line}` }}
        >
          <p
            className="text-[10px] tracking-[0.25em] uppercase mb-5"
            style={{ color: C.text3 }}
          >
            Latest reading
          </p>
          <div className="space-y-6">
            {dimensions.map((d) => (
              <div key={d.key}>
                <div className="flex items-baseline justify-between mb-2">
                  <span className="text-[13px]" style={{ color: C.text }}>
                    {d.label}
                  </span>
                  <span
                    className="text-[11px] font-mono tabular-nums"
                    style={{ color: C.text3 }}
                  >
                    {d.val}/100
                  </span>
                </div>
                <div
                  className="relative h-1.5 rounded-full overflow-hidden mb-1.5"
                  style={{ background: C.lineSoft }}
                >
                  <div
                    className="h-full transition-all duration-1000 ease-out"
                    style={{
                      width: `${d.val}%`,
                      background: `linear-gradient(90deg, ${C.ink}, ${C.accent})`,
                    }}
                  />
                </div>
                <div
                  className="flex justify-between text-[10px]"
                  style={{ color: C.text3 }}
                >
                  <span>{d.lo}</span>
                  <span>{d.hi}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Composite */}
        <div
          className="rounded-lg p-6 flex flex-col"
          style={{
            background: `linear-gradient(160deg, ${C.cardHi}, ${C.card})`,
            border: `1px solid ${C.accent}33`,
          }}
        >
          <p
            className="text-[10px] tracking-[0.25em] uppercase mb-3"
            style={{ color: C.text3 }}
          >
            Composite
          </p>
          <Score value={avg} />
          <p
            className="text-[12px] mt-4 leading-relaxed"
            style={{ color: C.text2 }}
          >
            A blended reading of your last analyzed message across four
            communication dimensions.
          </p>
          <div className="mt-auto pt-6">
            <Pill color={C.accent} bg={C.accentSft} border={`${C.accent}44`}>
              {shared.currentTone}
            </Pill>
          </div>
        </div>
      </div>

      {/* Original */}
      <div
        className="rounded-lg p-5"
        style={{ background: C.surface, border: `1px solid ${C.lineSoft}` }}
      >
        <p
          className="text-[10px] tracking-[0.25em] uppercase mb-3"
          style={{ color: C.text3 }}
        >
          Based on this message
        </p>
        <p
          className="text-[13px] leading-relaxed"
          style={{ color: C.text2 }}
        >
          “{shared.source.slice(0, 240)}
          {shared.source.length > 240 ? "…" : ""}”
        </p>
      </div>

      {/* Emotional spectrum */}
      {shared.emotions.length > 0 && (
        <div
          className="rounded-lg p-5"
          style={{ background: C.card, border: `1px solid ${C.line}` }}
        >
          <p
            className="text-[10px] tracking-[0.25em] uppercase mb-4"
            style={{ color: C.text3 }}
          >
            Emotional spectrum
          </p>
          <div className="flex flex-wrap gap-2">
            {shared.emotions.map((e) => (
              <EmotionDot key={e.name} {...e} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
