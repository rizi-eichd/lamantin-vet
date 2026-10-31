"use client";
import { Button } from "@/components/ui/button";
import { clinic } from "@/data/contacts";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <div className="error-page">
      <h1>Не удалось загрузить страницу</h1>
      <p>Попробуйте ещё раз или позвоните: {clinic.phone}.</p>
      <Button onClick={reset}>Попробовать снова</Button>
    </div>
  );
}
