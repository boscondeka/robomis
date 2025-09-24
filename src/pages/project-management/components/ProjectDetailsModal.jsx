import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';


const ProjectDetailsModal = ({ project, isOpen, onClose, onUpdate }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [editedProject, setEditedProject] = useState(project || {});

  if (!isOpen || !project) return null;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'Info' },
    { id: 'timeline', label: 'Timeline', icon: 'Calendar' },
    { id: 'team', label: 'Team', icon: 'Users' },
    { id: 'documents', label: 'Documents', icon: 'FileText' },
    { id: 'financials', label: 'Financials', icon: 'DollarSign' }
  ];

  const statusOptions = [
    { value: 'opportunity', label: 'Opportunity' },
    { value: 'bidding', label: 'Bidding' },
    { value: 'active', label: 'Active' },
    { value: 'completed', label: 'Completed' },
    { value: 'on-hold', label: 'On Hold' }
  ];

  const priorityOptions = [
    { value: 'low', label: 'Low Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'high', label: 'High Priority' }
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })?.format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleSave = () => {
    onUpdate(editedProject?.id, editedProject);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProject(project);
    setIsEditing(false);
  };

  const OverviewTab = () => (
    <div className="space-y-6">
      {isEditing ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Project Title"
            value={editedProject?.title || ''}
            onChange={(e) => setEditedProject({...editedProject, title: e?.target?.value})}
          />
          <Input
            label="Client"
            value={editedProject?.client || ''}
            onChange={(e) => setEditedProject({...editedProject, client: e?.target?.value})}
          />
          <Select
            label="Status"
            options={statusOptions}
            value={editedProject?.status || ''}
            onChange={(value) => setEditedProject({...editedProject, status: value})}
          />
          <Select
            label="Priority"
            options={priorityOptions}
            value={editedProject?.priority || ''}
            onChange={(value) => setEditedProject({...editedProject, priority: value})}
          />
          <Input
            label="Project Value"
            type="number"
            value={editedProject?.value || ''}
            onChange={(e) => setEditedProject({...editedProject, value: parseInt(e?.target?.value)})}
          />
          <Input
            label="Start Date"
            type="date"
            value={editedProject?.startDate || ''}
            onChange={(e) => setEditedProject({...editedProject, startDate: e?.target?.value})}
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Project Title</label>
              <p className="text-lg font-semibold text-foreground">{project?.title}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Client</label>
              <p className="text-foreground">{project?.client}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Status</label>
              <span className={`
                inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border mt-1
                ${project?.status === 'active' ? 'bg-green-100 text-green-800 border-green-200' : ''}
                ${project?.status === 'completed' ? 'bg-gray-100 text-gray-800 border-gray-200' : ''}
                ${project?.status === 'bidding' ? 'bg-amber-100 text-amber-800 border-amber-200' : ''}
                ${project?.status === 'opportunity' ? 'bg-blue-100 text-blue-800 border-blue-200' : ''}
                ${project?.status === 'on-hold' ? 'bg-red-100 text-red-800 border-red-200' : ''}
              `}>
                {project?.status?.replace('-', ' ')?.toUpperCase()}
              </span>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Project Value</label>
              <p className="text-lg font-semibold text-foreground">{formatCurrency(project?.value)}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Priority</label>
              <div className="flex items-center mt-1">
                <Icon 
                  name="Flag" 
                  size={16} 
                  className={`mr-2 ${
                    project?.priority === 'high' ? 'text-red-600' : 
                    project?.priority === 'medium' ? 'text-amber-600' : 'text-green-600'
                  }`}
                />
                <span className="text-foreground capitalize">{project?.priority} Priority</span>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Duration</label>
              <p className="text-foreground">
                {formatDate(project?.startDate)} - {formatDate(project?.endDate)}
              </p>
            </div>
          </div>
        </div>
      )}

      <div>
        <label className="text-sm font-medium text-muted-foreground">Description</label>
        <p className="text-foreground mt-1 leading-relaxed">
          {project?.description || "No description available for this project."}
        </p>
      </div>
    </div>
  );

  const TimelineTab = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-medium text-foreground">Project Milestones</h4>
        <Button variant="outline" size="sm" iconName="Plus">
          Add Milestone
        </Button>
      </div>
      
      <div className="space-y-4">
        {project?.milestones?.map((milestone, index) => (
          <div key={index} className="flex items-start space-x-4 p-4 border border-border rounded-lg">
            <div className={`
              w-3 h-3 rounded-full mt-2 flex-shrink-0
              ${milestone?.completed ? 'bg-green-500' : 'bg-gray-300'}
            `} />
            <div className="flex-1">
              <h5 className="font-medium text-foreground">{milestone?.title}</h5>
              <p className="text-sm text-muted-foreground mt-1">{milestone?.description}</p>
              <div className="flex items-center space-x-4 mt-2">
                <span className="text-xs text-muted-foreground">
                  Due: {formatDate(milestone?.dueDate)}
                </span>
                {milestone?.completed && (
                  <span className="text-xs text-green-600 font-medium">Completed</span>
                )}
              </div>
            </div>
          </div>
        )) || (
          <div className="text-center py-8 text-muted-foreground">
            <Icon name="Calendar" size={32} className="mx-auto mb-2 opacity-50" />
            <p>No milestones defined for this project</p>
          </div>
        )}
      </div>
    </div>
  );

  const TeamTab = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-medium text-foreground">Team Members</h4>
        <Button variant="outline" size="sm" iconName="UserPlus">
          Add Member
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {project?.teamMembers?.map((member, index) => (
          <div key={index} className="flex items-center space-x-3 p-4 border border-border rounded-lg">
            <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-medium">
              {member?.name?.charAt(0)}
            </div>
            <div className="flex-1">
              <h5 className="font-medium text-foreground">{member?.name}</h5>
              <p className="text-sm text-muted-foreground">{member?.role}</p>
            </div>
            <Button variant="ghost" size="sm" iconName="MoreHorizontal" />
          </div>
        )) || (
          <div className="col-span-2 text-center py-8 text-muted-foreground">
            <Icon name="Users" size={32} className="mx-auto mb-2 opacity-50" />
            <p>No team members assigned</p>
          </div>
        )}
      </div>
    </div>
  );

  const DocumentsTab = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-medium text-foreground">Project Documents</h4>
        <Button variant="outline" size="sm" iconName="Upload">
          Upload Document
        </Button>
      </div>
      
      <div className="space-y-2">
        {project?.documents?.map((doc, index) => (
          <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted/50">
            <div className="flex items-center space-x-3">
              <Icon name="FileText" size={20} className="text-muted-foreground" />
              <div>
                <p className="font-medium text-foreground">{doc?.name}</p>
                <p className="text-xs text-muted-foreground">
                  {doc?.size} • Uploaded {formatDate(doc?.uploadDate)}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" iconName="Download" />
              <Button variant="ghost" size="sm" iconName="MoreHorizontal" />
            </div>
          </div>
        )) || (
          <div className="text-center py-8 text-muted-foreground">
            <Icon name="FileText" size={32} className="mx-auto mb-2 opacity-50" />
            <p>No documents uploaded</p>
          </div>
        )}
      </div>
    </div>
  );

  const FinancialsTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 border border-border rounded-lg">
          <h5 className="font-medium text-muted-foreground mb-2">Total Budget</h5>
          <p className="text-2xl font-bold text-foreground">{formatCurrency(project?.value)}</p>
        </div>
        <div className="p-4 border border-border rounded-lg">
          <h5 className="font-medium text-muted-foreground mb-2">Spent</h5>
          <p className="text-2xl font-bold text-foreground">{formatCurrency(project?.spent || 0)}</p>
        </div>
        <div className="p-4 border border-border rounded-lg">
          <h5 className="font-medium text-muted-foreground mb-2">Remaining</h5>
          <p className="text-2xl font-bold text-foreground">{formatCurrency(project?.value - (project?.spent || 0))}</p>
        </div>
      </div>

      <div>
        <h4 className="font-medium text-foreground mb-4">Recent Transactions</h4>
        <div className="space-y-2">
          {project?.transactions?.map((transaction, index) => (
            <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
              <div>
                <p className="font-medium text-foreground">{transaction?.description}</p>
                <p className="text-sm text-muted-foreground">{formatDate(transaction?.date)}</p>
              </div>
              <p className={`font-semibold ${transaction?.type === 'expense' ? 'text-red-600' : 'text-green-600'}`}>
                {transaction?.type === 'expense' ? '-' : '+'}{formatCurrency(transaction?.amount)}
              </p>
            </div>
          )) || (
            <div className="text-center py-8 text-muted-foreground">
              <Icon name="DollarSign" size={32} className="mx-auto mb-2 opacity-50" />
              <p>No financial transactions recorded</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg shadow-modal w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-foreground">{project?.title}</h2>
            <p className="text-sm text-muted-foreground">{project?.client}</p>
          </div>
          <div className="flex items-center space-x-2">
            {isEditing ? (
              <>
                <Button variant="outline" onClick={handleCancel}>Cancel</Button>
                <Button onClick={handleSave}>Save Changes</Button>
              </>
            ) : (
              <Button variant="outline" onClick={() => setIsEditing(true)} iconName="Edit">
                Edit
              </Button>
            )}
            <Button variant="ghost" onClick={onClose} iconName="X" />
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-border">
          <nav className="flex space-x-8 px-6">
            {tabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`
                  flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors
                  ${activeTab === tab?.id 
                    ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground'
                  }
                `}
              >
                <Icon name={tab?.icon} size={16} />
                <span>{tab?.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-96">
          {activeTab === 'overview' && <OverviewTab />}
          {activeTab === 'timeline' && <TimelineTab />}
          {activeTab === 'team' && <TeamTab />}
          {activeTab === 'documents' && <DocumentsTab />}
          {activeTab === 'financials' && <FinancialsTab />}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsModal;