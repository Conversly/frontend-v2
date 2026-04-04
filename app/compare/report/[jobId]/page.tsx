import type { Metadata } from "next";
import { getComparisonJob } from "@/lib/api/compare";
import { siteConfig } from "@/lib/metadata";
import ReportPageClient from "@/components/compare/ReportPageClient";

export const metadata: Metadata = {
  title: "Comparison Report | VerlyAI",
  description:
    "Your personalized AI-powered competitor comparison report. See how Verly stacks up against the competition.",
  alternates: { canonical: "/compare/report" },
  openGraph: {
    title: "Comparison Report | VerlyAI",
    description: "AI-powered competitor comparison report.",
    url: `${siteConfig.url}/compare/report`,
    type: "website",
  },
  twitter: {
    title: "Comparison Report | VerlyAI",
    description: "AI-powered competitor comparison report. See how Verly stacks up.",
  },
};

interface PageProps {
  params: Promise<{ jobId: string }>;
}

export default async function ReportPage({ params }: PageProps) {
  const { jobId } = await params;

  let initialData = null;
  let initialError: string | null = null;

  try {
    const res = await getComparisonJob(jobId);
    if (res.success) {
      initialData = res.data;
    } else {
      initialError = "Failed to fetch job status";
    }
  } catch (err: any) {
    if (err?.response?.status === 410 || err?.response?.status === 404) {
      initialError =
        "This report has expired or was not found. Please generate a new one.";
    } else {
      initialError = "Failed to load report. Please try again.";
    }
  }

  return (
    <ReportPageClient
      jobId={jobId}
      initialData={initialData}
      initialError={initialError}
    />
  );
}
