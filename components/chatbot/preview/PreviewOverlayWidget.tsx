"use client";

import { cn } from "@/lib/utils";
import type { UIConfigInput } from "@/types/customization";
import type { Message } from "@/components/widget/helpers/chat-message";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, X, RefreshCw, ThumbsUp, ThumbsDown } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface PreviewOverlayWidgetProps {
  config: UIConfigInput;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  messages: Message[];
  input: string;
  setInput: (input: string) => void;
  isTyping: boolean;
  handleSendMessage: (content: string) => void;
  handleSuggestionClick: (suggestion: string) => void;
  handleRegenerate: () => void;
  handleRating: (
    messageId: string,
    rating: "thumbs-up" | "thumbs-down",
    feedback?: {
      issue?: string;
      incorrect?: boolean;
      irrelevant?: boolean;
      unaddressed?: boolean;
    }
  ) => void;
}

export function PreviewOverlayWidget({
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
}: PreviewOverlayWidgetProps) {
  const primaryColor = config.primaryColor || "#0e4b75";
  const isDark = config.appearance === "dark";

  if (!isOpen) {
    return (
      <div className="absolute bottom-4 right-4">
        <button
          onClick={() => setIsOpen(true)}
          className={cn(
            "flex items-center gap-2 rounded-full px-4 py-3 shadow-lg transition-all hover:scale-105",
            config.showButtonText ? "px-6" : "px-4"
          )}
          style={{ backgroundColor: primaryColor }}
        >
          {config.PrimaryIcon ? (
            <img
              src={config.PrimaryIcon}
              alt="Chat"
              className="w-5 h-5 rounded-full object-cover"
            />
          ) : (
            <Send className="w-5 h-5 text-white" />
          )}
          {config.showButtonText && (
            <span className="text-sm font-medium text-white">
              {config.widgetButtonText || config.buttonText || "Chat"}
            </span>
          )}
        </button>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "absolute inset-0 flex flex-col",
        isDark ? "bg-gray-900" : "bg-white",
        "overflow-hidden"
      )}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between p-4 text-white"
        style={{ backgroundColor: primaryColor }}
      >
        <div className="flex items-center gap-2">
          {config.PrimaryIcon && (
            <img
              src={config.PrimaryIcon}
              alt={config.DisplayName}
              className="w-6 h-6 rounded-full object-cover"
            />
          )}
          <h3 className="font-semibold text-sm">{config.DisplayName || "Support Bot"}</h3>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="hover:opacity-70 transition-opacity"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex flex-col gap-2",
                message.role === "user" ? "items-end" : "items-start"
              )}
            >
              <div
                className={cn(
                  "rounded-lg px-3 py-2 max-w-[80%]",
                  message.role === "user"
                    ? "rounded-br-none"
                    : "rounded-bl-none",
                  message.role === "user"
                    ? isDark
                      ? "bg-gray-800 text-white"
                      : "bg-gray-100 text-gray-900"
                    : isDark
                    ? "bg-gray-800 text-white"
                    : "bg-gray-50 text-gray-900"
                )}
              >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              </div>
              {message.role === "assistant" && config.allowRegenerate && (
                <button
                  onClick={() => handleRegenerate()}
                  className="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1"
                >
                  <RefreshCw className="w-3 h-3" />
                  Regenerate
                </button>
              )}
              {message.role === "assistant" && config.collectFeedback && (
                <div className="flex gap-2">
                  <button
                    onClick={() => handleRating(message.id, "thumbs-up")}
                    className="p-1 hover:bg-gray-200 rounded"
                  >
                    <ThumbsUp className="w-3 h-3 text-gray-500" />
                  </button>
                  <button
                    onClick={() => handleRating(message.id, "thumbs-down")}
                    className="p-1 hover:bg-gray-200 rounded"
                  >
                    <ThumbsDown className="w-3 h-3 text-gray-500" />
                  </button>
                </div>
              )}
            </div>
          ))}
          {isTyping && (
            <div className="flex items-center gap-1 text-gray-500">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75" />
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150" />
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Suggestions */}
      {config.starterQuestions && config.starterQuestions.filter((q) => q).length > 0 && (
        <div className="px-4 pb-2 space-y-2">
          {config.starterQuestions
            .filter((q) => q)
            .map((question, idx) => (
              <button
                key={idx}
                onClick={() => handleSuggestionClick(question)}
                className={cn(
                  "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors",
                  isDark
                    ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                )}
              >
                {question}
              </button>
            ))}
        </div>
      )}

      {/* Input */}
      <div className={cn("p-4 border-t", isDark ? "border-gray-800" : "border-gray-200")}>
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage(input);
              }
            }}
            placeholder={config.messagePlaceholder || "Message..."}
            className={cn(
              "flex-1",
              isDark
                ? "bg-gray-800 border-gray-700 text-white"
                : "bg-white border-gray-300"
            )}
          />
          <Button
            onClick={() => handleSendMessage(input)}
            disabled={!input.trim()}
            style={{ backgroundColor: primaryColor }}
            className="text-white hover:opacity-90"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        {config.footerText && (
          <p className={cn("text-xs text-center mt-2", isDark ? "text-gray-500" : "text-gray-400")}>
            {config.footerText}
          </p>
        )}
      </div>
    </div>
  );
}




