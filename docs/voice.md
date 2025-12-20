handleStartCall :  POST : /voice/:chatbotId/token : 


{ agent_config: { instructions, tts_voice, stt_language, tts_language }, room_config?: { agents: [{ agent_name }] } }







User (browser)
  |
  | Start Call (UI)
  v
Frontend (React, LiveKit SDK)
  | POST /voice/:chatbotId/token { agent_config (prompt/voice/lang), room_config (agent_name) }
  v
Your Backend (token endpoint)
  | - Builds LiveKit room + participant token
  | - Embeds agent_config into job/room metadata
  | - Returns { serverUrl, participantToken, roomName, participantName }
  v
Frontend
  | connect to LiveKitRoom(serverUrl, participantToken)  <-- LiveKit signaling (WS)
  v
LiveKit Cloud
  | - Auth via token
  | - Creates/joins room
  | - Signals to participants
  | - Invokes your AgentServer job with metadata
  v
Your Agent Server (Python, livekit-agents)
  | - Reads metadata (instructions, stt_language, tts_voice, tts_language)
  | - Builds pipeline: AssemblyAI STT → Gemini LLM → ElevenLabs TTS
  | - Joins room (ctx.connect), starts AgentSession
  |
(ongoing media + events)
Frontend <---- audio/transcriptions/chat ----> LiveKit Cloud <---- audio/chat ----> Agent Server
  | mic/chat/controls via LiveKit SDK APIs
  | transcript via useTranscriptions/useChat
  | audio playback via RoomAudioRenderer
  |
User clicks END
  |
Frontend: room.disconnect()
  |
LiveKit: closes participant; agent session ends when room ends