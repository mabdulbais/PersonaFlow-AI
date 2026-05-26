"use client";

import { useState } from "react";
import { Circle } from "lucide-react";
import { Sidebar } from "@/components/chrome/Sidebar";
import { MobileNav } from "@/components/chrome/MobileNav";
import { TopBar } from "@/components/chrome/TopBar";
import { MessageStudio } from "@/modules/MessageStudio";
import { ToneLibrary } from "@/modules/ToneLibrary";
import { InterviewCoach } from "@/modules/InterviewCoach";
import { InsightsView } from "@/modules/InsightsView";
import type { ModuleId } from "@/components/chrome/nav";
import type { AnalyzeResponse, Language } from "@/lib/schemas";
import { LANGUAGES } from "@/lib/lang";
import { C } from "@/lib/tokens";

export interface SharedAnalysis extends AnalyzeResponse {
  source: string;
}

export function Workspace() {
  const [active, setActive] = useState<ModuleId>("studio");
  const [language, setLanguage] = useState<Language>("en");
  const [shared, setShared] = useState<SharedAnalysis | null>(null);

  return (
    <div className="flex w-full">
      <Sidebar
        active={active}
        setActive={setActive}
        language={language}
        setLanguage={setLanguage}
      />

      <main className="flex-1 min-w-0 flex flex-col">
        <MobileNav active={active} setActive={setActive} />
        <TopBar active={active} />

        {/* Mobile brand bar */}
        <div className="lg:hidden px-5 pt-5 pb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center"
              style={{ background: C.accent }}
            >
              <Circle
                size={8}
                strokeWidth={3}
                style={{ color: C.bg, fill: C.bg }}
              />
            </div>
            <span className="text-[14px] font-medium">PersonaFlow AI</span>
          </div>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as Language)}
            className="text-[11px] px-2 py-1 rounded bg-transparent outline-none"
            style={{ border: `1px solid ${C.line}`, color: C.text2 }}
          >
            {LANGUAGES.map((l) => (
              <option key={l.code} value={l.code} style={{ background: C.bg }}>
                {l.native}
              </option>
            ))}
          </select>
        </div>

        <div className="px-5 lg:px-10 py-8 lg:py-10 flex-1 max-w-content w-full">
          <div className="fadeup" key={active}>
            {active === "studio" && (
              <MessageStudio language={language} onAnalysis={setShared} />
            )}
            {active === "tones" && <ToneLibrary language={language} />}
            {active === "interview" && <InterviewCoach language={language} />}
            {active === "insights" && <InsightsView shared={shared} />}
          </div>
        </div>

        <footer
          className="px-5 lg:px-10 py-6 mt-auto border-t flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3"
          style={{ borderColor: C.lineSoft }}
        >
          <p
            className="text-[10.5px] tracking-[0.2em] uppercase"
            style={{ color: C.text3 }}
          >
            PersonaFlow AI · Course Prototype · Human-Centered AI Principles
          </p>
          <p className="text-[10.5px]" style={{ color: C.text3 }}>
            Powered by{" "}
            <span style={{ color: C.text2 }}>Anthropic</span> · Built with care.
          </p>
        </footer>
      </main>
    </div>
  );
}
