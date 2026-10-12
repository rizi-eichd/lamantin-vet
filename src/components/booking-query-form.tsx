"use client";

import { useSearchParams } from "next/navigation";
import { activeServices } from "@/data/services";
import { BookingForm } from "./booking-form";

export function BookingQueryForm() {
  const params = useSearchParams();
  const requested = params.get("service");
  const service = activeServices.some((item) => item.slug === requested)
    ? requested || ""
    : "";
  return <BookingForm key={service} initialService={service} />;
}
