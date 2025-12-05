"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, PhoneOff } from "lucide-react";

interface VoiceCallControlsProps {
    isMuted: boolean;
    onToggleMute: () => void;
    onEndCall: () => void;
    isConnecting?: boolean;
}

/**
 * Voice call control buttons (mute, end call)
 */
export function VoiceCallControls({
    isMuted,
    onToggleMute,
    onEndCall,
    isConnecting = false,
}: VoiceCallControlsProps) {
    return (
        <div className="flex items-center justify-center gap-4">
            <Button
                variant="outline"
                size="icon"
                className="h-14 w-14 rounded-full"
                onClick={onToggleMute}
                disabled={isConnecting}
            >
                {isMuted ? (
                    <MicOff className="h-6 w-6 text-destructive" />
                ) : (
                    <Mic className="h-6 w-6" />
                )}
            </Button>

            <Button
                variant="destructive"
                size="icon"
                className="h-14 w-14 rounded-full"
                onClick={onEndCall}
            >
                <PhoneOff className="h-6 w-6" />
            </Button>
        </div>
    );
}
