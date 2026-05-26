import { C } from "@/lib/tokens";

interface BarProps {
  value: number;
  label: string;
  hint?: string;
}

export function Bar({ value, label, hint }: BarProps) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-baseline justify-between">
        <span className="text-[13px]" style={{ color: C.text }}>
          {label}
        </span>
        <span
          className="text-[11px] font-mono tabular-nums"
          style={{ color: C.text3 }}
        >
          {value}
          <span style={{ color: C.text3 }}>/100</span>
        </span>
      </div>
      <div
        className="h-[3px] rounded-full overflow-hidden"
        style={{ background: C.lineSoft }}
      >
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{ width: `${value}%`, background: C.accent }}
        />
      </div>
      {hint && (
        <p className="text-[11px] leading-snug" style={{ color: C.text3 }}>
          {hint}
        </p>
      )}
    </div>
  );
}
