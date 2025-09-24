import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ActivityFeed = () => {
  const activities = [
    {
      id: 1,
      type: 'project',
      title: 'New project proposal submitted',
      description: 'Healthcare Management System - Phase 2',
      user: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
      timestamp: '2 hours ago',
      icon: 'FileText',
      priority: 'high'
    },
    {
      id: 2,
      type: 'approval',
      title: 'Budget approval required',
      description: 'Q4 Marketing Campaign - $45,000',
      user: 'Michael Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      timestamp: '4 hours ago',
      icon: 'DollarSign',
      priority: 'urgent'
    },
    {
      id: 3,
      type: 'hr',
      title: 'New employee onboarding',
      description: 'Alex Rodriguez - Senior Developer',
      user: 'HR Department',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      timestamp: '6 hours ago',
      icon: 'UserPlus',
      priority: 'medium'
    },
    {
      id: 4,
      type: 'finance',
      title: 'Monthly financial report ready',
      description: 'September 2024 Financial Summary',
      user: 'Finance Team',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150',
      timestamp: '8 hours ago',
      icon: 'BarChart3',
      priority: 'low'
    },
    {
      id: 5,
      type: 'client',
      title: 'Client meeting scheduled',
      description: 'TechCorp Industries - Project Review',
      user: 'David Wilson',
      avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=150',
      timestamp: '1 day ago',
      icon: 'Calendar',
      priority: 'medium'
    }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'bg-destructive';
      case 'high': return 'bg-warning';
      case 'medium': return 'bg-primary';
      case 'low': return 'bg-muted-foreground';
      default: return 'bg-muted-foreground';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'project': return 'text-primary';
      case 'approval': return 'text-warning';
      case 'hr': return 'text-success';
      case 'finance': return 'text-accent';
      case 'client': return 'text-secondary';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-subtle">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Recent Activity</h2>
          <button className="text-sm text-primary hover:text-primary/80 transition-smooth">
            View All
          </button>
        </div>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {activities?.map((activity) => (
            <div key={activity?.id} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-muted/30 transition-smooth">
              <div className="relative">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-muted">
                  <Image
                    src={activity?.avatar}
                    alt={activity?.user}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${getPriorityColor(activity?.priority)} rounded-full flex items-center justify-center`}>
                  <Icon 
                    name={activity?.icon} 
                    size={10} 
                    color="white" 
                  />
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground truncate">
                      {activity?.title}
                    </p>
                    <p className="text-sm text-muted-foreground truncate">
                      {activity?.description}
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs text-muted-foreground">
                        by {activity?.user}
                      </span>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground">
                        {activity?.timestamp}
                      </span>
                    </div>
                  </div>
                  
                  <div className={`w-2 h-2 rounded-full ${getPriorityColor(activity?.priority)} ml-2 mt-1`} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActivityFeed;