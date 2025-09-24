import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Select from '../../components/ui/Select';

// Import all dashboard components
import MetricCard from './components/MetricCard';
import ActivityFeed from './components/ActivityFeed';
import PendingApprovals from './components/PendingApprovals';
import ProjectTimelineChart from './components/ProjectTimelineChart';
import BudgetUtilizationChart from './components/BudgetUtilizationChart';
import DepartmentPerformance from './components/DepartmentPerformance';
import CriticalAlerts from './components/CriticalAlerts';

const ExecutiveDashboard = () => {
  const navigate = useNavigate();
  const [dateRange, setDateRange] = useState('30');
  const [refreshing, setRefreshing] = useState(false);

  // Mock KPI data
  const kpiMetrics = [
    {
      title: 'Active Projects',
      value: '32',
      change: '+12%',
      changeType: 'positive',
      icon: 'FolderKanban',
      description: 'Currently in progress',
      trend: [45, 52, 48, 61, 55, 67, 69, 72]
    },
    {
      title: 'Revenue Pipeline',
      value: '$2.4M',
      change: '+8.5%',
      changeType: 'positive',
      icon: 'TrendingUp',
      description: 'Projected Q4 revenue',
      trend: [30, 35, 42, 48, 52, 58, 65, 70]
    },
    {
      title: 'Employee Headcount',
      value: '147',
      change: '+3',
      changeType: 'positive',
      icon: 'Users',
      description: 'Total active employees',
      trend: [40, 42, 45, 43, 46, 48, 47, 49]
    },
    {
      title: 'Budget Utilization',
      value: '92%',
      change: '+5%',
      changeType: 'positive',
      icon: 'Calculator',
      description: 'Q4 budget consumed',
      trend: [60, 65, 70, 75, 80, 85, 88, 92]
    },
    {
      title: 'Client Satisfaction',
      value: '4.8/5',
      change: '+0.2',
      changeType: 'positive',
      icon: 'Star',
      description: 'Average rating',
      trend: [85, 87, 86, 89, 91, 88, 92, 96]
    },
    {
      title: 'System Uptime',
      value: '99.9%',
      change: '0%',
      changeType: 'neutral',
      icon: 'Server',
      description: 'Last 30 days',
      trend: [98, 99, 100, 99, 100, 99, 100, 100]
    }
  ];

  const dateRangeOptions = [
    { value: '7', label: 'Last 7 days' },
    { value: '30', label: 'Last 30 days' },
    { value: '90', label: 'Last 90 days' },
    { value: '365', label: 'Last year' }
  ];

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  const handleExportReport = () => {
    console.log('Exporting executive report...');
  };

  const handleQuickNavigation = (route) => {
    navigate(route);
  };

  useEffect(() => {
    // Simulate real-time data updates
    const interval = setInterval(() => {
      // In a real app, this would fetch fresh data
      console.log('Refreshing dashboard data...');
    }, 30000); // Refresh every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <div className="bg-card border-b border-border">
        <div className="px-6 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Executive Dashboard</h1>
              <p className="text-muted-foreground">
                Comprehensive operational oversight and strategic insights for {new Date()?.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
              <Select
                options={dateRangeOptions}
                value={dateRange}
                onChange={setDateRange}
                placeholder="Select date range"
                className="w-full sm:w-auto"
              />
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  iconName="RefreshCw"
                  iconPosition="left"
                  loading={refreshing}
                  onClick={handleRefresh}
                >
                  Refresh
                </Button>
                
                <Button
                  variant="default"
                  iconName="Download"
                  iconPosition="left"
                  onClick={handleExportReport}
                >
                  Export Report
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="px-6 py-8">
        {/* KPI Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
          {kpiMetrics?.map((metric, index) => (
            <MetricCard
              key={index}
              title={metric?.title}
              value={metric?.value}
              change={metric?.change}
              changeType={metric?.changeType}
              icon={metric?.icon}
              description={metric?.description}
              trend={metric?.trend}
            />
          ))}
        </div>

        {/* Quick Navigation */}
        <div className="bg-card border border-border rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-4">Quick Navigation</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { label: 'Projects', route: '/project-management', icon: 'FolderKanban', color: 'text-primary' },
              { label: 'HR', route: '/hr-management', icon: 'Users', color: 'text-success' },
              { label: 'Finance', route: '/finance-dashboard', icon: 'Calculator', color: 'text-accent' },
              { label: 'Reports', route: '/reports-analytics', icon: 'BarChart3', color: 'text-warning' },
              { label: 'Clients', route: '/client-portal', icon: 'Globe', color: 'text-secondary' },
              { label: 'Settings', route: '/settings', icon: 'Settings', color: 'text-muted-foreground' }
            ]?.map((item, index) => (
              <button
                key={index}
                onClick={() => handleQuickNavigation(item?.route)}
                className="flex flex-col items-center p-4 rounded-lg border border-border hover:shadow-subtle transition-complex group"
              >
                <Icon 
                  name={item?.icon} 
                  size={24} 
                  className={`${item?.color} group-hover:scale-110 transition-transform mb-2`}
                />
                <span className="text-sm font-medium text-foreground">{item?.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
          <ProjectTimelineChart />
          <BudgetUtilizationChart />
        </div>

        {/* Department Performance */}
        <div className="mb-8">
          <DepartmentPerformance />
        </div>

        {/* Bottom Section - Activity & Alerts */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-1">
            <ActivityFeed />
          </div>
          
          <div className="xl:col-span-1">
            <PendingApprovals />
          </div>
          
          <div className="xl:col-span-1">
            <CriticalAlerts />
          </div>
        </div>
      </div>
      {/* Footer */}
      <footer className="bg-card border-t border-border mt-12">
        <div className="px-6 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              © {new Date()?.getFullYear()} ROBO MIS. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span>Last updated: {new Date()?.toLocaleTimeString()}</span>
              <span>•</span>
              <span>System Status: Online</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ExecutiveDashboard;