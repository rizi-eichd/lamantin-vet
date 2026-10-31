"use client";

import { useRef, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowUpRight, X } from "lucide-react";
import { clinic, navigation } from "@/data/contacts";
import { Button } from "./ui/button";
import { Logo } from "./brand";
import styles from "./fullscreen-menu.module.css";

export function FullscreenMenu() {
  const router = useRouter();
  const pendingNavigation = useRef<string | null>(null);
  const [open, setOpen] = useState(false);

  function navigateAfterClose(
    href: string,
    event: { preventDefault: () => void },
  ) {
    event.preventDefault();
    pendingNavigation.current = href;
    setOpen(false);
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button type="button" className={styles.trigger} aria-label="Открыть меню">
          <span className={styles.triggerLabel}>Меню</span>
          <span className={styles.icon} aria-hidden="true">
            <span />
            <span />
          </span>
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay} />
        <Dialog.Content
          className={styles.panel}
          onCloseAutoFocus={() => {
            // Route after the exit animation and scroll lock release, so anchor
            // positions are measured against the restored page.
            const href = pendingNavigation.current;
            pendingNavigation.current = null;
            if (href) router.push(href);
          }}
        >
          <Dialog.Title className="sr-only">Навигация по сайту</Dialog.Title>
          <Dialog.Description className="sr-only">
            Ветеринарная клиника «{clinic.name}» в Санкт-Петербурге
          </Dialog.Description>
          <div className={`container ${styles.top}`}>
            <Logo onNavigate={(event) => navigateAfterClose("/", event)} />
            <Dialog.Close asChild>
              <button type="button" className={styles.close} aria-label="Закрыть меню">
                <span>Закрыть</span>
                <X size={22} strokeWidth={2} aria-hidden="true" />
              </button>
            </Dialog.Close>
          </div>
          <div className={`container ${styles.body}`}>
            <nav className={styles.navigation} aria-label="Основная навигация">
              {navigation.map(([name, href], index) => (
                <Link
                  key={name}
                  href={href}
                  style={{ animationDelay: `${60 + index * 40}ms` }}
                  onNavigate={(event) => navigateAfterClose(href, event)}
                >
                  <span>{name}</span>
                  <ArrowUpRight size={28} aria-hidden="true" />
                </Link>
              ))}
            </nav>
            <div className={styles.contact}>
              <a className={styles.phone} href={clinic.phoneHref}>
                {clinic.phone}
              </a>
              <p>
                {clinic.city}, {clinic.address}
                <br />
                {clinic.hours}
              </p>
              <Button asChild variant="sprout">
                <Link
                  href="/booking"
                  onNavigate={(event) => navigateAfterClose("/booking", event)}
                >
                  Записаться на приём <ArrowUpRight size={18} />
                </Link>
              </Button>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
