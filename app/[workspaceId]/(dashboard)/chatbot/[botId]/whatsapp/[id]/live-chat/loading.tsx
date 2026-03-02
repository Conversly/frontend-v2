import { ChatHistorySkeleton } from '@/components/skeletons';

/**
 * Loading state for the WhatsApp live chat page
 * Shows contact list sidebar skeleton and chat area with message bubbles
 * Allows static UI to render while contacts and messages load
 */
export default function LiveChatLoading() {
  return <ChatHistorySkeleton />;
}
