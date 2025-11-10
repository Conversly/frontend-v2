import { redirect } from "next/navigation";

export default async function ChatbotPage({
  params,
}: {
  params: Promise<{ botId: string }>;
}) {
  const { botId } = await params;
  redirect(`/chatbot/${botId}/playground`);
}
