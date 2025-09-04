
@echo off
echo Starting Cerberus Watch - Full Stack Application
echo.
echo This will start both backend and frontend servers.
echo Backend will run on http://localhost:5000
echo Frontend will run on http://localhost:3000
echo.
echo Press any key to continue...
pause

start "Cerberus Watch Backend" cmd /k "cd backend && python -m venv venv && call venv\Scripts\activate && pip install -r requirements.txt && python app.py"

timeout /t 5 /nobreak > nul

start "Cerberus Watch Frontend" cmd /k "cd frontend && npm install && npm start"

echo.
echo Both servers are starting...
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Demo Credentials:
echo Admin: admin / admin123
echo Threat Detector: detector / detector123
echo Risk Analyst: analyst / analyst123
echo Database Auditor: auditor / auditor123
echo.
pause
