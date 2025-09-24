import React, { useState, useMemo } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const EmployeeTable = ({ employees, onEmployeeSelect, onBulkAction }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [filterDepartment, setFilterDepartment] = useState('');
  const [filterLocation, setFilterLocation] = useState('');
  const [filterEmploymentType, setFilterEmploymentType] = useState('');
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const departments = [
    { value: '', label: 'All Departments' },
    { value: 'engineering', label: 'Engineering' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'sales', label: 'Sales' },
    { value: 'hr', label: 'Human Resources' },
    { value: 'finance', label: 'Finance' },
    { value: 'operations', label: 'Operations' }
  ];

  const locations = [
    { value: '', label: 'All Locations' },
    { value: 'new-york', label: 'New York' },
    { value: 'san-francisco', label: 'San Francisco' },
    { value: 'chicago', label: 'Chicago' },
    { value: 'remote', label: 'Remote' }
  ];

  const employmentTypes = [
    { value: '', label: 'All Types' },
    { value: 'full-time', label: 'Full-time' },
    { value: 'part-time', label: 'Part-time' },
    { value: 'contract', label: 'Contract' },
    { value: 'intern', label: 'Intern' }
  ];

  const filteredAndSortedEmployees = useMemo(() => {
    let filtered = employees?.filter(employee => {
      const matchesSearch = employee?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                          employee?.email?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                          employee?.employeeId?.toLowerCase()?.includes(searchTerm?.toLowerCase());
      const matchesDepartment = !filterDepartment || employee?.department === filterDepartment;
      const matchesLocation = !filterLocation || employee?.location === filterLocation;
      const matchesEmploymentType = !filterEmploymentType || employee?.employmentType === filterEmploymentType;
      
      return matchesSearch && matchesDepartment && matchesLocation && matchesEmploymentType;
    });

    if (sortConfig?.key) {
      filtered?.sort((a, b) => {
        let aValue = a?.[sortConfig?.key];
        let bValue = b?.[sortConfig?.key];
        
        if (sortConfig?.key === 'hireDate') {
          aValue = new Date(aValue);
          bValue = new Date(bValue);
        }
        
        if (aValue < bValue) return sortConfig?.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig?.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [employees, searchTerm, sortConfig, filterDepartment, filterLocation, filterEmploymentType]);

  const paginatedEmployees = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedEmployees?.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedEmployees, currentPage]);

  const totalPages = Math.ceil(filteredAndSortedEmployees?.length / itemsPerPage);

  const handleSort = (key) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig?.key === key && prevConfig?.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedEmployees(paginatedEmployees?.map(emp => emp?.id));
    } else {
      setSelectedEmployees([]);
    }
  };

  const handleSelectEmployee = (employeeId, checked) => {
    if (checked) {
      setSelectedEmployees(prev => [...prev, employeeId]);
    } else {
      setSelectedEmployees(prev => prev?.filter(id => id !== employeeId));
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { color: 'bg-success/10 text-success', label: 'Active' },
      inactive: { color: 'bg-muted text-muted-foreground', label: 'Inactive' },
      onLeave: { color: 'bg-warning/10 text-warning', label: 'On Leave' },
      terminated: { color: 'bg-destructive/10 text-destructive', label: 'Terminated' }
    };

    const config = statusConfig?.[status] || statusConfig?.active;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config?.color}`}>
        {config?.label}
      </span>
    );
  };

  const getSortIcon = (key) => {
    if (sortConfig?.key !== key) return 'ArrowUpDown';
    return sortConfig?.direction === 'asc' ? 'ArrowUp' : 'ArrowDown';
  };

  return (
    <div className="space-y-4">
      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <Input
            type="search"
            placeholder="Search employees by name, email, or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e?.target?.value)}
            className="w-full"
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Select
            options={departments}
            value={filterDepartment}
            onChange={setFilterDepartment}
            placeholder="Department"
            className="w-full sm:w-40"
          />
          <Select
            options={locations}
            value={filterLocation}
            onChange={setFilterLocation}
            placeholder="Location"
            className="w-full sm:w-40"
          />
          <Select
            options={employmentTypes}
            value={filterEmploymentType}
            onChange={setFilterEmploymentType}
            placeholder="Type"
            className="w-full sm:w-40"
          />
        </div>
      </div>
      {/* Bulk Actions */}
      {selectedEmployees?.length > 0 && (
        <div className="flex items-center justify-between p-4 bg-primary/5 border border-primary/20 rounded-lg">
          <span className="text-sm font-medium">
            {selectedEmployees?.length} employee{selectedEmployees?.length > 1 ? 's' : ''} selected
          </span>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              iconName="Mail"
              onClick={() => onBulkAction('email', selectedEmployees)}
            >
              Send Email
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="FileText"
              onClick={() => onBulkAction('export', selectedEmployees)}
            >
              Export
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="Settings"
              onClick={() => onBulkAction('update', selectedEmployees)}
            >
              Bulk Update
            </Button>
          </div>
        </div>
      )}
      {/* Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="p-4 text-left">
                  <Checkbox
                    checked={selectedEmployees?.length === paginatedEmployees?.length && paginatedEmployees?.length > 0}
                    onChange={(e) => handleSelectAll(e?.target?.checked)}
                  />
                </th>
                <th className="p-4 text-left text-sm font-medium text-foreground">Employee</th>
                <th className="p-4 text-left">
                  <button
                    onClick={() => handleSort('department')}
                    className="flex items-center gap-1 text-sm font-medium text-foreground hover:text-primary transition-smooth"
                  >
                    Department
                    <Icon name={getSortIcon('department')} size={14} />
                  </button>
                </th>
                <th className="p-4 text-left">
                  <button
                    onClick={() => handleSort('role')}
                    className="flex items-center gap-1 text-sm font-medium text-foreground hover:text-primary transition-smooth"
                  >
                    Role
                    <Icon name={getSortIcon('role')} size={14} />
                  </button>
                </th>
                <th className="p-4 text-left">
                  <button
                    onClick={() => handleSort('hireDate')}
                    className="flex items-center gap-1 text-sm font-medium text-foreground hover:text-primary transition-smooth"
                  >
                    Hire Date
                    <Icon name={getSortIcon('hireDate')} size={14} />
                  </button>
                </th>
                <th className="p-4 text-left">
                  <button
                    onClick={() => handleSort('status')}
                    className="flex items-center gap-1 text-sm font-medium text-foreground hover:text-primary transition-smooth"
                  >
                    Status
                    <Icon name={getSortIcon('status')} size={14} />
                  </button>
                </th>
                <th className="p-4 text-left text-sm font-medium text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedEmployees?.map((employee) => (
                <tr key={employee?.id} className="border-t border-border hover:bg-muted/30 transition-smooth">
                  <td className="p-4">
                    <Checkbox
                      checked={selectedEmployees?.includes(employee?.id)}
                      onChange={(e) => handleSelectEmployee(employee?.id, e?.target?.checked)}
                    />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-muted">
                        <Image
                          src={employee?.avatar}
                          alt={employee?.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-medium text-foreground">{employee?.name}</div>
                        <div className="text-sm text-muted-foreground">{employee?.email}</div>
                        <div className="text-xs text-muted-foreground">ID: {employee?.employeeId}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-foreground capitalize">{employee?.department}</td>
                  <td className="p-4 text-sm text-foreground">{employee?.role}</td>
                  <td className="p-4 text-sm text-foreground">
                    {new Date(employee.hireDate)?.toLocaleDateString('en-US')}
                  </td>
                  <td className="p-4">{getStatusBadge(employee?.status)}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="Eye"
                        onClick={() => onEmployeeSelect(employee)}
                      >
                        View
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="Edit"
                        onClick={() => onEmployeeSelect(employee, 'edit')}
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

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between p-4 border-t border-border">
            <div className="text-sm text-muted-foreground">
              Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredAndSortedEmployees?.length)} of {filteredAndSortedEmployees?.length} employees
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                iconName="ChevronLeft"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              >
                Previous
              </Button>
              <span className="text-sm text-foreground">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                iconName="ChevronRight"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeTable;