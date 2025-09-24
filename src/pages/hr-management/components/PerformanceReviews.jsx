import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const PerformanceReviews = ({ reviews, onReviewAction }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterPeriod, setFilterPeriod] = useState('');

  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'pending', label: 'Pending' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' },
    { value: 'overdue', label: 'Overdue' }
  ];

  const periodOptions = [
    { value: '', label: 'All Periods' },
    { value: 'q1-2024', label: 'Q1 2024' },
    { value: 'q2-2024', label: 'Q2 2024' },
    { value: 'q3-2024', label: 'Q3 2024' },
    { value: 'q4-2024', label: 'Q4 2024' },
    { value: 'annual-2024', label: 'Annual 2024' }
  ];

  const filteredReviews = reviews?.filter(review => {
    const matchesSearch = review?.employeeName?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         review?.reviewerName?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    const matchesStatus = !filterStatus || review?.status === filterStatus;
    const matchesPeriod = !filterPeriod || review?.period === filterPeriod;
    
    return matchesSearch && matchesStatus && matchesPeriod;
  });

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { color: 'bg-yellow-100 text-yellow-800', label: 'Pending' },
      'in-progress': { color: 'bg-blue-100 text-blue-800', label: 'In Progress' },
      completed: { color: 'bg-green-100 text-green-800', label: 'Completed' },
      overdue: { color: 'bg-red-100 text-red-800', label: 'Overdue' }
    };

    const config = statusConfig?.[status] || statusConfig?.pending;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config?.color}`}>
        {config?.label}
      </span>
    );
  };

  const getScoreColor = (score) => {
    if (score >= 4.5) return 'text-green-600';
    if (score >= 3.5) return 'text-blue-600';
    if (score >= 2.5) return 'text-yellow-600';
    return 'text-red-600';
  };

  const renderStarRating = (score) => {
    const stars = [];
    const fullStars = Math.floor(score);
    const hasHalfStar = score % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars?.push(<Icon key={i} name="Star" size={16} className="text-yellow-400 fill-current" />);
      } else if (i === fullStars && hasHalfStar) {
        stars?.push(<Icon key={i} name="Star" size={16} className="text-yellow-400 fill-current opacity-50" />);
      } else {
        stars?.push(<Icon key={i} name="Star" size={16} className="text-gray-300" />);
      }
    }

    return <div className="flex items-center gap-1">{stars}</div>;
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <Input
            type="search"
            placeholder="Search by employee or reviewer name..."
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
            options={periodOptions}
            value={filterPeriod}
            onChange={setFilterPeriod}
            placeholder="Period"
            className="w-full sm:w-40"
          />
        </div>
      </div>
      {/* Review Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="text-2xl font-bold text-foreground">
            {reviews?.filter(r => r?.status === 'completed')?.length}
          </div>
          <div className="text-sm text-muted-foreground">Completed</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="text-2xl font-bold text-yellow-600">
            {reviews?.filter(r => r?.status === 'pending')?.length}
          </div>
          <div className="text-sm text-muted-foreground">Pending</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="text-2xl font-bold text-blue-600">
            {reviews?.filter(r => r?.status === 'in-progress')?.length}
          </div>
          <div className="text-sm text-muted-foreground">In Progress</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="text-2xl font-bold text-red-600">
            {reviews?.filter(r => r?.status === 'overdue')?.length}
          </div>
          <div className="text-sm text-muted-foreground">Overdue</div>
        </div>
      </div>
      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews?.map((review) => (
          <div key={review?.id} className="bg-card border border-border rounded-lg p-6 hover:shadow-subtle transition-smooth">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-muted">
                  <Image
                    src={review?.employeeAvatar}
                    alt={review?.employeeName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{review?.employeeName}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{review?.department} • {review?.role}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Icon name="Calendar" size={14} />
                      {review?.period?.replace('-', ' ')?.toUpperCase()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Icon name="User" size={14} />
                      Reviewer: {review?.reviewerName}
                    </span>
                    <span className="flex items-center gap-1">
                      <Icon name="Clock" size={14} />
                      Due: {new Date(review.dueDate)?.toLocaleDateString('en-US')}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {getStatusBadge(review?.status)}
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Eye"
                    onClick={() => onReviewAction('view', review)}
                  >
                    View
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Edit"
                    onClick={() => onReviewAction('edit', review)}
                  >
                    Edit
                  </Button>
                </div>
              </div>
            </div>

            {/* Review Metrics */}
            {review?.status === 'completed' && review?.scores && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">Overall Score</span>
                    <span className={`text-lg font-bold ${getScoreColor(review?.overallScore)}`}>
                      {review?.overallScore}/5
                    </span>
                  </div>
                  {renderStarRating(review?.overallScore)}
                </div>
                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">Goals Met</span>
                    <span className="text-lg font-bold text-foreground">
                      {review?.goalsMet}/{review?.totalGoals}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full" 
                      style={{ width: `${(review?.goalsMet / review?.totalGoals) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">Improvement</span>
                    <span className={`text-lg font-bold ${review?.improvement >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {review?.improvement >= 0 ? '+' : ''}{review?.improvement}%
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Icon 
                      name={review?.improvement >= 0 ? "TrendingUp" : "TrendingDown"} 
                      size={14} 
                      className={review?.improvement >= 0 ? 'text-green-600' : 'text-red-600'}
                    />
                    <span className="text-xs text-muted-foreground">vs last review</span>
                  </div>
                </div>
              </div>
            )}

            {/* Key Areas */}
            {review?.keyAreas && review?.keyAreas?.length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm font-medium text-foreground mb-2">Key Focus Areas</h4>
                <div className="flex flex-wrap gap-2">
                  {review?.keyAreas?.map((area, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Comments */}
            {review?.comments && (
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-sm text-foreground">{review?.comments}</p>
              </div>
            )}
          </div>
        ))}
      </div>
      {filteredReviews?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="FileText" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No reviews found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </div>
  );
};

export default PerformanceReviews;