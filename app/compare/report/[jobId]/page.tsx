'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { useParams } from 'next/navigation';
import Navbar from '@/components/landing/navbar';
import Footer from '@/components/landing/footer';
import LoadingReport from '@/components/compare/loading-report';
import CompareReport from '@/components/compare/compare-report';
import { getComparisonJob } from '@/lib/api/compare';
import { Button } from '@/components/ui/button';
import { AlertTriangle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const CONTENT_WIDTH = 'w-[95%] md:w-[85%] lg:w-[80%] max-w-[1200px] mx-auto';

export default function ReportPage() {
  const { jobId } = useParams<{ jobId: string }>();
  const [stage, setStage] = useState<string>('pending');
  const [report, setReport] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const poll = useCallback(async () => {
    if (!jobId) return;
    try {
      const res = await getComparisonJob(jobId);
      if (!res.success) {
        setError('Failed to fetch job status');
        return;
      }

      const { stage: s, report: r, error: e } = res.data;
      setStage(s);

      if (s === 'complete' && r) {
        setReport(r);
        if (intervalRef.current) clearInterval(intervalRef.current);
      }
      if (s === 'error') {
        setError(e || 'Analysis failed');
        if (intervalRef.current) clearInterval(intervalRef.current);
      }
    } catch (err: any) {
      if (err?.response?.status === 410 || err?.response?.status === 404) {
        setError('This report has expired or was not found. Please generate a new one.');
        if (intervalRef.current) clearInterval(intervalRef.current);
      }
    }
  }, [jobId]);

  useEffect(() => {
    poll();
    intervalRef.current = setInterval(poll, 3000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [poll]);

  return (
    <main className="bg-background relative w-full">
      <div className="absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />
      <div className="relative z-10">
        <Navbar />
        <div className={CONTENT_WIDTH}>
          <div className="pt-28 pb-10 px-4">
            {/* Loading */}
            {!report && !error && (
              <LoadingReport currentStage={stage} />
            )}

            {/* Error */}
            {error && (
              <div className="max-w-lg mx-auto py-24 text-center space-y-6">
                <div className="w-14 h-14 rounded-full bg-destructive/10 flex items-center justify-center mx-auto">
                  <AlertTriangle className="w-7 h-7 text-destructive" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-xl font-bold text-foreground">Something went wrong</h2>
                  <p className="text-sm text-muted-foreground">{error}</p>
                </div>
                <Link href="/compare">
                  <Button variant="outline" className="rounded-full">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Try Again
                  </Button>
                </Link>
              </div>
            )}

            {/* Report */}
            {report && (
              <CompareReport report={report} />
            )}
          </div>
          <Footer />
        </div>
      </div>
    </main>
  );
}
