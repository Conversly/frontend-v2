"use client";

import * as React from "react";
import {
    LiveKitRoom as LKRoom,
    RoomAudioRenderer,
    useConnectionState,
    useRoomContext,
} from "@livekit/components-react";
import { ConnectionState } from "livekit-client";
import { LiveKitTokenResponse, LiveKitConnectionState } from "@/types/voice";

interface LiveKitRoomProps {
    tokenData: LiveKitTokenResponse;
    onDisconnect?: () => void;
    onConnectionStateChange?: (state: LiveKitConnectionState) => void;
    children: React.ReactNode;
}

/**
 * LiveKit room connection wrapper
 * Handles room connection, audio rendering, and connection state management
 */
export function LiveKitRoom({
    tokenData,
    onDisconnect,
    onConnectionStateChange,
    children,
}: LiveKitRoomProps) {
    const handleDisconnected = React.useCallback(() => {
        onDisconnect?.();
    }, [onDisconnect]);

    return (
        <LKRoom
            serverUrl={tokenData.serverUrl}
            token={tokenData.participantToken}
            connect={true}
            audio={true}
            video={false}
            onDisconnected={handleDisconnected}
        >
            <RoomAudioRenderer />
            <ConnectionStateHandler onStateChange={onConnectionStateChange} />
            {children}
        </LKRoom>
    );
}

/**
 * Internal component to track and report connection state changes
 */
function ConnectionStateHandler({
    onStateChange,
}: {
    onStateChange?: (state: LiveKitConnectionState) => void;
}) {
    const connectionState = useConnectionState();

    React.useEffect(() => {
        const mappedState = mapConnectionState(connectionState);
        onStateChange?.(mappedState);
    }, [connectionState, onStateChange]);

    return null;
}

/**
 * Map LiveKit ConnectionState to our simplified state type
 */
function mapConnectionState(state: ConnectionState): LiveKitConnectionState {
    switch (state) {
        case ConnectionState.Connected:
            return "connected";
        case ConnectionState.Connecting:
            return "connecting";
        case ConnectionState.Reconnecting:
            return "reconnecting";
        case ConnectionState.Disconnected:
            return "disconnected";
        default:
            return "failed";
    }
}
