import type { ReactNode } from "react";

// The opening sequence is CSS-only. All content is visible without JavaScript.
export function HomeMotion({
  children,
  className,
}: {
  children: ReactNode;
  className: string;
}) {
  return <div className={className}>{children}</div>;
}
export function HomeReveal({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
  index?: number;
}) {
  return <div className={className}>{children}</div>;
}
