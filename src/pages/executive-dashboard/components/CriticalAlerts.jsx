import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CriticalAlerts = () => {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: 'security',
      severity: 'critical',
      title: 'Security Breach Detected',
      description: 'Unusual login activity detected from multiple IP addresses',
      timestamp: '5 minutes ago',
      module: 'Security',
      icon: 'Shield',
      actionRequired: true,
      acknowledged: false
    },
    {
      id: 2,
      type: 'system',
      severity: 'high',
      title: 'Server Performance Degradation',
      description: 'Database response time increased by 40% in the last hour',
      timestamp: '15 minutes ago',
      module: 'Infrastructure',
      icon: 'Server',
      actionRequired: true,
      acknowledged: false
    },
    {
      id: 3,
      type: 'finance',
      severity: 'high',
      title: 'Budget Threshold Exceeded',
      description: 'Marketing department exceeded Q4 budget by 15%',
      timestamp: '1 hour ago',
      module: 'Finance',
      icon: 'AlertTriangle',
      actionRequired: true,
      acknowledged: false
    },
    {
      id: 4,
      type: 'project',
      severity: 'medium',
      title: 'Project Milestone Delayed',
      description: 'Healthcare Management System Phase 2 is 3 days behind schedule',
      timestamp: '2 hours ago',
      module: 'Projects',
      icon: 'Clock',
      actionRequired: false,
      acknowledged: true
    },
    {
      id: 5,
      type: 'hr',
      severity: 'medium',
      title: 'High Employee Turnover Alert',
      description: 'Engineering department turnover rate increased to 18% this quarter',
      timestamp: '4 hours ago',
      module: 'Human Resources',
      icon: 'Users',
      actionRequired: false,
      acknowledged: false
    }
  ]);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'text-destructive bg-destructive/10 border-destructive/20';
      case 'high': return 'text-warning bg-warning/10 border-warning/20';
      case 'medium': return 'text-primary bg-primary/10 border-primary/20';
      case 'low': return 'text-muted-foreground bg-muted/10 border-muted/20';
      default: return 'text-muted-foreground bg-muted/10 border-muted/20';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'security': return 'text-destructive';
      case 'system': return 'text-warning';
      case 'finance': return 'text-accent';
      case 'project': return 'text-primary';
      case 'hr': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  const handleAcknowledge = (id) => {
    setAlerts(alerts?.map(alert => 
      alert?.id === id ? { ...alert, acknowledged: true } : alert
    ));
  };

  const handleResolve = (id) => {
    setAlerts(alerts?.filter(alert => alert?.id !== id));
  };

  const handleViewDetails = (id) => {
    console.log('Viewing details for alert:', id);
  };

  const criticalCount = alerts?.filter(alert => alert?.severity === 'critical' && !alert?.acknowledged)?.length;
  const highCount = alerts?.filter(alert => alert?.severity === 'high' && !alert?.acknowledged)?.length;

  return (
    <div className="bg-card border border-border rounded-lg shadow-subtle">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <h2 className="text-lg font-semibold text-foreground">Critical Alerts</h2>
            <div className="flex items-center space-x-2">
              {criticalCount > 0 && (
                <div className="w-6 h-6 bg-destructive rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-white">{criticalCount}</span>
                </div>
              )}
              {highCount > 0 && (
                <div className="w-6 h-6 bg-warning rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-white">{highCount}</span>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="text-sm text-muted-foreground hover:text-foreground transition-smooth">
              Filter
            </button>
            <button className="text-sm text-primary hover:text-primary/80 transition-smooth">
              View All
            </button>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {alerts?.map((alert) => (
            <div 
              key={alert?.id} 
              className={`border rounded-lg p-4 transition-complex ${
                alert?.acknowledged ? 'border-border bg-muted/20' : 'border-border hover:shadow-subtle'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start space-x-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    alert?.severity === 'critical' ? 'bg-destructive/10' : 
                    alert?.severity === 'high' ? 'bg-warning/10' : 'bg-primary/10'
                  }`}>
                    <Icon 
                      name={alert?.icon} 
                      size={20} 
                      color={
                        alert?.severity === 'critical' ? 'var(--color-destructive)' :
                        alert?.severity === 'high' ? 'var(--color-warning)' : 'var(--color-primary)'
                      }
                    />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className={`text-sm font-semibold ${alert?.acknowledged ? 'text-muted-foreground' : 'text-foreground'}`}>
                        {alert?.title}
                      </h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(alert?.severity)}`}>
                        {alert?.severity}
                      </span>
                      {alert?.acknowledged && (
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-success/10 text-success border border-success/20">
                          Acknowledged
                        </span>
                      )}
                    </div>
                    
                    <p className={`text-sm mb-2 ${alert?.acknowledged ? 'text-muted-foreground' : 'text-muted-foreground'}`}>
                      {alert?.description}
                    </p>
                    
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <span className="flex items-center space-x-1">
                        <Icon name="Building" size={12} />
                        <span>{alert?.module}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Icon name="Clock" size={12} />
                        <span>{alert?.timestamp}</span>
                      </span>
                      {alert?.actionRequired && (
                        <span className="flex items-center space-x-1 text-warning">
                          <Icon name="AlertCircle" size={12} />
                          <span>Action Required</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              {!alert?.acknowledged && (
                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Eye"
                    iconPosition="left"
                    onClick={() => handleViewDetails(alert?.id)}
                  >
                    View Details
                  </Button>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="Check"
                      iconPosition="left"
                      onClick={() => handleAcknowledge(alert?.id)}
                    >
                      Acknowledge
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      iconName="CheckCircle"
                      iconPosition="left"
                      onClick={() => handleResolve(alert?.id)}
                    >
                      Resolve
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        
        {alerts?.length === 0 && (
          <div className="text-center py-8">
            <Icon name="CheckCircle" size={48} color="var(--color-success)" className="mx-auto mb-4" />
            <p className="text-lg font-medium text-foreground mb-2">All Clear!</p>
            <p className="text-sm text-muted-foreground">No critical alerts at this time.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CriticalAlerts;