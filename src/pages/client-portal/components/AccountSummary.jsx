import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AccountSummary = ({ accountData, onMakePayment, onViewStatement }) => {
  const getBalanceColor = (balance) => {
    if (balance < 0) return 'text-destructive';
    if (balance === 0) return 'text-success';
    return 'text-foreground';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Account Summary</h2>
        <Button 
          variant="outline" 
          size="sm"
          onClick={onViewStatement}
          iconName="FileText"
          iconPosition="left"
        >
          View Statement
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="text-center p-4 bg-muted/30 rounded-lg">
          <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mx-auto mb-3">
            <Icon name="DollarSign" size={24} className="text-primary" />
          </div>
          <p className="text-sm text-muted-foreground mb-1">Current Balance</p>
          <p className={`text-2xl font-bold ${getBalanceColor(accountData?.currentBalance)}`}>
            ${Math.abs(accountData?.currentBalance)?.toLocaleString()}
            {accountData?.currentBalance < 0 && <span className="text-sm ml-1">(Outstanding)</span>}
          </p>
        </div>

        <div className="text-center p-4 bg-muted/30 rounded-lg">
          <div className="flex items-center justify-center w-12 h-12 bg-success/10 rounded-full mx-auto mb-3">
            <Icon name="TrendingUp" size={24} className="text-success" />
          </div>
          <p className="text-sm text-muted-foreground mb-1">Total Paid</p>
          <p className="text-2xl font-bold text-foreground">
            ${accountData?.totalPaid?.toLocaleString()}
          </p>
        </div>

        <div className="text-center p-4 bg-muted/30 rounded-lg">
          <div className="flex items-center justify-center w-12 h-12 bg-warning/10 rounded-full mx-auto mb-3">
            <Icon name="Clock" size={24} className="text-warning" />
          </div>
          <p className="text-sm text-muted-foreground mb-1">Pending Invoices</p>
          <p className="text-2xl font-bold text-foreground">
            {accountData?.pendingInvoices}
          </p>
        </div>
      </div>
      <div className="border-t border-border pt-6">
        <h3 className="text-lg font-medium text-foreground mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {accountData?.recentActivity?.map((activity, index) => (
            <div key={index} className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  activity?.type === 'payment' ? 'bg-success/10' : 
                  activity?.type === 'invoice' ? 'bg-warning/10' : 'bg-primary/10'
                }`}>
                  <Icon 
                    name={activity?.type === 'payment' ? 'CheckCircle' : 
                          activity?.type === 'invoice' ? 'FileText' : 'Info'} 
                    size={16} 
                    className={
                      activity?.type === 'payment' ? 'text-success' : 
                      activity?.type === 'invoice' ? 'text-warning' : 'text-primary'
                    }
                  />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {activity?.description}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {activity?.date}
                  </p>
                </div>
              </div>
              <p className={`text-sm font-medium ${
                activity?.type === 'payment' ? 'text-success' : 'text-foreground'
              }`}>
                {activity?.type === 'payment' ? '-' : ''}${activity?.amount?.toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
      {accountData?.currentBalance < 0 && (
        <div className="mt-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="AlertTriangle" size={20} className="text-destructive" />
              <div>
                <p className="text-sm font-medium text-destructive">
                  Outstanding Balance
                </p>
                <p className="text-xs text-destructive/80">
                  Please make a payment to avoid service interruption
                </p>
              </div>
            </div>
            <Button 
              variant="destructive" 
              size="sm"
              onClick={onMakePayment}
              iconName="CreditCard"
              iconPosition="left"
            >
              Pay Now
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountSummary;