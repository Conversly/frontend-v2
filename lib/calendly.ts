"use client";

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
    };
  }
}

const calendlyUrl = "https://calendly.com/rdhakad2002/30min";

export async function openCalendlyPopup() {
  if (!document.querySelector('link[data-calendly-css="true"]')) {
    const link = document.createElement("link");
    link.href = "https://assets.calendly.com/assets/external/widget.css";
    link.rel = "stylesheet";
    link.dataset.calendlyCss = "true";
    document.head.appendChild(link);
  }

  if (!window.Calendly) {
    await new Promise<void>((resolve, reject) => {
      const existingScript = document.querySelector<HTMLScriptElement>(
        'script[data-calendly-script="true"]',
      );

      if (existingScript) {
        existingScript.addEventListener("load", () => resolve(), { once: true });
        existingScript.addEventListener(
          "error",
          () => reject(new Error("Failed to load Calendly")),
          { once: true },
        );
        return;
      }

      const script = document.createElement("script");
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      script.dataset.calendlyScript = "true";
      script.onload = () => resolve();
      script.onerror = () => reject(new Error("Failed to load Calendly"));
      document.body.appendChild(script);
    });
  }

  window.Calendly?.initPopupWidget({ url: calendlyUrl });
}
