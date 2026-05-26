import { C } from "@/lib/tokens";

interface EmotionDotProps {
  name: string;
  intensity: number;
}

export function EmotionDot({ name, intensity }: EmotionDotProps) {
  const tone =
    intensity >= 70 ? C.accent : intensity >= 40 ? C.amber : C.ink;
  return (
    <div
      className="flex items-center gap-2 px-3 py-2 rounded-md"
      style={{ background: C.card, border: `1px solid ${C.line}` }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{ background: tone, boxShadow: `0 0 8px ${tone}` }}
      />
      <span className="text-[12px]" style={{ color: C.text }}>
        {name}
      </span>
      <span className="text-[10px] font-mono" style={{ color: C.text3 }}>
        {intensity}
      </span>
    </div>
  );
}
