import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ user }) => {
  const menuItems = [
    { path: '/', label: 'Dashboard', icon: '📊' },
    { path: '/vips', label: 'VIP Profiles', icon: '👤' },
    { path: '/instagram-search', label: 'Instagram Search', icon: '📷' },
    { path: '/fake-posts', label: 'Fake Posts', icon: '📱' },
    { path: '/deepfakes', label: 'Deepfakes', icon: '🎭' },
    { path: '/hacked-tweets', label: 'Hacked Tweets', icon: '🐦' },
    { path: '/news-mentions', label: 'News Mentions', icon: '📰' },
    { path: '/notifications', label: 'Notifications', icon: '🔔' }
  ];

  // Role-based access control
  const getAccessibleItems = () => {
    switch (user.role) {
      case 'Admin':
        return menuItems;
      case 'Threat Detector':
        return menuItems.filter(item => 
          ['Dashboard', 'Fake Posts', 'Deepfakes', 'Notifications'].includes(item.label)
        );
      case 'Risk Analyst':
        return menuItems.filter(item => 
          ['Dashboard', 'VIP Profiles', 'Notifications'].includes(item.label)
        );
      case 'Database Auditor':
        return menuItems.filter(item => 
          ['Dashboard', 'VIP Profiles', 'Notifications'].includes(item.label)
        );
      default:
        return menuItems;
    }
  };

  const accessibleItems = getAccessibleItems();

  return (
    <div className="w-64 bg-cyber-gray border-r border-cyber-green/20 min-h-screen">
      <div className="p-6">
        <div className="text-center mb-8">
          <h2 className="text-xl font-bold glow-text">CERBERUS</h2>
          <p className="text-sm text-cyber-green/70">WATCH</p>
        </div>
        
        <div className="mb-6 p-3 bg-cyber-light-gray rounded">
          <div className="text-sm text-cyber-green/70">Logged in as:</div>
          <div className="font-medium">{user.username}</div>
          <div className="text-xs text-cyber-green/50">{user.role}</div>
        </div>

        <nav className="space-y-2">
          {accessibleItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-3 rounded transition-colors ${
                  isActive
                    ? 'bg-cyber-green text-cyber-dark font-medium'
                    : 'text-cyber-green/70 hover:bg-cyber-light-gray hover:text-cyber-green'
                }`
              }
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
