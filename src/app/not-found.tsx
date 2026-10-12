import Link from "next/link";
import { PawPrint, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
export default function NotFound() {
  return (
    <div className="container not-found">
      <PawPrint size={60} strokeWidth={1.3} />
      <h1>404</h1>
      <h2>Кажется, мы свернули с тропинки</h2>
      <p>
        Этой страницы нет. Вернёмся на главную — там найдутся услуги, контакты и
        запись на приём.
      </p>
      <Button asChild>
        <Link href="/">
          На главную <ArrowRight size={18} />
        </Link>
      </Button>
    </div>
  );
}
