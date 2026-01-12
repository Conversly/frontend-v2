"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Paperclip, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
    timestamp: Date;
}

export function HelpChat() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            role: "assistant",
            content: "Hello! How can I assist you today?",
            timestamp: new Date(),
        },
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, isTyping]);

    const handleSendMessage = async () => {
        if (!inputValue.trim()) return;

        const newMessage: Message = {
            id: Date.now().toString(),
            role: "user",
            content: inputValue,
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, newMessage]);
        setInputValue("");
        setIsTyping(true);

        // Mock response delay
        setTimeout(() => {
            const responseMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: "I'm a demo AI agent. In the final version, I will be connected to your backend to provide real support!",
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, responseMessage]);
            setIsTyping(false);
        }, 1500);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSendMessage();
        }
    }

    return (
        <div className="flex flex-col h-[600px] w-full max-w-4xl mx-auto bg-background border rounded-xl shadow-sm overflow-hidden">
            {/* Chat Header */}
            <div className="p-4 border-b bg-muted/30 flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                    <Bot className="w-5 h-5 text-primary" />
                </div>
                <div>
                    <h3 className="font-semibold">AI Support Assistant</h3>
                    <p className="text-xs text-muted-foreground">Always here to help</p>
                </div>
            </div>

            {/* Messages Area */}
            <ScrollArea className="flex-1 p-4">
                <div className="flex flex-col gap-4">
                    <AnimatePresence initial={false}>
                        {messages.map((message) => (
                            <motion.div
                                key={message.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className={cn(
                                    "flex items-start gap-3 max-w-[80%]",
                                    message.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                                )}
                            >
                                <Avatar className="w-8 h-8 border">
                                    {message.role === "assistant" ? (
                                        <>
                                            <AvatarImage src="/bot-avatar.png" />
                                            <AvatarFallback className="bg-primary text-primary-foreground"><Bot className="w-4 h-4" /></AvatarFallback>
                                        </>
                                    ) : (
                                        <>
                                            <AvatarImage src="/user-avatar.png" />
                                            <AvatarFallback className="bg-muted"><User className="w-4 h-4" /></AvatarFallback>
                                        </>
                                    )}
                                </Avatar>

                                <div
                                    className={cn(
                                        "p-3 rounded-2xl text-sm",
                                        message.role === "user"
                                            ? "bg-primary text-primary-foreground rounded-tr-none shadow-md"
                                            : "bg-muted/50 border rounded-tl-none shadow-sm"
                                    )}
                                >
                                    {message.content}
                                    <div className={cn("text-[10px] mt-1 opacity-70", message.role === "user" ? "text-primary-foreground/70" : "text-muted-foreground")}>
                                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </div>
                                </div>
                            </motion.div>
                        ))}

                        {isTyping && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex items-start gap-3 mr-auto max-w-[80%]"
                            >
                                <Avatar className="w-8 h-8 border">
                                    <AvatarFallback className="bg-primary text-primary-foreground"><Bot className="w-4 h-4" /></AvatarFallback>
                                </Avatar>
                                <div className="bg-muted/50 border p-3 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 bg-foreground/40 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                    <span className="w-1.5 h-1.5 bg-foreground/40 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                    <span className="w-1.5 h-1.5 bg-foreground/40 rounded-full animate-bounce"></span>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <div ref={scrollRef} />
                </div>
            </ScrollArea>

            {/* Input Area */}
            <div className="p-4 border-t bg-background">
                <div className="relative flex items-center">
                    <div className="absolute left-2 flex gap-1">
                        <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-foreground rounded-full">
                            <Paperclip className="w-4 h-4" />
                        </Button>
                    </div>
                    <Input
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Ask for help..."
                        className="pl-12 pr-24 py-6 rounded-full shadow-inner bg-muted/20 border-muted-foreground/20 focus-visible:ring-1 focus-visible:ring-primary/50"
                    />
                    <div className="absolute right-2 flex gap-1 items-center">
                        {!inputValue && (
                            <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-foreground rounded-full">
                                <Mic className="w-4 h-4" />
                            </Button>
                        )}
                        <Button
                            size="icon"
                            onClick={handleSendMessage}
                            disabled={!inputValue.trim()}
                            className={cn("h-8 w-8 rounded-full transition-all duration-200", inputValue.trim() ? "bg-primary text-primary-foreground shadow-md hover:shadow-lg" : "bg-muted text-muted-foreground")}
                        >
                            <Send className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
                <p className="text-[10px] text-center text-muted-foreground mt-2">
                    AI can make mistakes. Please verify important information.
                </p>
            </div>
        </div>
    );
}
