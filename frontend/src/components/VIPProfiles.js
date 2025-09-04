import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VIPProfiles = () => {
  const [vips, setVips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVIP, setSelectedVIP] = useState(null);

  useEffect(() => {
    fetchVIPs();
  }, []);

  const fetchVIPs = async () => {
    try {
      const response = await axios.get('/api/vips');
      setVips(response.data);
    } catch (error) {
      console.error('Error fetching VIPs:', error);
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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-cyber-green animate-pulse">Loading VIP profiles...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold glow-text">VIP Profiles</h1>
        <div className="text-sm text-cyber-green/70">
          {vips.length} VIPs monitored
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vips.map((vip) => (
          <div
            key={vip.id}
            className="bg-cyber-gray p-6 rounded-lg glow-border hover:glow-border cursor-pointer transition-all"
            onClick={() => setSelectedVIP(vip)}
          >
            <div className="flex items-start space-x-4">
              <img
                src={vip.profile_picture}
                alt={vip.name}
                className="w-16 h-16 rounded-full border-2 border-cyber-green/30"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/64x64/00ff41/000000?text=' + vip.name.charAt(0);
                }}
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-cyber-green">{vip.name}</h3>
                <p className="text-sm text-cyber-green/70 mb-2">{vip.category}</p>
                
                <div className="space-y-1 text-xs">
                  <div className="flex items-center space-x-2">
                    <span className="text-cyber-green/50">Instagram:</span>
                    <span className="text-cyber-green/70">{vip.instagram}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-cyber-green/50">Twitter:</span>
                    <span className="text-cyber-green/70">{vip.twitter}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-cyber-green/50">Followers:</span>
                    <span className="text-cyber-green/70">{vip.followers}</span>
                  </div>
                </div>

                <div className="mt-3">
                  <span className={`px-2 py-1 rounded text-xs font-medium border ${getRiskBadgeClass(vip.risk_level)}`}>
                    {vip.risk_level} Risk
                  </span>
                </div>
              </div>
            </div>

            {vip.aliases && vip.aliases.length > 0 && (
              <div className="mt-4 pt-4 border-t border-cyber-green/20">
                <p className="text-xs text-cyber-green/50 mb-2">Known Aliases:</p>
                <div className="flex flex-wrap gap-1">
                  {vip.aliases.map((alias, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-cyber-light-gray text-cyber-green/70 rounded text-xs"
                    >
                      {alias}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* VIP Detail Modal */}
      {selectedVIP && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-cyber-gray p-8 rounded-lg glow-border max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-bold glow-text">{selectedVIP.name}</h2>
              <button
                onClick={() => setSelectedVIP(null)}
                className="text-cyber-green/70 hover:text-cyber-green text-2xl"
              >
                ×
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <img
                  src={selectedVIP.profile_picture}
                  alt={selectedVIP.name}
                  className="w-32 h-32 rounded-full border-2 border-cyber-green/30 mx-auto mb-4"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/128x128/00ff41/000000?text=' + selectedVIP.name.charAt(0);
                  }}
                />
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Profile Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-cyber-green/50">Category:</span>
                      <span className="text-cyber-green/70">{selectedVIP.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-cyber-green/50">Instagram:</span>
                      <span className="text-cyber-green/70">{selectedVIP.instagram}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-cyber-green/50">Twitter:</span>
                      <span className="text-cyber-green/70">{selectedVIP.twitter}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-cyber-green/50">Followers:</span>
                      <span className="text-cyber-green/70">{selectedVIP.followers}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-cyber-green/50">Risk Level:</span>
                      <span className={`px-2 py-1 rounded text-xs font-medium border ${getRiskBadgeClass(selectedVIP.risk_level)}`}>
                        {selectedVIP.risk_level}
                      </span>
                    </div>
                  </div>
                </div>

                {selectedVIP.aliases && selectedVIP.aliases.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Known Aliases</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedVIP.aliases.map((alias, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-cyber-light-gray text-cyber-green/70 rounded text-sm"
                        >
                          {alias}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VIPProfiles;
