import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import ProjectCard from './ProjectCard';

const ProjectKanbanBoard = ({ projects, onProjectUpdate, onViewDetails }) => {
  const [draggedProject, setDraggedProject] = useState(null);

  const columns = [
    { id: 'opportunity', title: 'Opportunities', color: 'bg-blue-50 border-blue-200' },
    { id: 'bidding', title: 'Active Bids', color: 'bg-amber-50 border-amber-200' },
    { id: 'active', title: 'Active Projects', color: 'bg-green-50 border-green-200' },
    { id: 'completed', title: 'Completed', color: 'bg-gray-50 border-gray-200' },
    { id: 'on-hold', title: 'On Hold', color: 'bg-red-50 border-red-200' }
  ];

  const getProjectsByStatus = (status) => {
    return projects?.filter(project => project?.status === status);
  };

  const handleDragStart = (e, project) => {
    setDraggedProject(project);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e?.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, newStatus) => {
    e?.preventDefault();
    if (draggedProject && draggedProject?.status !== newStatus) {
      onProjectUpdate(draggedProject?.id, { status: newStatus });
    }
    setDraggedProject(null);
  };

  const getColumnStats = (status) => {
    const columnProjects = getProjectsByStatus(status);
    const totalValue = columnProjects?.reduce((sum, project) => sum + project?.value, 0);
    return {
      count: columnProjects?.length,
      value: totalValue
    };
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
      notation: 'compact'
    })?.format(amount);
  };

  return (
    <div className="flex space-x-4 overflow-x-auto pb-4">
      {columns?.map((column) => {
        const columnProjects = getProjectsByStatus(column?.id);
        const stats = getColumnStats(column?.id);
        
        return (
          <div
            key={column?.id}
            className={`
              flex-shrink-0 w-80 rounded-lg border-2 border-dashed p-4
              ${column?.color}
              ${draggedProject && draggedProject?.status !== column?.id ? 'border-primary bg-primary/5' : ''}
            `}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, column?.id)}
          >
            {/* Column Header */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-foreground text-sm">
                  {column?.title}
                </h3>
                <div className="flex items-center space-x-3 mt-1">
                  <span className="text-xs text-muted-foreground">
                    {stats?.count} projects
                  </span>
                  <span className="text-xs font-medium text-foreground">
                    {formatCurrency(stats?.value)}
                  </span>
                </div>
              </div>
              <button className="p-1 hover:bg-white/50 rounded transition-colors">
                <Icon name="Plus" size={16} />
              </button>
            </div>
            {/* Project Cards */}
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {columnProjects?.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Icon name="FolderOpen" size={32} className="mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No projects in this stage</p>
                </div>
              ) : (
                columnProjects?.map((project) => (
                  <div
                    key={project?.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, project)}
                    onClick={() => onViewDetails(project)}
                  >
                    <ProjectCard
                      project={project}
                      onStatusChange={onProjectUpdate}
                      onViewDetails={onViewDetails}
                      isDragging={draggedProject?.id === project?.id}
                    />
                  </div>
                ))
              )}
            </div>
            {/* Add Project Button */}
            <button className="w-full mt-3 p-3 border-2 border-dashed border-muted-foreground/30 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors group">
              <div className="flex items-center justify-center space-x-2 text-muted-foreground group-hover:text-primary">
                <Icon name="Plus" size={16} />
                <span className="text-sm font-medium">Add Project</span>
              </div>
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default ProjectKanbanBoard;