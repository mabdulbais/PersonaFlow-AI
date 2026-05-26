import type { ReactNode } from "react";
import { C } from "@/lib/tokens";

interface SectionLabelProps {
  num: string;
  children: ReactNode;
}

export function SectionLabel({ num, children }: SectionLabelProps) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span
        className="text-[10px] tracking-[0.3em] font-medium"
        style={{ color: C.text3 }}
      >
        {num}
      </span>
      <span className="h-px flex-1" style={{ background: C.line }} />
      <span
        className="text-[10px] tracking-[0.3em] uppercase font-medium"
        style={{ color: C.text2 }}
      >
        {children}
      </span>
    </div>
  );
}
