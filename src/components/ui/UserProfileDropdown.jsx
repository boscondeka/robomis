import React, { useState, useRef, useEffect } from 'react';
import Icon from '../AppIcon';
import Image from '../AppImage';

const UserProfileDropdown = ({ isCollapsed = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Mock user data - in real app, this would come from context/state
  const user = {
    name: 'John Anderson',
    email: 'john.anderson@robomis.com',
    role: 'Executive Manager',
    avatar: '/assets/images/avatar-placeholder.jpg'
  };

  const menuItems = [
    {
      label: 'Profile Settings',
      icon: 'User',
      action: () => console.log('Profile Settings')
    },
    {
      label: 'Account Preferences',
      icon: 'Settings',
      action: () => console.log('Account Preferences')
    },
    {
      label: 'Help & Support',
      icon: 'HelpCircle',
      action: () => console.log('Help & Support')
    },
    {
      label: 'Sign Out',
      icon: 'LogOut',
      action: () => console.log('Sign Out'),
      variant: 'destructive'
    }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef?.current && !dropdownRef?.current?.contains(event?.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuItemClick = (action) => {
    action();
    setIsOpen(false);
  };

  if (isCollapsed) {
    return (
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={handleToggle}
          className="w-full flex items-center justify-center p-2 rounded-lg hover:bg-muted/50 transition-smooth focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
          <div className="w-8 h-8 rounded-full overflow-hidden bg-muted">
            <Image
              src={user?.avatar}
              alt={user?.name}
              className="w-full h-full object-cover"
            />
          </div>
        </button>
        {isOpen && (
          <div className="absolute bottom-full left-0 mb-2 w-64 bg-popover border border-border rounded-lg shadow-elevated z-1010">
            {/* User Info */}
            <div className="p-4 border-b border-border">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-muted">
                  <Image
                    src={user?.avatar}
                    alt={user?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {user?.name}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {user?.email}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {user?.role}
                  </p>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="py-2">
              {menuItems?.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleMenuItemClick(item?.action)}
                  className={`
                    w-full flex items-center px-4 py-2 text-left transition-smooth
                    hover:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/20
                    ${item?.variant === 'destructive' ? 'text-destructive hover:bg-destructive/10' : 'text-foreground'}
                  `}
                >
                  <Icon 
                    name={item?.icon} 
                    size={16} 
                    color={item?.variant === 'destructive' ? 'var(--color-destructive)' : 'currentColor'}
                  />
                  <span className="ml-3 text-sm">{item?.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={handleToggle}
        className="w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/50 transition-smooth focus:outline-none focus:ring-2 focus:ring-primary/20"
      >
        <div className="w-8 h-8 rounded-full overflow-hidden bg-muted">
          <Image
            src={user?.avatar}
            alt={user?.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 text-left min-w-0">
          <p className="text-sm font-medium text-foreground truncate">
            {user?.name}
          </p>
          <p className="text-xs text-muted-foreground truncate">
            {user?.role}
          </p>
        </div>
        <Icon 
          name={isOpen ? "ChevronUp" : "ChevronDown"} 
          size={16} 
          className="text-muted-foreground"
        />
      </button>
      {isOpen && (
        <div className="absolute bottom-full left-0 mb-2 w-full bg-popover border border-border rounded-lg shadow-elevated z-1010">
          {/* User Info */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-muted">
                <Image
                  src={user?.avatar}
                  alt={user?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {user?.name}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {user?.email}
                </p>
                <p className="text-xs text-muted-foreground">
                  {user?.role}
                </p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            {menuItems?.map((item, index) => (
              <button
                key={index}
                onClick={() => handleMenuItemClick(item?.action)}
                className={`
                  w-full flex items-center px-4 py-2 text-left transition-smooth
                  hover:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/20
                  ${item?.variant === 'destructive' ? 'text-destructive hover:bg-destructive/10' : 'text-foreground'}
                `}
              >
                <Icon 
                  name={item?.icon} 
                  size={16} 
                  color={item?.variant === 'destructive' ? 'var(--color-destructive)' : 'currentColor'}
                />
                <span className="ml-3 text-sm">{item?.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfileDropdown;