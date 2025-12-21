import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { PieChart as PieChartIcon } from "lucide-react";
import { PieChart } from '@mui/x-charts/PieChart';

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

  const chartData = topics?.map((topic, index) => ({
    id: index,
    value: topic.value,
    label: topic.name,
    color: topic.color
  })) || [];

  return (
    <Card className="shadow-sm border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PieChartIcon className="h-4 w-4 text-muted-foreground" />
          Topic Distribution
        </CardTitle>
        <CardDescription>
          Message volume by topic
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 min-h-[300px] flex items-center justify-center">
        {isLoading ? (
          <Skeleton className="h-[250px] w-[250px] rounded-full" />
        ) : (
          <div className="w-full h-[300px] flex justify-center">
            {chartData.length > 0 ? (
              <PieChart
                series={[
                  {
                    data: chartData,
                    innerRadius: 30,
                    paddingAngle: 2,
                    cornerRadius: 4,
                    highlightScope: { fade: 'global', highlight: 'item' },
                    faded: { innerRadius: 20, additionalRadius: -20, color: 'gray' },
                  },
                ]}
                slotProps={{
                  legend: {
                    direction: 'row',
                    position: { vertical: 'bottom', horizontal: 'center' },
                    padding: 0,
                    labelStyle: {
                      fontSize: 12,
                      fill: '#64748b'
                    }
                  }
                }}
                margin={{ top: 0, bottom: 60, left: 0, right: 0 }}
              />
            ) : (
              <div className="flex items-center justify-center text-muted-foreground text-sm">
                No data available
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

