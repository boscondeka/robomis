import React, { useState, useEffect } from 'react';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import NavigationBreadcrumbs from '../../components/ui/NavigationBreadcrumbs';
import ProjectKanbanBoard from './components/ProjectKanbanBoard';
import ProjectListView from './components/ProjectListView';
import ProjectFilters from './components/ProjectFilters';
import ProjectMetrics from './components/ProjectMetrics';
import ProjectDetailsModal from './components/ProjectDetailsModal';

const ProjectManagement = () => {
  const [activeView, setActiveView] = useState('kanban');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    priority: 'all',
    client: 'all',
    teamMember: 'all',
    startDateFrom: '',
    startDateTo: '',
    endDateFrom: '',
    endDateTo: '',
    minValue: '',
    maxValue: ''
  });

  // Mock project data
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: "Enterprise CRM Implementation",
      client: "Acme Corporation",
      status: "active",
      priority: "high",
      value: 250000,
      startDate: "2024-01-15",
      endDate: "2024-06-30",
      description: `Comprehensive CRM system implementation for Acme Corporation including data migration, custom integrations, and staff training. The project involves modernizing their customer management processes and implementing automated workflows to improve efficiency.`,
      teamMembers: [
        { name: "John Doe", role: "Project Manager" },
        { name: "Jane Smith", role: "Lead Developer" },
        { name: "Mike Johnson", role: "Business Analyst" },
        { name: "Sarah Wilson", role: "UI/UX Designer" }
      ],
      spent: 125000,
      milestones: [
        {
          title: "Requirements Gathering",
          description: "Complete analysis of current systems and requirements",
          dueDate: "2024-02-15",
          completed: true
        },
        {
          title: "System Design",
          description: "Create detailed system architecture and design documents",
          dueDate: "2024-03-15",
          completed: true
        },
        {
          title: "Development Phase 1",
          description: "Core CRM functionality development",
          dueDate: "2024-04-30",
          completed: false
        }
      ],
      documents: [
        {
          name: "Project Requirements.pdf",
          size: "2.4 MB",
          uploadDate: "2024-01-20"
        },
        {
          name: "System Architecture.docx",
          size: "1.8 MB",
          uploadDate: "2024-02-10"
        }
      ],
      transactions: [
        {
          description: "Initial Payment",
          amount: 75000,
          date: "2024-01-15",
          type: "income"
        },
        {
          description: "Development Tools License",
          amount: 5000,
          date: "2024-02-01",
          type: "expense"
        }
      ]
    },
    {
      id: 2,
      title: "Mobile App Development",
      client: "Tech Solutions Inc",
      status: "bidding",
      priority: "medium",
      value: 180000,
      startDate: "2024-03-01",
      endDate: "2024-08-15",
      description: `Native mobile application development for iOS and Android platforms with real-time synchronization and offline capabilities.`,
      teamMembers: [
        { name: "David Brown", role: "Mobile Developer" },
        { name: "Lisa Garcia", role: "QA Engineer" }
      ],
      spent: 0,
      milestones: [],
      documents: [
        {
          name: "Proposal Document.pdf",
          size: "3.2 MB",
          uploadDate: "2024-02-20"
        }
      ],
      transactions: []
    },
    {
      id: 3,
      title: "Data Analytics Platform",
      client: "Global Systems Ltd",
      status: "completed",
      priority: "high",
      value: 320000,
      startDate: "2023-09-01",
      endDate: "2024-02-28",
      description: `Advanced data analytics platform with machine learning capabilities for business intelligence and predictive analytics.`,
      teamMembers: [
        { name: "Robert Chen", role: "Data Scientist" },
        { name: "Emily Davis", role: "Backend Developer" },
        { name: "Alex Thompson", role: "DevOps Engineer" }
      ],
      spent: 295000,
      milestones: [
        {
          title: "Data Pipeline Setup",
          description: "Establish data ingestion and processing pipelines",
          dueDate: "2023-10-15",
          completed: true
        },
        {
          title: "ML Model Development",
          description: "Develop and train machine learning models",
          dueDate: "2023-12-15",
          completed: true
        },
        {
          title: "Platform Deployment",
          description: "Deploy platform to production environment",
          dueDate: "2024-02-15",
          completed: true
        }
      ],
      documents: [
        {
          name: "Technical Specification.pdf",
          size: "4.1 MB",
          uploadDate: "2023-09-05"
        },
        {
          name: "User Manual.pdf",
          size: "2.8 MB",
          uploadDate: "2024-02-25"
        }
      ],
      transactions: [
        {
          description: "Project Completion Payment",
          amount: 160000,
          date: "2024-02-28",
          type: "income"
        },
        {
          description: "Cloud Infrastructure",
          amount: 25000,
          date: "2024-01-15",
          type: "expense"
        }
      ]
    },
    {
      id: 4,
      title: "E-commerce Platform Upgrade",
      client: "Innovate & Co",
      status: "on-hold",
      priority: "low",
      value: 95000,
      startDate: "2024-02-01",
      endDate: "2024-05-30",
      description: `Upgrade existing e-commerce platform with modern features including payment gateway integration and inventory management.`,
      teamMembers: [
        { name: "Kevin Martinez", role: "Full Stack Developer" }
      ],
      spent: 15000,
      milestones: [
        {
          title: "Current System Analysis",
          description: "Analyze existing platform and identify upgrade requirements",
          dueDate: "2024-02-15",
          completed: true
        }
      ],
      documents: [
        {
          name: "Current System Analysis.pdf",
          size: "1.5 MB",
          uploadDate: "2024-02-16"
        }
      ],
      transactions: [
        {
          description: "Initial Analysis Payment",
          amount: 15000,
          date: "2024-02-01",
          type: "income"
        }
      ]
    },
    {
      id: 5,
      title: "Cloud Migration Services",
      client: "Future Tech Partners",
      status: "opportunity",
      priority: "medium",
      value: 150000,
      startDate: "2024-04-01",
      endDate: "2024-07-31",
      description: `Complete cloud migration strategy and implementation for legacy systems with minimal downtime and data integrity assurance.`,
      teamMembers: [],
      spent: 0,
      milestones: [],
      documents: [],
      transactions: []
    },
    {
      id: 6,
      title: "Security Audit & Compliance",
      client: "Acme Corporation",
      status: "active",
      priority: "high",
      value: 75000,
      startDate: "2024-02-15",
      endDate: "2024-04-15",
      description: `Comprehensive security audit and compliance assessment with remediation recommendations for SOC 2 certification.`,
      teamMembers: [
        { name: "Rachel Green", role: "Security Consultant" },
        { name: "Tom Wilson", role: "Compliance Specialist" }
      ],
      spent: 25000,
      milestones: [
        {
          title: "Initial Security Assessment",
          description: "Conduct preliminary security vulnerability assessment",
          dueDate: "2024-03-01",
          completed: true
        },
        {
          title: "Compliance Gap Analysis",
          description: "Identify gaps in current compliance posture",
          dueDate: "2024-03-15",
          completed: false
        }
      ],
      documents: [
        {
          name: "Security Assessment Report.pdf",
          size: "3.7 MB",
          uploadDate: "2024-03-02"
        }
      ],
      transactions: [
        {
          description: "Security Tools License",
          amount: 8000,
          date: "2024-02-20",
          type: "expense"
        }
      ]
    }
  ]);

  const filteredProjects = projects?.filter(project => {
    // Search filter
    if (filters?.search && !project?.title?.toLowerCase()?.includes(filters?.search?.toLowerCase()) &&
        !project?.client?.toLowerCase()?.includes(filters?.search?.toLowerCase())) {
      return false;
    }

    // Status filter
    if (filters?.status !== 'all' && project?.status !== filters?.status) {
      return false;
    }

    // Priority filter
    if (filters?.priority !== 'all' && project?.priority !== filters?.priority) {
      return false;
    }

    // Client filter
    if (filters?.client !== 'all') {
      const clientSlug = project?.client?.toLowerCase()?.replace(/\s+/g, '-')?.replace(/[^\w-]/g, '');
      if (clientSlug !== filters?.client) {
        return false;
      }
    }

    // Team member filter
    if (filters?.teamMember !== 'all') {
      const memberSlug = filters?.teamMember;
      const hasTeamMember = project?.teamMembers?.some(member => 
        member?.name?.toLowerCase()?.replace(/\s+/g, '-') === memberSlug
      );
      if (!hasTeamMember) {
        return false;
      }
    }

    // Date filters
    if (filters?.startDateFrom && new Date(project.startDate) < new Date(filters.startDateFrom)) {
      return false;
    }
    if (filters?.startDateTo && new Date(project.startDate) > new Date(filters.startDateTo)) {
      return false;
    }
    if (filters?.endDateFrom && new Date(project.endDate) < new Date(filters.endDateFrom)) {
      return false;
    }
    if (filters?.endDateTo && new Date(project.endDate) > new Date(filters.endDateTo)) {
      return false;
    }

    // Value filters
    if (filters?.minValue && project?.value < parseInt(filters?.minValue)) {
      return false;
    }
    if (filters?.maxValue && project?.value > parseInt(filters?.maxValue)) {
      return false;
    }

    return true;
  });

  const handleProjectUpdate = (projectId, updates) => {
    setProjects(prevProjects =>
      prevProjects?.map(project =>
        project?.id === projectId ? { ...project, ...updates } : project
      )
    );
  };

  const handleViewDetails = (project) => {
    setSelectedProject(project);
    setIsDetailsModalOpen(true);
  };

  const handleCloseDetails = () => {
    setIsDetailsModalOpen(false);
    setSelectedProject(null);
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      status: 'all',
      priority: 'all',
      client: 'all',
      teamMember: 'all',
      startDateFrom: '',
      startDateTo: '',
      endDateFrom: '',
      endDateTo: '',
      minValue: '',
      maxValue: ''
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumbs */}
        <NavigationBreadcrumbs />

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Project Management</h1>
            <p className="text-muted-foreground mt-2">
              Manage your projects from opportunity to completion
            </p>
          </div>
          <div className="flex items-center space-x-3 mt-4 sm:mt-0">
            <Button variant="outline" iconName="Download">
              Export
            </Button>
            <Button iconName="Plus">
              New Project
            </Button>
          </div>
        </div>

        {/* Metrics */}
        <ProjectMetrics projects={filteredProjects} />

        {/* Filters */}
        <ProjectFilters
          filters={filters}
          onFilterChange={setFilters}
          onClearFilters={handleClearFilters}
        />

        {/* View Toggle */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">View:</span>
            <div className="flex items-center bg-muted rounded-lg p-1">
              <button
                onClick={() => setActiveView('kanban')}
                className={`
                  flex items-center space-x-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors
                  ${activeView === 'kanban' ?'bg-card text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
                  }
                `}
              >
                <Icon name="Kanban" size={16} />
                <span>Kanban</span>
              </button>
              <button
                onClick={() => setActiveView('list')}
                className={`
                  flex items-center space-x-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors
                  ${activeView === 'list' ?'bg-card text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
                  }
                `}
              >
                <Icon name="List" size={16} />
                <span>List</span>
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <span>Showing {filteredProjects?.length} of {projects?.length} projects</span>
          </div>
        </div>

        {/* Project Views */}
        {activeView === 'kanban' ? (
          <ProjectKanbanBoard
            projects={filteredProjects}
            onProjectUpdate={handleProjectUpdate}
            onViewDetails={handleViewDetails}
          />
        ) : (
          <ProjectListView
            projects={filteredProjects}
            onViewDetails={handleViewDetails}
            onProjectUpdate={handleProjectUpdate}
          />
        )}

        {/* Project Details Modal */}
        <ProjectDetailsModal
          project={selectedProject}
          isOpen={isDetailsModalOpen}
          onClose={handleCloseDetails}
          onUpdate={handleProjectUpdate}
        />
      </div>
    </div>
  );
};

export default ProjectManagement;