import * as React from "react";
import { Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export function VoicePreview() {
    return (
        <div className="flex w-1/3 flex-col bg-muted/5">
            <div className="flex h-12 items-center justify-between border-b px-4">
                <span className="text-sm font-medium">Preview</span>
                <Select defaultValue="web">
                    <SelectTrigger className="w-24 h-7 text-xs">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="web">Web</SelectItem>
                        <SelectItem value="phone">Phone</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="flex flex-1 flex-col items-center justify-center p-6">
                <div className="flex flex-col items-center space-y-8 text-center max-w-xs">
                    {/* Visualizer */}
                    <div className="flex h-40 w-full items-center justify-center rounded-xl bg-gradient-to-b from-zinc-900 to-black p-8">
                        <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                                <div
                                    key={i}
                                    className="w-1 rounded-full bg-white/60 animate-pulse"
                                    style={{
                                        height: `${20 + Math.random() * 30}px`,
                                        animationDelay: `${i * 100}ms`,
                                        animationDuration: "1s",
                                    }}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <h3 className="text-lg font-semibold">Preview your agent</h3>
                        <p className="text-sm text-muted-foreground">
                            Start a live test call to speak to your agent as you configure
                            and iterate.
                        </p>
                    </div>

                    <Button className="w-full" size="lg">
                        <Mic className="mr-2 h-4 w-4" />
                        Start Call
                    </Button>
                </div>
            </div>
        </div>
    );
}
