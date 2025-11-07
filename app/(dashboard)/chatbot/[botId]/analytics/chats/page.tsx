"use client";

export default function ChatsAnalyticsPage() {
  return (
    <div className="flex h-full flex-col bg-background">
      <div className="border-b bg-background px-6 py-4">
        <h1 className="text-xl font-semibold">Chat Analytics</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Monitor chat volume, response times, and engagement metrics
        </p>
      </div>
      <div className="flex-1 overflow-y-auto p-6">
        <p className="text-sm text-muted-foreground">Chat analytics will be displayed here</p>
      </div>
    </div>
  );
}
