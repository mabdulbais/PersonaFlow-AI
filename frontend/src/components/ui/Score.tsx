import { C } from "@/lib/tokens";

interface ScoreProps {
  value: number;
}

export function Score({ value }: ScoreProps) {
  return (
    <div className="flex items-baseline gap-1">
      <span
        className="text-[88px] leading-none tracking-tighter font-mono font-light"
        style={{ color: C.text }}
      >
        {value}
      </span>
      <span className="text-[15px] tracking-tight" style={{ color: C.text3 }}>
        /100
      </span>
    </div>
  );
}
