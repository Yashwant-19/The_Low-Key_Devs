import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('/api/auth/login', credentials);
      if (response.data.success) {
        onLogin(response.data.user);
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const demoCredentials = [
    { username: 'admin', password: 'admin123', role: 'Admin' },
    { username: 'detector', password: 'detector123', role: 'Threat Detector' },
    { username: 'analyst', password: 'analyst123', role: 'Risk Analyst' },
    { username: 'auditor', password: 'auditor123', role: 'Database Auditor' }
  ];

  return (
    <div className="min-h-screen bg-cyber-dark cyber-grid flex items-center justify-center">
      <div className="bg-cyber-gray p-8 rounded-lg glow-border max-w-md w-full mx-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold glow-text mb-2">CERBERUS WATCH</h1>
          <p className="text-cyber-green/70">VIP Threat Monitoring System</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Username</label>
            <input
              type="text"
              value={credentials.username}
              onChange={(e) => setCredentials({...credentials, username: e.target.value})}
              className="w-full px-3 py-2 bg-cyber-light-gray border border-cyber-green/30 rounded focus:outline-none focus:border-cyber-green focus:glow-border"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              value={credentials.password}
              onChange={(e) => setCredentials({...credentials, password: e.target.value})}
              className="w-full px-3 py-2 bg-cyber-light-gray border border-cyber-green/30 rounded focus:outline-none focus:border-cyber-green focus:glow-border"
              required
            />
          </div>

          {error && (
            <div className="text-red-400 text-sm text-center">{error}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-cyber-green text-cyber-dark py-2 px-4 rounded font-medium hover:bg-cyber-green/80 transition-colors disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="mt-8">
          <h3 className="text-sm font-medium mb-3 text-center">Demo Credentials:</h3>
          <div className="space-y-2 text-xs">
            {demoCredentials.map((cred, index) => (
              <div key={index} className="flex justify-between items-center bg-cyber-light-gray p-2 rounded">
                <span className="text-cyber-green/70">{cred.role}:</span>
                <div className="text-right">
                  <div>User: {cred.username}</div>
                  <div>Pass: {cred.password}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
