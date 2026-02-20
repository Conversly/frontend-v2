// Type declarations for @conversly/chat-widget package
// TODO: Fix package build to generate proper .d.ts files

declare module "@conversly/chat-widget" {
  import type { ReactNode } from "react"

  export interface Message {
    id: string
    role: "user" | "assistant" | (string & {})
    content: string
    createdAt?: Date
    citations?: string[]
    responseId?: string
    source?: "chat" | "voice"
  }

  export interface UIConfigInput {
    DisplayName?: string
    InitialMessage?: string
    suggestedMessages?: string[]
    messagePlaceholder?: string
    keepShowingSuggested?: boolean
    collectFeedback?: boolean
    allowRegenerate?: boolean
    dismissibleNoticeText?: string
    footerText?: string
    autoShowInitial?: boolean
    autoShowDelaySec?: number
    primaryColor?: string
    widgetBubbleColour?: string
    PrimaryIcon?: string
    widgeticon?: string
    alignChatButton?: "left" | "right"
    showButtonText?: boolean
    buttonText?: string
    appearance?: "light" | "dark"
    widgetButtonText?: string
    chatWidth?: string
    chatHeight?: string
    testing?: boolean
    voiceEnabled?: boolean
  }

  export interface PlaygroundConfig {
    chatbotId: string
    systemPrompt: string
    model: string
    temperature: number
  }

  export interface PreviewWidgetProps {
    config: UIConfigInput
    contained?: boolean
  }

  export interface ActualWidgetProps {
    config: UIConfigInput
    playgroundConfig?: PlaygroundConfig
    isOpen?: boolean
    onOpenChange?: (isOpen: boolean) => void
    contained?: boolean
  }

  export interface MessageListProps {
    messages: Message[]
    showTimeStamps?: boolean
    isTyping?: boolean
  }

  export function PreviewWidget(props: PreviewWidgetProps): ReactNode
  export function ActualWidget(props: ActualWidgetProps): ReactNode
  export function MessageList(props: MessageListProps): ReactNode
}

