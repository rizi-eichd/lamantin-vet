"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import Image from "@/components/site-image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowUpRight, X } from "lucide-react";
import { clinic, navigation } from "@/data/contacts";
import { animalPhotos } from "@/data/animal-photos";
import { Button } from "./ui/button";
import styles from "./fullscreen-menu.module.css";

const photos = [
  { src: animalPhotos.menu.src, position: animalPhotos.menu.position },
  { src: "/images/lamantin-building.webp", position: "50% 50%" },
  { src: "/images/lamantin-reception.webp", position: "50% 50%" },
] as const;
const linkPhotos = [0, 0, 2, 1, 1, 0, 1];

function readMenuViewport() {
  const viewport = window.visualViewport;
  return {
    width: viewport?.width ?? window.innerWidth,
    height: viewport?.height ?? window.innerHeight,
    left: viewport?.offsetLeft ?? 0,
    top: viewport?.offsetTop ?? 0,
  };
}

function MenuIcon() {
  return (
    <span className={styles.icon} aria-hidden="true">
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
  const [viewport, setViewport] = useState<ReturnType<
    typeof readMenuViewport
  > | null>(null);

  useEffect(() => {
    if (!open) return;
    const updateViewport = () => setViewport(readMenuViewport());
    const visibleViewport = window.visualViewport;
    window.addEventListener("resize", updateViewport);
    visibleViewport?.addEventListener("resize", updateViewport);
    visibleViewport?.addEventListener("scroll", updateViewport);
    return () => {
      window.removeEventListener("resize", updateViewport);
      visibleViewport?.removeEventListener("resize", updateViewport);
      visibleViewport?.removeEventListener("scroll", updateViewport);
    };
  }, [open]);

  useEffect(
    () => () => {
      document.documentElement.style.removeProperty("--menu-origin-y");
    },
    [],
  );

  function changeOpen(next: boolean) {
    if (next) {
      setViewport(readMenuViewport());
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
          data-compact={viewport && viewport.width <= 760 ? "true" : undefined}
          style={
            viewport
              ? ({
                  "--menu-view-width": `${viewport.width}px`,
                  "--menu-view-height": `${viewport.height}px`,
                  "--menu-view-left": `${viewport.left}px`,
                  "--menu-view-top": `${viewport.top}px`,
                } as CSSProperties)
              : undefined
          }
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
            Ветеринарная клиника в Санкт-Петербурге
          </Dialog.Description>
          <div className={styles.top}>
            <Dialog.Close asChild>
              <Link
                href="/"
                onNavigate={(event) => navigateAfterClose("/", event)}
                className={styles.brand}
                aria-label="Ламантин — главная"
              >
                <Image
                  src="/images/lamantin-logo.svg"
                  width={64}
                  height={64}
                  sizes="44px"
                  alt=""
                />
                <span>
                  {clinic.name}
                  <small>ВЕТЕРИНАРНАЯ КЛИНИКА</small>
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
                <X size={24} strokeWidth={1.8} aria-hidden="true" />
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
                    key={photo.src}
                    src={photo.src}
                    style={{ objectPosition: photo.position }}
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
                    Мы на 2ГИС <ArrowUpRight size={15} />
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
