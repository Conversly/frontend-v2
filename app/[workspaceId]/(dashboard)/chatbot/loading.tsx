import { ChatbotListSkeleton } from '@/components/skeletons';

/**
 * Loading state for the chatbot list page
 * Shows a skeleton representation of the page while data loads
 * This allows the layout to render immediately and stream in content
 */
export default function ChatbotListLoading() {
  return <ChatbotListSkeleton />;
}
