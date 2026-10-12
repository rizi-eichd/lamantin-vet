"use client";

import { useEffect, useRef, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import Image from "@/components/site-image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { clinic, navigation } from "@/data/contacts";
import { Button } from "./ui/button";
import styles from "./fullscreen-menu.module.css";

const photos = ["pets", "entrance", "pharmacy"] as const;
const linkPhotos = [0, 0, 2, 1, 1, 0, 1];

function MenuIcon({ close = false }: { close?: boolean }) {
  return (
    <span
      className={`${styles.icon} ${close ? styles.cross : ""}`}
      aria-hidden="true"
    >
      <span />
      <span />
    </span>
  );
}

export function FullscreenMenu() {
  const router = useRouter();
  const pendingNavigation = useRef<string | null>(null);
  const [open, setOpen] = useState(false);
  const [activePhoto, setActivePhoto] = useState(0);

  useEffect(
    () => () => {
      document.documentElement.style.removeProperty("--menu-origin-y");
    },
    [],
  );

  function changeOpen(next: boolean) {
    if (next) {
      document.documentElement.style.setProperty(
        "--menu-origin-y",
        `${window.scrollY + window.innerHeight * 0.35}px`,
      );
      setActivePhoto(0);
    }
    setOpen(next);
  }

  function navigateAfterClose(
    href: string,
    event: { preventDefault: () => void },
  ) {
    event.preventDefault();
    pendingNavigation.current = href;
    setOpen(false);
  }

  return (
    <Dialog.Root open={open} onOpenChange={changeOpen}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          className={styles.trigger}
          aria-label="Открыть меню"
        >
          <span className={styles.triggerLabel}>Меню</span>
          <MenuIcon />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay} />
        <Dialog.Content
          className={styles.panel}
          data-fullscreen-menu=""
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
            Ветеринарная клиника в Первоуральске
          </Dialog.Description>
          <div className={styles.top}>
            <Dialog.Close asChild>
              <Link
                href="/"
                onNavigate={(event) => navigateAfterClose("/", event)}
                className={styles.brand}
                aria-label="Здоровый питомец — главная"
              >
                <Image
                  src="/images/clinic-logo.png"
                  width={917}
                  height={911}
                  sizes="44px"
                  alt=""
                />
                <span>
                  Здоровый питомец<small>ВЕТЕРИНАРНАЯ КЛИНИКА</small>
                </span>
              </Link>
            </Dialog.Close>
            <Dialog.Close asChild>
              <button
                type="button"
                className={styles.close}
                aria-label="Закрыть меню"
              >
                <span>Закрыть</span>
                <MenuIcon close />
              </button>
            </Dialog.Close>
          </div>
          <div className={styles.body}>
            <nav className={styles.navigation} aria-label="Основная навигация">
              {navigation.map(([name, href], index) => (
                <Dialog.Close asChild key={name}>
                  <Link
                    href={href}
                    onNavigate={(event) => navigateAfterClose(href, event)}
                    onMouseEnter={() => setActivePhoto(linkPhotos[index])}
                    onFocus={() => setActivePhoto(linkPhotos[index])}
                  >
                    <span>{name}</span>
                    <ArrowUpRight size={28} aria-hidden="true" />
                  </Link>
                </Dialog.Close>
              ))}
            </nav>
            <div className={styles.aside}>
              <figure className={styles.photo} aria-hidden="true">
                {photos.map((photo, index) => (
                  <Image
                    key={photo}
                    src={`/images/${photo}.webp`}
                    alt=""
                    fill
                    sizes="(max-width:760px) 1px, 42vw"
                    className={activePhoto === index ? styles.activePhoto : ""}
                  />
                ))}
              </figure>
              <div className={styles.contact}>
                <a className={styles.phone} href={clinic.phoneHref}>
                  {clinic.phone}
                </a>
                <p>
                  {clinic.city}, {clinic.address}
                </p>
                <div className={styles.actions}>
                  <Dialog.Close asChild>
                    <Button asChild>
                      <Link
                        href="/booking"
                        onNavigate={(event) =>
                          navigateAfterClose("/booking", event)
                        }
                      >
                        Записаться на приём <ArrowUpRight size={18} />
                      </Link>
                    </Button>
                  </Dialog.Close>
                  <a
                    href={clinic.maps}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Мы на Яндекс Картах <ArrowUpRight size={15} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
