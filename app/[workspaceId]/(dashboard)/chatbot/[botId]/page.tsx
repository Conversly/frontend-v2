import { redirect } from "next/navigation";

export default async function ChatbotPage({
  params,
}: {
  params: Promise<{ workspaceId: string; botId: string }>;
}) {
  const { workspaceId, botId } = await params;
  redirect(`/${workspaceId}/chatbot/${botId}/playground`);
}
