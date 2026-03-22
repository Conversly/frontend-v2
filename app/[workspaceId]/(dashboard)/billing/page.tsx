import { redirect } from "next/navigation";

interface BillingPageProps {
  params: Promise<{ workspaceId: string }>;
}

export default async function BillingPage({ params }: BillingPageProps) {
  const { workspaceId } = await params;

  redirect(`/${workspaceId}/billing/overview`);
}
