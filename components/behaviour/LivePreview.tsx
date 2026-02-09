"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlaygroundWidget } from "@/components/PlaygroundWidget";
import { RefreshCcw } from "lucide-react";
import { toast } from "sonner";

interface LivePreviewProps {
    chatbotId: string;
    config: any;
    systemPrompt: string;
}

export function LivePreview({ chatbotId, config, systemPrompt }: LivePreviewProps) {
    const [widgetKey, setWidgetKey] = useState(0);

    const handleReset = () => {
        setWidgetKey((prev) => prev + 1);
        toast.success("Chat reset");
    };

    const handleTestScenario = (message: string) => {
        // This is a bit tricky since we can't easily inject a message into the iframe widget from here 
        // without postMessage or ref control. 
        // For now, we might just copy it to clipboard or show a toast saying "Paste this..."
        // OR, if PlaygroundWidget supports an initial message override or a way to trigger safe messages.

        // In a real implementation with control over the widget, we'd fire a method.
        // Assuming we can't easily control the inner iframe stated efficiently here without a ref change.

        navigator.clipboard.writeText(message);
        toast.success("Message copied to clipboard! Paste it in the chat.");
    };

    return (
        <div className="flex flex-col h-[calc(100vh-100px)] sticky top-6">
            <div className="mb-4">
                <h2 className="text-xl font-semibold">Test your AI</h2>
                <p className="text-sm text-muted-foreground">See how it behaves in real-time.</p>
            </div>

            <div className="flex-1 overflow-hidden rounded-lg border shadow-xl bg-background relative flex flex-col">
                {/* Widget Container */}
                <div className="flex-1 relative bg-gray-50/50">
                    {config ? (
                        <div className="absolute inset-0 flex items-center justify-center p-4">
                            <div className="w-full h-full max-w-[400px] max-h-[700px] shadow-sm rounded-xl overflow-hidden bg-white">
                                <PlaygroundWidget
                                    key={widgetKey}
                                    chatbotId={chatbotId}
                                    config={{
                                        ...config,
                                        chatWidth: "100%",
                                        chatHeight: "100%",
                                    }}
                                    systemPrompt={systemPrompt}
                                    model="gemini-2.0" // Defaulting to a fast model
                                    temperature={1.0}
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center justify-center h-full">
                            Loading preview...
                        </div>
                    )}
                </div>

                {/* Quick Actions Footer */}
                <div className="p-4 bg-background border-t space-y-3">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Quick Tests</span>
                        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={handleReset} title="Reset Conversation">
                            <RefreshCcw className="h-3 w-3" />
                        </Button>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <Button variant="outline" size="sm" className="h-7 text-xs bg-muted/50" onClick={() => handleTestScenario("How much does it cost?")}>
                            Pricing question
                        </Button>
                        <Button variant="outline" size="sm" className="h-7 text-xs bg-muted/50" onClick={() => handleTestScenario("I want a refund right now!")}>
                            Angry customer
                        </Button>
                        <Button variant="outline" size="sm" className="h-7 text-xs bg-muted/50" onClick={() => handleTestScenario("Can I talk to a human?")}>
                            Talk to human
                        </Button>
                        <Button variant="outline" size="sm" className="h-7 text-xs bg-muted/50" onClick={() => handleTestScenario("Just looking around, thanks.")}>
                            Just browsing
                        </Button>
                        <Button variant="default" size="sm" className="h-7 text-xs w-full mt-1 bg-red-100 text-red-700 hover:bg-red-200 border-red-200 hover:border-red-300 border" onClick={() => handleTestScenario("Your product is terrible and I want a refund.")}>
                            Test difficult customer
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
