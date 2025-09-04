import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FakePosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    fetchFakePosts();
  }, []);

  const fetchFakePosts = async () => {
    try {
      const response = await axios.get('/api/fake-posts');
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching fake posts:', error);
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
        <div className="text-cyber-green animate-pulse">Loading fake posts...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold glow-text">Fake Posts Detection</h1>
        <div className="text-sm text-cyber-green/70">
          {posts.length} fake posts detected
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-cyber-gray p-6 rounded-lg glow-border hover:glow-border cursor-pointer transition-all"
            onClick={() => setSelectedPost(post)}
          >
            <div className="flex items-start space-x-4">
              <img
                src={post.media_url}
                alt="Post media"
                className="w-20 h-20 rounded border border-cyber-green/30 object-cover"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/80x80/00ff41/000000?text=IMG';
                }}
              />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-cyber-green">{post.target_vip}</h3>
                  <span className={`px-2 py-1 rounded text-xs font-medium border ${getRiskBadgeClass(post.risk_level)}`}>
                    {post.risk_level}
                  </span>
                </div>
                
                <p className="text-sm text-cyber-green/70 mb-3 line-clamp-2">
                  {post.post_caption}
                </p>

                <div className="space-y-1 text-xs">
                  <div className="flex items-center space-x-2">
                    <span className="text-cyber-green/50">Platform:</span>
                    <span className="text-cyber-green/70">{post.platform}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-cyber-green/50">Fake Account:</span>
                    <span className="text-cyber-green/70">{post.fake_account}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-cyber-green/50">Engagement:</span>
                    <span className="text-cyber-green/70">
                      {formatNumber(post.likes)} likes, {formatNumber(post.comments)} comments
                    </span>
                  </div>
                </div>

                <div className="mt-3">
                  <p className="text-xs text-cyber-green/50">
                    <strong>Reason:</strong> {post.reason}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Post Detail Modal */}
      {selectedPost && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-cyber-gray p-8 rounded-lg glow-border max-w-4xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-bold glow-text">Fake Post Details</h2>
              <button
                onClick={() => setSelectedPost(null)}
                className="text-cyber-green/70 hover:text-cyber-green text-2xl"
              >
                ×
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <img
                  src={selectedPost.media_url}
                  alt="Post media"
                  className="w-full rounded border border-cyber-green/30"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x400/00ff41/000000?text=IMG';
                  }}
                />
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Post Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-cyber-green/50">Target VIP:</span>
                      <span className="text-cyber-green/70">{selectedPost.target_vip}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-cyber-green/50">Platform:</span>
                      <span className="text-cyber-green/70">{selectedPost.platform}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-cyber-green/50">Fake Account:</span>
                      <span className="text-cyber-green/70">{selectedPost.fake_account}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-cyber-green/50">Risk Level:</span>
                      <span className={`px-2 py-1 rounded text-xs font-medium border ${getRiskBadgeClass(selectedPost.risk_level)}`}>
                        {selectedPost.risk_level}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-cyber-green/50">Detected:</span>
                      <span className="text-cyber-green/70">
                        {new Date(selectedPost.detected_at).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Post Caption</h3>
                  <p className="text-sm text-cyber-green/70 bg-cyber-light-gray p-3 rounded">
                    {selectedPost.post_caption}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Engagement Metrics</h3>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="bg-cyber-light-gray p-3 rounded">
                      <div className="text-lg font-bold text-cyber-green">{formatNumber(selectedPost.likes)}</div>
                      <div className="text-xs text-cyber-green/50">Likes</div>
                    </div>
                    <div className="bg-cyber-light-gray p-3 rounded">
                      <div className="text-lg font-bold text-cyber-green">{formatNumber(selectedPost.comments)}</div>
                      <div className="text-xs text-cyber-green/50">Comments</div>
                    </div>
                    <div className="bg-cyber-light-gray p-3 rounded">
                      <div className="text-lg font-bold text-cyber-green">{formatNumber(selectedPost.shares)}</div>
                      <div className="text-xs text-cyber-green/50">Shares</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Detection Reason</h3>
                  <p className="text-sm text-cyber-green/70 bg-cyber-light-gray p-3 rounded">
                    {selectedPost.reason}
                  </p>
                </div>

                <div>
                  <a
                    href={selectedPost.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-cyber-green text-cyber-dark rounded hover:bg-cyber-green/80 transition-colors"
                  >
                    View Original Post
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

export default FakePosts;
