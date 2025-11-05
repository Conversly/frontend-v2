'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { DashboardSidebar } from './DashboardSidebar';
import Navbar from '@/components/landing/navbar';
import { getChatbot } from '@/lib/api/chatbot';
import { toast } from 'sonner';

interface DashboardLayoutProps {
  children: React.ReactNode;
  chatbotId?: string;
  chatbotName?: string;
}

export function DashboardLayout({ children, chatbotId, chatbotName: propChatbotName }: DashboardLayoutProps) {
  const params = useParams();
  const [chatbotName, setChatbotName] = useState(propChatbotName);
  const activeChatbotId = chatbotId || params?.id?.toString() || params?.chatbotId?.toString();
  const isChatbotPage = activeChatbotId !== undefined;

  // Fetch chatbot name if not provided and we're on a chatbot page
  useEffect(() => {
    if (isChatbotPage && !propChatbotName && activeChatbotId) {
      const fetchChatbotName = async () => {
        try {
          const chatbot = await getChatbot(activeChatbotId);
          setChatbotName(chatbot.name);
        } catch (error) {
          console.error('Failed to fetch chatbot name:', error);
        }
      };
      fetchChatbotName();
    }
  }, [isChatbotPage, propChatbotName, activeChatbotId]);

  return (
    <div className="min-h-screen bg-black relative">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-500/20 via-background to-transparent opacity-30" />
        <div className="absolute inset-0 bg-grid-white/5 [mask-image:radial-gradient(black,transparent_70%)]" />
      </div>

      {/* Top Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50 border-b border-gray-800/60">
        <Navbar />
      </div>

      {/* Layout Container */}
      <div className="flex pt-16">
        {/* Sidebar */}
        <DashboardSidebar 
          chatbotId={activeChatbotId} 
          chatbotName={chatbotName}
        />

        {/* Main Content */}
        <main className="flex-1 overflow-x-hidden">
          <div className="container mx-auto px-6 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

