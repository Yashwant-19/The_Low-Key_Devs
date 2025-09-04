import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NewsMentions = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedNews, setSelectedNews] = useState(null);

  useEffect(() => {
    fetchNewsMentions();
  }, []);

  const fetchNewsMentions = async () => {
    try {
      const response = await axios.get('/api/news-mentions');
      setNews(response.data);
    } catch (error) {
      console.error('Error fetching news mentions:', error);
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
        <div className="text-cyber-green animate-pulse">Loading news mentions...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold glow-text">News Mentions Monitoring</h1>
        <div className="text-sm text-cyber-green/70">
          {news.length} suspicious news articles detected
        </div>
      </div>

      <div className="space-y-4">
        {news.map((article) => (
          <div
            key={article.id}
            className="bg-cyber-gray p-6 rounded-lg glow-border hover:glow-border cursor-pointer transition-all"
            onClick={() => setSelectedNews(article)}
          >
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-yellow-600 rounded-full flex items-center justify-center text-white font-bold">
                📰
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-cyber-green">{article.target_vip}</h3>
                  <span className={`px-2 py-1 rounded text-xs font-medium border ${getRiskBadgeClass(article.risk_level)}`}>
                    {article.risk_level}
                  </span>
                </div>
                
                <h4 className="text-base font-medium text-cyber-green/90 mb-2">
                  {article.headline}
                </h4>
                
                <p className="text-sm text-cyber-green/70 mb-3 line-clamp-2">
                  {article.content_snippet}
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                  <div className="flex items-center space-x-2">
                    <span className="text-cyber-green/50">Source:</span>
                    <span className="text-cyber-green/70">{article.source}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-cyber-green/50">Published:</span>
                    <span className="text-cyber-green/70">
                      {new Date(article.published_at).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-cyber-green/50">Detected:</span>
                    <span className="text-cyber-green/70">
                      {new Date(article.detected_at).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-cyber-green/50">Risk:</span>
                    <span className={`px-1 py-0.5 rounded text-xs font-medium border ${getRiskBadgeClass(article.risk_level)}`}>
                      {article.risk_level}
                    </span>
                  </div>
                </div>

                <div className="mt-3">
                  <p className="text-xs text-cyber-green/50">
                    <strong>Reason:</strong> {article.reason}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* News Detail Modal */}
      {selectedNews && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-cyber-gray p-8 rounded-lg glow-border max-w-4xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-bold glow-text">News Article Analysis</h2>
              <button
                onClick={() => setSelectedNews(null)}
                className="text-cyber-green/70 hover:text-cyber-green text-2xl"
              >
                ×
              </button>
            </div>

            <div className="space-y-6">
              <div className="bg-cyber-light-gray p-6 rounded-lg">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                    📰
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-cyber-green">{selectedNews.target_vip}</h3>
                    <p className="text-sm text-cyber-green/70">{selectedNews.source}</p>
                  </div>
                </div>
                
                <h4 className="text-xl font-bold text-cyber-green mb-4">
                  {selectedNews.headline}
                </h4>
                
                <div className="bg-cyber-gray p-4 rounded border-l-4 border-yellow-500">
                  <p className="text-cyber-green/70 leading-relaxed">
                    {selectedNews.content_snippet}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Article Information</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-cyber-green/50">Target VIP:</span>
                      <span className="text-cyber-green/70">{selectedNews.target_vip}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-cyber-green/50">Source:</span>
                      <span className="text-cyber-green/70">{selectedNews.source}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-cyber-green/50">Published:</span>
                      <span className="text-cyber-green/70">
                        {new Date(selectedNews.published_at).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-cyber-green/50">Detected:</span>
                      <span className="text-cyber-green/70">
                        {new Date(selectedNews.detected_at).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-cyber-green/50">Risk Level:</span>
                      <span className={`px-2 py-1 rounded text-xs font-medium border ${getRiskBadgeClass(selectedNews.risk_level)}`}>
                        {selectedNews.risk_level}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Analysis</h3>
                  <div className="bg-cyber-light-gray p-4 rounded">
                    <p className="text-sm text-cyber-green/70">
                      <strong>Detection Reason:</strong><br />
                      {selectedNews.reason}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <a
                  href={selectedNews.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-cyber-green text-cyber-dark rounded hover:bg-cyber-green/80 transition-colors"
                >
                  View Original Article
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsMentions;
