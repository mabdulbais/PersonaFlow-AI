import type { ToneKey } from "./schemas";

export interface ToneDef {
  key: ToneKey;
  label: string;
  blurb: string;
}

export const TONES: ToneDef[] = [
  { key: "formal",      label: "Formal",       blurb: "Polished, professional, structured." },
  { key: "empathetic",  label: "Empathetic",   blurb: "Warm, validating, emotionally aware." },
  { key: "leadership",  label: "Leadership",   blurb: "Confident, decisive, vision-led." },
  { key: "diplomatic",  label: "Diplomatic",   blurb: "Tactful, balanced, conflict-soothing." },
  { key: "direct",      label: "Direct",       blurb: "Clear, concise, no fluff." },
  { key: "encouraging", label: "Encouraging",  blurb: "Uplifting, motivating, positive." },
  { key: "apologetic",  label: "Apologetic",   blurb: "Accountable, sincere, reparative." },
  { key: "persuasive",  label: "Persuasive",   blurb: "Compelling, evidence-led, magnetic." },
];

export const toneByKey = (key: ToneKey): ToneDef =>
  TONES.find((t) => t.key === key) ?? TONES[0];
