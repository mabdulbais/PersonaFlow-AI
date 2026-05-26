import { C } from "@/lib/tokens";

interface ErrorPanelProps {
  message: string;
}

export function ErrorPanel({ message }: ErrorPanelProps) {
  return (
    <div
      className="rounded-lg p-6"
      style={{ background: C.card, border: `1px solid ${C.rose}55` }}
    >
      <p className="text-[13px]" style={{ color: C.rose }}>
        {message}
      </p>
    </div>
  );
}
