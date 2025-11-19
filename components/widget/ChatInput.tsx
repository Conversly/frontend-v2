"use client"

import { Send } from "lucide-react"
import type { UIConfigInput } from "@/types/customization"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface ChatInputProps {
  config: UIConfigInput
  input: string
  setInput: (input: string) => void
  handleSendMessage: (content: string) => void
  handleSuggestionClick: (suggestion: string) => void
}

export function ChatInput({
  config,
  input,
  setInput,
  handleSendMessage,
  handleSuggestionClick,
}: ChatInputProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      handleSendMessage(input)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <div 
      className={cn(
        "border-t",
        config.appearance === "dark" ? "border-gray-800" : "border-gray-200"
      )}
    >
      {/* Suggestions - Now positioned just before input */}
      {config.starterQuestions && config.starterQuestions.filter((q) => q).length > 0 && (
        <div className="px-4 pt-3 pb-2 space-y-2">
          {config.starterQuestions
            .filter((q) => q)
            .map((question, idx) => (
              <button
                key={idx}
                onClick={() => handleSuggestionClick(question)}
                className={cn(
                  "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors",
                  config.appearance === "dark"
                    ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                )}
              >
                {question}
              </button>
            ))}
        </div>
      )}

      {/* Input Section */}
      <div className="px-6 py-4 space-y-3">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={config.messagePlaceholder}
            className={cn(
              "flex-1",
              config.appearance === "dark"
                ? "bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
                : "bg-white"
            )}
          />
          <Button
            type="submit"
            size="icon"
            disabled={!input.trim()}
            style={{ backgroundColor: config.primaryColor }}
            className="text-white hover:opacity-90"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>

        {/* Footer Text */}
        {config.footerText && (
          <div
            className={cn(
              "text-xs text-center",
              config.appearance === "dark" ? "text-gray-400" : "text-gray-500"
            )}
            dangerouslySetInnerHTML={{ __html: config.footerText }}
          />
        )}
      </div>
    </div>
  )
}
