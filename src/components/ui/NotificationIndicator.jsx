import React from 'react';

const NotificationIndicator = ({ count = 0, size = 'default', className = '' }) => {
  if (count <= 0) return null;

  const sizeClasses = {
    sm: 'w-4 h-4 text-xs',
    default: 'w-5 h-5 text-xs',
    lg: 'w-6 h-6 text-sm'
  };

  const displayCount = count > 99 ? '99+' : count?.toString();

  return (
    <span 
      className={`
        absolute -top-1 -right-1 bg-destructive text-destructive-foreground
        rounded-full flex items-center justify-center font-medium
        ${sizeClasses?.[size]}
        ${className}
      `}
      aria-label={`${count} notifications`}
    >
      {displayCount}
    </span>
  );
};

export default NotificationIndicator;