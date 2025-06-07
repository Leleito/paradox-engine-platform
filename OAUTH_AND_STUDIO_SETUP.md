# 🚀 Complete Setup Guide: Google OAuth + Studio Fix

## 🚨 **IMMEDIATE FIXES NEEDED**

### Issue #1: Studio Redirect Loop (ERR_TOO_MANY_REDIRECTS)
**Cause**: Missing Sanity environment variables
**Impact**: Studio page (/studio) is completely broken

### Issue #2: Google OAuth Errors 
**Cause**: Development placeholder credentials
**Impact**: "client_id is required" errors, Google signup broken

---

## 🔧 **STEP 1: CREATE .env.local FILE (IMMEDIATE FIX)**

**Copy and paste this into a new file named `.env.local` in your project root:**

```env
# =============================================================================
# NEXTAUTH CONFIGURATION (REQUIRED)
# =============================================================================
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=paradox-engine-super-secure-secret-2025-development-key-minimum-32-chars

# =============================================================================
# GOOGLE OAUTH (WILL SETUP STEP 2)
# =============================================================================
GOOGLE_CLIENT_ID=your-google-client-id-here
GOOGLE_CLIENT_SECRET=your-google-client-secret-here

# =============================================================================
# SITE CONFIGURATION
# =============================================================================
NEXT_PUBLIC_SITE_URL=http://localhost:3000
ADMIN_EMAIL=gleleito@gmail.com

# =============================================================================
# SANITY CMS CONFIGURATION (FIXES STUDIO REDIRECTS)
# =============================================================================
NEXT_PUBLIC_SANITY_PROJECT_ID=your-sanity-project-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your-sanity-api-token

# =============================================================================
# UI CONFIGURATION
# =============================================================================
NEXT_PUBLIC_SHOW_BANNER=false
NEXT_PUBLIC_USE_HERO_BANNER=false
NEXT_PUBLIC_LOGO_FONT=font-serif
```

**After creating this file:**
1. Stop your development server (Ctrl+C)
2. Clear the build cache: `Remove-Item -Recurse -Force .next` (PowerShell)
3. Restart: `npm run dev`

---

## 🎯 **STEP 2: SETUP REAL GOOGLE OAUTH**

### A. Google Cloud Console Setup

1. **Go to [Google Cloud Console](https://console.cloud.google.com/)**

2. **Create/Select Project**
   - Click "Select a project" → "New Project"
   - Name: "Paradox Engine"
   - Click "Create"

3. **Enable APIs**
   - Go to "APIs & Services" → "Library"
   - Search "Google+ API" → Enable
   - Search "People API" → Enable

4. **Configure OAuth Consent Screen**
   - Go to "APIs & Services" → "OAuth consent screen"
   - Choose "External" → "Create"
   - Fill in:
     - App name: `The Paradox Engine`
     - User support email: `gleleito@gmail.com`
     - Developer contact: `gleleito@gmail.com`
   - Click "Save and Continue" → "Save and Continue" → "Save and Continue"

5. **Create OAuth Credentials**
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "OAuth 2.0 Client IDs"
   - Application type: `Web application`
   - Name: `Paradox Engine Web Client`

6. **Configure Authorized URLs**
   ```
   Authorized JavaScript origins:
   http://localhost:3000
   http://localhost:3001
   http://localhost:3002
   http://localhost:3003
   http://localhost:3004
   http://localhost:3005
   http://localhost:3006
   
   Authorized redirect URIs:
   http://localhost:3000/api/auth/callback/google
   http://localhost:3001/api/auth/callback/google
   http://localhost:3002/api/auth/callback/google
   http://localhost:3003/api/auth/callback/google
   http://localhost:3004/api/auth/callback/google
   http://localhost:3005/api/auth/callback/google
   http://localhost:3006/api/auth/callback/google
   ```

7. **Get Your Credentials**
   - Click "Create"
   - Copy the `Client ID` and `Client Secret`

### B. Update .env.local

Replace the placeholder values in your `.env.local`:

```env
GOOGLE_CLIENT_ID=123456789-abcdefghijklmnopqrstuvwxyz.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-your-actual-secret-here
```

---

## 🎨 **STEP 3: SETUP SANITY STUDIO (FIXES REDIRECTS)**

### Option A: Quick Fix (Skip Studio for now)
Update your `.env.local` with dummy values:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=dummy-project
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=dummy-token
```

This will stop the redirect errors, but Studio won't work.

### Option B: Full Sanity Setup

1. **Create Sanity Account**
   - Go to [sanity.io](https://www.sanity.io/)
   - Sign up with your Google account

2. **Create New Project**
   - Click "Create new project"
   - Name: "Paradox Engine Content"
   - Choose "Blog" template
   - Dataset: "production"

3. **Get Credentials**
   - Project ID will be shown (like `abc123def`)
   - Go to "API" → "Tokens" → "Add API token"
   - Name: "Paradox Engine"
   - Permissions: "Editor"
   - Copy the token

4. **Update .env.local**
   ```env
   NEXT_PUBLIC_SANITY_PROJECT_ID=your-actual-project-id
   NEXT_PUBLIC_SANITY_DATASET=production
   SANITY_API_TOKEN=your-actual-token
   ```

---

## 🧪 **STEP 4: TEST YOUR SETUP**

### Test Commands
```bash
# Clear cache and restart
Remove-Item -Recurse -Force .next
npm run dev
```

### Verification Checklist

#### ✅ **Studio Fixed**
- Visit: `http://localhost:3000/studio`
- Should load without redirect errors
- Should show Sanity Studio interface or proper error message

#### ✅ **Google OAuth Working**
- Visit: `http://localhost:3000/signup`
- Should show "Continue with Google" button
- Button should be active (not grayed out)
- Clicking should open Google auth popup

#### ✅ **App Functioning**
- Homepage loads: `http://localhost:3000`
- Dashboard works: `http://localhost:3000/dashboard`
- No console errors related to authentication

---

## 🚨 **TROUBLESHOOTING**

### Common Issues & Solutions

#### Studio Still Redirecting?
```bash
# Full reset
Remove-Item -Recurse -Force .next
Remove-Item -Recurse -Force node_modules/.cache
npm run dev
```

#### Google OAuth "redirect_uri_mismatch"?
- Check that your current port (e.g., 3004) is in the authorized redirect URIs
- Google Console → Credentials → Edit your OAuth client → Add the current port

#### "client_id is required" still showing?
- Verify `.env.local` exists in project root
- Check no typos in variable names
- Restart development server completely

#### Environment variables not loading?
- Make sure `.env.local` is in project root (same level as `package.json`)
- No spaces around `=` signs
- Restart development server

---

## 📋 **CURRENT STATUS AFTER SETUP**

### ✅ **Working Right Now**
- Email signup (always works)
- Homepage and navigation
- Dashboard functionality
- Content browsing

### 🔧 **After Google OAuth Setup**
- One-click Google signup
- Seamless authentication
- Enhanced user experience

### 🎨 **After Sanity Setup**
- Content management via Studio
- Dynamic content updates
- Full CMS functionality

---

## 🎯 **IMMEDIATE ACTION ITEMS**

1. **RIGHT NOW**: Create `.env.local` file (fixes Studio redirects)
2. **TODAY**: Set up Google OAuth (15 minutes)
3. **OPTIONAL**: Set up Sanity Studio (if you want content management)

## 📞 **Support**

If you encounter issues:
1. Check the terminal console for specific error messages
2. Verify all environment variables are correctly set
3. Test with different browser/incognito mode
4. Ensure all services (Google Cloud, Sanity) are properly configured

**Your app will work perfectly once these environment variables are properly configured!** 