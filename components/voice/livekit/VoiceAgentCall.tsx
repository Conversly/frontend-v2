"use client";

import * as React from "react";
import {
    useLocalParticipant,
    useTrackToggle,
    useTracks,
    useConnectionState,
    useRoomContext,
} from "@livekit/components-react";
import { Track, ConnectionState, TranscriptionSegment, RoomEvent } from "livekit-client";
import { VoiceCallControls } from "./VoiceCallControls";
import { Loader2, User, Bot } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TranscriptMessage {
    id: string;
    role: "user" | "assistant";
    content: string;
    timestamp: Date;
    isFinal: boolean;
}

interface VoiceAgentCallProps {
    onEndCall: () => void;
    agentName?: string;
}

/**
 * Active voice call UI component
 * Displays live transcript and call controls at the bottom
 */
export function VoiceAgentCall({ onEndCall, agentName = "Voice Agent" }: VoiceAgentCallProps) {
    const room = useRoomContext();
    const connectionState = useConnectionState();
    const { localParticipant } = useLocalParticipant();
    const [callDuration, setCallDuration] = React.useState(0);
    const [transcript, setTranscript] = React.useState<TranscriptMessage[]>([]);
    const scrollRef = React.useRef<HTMLDivElement>(null);

    // Track microphone toggle
    const { enabled: isMicEnabled, toggle: toggleMic } = useTrackToggle({
        source: Track.Source.Microphone,
    });

    // Get remote audio tracks (agent audio)
    const remoteTracks = useTracks([Track.Source.Microphone], {
        onlySubscribed: true,
    });

    const isAgentSpeaking = remoteTracks.length > 0;
    const isConnecting = connectionState === ConnectionState.Connecting;
    const isConnected = connectionState === ConnectionState.Connected;
    const isReconnecting = connectionState === ConnectionState.Reconnecting;

    // Listen for transcription events
    React.useEffect(() => {
        if (!room) return;

        const handleTranscription = (
            segments: TranscriptionSegment[],
            participant: any
        ) => {
            segments.forEach((segment) => {
                const isUser = participant?.identity === localParticipant?.identity;
                const role = isUser ? "user" : "assistant";

                setTranscript((prev) => {
                    // Check if we should update an existing segment or add new
                    const existingIndex = prev.findIndex((m) => m.id === segment.id);

                    if (existingIndex >= 0) {
                        // Update existing segment
                        const updated = [...prev];
                        updated[existingIndex] = {
                            ...updated[existingIndex],
                            content: segment.text,
                            isFinal: segment.final,
                        };
                        return updated;
                    } else {
                        // Add new segment
                        return [
                            ...prev,
                            {
                                id: segment.id,
                                role,
                                content: segment.text,
                                timestamp: new Date(),
                                isFinal: segment.final,
                            },
                        ];
                    }
                });
            });
        };

        room.on(RoomEvent.TranscriptionReceived, handleTranscription);

        return () => {
            room.off(RoomEvent.TranscriptionReceived, handleTranscription);
        };
    }, [room, localParticipant?.identity]);

    // Auto-scroll to bottom when new messages arrive
    React.useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [transcript]);

    // Call duration timer
    React.useEffect(() => {
        if (!isConnected) return;

        const interval = setInterval(() => {
            setCallDuration((prev) => prev + 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [isConnected]);

    const formatDuration = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };

    return (
        <div className="flex flex-col h-full w-full">
            {/* Header with status */}
            <div className="flex items-center justify-between px-4 py-3 border-b">
                <div className="flex items-center gap-2">
                    <div className={`h-2 w-2 rounded-full ${isConnected ? "bg-emerald-500" :
                            isConnecting || isReconnecting ? "bg-yellow-500 animate-pulse" :
                                "bg-zinc-400"
                        }`} />
                    <span className="text-sm font-medium">{agentName}</span>
                </div>
                {isConnected && (
                    <span className="text-sm font-mono text-muted-foreground">
                        {formatDuration(callDuration)}
                    </span>
                )}
            </div>

            {/* Transcript Area */}
            <div className="flex-1 overflow-hidden">
                <ScrollArea className="h-full" ref={scrollRef}>
                    <div className="p-4 space-y-4">
                        {/* Connection status messages */}
                        {isConnecting && (
                            <div className="flex items-center justify-center gap-2 py-8 text-muted-foreground">
                                <Loader2 className="h-4 w-4 animate-spin" />
                                <span className="text-sm">Connecting to agent...</span>
                            </div>
                        )}

                        {isReconnecting && (
                            <div className="flex items-center justify-center gap-2 py-4 text-yellow-500">
                                <Loader2 className="h-4 w-4 animate-spin" />
                                <span className="text-sm">Reconnecting...</span>
                            </div>
                        )}

                        {/* Empty state */}
                        {isConnected && transcript.length === 0 && (
                            <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
                                <div className="flex items-center gap-1 mb-2">
                                    {[...Array(5)].map((_, i) => (
                                        <div
                                            key={i}
                                            className="w-1 rounded-full bg-emerald-400/60 animate-pulse"
                                            style={{
                                                height: `${12 + Math.random() * 16}px`,
                                                animationDelay: `${i * 100}ms`,
                                            }}
                                        />
                                    ))}
                                </div>
                                <span className="text-sm">Listening... Start speaking!</span>
                            </div>
                        )}

                        {/* Transcript messages */}
                        {transcript.map((message) => (
                            <div
                                key={message.id}
                                className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""
                                    }`}
                            >
                                {/* Avatar */}
                                <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${message.role === "user"
                                        ? "bg-blue-500/20 text-blue-500"
                                        : "bg-emerald-500/20 text-emerald-500"
                                    }`}>
                                    {message.role === "user" ? (
                                        <User className="h-4 w-4" />
                                    ) : (
                                        <Bot className="h-4 w-4" />
                                    )}
                                </div>

                                {/* Message bubble */}
                                <div className={`flex-1 max-w-[80%] ${message.role === "user" ? "text-right" : ""
                                    }`}>
                                    <div className={`inline-block px-4 py-2 rounded-2xl ${message.role === "user"
                                            ? "bg-blue-500 text-white rounded-tr-sm"
                                            : "bg-muted rounded-tl-sm"
                                        } ${!message.isFinal ? "opacity-70" : ""}`}>
                                        <p className="text-sm">{message.content}</p>
                                    </div>
                                    {!message.isFinal && (
                                        <p className="text-xs text-muted-foreground mt-1">
                                            typing...
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </div>

            {/* Bottom Controls */}
            <div className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="p-4">
                    <VoiceCallControls
                        isMuted={!isMicEnabled}
                        onToggleMute={toggleMic}
                        onEndCall={onEndCall}
                        isConnecting={isConnecting}
                    />
                </div>
            </div>
        </div>
    );
}
