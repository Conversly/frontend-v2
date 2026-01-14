'use client';

import { useEditGuard } from '@/store/branch';
import { LiveModeOverlay } from '@/components/chatbot/LiveModeOverlay';
import { usePathname, useParams } from 'next/navigation';

export default function SourcesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { isLiveMode } = useEditGuard();
    const pathname = usePathname();
    const params = useParams();

    // Check if we are on the main sources page (e.g. /chatbot/bot_123/sources)
    // Sub-pages like /chatbot/bot_123/sources/website will be covered by the overlay
    const botId = Array.isArray(params.botId) ? params.botId[0] : params.botId;
    const mainSourcesPath = `/chatbot/${botId}/sources`;
    const isMainSourcesPage = pathname === mainSourcesPath;

    const showOverlay = isLiveMode && !isMainSourcesPage;

    return (
        <div className="relative h-full w-full">
            {showOverlay && <LiveModeOverlay />}
            <div className={showOverlay ? 'pointer-events-none select-none blur-[1px]' : ''}>
                {children}
            </div>
        </div>
    );
}
