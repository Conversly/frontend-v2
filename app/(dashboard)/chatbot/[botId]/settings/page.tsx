"use client";

export default function SettingsPage() {
  return (
    <div className="flex h-full flex-col bg-background">
      <div className="border-b bg-background px-6 py-4">
        <h1 className="text-xl font-semibold">Settings</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Configure your chatbot settings and preferences
        </p>
      </div>
      <div className="flex-1 overflow-y-auto p-6">
        <p className="text-sm text-muted-foreground">Settings panel will be displayed here</p>
      </div>
    </div>
  );
}
