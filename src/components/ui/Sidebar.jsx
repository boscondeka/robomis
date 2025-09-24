import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import UserProfileDropdown from './UserProfileDropdown';
import NotificationIndicator from './NotificationIndicator';

const Sidebar = ({ isCollapsed = false, onToggle }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navigationItems = [
    {
      label: 'Executive Dashboard',
      path: '/executive-dashboard',
      icon: 'BarChart3',
      roles: ['executive', 'admin'],
      badge: 0
    },
    {
      label: 'Project Management',
      path: '/project-management',
      icon: 'FolderKanban',
      roles: ['manager', 'admin', 'executive'],
      badge: 3
    },
    {
      label: 'Human Resources',
      path: '/hr-management',
      icon: 'Users',
      roles: ['hr', 'admin', 'executive'],
      badge: 2
    },
    {
      label: 'Finance Dashboard',
      path: '/finance-dashboard',
      icon: 'Calculator',
      roles: ['finance', 'admin', 'executive'],
      badge: 1
    },
    {
      label: 'Reports & Analytics',
      path: '/reports-analytics',
      icon: 'TrendingUp',
      roles: ['analyst', 'admin', 'executive', 'manager'],
      badge: 0
    },
    {
      label: 'Client Portal',
      path: '/client-portal',
      icon: 'Globe',
      roles: ['client', 'admin', 'manager'],
      badge: 0
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
    if (window.innerWidth < 1024) {
      setIsMobileOpen(false);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const Logo = () => (
    <div className="flex items-center space-x-3 px-4 py-6">
      <div className="flex-shrink-0">
        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
          <Icon name="Bot" size={24} color="white" />
        </div>
      </div>
      {!isCollapsed && (
        <div className="flex flex-col">
          <span className="text-xl font-bold text-foreground">ROBO MIS</span>
          <span className="text-xs text-muted-foreground">Management System</span>
        </div>
      )}
    </div>
  );

  const NavigationItem = ({ item }) => {
    const isActive = location?.pathname === item?.path;
    
    return (
      <button
        onClick={() => handleNavigation(item?.path)}
        className={`
          w-full flex items-center px-4 py-3 text-left transition-smooth
          hover:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/20
          ${isActive ? 'bg-primary/10 text-primary border-r-2 border-primary' : 'text-foreground'}
          ${isCollapsed ? 'justify-center' : 'justify-start'}
        `}
      >
        <div className="flex-shrink-0 relative">
          <Icon 
            name={item?.icon} 
            size={20} 
            color={isActive ? 'var(--color-primary)' : 'currentColor'} 
          />
          {item?.badge > 0 && (
            <NotificationIndicator count={item?.badge} />
          )}
        </div>
        {!isCollapsed && (
          <span className="ml-3 font-medium">{item?.label}</span>
        )}
      </button>
    );
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-1000 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
      {/* Mobile Menu Button */}
      <button
        onClick={toggleMobileMenu}
        className="fixed top-4 left-4 z-1020 lg:hidden bg-card p-2 rounded-lg shadow-subtle"
      >
        <Icon name="Menu" size={24} />
      </button>
      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-full bg-card border-r border-border z-1010
        transition-complex flex flex-col
        ${isCollapsed ? 'w-16' : 'w-60'}
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Logo Section */}
        <Logo />

        {/* Navigation Section */}
        <nav className="flex-1 overflow-y-auto">
          <div className="space-y-1 px-2">
            {navigationItems?.map((item) => (
              <NavigationItem key={item?.path} item={item} />
            ))}
          </div>
        </nav>

        {/* User Profile Section */}
        <div className="border-t border-border p-4">
          <UserProfileDropdown isCollapsed={isCollapsed} />
        </div>

        {/* Collapse Toggle (Desktop Only) */}
        {onToggle && (
          <button
            onClick={onToggle}
            className="hidden lg:flex items-center justify-center p-2 border-t border-border hover:bg-muted/50 transition-smooth"
          >
            <Icon 
              name={isCollapsed ? "ChevronRight" : "ChevronLeft"} 
              size={16} 
            />
          </button>
        )}
      </aside>
    </>
  );
};

export default Sidebar;