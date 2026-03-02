'use client';

import React, { Suspense, Component, type ReactNode, type ErrorInfo } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { HeaderSkeleton, DataSourceSkeleton, ChatbotCardSkeleton } from '@/components/skeletons';

/**
 * Error state props
 */
interface ErrorStateProps {
  error: Error;
  reset: () => void;
}

/**
 * Default error fallback UI
 * Shows error message with retry button
 */
function DefaultErrorFallback({ error, reset }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-6 text-center">
      <div className="mb-4 rounded-full bg-destructive/10 p-3">
        <AlertCircle className="h-6 w-6 text-destructive" />
      </div>
      <h3 className="mb-2 text-lg font-semibold text-foreground">Something went wrong</h3>
      <p className="mb-4 max-w-md text-sm text-muted-foreground">
        {error.message || 'An unexpected error occurred while loading this content.'}
      </p>
      <Button onClick={reset} variant="outline" className="gap-2">
        <RefreshCw className="h-4 w-4" />
        Try again
      </Button>
    </div>
  );
}

/**
 * Error boundary state
 */
interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * Props for the error boundary component
 */
interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: React.ComponentType<ErrorStateProps>;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

/**
 * Error Boundary that catches errors from children
 * Provides reset functionality to retry rendering
 */
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught error:', error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError && this.state.error) {
      const Fallback = this.props.fallback || DefaultErrorFallback;
      return <Fallback error={this.state.error} reset={this.handleReset} />;
    }

    return this.props.children;
  }
}

/**
 * Props for AsyncBoundary
 */
interface AsyncBoundaryProps {
  children: ReactNode;
  /**
   * Component to show while loading
   * @default Skeleton placeholder
   */
  loadingFallback?: ReactNode;
  /**
   * Component to show if error occurs
   * @default DefaultErrorFallback
   */
  errorFallback?: React.ComponentType<ErrorStateProps>;
  /**
   * Callback when error occurs
   */
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

/**
 * AsyncBoundary - Combines Suspense + ErrorBoundary
 *
 * Usage:
 * ```tsx
 * <AsyncBoundary loadingFallback={<MySkeleton />}>
 *   <MyAsyncDataComponent />
 * </AsyncBoundary>
 * ```
 *
 * Or with custom error UI:
 * ```tsx
 * <AsyncBoundary
 *   loadingFallback={<MySkeleton />}
 *   errorFallback={({ error, reset }) => (
 *     <div>Error: {error.message} <button onClick={reset}>Retry</button></div>
 *   )}
 * >
 *   <MyAsyncDataComponent />
 * </AsyncBoundary>
 * ```
 */
export function AsyncBoundary({
  children,
  loadingFallback,
  errorFallback,
  onError,
}: AsyncBoundaryProps) {
  return (
    <ErrorBoundary fallback={errorFallback} onError={onError}>
      <Suspense fallback={loadingFallback || null}>{children}</Suspense>
    </ErrorBoundary>
  );
}

/**
 * Section-level async boundary
 * Adds a container div around the boundary for layout purposes
 */
interface AsyncSectionProps extends AsyncBoundaryProps {
  className?: string;
}

export function AsyncSection({
  children,
  loadingFallback,
  errorFallback,
  onError,
  className,
}: AsyncSectionProps) {
  return (
    <div className={className}>
      <AsyncBoundary
        loadingFallback={loadingFallback}
        errorFallback={errorFallback}
        onError={onError}
      >
        {children}
      </AsyncBoundary>
    </div>
  );
}

// ============================================================================
// Pre-configured Async Boundary Variants
// These provide ready-to-use boundaries with appropriate skeletons for common use cases
// ============================================================================

/**
 * AsyncHeaderBoundary - Pre-configured for DashboardHeader breadcrumbs area
 * Shows a minimal loading state for header navigation
 */
export function AsyncHeaderBoundary({
  children,
  errorFallback,
  onError,
}: Omit<AsyncBoundaryProps, 'loadingFallback'>) {
  return (
    <AsyncBoundary loadingFallback={<HeaderSkeleton />} errorFallback={errorFallback} onError={onError}>
      {children}
    </AsyncBoundary>
  );
}

/**
 * AsyncChatbotBoundary - Pre-configured for chatbot-related async content
 */
export function AsyncChatbotBoundary({
  children,
  errorFallback,
  onError,
}: Omit<AsyncBoundaryProps, 'loadingFallback'>) {
  return (
    <AsyncBoundary loadingFallback={<ChatbotCardSkeleton />} errorFallback={errorFallback} onError={onError}>
      {children}
    </AsyncBoundary>
  );
}

/**
 * AsyncDataSourceBoundary - Pre-configured for data source-related async content
 */
export function AsyncDataSourceBoundary({
  children,
  errorFallback,
  onError,
}: Omit<AsyncBoundaryProps, 'loadingFallback'>) {
  return (
    <AsyncBoundary loadingFallback={<DataSourceSkeleton />} errorFallback={errorFallback} onError={onError}>
      {children}
    </AsyncBoundary>
  );
}

export { ErrorBoundary };
export type { ErrorStateProps };
