@echo off
echo ========================================
echo    Cerberus Watch - Improved Startup
echo ========================================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Python is not installed or not in PATH
    echo Please install Python and try again
    pause
    exit /b 1
)

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js and try again
    pause
    exit /b 1
)

echo ✓ Python and Node.js are installed
echo.

REM Kill any existing processes on ports 3000 and 5000
echo Cleaning up existing processes...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":3000"') do taskkill /f /pid %%a >nul 2>&1
for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":5000"') do taskkill /f /pid %%a >nul 2>&1
echo ✓ Ports cleared

echo.
echo Starting Backend Server...
cd backend

REM Check if virtual environment exists, if not create it
if not exist "venv" (
    echo Creating virtual environment...
    python -m venv venv
)

REM Activate virtual environment
call venv\Scripts\activate

REM Install/update dependencies
echo Installing backend dependencies...
pip install -r requirements.txt --quiet

REM Start backend in new window
start "Cerberus Watch Backend" cmd /k "cd /d %cd% && call venv\Scripts\activate && python app.py"

echo ✓ Backend server starting on http://localhost:5000

REM Wait a moment for backend to start
timeout /t 3 /nobreak > nul

echo.
echo Starting Frontend Server...
cd ..\frontend

REM Install frontend dependencies
echo Installing frontend dependencies...
npm install --silent

REM Start frontend in new window
start "Cerberus Watch Frontend" cmd /k "cd /d %cd% && npm start"

echo ✓ Frontend server starting on http://localhost:3000

echo.
echo ========================================
echo    Application Started Successfully!
echo ========================================
echo.
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Demo Credentials:
echo • Admin: admin / admin123
echo • Threat Detector: detector / detector123
echo • Risk Analyst: analyst / analyst123
echo • Database Auditor: auditor / auditor123
echo.
echo Press any key to exit this window...
pause >nul
