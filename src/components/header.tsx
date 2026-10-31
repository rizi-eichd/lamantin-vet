import Link from "next/link";
import { Phone, ArrowUpRight } from "lucide-react";
import { clinic, navigation } from "@/data/contacts";
import { Button } from "./ui/button";
import { FullscreenMenu } from "./fullscreen-menu";
import { Logo } from "./brand";
export { Logo };
export function Header() {
  return (
    <header className="header">
      <div className="container header-inner">
        <Logo />
        <nav className="header-nav" aria-label="Разделы сайта">
          {navigation.slice(1).map(([name, href]) => (
            <Link key={name} href={href}>
              {name}
            </Link>
          ))}
        </nav>
        <a href={clinic.phoneHref} className="header-phone">
          <Phone size={17} aria-hidden="true" />
          {clinic.phone}
        </a>
        <Button asChild size="small" variant="sprout" className="header-book">
          <Link href="/booking">
            Записаться <ArrowUpRight size={17} />
          </Link>
        </Button>
        <FullscreenMenu />
      </div>
    </header>
  );
}
