"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardHomePage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to chatbot page by default
    router.replace("/chatbot");
  }, [router]);

  return (
    <div className="container mx-auto py-6 flex items-center justify-center min-h-screen">
      <div className="text-center">
        <p className="text-muted-foreground">Redirecting...</p>
      </div>
    </div>
  );
}
