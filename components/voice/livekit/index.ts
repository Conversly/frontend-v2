// Export the new LiveKit App component and related components
export { App } from "./app/app";
export type { AppConfig } from "./app-config";
export { AgentConfig, defaultAgentConfig } from "./agent-config";
export type { AgentConfigState } from "./agent-config";

// Export UI components
export { Button } from "./button";
export { Toggle } from "./toggle";
export { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";
export { Alert, AlertTitle, AlertDescription } from "./alert";
export { Toaster } from "./toaster";
export { toastAlert } from "./alert-toast";

// Export agent control components
export { AgentControlBar } from "./agent-control-bar/agent-control-bar";
export type { ControlBarControls } from "./agent-control-bar/agent-control-bar";

// Export session components
export { SessionView } from "./app/session-view";
export { ViewController } from "./app/view-controller";
export { ChatTranscript } from "./app/chat-transcript";
export { TileLayout } from "./app/tile-layout";

// Legacy exports (kept for backward compatibility, but deprecated)
// These are the old components - use App component instead
export { LiveKitRoom } from "./LiveKitRoom";
export { VoiceAgentCall } from "./VoiceAgentCall";
export { VoiceCallControls } from "./VoiceCallControls";
