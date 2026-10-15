"use client";
import Link from "next/link";
import Image from "@/components/site-image";
import { Phone, ArrowUpRight } from "lucide-react";
import { clinic } from "@/data/contacts";
import { Button } from "./ui/button";
import { FullscreenMenu } from "./fullscreen-menu";
export function Logo() {
  return (
    <Link href="/" className="logo" aria-label="Ламантин — главная">
      <span className="logo-mark">
        <Image
          src="/images/lamantin-logo-round.png"
          alt=""
          width={862}
          height={862}
          sizes="(max-width: 760px) 44px, 56px"
        />
      </span>
      <span>
        {clinic.name}
        <small>ВЕТЕРИНАРНАЯ КЛИНИКА</small>
      </span>
    </Link>
  );
}
export function Header() {
  return (
    <>
      <div className="topbar">
        <div className="container">
          <span>{clinic.city} · {clinic.shortAddress}</span>
          <span>Ветеринарная клиника · По предварительной записи</span>
        </div>
      </div>
      <header className="header">
        <div className="container header-inner">
          <Logo />
          <a href={clinic.phoneHref} className="header-phone">
            <Phone size={16} />
            {clinic.phone}
          </a>
          <Button asChild size="small" className="header-book">
            <Link href="/booking">
              Заявка на приём <ArrowUpRight size={17} />
            </Link>
          </Button>
          <FullscreenMenu />
        </div>
      </header>
    </>
  );
}
