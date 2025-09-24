import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricWidget = ({ metric }) => {
  const getTrendColor = (trend) => {
    if (trend > 0) return 'text-success';
    if (trend < 0) return 'text-destructive';
    return 'text-muted-foreground';
  };

  const getTrendIcon = (trend) => {
    if (trend > 0) return 'TrendingUp';
    if (trend < 0) return 'TrendingDown';
    return 'Minus';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${metric?.iconBg}`}>
            <Icon 
              name={metric?.icon} 
              size={20} 
              color={metric?.iconColor} 
            />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{metric?.title}</h3>
            <p className="text-sm text-muted-foreground">{metric?.period}</p>
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <div className="text-2xl font-bold text-foreground">
          {metric?.value}
        </div>
        
        {metric?.trend !== undefined && (
          <div className={`flex items-center space-x-1 text-sm ${getTrendColor(metric?.trend)}`}>
            <Icon 
              name={getTrendIcon(metric?.trend)} 
              size={16} 
            />
            <span>
              {Math.abs(metric?.trend)}% vs last {metric?.period?.toLowerCase()}
            </span>
          </div>
        )}

        {metric?.subtitle && (
          <p className="text-sm text-muted-foreground">
            {metric?.subtitle}
          </p>
        )}
      </div>
    </div>
  );
};

export default MetricWidget;