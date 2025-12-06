import * as React from 'react';

export interface AgentConfigState {
  instructions: string;
  stt_language: string;
  tts_voice: string;
  tts_language: string;
}

export const defaultAgentConfig: AgentConfigState = {
  instructions: `You are a helpful voice AI assistant. The user is interacting with you via voice, even if you perceive the conversation as text.
You eagerly assist users with their questions by providing information from your extensive knowledge.
Your responses are concise, to the point, and without any complex formatting or punctuation including emojis, asterisks, or other symbols.
You are curious, friendly, and have a sense of humor.`,
  stt_language: 'en',
  tts_voice: '21m00Tcm4TlvDq8ikWAM', // Rachel
  tts_language: 'en',
};

// Common ElevenLabs voice options
const ELEVENLABS_VOICES = [
  { id: 'TX3LPaxmHKxFdv7VOQHJ', name: 'Rachel (Female, American)' },
  { id: 'EXAVITQu4vr4xnSDxMaL', name: 'Bella (Female, American)' },
  { id: 'AZnzlk1XvdvUeBnXmlld', name: 'Domi (Female, American)' },
  { id: 'pNInz6obpgDQGcFmaJgB', name: 'Adam (Male, American)' },
  { id: 'yoZ06aMxZJJ28mfd3POQ', name: 'Sam (Male, Narration)' },
  { id: '21m00Tcm4TlvDq8ikWAM', name: 'Rachel (Female, Calm)' },
  { id: 'MF3mGyEYCl7XYWbV9V6O', name: 'Emily (Female, British)' },
  { id: 'IKne3meq5aSn9XLyUdCD', name: 'Charlie (Male, Australian)' },
];

interface AgentConfigProps {
  config: AgentConfigState;
  onConfigChange: (config: AgentConfigState) => void;
  isConfigPhase?: boolean;
}

export function AgentConfig({ config, onConfigChange, isConfigPhase = false }: AgentConfigProps) {
  const [isExpanded, setIsExpanded] = React.useState(true);
  const [customVoice, setCustomVoice] = React.useState('');

  // Check if current voice is a custom one (not in presets)
  const isCustomVoice = !ELEVENLABS_VOICES.some(v => v.id === config.tts_voice);

  const handleChange = (field: keyof AgentConfigState, value: string) => {
    onConfigChange({ ...config, [field]: value });
  };

  const handleVoiceChange = (value: string) => {
    if (value === 'custom') {
      // Keep current voice if switching to custom mode
      return;
    }
    handleChange('tts_voice', value);
    setCustomVoice('');
  };

  const handleCustomVoiceChange = (value: string) => {
    setCustomVoice(value);
    if (value.trim()) {
      handleChange('tts_voice', value.trim());
    }
  };

  const handleReset = () => {
    onConfigChange(defaultAgentConfig);
    localStorage.removeItem('agentConfig');
    setCustomVoice('');
  };

  const inputClass = "w-full rounded-md border bg-background p-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors";
  const labelClass = "block text-sm font-medium mb-1.5";

  return (
    <div className={`w-full rounded-lg border bg-card overflow-hidden ${isConfigPhase ? '' : 'absolute top-4 left-4 z-50 max-w-xs'}`}>
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-3 hover:bg-muted/50 transition-colors"
      >
        <h3 className="text-sm font-semibold">⚙️ Agent Configuration</h3>
        <span className={`text-muted-foreground transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>

      {isExpanded && (
        <div className="p-3 pt-0 space-y-3">
          {/* Instructions */}
          <div>
            <label className={labelClass}>System Instructions</label>
            <textarea
              value={config.instructions}
              onChange={(e) => handleChange('instructions', e.target.value)}
              className={`${inputClass} h-28 resize-none`}
              placeholder="Enter the AI's personality and behavior instructions..."
            />
          </div>

          {/* Two column layout for language dropdowns */}
          <div className="grid grid-cols-2 gap-4">
            {/* STT Language */}
            <div>
              <label className={labelClass}>Input Language</label>
              <select
                value={config.stt_language}
                onChange={(e) => handleChange('stt_language', e.target.value)}
                className={inputClass}
              >
                <option value="en">English</option>
                <option value="hi">Hindi</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
                <option value="ja">Japanese</option>
              </select>
            </div>

            {/* TTS Language */}
            <div>
              <label className={labelClass}>Output Language</label>
              <select
                value={config.tts_language}
                onChange={(e) => handleChange('tts_language', e.target.value)}
                className={inputClass}
              >
                <option value="en">English</option>
                <option value="hi">Hindi</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
                <option value="ja">Japanese</option>
              </select>
            </div>
          </div>

          {/* Voice Selection */}
          <div>
            <label className={labelClass}>Voice</label>
            <select
              value={isCustomVoice ? 'custom' : config.tts_voice}
              onChange={(e) => handleVoiceChange(e.target.value)}
              className={inputClass}
            >
              {ELEVENLABS_VOICES.map(voice => (
                <option key={voice.id} value={voice.id}>{voice.name}</option>
              ))}
              <option value="custom">Custom Voice ID...</option>
            </select>
            {(isCustomVoice || customVoice) && (
              <input
                type="text"
                value={customVoice || config.tts_voice}
                onChange={(e) => handleCustomVoiceChange(e.target.value)}
                className={`${inputClass} mt-2`}
                placeholder="Enter ElevenLabs Voice ID"
              />
            )}
            <p className="mt-1 text-xs text-muted-foreground">
              <a
                href="https://elevenlabs.io/app/voice-library"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-foreground"
              >
                Browse ElevenLabs Voice Library →
              </a>
            </p>
          </div>

          {/* Reset Button */}
          <button
            onClick={handleReset}
            className="w-full rounded-md border bg-muted px-3 py-2 text-xs font-medium transition-colors hover:bg-muted/80"
          >
            Reset to Defaults
          </button>
        </div>
      )}
    </div>
  );
}

