export const TTS_PROVIDERS = [
    { value: "google", label: "Google Cloud TTS" },
];

export const VOICE_OPTIONS = [
    { value: "en-US-Neural2-F", label: "Neural2 - Female (US)" },
    { value: "en-US-Neural2-M", label: "Neural2 - Male (US)" },
    { value: "en-US-Neural2-A", label: "Neural2 - A (Male)" },
    { value: "en-US-Neural2-C", label: "Neural2 - C (Female)" },
    { value: "en-US-Neural2-D", label: "Neural2 - D (Male)" },
    { value: "en-US-Neural2-E", label: "Neural2 - E (Female)" },
    { value: "en-US-Neural2-G", label: "Neural2 - G (Female)" },
    { value: "en-US-Neural2-H", label: "Neural2 - H (Female)" },
    { value: "en-US-Neural2-I", label: "Neural2 - I (Male)" },
    { value: "en-US-Neural2-J", label: "Neural2 - J (Male)" },
];

export const GOOGLE_GEMINI_VOICES = [
    { value: 'zephyr', label: 'Zephyr' },
    { value: 'achernar', label: 'Achernar' },
    { value: 'achird', label: 'Achird' },
    { value: 'algenib', label: 'Algenib' },
    { value: 'algieba', label: 'Algieba' },
    { value: 'alnilam', label: 'Alnilam' },
    { value: 'aoede', label: 'Aoede' },
    { value: 'autonoe', label: 'Autonoe' },
    { value: 'callirrhoe', label: 'Callirrhoe' },
    { value: 'charon', label: 'Charon' },
    { value: 'despina', label: 'Despina' },
    { value: 'enceladus', label: 'Enceladus' },
    { value: 'erinome', label: 'Erinome' },
    { value: 'fenrir', label: 'Fenrir' },
    { value: 'gacrux', label: 'Gacrux' },
    { value: 'iapetus', label: 'Iapetus' },
    { value: 'kore', label: 'Kore' },
    { value: 'laomedeia', label: 'Laomedeia' },
    { value: 'leda', label: 'Leda' },
    { value: 'orus', label: 'Orus' },
    { value: 'puck', label: 'Puck' },
    { value: 'pulcherrima', label: 'Pulcherrima' },
    { value: 'rasalgethi', label: 'Rasalgethi' },
    { value: 'sadachbia', label: 'Sadachbia' },
    { value: 'sadaltager', label: 'Sadaltager' },
    { value: 'schedar', label: 'Schedar' },
    { value: 'sulafat', label: 'Sulafat' },
    { value: 'umbriel', label: 'Umbriel' },
    { value: 'vindemiatrix', label: 'Vindemiatrix' },
    { value: 'zubenelgenubi', label: 'Zubenelgenubi' },
];

// Combine them for the dropdown, prioritizing Gemini voices if that's what the user wants,
// or keeping them separate if we want granular control.
// For now, I'll export a combined list for the UI.
export const ALL_VOICE_OPTIONS = [
    ...GOOGLE_GEMINI_VOICES,
    ...VOICE_OPTIONS,
];

export const LLM_MODELS = [
    { value: "gemini-1.5-flash", label: "Gemini 1.5 Flash" },
    { value: "gemini-1.5-pro", label: "Gemini 1.5 Pro" },
    { value: "gemini-2.0-flash-lite", label: "Gemini 2.0 Flash Lite (Preview)" },
];

export const STT_PROVIDERS = [
    { value: "assemblyai", label: "AssemblyAI Universal" },
];
