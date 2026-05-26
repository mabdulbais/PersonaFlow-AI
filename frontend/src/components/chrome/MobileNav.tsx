"use client";

import { C } from "@/lib/tokens";
import { NAV, type ModuleId } from "./nav";

interface MobileNavProps {
  active: ModuleId;
  setActive: (id: ModuleId) => void;
}

export function MobileNav({ active, setActive }: MobileNavProps) {
  return (
    <div
      className="lg:hidden sticky top-0 z-20 flex overflow-x-auto px-4 py-3 gap-2"
      style={{ background: C.surface, borderBottom: `1px solid ${C.line}` }}
    >
      {NAV.map((n) => {
        const Icon = n.icon;
        const isActive = active === n.id;
        return (
          <button
            key={n.id}
            onClick={() => setActive(n.id)}
            className="flex-shrink-0 text-[11px] tracking-[0.15em] uppercase px-3 py-2 rounded-md flex items-center gap-2"
            style={{
              background: isActive ? C.card : "transparent",
              border: `1px solid ${isActive ? `${C.accent}55` : C.line}`,
              color: isActive ? C.accent : C.text2,
            }}
          >
            <Icon size={12} />
            {n.label.split(" ")[0]}
          </button>
        );
      })}
    </div>
  );
}
