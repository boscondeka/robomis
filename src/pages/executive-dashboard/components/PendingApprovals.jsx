import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PendingApprovals = () => {
  const approvals = [
    {
      id: 1,
      type: 'budget',
      title: 'Q4 Marketing Budget',
      description: 'Digital advertising campaign for product launch',
      amount: '$45,000',
      requestedBy: 'Marketing Team',
      department: 'Marketing',
      priority: 'high',
      daysWaiting: 3,
      icon: 'DollarSign'
    },
    {
      id: 2,
      type: 'hiring',
      title: 'Senior Developer Position',
      description: 'Full-stack developer for healthcare project',
      amount: '$85,000/year',
      requestedBy: 'Sarah Johnson',
      department: 'Engineering',
      priority: 'urgent',
      daysWaiting: 7,
      icon: 'UserPlus'
    },
    {
      id: 3,
      type: 'expense',
      title: 'Office Equipment Purchase',
      description: 'New workstations and monitors for development team',
      amount: '$12,500',
      requestedBy: 'IT Department',
      department: 'Operations',
      priority: 'medium',
      daysWaiting: 2,
      icon: 'Monitor'
    },
    {
      id: 4,
      type: 'contract',
      title: 'Vendor Contract Renewal',
      description: 'Cloud hosting services annual contract',
      amount: '$24,000/year',
      requestedBy: 'DevOps Team',
      department: 'Technology',
      priority: 'medium',
      daysWaiting: 5,
      icon: 'FileText'
    }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'text-destructive bg-destructive/10 border-destructive/20';
      case 'high': return 'text-warning bg-warning/10 border-warning/20';
      case 'medium': return 'text-primary bg-primary/10 border-primary/20';
      case 'low': return 'text-muted-foreground bg-muted/10 border-muted/20';
      default: return 'text-muted-foreground bg-muted/10 border-muted/20';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'budget': return 'DollarSign';
      case 'hiring': return 'UserPlus';
      case 'expense': return 'CreditCard';
      case 'contract': return 'FileText';
      default: return 'AlertCircle';
    }
  };

  const handleApprove = (id) => {
    console.log('Approving item:', id);
  };

  const handleReject = (id) => {
    console.log('Rejecting item:', id);
  };

  const handleViewDetails = (id) => {
    console.log('Viewing details for:', id);
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-subtle">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <h2 className="text-lg font-semibold text-foreground">Pending Approvals</h2>
            <div className="w-6 h-6 bg-destructive rounded-full flex items-center justify-center">
              <span className="text-xs font-bold text-white">{approvals?.length}</span>
            </div>
          </div>
          <button className="text-sm text-primary hover:text-primary/80 transition-smooth">
            View All
          </button>
        </div>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {approvals?.map((approval) => (
            <div key={approval?.id} className="border border-border rounded-lg p-4 hover:shadow-subtle transition-complex">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-muted/30 rounded-lg flex items-center justify-center">
                    <Icon 
                      name={getTypeIcon(approval?.type)} 
                      size={20} 
                      color="var(--color-muted-foreground)" 
                    />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="text-sm font-semibold text-foreground">
                        {approval?.title}
                      </h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(approval?.priority)}`}>
                        {approval?.priority}
                      </span>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-2">
                      {approval?.description}
                    </p>
                    
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <span className="flex items-center space-x-1">
                        <Icon name="User" size={12} />
                        <span>{approval?.requestedBy}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Icon name="Building" size={12} />
                        <span>{approval?.department}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Icon name="Clock" size={12} />
                        <span>{approval?.daysWaiting} days waiting</span>
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="text-lg font-bold text-foreground">{approval?.amount}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-3 border-t border-border">
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Eye"
                  iconPosition="left"
                  onClick={() => handleViewDetails(approval?.id)}
                >
                  View Details
                </Button>
                
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="X"
                    iconPosition="left"
                    onClick={() => handleReject(approval?.id)}
                  >
                    Reject
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    iconName="Check"
                    iconPosition="left"
                    onClick={() => handleApprove(approval?.id)}
                  >
                    Approve
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PendingApprovals;