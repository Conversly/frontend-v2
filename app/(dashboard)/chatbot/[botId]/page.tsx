import { redirect } from "next/navigation";

export default function ChatbotPage({
  params,
}: {
  params: { botId: string };
}) {
  redirect(`/chatbot/${params.botId}/playground`);
}
