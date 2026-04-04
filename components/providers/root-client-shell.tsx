"use client";

import StickyCTABar from "@/components/landing/sticky-cta-bar";
import { Toaster } from "@/components/ui/sonner";

export default function RootClientShell() {
  return (
    <>
      <Toaster />
      <StickyCTABar />
    </>
  );
}
