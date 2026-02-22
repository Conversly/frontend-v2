import { redirect } from "next/navigation";

export default async function BillingPage({ params }: { params: Promise<{ workspaceId: string }> }) {
    const { workspaceId } = await params;
    await redirect(`/${workspaceId}/billing/overview`);
}
