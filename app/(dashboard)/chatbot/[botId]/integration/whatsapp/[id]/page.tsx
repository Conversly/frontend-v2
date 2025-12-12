'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { IntegrationSidebar } from '@/components/chatbot/integration';
import { getIntegrationSidebarItems } from '@/lib/constants/integrations';
import { Loader2 } from 'lucide-react';

export default function WhatsAppIntegrationPage() {
  const routeParams = useParams<{ botId: string; id: string }>();
  const router = useRouter();
  const botId = Array.isArray(routeParams.botId) ? routeParams.botId[0] : routeParams.botId;
  const integrationId = Array.isArray(routeParams.id) ? routeParams.id[0] : routeParams.id;

  useEffect(() => {
    // Redirect to chats by default
    if (botId && integrationId) {
      router.replace(`/chatbot/${botId}/integration/whatsapp/${integrationId}/live-chat`);
    }
  }, [botId, integrationId, router]);

  if (!botId || !integrationId) {
    return null;
  }

  const sidebarItems = getIntegrationSidebarItems('whatsapp');
  const basePath = `/chatbot/${botId}/integration/whatsapp/${integrationId}`;

  return (
    <div className="flex h-full">
      <IntegrationSidebar
        platform="whatsapp"
        items={sidebarItems}
        basePath={basePath}
        onClose={() => router.push(`/chatbot/${botId}/integration`)}
      />
      <div className="flex-1 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    </div>
  );
}

