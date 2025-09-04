from flask import Flask, jsonify, request
from flask_cors import CORS
import json
import os
from datetime import datetime
import random

app = Flask(__name__)
CORS(app)

# Load JSON datasets
def load_json_data(filename):
    try:
        with open(f'data/{filename}', 'r', encoding='utf-8') as f:
            return json.load(f)
    except FileNotFoundError:
        return []

# API Routes
@app.route('/api/vips', methods=['GET'])
def get_vips():
    vips = load_json_data('vip_profiles.json')
    return jsonify(vips)

@app.route('/api/fake-posts', methods=['GET'])
def get_fake_posts():
    posts = load_json_data('fake_posts.json')
    return jsonify(posts)

@app.route('/api/deepfakes', methods=['GET'])
def get_deepfakes():
    deepfakes = load_json_data('deepfake_samples.json')
    return jsonify(deepfakes)

@app.route('/api/hacked-tweets', methods=['GET'])
def get_hacked_tweets():
    tweets = load_json_data('hacked_tweets.json')
    return jsonify(tweets)

@app.route('/api/news-mentions', methods=['GET'])
def get_news_mentions():
    news = load_json_data('news_mentions.json')
    return jsonify(news)

@app.route('/api/notifications', methods=['GET'])
def get_notifications():
    # Generate real-time style notifications
    notifications = []
    
    # Load all data to generate contextual notifications
    vips = load_json_data('vip_profiles.json')
    fake_posts = load_json_data('fake_posts.json')
    deepfakes = load_json_data('deepfake_samples.json')
    hacked_tweets = load_json_data('hacked_tweets.json')
    
    # Generate notifications based on data
    for post in fake_posts[:3]:  # Show top 3 fake posts as notifications
        notifications.append({
            'id': f"fake_post_{post.get('id', random.randint(1000, 9999))}",
            'type': 'fake_post',
            'title': '⚠️ High Risk: Fake Post Detected',
            'message': f"Fake post targeting {post.get('target_vip', 'Unknown VIP')}",
            'risk_level': post.get('risk_level', 'High'),
            'timestamp': datetime.now().isoformat(),
            'details': post
        })
    
    for deepfake in deepfakes[:2]:  # Show top 2 deepfakes
        notifications.append({
            'id': f"deepfake_{deepfake.get('id', random.randint(1000, 9999))}",
            'type': 'deepfake',
            'title': '🚨 Critical: Deepfake Detected',
            'message': f"Deepfake media targeting {deepfake.get('target_vip', 'Unknown VIP')}",
            'risk_level': 'High',
            'timestamp': datetime.now().isoformat(),
            'details': deepfake
        })
    
    return jsonify(notifications)

@app.route('/api/stats', methods=['GET'])
def get_stats():
    # Generate statistics from all datasets
    fake_posts = load_json_data('fake_posts.json')
    deepfakes = load_json_data('deepfake_samples.json')
    hacked_tweets = load_json_data('hacked_tweets.json')
    news_mentions = load_json_data('news_mentions.json')
    
    stats = {
        'total_threats': len(fake_posts) + len(deepfakes) + len(hacked_tweets) + len(news_mentions),
        'fake_posts': len(fake_posts),
        'deepfakes': len(deepfakes),
        'hacked_tweets': len(hacked_tweets),
        'news_mentions': len(news_mentions),
        'risk_distribution': {
            'high': sum(1 for item in fake_posts + deepfakes + hacked_tweets + news_mentions 
                       if item.get('risk_level', '').lower() == 'high'),
            'medium': sum(1 for item in fake_posts + deepfakes + hacked_tweets + news_mentions 
                         if item.get('risk_level', '').lower() == 'medium'),
            'low': sum(1 for item in fake_posts + deepfakes + hacked_tweets + news_mentions 
                      if item.get('risk_level', '').lower() == 'low')
        },
        'platform_distribution': {
            'instagram': len(fake_posts),
            'twitter': len(hacked_tweets),
            'news': len(news_mentions),
            'deepfake': len(deepfakes)
        }
    }
    
    return jsonify(stats)

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint to verify server is running"""
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.now().isoformat(),
        'message': 'Cerberus Watch API is running'
    })

@app.route('/api/auth/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    
    # Simple role-based authentication (for demo purposes)
    users = {
        'admin': {'password': 'admin123', 'role': 'Admin'},
        'detector': {'password': 'detector123', 'role': 'Threat Detector'},
        'analyst': {'password': 'analyst123', 'role': 'Risk Analyst'},
        'auditor': {'password': 'auditor123', 'role': 'Database Auditor'}
    }
    
    if username in users and users[username]['password'] == password:
        return jsonify({
            'success': True,
            'user': {
                'username': username,
                'role': users[username]['role']
            }
        })
    
    return jsonify({'success': False, 'message': 'Invalid credentials'}), 401

if __name__ == '__main__':
    app.run(debug=True, port=5000)
