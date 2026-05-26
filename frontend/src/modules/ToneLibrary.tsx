"use client";

import { useState } from "react";
import {
  Activity,
  ArrowUpRight,
  Award,
  Check,
  Eye,
  Heart,
  Loader2,
  ScrollText,
  Shield,
  Sparkles,
  Wand2,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TONES, toneByKey } from "@/lib/tones";
import { apiRewrite } from "@/lib/api-client";
import { isRTL } from "@/lib/lang";
import type { Language, RewriteResponse, ToneKey } from "@/lib/schemas";
import { C } from "@/lib/tokens";

const TONE_ICONS: Record<ToneKey, LucideIcon> = {
  formal:      ScrollText,
  empathetic:  Heart,
  leadership:  Award,
  diplomatic:  Shield,
  direct:      Zap,
  encouraging: Sparkles,
  apologetic:  Activity,
  persuasive:  ArrowUpRight,
};

interface ToneLibraryProps {
  language: Language;
}

export function ToneLibrary({ language }: ToneLibraryProps) {
  const [text, setText] = useState("");
  const [active, setActive] = useState<ToneKey | null>(null);
  const [results, setResults] = useState<Partial<Record<ToneKey, RewriteResponse>>>({});
  const [loadingKey, setLoadingKey] = useState<ToneKey | null>(null);
  const dir = isRTL(language) ? "rtl" : "ltr";

  const rewrite = async (tone: ToneKey) => {
    if (!text.trim()) return;
    setActive(tone);
    setLoadingKey(tone);
    try {
      const result = await apiRewrite({ text, tone, language });
      setResults((r) => ({ ...r, [tone]: result }));
    } catch {
      setResults((r) => ({
        ...r,
        [tone]: { rewritten: "Could not generate. Try again.", rationale: "" },
      }));
    } finally {
      setLoadingKey(null);
    }
  };

  return (
    <div className="space-y-6">
      <SectionLabel num="02.1">Source message</SectionLabel>
      <div
        className="rounded-lg overflow-hidden"
        style={{ background: C.card, border: `1px solid ${C.line}` }}
      >
        <textarea
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            setResults({});
            setActive(null);
          }}
          placeholder="Type or paste any message. Then click a tone below to instantly rewrite it."
          className="w-full px-5 py-4 bg-transparent outline-none resize-none text-[14.5px] leading-relaxed"
          style={{ color: C.text, minHeight: 110 }}
          dir={dir}
        />
      </div>

      <SectionLabel num="02.2">Choose a voice</SectionLabel>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {TONES.map((t) => {
          const Icon = TONE_ICONS[t.key];
          const isActive = active === t.key;
          const isLoading = loadingKey === t.key;
          const done = results[t.key];
          return (
            <button
              key={t.key}
              onClick={() => rewrite(t.key)}
              disabled={!text.trim() || isLoading}
              className="text-left rounded-lg p-4 transition-all duration-300 group disabled:opacity-40 disabled:cursor-not-allowed relative overflow-hidden"
              style={{
                background: isActive ? C.cardHi : C.card,
                border: `1px solid ${isActive ? `${C.accent}66` : C.line}`,
              }}
            >
              {isActive && (
                <div
                  className="absolute -top-px -right-px w-12 h-12 opacity-30"
                  style={{
                    background: `radial-gradient(circle, ${C.accent}, transparent 70%)`,
                  }}
                />
              )}
              <div className="flex items-center gap-2 mb-2.5">
                <Icon size={13} style={{ color: isActive ? C.accent : C.text2 }} />
                <span
                  className="text-[13px] font-medium"
                  style={{ color: C.text }}
                >
                  {t.label}
                </span>
                {isLoading && (
                  <Loader2
                    size={11}
                    className="animate-spin ml-auto"
                    style={{ color: C.accent }}
                  />
                )}
                {done && !isLoading && (
                  <Check size={11} className="ml-auto" style={{ color: C.sage }} />
                )}
              </div>
              <p className="text-[11px] leading-snug" style={{ color: C.text3 }}>
                {t.blurb}
              </p>
            </button>
          );
        })}
      </div>

      {active && (
        <>
          <SectionLabel num="02.3">
            Rewritten in {toneByKey(active).label.toLowerCase()}
          </SectionLabel>
          <div
            className="rounded-lg p-6 relative overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${C.cardHi}, ${C.card})`,
              border: `1px solid ${C.accent}33`,
              minHeight: 200,
            }}
          >
            <div
              className="absolute top-0 right-0 w-40 h-40 opacity-20"
              style={{
                background: `radial-gradient(circle, ${C.accent}, transparent 70%)`,
              }}
            />
            {!results[active] && (
              <div
                className="flex items-center justify-center"
                style={{ minHeight: 160 }}
              >
                <Loader2 size={20} className="animate-spin" style={{ color: C.accent }} />
              </div>
            )}
            {results[active] && (
              <div className="relative">
                <p
                  className="text-[16px] leading-[1.8] font-serif italic mb-5"
                  style={{ color: C.text }}
                  dir={dir}
                >
                  “{results[active]!.rewritten}”
                </p>
                {results[active]!.rationale && (
                  <div
                    className="flex items-start gap-2 pt-4 border-t"
                    style={{ borderColor: C.lineSoft }}
                  >
                    <Eye size={12} className="mt-0.5" style={{ color: C.accent }} />
                    <p
                      className="text-[12px] leading-relaxed"
                      style={{ color: C.text2 }}
                      dir={dir}
                    >
                      {results[active]!.rationale}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
