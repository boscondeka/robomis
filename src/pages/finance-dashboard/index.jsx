import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import NavigationBreadcrumbs from '../../components/ui/NavigationBreadcrumbs';
import FinancialSummaryCards from './components/FinancialSummaryCards';
import BudgetAnalysisChart from './components/BudgetAnalysisChart';
import RevenueProjectionChart from './components/RevenueProjectionChart';
import TransactionPanel from './components/TransactionPanel';
import QuickActions from './components/QuickActions';
import DepartmentalCostChart from './components/DepartmentalCostChart';
import FinancialFilters from './components/FinancialFilters';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const FinanceDashboard = () => {
  const [filters, setFilters] = useState({});
  const [refreshing, setRefreshing] = useState(false);

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    console.log('Filters updated:', newFilters);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setRefreshing(false);
  };

  const handleExportData = () => {
    console.log('Exporting financial data...');
    // Implement export functionality
  };

  const handleQuickBooksSync = () => {
    console.log('Syncing with QuickBooks...');
    // Implement QuickBooks synchronization
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Finance Dashboard - ROBO MIS</title>
        <meta name="description" content="Comprehensive financial oversight including budgeting, accounts management, and financial reporting for finance officers." />
      </Helmet>
      <Header />
      <main className="container mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <NavigationBreadcrumbs />
            <h1 className="text-3xl font-bold text-foreground mb-2">Finance Dashboard</h1>
            <p className="text-muted-foreground">
              Comprehensive financial oversight and management tools for informed decision-making.
            </p>
          </div>
          
          <div className="flex items-center space-x-3 mt-4 lg:mt-0">
            <Button
              variant="outline"
              onClick={handleRefresh}
              loading={refreshing}
              iconName="RefreshCw"
              iconPosition="left"
            >
              {refreshing ? 'Syncing...' : 'Refresh Data'}
            </Button>
            
            <Button
              variant="outline"
              onClick={handleQuickBooksSync}
              iconName="Database"
              iconPosition="left"
            >
              QuickBooks Sync
            </Button>
            
            <Button
              variant="default"
              onClick={handleExportData}
              iconName="Download"
              iconPosition="left"
            >
              Export Report
            </Button>
          </div>
        </div>

        {/* Financial Filters */}
        <FinancialFilters onFiltersChange={handleFiltersChange} />

        {/* Financial Summary Cards */}
        <FinancialSummaryCards />

        {/* Charts Section */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
          <BudgetAnalysisChart />
          <RevenueProjectionChart />
        </div>

        {/* Departmental Cost Analysis */}
        <div className="mb-8">
          <DepartmentalCostChart />
        </div>

        {/* Transaction Panel and Quick Actions */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2">
            <TransactionPanel />
          </div>
          <div>
            <QuickActions />
          </div>
        </div>

        {/* Additional Financial Insights */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Icon name="TrendingUp" size={24} color="var(--color-primary)" />
              </div>
              <span className="text-sm text-success font-medium">+8.2%</span>
            </div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Profit Margin</h3>
            <p className="text-2xl font-bold text-foreground">23.4%</p>
            <p className="text-xs text-muted-foreground mt-1">vs last quarter</p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-warning/10 rounded-lg">
                <Icon name="Clock" size={24} color="var(--color-warning)" />
              </div>
              <span className="text-sm text-warning font-medium">32 days</span>
            </div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Avg Collection Period</h3>
            <p className="text-2xl font-bold text-foreground">28 days</p>
            <p className="text-xs text-muted-foreground mt-1">industry avg: 35 days</p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-success/10 rounded-lg">
                <Icon name="DollarSign" size={24} color="var(--color-success)" />
              </div>
              <span className="text-sm text-success font-medium">+12.5%</span>
            </div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Working Capital</h3>
            <p className="text-2xl font-bold text-foreground">$1.2M</p>
            <p className="text-xs text-muted-foreground mt-1">healthy liquidity</p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-secondary/10 rounded-lg">
                <Icon name="Target" size={24} color="var(--color-secondary)" />
              </div>
              <span className="text-sm text-secondary font-medium">On track</span>
            </div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Annual Target</h3>
            <p className="text-2xl font-bold text-foreground">78%</p>
            <p className="text-xs text-muted-foreground mt-1">achieved so far</p>
          </div>
        </div>
      </main>
      {/* Footer */}
      <footer className="bg-card border-t border-border mt-12">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Bot" size={20} color="white" />
              </div>
              <div>
                <span className="text-lg font-bold text-foreground">ROBO MIS</span>
                <p className="text-xs text-muted-foreground">Finance Management System</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <span>Last updated: {new Date()?.toLocaleString()}</span>
              <span>•</span>
              <span>© {new Date()?.getFullYear()} ROBO MIS. All rights reserved.</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FinanceDashboard;