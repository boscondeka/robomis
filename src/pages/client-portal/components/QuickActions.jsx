import React from 'react';
import Icon from '../../../components/AppIcon';


const QuickActions = ({ onCreateTicket, onViewDocuments, onMakePayment, onContactSupport }) => {
  const actions = [
    {
      title: 'Submit Support Ticket',
      description: 'Get help with your projects or account',
      icon: 'HelpCircle',
      color: 'primary',
      action: onCreateTicket
    },
    {
      title: 'View Documents',
      description: 'Access project files and reports',
      icon: 'FileText',
      color: 'success',
      action: onViewDocuments
    },
    {
      title: 'Make Payment',
      description: 'Pay outstanding invoices securely',
      icon: 'CreditCard',
      color: 'warning',
      action: onMakePayment
    },
    {
      title: 'Contact Support',
      description: 'Speak directly with our team',
      icon: 'Phone',
      color: 'accent',
      action: onContactSupport
    }
  ];

  const getColorClasses = (color) => {
    switch (color) {
      case 'primary':
        return 'bg-primary/10 text-primary hover:bg-primary/20';
      case 'success':
        return 'bg-success/10 text-success hover:bg-success/20';
      case 'warning':
        return 'bg-warning/10 text-warning hover:bg-warning/20';
      case 'accent':
        return 'bg-accent/10 text-accent hover:bg-accent/20';
      default:
        return 'bg-muted/50 text-muted-foreground hover:bg-muted';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h2 className="text-xl font-semibold text-foreground mb-6">Quick Actions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {actions?.map((action, index) => (
          <button
            key={index}
            onClick={action?.action}
            className={`
              p-4 rounded-lg border border-border transition-smooth text-left
              hover:shadow-subtle focus:outline-none focus:ring-2 focus:ring-primary/20
              ${getColorClasses(action?.color)}
            `}
          >
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <Icon name={action?.icon} size={24} />
              </div>
              <div className="flex-1">
                <h3 className="font-medium mb-1">
                  {action?.title}
                </h3>
                <p className="text-sm opacity-80">
                  {action?.description}
                </p>
              </div>
              <Icon name="ArrowRight" size={16} className="opacity-60" />
            </div>
          </button>
        ))}
      </div>
      <div className="mt-6 p-4 bg-muted/30 rounded-lg">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
            <Icon name="Clock" size={20} className="text-primary" />
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-foreground mb-1">Business Hours</h4>
            <p className="text-sm text-muted-foreground">
              Monday - Friday: 9:00 AM - 6:00 PM EST
            </p>
            <p className="text-sm text-muted-foreground">
              Emergency Support: 24/7 via ticket system
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;