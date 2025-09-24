import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const DataVisualization = ({ data, title, type = 'bar' }) => {
  const [chartType, setChartType] = useState(type);
  const [timeRange, setTimeRange] = useState('6months');

  const chartTypes = [
    { value: 'bar', label: 'Bar Chart', icon: 'BarChart3' },
    { value: 'line', label: 'Line Chart', icon: 'TrendingUp' },
    { value: 'pie', label: 'Pie Chart', icon: 'PieChart' }
  ];

  const timeRanges = [
    { value: '1month', label: 'Last Month' },
    { value: '3months', label: 'Last 3 Months' },
    { value: '6months', label: 'Last 6 Months' },
    { value: '1year', label: 'Last Year' }
  ];

  const colors = ['#2563EB', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'];

  const renderChart = () => {
    switch (chartType) {
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="name" 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'var(--color-popover)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="var(--color-primary)" 
                strokeWidth={2}
                dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        );
      
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100)?.toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors?.[index % colors?.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'var(--color-popover)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        );
      
      default:
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="name" 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'var(--color-popover)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px'
                }}
              />
              <Bar 
                dataKey="value" 
                fill="var(--color-primary)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        );
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        
        <div className="flex items-center space-x-3">
          <Select
            options={timeRanges}
            value={timeRange}
            onChange={setTimeRange}
            className="w-40"
          />
          
          <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
            {chartTypes?.map(type => (
              <Button
                key={type?.value}
                variant={chartType === type?.value ? "default" : "ghost"}
                size="sm"
                iconName={type?.icon}
                onClick={() => setChartType(type?.value)}
                className="h-8 w-8"
              />
            ))}
          </div>
          
          <Button
            variant="outline"
            size="sm"
            iconName="Download"
            onClick={() => console.log('Export chart')}
          >
            Export
          </Button>
        </div>
      </div>
      <div className="w-full" aria-label={`${title} ${chartType} chart`}>
        {renderChart()}
      </div>
      {chartType === 'pie' && (
        <div className="mt-4 flex flex-wrap gap-4">
          {data?.map((item, index) => (
            <div key={item?.name} className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: colors?.[index % colors?.length] }}
              />
              <span className="text-sm text-muted-foreground">{item?.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DataVisualization;