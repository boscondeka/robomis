import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import NavigationBreadcrumbs from '../../components/ui/NavigationBreadcrumbs';
import EmployeeTable from './components/EmployeeTable';
import RecruitmentPipeline from './components/RecruitmentPipeline';
import PerformanceReviews from './components/PerformanceReviews';
import LeaveRequests from './components/LeaveRequests';
import AttendanceTracking from './components/AttendanceTracking';
import HRMetricsPanel from './components/HRMetricsPanel';

const HRManagement = () => {
  const [activeTab, setActiveTab] = useState('employees');

  // Mock data for employees
  const employees = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.johnson@robomis.com",
      employeeId: "EMP001",
      department: "marketing",
      role: "Marketing Manager",
      hireDate: "2022-03-15",
      status: "active",
      location: "new-york",
      employmentType: "full-time",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg"
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "michael.chen@robomis.com",
      employeeId: "EMP002",
      department: "engineering",
      role: "Senior Software Engineer",
      hireDate: "2021-08-22",
      status: "active",
      location: "san-francisco",
      employmentType: "full-time",
      avatar: "https://randomuser.me/api/portraits/men/2.jpg"
    },
    {
      id: 3,
      name: "Emily Davis",
      email: "emily.davis@robomis.com",
      employeeId: "EMP003",
      department: "sales",
      role: "Sales Representative",
      hireDate: "2023-01-10",
      status: "onLeave",
      location: "chicago",
      employmentType: "full-time",
      avatar: "https://randomuser.me/api/portraits/women/3.jpg"
    },
    {
      id: 4,
      name: "David Wilson",
      email: "david.wilson@robomis.com",
      employeeId: "EMP004",
      department: "hr",
      role: "HR Specialist",
      hireDate: "2022-11-05",
      status: "active",
      location: "remote",
      employmentType: "full-time",
      avatar: "https://randomuser.me/api/portraits/men/4.jpg"
    },
    {
      id: 5,
      name: "Lisa Anderson",
      email: "lisa.anderson@robomis.com",
      employeeId: "EMP005",
      department: "finance",
      role: "Financial Analyst",
      hireDate: "2023-06-18",
      status: "active",
      location: "new-york",
      employmentType: "part-time",
      avatar: "https://randomuser.me/api/portraits/women/5.jpg"
    }
  ];

  // Mock data for recruitment candidates
  const candidates = [
    {
      id: 1,
      name: "Alex Thompson",
      email: "alex.thompson@email.com",
      position: "software-engineer",
      stage: "interview",
      priority: "high",
      appliedDate: "2024-09-15",
      rating: 4.5,
      skills: ["React", "Node.js", "Python", "AWS"],
      notes: "Strong technical background with excellent problem-solving skills. Previous experience at tech startups.",
      avatar: "https://randomuser.me/api/portraits/men/10.jpg"
    },
    {
      id: 2,
      name: "Jessica Martinez",
      email: "jessica.martinez@email.com",
      position: "product-manager",
      stage: "final",
      priority: "high",
      appliedDate: "2024-09-10",
      rating: 4.8,
      skills: ["Product Strategy", "Agile", "Analytics", "Leadership"],
      notes: "Exceptional product management experience with proven track record of successful launches.",
      avatar: "https://randomuser.me/api/portraits/women/10.jpg"
    },
    {
      id: 3,
      name: "Robert Kim",
      email: "robert.kim@email.com",
      position: "ui-designer",
      stage: "technical",
      priority: "medium",
      appliedDate: "2024-09-12",
      rating: 4.2,
      skills: ["Figma", "Adobe Creative Suite", "Prototyping", "User Research"],
      notes: "Creative designer with strong portfolio. Good understanding of user experience principles.",
      avatar: "https://randomuser.me/api/portraits/men/11.jpg"
    }
  ];

  // Mock data for performance reviews
  const reviews = [
    {
      id: 1,
      employeeName: "Sarah Johnson",
      employeeAvatar: "https://randomuser.me/api/portraits/women/1.jpg",
      department: "Marketing",
      role: "Marketing Manager",
      reviewerName: "John Anderson",
      period: "q3-2024",
      status: "completed",
      dueDate: "2024-09-30",
      overallScore: 4.2,
      goalsMet: 8,
      totalGoals: 10,
      improvement: 15,
      keyAreas: ["Leadership", "Strategic Planning", "Team Management"],
      comments: "Sarah has shown exceptional leadership skills this quarter. Her strategic initiatives have significantly improved team performance and customer engagement metrics."
    },
    {
      id: 2,
      employeeName: "Michael Chen",
      employeeAvatar: "https://randomuser.me/api/portraits/men/2.jpg",
      department: "Engineering",
      role: "Senior Software Engineer",
      reviewerName: "Tech Lead",
      period: "q3-2024",
      status: "in-progress",
      dueDate: "2024-10-05",
      keyAreas: ["Technical Excellence", "Code Quality", "Mentoring"],
      comments: "Michael consistently delivers high-quality code and has been instrumental in mentoring junior developers."
    },
    {
      id: 3,
      employeeName: "Emily Davis",
      employeeAvatar: "https://randomuser.me/api/portraits/women/3.jpg",
      department: "Sales",
      role: "Sales Representative",
      reviewerName: "Sales Manager",
      period: "q3-2024",
      status: "pending",
      dueDate: "2024-10-10",
      keyAreas: ["Sales Performance", "Client Relations", "Product Knowledge"]
    }
  ];

  // Mock data for leave requests
  const leaveRequests = [
    {
      id: 1,
      employeeName: "Emily Davis",
      employeeAvatar: "https://randomuser.me/api/portraits/women/3.jpg",
      department: "Sales",
      role: "Sales Representative",
      type: "vacation",
      status: "pending",
      priority: "medium",
      startDate: "2024-10-15",
      endDate: "2024-10-20",
      appliedDate: "2024-09-20",
      remainingBalance: 12,
      reason: "Family vacation to celebrate wedding anniversary. Planning to visit Europe with spouse for a week-long trip.",
      attachments: [
        { name: "flight-tickets.pdf", size: "245 KB" },
        { name: "hotel-booking.pdf", size: "189 KB" }
      ]
    },
    {
      id: 2,
      employeeName: "David Wilson",
      employeeAvatar: "https://randomuser.me/api/portraits/men/4.jpg",
      department: "HR",
      role: "HR Specialist",
      type: "sick",
      status: "approved",
      priority: "high",
      startDate: "2024-09-25",
      endDate: "2024-09-27",
      appliedDate: "2024-09-24",
      remainingBalance: 8,
      reason: "Medical procedure scheduled. Doctor has recommended 3 days of rest for recovery.",
      managerComments: "Approved. Please take care and get well soon. Let us know if you need additional time.",
      reviewedBy: "HR Manager",
      reviewedDate: "2024-09-24",
      attachments: [
        { name: "medical-certificate.pdf", size: "156 KB" }
      ]
    },
    {
      id: 3,
      employeeName: "Lisa Anderson",
      employeeAvatar: "https://randomuser.me/api/portraits/women/5.jpg",
      department: "Finance",
      role: "Financial Analyst",
      type: "personal",
      status: "rejected",
      priority: "low",
      startDate: "2024-10-01",
      endDate: "2024-10-01",
      appliedDate: "2024-09-28",
      remainingBalance: 15,
      reason: "Personal appointment that cannot be rescheduled during working hours.",
      managerComments: "Unfortunately, this conflicts with the quarterly financial review. Please reschedule for the following week.",
      reviewedBy: "Finance Manager",
      reviewedDate: "2024-09-29"
    }
  ];

  // Mock data for attendance
  const attendanceData = [
    {
      id: 1,
      employeeName: "Sarah Johnson",
      employeeAvatar: "https://randomuser.me/api/portraits/women/1.jpg",
      department: "Marketing",
      date: new Date()?.toISOString()?.split('T')?.[0],
      checkIn: "09:15",
      checkOut: "18:30",
      status: "late",
      location: "Office",
      isLate: true,
      lateBy: "15 min",
      isEarlyLeave: false
    },
    {
      id: 2,
      employeeName: "Michael Chen",
      employeeAvatar: "https://randomuser.me/api/portraits/men/2.jpg",
      department: "Engineering",
      date: new Date()?.toISOString()?.split('T')?.[0],
      checkIn: "08:45",
      checkOut: "17:45",
      status: "present",
      location: "Office",
      isLate: false,
      isEarlyLeave: false
    },
    {
      id: 3,
      employeeName: "Emily Davis",
      employeeAvatar: "https://randomuser.me/api/portraits/women/3.jpg",
      department: "Sales",
      date: new Date()?.toISOString()?.split('T')?.[0],
      checkIn: null,
      checkOut: null,
      status: "absent",
      location: "N/A",
      isLate: false,
      isEarlyLeave: false
    },
    {
      id: 4,
      employeeName: "David Wilson",
      employeeAvatar: "https://randomuser.me/api/portraits/men/4.jpg",
      department: "HR",
      date: new Date()?.toISOString()?.split('T')?.[0],
      checkIn: "09:00",
      checkOut: "18:00",
      status: "work-from-home",
      location: "Home",
      isLate: false,
      isEarlyLeave: false
    },
    {
      id: 5,
      employeeName: "Lisa Anderson",
      employeeAvatar: "https://randomuser.me/api/portraits/women/5.jpg",
      department: "Finance",
      date: new Date()?.toISOString()?.split('T')?.[0],
      checkIn: "09:00",
      checkOut: "13:00",
      status: "half-day",
      location: "Office",
      isLate: false,
      isEarlyLeave: true
    }
  ];

  const tabs = [
    { id: 'employees', label: 'Employee Directory', icon: 'Users', count: employees?.length },
    { id: 'recruitment', label: 'Recruitment', icon: 'UserPlus', count: candidates?.length },
    { id: 'performance', label: 'Performance Reviews', icon: 'FileText', count: reviews?.filter(r => r?.status === 'pending')?.length },
    { id: 'leave', label: 'Leave Requests', icon: 'Calendar', count: leaveRequests?.filter(r => r?.status === 'pending')?.length },
    { id: 'attendance', label: 'Attendance', icon: 'Clock', count: 0 },
    { id: 'metrics', label: 'HR Metrics', icon: 'BarChart3', count: 0 }
  ];

  const handleEmployeeSelect = (employee, action = 'view') => {
    console.log('Employee action:', action, employee);
    // Handle employee selection/editing
  };

  const handleBulkAction = (action, selectedIds) => {
    console.log('Bulk action:', action, selectedIds);
    // Handle bulk actions
  };

  const handleCandidateAction = (action, candidate) => {
    console.log('Candidate action:', action, candidate);
    // Handle candidate actions
  };

  const handleReviewAction = (action, review) => {
    console.log('Review action:', action, review);
    // Handle review actions
  };

  const handleLeaveAction = (action, request, attachment = null) => {
    console.log('Leave action:', action, request, attachment);
    // Handle leave request actions
  };

  const handleAttendanceAction = (action, data) => {
    console.log('Attendance action:', action, data);
    // Handle attendance actions
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'employees':
        return (
          <EmployeeTable
            employees={employees}
            onEmployeeSelect={handleEmployeeSelect}
            onBulkAction={handleBulkAction}
          />
        );
      case 'recruitment':
        return (
          <RecruitmentPipeline
            candidates={candidates}
            onCandidateAction={handleCandidateAction}
          />
        );
      case 'performance':
        return (
          <PerformanceReviews
            reviews={reviews}
            onReviewAction={handleReviewAction}
          />
        );
      case 'leave':
        return (
          <LeaveRequests
            leaveRequests={leaveRequests}
            onLeaveAction={handleLeaveAction}
          />
        );
      case 'attendance':
        return (
          <AttendanceTracking
            attendanceData={attendanceData}
            onAttendanceAction={handleAttendanceAction}
          />
        );
      case 'metrics':
        return (
          <HRMetricsPanel
            metricsData={{}}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>HR Management - ROBO MIS</title>
        <meta name="description" content="Comprehensive HR management system for employee lifecycle, recruitment, performance tracking, and workforce analytics." />
      </Helmet>
      <div className="container mx-auto px-6 py-8">
        <NavigationBreadcrumbs />
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">HR Management</h1>
            <p className="text-muted-foreground">
              Centralized employee lifecycle management, recruitment workflows, and performance tracking
            </p>
          </div>
          <div className="flex items-center gap-3 mt-4 lg:mt-0">
            <Button
              variant="outline"
              iconName="Download"
              onClick={() => console.log('Export HR data')}
            >
              Export Data
            </Button>
            <Button
              variant="outline"
              iconName="Settings"
              onClick={() => console.log('HR settings')}
            >
              Settings
            </Button>
            <Button
              iconName="UserPlus"
              onClick={() => console.log('Add new employee')}
            >
              Add Employee
            </Button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-border mb-6">
          <nav className="flex space-x-8 overflow-x-auto">
            {tabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`
                  flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-smooth
                  ${activeTab === tab?.id
                    ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground'
                  }
                `}
              >
                <Icon name={tab?.icon} size={18} />
                {tab?.label}
                {tab?.count > 0 && (
                  <span className="ml-1 bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                    {tab?.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="bg-card border border-border rounded-lg p-6">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default HRManagement;