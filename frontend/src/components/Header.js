import React from 'react';

const Header = ({ user, onLogout }) => {
  return (
    <header className="bg-cyber-gray border-b border-cyber-green/20 px-6 py-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold glow-text">Threat Monitoring Dashboard</h1>
          <p className="text-sm text-cyber-green/70">Real-time VIP protection system</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <div className="text-sm text-cyber-green/70">Welcome back,</div>
            <div className="font-medium">{user.username}</div>
            <div className="text-xs text-cyber-green/50">{user.role}</div>
          </div>
          
          <button
            onClick={onLogout}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
