import { Toaster } from "@/components/ui/sonner";
import { EscalationNotifier } from "@/components/realtime/EscalationNotifier";

export default function ChatbotLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Toaster id="escalation" position="top-center" offset={64} />
      <EscalationNotifier />
      {children}
    </>
  );
}
