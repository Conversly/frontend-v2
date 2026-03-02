import { DataSourceSkeleton } from '@/components/skeletons';

/**
 * Loading state for the data sources page
 * Shows a skeleton layout with sidebar and data source cards
 * This allows the UI structure to render immediately while data streams in
 */
export default function SourcesPageLoading() {
  return <DataSourceSkeleton />;
}
