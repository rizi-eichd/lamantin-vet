import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
export default function NotFound() {
  return (
    <div className="container">
      <div className="not-found">
        <span className="not-found-code" aria-hidden="true">
          404
        </span>
        <h1>Кажется, мы свернули с тропинки</h1>
        <p>
          Этой страницы нет. Вернёмся на главную — там найдутся услуги, контакты
          и запись на приём.
        </p>
        <Button asChild>
          <Link href="/">
            На главную <ArrowRight size={18} />
          </Link>
        </Button>
      </div>
    </div>
  );
}
