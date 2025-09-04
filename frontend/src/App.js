import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import VIPProfiles from './components/VIPProfiles';
import FakePosts from './components/FakePosts';
import Deepfakes from './components/Deepfakes';
import HackedTweets from './components/HackedTweets';
import NewsMentions from './components/NewsMentions';
import Notifications from './components/Notifications';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import InstagramSearch from './components/InstagramSearch';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const savedUser = localStorage.getItem('cerberus_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('cerberus_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('cerberus_user');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-cyber-dark flex items-center justify-center">
        <div className="text-cyber-green text-xl animate-pulse">Loading Cerberus Watch...</div>
      </div>
    );
  }

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-cyber-dark text-cyber-green">
        <div className="flex">
          <Sidebar user={user} />
          <div className="flex-1 flex flex-col">
            <Header user={user} onLogout={handleLogout} />
            <main className="flex-1 p-6">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/vips" element={<VIPProfiles />} />
                <Route path="/fake-posts" element={<FakePosts />} />
                <Route path="/deepfakes" element={<Deepfakes />} />
                <Route path="/hacked-tweets" element={<HackedTweets />} />
                <Route path="/news-mentions" element={<NewsMentions />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
