import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TransactionPanel = () => {
  const [activeTab, setActiveTab] = useState('recent');

  const recentTransactions = [
    {
      id: 1,
      type: "payment",
      description: "Office Supplies - Staples Inc.",
      amount: -2450.00,
      date: "2024-09-24",
      status: "completed",
      category: "Operations"
    },
    {
      id: 2,
      type: "invoice",
      description: "Project Alpha - Client ABC Corp",
      amount: 15000.00,
      date: "2024-09-23",
      status: "paid",
      category: "Revenue"
    },
    {
      id: 3,
      type: "expense",
      description: "Marketing Campaign - Google Ads",
      amount: -3200.00,
      date: "2024-09-23",
      status: "pending",
      category: "Marketing"
    },
    {
      id: 4,
      type: "payment",
      description: "Software License - Microsoft 365",
      amount: -890.00,
      date: "2024-09-22",
      status: "completed",
      category: "IT"
    },
    {
      id: 5,
      type: "invoice",
      description: "Consulting Services - XYZ Ltd",
      amount: 8500.00,
      date: "2024-09-22",
      status: "overdue",
      category: "Revenue"
    }
  ];

  const pendingApprovals = [
    {
      id: 1,
      description: "Equipment Purchase - Dell Workstations",
      amount: 12500.00,
      requestedBy: "IT Department",
      date: "2024-09-24",
      priority: "high"
    },
    {
      id: 2,
      description: "Travel Expenses - Conference Attendance",
      amount: 3200.00,
      requestedBy: "John Anderson",
      date: "2024-09-23",
      priority: "medium"
    },
    {
      id: 3,
      description: "Office Renovation - Phase 2",
      amount: 25000.00,
      requestedBy: "Facilities Team",
      date: "2024-09-22",
      priority: "low"
    }
  ];

  const overdueInvoices = [
    {
      id: 1,
      client: "ABC Corporation",
      invoiceNumber: "INV-2024-0156",
      amount: 15000.00,
      dueDate: "2024-09-15",
      daysPastDue: 9
    },
    {
      id: 2,
      client: "Tech Solutions Ltd",
      invoiceNumber: "INV-2024-0142",
      amount: 8750.00,
      dueDate: "2024-09-10",
      daysPastDue: 14
    },
    {
      id: 3,
      client: "Global Enterprises",
      invoiceNumber: "INV-2024-0138",
      amount: 22000.00,
      dueDate: "2024-09-05",
      daysPastDue: 19
    }
  ];

  const getTransactionIcon = (type) => {
    switch (type) {
      case 'payment': return 'CreditCard';
      case 'invoice': return 'FileText';
      case 'expense': return 'Receipt';
      default: return 'DollarSign';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-success';
      case 'paid': return 'text-success';
      case 'pending': return 'text-warning';
      case 'overdue': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-error';
      case 'medium': return 'text-warning';
      case 'low': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  const tabs = [
    { id: 'recent', label: 'Recent Transactions', count: recentTransactions?.length },
    { id: 'approvals', label: 'Pending Approvals', count: pendingApprovals?.length },
    { id: 'overdue', label: 'Overdue Invoices', count: overdueInvoices?.length }
  ];

  return (
    <div className="bg-card border border-border rounded-lg">
      {/* Tab Navigation */}
      <div className="border-b border-border">
        <nav className="flex space-x-8 px-6">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`
                py-4 px-2 border-b-2 font-medium text-sm transition-smooth
                ${activeTab === tab?.id
                  ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'
                }
              `}
            >
              {tab?.label}
              <span className="ml-2 bg-muted text-muted-foreground px-2 py-1 rounded-full text-xs">
                {tab?.count}
              </span>
            </button>
          ))}
        </nav>
      </div>
      {/* Tab Content */}
      <div className="p-6">
        {activeTab === 'recent' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Recent Transactions</h3>
              <Button variant="outline" iconName="Download" iconPosition="left">
                Export
              </Button>
            </div>
            
            <div className="space-y-3">
              {recentTransactions?.map((transaction) => (
                <div
                  key={transaction?.id}
                  className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-smooth"
                >
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-card rounded-lg">
                      <Icon name={getTransactionIcon(transaction?.type)} size={20} />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{transaction?.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span>{transaction?.date}</span>
                        <span>•</span>
                        <span>{transaction?.category}</span>
                        <span className={`font-medium ${getStatusColor(transaction?.status)}`}>
                          {transaction?.status?.charAt(0)?.toUpperCase() + transaction?.status?.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${transaction?.amount > 0 ? 'text-success' : 'text-foreground'}`}>
                      {transaction?.amount > 0 ? '+' : ''}${Math.abs(transaction?.amount)?.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'approvals' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Pending Approvals</h3>
              <Button variant="outline" iconName="Filter" iconPosition="left">
                Filter
              </Button>
            </div>
            
            <div className="space-y-3">
              {pendingApprovals?.map((approval) => (
                <div
                  key={approval?.id}
                  className="flex items-center justify-between p-4 bg-muted/30 rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-card rounded-lg">
                      <Icon name="Clock" size={20} />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{approval?.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span>Requested by {approval?.requestedBy}</span>
                        <span>•</span>
                        <span>{approval?.date}</span>
                        <span className={`font-medium ${getPriorityColor(approval?.priority)}`}>
                          {approval?.priority?.charAt(0)?.toUpperCase() + approval?.priority?.slice(1)} Priority
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <p className="font-semibold text-foreground">
                      ${approval?.amount?.toLocaleString()}
                    </p>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" iconName="X">
                        Reject
                      </Button>
                      <Button variant="default" size="sm" iconName="Check">
                        Approve
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'overdue' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Overdue Invoices</h3>
              <Button variant="outline" iconName="Send" iconPosition="left">
                Send Reminders
              </Button>
            </div>
            
            <div className="space-y-3">
              {overdueInvoices?.map((invoice) => (
                <div
                  key={invoice?.id}
                  className="flex items-center justify-between p-4 bg-error/5 border border-error/20 rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-error/10 rounded-lg">
                      <Icon name="AlertTriangle" size={20} color="var(--color-error)" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{invoice?.client}</p>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span>{invoice?.invoiceNumber}</span>
                        <span>•</span>
                        <span>Due: {invoice?.dueDate}</span>
                        <span className="font-medium text-error">
                          {invoice?.daysPastDue} days overdue
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <p className="font-semibold text-foreground">
                      ${invoice?.amount?.toLocaleString()}
                    </p>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" iconName="Phone">
                        Call
                      </Button>
                      <Button variant="default" size="sm" iconName="Mail">
                        Email
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionPanel;