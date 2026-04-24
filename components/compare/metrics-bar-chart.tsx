'use client';

import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell, Legend,
} from 'recharts';

interface MetricsBarChartProps {
  metrics: { metric: string; competitor: number | null; verly: number; unit: string }[];
  competitorName: string;
}

export default function MetricsBarChart({ metrics, competitorName }: MetricsBarChartProps) {
  const data = metrics.map((m) => ({
    name: m.metric,
    Verly: m.verly,
    [competitorName]: m.competitor ?? 0,
    unit: m.unit,
    competitorNull: m.competitor === null,
  }));

  return (
    <div className="h-[280px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" opacity={0.3} horizontal={false} />
          <XAxis
            type="number"
            tick={{ fontSize: 11, fill: 'var(--color-muted-foreground)' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            type="category"
            dataKey="name"
            tick={{ fontSize: 12, fill: 'var(--color-foreground)' }}
            axisLine={false}
            tickLine={false}
            width={140}
          />
          <Tooltip
            formatter={(value, name, props: any) => {
              const v = Number(value ?? 0);
              if (name === competitorName && props?.payload?.competitorNull) {
                return ['Not published', name];
              }
              return [`${v}${props?.payload?.unit || ''}`, name ?? ''];
            }}
            contentStyle={{
              backgroundColor: 'var(--color-card)',
              border: '1px solid var(--color-border)',
              borderRadius: '12px',
              fontSize: '12px',
            }}
          />
          <Legend wrapperStyle={{ fontSize: '12px' }} />
          <Bar dataKey="Verly" fill="var(--color-primary)" radius={[0, 6, 6, 0]} barSize={16} />
          <Bar dataKey={competitorName} radius={[0, 6, 6, 0]} barSize={16}>
            {data.map((entry, i) => (
              <Cell
                key={i}
                fill={entry.competitorNull ? 'var(--color-muted)' : 'var(--color-muted-foreground)'}
                opacity={entry.competitorNull ? 0.3 : 0.6}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
