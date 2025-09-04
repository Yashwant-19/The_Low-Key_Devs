# Cerberus Watch - VIP Threat Monitoring System

A hackathon-ready web application for monitoring VIPs against threats like fake posts, misinformation, hacked accounts, and deepfakes.

## 🚀 Features

- **Role-based Authentication**: Admin, Threat Detector, Risk Analyst, Database Auditor
- **Real-time Dashboard**: Live threat monitoring with statistics and charts
- **VIP Profile Management**: Comprehensive VIP database with risk assessment
- **Threat Detection**: Fake posts, deepfakes, hacked tweets, and news mentions
- **Cyber Security Theme**: Green/black theme with modern UI
- **Responsive Design**: Works on desktop and mobile devices

## 🛠️ Tech Stack

### Backend
- **Python 3.10+** with Flask
- **Flask-CORS** for cross-origin requests
- **JSON-based data storage** (no database required for MVP)

### Frontend
- **React 18** with modern hooks
- **Tailwind CSS** for styling
- **Recharts** for data visualization
- **Axios** for API calls
- **React Router** for navigation

## 📁 Project Structure

```
Cerberus Watch Hackathon/
├── backend/
│   ├── app.py                 # Flask application
│   ├── requirements.txt       # Python dependencies
│   └── data/                  # JSON datasets
│       ├── vip_profiles.json
│       ├── fake_posts.json
│       ├── deepfake_samples.json
│       ├── hacked_tweets.json
│       └── news_mentions.json
├── frontend/
│   ├── src/
│   │   ├── components/        # React components
│   │   ├── App.js            # Main app component
│   │   ├── index.js          # Entry point
│   │   └── index.css         # Global styles
│   ├── public/
│   ├── package.json          # Node dependencies
│   └── tailwind.config.js    # Tailwind configuration
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Python 3.10+
- Node.js 16+
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment:
```bash
python -m venv venv
```

3. Activate the virtual environment:
```bash
# Windows
venv\Scripts\activate

# macOS/Linux
source venv/bin/activate
```

4. Install dependencies:
```bash
pip install -r requirements.txt
```

5. Run the Flask server:
```bash
python app.py
```

The backend will be available at `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The frontend will be available at `http://localhost:3000`

## 🔐 Demo Credentials

| Role | Username | Password |
|------|----------|----------|
| Admin | admin | admin123 |
| Threat Detector | detector | detector123 |
| Risk Analyst | analyst | analyst123 |
| Database Auditor | auditor | auditor123 |

## 📊 API Endpoints

- `GET /api/vips` - Get all VIP profiles
- `GET /api/fake-posts` - Get fake posts data
- `GET /api/deepfakes` - Get deepfake samples
- `GET /api/hacked-tweets` - Get hacked tweets
- `GET /api/news-mentions` - Get news mentions
- `GET /api/notifications` - Get real-time notifications
- `GET /api/stats` - Get dashboard statistics
- `POST /api/auth/login` - User authentication

## 🎯 Role-based Access

### Admin
- Full access to all features
- Can view all VIPs, threats, and analytics

### Threat Detector
- Access to fake posts and deepfakes
- Can monitor threat feeds and notifications

### Risk Analyst
- Access to VIP profiles and risk assessments
- Can view analytics and reports

### Database Auditor
- Access to VIP profiles and system logs
- Can audit data integrity

## 🎨 UI Features

- **Cyber Security Theme**: Green (#00ff41) and black (#0a0a0a) color scheme
- **Glow Effects**: Animated borders and text shadows
- **Responsive Grid**: Adaptive layouts for different screen sizes
- **Interactive Charts**: Pie charts and bar graphs for data visualization
- **Modal Dialogs**: Detailed views for threats and VIPs
- **Real-time Updates**: Live notification system

## 🔧 Customization

### Adding New VIPs
Edit `backend/data/vip_profiles.json` to add new VIP profiles.

### Adding New Threats
Add new entries to the respective JSON files in `backend/data/`.

### Styling
Modify `frontend/tailwind.config.js` and `frontend/src/index.css` for custom styling.

## 🚀 Deployment

### Backend Deployment
1. Set up a Python hosting service (Heroku, Railway, etc.)
2. Install dependencies: `pip install -r requirements.txt`
3. Set environment variables if needed
4. Run: `python app.py`

### Frontend Deployment
1. Build the production version: `npm run build`
2. Deploy the `build` folder to a static hosting service (Netlify, Vercel, etc.)

## 📝 License

This project is created for hackathon purposes. Feel free to use and modify as needed.

## 🤝 Contributing

This is a hackathon project. Contributions and improvements are welcome!

---

**Cerberus Watch** - Protecting VIPs in the digital age 🛡️
