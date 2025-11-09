"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import type { UIConfigInput } from "@/types/customization"
import type { Message } from "@/components/widget/helpers/chat-message"
import { cn } from "@/lib/utils"
import { ActualOverlayWidget } from "./ActualOverlayWidget"
import { ActualCornerWidget } from "./ActualCornerWidget"
import { getChatbotResponse, getPlaygroundResponse, submitFeedback } from "@/lib/api/response"
import { convertBackendToUIMessage, convertUIToBackendMessages } from "@/types/response"

interface ActualChatWidgetProps {
  config: UIConfigInput
  className?: string
  playgroundConfig?: {
    systemPrompt: string
    model: string
    temperature: number
  }
}

export function ActualChatWidget({ config, className, playgroundConfig }: ActualChatWidgetProps) {
  const [isOpen, setIsOpen] = useState<boolean>(true)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const uniqueClientId = useMemo(() => {
    if (typeof window === "undefined") return config.uniqueClientId || ""
    const KEY = "conversly_unique_client_id"
    let id = config.uniqueClientId || window.localStorage.getItem(KEY)
    if (!id) {
      // Lightweight UID
      id = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`
      window.localStorage.setItem(KEY, id)
    }
    return id
  }, [config.uniqueClientId])

  useEffect(() => {
    const initialMessages: Message[] = config.InitialMessage
      ? [
          {
            id: "initial-assistant",
            role: "assistant",
            content: config.InitialMessage,
            createdAt: new Date(),
          },
        ]
      : []

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
      typingTimeoutRef.current = null
    }

    setMessages(initialMessages)
    setInput("")
    setIsTyping(false)
  }, [config.InitialMessage])

  // Always keep widget open in preview/playground mode
  useEffect(() => {
    setIsOpen(true)
  }, [])

  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current)
      }
    }
  }, [])

  const sendToBackend = async (allMessages: Message[], mode: string = "default") => {
    const backendMessages = convertUIToBackendMessages(allMessages)
    
    // Use playground API if playground config is provided
    if (playgroundConfig) {
      const res = await getPlaygroundResponse(
        backendMessages,
        {
          uniqueClientId,
          converslyWebId: config.converslyWebId,
        },
        mode,
        playgroundConfig.systemPrompt,
        playgroundConfig.temperature,
        playgroundConfig.model,
        typeof window !== "undefined" ? { originUrl: window.location.href } : undefined
      )
      return convertBackendToUIMessage(res, "assistant")
    }
    
    // Otherwise use regular chatbot API
    const res = await getChatbotResponse(
      backendMessages,
      {
        uniqueClientId,
        converslyWebId: config.converslyWebId,
      },
      mode,
      typeof window !== "undefined" ? { originUrl: window.location.href } : undefined
    )
    return convertBackendToUIMessage(res, "assistant")
  }

  const handleSendMessage = async (content: string) => {
    const trimmed = content.trim()
    if (!trimmed) return

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: trimmed,
      createdAt: new Date(),
    }

    const next = [...messages, userMessage]
    setMessages(next)
    setInput("")
    setIsTyping(true)
    try {
      const assistantMessage = await sendToBackend(next, "default")
      setMessages((prev) => [...prev, assistantMessage])
    } catch (e) {
      // You may want to surface an error message in UI later
      // For now, we simply stop typing state
    } finally {
      setIsTyping(false)
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion)
  }

  const handleRegenerate = async () => {
    const lastUser = [...messages].reverse().find((m) => m.role === "user")
    if (!lastUser) return
    setIsTyping(true)
    try {
      const assistantMessage = await sendToBackend(messages, "regenerate")
      setMessages((prev) => [...prev, assistantMessage])
    } catch (e) {
      // swallow for now
    } finally {
      setIsTyping(false)
    }
  }

  const handleRating = async (
    messageId: string,
    rating: "thumbs-up" | "thumbs-down",
    feedback?: {
      issue?: string
      incorrect?: boolean
      irrelevant?: boolean
      unaddressed?: boolean
    }
  ) => {
    const sentiment = rating === "thumbs-up" ? "like" : "dislike"
    const comment = feedback
      ? typeof feedback.issue === "string"
        ? feedback.issue
        : [
            feedback.incorrect && "Incorrect",
            feedback.irrelevant && "Irrelevant",
            feedback.unaddressed && "Unaddressed",
            feedback.issue,
          ]
            .filter(Boolean)
            .join(" | ")
      : undefined
    try {
      await submitFeedback(messageId, sentiment as "like" | "dislike", comment)
    } catch {
      // ignore errors in preview/actual widget for now
    }
  }

  const widgetProps = {
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
  }

  return (
    <div
      className={cn(
        "relative h-[640px] w-full max-w-[580px] overflow-hidden rounded-2xl border shadow-lg",
        config.appearance === "dark" ? "border-gray-800 bg-gray-950" : "border-gray-200 bg-white",
        className
      )}
    >
      <div className="absolute inset-0">
        {config.displayStyle === "overlay" ? (
          <ActualOverlayWidget {...widgetProps} />
        ) : (
          <ActualCornerWidget {...widgetProps} />
        )}
      </div>
      {!config.widgetEnabled && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/80 p-6 text-center dark:bg-black/60">
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-800 dark:text-gray-100">Chat widget is disabled</p>
            <p className="text-xs text-gray-600 dark:text-gray-300">
              Enable it from settings to use the widget.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}


