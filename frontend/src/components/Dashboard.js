import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsResponse, notificationsResponse] = await Promise.all([
        axios.get('/api/stats'),
        axios.get('/api/notifications')
      ]);
      
      setStats(statsResponse.data);
      setNotifications(notificationsResponse.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-cyber-green animate-pulse">Loading dashboard...</div>
      </div>
    );
  }

  const riskData = stats ? [
    { name: 'High Risk', value: stats.risk_distribution.high, color: '#ef4444' },
    { name: 'Medium Risk', value: stats.risk_distribution.medium, color: '#f59e0b' },
    { name: 'Low Risk', value: stats.risk_distribution.low, color: '#10b981' }
  ] : [];

  const platformData = stats ? [
    { name: 'Instagram', threats: stats.platform_distribution.instagram },
    { name: 'Twitter', threats: stats.platform_distribution.twitter },
    { name: 'News', threats: stats.platform_distribution.news },
    { name: 'Deepfake', threats: stats.platform_distribution.deepfake }
  ] : [];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-cyber-gray p-6 rounded-lg glow-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-cyber-green/70 text-sm">Total Threats</p>
              <p className="text-2xl font-bold text-cyber-green">{stats?.total_threats || 0}</p>
            </div>
            <div className="text-3xl">🚨</div>
          </div>
        </div>

        <div className="bg-cyber-gray p-6 rounded-lg glow-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-cyber-green/70 text-sm">Fake Posts</p>
              <p className="text-2xl font-bold text-cyber-green">{stats?.fake_posts || 0}</p>
            </div>
            <div className="text-3xl">📱</div>
          </div>
        </div>

        <div className="bg-cyber-gray p-6 rounded-lg glow-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-cyber-green/70 text-sm">Deepfakes</p>
              <p className="text-2xl font-bold text-cyber-green">{stats?.deepfakes || 0}</p>
            </div>
            <div className="text-3xl">🎭</div>
          </div>
        </div>

        <div className="bg-cyber-gray p-6 rounded-lg glow-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-cyber-green/70 text-sm">Hacked Accounts</p>
              <p className="text-2xl font-bold text-cyber-green">{stats?.hacked_tweets || 0}</p>
            </div>
            <div className="text-3xl">🐦</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-cyber-gray p-6 rounded-lg glow-border">
          <h3 className="text-lg font-semibold mb-4">Risk Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={riskData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {riskData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-cyber-gray p-6 rounded-lg glow-border">
          <h3 className="text-lg font-semibold mb-4">Threats by Platform</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={platformData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#00ff41" opacity={0.3} />
              <XAxis dataKey="name" stroke="#00ff41" />
              <YAxis stroke="#00ff41" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1a1a1a', 
                  border: '1px solid #00ff41',
                  color: '#00ff41'
                }} 
              />
              <Bar dataKey="threats" fill="#00ff41" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-cyber-gray p-6 rounded-lg glow-border">
        <h3 className="text-lg font-semibold mb-4">Recent Alerts</h3>
        <div className="space-y-3">
          {notifications.slice(0, 5).map((notification) => (
            <div key={notification.id} className="flex items-start space-x-3 p-3 bg-cyber-light-gray rounded">
              <div className="text-lg">
                {notification.type === 'fake_post' ? '📱' : 
                 notification.type === 'deepfake' ? '🎭' : '🔔'}
              </div>
              <div className="flex-1">
                <div className="font-medium">{notification.title}</div>
                <div className="text-sm text-cyber-green/70">{notification.message}</div>
                <div className="text-xs text-cyber-green/50 mt-1">
                  {new Date(notification.timestamp).toLocaleString()}
                </div>
              </div>
              <div className={`px-2 py-1 rounded text-xs font-medium ${
                notification.risk_level === 'High' ? 'risk-high' :
                notification.risk_level === 'Medium' ? 'risk-medium' : 'risk-low'
              }`}>
                {notification.risk_level}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
