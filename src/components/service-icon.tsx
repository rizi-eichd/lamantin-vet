import {
  Stethoscope,
  Syringe,
  ScanLine,
  Scissors,
  HeartPulse,
  Smile,
  ShieldCheck,
  Fingerprint,
  Sparkles,
  House,
} from "lucide-react";
const icons = {
  Stethoscope,
  Syringe,
  ScanLine,
  Scissors,
  HeartPulse,
  Smile,
  ShieldCheck,
  Fingerprint,
  Sparkles,
  House,
};
export function ServiceIcon({
  name,
  size = 28,
}: {
  name: string;
  size?: number;
}) {
  const Icon = icons[name as keyof typeof icons] || Stethoscope;
  return <Icon size={size} strokeWidth={1.5} aria-hidden="true" />;
}
