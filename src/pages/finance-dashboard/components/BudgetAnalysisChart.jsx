import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const BudgetAnalysisChart = () => {
  const budgetData = [
    {
      department: "Operations",
      budgeted: 450000,
      actual: 423000,
      variance: -27000
    },
    {
      department: "Marketing",
      budgeted: 280000,
      actual: 312000,
      variance: 32000
    },
    {
      department: "HR",
      budgeted: 180000,
      actual: 165000,
      variance: -15000
    },
    {
      department: "IT",
      budgeted: 320000,
      actual: 298000,
      variance: -22000
    },
    {
      department: "Finance",
      budgeted: 150000,
      actual: 142000,
      variance: -8000
    },
    {
      department: "Sales",
      budgeted: 380000,
      actual: 415000,
      variance: 35000
    }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0]?.payload;
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-elevated">
          <p className="font-medium text-foreground mb-2">{label}</p>
          <div className="space-y-1 text-sm">
            <p className="text-primary">
              Budgeted: ${data?.budgeted?.toLocaleString()}
            </p>
            <p className="text-secondary">
              Actual: ${data?.actual?.toLocaleString()}
            </p>
            <p className={data?.variance >= 0 ? "text-success" : "text-error"}>
              Variance: {data?.variance >= 0 ? '+' : ''}${data?.variance?.toLocaleString()}
            </p>
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
          Budget vs Actual Analysis
        </h3>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-primary rounded"></div>
            <span className="text-muted-foreground">Budgeted</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-secondary rounded"></div>
            <span className="text-muted-foreground">Actual</span>
          </div>
        </div>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={budgetData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="department" 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <YAxis 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
              tickFormatter={(value) => `$${(value / 1000)?.toFixed(0)}K`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar 
              dataKey="budgeted" 
              fill="var(--color-primary)" 
              name="Budgeted"
              radius={[2, 2, 0, 0]}
            />
            <Bar 
              dataKey="actual" 
              fill="var(--color-secondary)" 
              name="Actual"
              radius={[2, 2, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BudgetAnalysisChart;