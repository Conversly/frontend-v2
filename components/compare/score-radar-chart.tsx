'use client';

import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  Legend, ResponsiveContainer, Tooltip,
} from 'recharts';

const DIMENSION_LABELS: Record<string, string> = {
  aiCapabilities: 'AI Capabilities',
  channelSupport: 'Channels',
  leadGeneration: 'Lead Gen',
  humanEscalation: 'Escalation',
  analytics: 'Analytics',
  customization: 'Customization',
  deployment: 'Deployment',
  pricing: 'Pricing',
  performance: 'Performance',
  security: 'Security',
};

interface ScoreRadarChartProps {
  scores: Record<string, { verly: number; competitor: number }>;
  competitorName: string;
}

export default function ScoreRadarChart({ scores, competitorName }: ScoreRadarChartProps) {
  const data = Object.entries(scores).map(([key, val]) => ({
    dimension: DIMENSION_LABELS[key] || key,
    Verly: val.verly,
    [competitorName]: val.competitor,
  }));

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
          <PolarGrid stroke="var(--color-border)" opacity={0.4} />
          <PolarAngleAxis
            dataKey="dimension"
            tick={{ fontSize: 11, fill: 'var(--color-muted-foreground)' }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 10]}
            tick={{ fontSize: 10, fill: 'var(--color-muted-foreground)' }}
            axisLine={false}
          />
          <Radar
            name="Verly"
            dataKey="Verly"
            stroke="var(--color-primary)"
            fill="var(--color-primary)"
            fillOpacity={0.2}
            strokeWidth={2}
          />
          <Radar
            name={competitorName}
            dataKey={competitorName}
            stroke="var(--color-muted-foreground)"
            fill="var(--color-muted-foreground)"
            fillOpacity={0.1}
            strokeWidth={2}
            strokeDasharray="4 4"
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'var(--color-card)',
              border: '1px solid var(--color-border)',
              borderRadius: '12px',
              fontSize: '12px',
            }}
          />
          <Legend
            wrapperStyle={{ fontSize: '12px' }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
