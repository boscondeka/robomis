import React, { useState } from 'react';

import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const ReportBuilder = ({ isOpen, onClose, onSave }) => {
  const [reportConfig, setReportConfig] = useState({
    name: '',
    category: '',
    fields: [],
    filters: [],
    format: 'pdf',
    schedule: 'manual'
  });

  const categories = [
    { value: 'financial', label: 'Financial Reports' },
    { value: 'hr', label: 'HR Reports' },
    { value: 'project', label: 'Project Reports' },
    { value: 'operational', label: 'Operational Reports' }
  ];

  const availableFields = [
    { id: 'revenue', label: 'Revenue', category: 'financial' },
    { id: 'expenses', label: 'Expenses', category: 'financial' },
    { id: 'profit', label: 'Profit Margin', category: 'financial' },
    { id: 'employees', label: 'Employee Count', category: 'hr' },
    { id: 'attendance', label: 'Attendance Rate', category: 'hr' },
    { id: 'projects', label: 'Active Projects', category: 'project' },
    { id: 'completion', label: 'Completion Rate', category: 'project' },
    { id: 'efficiency', label: 'Operational Efficiency', category: 'operational' }
  ];

  const formatOptions = [
    { value: 'pdf', label: 'PDF Document' },
    { value: 'excel', label: 'Excel Spreadsheet' },
    { value: 'csv', label: 'CSV File' },
    { value: 'dashboard', label: 'Interactive Dashboard' }
  ];

  const scheduleOptions = [
    { value: 'manual', label: 'Manual Generation' },
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'quarterly', label: 'Quarterly' }
  ];

  const handleFieldToggle = (fieldId) => {
    setReportConfig(prev => ({
      ...prev,
      fields: prev?.fields?.includes(fieldId)
        ? prev?.fields?.filter(id => id !== fieldId)
        : [...prev?.fields, fieldId]
    }));
  };

  const handleSave = () => {
    onSave(reportConfig);
    onClose();
  };

  const filteredFields = availableFields?.filter(field => 
    !reportConfig?.category || field?.category === reportConfig?.category
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-1000 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">Create Custom Report</h2>
          <Button
            variant="ghost"
            size="icon"
            iconName="X"
            onClick={onClose}
          />
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Report Name"
              placeholder="Enter report name"
              value={reportConfig?.name}
              onChange={(e) => setReportConfig(prev => ({ ...prev, name: e?.target?.value }))}
              required
            />
            <Select
              label="Category"
              options={categories}
              value={reportConfig?.category}
              onChange={(value) => setReportConfig(prev => ({ ...prev, category: value }))}
              placeholder="Select category"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-3">
              Select Fields to Include
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-48 overflow-y-auto border border-border rounded-lg p-4">
              {filteredFields?.map(field => (
                <Checkbox
                  key={field?.id}
                  label={field?.label}
                  checked={reportConfig?.fields?.includes(field?.id)}
                  onChange={() => handleFieldToggle(field?.id)}
                />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Output Format"
              options={formatOptions}
              value={reportConfig?.format}
              onChange={(value) => setReportConfig(prev => ({ ...prev, format: value }))}
            />
            <Select
              label="Schedule"
              options={scheduleOptions}
              value={reportConfig?.schedule}
              onChange={(value) => setReportConfig(prev => ({ ...prev, schedule: value }))}
            />
          </div>

          <div className="bg-muted/50 rounded-lg p-4">
            <h3 className="font-medium text-foreground mb-2">Report Preview</h3>
            <div className="text-sm text-muted-foreground space-y-1">
              <p><strong>Name:</strong> {reportConfig?.name || 'Untitled Report'}</p>
              <p><strong>Category:</strong> {categories?.find(c => c?.value === reportConfig?.category)?.label || 'Not selected'}</p>
              <p><strong>Fields:</strong> {reportConfig?.fields?.length} selected</p>
              <p><strong>Format:</strong> {formatOptions?.find(f => f?.value === reportConfig?.format)?.label}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
          <Button
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            variant="default"
            iconName="Save"
            iconPosition="left"
            onClick={handleSave}
            disabled={!reportConfig?.name || !reportConfig?.category || reportConfig?.fields?.length === 0}
          >
            Create Report
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReportBuilder;