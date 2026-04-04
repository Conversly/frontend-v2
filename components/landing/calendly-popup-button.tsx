"use client";

import type { ComponentProps } from "react";
import { Calendar } from "lucide-react";

import { Button } from "@/components/ui/button";
import { openCalendlyPopup } from "@/lib/calendly";

export default function CalendlyPopupButton({
  className,
  label = "Book a demo",
  icon = false,
  variant = "default",
  size = "lg",
}: {
  className?: string;
  label?: string;
  icon?: boolean;
  variant?: ComponentProps<typeof Button>["variant"];
  size?: ComponentProps<typeof Button>["size"];
}) {
  return (
    <Button
      size={size}
      variant={variant}
      onClick={() => void openCalendlyPopup()}
      className={className}
    >
      {icon ? <Calendar className="mr-2 h-5 w-5" /> : null}
      {label}
    </Button>
  );
}
