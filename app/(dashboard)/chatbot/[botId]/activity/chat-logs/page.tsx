"use client";

export default function ChatLogsPage() {
  return (
    <div className="flex h-full flex-col bg-background">
      <div className="border-b bg-background px-6 py-4">
        <h1 className="text-xl font-semibold">Chat Logs</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          View and analyze all chat conversations
        </p>
      </div>
      <div className="flex-1 overflow-y-auto p-6">
        <p className="text-sm text-muted-foreground">Chat logs will be displayed here</p>
      </div>
    </div>
  );
}
