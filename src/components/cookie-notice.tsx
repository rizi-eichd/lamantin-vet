"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { cookieNoticeValue, hasCookieNotice } from "@/lib/cookie-notice";
import styles from "./cookie-notice.module.css";

const OPEN_NOTICE = "lamantin-vet:cookie-notice";

export function CookieSettings({ className }: { className?: string }) {
  return (
    <button
      type="button"
      className={`${styles.settings} ${className ?? ""}`}
      onClick={() => window.dispatchEvent(new Event(OPEN_NOTICE))}
    >
      Настройки cookie
    </button>
  );
}

export function CookieNotice() {
  const [visible, setVisible] = useState(false);
  const returnFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      try {
        setVisible(!hasCookieNotice(document.cookie));
      } catch {
        setVisible(true);
      }
    });
    const open = () => {
      returnFocus.current =
        document.activeElement instanceof HTMLElement
          ? document.activeElement
          : null;
      setVisible(true);
    };
    window.addEventListener(OPEN_NOTICE, open);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener(OPEN_NOTICE, open);
    };
  }, []);

  function acknowledge() {
    try {
      document.cookie = cookieNoticeValue(location.protocol === "https:");
    } catch {
      // The notice can still be dismissed when browser storage is unavailable.
    }
    setVisible(false);
    if (returnFocus.current?.isConnected) returnFocus.current.focus();
    returnFocus.current = null;
  }

  if (!visible) return null;

  return (
    <section className={styles.notice} aria-labelledby="cookie-notice-title">
      <h2 id="cookie-notice-title">Cookie на сайте</h2>
      <p>
        Мы используем технический cookie, чтобы запомнить закрытие этого
        уведомления на 180 дней. Аналитика и рекламные cookie не подключены.
      </p>
      <div className={styles.actions}>
        <Link href="/cookies">Подробнее о cookie</Link>
        <Button type="button" size="small" onClick={acknowledge}>
          Понятно
        </Button>
      </div>
    </section>
  );
}
