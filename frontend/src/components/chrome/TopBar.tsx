"use client";

import { ChevronRight } from "lucide-react";
import { C } from "@/lib/tokens";
import { Pill } from "@/components/ui/Pill";
import { NAV, type ModuleId } from "./nav";

interface TopBarProps {
  active: ModuleId;
}

export function TopBar({ active }: TopBarProps) {
  const current = NAV.find((n) => n.id === active);
  if (!current) return null;

  return (
    <div
      className="hidden lg:flex items-center justify-between px-10 py-7"
      style={{ borderBottom: `1px solid ${C.lineSoft}` }}
    >
      <div>
        <div
          className="flex items-center gap-3 text-[10.5px] tracking-[0.25em] uppercase mb-2"
          style={{ color: C.text3 }}
        >
          <span>Workspace</span>
          <ChevronRight size={10} />
          <span style={{ color: C.text2 }}>{current.label}</span>
        </div>
        <h1
          className="text-[36px] leading-none tracking-tight font-serif italic"
          style={{ color: C.text }}
        >
          {current.label}
          <span style={{ color: C.accent }}>.</span>
        </h1>
      </div>
      <div className="flex items-center gap-3">
        <Pill color={C.text2} border={C.line}>
          <span
            className="w-1 h-1 rounded-full mr-1"
            style={{ background: C.sage }}
          />
          Live AI
        </Pill>
        <Pill color={C.text2} border={C.line}>
          v0.1 · Prototype
        </Pill>
      </div>
    </div>
  );
}
