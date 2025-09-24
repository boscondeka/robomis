import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const AttendanceTracking = ({ attendanceData, onAttendanceAction }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date()?.toISOString()?.split('T')?.[0]);

  const departments = [
    { value: '', label: 'All Departments' },
    { value: 'engineering', label: 'Engineering' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'sales', label: 'Sales' },
    { value: 'hr', label: 'Human Resources' },
    { value: 'finance', label: 'Finance' },
    { value: 'operations', label: 'Operations' }
  ];

  const filteredAttendance = attendanceData?.filter(record => {
    const matchesSearch = record?.employeeName?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    const matchesDepartment = !filterDepartment || record?.department === filterDepartment;
    const matchesDate = record?.date === selectedDate;
    
    return matchesSearch && matchesDepartment && matchesDate;
  });

  const getStatusBadge = (status) => {
    const statusConfig = {
      present: { color: 'bg-green-100 text-green-800', label: 'Present', icon: 'Check' },
      absent: { color: 'bg-red-100 text-red-800', label: 'Absent', icon: 'X' },
      late: { color: 'bg-yellow-100 text-yellow-800', label: 'Late', icon: 'Clock' },
      'half-day': { color: 'bg-blue-100 text-blue-800', label: 'Half Day', icon: 'Clock' },
      'work-from-home': { color: 'bg-purple-100 text-purple-800', label: 'WFH', icon: 'Home' }
    };

    const config = statusConfig?.[status] || statusConfig?.present;
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${config?.color}`}>
        <Icon name={config?.icon} size={12} />
        {config?.label}
      </span>
    );
  };

  const calculateWorkingHours = (checkIn, checkOut) => {
    if (!checkIn || !checkOut) return '0:00';
    
    const checkInTime = new Date(`2024-01-01 ${checkIn}`);
    const checkOutTime = new Date(`2024-01-01 ${checkOut}`);
    const diffMs = checkOutTime - checkInTime;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${diffHours}:${diffMinutes?.toString()?.padStart(2, '0')}`;
  };

  const getAttendanceStats = () => {
    const totalEmployees = filteredAttendance?.length;
    const present = filteredAttendance?.filter(r => r?.status === 'present')?.length;
    const absent = filteredAttendance?.filter(r => r?.status === 'absent')?.length;
    const late = filteredAttendance?.filter(r => r?.status === 'late')?.length;
    const wfh = filteredAttendance?.filter(r => r?.status === 'work-from-home')?.length;
    
    return { totalEmployees, present, absent, late, wfh };
  };

  const stats = getAttendanceStats();

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
          <Input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e?.target?.value)}
            className="w-full sm:w-40"
          />
          <Select
            options={departments}
            value={filterDepartment}
            onChange={setFilterDepartment}
            placeholder="Department"
            className="w-full sm:w-40"
          />
        </div>
      </div>
      {/* Attendance Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="text-2xl font-bold text-foreground">{stats?.totalEmployees}</div>
          <div className="text-sm text-muted-foreground">Total</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="text-2xl font-bold text-green-600">{stats?.present}</div>
          <div className="text-sm text-muted-foreground">Present</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="text-2xl font-bold text-red-600">{stats?.absent}</div>
          <div className="text-sm text-muted-foreground">Absent</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="text-2xl font-bold text-yellow-600">{stats?.late}</div>
          <div className="text-sm text-muted-foreground">Late</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="text-2xl font-bold text-purple-600">{stats?.wfh}</div>
          <div className="text-sm text-muted-foreground">WFH</div>
        </div>
      </div>
      {/* Attendance Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="p-4 text-left text-sm font-medium text-foreground">Employee</th>
                <th className="p-4 text-left text-sm font-medium text-foreground">Check In</th>
                <th className="p-4 text-left text-sm font-medium text-foreground">Check Out</th>
                <th className="p-4 text-left text-sm font-medium text-foreground">Working Hours</th>
                <th className="p-4 text-left text-sm font-medium text-foreground">Status</th>
                <th className="p-4 text-left text-sm font-medium text-foreground">Location</th>
                <th className="p-4 text-left text-sm font-medium text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAttendance?.map((record) => (
                <tr key={record?.id} className="border-t border-border hover:bg-muted/30 transition-smooth">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-muted">
                        <Image
                          src={record?.employeeAvatar}
                          alt={record?.employeeName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-medium text-foreground">{record?.employeeName}</div>
                        <div className="text-sm text-muted-foreground">{record?.department}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm text-foreground">
                      {record?.checkIn || '-'}
                    </div>
                    {record?.checkIn && record?.isLate && (
                      <div className="text-xs text-red-500">Late by {record?.lateBy}</div>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="text-sm text-foreground">
                      {record?.checkOut || '-'}
                    </div>
                    {record?.checkOut && record?.isEarlyLeave && (
                      <div className="text-xs text-yellow-500">Early leave</div>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="text-sm text-foreground">
                      {calculateWorkingHours(record?.checkIn, record?.checkOut)}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Target: 8:00
                    </div>
                  </td>
                  <td className="p-4">
                    {getStatusBadge(record?.status)}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1 text-sm text-foreground">
                      <Icon 
                        name={record?.location === 'Office' ? 'Building' : 'Home'} 
                        size={14} 
                      />
                      {record?.location}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="Eye"
                        onClick={() => onAttendanceAction('view', record)}
                      >
                        View
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="Edit"
                        onClick={() => onAttendanceAction('edit', record)}
                      >
                        Edit
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Quick Actions */}
      <div className="flex flex-wrap gap-4">
        <Button
          variant="outline"
          iconName="Download"
          onClick={() => onAttendanceAction('export', { date: selectedDate })}
        >
          Export Report
        </Button>
        <Button
          variant="outline"
          iconName="Clock"
          onClick={() => onAttendanceAction('bulk-check-in')}
        >
          Bulk Check-in
        </Button>
        <Button
          variant="outline"
          iconName="Calendar"
          onClick={() => onAttendanceAction('view-monthly')}
        >
          Monthly View
        </Button>
        <Button
          variant="outline"
          iconName="Settings"
          onClick={() => onAttendanceAction('settings')}
        >
          Attendance Settings
        </Button>
      </div>
      {filteredAttendance?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Clock" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No attendance records found</h3>
          <p className="text-muted-foreground">Try selecting a different date or adjusting your filters.</p>
        </div>
      )}
    </div>
  );
};

export default AttendanceTracking;