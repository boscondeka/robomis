import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const NavigationBreadcrumbs = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const routeLabels = {
    '/executive-dashboard': 'Executive Dashboard',
    '/project-management': 'Project Management',
    '/hr-management': 'Human Resources',
    '/finance-dashboard': 'Finance Dashboard',
    '/client-portal': 'Client Portal',
    '/reports-analytics': 'Reports & Analytics'
  };

  const generateBreadcrumbs = () => {
    const pathSegments = location?.pathname?.split('/')?.filter(segment => segment);
    const breadcrumbs = [{ label: 'Home', path: '/' }];

    let currentPath = '';
    pathSegments?.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const label = routeLabels?.[currentPath] || segment?.replace(/-/g, ' ')?.replace(/\b\w/g, l => l?.toUpperCase());
      
      breadcrumbs?.push({
        label,
        path: currentPath,
        isLast: index === pathSegments?.length - 1
      });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  const handleNavigation = (path) => {
    if (path !== location?.pathname) {
      navigate(path);
    }
  };

  if (breadcrumbs?.length <= 1) {
    return null;
  }

  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {breadcrumbs?.map((breadcrumb, index) => (
          <li key={breadcrumb?.path} className="flex items-center">
            {index > 0 && (
              <Icon 
                name="ChevronRight" 
                size={16} 
                className="mx-2 text-muted-foreground/60"
              />
            )}
            
            {breadcrumb?.isLast ? (
              <span className="font-medium text-foreground" aria-current="page">
                {breadcrumb?.label}
              </span>
            ) : (
              <button
                onClick={() => handleNavigation(breadcrumb?.path)}
                className="hover:text-primary transition-smooth focus:outline-none focus:ring-2 focus:ring-primary/20 rounded px-1 py-0.5"
              >
                {breadcrumb?.label}
              </button>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default NavigationBreadcrumbs;