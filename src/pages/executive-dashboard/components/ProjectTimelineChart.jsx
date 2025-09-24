import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const ProjectTimelineChart = () => {
  const data = [
    {
      month: 'Jan',
      planned: 12,
      completed: 10,
      inProgress: 8,
      delayed: 2
    },
    {
      month: 'Feb',
      planned: 15,
      completed: 13,
      inProgress: 10,
      delayed: 3
    },
    {
      month: 'Mar',
      planned: 18,
      completed: 16,
      inProgress: 12,
      delayed: 2
    },
    {
      month: 'Apr',
      planned: 20,
      completed: 18,
      inProgress: 15,
      delayed: 4
    },
    {
      month: 'May',
      planned: 22,
      completed: 20,
      inProgress: 18,
      delayed: 3
    },
    {
      month: 'Jun',
      planned: 25,
      completed: 22,
      inProgress: 20,
      delayed: 5
    },
    {
      month: 'Jul',
      planned: 28,
      completed: 25,
      inProgress: 22,
      delayed: 4
    },
    {
      month: 'Aug',
      planned: 30,
      completed: 27,
      inProgress: 25,
      delayed: 6
    },
    {
      month: 'Sep',
      planned: 32,
      completed: 29,
      inProgress: 28,
      delayed: 5
    }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg shadow-elevated p-3">
          <p className="text-sm font-medium text-foreground mb-2">{`${label} 2024`}</p>
          {payload?.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry?.color }}>
              {`${entry?.dataKey?.charAt(0)?.toUpperCase() + entry?.dataKey?.slice(1)}: ${entry?.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-subtle">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Project Timeline Overview</h2>
          <div className="flex items-center space-x-4">
            <select className="text-sm border border-border rounded px-3 py-1 bg-background text-foreground">
              <option>2024</option>
              <option>2023</option>
            </select>
            <button className="text-sm text-primary hover:text-primary/80 transition-smooth">
              Export
            </button>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="w-full h-80" aria-label="Project Timeline Bar Chart">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
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
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar 
                dataKey="completed" 
                stackId="a" 
                fill="var(--color-success)" 
                name="Completed"
                radius={[0, 0, 0, 0]}
              />
              <Bar 
                dataKey="inProgress" 
                stackId="a" 
                fill="var(--color-primary)" 
                name="In Progress"
                radius={[0, 0, 0, 0]}
              />
              <Bar 
                dataKey="delayed" 
                stackId="a" 
                fill="var(--color-destructive)" 
                name="Delayed"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-3 bg-success/10 rounded-lg">
            <p className="text-2xl font-bold text-success">87%</p>
            <p className="text-sm text-muted-foreground">On-time Completion</p>
          </div>
          <div className="text-center p-3 bg-primary/10 rounded-lg">
            <p className="text-2xl font-bold text-primary">28</p>
            <p className="text-sm text-muted-foreground">Active Projects</p>
          </div>
          <div className="text-center p-3 bg-warning/10 rounded-lg">
            <p className="text-2xl font-bold text-warning">5</p>
            <p className="text-sm text-muted-foreground">At Risk</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectTimelineChart;