import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProjectCard = ({ project, onStatusChange, onViewDetails, isDragging = false }) => {
  const getStatusColor = (status) => {
    const colors = {
      'opportunity': 'bg-blue-100 text-blue-800 border-blue-200',
      'bidding': 'bg-amber-100 text-amber-800 border-amber-200',
      'active': 'bg-green-100 text-green-800 border-green-200',
      'completed': 'bg-gray-100 text-gray-800 border-gray-200',
      'on-hold': 'bg-red-100 text-red-800 border-red-200'
    };
    return colors?.[status] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getPriorityColor = (priority) => {
    const colors = {
      'high': 'text-red-600',
      'medium': 'text-amber-600',
      'low': 'text-green-600'
    };
    return colors?.[priority] || 'text-gray-600';
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })?.format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getProgressPercentage = () => {
    if (project?.status === 'completed') return 100;
    if (project?.status === 'opportunity') return 0;
    
    const today = new Date();
    const start = new Date(project.startDate);
    const end = new Date(project.endDate);
    
    if (today < start) return 0;
    if (today > end) return 100;
    
    const totalDuration = end - start;
    const elapsed = today - start;
    return Math.round((elapsed / totalDuration) * 100);
  };

  return (
    <div className={`
      bg-card border border-border rounded-lg p-4 shadow-subtle hover:shadow-elevated 
      transition-all duration-200 cursor-pointer group
      ${isDragging ? 'opacity-50 rotate-2 scale-105' : ''}
    `}>
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground text-sm truncate group-hover:text-primary transition-colors">
            {project?.title}
          </h3>
          <p className="text-xs text-muted-foreground mt-1 truncate">
            {project?.client}
          </p>
        </div>
        <div className="flex items-center space-x-2 ml-2">
          <Icon 
            name="Flag" 
            size={14} 
            className={getPriorityColor(project?.priority)}
          />
          <button
            onClick={(e) => {
              e?.stopPropagation();
              // Handle more options
            }}
            className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-muted rounded"
          >
            <Icon name="MoreHorizontal" size={14} />
          </button>
        </div>
      </div>
      {/* Status Badge */}
      <div className="mb-3">
        <span className={`
          inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border
          ${getStatusColor(project?.status)}
        `}>
          {project?.status?.replace('-', ' ')?.toUpperCase()}
        </span>
      </div>
      {/* Project Value */}
      <div className="mb-3">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Project Value</span>
          <span className="text-sm font-semibold text-foreground">
            {formatCurrency(project?.value)}
          </span>
        </div>
      </div>
      {/* Progress Bar */}
      {project?.status !== 'opportunity' && (
        <div className="mb-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-muted-foreground">Progress</span>
            <span className="text-xs font-medium text-foreground">
              {getProgressPercentage()}%
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-1.5">
            <div 
              className="bg-primary h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${getProgressPercentage()}%` }}
            />
          </div>
        </div>
      )}
      {/* Timeline */}
      <div className="mb-3 space-y-1">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Start Date</span>
          <span className="text-foreground">{formatDate(project?.startDate)}</span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">End Date</span>
          <span className="text-foreground">{formatDate(project?.endDate)}</span>
        </div>
      </div>
      {/* Team Members */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-muted-foreground">Team</span>
          <span className="text-xs text-foreground">{project?.teamMembers?.length} members</span>
        </div>
        <div className="flex -space-x-2">
          {project?.teamMembers?.slice(0, 4)?.map((member, index) => (
            <div
              key={index}
              className="w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center border-2 border-card font-medium"
              title={member?.name}
            >
              {member?.name?.charAt(0)}
            </div>
          ))}
          {project?.teamMembers?.length > 4 && (
            <div className="w-6 h-6 rounded-full bg-muted text-muted-foreground text-xs flex items-center justify-center border-2 border-card">
              +{project?.teamMembers?.length - 4}
            </div>
          )}
        </div>
      </div>
      {/* Actions */}
      <div className="flex space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={(e) => {
            e?.stopPropagation();
            onViewDetails(project);
          }}
          className="flex-1"
        >
          View Details
        </Button>
        <Button
          variant="ghost"
          size="sm"
          iconName="Edit"
          onClick={(e) => {
            e?.stopPropagation();
            // Handle edit
          }}
          className="px-2"
        />
      </div>
    </div>
  );
};

export default ProjectCard;