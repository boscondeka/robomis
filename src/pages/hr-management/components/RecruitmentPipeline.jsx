import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const RecruitmentPipeline = ({ candidates, onCandidateAction }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPosition, setFilterPosition] = useState('');
  const [filterStage, setFilterStage] = useState('');

  const positions = [
    { value: '', label: 'All Positions' },
    { value: 'software-engineer', label: 'Software Engineer' },
    { value: 'product-manager', label: 'Product Manager' },
    { value: 'ui-designer', label: 'UI/UX Designer' },
    { value: 'data-analyst', label: 'Data Analyst' },
    { value: 'marketing-specialist', label: 'Marketing Specialist' }
  ];

  const stages = [
    { value: '', label: 'All Stages' },
    { value: 'applied', label: 'Applied' },
    { value: 'screening', label: 'Screening' },
    { value: 'interview', label: 'Interview' },
    { value: 'technical', label: 'Technical Test' },
    { value: 'final', label: 'Final Review' },
    { value: 'offer', label: 'Offer Extended' },
    { value: 'hired', label: 'Hired' },
    { value: 'rejected', label: 'Rejected' }
  ];

  const filteredCandidates = candidates?.filter(candidate => {
    const matchesSearch = candidate?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         candidate?.email?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    const matchesPosition = !filterPosition || candidate?.position === filterPosition;
    const matchesStage = !filterStage || candidate?.stage === filterStage;
    
    return matchesSearch && matchesPosition && matchesStage;
  });

  const getStageColor = (stage) => {
    const stageColors = {
      applied: 'bg-blue-100 text-blue-800',
      screening: 'bg-yellow-100 text-yellow-800',
      interview: 'bg-purple-100 text-purple-800',
      technical: 'bg-orange-100 text-orange-800',
      final: 'bg-indigo-100 text-indigo-800',
      offer: 'bg-green-100 text-green-800',
      hired: 'bg-emerald-100 text-emerald-800',
      rejected: 'bg-red-100 text-red-800'
    };
    return stageColors?.[stage] || 'bg-gray-100 text-gray-800';
  };

  const getStageName = (stage) => {
    const stageNames = {
      applied: 'Applied',
      screening: 'Screening',
      interview: 'Interview',
      technical: 'Technical Test',
      final: 'Final Review',
      offer: 'Offer Extended',
      hired: 'Hired',
      rejected: 'Rejected'
    };
    return stageNames?.[stage] || stage;
  };

  const getPriorityIcon = (priority) => {
    const priorityConfig = {
      high: { icon: 'AlertTriangle', color: 'text-red-500' },
      medium: { icon: 'Clock', color: 'text-yellow-500' },
      low: { icon: 'Minus', color: 'text-green-500' }
    };
    const config = priorityConfig?.[priority] || priorityConfig?.medium;
    return <Icon name={config?.icon} size={16} className={config?.color} />;
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <Input
            type="search"
            placeholder="Search candidates by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e?.target?.value)}
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Select
            options={positions}
            value={filterPosition}
            onChange={setFilterPosition}
            placeholder="Position"
            className="w-full sm:w-48"
          />
          <Select
            options={stages}
            value={filterStage}
            onChange={setFilterStage}
            placeholder="Stage"
            className="w-full sm:w-40"
          />
        </div>
      </div>
      {/* Pipeline Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
        {stages?.slice(1)?.map((stage) => {
          const count = candidates?.filter(c => c?.stage === stage?.value)?.length;
          return (
            <div key={stage?.value} className="bg-card border border-border rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-foreground">{count}</div>
              <div className="text-xs text-muted-foreground mt-1">{stage?.label}</div>
            </div>
          );
        })}
      </div>
      {/* Candidates List */}
      <div className="space-y-4">
        {filteredCandidates?.map((candidate) => (
          <div key={candidate?.id} className="bg-card border border-border rounded-lg p-6 hover:shadow-subtle transition-smooth">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-muted">
                  <Image
                    src={candidate?.avatar}
                    alt={candidate?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-foreground">{candidate?.name}</h3>
                    {getPriorityIcon(candidate?.priority)}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{candidate?.email}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Icon name="Briefcase" size={14} />
                      {candidate?.position?.replace('-', ' ')?.replace(/\b\w/g, l => l?.toUpperCase())}
                    </span>
                    <span className="flex items-center gap-1">
                      <Icon name="Calendar" size={14} />
                      Applied {new Date(candidate.appliedDate)?.toLocaleDateString('en-US')}
                    </span>
                    <span className="flex items-center gap-1">
                      <Icon name="Star" size={14} />
                      {candidate?.rating}/5
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStageColor(candidate?.stage)}`}>
                  {getStageName(candidate?.stage)}
                </span>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Eye"
                    onClick={() => onCandidateAction('view', candidate)}
                  >
                    View
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="MessageSquare"
                    onClick={() => onCandidateAction('message', candidate)}
                  >
                    Message
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="ArrowRight"
                    onClick={() => onCandidateAction('advance', candidate)}
                  >
                    Advance
                  </Button>
                </div>
              </div>
            </div>

            {/* Skills */}
            {candidate?.skills && candidate?.skills?.length > 0 && (
              <div className="mt-4">
                <div className="flex flex-wrap gap-2">
                  {candidate?.skills?.map((skill, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Notes */}
            {candidate?.notes && (
              <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                <p className="text-sm text-foreground">{candidate?.notes}</p>
              </div>
            )}
          </div>
        ))}
      </div>
      {filteredCandidates?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Users" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No candidates found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </div>
  );
};

export default RecruitmentPipeline;