"use client";
import { Button } from "@/components/ui/button";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <div className="error-page">
      <h1>Не удалось загрузить страницу</h1>
      <p>Попробуйте ещё раз или позвоните: +7 (473) 290-46-84.</p>
      <Button onClick={reset}>Попробовать снова</Button>
    </div>
  );
}
