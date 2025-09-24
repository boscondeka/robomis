import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProjectListView = ({ projects, onViewDetails, onProjectUpdate }) => {
  const [sortField, setSortField] = useState('title');
  const [sortDirection, setSortDirection] = useState('asc');
  const [selectedProjects, setSelectedProjects] = useState([]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedProjects = [...projects]?.sort((a, b) => {
    let aValue = a?.[sortField];
    let bValue = b?.[sortField];

    if (sortField === 'value') {
      aValue = Number(aValue);
      bValue = Number(bValue);
    } else if (sortField === 'startDate' || sortField === 'endDate') {
      aValue = new Date(aValue);
      bValue = new Date(bValue);
    } else {
      aValue = String(aValue)?.toLowerCase();
      bValue = String(bValue)?.toLowerCase();
    }

    if (sortDirection === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    }
  });

  const handleSelectProject = (projectId) => {
    setSelectedProjects(prev => 
      prev?.includes(projectId) 
        ? prev?.filter(id => id !== projectId)
        : [...prev, projectId]
    );
  };

  const handleSelectAll = () => {
    if (selectedProjects?.length === projects?.length) {
      setSelectedProjects([]);
    } else {
      setSelectedProjects(projects?.map(p => p?.id));
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'opportunity': 'bg-blue-100 text-blue-800',
      'bidding': 'bg-amber-100 text-amber-800',
      'active': 'bg-green-100 text-green-800',
      'completed': 'bg-gray-100 text-gray-800',
      'on-hold': 'bg-red-100 text-red-800'
    };
    return colors?.[status] || 'bg-gray-100 text-gray-800';
  };

  const getPriorityColor = (priority) => {
    const colors = {
      'high': 'text-red-600',
      'medium': 'text-amber-600',
      'low': 'text-green-600'
    };
    return colors?.[priority] || 'text-gray-600';
  };

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
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const SortableHeader = ({ field, children }) => (
    <th 
      className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider cursor-pointer hover:bg-muted/50 transition-colors"
      onClick={() => handleSort(field)}
    >
      <div className="flex items-center space-x-1">
        <span>{children}</span>
        <div className="flex flex-col">
          <Icon 
            name="ChevronUp" 
            size={12} 
            className={`${sortField === field && sortDirection === 'asc' ? 'text-primary' : 'text-gray-300'}`}
          />
          <Icon 
            name="ChevronDown" 
            size={12} 
            className={`${sortField === field && sortDirection === 'desc' ? 'text-primary' : 'text-gray-300'} -mt-1`}
          />
        </div>
      </div>
    </th>
  );

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Bulk Actions */}
      {selectedProjects?.length > 0 && (
        <div className="bg-primary/10 border-b border-border px-6 py-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-foreground">
              {selectedProjects?.length} project{selectedProjects?.length !== 1 ? 's' : ''} selected
            </span>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                Update Status
              </Button>
              <Button variant="outline" size="sm">
                Assign Team
              </Button>
              <Button variant="outline" size="sm">
                Export
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-border">
          <thead className="bg-muted/30">
            <tr>
              <th className="px-6 py-3 text-left">
                <input
                  type="checkbox"
                  checked={selectedProjects?.length === projects?.length && projects?.length > 0}
                  onChange={handleSelectAll}
                  className="rounded border-border text-primary focus:ring-primary"
                />
              </th>
              <SortableHeader field="title">Project</SortableHeader>
              <SortableHeader field="client">Client</SortableHeader>
              <SortableHeader field="status">Status</SortableHeader>
              <SortableHeader field="priority">Priority</SortableHeader>
              <SortableHeader field="value">Value</SortableHeader>
              <SortableHeader field="startDate">Start Date</SortableHeader>
              <SortableHeader field="endDate">End Date</SortableHeader>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Team
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-card divide-y divide-border">
            {sortedProjects?.map((project) => (
              <tr 
                key={project?.id} 
                className="hover:bg-muted/30 transition-colors cursor-pointer"
                onClick={() => onViewDetails(project)}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={selectedProjects?.includes(project?.id)}
                    onChange={(e) => {
                      e?.stopPropagation();
                      handleSelectProject(project?.id);
                    }}
                    className="rounded border-border text-primary focus:ring-primary"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-foreground">{project?.title}</div>
                    <div className="text-sm text-muted-foreground truncate max-w-xs">
                      {project?.description || 'No description'}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-foreground">{project?.client}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(project?.status)}`}>
                    {project?.status?.replace('-', ' ')?.toUpperCase()}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Icon 
                      name="Flag" 
                      size={14} 
                      className={`mr-1 ${getPriorityColor(project?.priority)}`}
                    />
                    <span className="text-sm text-foreground capitalize">{project?.priority}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-foreground">
                    {formatCurrency(project?.value)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-foreground">{formatDate(project?.startDate)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-foreground">{formatDate(project?.endDate)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex -space-x-1">
                    {project?.teamMembers?.slice(0, 3)?.map((member, index) => (
                      <div
                        key={index}
                        className="w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center border-2 border-card font-medium"
                        title={member?.name}
                      >
                        {member?.name?.charAt(0)}
                      </div>
                    ))}
                    {project?.teamMembers?.length > 3 && (
                      <div className="w-6 h-6 rounded-full bg-muted text-muted-foreground text-xs flex items-center justify-center border-2 border-card">
                        +{project?.teamMembers?.length - 3}
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Eye"
                      onClick={(e) => {
                        e?.stopPropagation();
                        onViewDetails(project);
                      }}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Edit"
                      onClick={(e) => {
                        e?.stopPropagation();
                        // Handle edit
                      }}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="MoreHorizontal"
                      onClick={(e) => {
                        e?.stopPropagation();
                        // Handle more options
                      }}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Empty State */}
      {projects?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="FolderOpen" size={48} className="mx-auto text-muted-foreground/50 mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No projects found</h3>
          <p className="text-muted-foreground mb-4">Get started by creating your first project</p>
          <Button iconName="Plus">Create Project</Button>
        </div>
      )}
    </div>
  );
};

export default ProjectListView;