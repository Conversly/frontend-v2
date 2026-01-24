'use client';

import { useParams, useRouter } from 'next/navigation';
import { IntegrationSidebar } from '@/components/chatbot/integration';
import { getIntegrationSidebarItems } from '@/lib/constants/integrations';

export default function WhatsAppAutomationPage() {
    const params = useParams<{ workspaceId: string; botId: string; id: string }>();
    const workspaceId = Array.isArray(params.workspaceId) ? params.workspaceId[0] : params.workspaceId;
    const botId = Array.isArray(params.botId) ? params.botId[0] : params.botId;
    const integrationId = Array.isArray(params.id) ? params.id[0] : params.id;

    const sidebarItems = getIntegrationSidebarItems('whatsapp');
    const basePath = `/${workspaceId}/chatbot/${botId}/whatsapp/${integrationId}`;

    return (
        <div className="flex h-full">
            <IntegrationSidebar
                platform="whatsapp"
                items={sidebarItems}
                basePath={basePath}
            />

            <div className="flex-1 overflow-y-auto bg-background p-6">
                <div>
                    <h1 className="text-2xl font-bold mb-4">Automation</h1>
                    <p className="text-muted-foreground">
                        we recommend autmation here. user can able to create an calls like if he ask then this and then this basically without chatbot user query will resolve
                    </p>
                </div>
            </div>
        </div>
    );
}