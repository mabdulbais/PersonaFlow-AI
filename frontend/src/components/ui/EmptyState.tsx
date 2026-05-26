import type { LucideIcon } from "lucide-react";
import { C } from "@/lib/tokens";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  body: React.ReactNode;
  minHeight?: number;
}

export function EmptyState({ icon: Icon, title, body, minHeight = 520 }: EmptyStateProps) {
  return (
    <div
      className="rounded-lg flex flex-col items-center justify-center text-center px-8 py-16"
      style={{
        background: C.card,
        border: `1px dashed ${C.line}`,
        minHeight,
      }}
    >
      <div
        className="w-12 h-12 rounded-full mb-5 flex items-center justify-center"
        style={{
          background: C.accentSft,
          border: `1px solid ${C.accent}33`,
        }}
      >
        <Icon size={18} style={{ color: C.accent }} />
      </div>
      <p
        className="text-[22px] font-semibold tracking-tight mb-2"
        style={{ color: C.text }}
      >
        {title}
      </p>
      <p
        className="text-[12.5px] max-w-xs leading-relaxed"
        style={{ color: C.text3 }}
      >
        {body}
      </p>
    </div>
  );
}
