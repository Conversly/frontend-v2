"use client";

import { useEffect, useRef } from "react";

export function ChatbotIframe() {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (!iframeRef.current) return;

    const iframe = iframeRef.current;
    const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;

    if (!iframeDoc) return;

    // Write the HTML content for the iframe
    iframeDoc.open();
    iframeDoc.write(`
      <!DOCTYPE html>
      <html style="background: transparent;">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            html, body {
              margin: 0;
              padding: 0;
              overflow: visible;
              background: transparent;
              height: 100%;
              width: 100%;
            }
          </style>
        </head>
        <body>
          <script
            src="https://rle3ob7wdla6y74q.public.blob.vercel-storage.com/conversly/loader.min.js"
            data-chatbot-id="s34qkifi608kgew21flmb5bl"
            data-testing="true"
          ></script>
        </body>
      </html>
    `);
    iframeDoc.close();
  }, []);

  return (
    <iframe
      ref={iframeRef}
      title="Chatbot Widget"
      style={{
        position: "fixed",
        bottom: 0,
        right: 0,
        width: "100%",
        height: "100%",
        border: "none",
        pointerEvents: "none",
        zIndex: 9999,
        background: "transparent",
      }}
      // This allows clicks to pass through the transparent parts
      // but the chatbot widget itself should still be clickable
      onMouseOver={(e) => {
        const iframe = e.currentTarget;
        iframe.style.pointerEvents = "auto";
      }}
      onMouseOut={(e) => {
        const iframe = e.currentTarget;
        // Small delay to allow clicks to register
        setTimeout(() => {
          iframe.style.pointerEvents = "none";
        }, 100);
      }}
    />
  );
}
