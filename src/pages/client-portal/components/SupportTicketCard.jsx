import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SupportTicketCard = ({ ticket, onViewTicket }) => {
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'open':
        return 'text-warning bg-warning/10';
      case 'in-progress':
        return 'text-primary bg-primary/10';
      case 'resolved':
        return 'text-success bg-success/10';
      case 'closed':
        return 'text-muted-foreground bg-muted/50';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'high':
        return 'AlertTriangle';
      case 'medium':
        return 'AlertCircle';
      case 'low':
        return 'Info';
      default:
        return 'HelpCircle';
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
          <div className="flex items-center space-x-3 mb-2">
            <h3 className="text-lg font-semibold text-foreground">
              Ticket #{ticket?.id}
            </h3>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(ticket?.status)}`}>
              {ticket?.status}
            </span>
          </div>
          <h4 className="text-base font-medium text-foreground mb-2">
            {ticket?.subject}
          </h4>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {ticket?.description}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Icon 
            name={getPriorityIcon(ticket?.priority)} 
            size={16} 
            className={getPriorityColor(ticket?.priority)}
          />
          <span className={`text-sm font-medium ${getPriorityColor(ticket?.priority)}`}>
            {ticket?.priority}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
        <div>
          <p className="text-muted-foreground">Created</p>
          <p className="font-medium text-foreground">{ticket?.createdDate}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Last Updated</p>
          <p className="font-medium text-foreground">{ticket?.lastUpdated}</p>
        </div>
      </div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="User" size={16} className="text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            Assigned to: <span className="font-medium text-foreground">{ticket?.assignedTo}</span>
          </span>
        </div>
        {ticket?.hasAttachments && (
          <div className="flex items-center space-x-1">
            <Icon name="Paperclip" size={16} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {ticket?.attachmentCount} files
            </span>
          </div>
        )}
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Icon name="MessageSquare" size={16} className="text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            {ticket?.responseCount} responses
          </span>
        </div>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => onViewTicket(ticket)}
          iconName="ArrowRight"
          iconPosition="right"
        >
          View Ticket
        </Button>
      </div>
    </div>
  );
};

export default SupportTicketCard;