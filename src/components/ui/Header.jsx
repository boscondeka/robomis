import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import UserProfileDropdown from './UserProfileDropdown';
import NotificationIndicator from './NotificationIndicator';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);

  const primaryNavItems = [
    {
      label: 'Dashboard',
      path: '/executive-dashboard',
      icon: 'BarChart3'
    },
    {
      label: 'Projects',
      path: '/project-management',
      icon: 'FolderKanban',
      badge: 3
    },
    {
      label: 'HR',
      path: '/hr-management',
      icon: 'Users',
      badge: 2
    },
    {
      label: 'Finance',
      path: '/finance-dashboard',
      icon: 'Calculator',
      badge: 1
    }
  ];

  const secondaryNavItems = [
    {
      label: 'Reports & Analytics',
      path: '/reports-analytics',
      icon: 'TrendingUp'
    },
    {
      label: 'Client Portal',
      path: '/client-portal',
      icon: 'Globe'
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setMoreMenuOpen(false);
  };

  const NavigationItem = ({ item, className = "" }) => {
    const isActive = location?.pathname === item?.path;
    
    return (
      <button
        onClick={() => handleNavigation(item?.path)}
        className={`
          flex items-center px-4 py-2 rounded-lg transition-smooth
          hover:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/20
          ${isActive ? 'bg-primary/10 text-primary' : 'text-foreground'}
          ${className}
        `}
      >
        <div className="flex-shrink-0 relative">
          <Icon 
            name={item?.icon} 
            size={18} 
            color={isActive ? 'var(--color-primary)' : 'currentColor'} 
          />
          {item?.badge > 0 && (
            <NotificationIndicator count={item?.badge} size="sm" />
          )}
        </div>
        <span className="ml-2 font-medium">{item?.label}</span>
      </button>
    );
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60 border-b border-border">
      <div className="flex h-16 items-center px-6">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Icon name="Bot" size={20} color="white" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold text-foreground">ROBO MIS</span>
          </div>
        </div>

        {/* Primary Navigation */}
        <nav className="hidden md:flex items-center space-x-2 ml-8">
          {primaryNavItems?.map((item) => (
            <NavigationItem key={item?.path} item={item} />
          ))}
          
          {/* More Menu */}
          <div className="relative">
            <button
              onClick={() => setMoreMenuOpen(!moreMenuOpen)}
              className="flex items-center px-4 py-2 rounded-lg transition-smooth hover:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <Icon name="MoreHorizontal" size={18} />
              <span className="ml-2 font-medium">More</span>
            </button>

            {/* Dropdown Menu */}
            {moreMenuOpen && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-popover border border-border rounded-lg shadow-elevated z-1010">
                <div className="py-2">
                  {secondaryNavItems?.map((item) => (
                    <NavigationItem 
                      key={item?.path} 
                      item={item} 
                      className="w-full justify-start rounded-none hover:bg-muted/50"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Mobile Navigation */}
        <nav className="flex md:hidden items-center space-x-2 ml-4">
          <div className="relative">
            <button
              onClick={() => setMoreMenuOpen(!moreMenuOpen)}
              className="flex items-center px-3 py-2 rounded-lg transition-smooth hover:bg-muted/50"
            >
              <Icon name="Menu" size={20} />
            </button>

            {moreMenuOpen && (
              <div className="absolute top-full right-0 mt-2 w-56 bg-popover border border-border rounded-lg shadow-elevated z-1010">
                <div className="py-2">
                  {[...primaryNavItems, ...secondaryNavItems]?.map((item) => (
                    <NavigationItem 
                      key={item?.path} 
                      item={item} 
                      className="w-full justify-start rounded-none hover:bg-muted/50"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Right Section */}
        <div className="ml-auto flex items-center space-x-4">
          {/* Search */}
          <button className="p-2 rounded-lg hover:bg-muted/50 transition-smooth">
            <Icon name="Search" size={20} />
          </button>

          {/* Notifications */}
          <button className="p-2 rounded-lg hover:bg-muted/50 transition-smooth relative">
            <Icon name="Bell" size={20} />
            <NotificationIndicator count={5} size="sm" />
          </button>

          {/* User Profile */}
          <UserProfileDropdown />
        </div>
      </div>
      {/* Click outside to close dropdown */}
      {moreMenuOpen && (
        <div 
          className="fixed inset-0 z-1000" 
          onClick={() => setMoreMenuOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;