const DEFAULT_CHATBOT_BRAND_TOKEN = '--chatbot-brand-default';
const DEFAULT_CHATBOT_BRAND_FALLBACK = 'rgb(14, 75, 117)';

function readCssToken(tokenName: string): string | null {
  if (typeof window === 'undefined') return null;

  const value = window.getComputedStyle(document.documentElement)
    .getPropertyValue(tokenName)
    .trim();

  return value || null;
}

export function getDefaultChatbotBrandColor(): string {
  return readCssToken(DEFAULT_CHATBOT_BRAND_TOKEN) ?? DEFAULT_CHATBOT_BRAND_FALLBACK;
}

export function getChatbotBrandColor(color?: string | null): string {
  return color?.trim() || getDefaultChatbotBrandColor();
}
