import Link from "next/link";
import { clinic } from "@/data/contacts";

/** Plantain leaf: the oval blade with parallel arcing veins that meet at the tip. */
export function LeafMark({
  size = 40,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      aria-hidden="true"
      focusable="false"
    >
      <g transform="rotate(28 32 32)">
        <path
          className="leaf-blade"
          d="M32 4C49 18 53 40 32 56C11 40 15 18 32 4Z"
        />
        <g className="leaf-veins" fill="none" strokeLinecap="round">
          <path d="M32 52V10" />
          <path d="M32 52C25 42 24 24 32 10" />
          <path d="M32 52C39 42 40 24 32 10" />
        </g>
        <path className="leaf-stem" d="M32 56V62" fill="none" strokeLinecap="round" />
      </g>
    </svg>
  );
}

export function Logo({
  onNavigate,
}: {
  onNavigate?: (event: { preventDefault: () => void }) => void;
}) {
  return (
    <Link
      href="/"
      className="logo"
      aria-label={`${clinic.name} — главная`}
      onNavigate={onNavigate}
    >
      <LeafMark size={42} className="logo-mark" />
      <span className="logo-text">
        <span className="logo-name">{clinic.name}</span>
        <span className="logo-descriptor">{clinic.descriptor}</span>
      </span>
    </Link>
  );
}
