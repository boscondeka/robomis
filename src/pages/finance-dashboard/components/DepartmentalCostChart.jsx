import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const DepartmentalCostChart = () => {
  const costData = [
    {
      department: "Operations",
      cost: 423000,
      percentage: 28.5,
      color: "#2563EB"
    },
    {
      department: "Sales",
      cost: 415000,
      percentage: 27.9,
      color: "#10B981"
    },
    {
      department: "Marketing",
      cost: 312000,
      percentage: 21.0,
      color: "#F59E0B"
    },
    {
      department: "IT",
      cost: 298000,
      percentage: 20.1,
      color: "#EF4444"
    },
    {
      department: "HR",
      cost: 165000,
      percentage: 11.1,
      color: "#8B5CF6"
    },
    {
      department: "Finance",
      cost: 142000,
      percentage: 9.6,
      color: "#64748B"
    }
  ];

  const totalCost = costData?.reduce((sum, item) => sum + item?.cost, 0);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0]?.payload;
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-elevated">
          <p className="font-medium text-foreground mb-1">{data?.department}</p>
          <p className="text-sm text-muted-foreground">
            Cost: ${data?.cost?.toLocaleString()}
          </p>
          <p className="text-sm text-muted-foreground">
            Percentage: {data?.percentage}%
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percentage }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    if (percentage < 5) return null;

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize={12}
        fontWeight="bold"
      >
        {`${percentage}%`}
      </text>
    );
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">
          Departmental Cost Distribution
        </h3>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Total Cost</p>
          <p className="text-xl font-bold text-foreground">
            ${totalCost?.toLocaleString()}
          </p>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row items-center space-y-6 lg:space-y-0 lg:space-x-6">
        {/* Pie Chart */}
        <div className="w-full lg:w-1/2 h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={costData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={CustomLabel}
                outerRadius={120}
                fill="#8884d8"
                dataKey="cost"
              >
                {costData?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry?.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="w-full lg:w-1/2 space-y-3">
          {costData?.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <div 
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: item?.color }}
                ></div>
                <span className="font-medium text-foreground">{item?.department}</span>
              </div>
              <div className="text-right">
                <p className="font-semibold text-foreground">
                  ${item?.cost?.toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground">
                  {item?.percentage}%
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DepartmentalCostChart;