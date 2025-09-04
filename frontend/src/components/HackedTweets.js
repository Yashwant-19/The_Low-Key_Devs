import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HackedTweets = () => {
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTweet, setSelectedTweet] = useState(null);

  useEffect(() => {
    fetchHackedTweets();
  }, []);

  const fetchHackedTweets = async () => {
    try {
      const response = await axios.get('/api/hacked-tweets');
      setTweets(response.data);
    } catch (error) {
      console.error('Error fetching hacked tweets:', error);
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
        <div className="text-cyber-green animate-pulse">Loading hacked tweets...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold glow-text">Hacked Tweets Detection</h1>
        <div className="text-sm text-cyber-green/70">
          {tweets.length} compromised accounts detected
        </div>
      </div>

      <div className="space-y-4">
        {tweets.map((tweet) => (
          <div
            key={tweet.id}
            className="bg-cyber-gray p-6 rounded-lg glow-border hover:glow-border cursor-pointer transition-all"
            onClick={() => setSelectedTweet(tweet)}
          >
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white font-bold">
                🚨
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-cyber-green">{tweet.target_vip}</h3>
                  <span className={`px-2 py-1 rounded text-xs font-medium border ${getRiskBadgeClass(tweet.risk_level)}`}>
                    {tweet.risk_level}
                  </span>
                </div>
                
                <p className="text-sm text-cyber-green/70 mb-3 bg-cyber-light-gray p-3 rounded">
                  "{tweet.tweet_content}"
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                  <div className="flex items-center space-x-2">
                    <span className="text-cyber-green/50">Platform:</span>
                    <span className="text-cyber-green/70">{tweet.platform}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-cyber-green/50">Fake Account:</span>
                    <span className="text-cyber-green/70">{tweet.fake_account}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-cyber-green/50">Retweets:</span>
                    <span className="text-cyber-green/70">{formatNumber(tweet.retweets)}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-cyber-green/50">Likes:</span>
                    <span className="text-cyber-green/70">{formatNumber(tweet.likes)}</span>
                  </div>
                </div>

                <div className="mt-3">
                  <p className="text-xs text-cyber-green/50">
                    <strong>Reason:</strong> {tweet.reason}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tweet Detail Modal */}
      {selectedTweet && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-cyber-gray p-8 rounded-lg glow-border max-w-4xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-bold glow-text">Hacked Tweet Analysis</h2>
              <button
                onClick={() => setSelectedTweet(null)}
                className="text-cyber-green/70 hover:text-cyber-green text-2xl"
              >
                ×
              </button>
            </div>

            <div className="space-y-6">
              <div className="bg-cyber-light-gray p-6 rounded-lg">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                    🚨
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-cyber-green">{selectedTweet.target_vip}</h3>
                    <p className="text-sm text-cyber-green/70">{selectedTweet.fake_account}</p>
                  </div>
                </div>
                
                <div className="bg-cyber-gray p-4 rounded border-l-4 border-red-500">
                  <p className="text-cyber-green/70 text-lg leading-relaxed">
                    "{selectedTweet.tweet_content}"
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Tweet Information</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-cyber-green/50">Target VIP:</span>
                      <span className="text-cyber-green/70">{selectedTweet.target_vip}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-cyber-green/50">Platform:</span>
                      <span className="text-cyber-green/70">{selectedTweet.platform}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-cyber-green/50">Fake Account:</span>
                      <span className="text-cyber-green/70">{selectedTweet.fake_account}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-cyber-green/50">Risk Level:</span>
                      <span className={`px-2 py-1 rounded text-xs font-medium border ${getRiskBadgeClass(selectedTweet.risk_level)}`}>
                        {selectedTweet.risk_level}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-cyber-green/50">Detected:</span>
                      <span className="text-cyber-green/70">
                        {new Date(selectedTweet.detected_at).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Engagement Metrics</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-cyber-light-gray p-4 rounded text-center">
                      <div className="text-2xl font-bold text-cyber-green">{formatNumber(selectedTweet.retweets)}</div>
                      <div className="text-xs text-cyber-green/50">Retweets</div>
                    </div>
                    <div className="bg-cyber-light-gray p-4 rounded text-center">
                      <div className="text-2xl font-bold text-cyber-green">{formatNumber(selectedTweet.likes)}</div>
                      <div className="text-xs text-cyber-green/50">Likes</div>
                    </div>
                    <div className="bg-cyber-light-gray p-4 rounded text-center">
                      <div className="text-2xl font-bold text-cyber-green">{formatNumber(selectedTweet.replies)}</div>
                      <div className="text-xs text-cyber-green/50">Replies</div>
                    </div>
                    <div className="bg-cyber-light-gray p-4 rounded text-center">
                      <div className="text-2xl font-bold text-cyber-green">
                        {formatNumber(selectedTweet.retweets + selectedTweet.likes + selectedTweet.replies)}
                      </div>
                      <div className="text-xs text-cyber-green/50">Total Engagement</div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Detection Reason</h3>
                <p className="text-sm text-cyber-green/70 bg-cyber-light-gray p-4 rounded">
                  {selectedTweet.reason}
                </p>
              </div>

              <div>
                <a
                  href={selectedTweet.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-cyber-green text-cyber-dark rounded hover:bg-cyber-green/80 transition-colors"
                >
                  View Original Tweet
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HackedTweets;
