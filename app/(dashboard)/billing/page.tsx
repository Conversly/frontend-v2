"use client";

import { useRouter } from "next/navigation";
import { BillingDashboard } from "@/components/billing/billing-dashboard";
import { RoleGuard } from "@/components/auth/role-guard";

export default function BillingPage() {
  const router = useRouter();

  const handleNavigateToChatbot = (chatbotId: string) => {
    router.push(`/billing/${chatbotId}`);
  };

  return (
    <RoleGuard requireBillingAdmin>
      <div className="container mx-auto py-6 max-w-7xl">
        <BillingDashboard onNavigateToChatbot={handleNavigateToChatbot} />
      </div>
    </RoleGuard>
  );
}
