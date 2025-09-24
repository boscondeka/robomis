import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ProjectCard from './components/ProjectCard';
import InvoiceCard from './components/InvoiceCard';
import SupportTicketCard from './components/SupportTicketCard';
import DocumentCard from './components/DocumentCard';
import AccountSummary from './components/AccountSummary';
import QuickActions from './components/QuickActions';

const ClientPortal = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedProject, setSelectedProject] = useState(null);

  // Mock data for client portal
  const clientData = {
    name: "TechCorp Solutions",
    contactPerson: "Sarah Johnson",
    email: "sarah.johnson@techcorp.com",
    phone: "+1 (555) 123-4567",
    accountManager: "Michael Rodriguez"
  };

  const projects = [
    {
      id: 1,
      name: "Enterprise CRM Implementation",
      description: "Complete customer relationship management system deployment with custom integrations and staff training.",
      status: "Active",
      priority: "High",
      progress: 75,
      value: 125000,
      startDate: "01/15/2024",
      endDate: "06/30/2024",
      nextMilestone: "User Acceptance Testing - 03/15/2024"
    },
    {
      id: 2,
      name: "Data Migration & Analytics",
      description: "Legacy system data migration to cloud infrastructure with advanced analytics dashboard implementation.",
      status: "Active",
      priority: "Medium",
      progress: 45,
      value: 85000,
      startDate: "02/01/2024",
      endDate: "05/15/2024",
      nextMilestone: "Data Validation Phase - 03/20/2024"
    },
    {
      id: 3,
      name: "Security Audit & Compliance",
      description: "Comprehensive security assessment and compliance framework implementation for regulatory requirements.",
      status: "Completed",
      priority: "High",
      progress: 100,
      value: 45000,
      startDate: "11/01/2023",
      endDate: "01/31/2024",
      nextMilestone: "Project Completed"
    }
  ];

  const invoices = [
    {
      id: 1,
      number: "INV-2024-001",
      description: "CRM Implementation - Phase 2 Milestone",
      projectName: "Enterprise CRM Implementation",
      amount: 35000,
      status: "Pending",
      issueDate: "02/15/2024",
      dueDate: "03/15/2024",
      overdueDays: 0
    },
    {
      id: 2,
      number: "INV-2024-002",
      description: "Data Migration Services - Initial Setup",
      projectName: "Data Migration & Analytics",
      amount: 25000,
      status: "Overdue",
      issueDate: "01/30/2024",
      dueDate: "02/28/2024",
      overdueDays: 15
    },
    {
      id: 3,
      number: "INV-2023-045",
      description: "Security Audit - Final Payment",
      projectName: "Security Audit & Compliance",
      amount: 15000,
      status: "Paid",
      issueDate: "01/15/2024",
      dueDate: "02/15/2024",
      overdueDays: 0
    }
  ];

  const supportTickets = [
    {
      id: "TKT-2024-001",
      subject: "CRM Login Issues for Multiple Users",
      description: "Several team members are experiencing authentication problems when trying to access the new CRM system. The error message indicates \'Invalid credentials\' even with correct login information.",
      status: "In-Progress",
      priority: "High",
      createdDate: "03/10/2024",
      lastUpdated: "03/12/2024",
      assignedTo: "Alex Thompson",
      responseCount: 3,
      hasAttachments: true,
      attachmentCount: 2
    },
    {
      id: "TKT-2024-002",
      subject: "Request for Additional Analytics Dashboard",
      description: "We would like to add a custom dashboard for tracking customer engagement metrics that wasn\'t included in the original scope.",
      status: "Open",
      priority: "Medium",
      createdDate: "03/08/2024",
      lastUpdated: "03/09/2024",
      assignedTo: "Jennifer Lee",
      responseCount: 1,
      hasAttachments: false,
      attachmentCount: 0
    }
  ];

  const documents = [
    {
      id: 1,
      name: "CRM Implementation Project Plan.pdf",
      description: "Detailed project timeline and milestone breakdown for the CRM implementation project.",
      type: "pdf",
      category: "Contract",
      size: 2048576,
      modifiedDate: "03/01/2024",
      uploadedBy: "Michael Rodriguez",
      downloadCount: 12
    },
    {
      id: 2,
      name: "Monthly Progress Report - February 2024.docx",
      description: "Comprehensive progress report covering all active projects and upcoming milestones.",
      type: "docx",
      category: "Report",
      size: 1536000,
      modifiedDate: "02/28/2024",
      uploadedBy: "Project Team",
      downloadCount: 8
    },
    {
      id: 3,
      name: "Security Compliance Certificate.pdf",
      description: "Official compliance certification document following successful security audit completion.",
      type: "pdf",
      category: "Certificate",
      size: 512000,
      modifiedDate: "02/01/2024",
      uploadedBy: "Compliance Team",
      downloadCount: 5
    }
  ];

  const accountData = {
    currentBalance: -60000,
    totalPaid: 185000,
    pendingInvoices: 2,
    recentActivity: [
      {
        type: "payment",
        description: "Payment received for INV-2023-045",
        amount: 15000,
        date: "02/20/2024"
      },
      {
        type: "invoice",
        description: "New invoice generated - INV-2024-001",
        amount: 35000,
        date: "02/15/2024"
      },
      {
        type: "payment",
        description: "Payment received for INV-2023-044",
        amount: 40000,
        date: "02/10/2024"
      }
    ]
  };

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
    { id: 'projects', label: 'Projects', icon: 'FolderKanban' },
    { id: 'invoices', label: 'Invoices', icon: 'Receipt' },
    { id: 'documents', label: 'Documents', icon: 'FileText' },
    { id: 'support', label: 'Support', icon: 'HelpCircle' }
  ];

  // Event handlers
  const handleViewProjectDetails = (project) => {
    setSelectedProject(project);
    console.log('Viewing project details:', project);
  };

  const handleViewInvoice = (invoice) => {
    console.log('Viewing invoice:', invoice);
  };

  const handleMakePayment = (invoice) => {
    console.log('Making payment for invoice:', invoice);
  };

  const handleViewTicket = (ticket) => {
    console.log('Viewing support ticket:', ticket);
  };

  const handleDownloadDocument = (document) => {
    console.log('Downloading document:', document);
  };

  const handleViewDocument = (document) => {
    console.log('Viewing document:', document);
  };

  const handleViewStatement = () => {
    console.log('Viewing account statement');
  };

  const handleCreateTicket = () => {
    console.log('Creating new support ticket');
  };

  const handleViewDocuments = () => {
    setActiveTab('documents');
  };

  const handleContactSupport = () => {
    console.log('Contacting support');
  };

  useEffect(() => {
    document.title = 'Client Portal - ROBO MIS';
  }, []);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-8">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-border rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-foreground mb-2">
                    Welcome back, {clientData?.contactPerson}
                  </h1>
                  <p className="text-muted-foreground">
                    {clientData?.name} • Account Manager: {clientData?.accountManager}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Last Login</p>
                  <p className="font-medium text-foreground">March 12, 2024 at 2:30 PM</p>
                </div>
              </div>
            </div>
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-card border border-border rounded-lg p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Icon name="FolderKanban" size={24} className="text-primary" />
                </div>
                <p className="text-2xl font-bold text-foreground">{projects?.length}</p>
                <p className="text-sm text-muted-foreground">Active Projects</p>
              </div>
              
              <div className="bg-card border border-border rounded-lg p-6 text-center">
                <div className="w-12 h-12 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Icon name="Receipt" size={24} className="text-warning" />
                </div>
                <p className="text-2xl font-bold text-foreground">{accountData?.pendingInvoices}</p>
                <p className="text-sm text-muted-foreground">Pending Invoices</p>
              </div>
              
              <div className="bg-card border border-border rounded-lg p-6 text-center">
                <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Icon name="FileText" size={24} className="text-success" />
                </div>
                <p className="text-2xl font-bold text-foreground">{documents?.length}</p>
                <p className="text-sm text-muted-foreground">Documents</p>
              </div>
              
              <div className="bg-card border border-border rounded-lg p-6 text-center">
                <div className="w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Icon name="HelpCircle" size={24} className="text-destructive" />
                </div>
                <p className="text-2xl font-bold text-foreground">{supportTickets?.length}</p>
                <p className="text-sm text-muted-foreground">Open Tickets</p>
              </div>
            </div>
            {/* Main Dashboard Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <AccountSummary 
                  accountData={accountData}
                  onMakePayment={() => handleMakePayment()}
                  onViewStatement={handleViewStatement}
                />
                
                {/* Recent Projects */}
                <div className="bg-card border border-border rounded-lg p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-foreground">Active Projects</h2>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setActiveTab('projects')}
                    >
                      View All
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {projects?.filter(p => p?.status === 'Active')?.slice(0, 2)?.map(project => (
                      <ProjectCard 
                        key={project?.id}
                        project={project}
                        onViewDetails={handleViewProjectDetails}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <QuickActions 
                  onCreateTicket={handleCreateTicket}
                  onViewDocuments={handleViewDocuments}
                  onMakePayment={() => handleMakePayment()}
                  onContactSupport={handleContactSupport}
                />
              </div>
            </div>
          </div>
        );

      case 'projects':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-foreground">Projects</h1>
              <div className="flex items-center space-x-2">
                <Button variant="outline" iconName="Filter">Filter</Button>
                <Button variant="outline" iconName="Download">Export</Button>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {projects?.map(project => (
                <ProjectCard 
                  key={project?.id}
                  project={project}
                  onViewDetails={handleViewProjectDetails}
                />
              ))}
            </div>
          </div>
        );

      case 'invoices':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-foreground">Invoices</h1>
              <div className="flex items-center space-x-2">
                <Button variant="outline" iconName="Filter">Filter</Button>
                <Button variant="outline" iconName="Download">Export</Button>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {invoices?.map(invoice => (
                <InvoiceCard 
                  key={invoice?.id}
                  invoice={invoice}
                  onViewInvoice={handleViewInvoice}
                  onMakePayment={handleMakePayment}
                />
              ))}
            </div>
          </div>
        );

      case 'documents':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-foreground">Documents</h1>
              <div className="flex items-center space-x-2">
                <Button variant="outline" iconName="Search">Search</Button>
                <Button variant="outline" iconName="Filter">Filter</Button>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {documents?.map(document => (
                <DocumentCard 
                  key={document?.id}
                  document={document}
                  onDownload={handleDownloadDocument}
                  onView={handleViewDocument}
                />
              ))}
            </div>
          </div>
        );

      case 'support':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-foreground">Support Tickets</h1>
              <Button 
                variant="default"
                onClick={handleCreateTicket}
                iconName="Plus"
                iconPosition="left"
              >
                New Ticket
              </Button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {supportTickets?.map(ticket => (
                <SupportTicketCard 
                  key={ticket?.id}
                  ticket={ticket}
                  onViewTicket={handleViewTicket}
                />
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <Helmet>
        <title>Client Portal - ROBO MIS</title>
        <meta name="description" content="Access your projects, invoices, documents, and support tickets through our secure client portal." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Navigation Tabs */}
          <div className="mb-8">
            <nav className="flex space-x-1 bg-muted/50 p-1 rounded-lg">
              {tabs?.map(tab => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`
                    flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-smooth
                    ${activeTab === tab?.id 
                      ? 'bg-card text-foreground shadow-subtle' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }
                  `}
                >
                  <Icon name={tab?.icon} size={16} />
                  <span>{tab?.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          {renderTabContent()}
        </div>
      </div>
    </>
  );
};

export default ClientPortal;