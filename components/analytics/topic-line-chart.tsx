import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { TrendingUp } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#ff7c7c'];

interface TopicSeries {
  topicId: number;
  topicName: string;
  color?: string | null;
  series: Array<{ date: string; messages: number }>;
}

interface TopicLineChartProps {
  topics?: TopicSeries[];
  isLoading: boolean;
  formatDate: (dateString: string) => string;
}

export function TopicLineChart({ topics, isLoading, formatDate }: TopicLineChartProps) {
  const transformLineChartData = () => {
    if (!topics || topics.length === 0) return [];
    
    const allDates = new Set<string>();
    topics.forEach(topic => {
      topic.series.forEach(point => allDates.add(point.date));
    });
    
    const sortedDates = Array.from(allDates).sort();
    
    return sortedDates.map(date => {
      const dataPoint: any = { date: formatDate(date) };
      
      topics.forEach(topic => {
        const point = topic.series.find(p => p.date === date);
        dataPoint[topic.topicName] = point?.messages || 0;
      });
      
      return dataPoint;
    });
  };

  const transformedData = transformLineChartData();

  return (
    <Card className="p-4">
      <div className="flex items-center mb-3">
        <TrendingUp className="h-4 w-4 mr-2" />
        <h3 className="text-base font-semibold">Topic Messages Over Time</h3>
      </div>
      {isLoading ? (
        <Skeleton className="h-[220px] w-full" />
      ) : (
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={transformedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            {topics?.map((topic, index) => (
              <Line
                key={topic.topicId}
                type="monotone"
                dataKey={topic.topicName}
                stroke={topic.color || COLORS[index % COLORS.length]}
                strokeWidth={2}
                dot={{ fill: topic.color || COLORS[index % COLORS.length], strokeWidth: 2, r: 3 }}
                activeDot={{ r: 5, fill: topic.color || COLORS[index % COLORS.length] }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      )}
    </Card>
  );
}

