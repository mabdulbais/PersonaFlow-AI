"use client";

import { ChevronRight, Circle, Languages } from "lucide-react";
import { C } from "@/lib/tokens";
import { LANGUAGES } from "@/lib/lang";
import type { Language } from "@/lib/schemas";
import { NAV, type ModuleId } from "./nav";

interface SidebarProps {
  active: ModuleId;
  setActive: (id: ModuleId) => void;
  language: Language;
  setLanguage: (l: Language) => void;
}

export function Sidebar({ active, setActive, language, setLanguage }: SidebarProps) {
  return (
    <aside
      className="hidden lg:flex flex-col w-[300px] flex-shrink-0 h-screen sticky top-0"
      style={{ background: C.surface, borderRight: `1px solid ${C.line}` }}
    >
      {/* Brand */}
      <div className="px-7 pt-8 pb-6">
        <div className="flex items-center gap-2.5 mb-1">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center"
            style={{ background: C.accent }}
          >
            <Circle size={10} strokeWidth={3} style={{ color: C.bg, fill: C.bg }} />
          </div>
          <span
            className="text-[15px] tracking-tight font-medium"
            style={{ color: C.text }}
          >
            PersonaFlow
          </span>
          <span
            className="text-[10px] tracking-[0.25em] uppercase ml-1 px-1.5 py-0.5 rounded"
            style={{
              color: C.accent,
              background: C.accentSft,
              border: `1px solid ${C.accent}33`,
            }}
          >
            AI
          </span>
        </div>
        <p
          className="text-[11.5px] leading-snug mt-3 font-light"
          style={{ color: C.text3 }}
        >
          Adaptive intelligence for human communication.
        </p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-4 space-y-1">
        <p
          className="text-[9.5px] tracking-[0.3em] uppercase px-3 mb-3"
          style={{ color: C.text3 }}
        >
          Modules
        </p>
        {NAV.map((n) => {
          const isActive = active === n.id;
          const Icon = n.icon;
          return (
            <button
              key={n.id}
              onClick={() => setActive(n.id)}
              className="w-full text-left px-3 py-2.5 rounded-md flex items-start gap-3 transition-all group"
              style={{
                background: isActive ? C.card : "transparent",
                border: `1px solid ${isActive ? C.line : "transparent"}`,
              }}
            >
              <span
                className="text-[9.5px] font-mono mt-1 tabular-nums"
                style={{ color: isActive ? C.accent : C.text3 }}
              >
                {n.num}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <Icon size={12} style={{ color: isActive ? C.accent : C.text2 }} />
                  <span
                    className="text-[13px]"
                    style={{ color: isActive ? C.text : C.text2 }}
                  >
                    {n.label}
                  </span>
                </div>
                <p className="text-[10.5px] mt-0.5" style={{ color: C.text3 }}>
                  {n.blurb}
                </p>
              </div>
              {isActive && (
                <ChevronRight size={12} style={{ color: C.accent }} />
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer — language */}
      <div className="p-4 border-t" style={{ borderColor: C.line }}>
        <p
          className="text-[9.5px] tracking-[0.3em] uppercase px-3 mb-3 flex items-center gap-2"
          style={{ color: C.text3 }}
        >
          <Languages size={11} /> Language
        </p>
        <div className="space-y-1 mb-4">
          {LANGUAGES.map((l) => (
            <button
              key={l.code}
              onClick={() => setLanguage(l.code)}
              className="w-full flex items-center justify-between px-3 py-2 rounded-md text-[12px] transition-all"
              style={{
                background: language === l.code ? C.card : "transparent",
                border: `1px solid ${language === l.code ? C.line : "transparent"}`,
                color: language === l.code ? C.text : C.text2,
              }}
            >
              <span>{l.label}</span>
              <span style={{ color: C.text3, fontSize: 11 }}>{l.native}</span>
            </button>
          ))}
        </div>
        <div
          className="px-3 py-3 rounded-md flex items-center gap-2"
          style={{ background: C.bg, border: `1px solid ${C.lineSoft}` }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: C.sage, boxShadow: `0 0 6px ${C.sage}` }}
          />
          <span className="text-[10.5px]" style={{ color: C.text2 }}>
            AI engine online
          </span>
        </div>
      </div>
    </aside>
  );
}
