import React, { useState } from 'react';

import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterPanel = ({ isOpen, onClose, onApplyFilters, currentFilters }) => {
  const [filters, setFilters] = useState({
    dateRange: currentFilters?.dateRange || '6months',
    categories: currentFilters?.categories || [],
    status: currentFilters?.status || 'all',
    departments: currentFilters?.departments || [],
    searchTerm: currentFilters?.searchTerm || ''
  });

  const dateRanges = [
    { value: '1week', label: 'Last Week' },
    { value: '1month', label: 'Last Month' },
    { value: '3months', label: 'Last 3 Months' },
    { value: '6months', label: 'Last 6 Months' },
    { value: '1year', label: 'Last Year' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const categories = [
    { id: 'financial', label: 'Financial Reports' },
    { id: 'hr', label: 'HR Reports' },
    { id: 'project', label: 'Project Reports' },
    { id: 'operational', label: 'Operational Reports' },
    { id: 'compliance', label: 'Compliance Reports' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'ready', label: 'Ready' },
    { value: 'generating', label: 'Generating' },
    { value: 'scheduled', label: 'Scheduled' },
    { value: 'failed', label: 'Failed' }
  ];

  const departments = [
    { id: 'executive', label: 'Executive' },
    { id: 'finance', label: 'Finance' },
    { id: 'hr', label: 'Human Resources' },
    { id: 'projects', label: 'Project Management' },
    { id: 'operations', label: 'Operations' },
    { id: 'it', label: 'IT Department' }
  ];

  const handleCategoryToggle = (categoryId) => {
    setFilters(prev => ({
      ...prev,
      categories: prev?.categories?.includes(categoryId)
        ? prev?.categories?.filter(id => id !== categoryId)
        : [...prev?.categories, categoryId]
    }));
  };

  const handleDepartmentToggle = (deptId) => {
    setFilters(prev => ({
      ...prev,
      departments: prev?.departments?.includes(deptId)
        ? prev?.departments?.filter(id => id !== deptId)
        : [...prev?.departments, deptId]
    }));
  };

  const handleApply = () => {
    onApplyFilters(filters);
    onClose();
  };

  const handleReset = () => {
    const resetFilters = {
      dateRange: '6months',
      categories: [],
      status: 'all',
      departments: [],
      searchTerm: ''
    };
    setFilters(resetFilters);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-1000 flex items-start justify-end">
      <div className="bg-card border-l border-border w-full max-w-md h-full overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">Filter Reports</h2>
          <Button
            variant="ghost"
            size="icon"
            iconName="X"
            onClick={onClose}
          />
        </div>

        <div className="p-6 space-y-6">
          <div>
            <Input
              label="Search Reports"
              placeholder="Search by name or description..."
              value={filters?.searchTerm}
              onChange={(e) => setFilters(prev => ({ ...prev, searchTerm: e?.target?.value }))}
              iconName="Search"
            />
          </div>

          <div>
            <Select
              label="Date Range"
              options={dateRanges}
              value={filters?.dateRange}
              onChange={(value) => setFilters(prev => ({ ...prev, dateRange: value }))}
            />
          </div>

          <div>
            <Select
              label="Status"
              options={statusOptions}
              value={filters?.status}
              onChange={(value) => setFilters(prev => ({ ...prev, status: value }))}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-3">
              Report Categories
            </label>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {categories?.map(category => (
                <Checkbox
                  key={category?.id}
                  label={category?.label}
                  checked={filters?.categories?.includes(category?.id)}
                  onChange={() => handleCategoryToggle(category?.id)}
                />
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-3">
              Departments
            </label>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {departments?.map(dept => (
                <Checkbox
                  key={dept?.id}
                  label={dept?.label}
                  checked={filters?.departments?.includes(dept?.id)}
                  onChange={() => handleDepartmentToggle(dept?.id)}
                />
              ))}
            </div>
          </div>

          <div className="bg-muted/50 rounded-lg p-4">
            <h3 className="font-medium text-foreground mb-2">Active Filters</h3>
            <div className="text-sm text-muted-foreground space-y-1">
              <p><strong>Date Range:</strong> {dateRanges?.find(d => d?.value === filters?.dateRange)?.label}</p>
              <p><strong>Categories:</strong> {filters?.categories?.length} selected</p>
              <p><strong>Departments:</strong> {filters?.departments?.length} selected</p>
              <p><strong>Status:</strong> {statusOptions?.find(s => s?.value === filters?.status)?.label}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between p-6 border-t border-border">
          <Button
            variant="outline"
            onClick={handleReset}
          >
            Reset All
          </Button>
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              iconName="Filter"
              iconPosition="left"
              onClick={handleApply}
            >
              Apply Filters
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;