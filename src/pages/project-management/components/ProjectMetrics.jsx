import React from 'react';
import Icon from '../../../components/AppIcon';

const ProjectMetrics = ({ projects }) => {
  const calculateMetrics = () => {
    const totalProjects = projects?.length;
    const activeProjects = projects?.filter(p => p?.status === 'active')?.length;
    const completedProjects = projects?.filter(p => p?.status === 'completed')?.length;
    const onHoldProjects = projects?.filter(p => p?.status === 'on-hold')?.length;
    const biddingProjects = projects?.filter(p => p?.status === 'bidding')?.length;
    const opportunities = projects?.filter(p => p?.status === 'opportunity')?.length;

    const totalValue = projects?.reduce((sum, project) => sum + project?.value, 0);
    const activeValue = projects?.filter(p => p?.status === 'active')?.reduce((sum, project) => sum + project?.value, 0);
    const completedValue = projects?.filter(p => p?.status === 'completed')?.reduce((sum, project) => sum + project?.value, 0);

    const completionRate = totalProjects > 0 ? (completedProjects / totalProjects) * 100 : 0;

    // Calculate overdue projects
    const today = new Date();
    const overdueProjects = projects?.filter(p => 
      p?.status === 'active' && new Date(p.endDate) < today
    )?.length;

    return {
      totalProjects,
      activeProjects,
      completedProjects,
      onHoldProjects,
      biddingProjects,
      opportunities,
      totalValue,
      activeValue,
      completedValue,
      completionRate,
      overdueProjects
    };
  };

  const metrics = calculateMetrics();

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
      notation: 'compact'
    })?.format(amount);
  };

  const MetricCard = ({ title, value, subtitle, icon, color = 'text-primary', bgColor = 'bg-primary/10' }) => (
    <div className="bg-card border border-border rounded-lg p-4 hover:shadow-subtle transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <p className="text-2xl font-bold text-foreground">{value}</p>
          {subtitle && (
            <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
          )}
        </div>
        <div className={`p-3 rounded-lg ${bgColor}`}>
          <Icon name={icon} size={24} className={color} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4 mb-6">
      <MetricCard
        title="Total Projects"
        value={metrics?.totalProjects}
        subtitle="All time"
        icon="FolderKanban"
        color="text-blue-600"
        bgColor="bg-blue-100"
      />
      <MetricCard
        title="Active Projects"
        value={metrics?.activeProjects}
        subtitle="In progress"
        icon="Play"
        color="text-green-600"
        bgColor="bg-green-100"
      />
      <MetricCard
        title="Completed"
        value={metrics?.completedProjects}
        subtitle={`${metrics?.completionRate?.toFixed(1)}% completion rate`}
        icon="CheckCircle"
        color="text-emerald-600"
        bgColor="bg-emerald-100"
      />
      <MetricCard
        title="Active Bids"
        value={metrics?.biddingProjects}
        subtitle="Awaiting results"
        icon="Target"
        color="text-amber-600"
        bgColor="bg-amber-100"
      />
      <MetricCard
        title="Opportunities"
        value={metrics?.opportunities}
        subtitle="Pipeline"
        icon="Eye"
        color="text-purple-600"
        bgColor="bg-purple-100"
      />
      <MetricCard
        title="Overdue"
        value={metrics?.overdueProjects}
        subtitle="Need attention"
        icon="AlertTriangle"
        color="text-red-600"
        bgColor="bg-red-100"
      />
      {/* Value Metrics - Full Width Cards */}
      <div className="md:col-span-2 lg:col-span-4 xl:col-span-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <MetricCard
            title="Total Portfolio Value"
            value={formatCurrency(metrics?.totalValue)}
            subtitle="All projects combined"
            icon="DollarSign"
            color="text-green-600"
            bgColor="bg-green-100"
          />

          <MetricCard
            title="Active Project Value"
            value={formatCurrency(metrics?.activeValue)}
            subtitle="Currently in progress"
            icon="TrendingUp"
            color="text-blue-600"
            bgColor="bg-blue-100"
          />

          <MetricCard
            title="Completed Value"
            value={formatCurrency(metrics?.completedValue)}
            subtitle="Successfully delivered"
            icon="Award"
            color="text-emerald-600"
            bgColor="bg-emerald-100"
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectMetrics;