import React from 'react';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';


const ProjectFilters = ({ filters, onFilterChange, onClearFilters }) => {
  const statusOptions = [
    { value: 'all', label: 'All Statuses' },
    { value: 'opportunity', label: 'Opportunities' },
    { value: 'bidding', label: 'Active Bids' },
    { value: 'active', label: 'Active Projects' },
    { value: 'completed', label: 'Completed' },
    { value: 'on-hold', label: 'On Hold' }
  ];

  const priorityOptions = [
    { value: 'all', label: 'All Priorities' },
    { value: 'high', label: 'High Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'low', label: 'Low Priority' }
  ];

  const clientOptions = [
    { value: 'all', label: 'All Clients' },
    { value: 'acme-corp', label: 'Acme Corporation' },
    { value: 'tech-solutions', label: 'Tech Solutions Inc' },
    { value: 'global-systems', label: 'Global Systems Ltd' },
    { value: 'innovate-co', label: 'Innovate & Co' },
    { value: 'future-tech', label: 'Future Tech Partners' }
  ];

  const teamMemberOptions = [
    { value: 'all', label: 'All Team Members' },
    { value: 'john-doe', label: 'John Doe' },
    { value: 'jane-smith', label: 'Jane Smith' },
    { value: 'mike-johnson', label: 'Mike Johnson' },
    { value: 'sarah-wilson', label: 'Sarah Wilson' },
    { value: 'david-brown', label: 'David Brown' }
  ];

  const handleFilterChange = (key, value) => {
    onFilterChange({
      ...filters,
      [key]: value
    });
  };

  const hasActiveFilters = () => {
    return Object.values(filters)?.some(value => 
      value && value !== 'all' && value !== ''
    );
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground">Filter Projects</h3>
        {hasActiveFilters() && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            iconName="X"
            iconPosition="left"
          >
            Clear Filters
          </Button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {/* Search */}
        <div className="lg:col-span-2">
          <Input
            type="search"
            placeholder="Search projects..."
            value={filters?.search || ''}
            onChange={(e) => handleFilterChange('search', e?.target?.value)}
            className="w-full"
          />
        </div>

        {/* Status Filter */}
        <Select
          options={statusOptions}
          value={filters?.status || 'all'}
          onChange={(value) => handleFilterChange('status', value)}
          placeholder="Filter by status"
        />

        {/* Priority Filter */}
        <Select
          options={priorityOptions}
          value={filters?.priority || 'all'}
          onChange={(value) => handleFilterChange('priority', value)}
          placeholder="Filter by priority"
        />

        {/* Client Filter */}
        <Select
          options={clientOptions}
          value={filters?.client || 'all'}
          onChange={(value) => handleFilterChange('client', value)}
          placeholder="Filter by client"
          searchable
        />

        {/* Team Member Filter */}
        <Select
          options={teamMemberOptions}
          value={filters?.teamMember || 'all'}
          onChange={(value) => handleFilterChange('teamMember', value)}
          placeholder="Filter by team member"
          searchable
        />
      </div>
      {/* Date Range Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        <Input
          type="date"
          label="Start Date From"
          value={filters?.startDateFrom || ''}
          onChange={(e) => handleFilterChange('startDateFrom', e?.target?.value)}
        />

        <Input
          type="date"
          label="Start Date To"
          value={filters?.startDateTo || ''}
          onChange={(e) => handleFilterChange('startDateTo', e?.target?.value)}
        />

        <Input
          type="date"
          label="End Date From"
          value={filters?.endDateFrom || ''}
          onChange={(e) => handleFilterChange('endDateFrom', e?.target?.value)}
        />

        <Input
          type="date"
          label="End Date To"
          value={filters?.endDateTo || ''}
          onChange={(e) => handleFilterChange('endDateTo', e?.target?.value)}
        />
      </div>
      {/* Value Range Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <Input
          type="number"
          label="Minimum Project Value ($)"
          placeholder="0"
          value={filters?.minValue || ''}
          onChange={(e) => handleFilterChange('minValue', e?.target?.value)}
        />

        <Input
          type="number"
          label="Maximum Project Value ($)"
          placeholder="1000000"
          value={filters?.maxValue || ''}
          onChange={(e) => handleFilterChange('maxValue', e?.target?.value)}
        />
      </div>
      {/* Quick Filter Buttons */}
      <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border">
        <span className="text-sm text-muted-foreground mr-2">Quick Filters:</span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleFilterChange('status', 'active')}
        >
          Active Projects
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleFilterChange('priority', 'high')}
        >
          High Priority
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            const today = new Date()?.toISOString()?.split('T')?.[0];
            const nextWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)?.toISOString()?.split('T')?.[0];
            onFilterChange({
              ...filters,
              endDateFrom: today,
              endDateTo: nextWeek
            });
          }}
        >
          Due This Week
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleFilterChange('status', 'bidding')}
        >
          Active Bids
        </Button>
      </div>
    </div>
  );
};

export default ProjectFilters;