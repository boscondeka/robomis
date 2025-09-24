import React from 'react';
import Icon from '../../../components/AppIcon';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

const HRMetricsPanel = ({ metricsData }) => {
  const COLORS = ['#2563EB', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'];

  const headcountData = [
    { month: 'Jan', employees: 145 },
    { month: 'Feb', employees: 152 },
    { month: 'Mar', employees: 148 },
    { month: 'Apr', employees: 156 },
    { month: 'May', employees: 163 },
    { month: 'Jun', employees: 159 },
    { month: 'Jul', employees: 167 },
    { month: 'Aug', employees: 172 },
    { month: 'Sep', employees: 168 }
  ];

  const departmentData = [
    { name: 'Engineering', value: 45, color: '#2563EB' },
    { name: 'Sales', value: 32, color: '#10B981' },
    { name: 'Marketing', value: 28, color: '#F59E0B' },
    { name: 'Operations', value: 25, color: '#EF4444' },
    { name: 'HR', value: 18, color: '#8B5CF6' },
    { name: 'Finance', value: 20, color: '#06B6D4' }
  ];

  const turnoverData = [
    { month: 'Jan', rate: 2.1 },
    { month: 'Feb', rate: 1.8 },
    { month: 'Mar', rate: 2.5 },
    { month: 'Apr', rate: 1.9 },
    { month: 'May', rate: 2.3 },
    { month: 'Jun', rate: 1.7 },
    { month: 'Jul', rate: 2.0 },
    { month: 'Aug', rate: 1.6 },
    { month: 'Sep', rate: 1.9 }
  ];

  const pendingActions = [
    { type: 'Leave Requests', count: 12, icon: 'Calendar', color: 'text-blue-600' },
    { type: 'Performance Reviews', count: 8, icon: 'FileText', color: 'text-green-600' },
    { type: 'Recruitment', count: 15, icon: 'Users', color: 'text-purple-600' },
    { type: 'Onboarding', count: 5, icon: 'UserPlus', color: 'text-orange-600' },
    { type: 'Policy Updates', count: 3, icon: 'AlertCircle', color: 'text-red-600' },
    { type: 'Training', count: 7, icon: 'BookOpen', color: 'text-indigo-600' }
  ];

  const keyMetrics = [
    {
      title: 'Total Employees',
      value: '168',
      change: '+5.2%',
      trend: 'up',
      icon: 'Users',
      color: 'text-blue-600'
    },
    {
      title: 'Turnover Rate',
      value: '1.9%',
      change: '-0.3%',
      trend: 'down',
      icon: 'TrendingDown',
      color: 'text-green-600'
    },
    {
      title: 'Avg. Performance',
      value: '4.2/5',
      change: '+0.1',
      trend: 'up',
      icon: 'Star',
      color: 'text-yellow-600'
    },
    {
      title: 'Open Positions',
      value: '23',
      change: '+8',
      trend: 'up',
      icon: 'Briefcase',
      color: 'text-purple-600'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {keyMetrics?.map((metric, index) => (
          <div key={index} className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-lg bg-muted ${metric?.color}`}>
                <Icon name={metric?.icon} size={20} />
              </div>
              <div className={`flex items-center gap-1 text-sm ${
                metric?.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                <Icon name={metric?.trend === 'up' ? 'TrendingUp' : 'TrendingDown'} size={14} />
                {metric?.change}
              </div>
            </div>
            <div className="text-2xl font-bold text-foreground mb-1">{metric?.value}</div>
            <div className="text-sm text-muted-foreground">{metric?.title}</div>
          </div>
        ))}
      </div>
      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Headcount Trend */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Headcount Trend</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={headcountData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="month" stroke="#64748B" fontSize={12} />
                <YAxis stroke="#64748B" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#FFFFFF', 
                    border: '1px solid #E2E8F0',
                    borderRadius: '8px'
                  }} 
                />
                <Bar dataKey="employees" fill="#2563EB" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Department Distribution */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Department Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={departmentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {departmentData?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry?.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {departmentData?.map((dept, index) => (
              <div key={index} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: dept?.color }}
                ></div>
                <span className="text-sm text-foreground">{dept?.name}</span>
                <span className="text-sm text-muted-foreground ml-auto">{dept?.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Turnover Rate Chart */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Turnover Rate Trend</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={turnoverData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="month" stroke="#64748B" fontSize={12} />
              <YAxis stroke="#64748B" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#FFFFFF', 
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px'
                }} 
              />
              <Line 
                type="monotone" 
                dataKey="rate" 
                stroke="#EF4444" 
                strokeWidth={3}
                dot={{ fill: '#EF4444', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Pending Actions */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Pending HR Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pendingActions?.map((action, index) => (
            <div key={index} className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg hover:bg-muted/70 transition-smooth cursor-pointer">
              <div className={`p-2 rounded-lg bg-background ${action?.color}`}>
                <Icon name={action?.icon} size={20} />
              </div>
              <div className="flex-1">
                <div className="font-medium text-foreground">{action?.type}</div>
                <div className="text-sm text-muted-foreground">{action?.count} pending</div>
              </div>
              <div className="text-2xl font-bold text-foreground">{action?.count}</div>
            </div>
          ))}
        </div>
      </div>
      {/* Recent Activity */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Recent HR Activity</h3>
        <div className="space-y-4">
          {[
            {
              action: 'New employee onboarded',
              employee: 'Sarah Johnson',
              department: 'Marketing',
              time: '2 hours ago',
              icon: 'UserPlus',
              color: 'text-green-600'
            },
            {
              action: 'Performance review completed',
              employee: 'Michael Chen',
              department: 'Engineering',
              time: '4 hours ago',
              icon: 'FileText',
              color: 'text-blue-600'
            },
            {
              action: 'Leave request approved',
              employee: 'Emily Davis',
              department: 'Sales',
              time: '6 hours ago',
              icon: 'Calendar',
              color: 'text-purple-600'
            },
            {
              action: 'Training session scheduled',
              employee: 'Team Development',
              department: 'All Departments',
              time: '1 day ago',
              icon: 'BookOpen',
              color: 'text-orange-600'
            }
          ]?.map((activity, index) => (
            <div key={index} className="flex items-center gap-3 p-3 hover:bg-muted/30 rounded-lg transition-smooth">
              <div className={`p-2 rounded-lg bg-muted ${activity?.color}`}>
                <Icon name={activity?.icon} size={16} />
              </div>
              <div className="flex-1">
                <div className="font-medium text-foreground">{activity?.action}</div>
                <div className="text-sm text-muted-foreground">
                  {activity?.employee} • {activity?.department}
                </div>
              </div>
              <div className="text-sm text-muted-foreground">{activity?.time}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HRMetricsPanel;