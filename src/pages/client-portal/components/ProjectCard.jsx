import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProjectCard = ({ project, onViewDetails }) => {
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'text-success bg-success/10';
      case 'completed':
        return 'text-primary bg-primary/10';
      case 'on-hold':
        return 'text-warning bg-warning/10';
      case 'delayed':
        return 'text-destructive bg-destructive/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'high':
        return 'text-destructive';
      case 'medium':
        return 'text-warning';
      case 'low':
        return 'text-success';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-elevated transition-smooth">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-foreground mb-2">
            {project?.name}
          </h3>
          <p className="text-sm text-muted-foreground mb-3">
            {project?.description}
          </p>
          <div className="flex items-center space-x-4 text-sm">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project?.status)}`}>
              {project?.status}
            </span>
            <span className="text-muted-foreground">
              Priority: <span className={`font-medium ${getPriorityColor(project?.priority)}`}>
                {project?.priority}
              </span>
            </span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Project Value</p>
          <p className="text-lg font-semibold text-foreground">
            ${project?.value?.toLocaleString()}
          </p>
        </div>
      </div>
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">Progress</span>
          <span className="text-sm font-medium text-foreground">
            {project?.progress}%
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${project?.progress}%` }}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
        <div>
          <p className="text-muted-foreground">Start Date</p>
          <p className="font-medium text-foreground">{project?.startDate}</p>
        </div>
        <div>
          <p className="text-muted-foreground">End Date</p>
          <p className="font-medium text-foreground">{project?.endDate}</p>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Icon name="Calendar" size={16} className="text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            Next Milestone: {project?.nextMilestone}
          </span>
        </div>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => onViewDetails(project)}
          iconName="ArrowRight"
          iconPosition="right"
        >
          View Details
        </Button>
      </div>
    </div>
  );
};

export default ProjectCard;