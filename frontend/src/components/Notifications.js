import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchNotifications();
    // Set up polling for real-time updates
    const interval = setInterval(fetchNotifications, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get('/api/notifications');
      setNotifications(response.data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRiskBadgeClass = (riskLevel) => {
    switch (riskLevel?.toLowerCase()) {
      case 'high':
        return 'risk-high';
      case 'medium':
        return 'risk-medium';
      case 'low':
        return 'risk-low';
      default:
        return 'risk-medium';
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'fake_post':
        return '📱';
      case 'deepfake':
        return '🎭';
      case 'hacked_tweet':
        return '🐦';
      case 'news_mention':
        return '📰';
      default:
        return '🔔';
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true;
    return notification.risk_level.toLowerCase() === filter.toLowerCase();
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-cyber-green animate-pulse">Loading notifications...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold glow-text">Real-time Notifications</h1>
        <div className="flex items-center space-x-4">
          <div className="text-sm text-cyber-green/70">
            {notifications.length} active alerts
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-cyber-light-gray border border-cyber-green/30 rounded px-3 py-1 text-cyber-green text-sm focus:outline-none focus:border-cyber-green"
          >
            <option value="all">All Alerts</option>
            <option value="high">High Risk</option>
            <option value="medium">Medium Risk</option>
            <option value="low">Low Risk</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔕</div>
            <h3 className="text-lg font-semibold text-cyber-green/70 mb-2">No notifications</h3>
            <p className="text-sm text-cyber-green/50">
              {filter === 'all' 
                ? 'No active alerts at the moment.' 
                : `No ${filter} risk alerts at the moment.`
              }
            </p>
          </div>
        ) : (
          filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`bg-cyber-gray p-6 rounded-lg glow-border transition-all ${
                notification.risk_level === 'High' ? 'animate-pulse-green' : ''
              }`}
            >
              <div className="flex items-start space-x-4">
                <div className="text-3xl">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-cyber-green">
                      {notification.title}
                    </h3>
                    <span className={`px-2 py-1 rounded text-xs font-medium border ${getRiskBadgeClass(notification.risk_level)}`}>
                      {notification.risk_level}
                    </span>
                  </div>
                  
                  <p className="text-sm text-cyber-green/70 mb-3">
                    {notification.message}
                  </p>

                  <div className="flex items-center justify-between text-xs text-cyber-green/50">
                    <span>
                      {new Date(notification.timestamp).toLocaleString()}
                    </span>
                    <span className="capitalize">
                      {notification.type.replace('_', ' ')}
                    </span>
                  </div>

                  {notification.details && (
                    <div className="mt-4 p-3 bg-cyber-light-gray rounded">
                      <h4 className="text-sm font-medium text-cyber-green mb-2">Details:</h4>
                      <div className="text-xs text-cyber-green/70 space-y-1">
                        {notification.details.target_vip && (
                          <div>Target: {notification.details.target_vip}</div>
                        )}
                        {notification.details.platform && (
                          <div>Platform: {notification.details.platform}</div>
                        )}
                        {notification.details.reason && (
                          <div>Reason: {notification.details.reason}</div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Real-time status indicator */}
      <div className="fixed bottom-4 right-4 bg-cyber-gray p-3 rounded-lg glow-border">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-cyber-green rounded-full animate-pulse"></div>
          <span className="text-xs text-cyber-green/70">Live monitoring active</span>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
