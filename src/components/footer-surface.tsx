"use client";

import { useEffect, useRef, type ReactNode } from "react";
import styles from "./footer-surface.module.css";

export function FooterSurface({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const footer = ref.current;
    if (!footer) return;
    let visible = false;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      footer.dataset.running = String(
        visible && !document.hidden && !reduced.matches,
      );
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) footer.dataset.revealed = "true";
        update();
      },
      { threshold: 0 },
    );
    observer.observe(footer);
    document.addEventListener("visibilitychange", update);
    reduced.addEventListener("change", update);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
      reduced.removeEventListener("change", update);
    };
  }, []);

  return (
    <footer
      ref={ref}
      className={`footer ${styles.surface}`}
      data-running="false"
    >
      <div className={styles.light} aria-hidden="true" />
      {children}
      <div className={`container ${styles.wordmark}`} aria-hidden="true">
        <span>Здоровый</span>
        <span>питомец</span>
      </div>
    </footer>
  );
}
