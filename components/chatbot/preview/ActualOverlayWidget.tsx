"use client"

import { MessageCircle } from "lucide-react"
import type { UIConfigInput } from "@/types/customization"
import type { Message } from "@/components/widget/helpers/chat-message"
import { ChatHeader } from "@/components/widget/ChatHeader"
import { ChatBody } from "@/components/widget/ChatBody"
import { ChatInput } from "@/components/widget/ChatInput"
import { cn } from "@/lib/utils"

interface ActualOverlayWidgetProps {
  config: UIConfigInput
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  messages: Message[]
  input: string
  setInput: (input: string) => void
  isTyping: boolean
  handleSendMessage: (content: string) => void
  handleSuggestionClick: (suggestion: string) => void
  handleRegenerate: () => void
  handleRating: (
    messageId: string, 
    rating: "thumbs-up" | "thumbs-down",
    feedback?: { 
      issue?: string
      incorrect?: boolean
      irrelevant?: boolean
      unaddressed?: boolean
    }
  ) => void
}

export function ActualOverlayWidget({
  config,
  isOpen,
  setIsOpen,
  messages,
  input,
  setInput,
  isTyping,
  handleSendMessage,
  handleSuggestionClick,
  handleRegenerate,
  handleRating,
}: ActualOverlayWidgetProps) {
  const isLeft = config.alignChatButton === "left"

  return (
    <div className="absolute inset-0">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className={cn(
            "absolute rounded-full shadow-lg transition-all hover:scale-105 flex items-center gap-2",
            config.showButtonText ? "px-6 py-4" : "p-4"
          )}
          style={{
            [isLeft ? "left" : "right"]: "16px",
            bottom: "16px",
            backgroundColor: config.widgetBubbleColour || config.primaryColor,
          } as React.CSSProperties}
        >
          {config.widgeticon ? (
            <img src={config.widgeticon} alt="Chat" className="w-6 h-6" />
          ) : (
            <MessageCircle className="w-6 h-6 text-white" />
          )}
          {config.showButtonText && (config.widgetButtonText || config.buttonText) && (
            <span className="text-white text-sm">
              {config.widgetButtonText || config.buttonText}
            </span>
          )}
        </button>
      )}

      {isOpen && (
        <div
          className={cn(
            "absolute inset-0 flex flex-col overflow-hidden border",
            config.appearance === "dark" ? "bg-gray-900 border-gray-800" : "bg-white"
          )}
        >
          <ChatHeader
            config={config}
            onClose={() => setIsOpen(false)}
          />

          <ChatBody
            config={config}
            messages={messages}
            isTyping={isTyping}
            handleSuggestionClick={handleSuggestionClick}
            handleRegenerate={handleRegenerate}
            handleRating={handleRating}
          />

          <ChatInput
            config={config}
            input={input}
            setInput={setInput}
            handleSendMessage={handleSendMessage}
            handleSuggestionClick={handleSuggestionClick}
          />
        </div>
      )}
    </div>
  )
}


