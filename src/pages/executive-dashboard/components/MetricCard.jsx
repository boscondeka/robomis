import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricCard = ({ title, value, change, changeType, icon, trend, description }) => {
  const getChangeColor = () => {
    if (changeType === 'positive') return 'text-success';
    if (changeType === 'negative') return 'text-destructive';
    return 'text-muted-foreground';
  };

  const getChangeIcon = () => {
    if (changeType === 'positive') return 'TrendingUp';
    if (changeType === 'negative') return 'TrendingDown';
    return 'Minus';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-subtle hover:shadow-elevated transition-complex">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name={icon} size={20} color="var(--color-primary)" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
              {description && (
                <p className="text-xs text-muted-foreground/80">{description}</p>
              )}
            </div>
          </div>
          
          <div className="space-y-2">
            <p className="text-2xl font-bold text-foreground">{value}</p>
            
            {change && (
              <div className="flex items-center space-x-1">
                <Icon 
                  name={getChangeIcon()} 
                  size={16} 
                  color={changeType === 'positive' ? 'var(--color-success)' : changeType === 'negative' ? 'var(--color-destructive)' : 'currentColor'} 
                />
                <span className={`text-sm font-medium ${getChangeColor()}`}>
                  {change}
                </span>
                <span className="text-xs text-muted-foreground">vs last month</span>
              </div>
            )}
          </div>
        </div>
        
        {trend && (
          <div className="w-16 h-8 ml-4">
            <div className="w-full h-full bg-muted/30 rounded flex items-end justify-center space-x-0.5">
              {trend?.map((value, index) => (
                <div
                  key={index}
                  className={`w-1 rounded-t ${
                    value > 50 ? 'bg-success' : value > 25 ? 'bg-warning' : 'bg-muted'
                  }`}
                  style={{ height: `${Math.max(value, 10)}%` }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MetricCard;