import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { PieChart as PieChartIcon } from "lucide-react";
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface TopicData {
  name: string;
  value: number;
  likes: number;
  dislikes: number;
  color: string;
  [key: string]: string | number;
}

interface TopicPieChartProps {
  topics: TopicData[];
  isLoading: boolean;
}

export function TopicPieChart({ topics, isLoading }: TopicPieChartProps) {
  return (
    <Card className="p-4">
      <div className="flex items-center mb-3">
        <PieChartIcon className="h-4 w-4 mr-2" />
        <h3 className="text-base font-semibold">Topic Distribution</h3>
      </div>
      {isLoading ? (
        <Skeleton className="h-[220px] w-full" />
      ) : (
        <ResponsiveContainer width="100%" height={220}>
          <RechartsPieChart>
            <Pie
              data={topics}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={(entry: any) => 
                `${entry.name}: ${entry.value} (${(entry.percent * 100).toFixed(0)}%)`
              }
            >
              {topics.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value: any, name: any, props: any) => [
                `Messages: ${value}`,
                `Likes: ${props.payload.likes}`,
                `Dislikes: ${props.payload.dislikes}`
              ]}
            />
          </RechartsPieChart>
        </ResponsiveContainer>
      )}
    </Card>
  );
}

