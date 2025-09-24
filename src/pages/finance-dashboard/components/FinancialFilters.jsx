import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const FinancialFilters = ({ onFiltersChange }) => {
  const [filters, setFilters] = useState({
    dateRange: 'this-month',
    department: '',
    transactionType: '',
    amountRange: { min: '', max: '' },
    status: ''
  });
  const [isExpanded, setIsExpanded] = useState(false);

  const dateRangeOptions = [
    { value: 'today', label: 'Today' },
    { value: 'this-week', label: 'This Week' },
    { value: 'this-month', label: 'This Month' },
    { value: 'last-month', label: 'Last Month' },
    { value: 'this-quarter', label: 'This Quarter' },
    { value: 'this-year', label: 'This Year' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const departmentOptions = [
    { value: '', label: 'All Departments' },
    { value: 'operations', label: 'Operations' },
    { value: 'sales', label: 'Sales' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'it', label: 'IT' },
    { value: 'hr', label: 'HR' },
    { value: 'finance', label: 'Finance' }
  ];

  const transactionTypeOptions = [
    { value: '', label: 'All Types' },
    { value: 'income', label: 'Income' },
    { value: 'expense', label: 'Expense' },
    { value: 'invoice', label: 'Invoice' },
    { value: 'payment', label: 'Payment' },
    { value: 'refund', label: 'Refund' }
  ];

  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'completed', label: 'Completed' },
    { value: 'pending', label: 'Pending' },
    { value: 'overdue', label: 'Overdue' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    if (onFiltersChange) {
      onFiltersChange(newFilters);
    }
  };

  const handleAmountRangeChange = (type, value) => {
    const newAmountRange = { ...filters?.amountRange, [type]: value };
    const newFilters = { ...filters, amountRange: newAmountRange };
    setFilters(newFilters);
    if (onFiltersChange) {
      onFiltersChange(newFilters);
    }
  };

  const resetFilters = () => {
    const defaultFilters = {
      dateRange: 'this-month',
      department: '',
      transactionType: '',
      amountRange: { min: '', max: '' },
      status: ''
    };
    setFilters(defaultFilters);
    if (onFiltersChange) {
      onFiltersChange(defaultFilters);
    }
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters?.department) count++;
    if (filters?.transactionType) count++;
    if (filters?.amountRange?.min || filters?.amountRange?.max) count++;
    if (filters?.status) count++;
    return count;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Icon name="Filter" size={20} />
          <h3 className="text-lg font-semibold text-foreground">Filters</h3>
          {getActiveFilterCount() > 0 && (
            <span className="bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-medium">
              {getActiveFilterCount()} active
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={resetFilters}
            iconName="RotateCcw"
            iconPosition="left"
          >
            Reset
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
            iconPosition="right"
          >
            {isExpanded ? 'Less' : 'More'} Filters
          </Button>
        </div>
      </div>
      {/* Basic Filters - Always Visible */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <Select
          label="Date Range"
          options={dateRangeOptions}
          value={filters?.dateRange}
          onChange={(value) => handleFilterChange('dateRange', value)}
        />
        
        <Select
          label="Department"
          options={departmentOptions}
          value={filters?.department}
          onChange={(value) => handleFilterChange('department', value)}
        />
        
        <Select
          label="Transaction Type"
          options={transactionTypeOptions}
          value={filters?.transactionType}
          onChange={(value) => handleFilterChange('transactionType', value)}
        />
        
        <Select
          label="Status"
          options={statusOptions}
          value={filters?.status}
          onChange={(value) => handleFilterChange('status', value)}
        />
      </div>
      {/* Advanced Filters - Expandable */}
      {isExpanded && (
        <div className="border-t border-border pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Amount Range</label>
              <div className="flex space-x-2">
                <Input
                  type="number"
                  placeholder="Min amount"
                  value={filters?.amountRange?.min}
                  onChange={(e) => handleAmountRangeChange('min', e?.target?.value)}
                />
                <Input
                  type="number"
                  placeholder="Max amount"
                  value={filters?.amountRange?.max}
                  onChange={(e) => handleAmountRangeChange('max', e?.target?.value)}
                />
              </div>
            </div>

            {filters?.dateRange === 'custom' && (
              <>
                <Input
                  label="Start Date"
                  type="date"
                  value={filters?.startDate || ''}
                  onChange={(e) => handleFilterChange('startDate', e?.target?.value)}
                />
                <Input
                  label="End Date"
                  type="date"
                  value={filters?.endDate || ''}
                  onChange={(e) => handleFilterChange('endDate', e?.target?.value)}
                />
              </>
            )}
          </div>
        </div>
      )}
      {/* Quick Filter Buttons */}
      <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border">
        <span className="text-sm font-medium text-muted-foreground mr-2">Quick Filters:</span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleFilterChange('status', 'overdue')}
          className={filters?.status === 'overdue' ? 'bg-error/10 text-error border-error/20' : ''}
        >
          Overdue
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleFilterChange('transactionType', 'expense')}
          className={filters?.transactionType === 'expense' ? 'bg-warning/10 text-warning border-warning/20' : ''}
        >
          Expenses
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleFilterChange('transactionType', 'income')}
          className={filters?.transactionType === 'income' ? 'bg-success/10 text-success border-success/20' : ''}
        >
          Income
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            handleFilterChange('amountRange', { min: '10000', max: '' });
          }}
          className={filters?.amountRange?.min === '10000' ? 'bg-primary/10 text-primary border-primary/20' : ''}
        >
          High Value (&gt;$10K)
        </Button>
      </div>
    </div>
  );
};

export default FinancialFilters;