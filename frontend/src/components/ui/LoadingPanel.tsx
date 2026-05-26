import { Loader2 } from "lucide-react";
import { C } from "@/lib/tokens";

interface LoadingPanelProps {
  hint?: string;
  minHeight?: number;
}

export function LoadingPanel({
  hint = "Reading between the lines…",
  minHeight = 520,
}: LoadingPanelProps) {
  return (
    <div
      className="rounded-lg flex flex-col items-center justify-center px-8 py-16 relative overflow-hidden"
      style={{
        background: C.card,
        border: `1px solid ${C.line}`,
        minHeight,
      }}
    >
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at 50% 30%, ${C.accentSft}, transparent 60%)`,
        }}
      />
      <div className="relative">
        <Loader2 size={22} className="animate-spin" style={{ color: C.accent }} />
      </div>
      <p
        className="relative mt-5 text-[11px] tracking-[0.22em] uppercase"
        style={{ color: C.text2 }}
      >
        {hint}
      </p>
    </div>
  );
}
