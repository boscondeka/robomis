import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ReportCard = ({ report, onGenerate, onSchedule, onView }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'ready':
        return 'text-success bg-success/10';
      case 'generating':
        return 'text-warning bg-warning/10';
      case 'scheduled':
        return 'text-primary bg-primary/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'financial':
        return 'DollarSign';
      case 'hr':
        return 'Users';
      case 'project':
        return 'FolderKanban';
      case 'operational':
        return 'BarChart3';
      default:
        return 'FileText';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-elevated transition-smooth">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon 
              name={getCategoryIcon(report?.category)} 
              size={20} 
              color="var(--color-primary)" 
            />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{report?.name}</h3>
            <p className="text-sm text-muted-foreground">{report?.category}</p>
          </div>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report?.status)}`}>
          {report?.status}
        </span>
      </div>
      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
        {report?.description}
      </p>
      <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
        <span>Last generated: {report?.lastGenerated}</span>
        <span>{report?.frequency}</span>
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          iconName="Play"
          iconPosition="left"
          onClick={() => onGenerate(report?.id)}
          disabled={report?.status === 'generating'}
        >
          Generate
        </Button>
        <Button
          variant="ghost"
          size="sm"
          iconName="Calendar"
          onClick={() => onSchedule(report?.id)}
        >
          Schedule
        </Button>
        {report?.status === 'ready' && (
          <Button
            variant="ghost"
            size="sm"
            iconName="Eye"
            onClick={() => onView(report?.id)}
          >
            View
          </Button>
        )}
      </div>
    </div>
  );
};

export default ReportCard;