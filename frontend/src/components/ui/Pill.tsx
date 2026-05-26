import type { ReactNode } from "react";
import { C } from "@/lib/tokens";

interface PillProps {
  children: ReactNode;
  color?: string;
  bg?: string;
  border?: string;
}

export function Pill({
  children,
  color = C.text2,
  bg = "transparent",
  border = C.line,
}: PillProps) {
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10.5px] tracking-[0.14em] uppercase font-medium"
      style={{ color, background: bg, border: `1px solid ${border}` }}
    >
      {children}
    </span>
  );
}
