import React from "react";
import { Mic, X } from "lucide-react";

interface VoiceAgentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Simplified placeholder modal; audio pipeline removed (no audio utils, no SDK)
const VoiceAgentModal: React.FC<VoiceAgentModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-md border border-gray-100 max-w-md w-full overflow-hidden flex flex-col items-center p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-500"
          aria-label="Close voice demo modal"
        >
          <X size={20} />
        </button>

        <div className="mb-6">
          <div className="w-24 h-24 rounded-full flex items-center justify-center bg-gray-100">
            <Mic size={40} className="text-gray-400" />
          </div>
        </div>

        <h3 className="text-2xl font-bold text-gray-900 mb-2">Voice demo disabled</h3>
        <p className="text-center text-gray-500 mb-8">
          Audio capture/playback is currently turned off. Check back soon for the interactive demo.
        </p>

        <button
          onClick={onClose}
          className="w-full py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 transition-all shadow-sm hover:shadow-md active:scale-[0.98] bg-gray-200 text-gray-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default VoiceAgentModal;