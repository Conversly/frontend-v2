import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { TrendingUp, ThumbsUp, Calendar } from "lucide-react";
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
  Legend,
} from "recharts";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

interface ChartsSectionProps {
  chartsData?: {
    messagesPerDay?: Array<{ date: string; count: number }>;
    conversationsPerDay?: Array<{ date: string; count: number }>;
  };
  chartsLoading: boolean;
  feedbackDistribution: { likes: number; dislikes: number; none: number };
  feedbacksLoading: boolean;
  formatDate: (dateString: string) => string;
}

export function ChartsSection({
  chartsData,
  chartsLoading,
  feedbackDistribution,
  feedbacksLoading,
  formatDate,
}: ChartsSectionProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {/* Messages per Day Chart */}
      <Card className="p-4 lg:col-span-2">
        <div className="flex items-center mb-3">
          <TrendingUp className="h-4 w-4 mr-2" />
          <h3 className="text-base font-semibold">Messages per Day</h3>
        </div>
        {chartsLoading ? (
          <Skeleton className="h-[220px] w-full" />
        ) : (
          <ResponsiveContainer width="100%" height={220}>
            <LineChart
              data={
                chartsData?.messagesPerDay?.map((item) => ({
                  ...item,
                  date: formatDate(item.date),
                })) || []
              }
            >
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
      <Card className="p-4">
        <div className="flex items-center mb-3">
          <ThumbsUp className="h-4 w-4 mr-2" />
          <h3 className="text-base font-semibold">Feedback Distribution</h3>
        </div>
        {feedbacksLoading ? (
          <Skeleton className="h-[220px] w-full" />
        ) : (
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={[
                  { name: 'Likes', value: feedbackDistribution.likes },
                  { name: 'Dislikes', value: feedbackDistribution.dislikes },
                  { name: 'No Feedback', value: feedbackDistribution.none },
                ]}
                cx="50%"
                cy="50%"
                outerRadius={70}
                fill="#8884d8"
                dataKey="value"
                label={(entry: any) => (entry.value > 0 ? entry.value.toString() : '')}
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
      <Card className="p-4 lg:col-span-3">
        <div className="flex items-center mb-3">
          <Calendar className="h-4 w-4 mr-2" />
          <h3 className="text-base font-semibold">Conversations per Day</h3>
        </div>
        {chartsLoading ? (
          <Skeleton className="h-[220px] w-full" />
        ) : (
          <ResponsiveContainer width="100%" height={220}>
            <BarChart
              data={
                chartsData?.conversationsPerDay?.map((item) => ({
                  ...item,
                  date: formatDate(item.date),
                })) || []
              }
            >
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
  );
}

