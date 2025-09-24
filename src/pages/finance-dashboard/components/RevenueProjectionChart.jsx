import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const RevenueProjectionChart = () => {
  const revenueData = [
    {
      month: "Jan",
      actual: 2800000,
      projected: 2750000,
      target: 3000000
    },
    {
      month: "Feb",
      actual: 3200000,
      projected: 3100000,
      target: 3200000
    },
    {
      month: "Mar",
      actual: 2900000,
      projected: 3000000,
      target: 3100000
    },
    {
      month: "Apr",
      actual: 3400000,
      projected: 3300000,
      target: 3300000
    },
    {
      month: "May",
      actual: 3600000,
      projected: 3500000,
      target: 3400000
    },
    {
      month: "Jun",
      actual: 3300000,
      projected: 3400000,
      target: 3500000
    },
    {
      month: "Jul",
      actual: null,
      projected: 3600000,
      target: 3600000
    },
    {
      month: "Aug",
      actual: null,
      projected: 3700000,
      target: 3700000
    },
    {
      month: "Sep",
      actual: null,
      projected: 3800000,
      target: 3800000
    },
    {
      month: "Oct",
      actual: null,
      projected: 3900000,
      target: 3900000
    },
    {
      month: "Nov",
      actual: null,
      projected: 4000000,
      target: 4000000
    },
    {
      month: "Dec",
      actual: null,
      projected: 4200000,
      target: 4100000
    }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-elevated">
          <p className="font-medium text-foreground mb-2">{label} 2024</p>
          <div className="space-y-1 text-sm">
            {payload?.map((entry, index) => (
              <p key={index} style={{ color: entry?.color }}>
                {entry?.name}: ${entry?.value ? entry?.value?.toLocaleString() : 'N/A'}
              </p>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">
          Revenue Projection Analysis
        </h3>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-success rounded"></div>
            <span className="text-muted-foreground">Actual</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-primary rounded"></div>
            <span className="text-muted-foreground">Projected</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-warning rounded"></div>
            <span className="text-muted-foreground">Target</span>
          </div>
        </div>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={revenueData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="month" 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <YAxis 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
              tickFormatter={(value) => `$${(value / 1000000)?.toFixed(1)}M`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="actual" 
              stroke="var(--color-success)" 
              strokeWidth={3}
              name="Actual Revenue"
              dot={{ fill: 'var(--color-success)', strokeWidth: 2, r: 4 }}
              connectNulls={false}
            />
            <Line 
              type="monotone" 
              dataKey="projected" 
              stroke="var(--color-primary)" 
              strokeWidth={2}
              strokeDasharray="5 5"
              name="Projected Revenue"
              dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 3 }}
            />
            <Line 
              type="monotone" 
              dataKey="target" 
              stroke="var(--color-warning)" 
              strokeWidth={2}
              name="Target Revenue"
              dot={{ fill: 'var(--color-warning)', strokeWidth: 2, r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueProjectionChart;