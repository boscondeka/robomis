import React from 'react';
import Icon from '../../../components/AppIcon';

const FinancialSummaryCards = () => {
  const summaryData = [
    {
      id: 1,
      title: "Cash Flow",
      amount: "$2,847,320",
      change: "+12.5%",
      trend: "up",
      icon: "DollarSign",
      color: "text-success",
      bgColor: "bg-success/10",
      description: "Total cash inflow this month"
    },
    {
      id: 2,
      title: "Accounts Receivable",
      amount: "$1,234,567",
      change: "-3.2%",
      trend: "down",
      icon: "TrendingUp",
      color: "text-warning",
      bgColor: "bg-warning/10",
      description: "Outstanding customer payments"
    },
    {
      id: 3,
      title: "Accounts Payable",
      amount: "$876,543",
      change: "+8.7%",
      trend: "up",
      icon: "CreditCard",
      color: "text-error",
      bgColor: "bg-error/10",
      description: "Pending vendor payments"
    },
    {
      id: 4,
      title: "Budget Utilization",
      amount: "78.4%",
      change: "+5.1%",
      trend: "up",
      icon: "PieChart",
      color: "text-primary",
      bgColor: "bg-primary/10",
      description: "Current budget consumption"
    },
    {
      id: 5,
      title: "Monthly Revenue",
      amount: "$3,456,789",
      change: "+15.3%",
      trend: "up",
      icon: "BarChart3",
      color: "text-success",
      bgColor: "bg-success/10",
      description: "Revenue generated this month"
    },
    {
      id: 6,
      title: "Operating Expenses",
      amount: "$1,987,654",
      change: "-2.8%",
      trend: "down",
      icon: "Receipt",
      color: "text-secondary",
      bgColor: "bg-secondary/10",
      description: "Total operational costs"
    }
  ];

  const getTrendIcon = (trend) => {
    return trend === 'up' ? 'TrendingUp' : 'TrendingDown';
  };

  const getTrendColor = (trend) => {
    return trend === 'up' ? 'text-success' : 'text-error';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {summaryData?.map((item) => (
        <div
          key={item?.id}
          className="bg-card border border-border rounded-lg p-6 hover:shadow-elevated transition-smooth"
        >
          <div className="flex items-start justify-between mb-4">
            <div className={`p-3 rounded-lg ${item?.bgColor}`}>
              <Icon 
                name={item?.icon} 
                size={24} 
                color={`var(--color-${item?.color?.replace('text-', '')})`}
              />
            </div>
            <div className={`flex items-center space-x-1 ${getTrendColor(item?.trend)}`}>
              <Icon name={getTrendIcon(item?.trend)} size={16} />
              <span className="text-sm font-medium">{item?.change}</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">
              {item?.title}
            </h3>
            <p className="text-2xl font-bold text-foreground">
              {item?.amount}
            </p>
            <p className="text-xs text-muted-foreground">
              {item?.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FinancialSummaryCards;