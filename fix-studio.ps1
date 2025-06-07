Write-Host "🔧 Fixing Studio Error..." -ForegroundColor Green

# Create .env.local with all required variables
$envContent = @"
# =============================================================================
# NEXTAUTH CONFIGURATION (REQUIRED)
# =============================================================================
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=paradox-engine-super-secure-secret-2025-development-key-minimum-32-chars

# =============================================================================
# GOOGLE OAUTH (TEMPORARY PLACEHOLDER)
# =============================================================================
GOOGLE_CLIENT_ID=your-google-client-id-from-google-cloud-console
GOOGLE_CLIENT_SECRET=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

# =============================================================================
# SITE CONFIGURATION
# =============================================================================
NEXT_PUBLIC_SITE_URL=http://localhost:3000
ADMIN_EMAIL=pe@laitigosystems.com

# =============================================================================
# SANITY CMS CONFIGURATION (QUICK FIX - PREVENTS STUDIO ERRORS)
# =============================================================================
NEXT_PUBLIC_SANITY_PROJECT_ID=dummy-project
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=dummy-token

# =============================================================================
# UI CONFIGURATION
# =============================================================================
NEXT_PUBLIC_SHOW_BANNER=false
NEXT_PUBLIC_USE_HERO_BANNER=false
NEXT_PUBLIC_LOGO_FONT=font-serif
"@

# Write to file
$envContent | Out-File -FilePath ".env.local" -Encoding UTF8

Write-Host "✅ Created .env.local file" -ForegroundColor Green
Write-Host ""
Write-Host "🧹 Clearing Next.js cache..." -ForegroundColor Yellow
Remove-Item -Path ".next" -Recurse -Force -ErrorAction SilentlyContinue

Write-Host "✅ Cache cleared" -ForegroundColor Green
Write-Host ""
Write-Host "🚀 Studio error fixed! Please restart your development server:" -ForegroundColor Cyan
Write-Host "   npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "📝 Note: This is a quick fix. For full Studio functionality, you'll need:" -ForegroundColor Yellow
Write-Host "   1. Create a Sanity.io account" -ForegroundColor White
Write-Host "   2. Create a new project" -ForegroundColor White
Write-Host "   3. Update .env.local with real Sanity credentials" -ForegroundColor White 