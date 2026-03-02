import { Skeleton } from '@/components/ui/skeleton';

/**
 * Contact list item skeleton for WhatsApp-style chat
 * Shows avatar + name + message preview + timestamp
 */
function ContactItemSkeleton() {
  return (
    <div className="flex items-center gap-3 px-3 py-3">
      <Skeleton className="h-12 w-12 shrink-0 rounded-full" />
      <div className="min-w-0 flex-1">
        <div className="mb-1 flex items-center justify-between">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-14" />
        </div>
        <Skeleton className="h-3 w-3/4" />
      </div>
    </div>
  );
}

/**
 * Chat message bubble skeleton
 * Alternates between user (left) and bot (right) styles
 */
function MessageBubbleSkeleton({ isUser = false }: { isUser?: boolean }) {
  const width = isUser ? 'w-3/4' : 'w-2/3';
  return (
    <div className={`mb-1 flex w-full ${isUser ? 'justify-start' : 'justify-end'}`}>
      <Skeleton className={`${width} h-12 rounded-lg`} />
    </div>
  );
}

/**
 * WhatsApp live chat page skeleton
 * Shows contact list sidebar + chat area with message bubbles
 */
export function ChatHistorySkeleton() {
  return (
    <div className="flex h-full w-full overflow-hidden">
      {/* Contact List Panel */}
      <div className="flex w-full flex-shrink-0 flex-col border-r bg-white md:w-[400px]">
        {/* Header */}
        <div className="flex h-16 shrink-0 items-center justify-between bg-[#f0f2f5] px-4">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="flex gap-3">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
        </div>

        {/* Search Bar */}
        <div className="border-b bg-white p-2">
          <Skeleton className="h-9 w-full rounded-lg" />
        </div>

        {/* Contact List */}
        <div className="flex-1 overflow-hidden">
          <ContactItemSkeleton />
          <ContactItemSkeleton />
          <ContactItemSkeleton />
          <ContactItemSkeleton />
          <ContactItemSkeleton />
          <ContactItemSkeleton />
        </div>
      </div>

      {/* Chat Area */}
      <div className="hidden flex-1 flex-col md:flex">
        {/* Chat Header */}
        <div className="flex h-16 shrink-0 items-center justify-between bg-[#f0f2f5] px-4">
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-1.5">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
        </div>

        {/* Messages Area */}
        <div className="relative flex-1 bg-[#efeae2] p-4">
          <MessageBubbleSkeleton isUser />
          <MessageBubbleSkeleton />
          <MessageBubbleSkeleton isUser />
          <MessageBubbleSkeleton />
          <MessageBubbleSkeleton isUser />
        </div>

        {/* Message Input */}
        <div className="h-16 shrink-0 bg-[#f0f2f5] p-2">
          <Skeleton className="h-12 w-full rounded-lg" />
        </div>
      </div>
    </div>
  );
}

/**
 * Just the contact list sidebar skeleton
 * Useful when only refreshing contacts
 */
export function ContactListSkeleton() {
  return (
    <div className="flex h-full flex-col border-r bg-white">
      {/* Header */}
      <div className="flex h-16 shrink-0 items-center justify-between bg-[#f0f2f5] px-4">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="flex gap-3">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      </div>

      {/* Search Bar */}
      <div className="border-b bg-white p-2">
        <Skeleton className="h-9 w-full rounded-lg" />
      </div>

      {/* Contact List */}
      <div className="flex-1 overflow-hidden">
        <ContactItemSkeleton />
        <ContactItemSkeleton />
        <ContactItemSkeleton />
        <ContactItemSkeleton />
        <ContactItemSkeleton />
        <ContactItemSkeleton />
      </div>
    </div>
  );
}
