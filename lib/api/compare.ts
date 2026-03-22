import { fetch } from './axios';

export interface StartComparisonPayload {
  competitorId: string;
  websiteUrl: string;
}

export async function startComparison(data: StartComparisonPayload) {
  const res = await fetch('/compare/analyze', {
    method: 'POST',
    data,
  });
  return res.data as { success: boolean; data: { jobId: string } };
}

export async function getComparisonJob(jobId: string) {
  const res = await fetch(`/compare/${jobId}`);
  return res.data as {
    success: boolean;
    message?: string;
    data: {
      jobId: string;
      stage: 'pending' | 'crawling' | 'analyzing' | 'complete' | 'error';
      report: any | null;
      error: string | null;
    };
  };
}
