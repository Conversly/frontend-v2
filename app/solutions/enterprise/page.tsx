import type { Metadata } from "next";
import EnterprisePageContent from "@/components/enterprise/EnterprisePageContent";
import { siteConfig } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "Enterprise AI Customer Support Solution | Verly",
  description:
    "Explore Verly's enterprise solution for secure deployment, custom integrations, advanced controls, and complex support operations.",
  alternates: { canonical: "/solutions/enterprise" },
  openGraph: {
    title: "Enterprise AI Customer Support Solution | Verly",
    description:
      "See how Verly fits enterprise support teams with stricter security, deployment, and workflow requirements.",
    url: `${siteConfig.url}/solutions/enterprise`,
    type: "website",
  },
  twitter: {
    title: "Enterprise AI Customer Support Solution | Verly",
    description:
      "See how Verly fits enterprise support teams with stricter security, deployment, and workflow requirements.",
  },
};

export default function EnterpriseSolutionPage() {
  return <EnterprisePageContent />;
}
