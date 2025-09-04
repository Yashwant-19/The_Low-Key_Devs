# Cerberus Watch - Improved PowerShell Startup Script
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   Cerberus Watch - Improved Startup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if Python is installed
try {
    $pythonVersion = python --version 2>&1
    Write-Host "✓ Python found: $pythonVersion" -ForegroundColor Green
} catch {
    Write-Host "ERROR: Python is not installed or not in PATH" -ForegroundColor Red
    Write-Host "Please install Python and try again" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

# Check if Node.js is installed
try {
    $nodeVersion = node --version 2>&1
    Write-Host "✓ Node.js found: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "ERROR: Node.js is not installed or not in PATH" -ForegroundColor Red
    Write-Host "Please install Node.js and try again" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""

# Kill existing processes on ports 3000 and 5000
Write-Host "Cleaning up existing processes..." -ForegroundColor Yellow
try {
    $processes3000 = Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess
    $processes5000 = Get-NetTCPConnection -LocalPort 5000 -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess
    
    if ($processes3000) {
        Stop-Process -Id $processes3000 -Force -ErrorAction SilentlyContinue
    }
    if ($processes5000) {
        Stop-Process -Id $processes5000 -Force -ErrorAction SilentlyContinue
    }
    Write-Host "✓ Ports cleared" -ForegroundColor Green
} catch {
    Write-Host "✓ Port cleanup completed" -ForegroundColor Green
}

Write-Host ""
Write-Host "Starting Backend Server..." -ForegroundColor Yellow

# Setup backend
Set-Location "backend"

# Check if virtual environment exists
if (-not (Test-Path "venv")) {
    Write-Host "Creating virtual environment..." -ForegroundColor Yellow
    python -m venv venv
}

# Activate virtual environment and install dependencies
Write-Host "Installing backend dependencies..." -ForegroundColor Yellow
& ".\venv\Scripts\Activate.ps1"
pip install -r requirements.txt --quiet

# Start backend in new window
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD'; .\venv\Scripts\Activate.ps1; python app.py" -WindowStyle Normal

Write-Host "✓ Backend server starting on http://localhost:5000" -ForegroundColor Green

# Wait for backend to start
Start-Sleep -Seconds 3

Write-Host ""
Write-Host "Starting Frontend Server..." -ForegroundColor Yellow

# Setup frontend
Set-Location "..\frontend"

# Install frontend dependencies
Write-Host "Installing frontend dependencies..." -ForegroundColor Yellow
npm install --silent

# Start frontend in new window
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD'; npm start" -WindowStyle Normal

Write-Host "✓ Frontend server starting on http://localhost:3000" -ForegroundColor Green

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   Application Started Successfully!" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Backend:  http://localhost:5000" -ForegroundColor White
Write-Host "Frontend: http://localhost:3000" -ForegroundColor White
Write-Host ""
Write-Host "Demo Credentials:" -ForegroundColor Yellow
Write-Host "• Admin: admin / admin123" -ForegroundColor White
Write-Host "• Threat Detector: detector / detector123" -ForegroundColor White
Write-Host "• Risk Analyst: analyst / analyst123" -ForegroundColor White
Write-Host "• Database Auditor: auditor / auditor123" -ForegroundColor White
Write-Host ""
Read-Host "Press Enter to exit this window"
