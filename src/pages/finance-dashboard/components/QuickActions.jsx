import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const QuickActions = () => {
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [invoiceData, setInvoiceData] = useState({
    client: '',
    amount: '',
    description: '',
    dueDate: ''
  });
  const [paymentData, setPaymentData] = useState({
    vendor: '',
    amount: '',
    description: '',
    paymentMethod: ''
  });

  const quickActionItems = [
    {
      id: 1,
      title: "Generate Invoice",
      description: "Create new customer invoice",
      icon: "FileText",
      color: "text-primary",
      bgColor: "bg-primary/10",
      action: () => setShowInvoiceModal(true)
    },
    {
      id: 2,
      title: "Process Payment",
      description: "Make vendor payment",
      icon: "CreditCard",
      color: "text-success",
      bgColor: "bg-success/10",
      action: () => setShowPaymentModal(true)
    },
    {
      id: 3,
      title: "Budget Report",
      description: "Generate budget analysis",
      icon: "BarChart3",
      color: "text-warning",
      bgColor: "bg-warning/10",
      action: () => console.log('Generate Budget Report')
    },
    {
      id: 4,
      title: "Reconcile Accounts",
      description: "Bank reconciliation",
      icon: "RefreshCw",
      color: "text-secondary",
      bgColor: "bg-secondary/10",
      action: () => console.log('Reconcile Accounts')
    }
  ];

  const clientOptions = [
    { value: 'abc-corp', label: 'ABC Corporation' },
    { value: 'xyz-ltd', label: 'XYZ Limited' },
    { value: 'tech-solutions', label: 'Tech Solutions Inc' },
    { value: 'global-ent', label: 'Global Enterprises' }
  ];

  const vendorOptions = [
    { value: 'office-supplies', label: 'Office Supplies Co.' },
    { value: 'tech-vendor', label: 'Technology Vendor' },
    { value: 'utilities', label: 'Utilities Company' },
    { value: 'consulting', label: 'Consulting Services' }
  ];

  const paymentMethodOptions = [
    { value: 'bank-transfer', label: 'Bank Transfer' },
    { value: 'check', label: 'Check' },
    { value: 'credit-card', label: 'Credit Card' },
    { value: 'ach', label: 'ACH Payment' }
  ];

  const handleInvoiceSubmit = (e) => {
    e?.preventDefault();
    console.log('Invoice Data:', invoiceData);
    setShowInvoiceModal(false);
    setInvoiceData({ client: '', amount: '', description: '', dueDate: '' });
  };

  const handlePaymentSubmit = (e) => {
    e?.preventDefault();
    console.log('Payment Data:', paymentData);
    setShowPaymentModal(false);
    setPaymentData({ vendor: '', amount: '', description: '', paymentMethod: '' });
  };

  return (
    <>
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-6">Quick Actions</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {quickActionItems?.map((item) => (
            <button
              key={item?.id}
              onClick={item?.action}
              className="flex items-center space-x-4 p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-smooth text-left focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <div className={`p-3 rounded-lg ${item?.bgColor}`}>
                <Icon 
                  name={item?.icon} 
                  size={24} 
                  color={`var(--color-${item?.color?.replace('text-', '')})`}
                />
              </div>
              <div>
                <h4 className="font-medium text-foreground">{item?.title}</h4>
                <p className="text-sm text-muted-foreground">{item?.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
      {/* Invoice Modal */}
      {showInvoiceModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-1020 p-4">
          <div className="bg-card border border-border rounded-lg w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h3 className="text-lg font-semibold text-foreground">Generate Invoice</h3>
              <button
                onClick={() => setShowInvoiceModal(false)}
                className="p-2 hover:bg-muted/50 rounded-lg transition-smooth"
              >
                <Icon name="X" size={20} />
              </button>
            </div>
            
            <form onSubmit={handleInvoiceSubmit} className="p-6 space-y-4">
              <Select
                label="Client"
                options={clientOptions}
                value={invoiceData?.client}
                onChange={(value) => setInvoiceData({ ...invoiceData, client: value })}
                required
              />
              
              <Input
                label="Amount"
                type="number"
                placeholder="0.00"
                value={invoiceData?.amount}
                onChange={(e) => setInvoiceData({ ...invoiceData, amount: e?.target?.value })}
                required
              />
              
              <Input
                label="Description"
                type="text"
                placeholder="Invoice description"
                value={invoiceData?.description}
                onChange={(e) => setInvoiceData({ ...invoiceData, description: e?.target?.value })}
                required
              />
              
              <Input
                label="Due Date"
                type="date"
                value={invoiceData?.dueDate}
                onChange={(e) => setInvoiceData({ ...invoiceData, dueDate: e?.target?.value })}
                required
              />
              
              <div className="flex space-x-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowInvoiceModal(false)}
                  fullWidth
                >
                  Cancel
                </Button>
                <Button type="submit" fullWidth>
                  Generate Invoice
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-1020 p-4">
          <div className="bg-card border border-border rounded-lg w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h3 className="text-lg font-semibold text-foreground">Process Payment</h3>
              <button
                onClick={() => setShowPaymentModal(false)}
                className="p-2 hover:bg-muted/50 rounded-lg transition-smooth"
              >
                <Icon name="X" size={20} />
              </button>
            </div>
            
            <form onSubmit={handlePaymentSubmit} className="p-6 space-y-4">
              <Select
                label="Vendor"
                options={vendorOptions}
                value={paymentData?.vendor}
                onChange={(value) => setPaymentData({ ...paymentData, vendor: value })}
                required
              />
              
              <Input
                label="Amount"
                type="number"
                placeholder="0.00"
                value={paymentData?.amount}
                onChange={(e) => setPaymentData({ ...paymentData, amount: e?.target?.value })}
                required
              />
              
              <Input
                label="Description"
                type="text"
                placeholder="Payment description"
                value={paymentData?.description}
                onChange={(e) => setPaymentData({ ...paymentData, description: e?.target?.value })}
                required
              />
              
              <Select
                label="Payment Method"
                options={paymentMethodOptions}
                value={paymentData?.paymentMethod}
                onChange={(value) => setPaymentData({ ...paymentData, paymentMethod: value })}
                required
              />
              
              <div className="flex space-x-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowPaymentModal(false)}
                  fullWidth
                >
                  Cancel
                </Button>
                <Button type="submit" fullWidth>
                  Process Payment
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default QuickActions;