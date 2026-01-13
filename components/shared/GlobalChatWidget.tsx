"use client";

import { usePathname } from "next/navigation";
import Script from "next/script";

export default function GlobalChatWidget() {
    const pathname = usePathname();

    // Hide on help pages or specific routes
    if (pathname?.startsWith("/help/")) {
        return null;
    }

    return (
        <Script
            src="https://rle3ob7wdla6y74q.public.blob.vercel-storage.com/conversly/loader.min-pf4u9XgaMufJykfap9O3WjmBK4rQVV.js"
            data-chatbot-id="qtiggf3l7ptqshvuqm8iktsn"
            data-testing="false"
            strategy="afterInteractive"
        />
    );
}
