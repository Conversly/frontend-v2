"use client";

export default function PlaygroundPage() {
  return (
    <div className="flex h-full flex-col bg-background">
      {/* Header */}
      <div className="border-b bg-background px-6 py-4">
        <h1 className="text-xl font-semibold">Playground</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Test your chatbot in real-time
        </p>
      </div>

      {/* Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Chat Interface */}
        <div className="flex flex-1 flex-col">
          <div className="flex-1 overflow-y-auto p-6">
            {/* Chat messages will go here */}
            <div className="flex h-full items-center justify-center">
              <div className="text-center">
                <div className="mb-2 text-lg font-medium text-foreground/80">
                  yellow.ai
                </div>
                <p className="text-sm text-muted-foreground">
                  Hi! How can I help you with?
                </p>
              </div>
            </div>
          </div>
          
          {/* Input Area */}
          <div className="border-t bg-background p-4">
            <div className="mx-auto max-w-3xl">
              <div className="flex items-end gap-2">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1 rounded-lg border bg-background px-4 py-2.5 text-sm outline-none ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
                <button className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground hover:bg-primary/90">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="m22 2-7 20-4-9-9-4Z" />
                    <path d="M22 2 11 13" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Settings Sidebar */}
        <div className="w-[320px] border-l bg-background p-6">
          <div className="space-y-6">
            <div>
              <h3 className="mb-3 text-sm font-semibold">Settings</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-xs font-medium text-foreground/70">
                    Model
                  </label>
                  <div className="rounded-md border bg-background px-3 py-2 text-sm">
                    GPT-4o
                  </div>
                </div>
                
                <div>
                  <label className="mb-2 block text-xs font-medium text-foreground/70">
                    Temperature
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    defaultValue="50"
                    className="w-full"
                  />
                </div>

                <button className="flex w-full items-center justify-center gap-2 rounded-md border bg-background px-3 py-2 text-sm font-medium hover:bg-muted/50">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
                    <path d="M21 3v5h-5" />
                    <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
                    <path d="M8 16H3v5" />
                  </svg>
                  Reset Chat
                </button>
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-semibold">Recent Chats</h3>
              <div className="space-y-2">
                {[
                  { name: "John Doe", message: "Hello! How can I assist you today?" },
                  { name: "Jane Smith", message: "Hi, I need help with my account" },
                  { name: "Bob Johnson", message: "Can you tell me about your pricing?" },
                ].map((chat, i) => (
                  <div
                    key={i}
                    className="cursor-pointer rounded-md border bg-background p-3 hover:bg-muted/50"
                  >
                    <div className="mb-1 text-xs font-medium">{chat.name}</div>
                    <div className="line-clamp-1 text-xs text-muted-foreground">
                      {chat.message}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
