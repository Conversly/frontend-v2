import React from 'react';
import { X, Send, MessageSquare, Minimize2 } from 'lucide-react';

interface ChatWidgetProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatWidget: React.FC<ChatWidgetProps> = ({ isOpen, onClose }) => {
  const messages = [
    { role: 'model', text: 'Hi there! 👋 How can I help you convert more leads today?' },
    { role: 'user', text: 'Show me how the widget captures leads.' },
    { role: 'model', text: 'Sure thing! I can collect contact info, qualify leads, and hand off to your team instantly.' }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 w-80 md:w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 duration-300">
      {/* Header */}
      <div className="bg-indigo-600 p-4 flex items-center justify-between text-white">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-500 rounded-full">
            <MessageSquare size={18} fill="currentColor" />
          </div>
          <div>
            <h4 className="font-semibold text-sm">Support Bot</h4>
            <p className="text-xs text-indigo-100">Demo responses only</p>
          </div>
        </div>
        <div className="flex gap-2">
            <button onClick={onClose} className="p-1 hover:bg-indigo-500 rounded text-indigo-100">
                <Minimize2 size={18} />
            </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 h-96 overflow-y-auto p-4 bg-gray-50 space-y-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div 
              className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                msg.role === 'user' 
                  ? 'bg-indigo-600 text-white rounded-tr-none' 
                  : 'bg-white text-gray-800 border border-gray-100 shadow-sm rounded-tl-none'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-3 bg-white border-t border-gray-100">
        <div className="relative">
          <input
            type="text"
            value=""
            disabled
            placeholder="Interactive chat disabled for demo"
            className="w-full pl-4 pr-12 py-3 bg-gray-100 border-none rounded-xl text-sm text-gray-500"
          />
          <button 
            disabled
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-indigo-400 text-white rounded-lg opacity-60 cursor-not-allowed"
          >
            <Send size={16} />
          </button>
        </div>
        <div className="text-center mt-2">
            <span className="text-[10px] text-gray-400">Demo mode — no live chat</span>
        </div>
      </div>
    </div>
  );
};

export default ChatWidget;