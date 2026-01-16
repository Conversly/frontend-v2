import { redirect } from "next/navigation";

export default function BillingPage({ params }: { params: { workspaceId: string } }) {
    redirect(`/${params.workspaceId}/billing/overview`);
}
