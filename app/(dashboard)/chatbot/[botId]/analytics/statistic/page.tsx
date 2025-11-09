"use client";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useAnalyticsSummaryQuery, useAnalyticsChartsQuery, useAnalyticsFeedbacksQuery } from "@/services/analytics";
import { MessageSquare, Users, ThumbsUp, TrendingUp, Calendar, BarChart3, Settings } from "lucide-react";
import { useState, use } from "react";
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from "recharts";

interface StatisticPageProps {
  params: Promise<{
    botId: string;
  }>;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function StatisticPage({ params }: StatisticPageProps) {
  const { botId } = use(params);
  const [selectedDays, setSelectedDays] = useState<number>(7);
  const [feedbackLimit, setFeedbackLimit] = useState<number>(10);
  
  console.log('Rendering StatisticPage for botId:', botId);
  
  const { data: summaryData, isLoading: summaryLoading, error: summaryError } = useAnalyticsSummaryQuery(botId);
  const { data: chartsData, isLoading: chartsLoading, error: chartsError } = useAnalyticsChartsQuery(botId, selectedDays);
  const { data: feedbacksData, isLoading: feedbacksLoading, error: feedbacksError } = useAnalyticsFeedbacksQuery(botId, feedbackLimit);

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    } catch {
      return dateString;
    }
  };

  const formatFeedbackDate = (date: Date | string) => {
    try {
      const dateObj = typeof date === 'string' ? new Date(date) : date;
      return dateObj.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      });
    } catch {
      return 'Invalid date';
    }
  };

  // Calculate feedback distribution from actual feedback data
  const calculateFeedbackDistribution = () => {
    if (!feedbacksData || feedbacksData.length === 0) {
      return { likes: 0, dislikes: 0, none: 0 };
    }
    
    const likes = feedbacksData.filter(item => item.feedback === 'like').length;
    const dislikes = feedbacksData.filter(item => item.feedback === 'dislike').length;
    
    return { likes, dislikes, none: 0 };
  };

  const feedbackDistribution = calculateFeedbackDistribution();

  if (summaryError || chartsError || feedbacksError) {
    return (
      <div className="container py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Statistics</h1>
          <p className="text-muted-foreground">
            Analyze conversation topics and trending themes
          </p>
        </div>
        <Card className="p-6">
          <p className="text-destructive">Error loading analytics data. Please try again later.</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="container py-6 space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Statistics</h1>
        <p className="text-muted-foreground">
          Analyze conversation topics and trending themes
        </p>
      </div>

      {/* Controls */}
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span className="font-medium">Charts Period:</span>
              <div className="flex space-x-2">
                <Button
                  variant={selectedDays === 7 ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedDays(7)}
                >
                  7 Days
                </Button>
                <Button
                  variant={selectedDays === 30 ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedDays(30)}
                >
                  30 Days
                </Button>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Settings className="h-4 w-4" />
              <span className="font-medium">Feedback Limit:</span>
              <div className="flex space-x-2">
                <Button
                  variant={feedbackLimit === 5 ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFeedbackLimit(5)}
                >
                  5
                </Button>
                <Button
                  variant={feedbackLimit === 10 ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFeedbackLimit(10)}
                >
                  10
                </Button>
                <Button
                  variant={feedbackLimit === 20 ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFeedbackLimit(20)}
                >
                  20
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6">
          <div className="flex items-center">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Messages This Month</p>
              {summaryLoading ? (
                <Skeleton className="h-8 w-16 mt-2" />
              ) : (
                <div className="text-2xl font-bold">{summaryData?.totalMessagesThisMonth?.toLocaleString() || 0}</div>
              )}
            </div>
            <MessageSquare className="h-4 w-4 text-muted-foreground ml-auto" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Avg. Messages per Conversation</p>
              {summaryLoading ? (
                <Skeleton className="h-8 w-16 mt-2" />
              ) : (
                <div className="text-2xl font-bold">{summaryData?.avgMessagesPerConversation?.toFixed(1) || '0.0'}</div>
              )}
            </div>
            <BarChart3 className="h-4 w-4 text-muted-foreground ml-auto" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Like Rate (%)</p>
              {summaryLoading ? (
                <Skeleton className="h-8 w-16 mt-2" />
              ) : (
                <div className="text-2xl font-bold">{summaryData?.likeRatePercent?.toFixed(1) || '0.0'}%</div>
              )}
            </div>
            <ThumbsUp className="h-4 w-4 text-muted-foreground ml-auto" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Active Conversations Today</p>
              {summaryLoading ? (
                <Skeleton className="h-8 w-16 mt-2" />
              ) : (
                <div className="text-2xl font-bold">{summaryData?.activeConversationsToday || 0}</div>
              )}
            </div>
            <Users className="h-4 w-4 text-muted-foreground ml-auto" />
          </div>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Messages per Day Chart */}
        <Card className="p-6 lg:col-span-2">
          <div className="flex items-center mb-4">
            <TrendingUp className="h-5 w-5 mr-2" />
            <h3 className="text-lg font-semibold">Messages per Day</h3>
          </div>
          {chartsLoading ? (
            <Skeleton className="h-[300px] w-full" />
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartsData?.messagesPerDay?.map(item => ({
                ...item,
                date: formatDate(item.date)
              })) || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="count" 
                  stroke="#8884d8" 
                  strokeWidth={2}
                  dot={{ fill: '#8884d8' }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </Card>

        {/* Feedback Distribution Chart */}
        <Card className="p-6">
          <div className="flex items-center mb-4">
            <ThumbsUp className="h-5 w-5 mr-2" />
            <h3 className="text-lg font-semibold">Feedback Distribution</h3>
          </div>
          {feedbacksLoading ? (
            <Skeleton className="h-[300px] w-full" />
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={[
                    { name: 'Likes', value: feedbackDistribution.likes },
                    { name: 'Dislikes', value: feedbackDistribution.dislikes },
                    { name: 'No Feedback', value: feedbackDistribution.none }
                  ]}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={(entry: any) => entry.value > 0 ? entry.value.toString() : ''}
                >
                  {COLORS.map((color, index) => (
                    <Cell key={`cell-${index}`} fill={color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </Card>

        {/* Conversations per Day Chart */}
        <Card className="p-6 lg:col-span-3">
          <div className="flex items-center mb-4">
            <Calendar className="h-5 w-5 mr-2" />
            <h3 className="text-lg font-semibold">Conversations per Day</h3>
          </div>
          {chartsLoading ? (
            <Skeleton className="h-[300px] w-full" />
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartsData?.conversationsPerDay?.map(item => ({
                ...item,
                date: formatDate(item.date)
              })) || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </Card>
      </div>

      {/* Recent Feedback Table */}
      <Card className="p-6">
        <div className="flex items-center mb-4">
          <MessageSquare className="h-5 w-5 mr-2" />
          <h3 className="text-lg font-semibold">Recent Feedback</h3>
        </div>
        {feedbacksLoading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Content</th>
                  <th className="text-left py-3 px-4 font-medium">Feedback</th>
                  <th className="text-left py-3 px-4 font-medium">Comment</th>
                  <th className="text-left py-3 px-4 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {feedbacksData && feedbacksData.length > 0 ? (
                  feedbacksData.map((feedback, index) => (
                    <tr key={index} className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4 max-w-xs truncate" title={feedback.content}>
                        {feedback.content}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          feedback.feedback === 'like' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                        }`}>
                          {feedback.feedback === 'like' ? '👍 Like' : '👎 Dislike'}
                        </span>
                      </td>
                      <td className="py-3 px-4 max-w-xs truncate" title={feedback.feedbackComment || 'No comment'}>
                        {feedback.feedbackComment || 'No comment'}
                      </td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">
                        {formatFeedbackDate(feedback.createdAt)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-muted-foreground">
                      No feedback data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
