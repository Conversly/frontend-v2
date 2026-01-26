
export interface CitationItem {
  source: string;
  count: number;
}

export interface AnalyticsData {
  responses: number;
  likes: number;
  dislikes: number;
  citations: CitationItem[];
}

export interface GetAnalyticsResponse {
  success: boolean;
  data: AnalyticsData;
}

export interface SummaryMetricsData {
  totalMessagesThisMonth: number;
  avgMessagesPerConversation: number;
  likeRatePercent: number;
  avgConversationSessionSec: number;
}

export interface GetSummaryResponse {
  success: boolean;
  data: SummaryMetricsData;
}

export interface ChartsDataPoint {
  date: string; // ISO date (YYYY-MM-DD)
  count: number;
}

export interface FeedbackDistributionData {
  likes: number;
  dislikes: number;
  none: number;
}

export interface ChartsData {
  messagesPerDay: ChartsDataPoint[];
  conversationsPerDay: ChartsDataPoint[];
  feedbackDistribution: FeedbackDistributionData;
}

export interface GetChartsResponse {
  success: boolean;
  data: ChartsData;
}

export interface FeedbackItem {
  convId: string | null;
  content: string;
  feedback: 'like' | 'dislike';
  feedbackComment: string | null;
  createdAt: Date;
}

export interface GetFeedbacksResponse {
  success: boolean;
  data: FeedbackItem[];
}

export interface VoiceLogItem {
  id: string;
  roomName: string | null;
  assistantName: string | null;
  botName: string;
  phoneNumber: string | null;
  status: string;
  startedAt: Date | null;
  endedAt: Date | null;
  durationSec: number | null;
  endReason: string | null;
  recordingUrl: string | null;
}

export interface GetVoiceLogsResponse {
  success: boolean;
  data: VoiceLogItem[];
}

// ============================================================================
// LEGACY TOPICS CHART TYPES (back-compat for existing UI)
// ============================================================================

export interface TopicSeriesPoint {
  date: string; // ISO date (YYYY-MM-DD)
  messages: number;
  likes: number;
  dislikes: number;
}

export interface TopicSeries {
  topicId: string;
  topicName: string;
  color: string | null;
  series: TopicSeriesPoint[];
}

export interface TopicBarChartData {
  topics: TopicSeries[];
  dateRange: { startDate: string; endDate: string };
}

export interface TopicPieChartTopic {
  topicId: string;
  topicName: string;
  color: string | null;
  messages: number;
  likes: number;
  dislikes: number;
}

export interface TopicPieChartData {
  topics: TopicPieChartTopic[];
  dateRange: { startDate: string; endDate: string };
}

export interface GetTopicBarChartResponse {
  success: boolean;
  data: TopicBarChartData;
}

export interface GetTopicPieChartResponse {
  success: boolean;
  data: TopicPieChartData;
}

// ============================================================================
// UNIFIED DASHBOARD TYPES
// ============================================================================

export interface SentimentCounts {
  veryNegative: number;
  negative: number;
  neutral: number;
  positive: number;
  veryPositive: number;
}

export interface SentimentDayPoint extends SentimentCounts {
  date: string; // ISO date (YYYY-MM-DD)
}

export interface SentimentData {
  perDay: SentimentDayPoint[];
  totals: SentimentCounts;
}

export interface TopicDayPoint {
  date: string;
  conversations: number;
  likes: number;
  dislikes: number;
}

export interface TopicWithSeries {
  topicId: string;
  topicName: string;
  color: string | null;
  series: TopicDayPoint[];
}

export interface TopicTotal {
  topicId: string;
  topicName: string;
  color: string | null;
  conversations: number;
  likes: number;
  dislikes: number;
}

export interface TopicsData {
  perDay: TopicWithSeries[];
  totals: TopicTotal[];
}

export interface CountryDataPoint {
  countryCode: string;
  conversations: number;
}

export interface CountryData {
  data: CountryDataPoint[];
}

export interface DashboardData {
  sentiment: SentimentData;
  topics: TopicsData;
  country: CountryData;
  dateRange: { startDate: string; endDate: string };
}

export interface GetDashboardResponse {
  success: boolean;
  data: DashboardData;
}
