# Quick Setup Script for Paradox Engine Platform
# Run this script to quickly set up the development environment

Write-Host "🚀 Paradox Engine Platform - Quick Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

# Check if Node.js is installed
Write-Host "`n📦 Checking Node.js installation..." -ForegroundColor Yellow
$nodeVersion = node --version 2>$null
if ($?) {
    Write-Host "✅ Node.js is installed: $nodeVersion" -ForegroundColor Green
} else {
    Write-Host "❌ Node.js is not installed. Please install Node.js first." -ForegroundColor Red
    exit 1
}

# Check if .env.local exists
Write-Host "`n🔐 Checking environment configuration..." -ForegroundColor Yellow
if (Test-Path .env.local) {
    Write-Host "✅ .env.local file exists" -ForegroundColor Green
} else {
    Write-Host "⚠️  .env.local not found. Creating from template..." -ForegroundColor Yellow
    Copy-Item -Path env.local.template -Destination .env.local
    Write-Host "✅ Created .env.local - Please update with your credentials!" -ForegroundColor Green
}

# Install dependencies
Write-Host "`n📥 Installing dependencies..." -ForegroundColor Yellow
npm install --legacy-peer-deps

# Clear Next.js cache
Write-Host "`n🧹 Clearing Next.js cache..." -ForegroundColor Yellow
if (Test-Path .next) {
    Remove-Item -Path .next -Recurse -Force -ErrorAction SilentlyContinue
    Write-Host "✅ Cache cleared" -ForegroundColor Green
}

# Build the project
Write-Host "`n🔨 Building the project..." -ForegroundColor Yellow
npm run build

# Success message
Write-Host "`n✨ Setup complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Update .env.local with your Sanity credentials" -ForegroundColor White
Write-Host "2. Run 'npm run dev' to start the development server" -ForegroundColor White
Write-Host "3. Access the site at http://localhost:3000" -ForegroundColor White
Write-Host "4. Access Sanity Studio at http://localhost:3000/studio" -ForegroundColor White
Write-Host "========================================" -ForegroundColor Cyan
