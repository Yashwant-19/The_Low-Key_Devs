import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Deepfakes = () => {
  const [deepfakes, setDeepfakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDeepfake, setSelectedDeepfake] = useState(null);

  useEffect(() => {
    fetchDeepfakes();
  }, []);

  const fetchDeepfakes = async () => {
    try {
      const response = await axios.get('/api/deepfakes');
      setDeepfakes(response.data);
    } catch (error) {
      console.error('Error fetching deepfakes:', error);
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

  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-cyber-green animate-pulse">Loading deepfake samples...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold glow-text">Deepfake Detection</h1>
        <div className="text-sm text-cyber-green/70">
          {deepfakes.length} deepfake samples detected
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {deepfakes.map((deepfake) => (
          <div
            key={deepfake.id}
            className="bg-cyber-gray p-6 rounded-lg glow-border hover:glow-border cursor-pointer transition-all"
            onClick={() => setSelectedDeepfake(deepfake)}
          >
            <div className="flex items-start space-x-4">
              <div className="relative">
                <img
                  src={deepfake.media_url}
                  alt="Deepfake media"
                  className="w-20 h-20 rounded border border-cyber-green/30 object-cover"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/80x80/00ff41/000000?text=DF';
                  }}
                />
                <div className="absolute -top-1 -right-1 bg-red-600 text-white text-xs px-1 rounded">
                  FAKE
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-cyber-green">{deepfake.target_vip}</h3>
                  <span className={`px-2 py-1 rounded text-xs font-medium border ${getRiskBadgeClass(deepfake.risk_level)}`}>
                    {deepfake.risk_level}
                  </span>
                </div>
                
                <p className="text-sm text-cyber-green/70 mb-3 line-clamp-2">
                  {deepfake.description}
                </p>

                <div className="space-y-1 text-xs">
                  <div className="flex items-center space-x-2">
                    <span className="text-cyber-green/50">Type:</span>
                    <span className="text-cyber-green/70">{deepfake.media_type}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-cyber-green/50">Platform:</span>
                    <span className="text-cyber-green/70">{deepfake.platform}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-cyber-green/50">Channel:</span>
                    <span className="text-cyber-green/70">{deepfake.fake_channel}</span>
                  </div>
                  {deepfake.duration && (
                    <div className="flex items-center space-x-2">
                      <span className="text-cyber-green/50">Duration:</span>
                      <span className="text-cyber-green/70">{deepfake.duration}</span>
                    </div>
                  )}
                </div>

                <div className="mt-3">
                  <p className="text-xs text-cyber-green/50">
                    <strong>Reason:</strong> {deepfake.reason}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Deepfake Detail Modal */}
      {selectedDeepfake && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-cyber-gray p-8 rounded-lg glow-border max-w-4xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-bold glow-text">Deepfake Analysis</h2>
              <button
                onClick={() => setSelectedDeepfake(null)}
                className="text-cyber-green/70 hover:text-cyber-green text-2xl"
              >
                ×
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <div className="relative">
                  <img
                    src={selectedDeepfake.media_url}
                    alt="Deepfake media"
                    className="w-full rounded border border-cyber-green/30"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400x400/00ff41/000000?text=DEEPFAKE';
                    }}
                  />
                  <div className="absolute top-2 right-2 bg-red-600 text-white text-sm px-2 py-1 rounded">
                    DEEPFAKE DETECTED
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Media Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-cyber-green/50">Target VIP:</span>
                      <span className="text-cyber-green/70">{selectedDeepfake.target_vip}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-cyber-green/50">Media Type:</span>
                      <span className="text-cyber-green/70">{selectedDeepfake.media_type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-cyber-green/50">Platform:</span>
                      <span className="text-cyber-green/70">{selectedDeepfake.platform}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-cyber-green/50">Fake Channel:</span>
                      <span className="text-cyber-green/70">{selectedDeepfake.fake_channel}</span>
                    </div>
                    {selectedDeepfake.duration && (
                      <div className="flex justify-between">
                        <span className="text-cyber-green/50">Duration:</span>
                        <span className="text-cyber-green/70">{selectedDeepfake.duration}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-cyber-green/50">Risk Level:</span>
                      <span className={`px-2 py-1 rounded text-xs font-medium border ${getRiskBadgeClass(selectedDeepfake.risk_level)}`}>
                        {selectedDeepfake.risk_level}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-cyber-green/50">Detected:</span>
                      <span className="text-cyber-green/70">
                        {new Date(selectedDeepfake.detected_at).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Description</h3>
                  <p className="text-sm text-cyber-green/70 bg-cyber-light-gray p-3 rounded">
                    {selectedDeepfake.description}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Engagement Metrics</h3>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="bg-cyber-light-gray p-3 rounded">
                      <div className="text-lg font-bold text-cyber-green">{formatNumber(selectedDeepfake.views)}</div>
                      <div className="text-xs text-cyber-green/50">Views</div>
                    </div>
                    <div className="bg-cyber-light-gray p-3 rounded">
                      <div className="text-lg font-bold text-cyber-green">{formatNumber(selectedDeepfake.likes)}</div>
                      <div className="text-xs text-cyber-green/50">Likes</div>
                    </div>
                    <div className="bg-cyber-light-gray p-3 rounded">
                      <div className="text-lg font-bold text-cyber-green">{formatNumber(selectedDeepfake.dislikes)}</div>
                      <div className="text-xs text-cyber-green/50">Dislikes</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Detection Reason</h3>
                  <p className="text-sm text-cyber-green/70 bg-cyber-light-gray p-3 rounded">
                    {selectedDeepfake.reason}
                  </p>
                </div>

                <div>
                  <a
                    href={selectedDeepfake.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-cyber-green text-cyber-dark rounded hover:bg-cyber-green/80 transition-colors"
                  >
                    View Original Content
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Deepfakes;
