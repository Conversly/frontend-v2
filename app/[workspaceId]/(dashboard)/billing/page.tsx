import { redirect } from "next/navigation";

export default async function BillingPage({ params }: { params: { workspaceId: string } }) {
    await redirect(`/${params.workspaceId}/billing/overview`);
}
