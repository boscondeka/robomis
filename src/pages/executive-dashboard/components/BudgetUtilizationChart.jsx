import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const BudgetUtilizationChart = () => {
  const data = [
    { name: 'Personnel', value: 45, amount: 450000, color: '#2563EB' },
    { name: 'Operations', value: 25, amount: 250000, color: '#10B981' },
    { name: 'Technology', value: 15, amount: 150000, color: '#F59E0B' },
    { name: 'Marketing', value: 10, amount: 100000, color: '#EF4444' },
    { name: 'Other', value: 5, amount: 50000, color: '#64748B' }
  ];

  const totalBudget = data?.reduce((sum, item) => sum + item?.amount, 0);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0]?.payload;
      return (
        <div className="bg-popover border border-border rounded-lg shadow-elevated p-3">
          <p className="text-sm font-medium text-foreground">{data?.name}</p>
          <p className="text-sm text-muted-foreground">
            ${data?.amount?.toLocaleString()} ({data?.value}%)
          </p>
        </div>
      );
    }
    return null;
  };

  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

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
        {`${(percent * 100)?.toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-subtle">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Budget Utilization</h2>
          <div className="flex items-center space-x-4">
            <select className="text-sm border border-border rounded px-3 py-1 bg-background text-foreground">
              <option>Q4 2024</option>
              <option>Q3 2024</option>
              <option>Q2 2024</option>
            </select>
            <button className="text-sm text-primary hover:text-primary/80 transition-smooth">
              Details
            </button>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pie Chart */}
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomLabel}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry?.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          {/* Legend and Details */}
          <div className="space-y-4">
            <div className="text-center mb-4">
              <p className="text-2xl font-bold text-foreground">
                ${totalBudget?.toLocaleString()}
              </p>
              <p className="text-sm text-muted-foreground">Total Budget Allocated</p>
            </div>
            
            <div className="space-y-3">
              {data?.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: item?.color }}
                    />
                    <span className="text-sm font-medium text-foreground">
                      {item?.name}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-foreground">
                      ${item?.amount?.toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {item?.value}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="pt-4 border-t border-border">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Budget Utilization</span>
                <span className="font-semibold text-success">92%</span>
              </div>
              <div className="w-full bg-muted/30 rounded-full h-2 mt-2">
                <div 
                  className="bg-success h-2 rounded-full transition-all duration-300"
                  style={{ width: '92%' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetUtilizationChart;