'use client';

import { useParams, useRouter } from 'next/navigation';
import { IntegrationSidebar } from '@/components/chatbot/integration';
import { getIntegrationSidebarItems } from '@/lib/constants/integrations';

export default function WhatsAppAutomationPage() {
    const params = useParams();
    const botId = params.botId as string;
    const integrationId = params.id as string;

    const sidebarItems = getIntegrationSidebarItems('whatsapp');
    const basePath = `/chatbot/${botId}/whatsapp/${integrationId}`;

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