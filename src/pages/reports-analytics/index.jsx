import React, { useState, useEffect } from 'react';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import NavigationBreadcrumbs from '../../components/ui/NavigationBreadcrumbs';
import ReportCard from './components/ReportCard';
import MetricWidget from './components/MetricWidget';
import ReportBuilder from './components/ReportBuilder';
import ScheduledReports from './components/ScheduledReports';
import DataVisualization from './components/DataVisualization';
import FilterPanel from './components/FilterPanel';

const ReportsAnalytics = () => {
  const [activeTab, setActiveTab] = useState('reports');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isReportBuilderOpen, setIsReportBuilderOpen] = useState(false);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [currentFilters, setCurrentFilters] = useState({});

  // Mock data for reports
  const reports = [
    {
      id: 1,
      name: "Monthly Financial Summary",
      category: "financial",
      description: "Comprehensive overview of monthly revenue, expenses, and profit margins with year-over-year comparisons.",
      status: "ready",
      lastGenerated: "Dec 20, 2024",
      frequency: "Monthly"
    },
    {
      id: 2,
      name: "Employee Performance Report",
      category: "hr",
      description: "Detailed analysis of employee productivity, attendance rates, and performance metrics across departments.",
      status: "generating",
      lastGenerated: "Dec 18, 2024",
      frequency: "Quarterly"
    },
    {
      id: 3,
      name: "Project Status Dashboard",
      category: "project",
      description: "Real-time tracking of active projects, completion rates, and resource allocation efficiency.",
      status: "ready",
      lastGenerated: "Dec 22, 2024",
      frequency: "Weekly"
    },
    {
      id: 4,
      name: "Operational Efficiency Analysis",
      category: "operational",
      description: "Key performance indicators for operational processes, bottlenecks, and improvement opportunities.",
      status: "scheduled",
      lastGenerated: "Dec 15, 2024",
      frequency: "Monthly"
    },
    {
      id: 5,
      name: "Client Satisfaction Survey",
      category: "operational",
      description: "Customer feedback analysis, satisfaction scores, and service quality metrics.",
      status: "ready",
      lastGenerated: "Dec 19, 2024",
      frequency: "Quarterly"
    },
    {
      id: 6,
      name: "Budget vs Actual Analysis",
      category: "financial",
      description: "Variance analysis between budgeted and actual expenses across all departments and projects.",
      status: "ready",
      lastGenerated: "Dec 21, 2024",
      frequency: "Monthly"
    }
  ];

  // Mock data for metrics
  const metrics = [
    {
      title: "Total Revenue",
      value: "$2.4M",
      trend: 12.5,
      period: "Month",
      icon: "DollarSign",
      iconColor: "var(--color-success)",
      iconBg: "bg-success/10",
      subtitle: "vs last month"
    },
    {
      title: "Active Projects",
      value: "24",
      trend: -5.2,
      period: "Month",
      icon: "FolderKanban",
      iconColor: "var(--color-primary)",
      iconBg: "bg-primary/10",
      subtitle: "projects in progress"
    },
    {
      title: "Employee Satisfaction",
      value: "87%",
      trend: 3.1,
      period: "Quarter",
      icon: "Users",
      iconColor: "var(--color-accent)",
      iconBg: "bg-accent/10",
      subtitle: "satisfaction rate"
    },
    {
      title: "Report Generation",
      value: "156",
      trend: 8.7,
      period: "Month",
      icon: "FileText",
      iconColor: "var(--color-secondary)",
      iconBg: "bg-secondary/10",
      subtitle: "reports generated"
    }
  ];

  // Mock data for scheduled reports
  const scheduledReports = [
    {
      id: 1,
      name: "Weekly Executive Summary",
      frequency: "weekly",
      nextRun: "2024-12-30T09:00:00",
      isActive: true,
      recipients: ["ceo@robomis.com", "cfo@robomis.com", "coo@robomis.com"],
      format: "pdf",
      lastGenerated: "Dec 23, 2024",
      successRate: 98
    },
    {
      id: 2,
      name: "Monthly HR Analytics",
      frequency: "monthly",
      nextRun: "2025-01-01T08:00:00",
      isActive: true,
      recipients: ["hr@robomis.com", "manager@robomis.com"],
      format: "excel",
      lastGenerated: "Dec 1, 2024",
      successRate: 95
    },
    {
      id: 3,
      name: "Quarterly Financial Report",
      frequency: "quarterly",
      nextRun: "2025-01-01T10:00:00",
      isActive: false,
      recipients: ["finance@robomis.com", "auditor@robomis.com"],
      format: "pdf",
      lastGenerated: "Oct 1, 2024",
      successRate: 100
    }
  ];

  // Mock data for charts
  const revenueData = [
    { name: 'Jan', value: 180000 },
    { name: 'Feb', value: 220000 },
    { name: 'Mar', value: 195000 },
    { name: 'Apr', value: 240000 },
    { name: 'May', value: 210000 },
    { name: 'Jun', value: 280000 }
  ];

  const projectData = [
    { name: 'Completed', value: 45 },
    { name: 'In Progress', value: 24 },
    { name: 'On Hold', value: 8 },
    { name: 'Cancelled', value: 3 }
  ];

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'financial', label: 'Financial' },
    { value: 'hr', label: 'HR' },
    { value: 'project', label: 'Project' },
    { value: 'operational', label: 'Operational' }
  ];

  const tabs = [
    { id: 'reports', label: 'Report Library', icon: 'FileText' },
    { id: 'analytics', label: 'Analytics Dashboard', icon: 'BarChart3' },
    { id: 'scheduled', label: 'Scheduled Reports', icon: 'Calendar' },
    { id: 'builder', label: 'Report Builder', icon: 'Settings' }
  ];

  const filteredReports = reports?.filter(report => {
    const matchesSearch = report?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         report?.description?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || report?.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleGenerateReport = (reportId) => {
    console.log('Generating report:', reportId);
    // In real app, trigger report generation
  };

  const handleScheduleReport = (reportId) => {
    console.log('Scheduling report:', reportId);
    // In real app, open scheduling modal
  };

  const handleViewReport = (reportId) => {
    console.log('Viewing report:', reportId);
    // In real app, open report viewer
  };

  const handleSaveCustomReport = (reportConfig) => {
    console.log('Saving custom report:', reportConfig);
    // In real app, save to backend
  };

  const handleEditScheduledReport = (reportId) => {
    console.log('Editing scheduled report:', reportId);
    // In real app, open edit modal
  };

  const handleDeleteScheduledReport = (reportId) => {
    console.log('Deleting scheduled report:', reportId);
    // In real app, confirm and delete
  };

  const handleToggleScheduledReport = (reportId) => {
    console.log('Toggling scheduled report:', reportId);
    // In real app, toggle active status
  };

  const handleApplyFilters = (filters) => {
    setCurrentFilters(filters);
    console.log('Applying filters:', filters);
    // In real app, apply filters to data
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'reports':
        return (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search reports..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e?.target?.value)}
                  className="w-full"
                />
              </div>
              <Select
                options={categories}
                value={selectedCategory}
                onChange={setSelectedCategory}
                className="w-full sm:w-48"
              />
              <Button
                variant="outline"
                iconName="Filter"
                onClick={() => setIsFilterPanelOpen(true)}
              >
                Filters
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredReports?.map(report => (
                <ReportCard
                  key={report?.id}
                  report={report}
                  onGenerate={handleGenerateReport}
                  onSchedule={handleScheduleReport}
                  onView={handleViewReport}
                />
              ))}
            </div>
            {filteredReports?.length === 0 && (
              <div className="text-center py-12">
                <Icon name="FileX" size={48} className="mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No reports found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search criteria or create a new custom report.
                </p>
                <Button
                  variant="default"
                  iconName="Plus"
                  iconPosition="left"
                  onClick={() => setIsReportBuilderOpen(true)}
                >
                  Create Custom Report
                </Button>
              </div>
            )}
          </div>
        );

      case 'analytics':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {metrics?.map((metric, index) => (
                <MetricWidget key={index} metric={metric} />
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <DataVisualization
                data={revenueData}
                title="Revenue Trend"
                type="line"
              />
              <DataVisualization
                data={projectData}
                title="Project Status Distribution"
                type="pie"
              />
            </div>
          </div>
        );

      case 'scheduled':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-foreground">Scheduled Reports</h2>
                <p className="text-muted-foreground">Manage automated report generation and delivery</p>
              </div>
              <Button
                variant="default"
                iconName="Plus"
                iconPosition="left"
                onClick={() => setIsReportBuilderOpen(true)}
              >
                Schedule New Report
              </Button>
            </div>

            <ScheduledReports
              reports={scheduledReports}
              onEdit={handleEditScheduledReport}
              onDelete={handleDeleteScheduledReport}
              onToggle={handleToggleScheduledReport}
            />
          </div>
        );

      case 'builder':
        return (
          <div className="space-y-6">
            <div className="text-center py-12">
              <Icon name="Settings" size={48} className="mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">Custom Report Builder</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Create custom reports with drag-and-drop field selection, advanced filtering, and automated scheduling.
              </p>
              <Button
                variant="default"
                iconName="Plus"
                iconPosition="left"
                onClick={() => setIsReportBuilderOpen(true)}
              >
                Create New Report
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-6">
        <NavigationBreadcrumbs />
        
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Reports & Analytics</h1>
            <p className="text-muted-foreground mt-2">
              Comprehensive business intelligence and automated reporting
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              iconName="Download"
              onClick={() => console.log('Export all reports')}
            >
              Export Data
            </Button>
            <Button
              variant="default"
              iconName="Plus"
              iconPosition="left"
              onClick={() => setIsReportBuilderOpen(true)}
            >
              Create Report
            </Button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-border mb-8">
          <nav className="flex space-x-8">
            {tabs?.map(tab => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`
                  flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-smooth
                  ${activeTab === tab?.id
                    ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                  }
                `}
              >
                <Icon name={tab?.icon} size={18} />
                <span>{tab?.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        {renderTabContent()}

        {/* Report Builder Modal */}
        <ReportBuilder
          isOpen={isReportBuilderOpen}
          onClose={() => setIsReportBuilderOpen(false)}
          onSave={handleSaveCustomReport}
        />

        {/* Filter Panel */}
        <FilterPanel
          isOpen={isFilterPanelOpen}
          onClose={() => setIsFilterPanelOpen(false)}
          onApplyFilters={handleApplyFilters}
          currentFilters={currentFilters}
        />
      </div>
    </div>
  );
};

export default ReportsAnalytics;