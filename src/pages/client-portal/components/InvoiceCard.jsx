import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const InvoiceCard = ({ invoice, onViewInvoice, onMakePayment }) => {
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'paid':
        return 'text-success bg-success/10';
      case 'pending':
        return 'text-warning bg-warning/10';
      case 'overdue':
        return 'text-destructive bg-destructive/10';
      case 'draft':
        return 'text-muted-foreground bg-muted/50';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const isPaymentEnabled = invoice?.status?.toLowerCase() === 'pending' || invoice?.status?.toLowerCase() === 'overdue';

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-elevated transition-smooth">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <h3 className="text-lg font-semibold text-foreground">
              Invoice #{invoice?.number}
            </h3>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(invoice?.status)}`}>
              {invoice?.status}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mb-2">
            {invoice?.description}
          </p>
          <p className="text-sm text-muted-foreground">
            Project: <span className="font-medium text-foreground">{invoice?.projectName}</span>
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Amount</p>
          <p className="text-2xl font-bold text-foreground">
            ${invoice?.amount?.toLocaleString()}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
        <div>
          <p className="text-muted-foreground">Issue Date</p>
          <p className="font-medium text-foreground">{invoice?.issueDate}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Due Date</p>
          <p className={`font-medium ${invoice?.status?.toLowerCase() === 'overdue' ? 'text-destructive' : 'text-foreground'}`}>
            {invoice?.dueDate}
          </p>
        </div>
      </div>
      {invoice?.status?.toLowerCase() === 'overdue' && (
        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3 mb-4">
          <div className="flex items-center space-x-2">
            <Icon name="AlertTriangle" size={16} className="text-destructive" />
            <p className="text-sm text-destructive font-medium">
              Payment overdue by {invoice?.overdueDays} days
            </p>
          </div>
        </div>
      )}
      <div className="flex items-center justify-between">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => onViewInvoice(invoice)}
          iconName="Eye"
          iconPosition="left"
        >
          View Invoice
        </Button>
        
        {isPaymentEnabled && (
          <Button 
            variant="default" 
            size="sm"
            onClick={() => onMakePayment(invoice)}
            iconName="CreditCard"
            iconPosition="left"
          >
            Make Payment
          </Button>
        )}
      </div>
    </div>
  );
};

export default InvoiceCard;