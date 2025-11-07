'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function DataSourcesPage() {
  const params = useParams();
  const botId = params.botId as string;
  const router = useRouter();

  // Redirect to productivity page by default
  useEffect(() => {
    if (botId) {
      router.replace(`/chatbot/${botId}/sources/productivity`);
    }
  }, [botId, router]);

  return (
    <div className="bg-background min-h-screen flex items-center justify-center">
      <div className="text-foreground font-heading text-xl">Redirecting...</div>
    </div>
  );
}

