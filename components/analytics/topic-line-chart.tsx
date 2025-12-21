import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { TrendingUp } from "lucide-react";
import { LineChart } from '@mui/x-charts/LineChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { chartsGridClasses } from '@mui/x-charts/ChartsGrid';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#ff7c7c'];

interface TopicSeries {
  topicId: string;
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

  // Transform data for MUI X Charts (dataset format)
  const chartDataset = (() => {
    if (!topics || topics.length === 0) return [];

    // Get all unique dates
    const allDates = new Set<string>();
    topics.forEach(topic => {
      topic.series.forEach(point => allDates.add(point.date));
    });

    const sortedDates = Array.from(allDates).sort();

    // Create dataset
    return sortedDates.map(date => {
      const dataPoint: any = {
        date: new Date(date),
        dateStr: formatDate(date)
      };

      topics.forEach(topic => {
        const point = topic.series.find(p => p.date === date);
        dataPoint[topic.topicName] = point?.messages || 0;
      });

      return dataPoint;
    });
  })();

  // Generate series config dynamically
  const chartSeries = topics?.map((topic, index) => ({
    dataKey: topic.topicName,
    label: topic.topicName,
    color: topic.color || COLORS[index % COLORS.length],
    showMark: false,
    connectNulls: true,
    curve: "linear" as const,
  })) || [];

  const chartSetting = {
    grid: { horizontal: true },
    sx: {
      [`.${axisClasses.left} .${axisClasses.label}`]: {
        transform: 'translate(-20px, 0)',
      },
      [`.${chartsGridClasses.line}`]: { strokeDasharray: '3 3', stroke: '#e2e8f0' },
      "& .MuiChartsAxis-bottom .MuiChartsAxis-tickLabel": {
        fill: "#64748b",
        fontSize: "0.75rem"
      },
      "& .MuiChartsAxis-left .MuiChartsAxis-tickLabel": {
        fill: "#64748b",
        fontSize: "0.75rem"
      },
      // Hide legend if too many items or rely on default
      "& .MuiChartsLegend-series text": {
        fontSize: "0.75rem !important",
        fill: "#64748b !important"
      }
    },
  };

  return (
    <Card className="shadow-sm border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
          Topic Messages Over Time
        </CardTitle>
        <CardDescription>
          Trend analysis of conversation topics
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-[300px] w-full" />
        ) : (
          <div className="w-full h-[300px]">
            {chartDataset.length > 0 ? (
              <LineChart
                dataset={chartDataset}
                xAxis={[{
                  scaleType: 'point',
                  dataKey: 'dateStr',
                  tickLabelStyle: { fontSize: 12 }
                }]}
                series={chartSeries}
                {...chartSetting}
                margin={{ left: 30, right: 10, top: 10, bottom: 20 }}
                slotProps={{
                  legend: {
                    direction: 'row',
                    position: { vertical: 'bottom', horizontal: 'center' },
                    padding: 0,
                  }
                }}
              />
            ) : (
              <div className="flex h-full items-center justify-center text-muted-foreground text-sm">
                No data available for the selected period
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

