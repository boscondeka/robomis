import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const LeaveRequests = ({ leaveRequests, onLeaveAction }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterType, setFilterType] = useState('');

  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'pending', label: 'Pending' },
    { value: 'approved', label: 'Approved' },
    { value: 'rejected', label: 'Rejected' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  const typeOptions = [
    { value: '', label: 'All Types' },
    { value: 'vacation', label: 'Vacation' },
    { value: 'sick', label: 'Sick Leave' },
    { value: 'personal', label: 'Personal' },
    { value: 'maternity', label: 'Maternity' },
    { value: 'paternity', label: 'Paternity' },
    { value: 'emergency', label: 'Emergency' }
  ];

  const filteredRequests = leaveRequests?.filter(request => {
    const matchesSearch = request?.employeeName?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    const matchesStatus = !filterStatus || request?.status === filterStatus;
    const matchesType = !filterType || request?.type === filterType;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { color: 'bg-yellow-100 text-yellow-800', label: 'Pending' },
      approved: { color: 'bg-green-100 text-green-800', label: 'Approved' },
      rejected: { color: 'bg-red-100 text-red-800', label: 'Rejected' },
      cancelled: { color: 'bg-gray-100 text-gray-800', label: 'Cancelled' }
    };

    const config = statusConfig?.[status] || statusConfig?.pending;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config?.color}`}>
        {config?.label}
      </span>
    );
  };

  const getTypeIcon = (type) => {
    const typeIcons = {
      vacation: 'Plane',
      sick: 'Heart',
      personal: 'User',
      maternity: 'Baby',
      paternity: 'Users',
      emergency: 'AlertTriangle'
    };
    return typeIcons?.[type] || 'Calendar';
  };

  const getPriorityColor = (priority) => {
    const priorityColors = {
      high: 'text-red-500',
      medium: 'text-yellow-500',
      low: 'text-green-500'
    };
    return priorityColors?.[priority] || 'text-gray-500';
  };

  const calculateDuration = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <Input
            type="search"
            placeholder="Search by employee name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e?.target?.value)}
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Select
            options={statusOptions}
            value={filterStatus}
            onChange={setFilterStatus}
            placeholder="Status"
            className="w-full sm:w-40"
          />
          <Select
            options={typeOptions}
            value={filterType}
            onChange={setFilterType}
            placeholder="Type"
            className="w-full sm:w-40"
          />
        </div>
      </div>
      {/* Leave Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="text-2xl font-bold text-yellow-600">
            {leaveRequests?.filter(r => r?.status === 'pending')?.length}
          </div>
          <div className="text-sm text-muted-foreground">Pending</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="text-2xl font-bold text-green-600">
            {leaveRequests?.filter(r => r?.status === 'approved')?.length}
          </div>
          <div className="text-sm text-muted-foreground">Approved</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="text-2xl font-bold text-red-600">
            {leaveRequests?.filter(r => r?.status === 'rejected')?.length}
          </div>
          <div className="text-sm text-muted-foreground">Rejected</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="text-2xl font-bold text-foreground">
            {leaveRequests?.reduce((total, r) => total + calculateDuration(r?.startDate, r?.endDate), 0)}
          </div>
          <div className="text-sm text-muted-foreground">Total Days</div>
        </div>
      </div>
      {/* Leave Requests List */}
      <div className="space-y-4">
        {filteredRequests?.map((request) => (
          <div key={request?.id} className="bg-card border border-border rounded-lg p-6 hover:shadow-subtle transition-smooth">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-muted">
                  <Image
                    src={request?.employeeAvatar}
                    alt={request?.employeeName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-foreground">{request?.employeeName}</h3>
                    <Icon 
                      name="AlertCircle" 
                      size={16} 
                      className={getPriorityColor(request?.priority)}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{request?.department} • {request?.role}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Icon name={getTypeIcon(request?.type)} size={14} />
                      {request?.type?.charAt(0)?.toUpperCase() + request?.type?.slice(1)} Leave
                    </span>
                    <span className="flex items-center gap-1">
                      <Icon name="Calendar" size={14} />
                      {calculateDuration(request?.startDate, request?.endDate)} day{calculateDuration(request?.startDate, request?.endDate) > 1 ? 's' : ''}
                    </span>
                    <span className="flex items-center gap-1">
                      <Icon name="Clock" size={14} />
                      Applied {new Date(request.appliedDate)?.toLocaleDateString('en-US')}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {getStatusBadge(request?.status)}
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Eye"
                    onClick={() => onLeaveAction('view', request)}
                  >
                    View
                  </Button>
                  {request?.status === 'pending' && (
                    <>
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="Check"
                        onClick={() => onLeaveAction('approve', request)}
                      >
                        Approve
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="X"
                        onClick={() => onLeaveAction('reject', request)}
                      >
                        Reject
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Leave Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="bg-muted/50 rounded-lg p-3">
                <div className="text-xs text-muted-foreground mb-1">Start Date</div>
                <div className="font-medium text-foreground">
                  {new Date(request.startDate)?.toLocaleDateString('en-US', { 
                    weekday: 'short', 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </div>
              </div>
              <div className="bg-muted/50 rounded-lg p-3">
                <div className="text-xs text-muted-foreground mb-1">End Date</div>
                <div className="font-medium text-foreground">
                  {new Date(request.endDate)?.toLocaleDateString('en-US', { 
                    weekday: 'short', 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </div>
              </div>
              <div className="bg-muted/50 rounded-lg p-3">
                <div className="text-xs text-muted-foreground mb-1">Remaining Balance</div>
                <div className="font-medium text-foreground">{request?.remainingBalance} days</div>
              </div>
            </div>

            {/* Reason */}
            <div className="mb-4">
              <div className="text-sm font-medium text-foreground mb-2">Reason</div>
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-sm text-foreground">{request?.reason}</p>
              </div>
            </div>

            {/* Manager Comments */}
            {request?.managerComments && (
              <div className="mb-4">
                <div className="text-sm font-medium text-foreground mb-2">Manager Comments</div>
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-foreground">{request?.managerComments}</p>
                  <div className="text-xs text-muted-foreground mt-2">
                    - {request?.reviewedBy} on {new Date(request.reviewedDate)?.toLocaleDateString('en-US')}
                  </div>
                </div>
              </div>
            )}

            {/* Attachments */}
            {request?.attachments && request?.attachments?.length > 0 && (
              <div>
                <div className="text-sm font-medium text-foreground mb-2">Attachments</div>
                <div className="flex flex-wrap gap-2">
                  {request?.attachments?.map((attachment, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 px-3 py-2 bg-muted/50 rounded-lg text-sm"
                    >
                      <Icon name="Paperclip" size={14} />
                      <span className="text-foreground">{attachment?.name}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="Download"
                        onClick={() => onLeaveAction('download', request, attachment)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      {filteredRequests?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Calendar" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No leave requests found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </div>
  );
};

export default LeaveRequests;