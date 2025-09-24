import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';

const DepartmentPerformance = () => {
  const data = [
    {
      department: 'Engineering',
      performance: 92,
      projects: 15,
      efficiency: 88,
      satisfaction: 94,
      icon: 'Code'
    },
    {
      department: 'Marketing',
      performance: 87,
      projects: 8,
      efficiency: 85,
      satisfaction: 89,
      icon: 'Megaphone'
    },
    {
      department: 'Sales',
      performance: 94,
      projects: 12,
      efficiency: 91,
      satisfaction: 96,
      icon: 'TrendingUp'
    },
    {
      department: 'HR',
      performance: 89,
      projects: 6,
      efficiency: 87,
      satisfaction: 92,
      icon: 'Users'
    },
    {
      department: 'Finance',
      performance: 91,
      projects: 4,
      efficiency: 93,
      satisfaction: 88,
      icon: 'Calculator'
    },
    {
      department: 'Operations',
      performance: 85,
      projects: 10,
      efficiency: 82,
      satisfaction: 87,
      icon: 'Settings'
    }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0]?.payload;
      return (
        <div className="bg-popover border border-border rounded-lg shadow-elevated p-4">
          <p className="text-sm font-medium text-foreground mb-2">{label}</p>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">
              Performance: <span className="font-medium text-foreground">{data?.performance}%</span>
            </p>
            <p className="text-sm text-muted-foreground">
              Active Projects: <span className="font-medium text-foreground">{data?.projects}</span>
            </p>
            <p className="text-sm text-muted-foreground">
              Efficiency: <span className="font-medium text-foreground">{data?.efficiency}%</span>
            </p>
            <p className="text-sm text-muted-foreground">
              Satisfaction: <span className="font-medium text-foreground">{data?.satisfaction}%</span>
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  const getPerformanceColor = (performance) => {
    if (performance >= 90) return 'text-success bg-success/10';
    if (performance >= 80) return 'text-warning bg-warning/10';
    return 'text-destructive bg-destructive/10';
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-subtle">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Department Performance</h2>
          <div className="flex items-center space-x-4">
            <select className="text-sm border border-border rounded px-3 py-1 bg-background text-foreground">
              <option>September 2024</option>
              <option>August 2024</option>
              <option>July 2024</option>
            </select>
            <button className="text-sm text-primary hover:text-primary/80 transition-smooth">
              View Report
            </button>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Performance Chart */}
          <div className="w-full h-80">
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
                  dataKey="department" 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                  domain={[0, 100]}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="performance" 
                  fill="var(--color-primary)" 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          {/* Department Cards */}
          <div className="space-y-4">
            {data?.map((dept, index) => (
              <div key={index} className="border border-border rounded-lg p-4 hover:shadow-subtle transition-complex">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon name={dept?.icon} size={20} color="var(--color-primary)" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">
                        {dept?.department}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {dept?.projects} active projects
                      </p>
                    </div>
                  </div>
                  
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${getPerformanceColor(dept?.performance)}`}>
                    {dept?.performance}%
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <p className="text-muted-foreground">Efficiency</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <div className="flex-1 bg-muted/30 rounded-full h-1.5">
                        <div 
                          className="bg-primary h-1.5 rounded-full transition-all duration-300"
                          style={{ width: `${dept?.efficiency}%` }}
                        />
                      </div>
                      <span className="text-foreground font-medium">{dept?.efficiency}%</span>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-muted-foreground">Satisfaction</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <div className="flex-1 bg-muted/30 rounded-full h-1.5">
                        <div 
                          className="bg-success h-1.5 rounded-full transition-all duration-300"
                          style={{ width: `${dept?.satisfaction}%` }}
                        />
                      </div>
                      <span className="text-foreground font-medium">{dept?.satisfaction}%</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentPerformance;