import {
  Activity,
  GraduationCap,
  MessageSquare,
  Wand2,
  type LucideIcon,
} from "lucide-react";

export type ModuleId = "studio" | "tones" | "interview" | "insights";

export interface NavItem {
  id: ModuleId;
  num: string;
  label: string;
  icon: LucideIcon;
  blurb: string;
}

export const NAV: NavItem[] = [
  { id: "studio",    num: "01", label: "Message Studio",        icon: MessageSquare,  blurb: "Analyze · refine" },
  { id: "tones",     num: "02", label: "Tone Library",          icon: Wand2,          blurb: "Eight voices" },
  { id: "interview", num: "03", label: "Interview Coach",       icon: GraduationCap,  blurb: "Practice · review" },
  { id: "insights",  num: "04", label: "Personality Insights",  icon: Activity,       blurb: "Your profile" },
];
