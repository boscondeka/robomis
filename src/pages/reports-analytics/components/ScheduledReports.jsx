import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ScheduledReports = ({ reports, onEdit, onDelete, onToggle }) => {
  const [expandedReport, setExpandedReport] = useState(null);

  const getFrequencyIcon = (frequency) => {
    switch (frequency) {
      case 'daily':
        return 'Calendar';
      case 'weekly':
        return 'CalendarDays';
      case 'monthly':
        return 'CalendarRange';
      case 'quarterly':
        return 'CalendarClock';
      default:
        return 'Clock';
    }
  };

  const getStatusColor = (isActive) => {
    return isActive ? 'text-success bg-success/10' : 'text-muted-foreground bg-muted';
  };

  const formatNextRun = (nextRun) => {
    const date = new Date(nextRun);
    return date?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-4">
      {reports?.map(report => (
        <div key={report?.id} className="bg-card border border-border rounded-lg">
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon 
                    name={getFrequencyIcon(report?.frequency)} 
                    size={20} 
                    color="var(--color-primary)" 
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{report?.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {report?.frequency} • Next: {formatNextRun(report?.nextRun)}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report?.isActive)}`}>
                  {report?.isActive ? 'Active' : 'Paused'}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  iconName={expandedReport === report?.id ? "ChevronUp" : "ChevronDown"}
                  onClick={() => setExpandedReport(expandedReport === report?.id ? null : report?.id)}
                />
              </div>
            </div>
          </div>

          {expandedReport === report?.id && (
            <div className="border-t border-border p-4 bg-muted/20">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h4 className="font-medium text-foreground mb-2">Recipients</h4>
                  <div className="space-y-1">
                    {report?.recipients?.map((recipient, index) => (
                      <div key={index} className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Icon name="Mail" size={14} />
                        <span>{recipient}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-foreground mb-2">Report Details</h4>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p><strong>Format:</strong> {report?.format?.toUpperCase()}</p>
                    <p><strong>Last Generated:</strong> {report?.lastGenerated}</p>
                    <p><strong>Success Rate:</strong> {report?.successRate}%</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center space-x-2">
                  <Button
                    variant={report?.isActive ? "outline" : "default"}
                    size="sm"
                    iconName={report?.isActive ? "Pause" : "Play"}
                    iconPosition="left"
                    onClick={() => onToggle(report?.id)}
                  >
                    {report?.isActive ? 'Pause' : 'Resume'}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Edit"
                    onClick={() => onEdit(report?.id)}
                  >
                    Edit
                  </Button>
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Trash2"
                  onClick={() => onDelete(report?.id)}
                  className="text-destructive hover:text-destructive"
                >
                  Delete
                </Button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ScheduledReports;