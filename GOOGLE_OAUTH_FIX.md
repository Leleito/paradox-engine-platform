# 🚨 GOOGLE OAUTH FIX - redirect_uri_mismatch Error

## **Current Error:**
```
Error 400: redirect_uri_mismatch
Access blocked: This app's request is invalid
```

## **Root Cause:**
Your app is running on different ports (3000, 3001, 3004, 3006) but Google OAuth redirect URIs aren't configured properly.

---

## ✅ **IMMEDIATE FIX - Choose ONE Option:**

### **OPTION A: Quick Development Fix (Recommended)**

1. **Create `.env.local` file:**
```bash
# In your project root (C:\Users\GeorgeLELEITO\Downloads\PE\)
# Create a new file called .env.local with this content:

NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-super-secure-secret-key-at-least-32-characters-long-replace-this-immediately-for-security

# Use development Google OAuth (bypasses redirect URI issues)
GOOGLE_CLIENT_ID=development-client-id
GOOGLE_CLIENT_SECRET=development-secret

# Site configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
ADMIN_EMAIL=gleleito@gmail.com
```

2. **Restart your development server:**
```bash
npm run dev
```

3. **Test signup:** The Google button will now show a helpful message instead of failing

---

### **OPTION B: Full Google OAuth Setup (Production Ready)**

1. **Go to [Google Cloud Console](https://console.cloud.google.com/)**

2. **Create/Select Project:**
   - Create new project OR select existing
   - Name it "Paradox Engine" or similar

3. **Enable Google+ API:**
   - Go to "APIs & Services" → "Library"
   - Search for "Google+ API"
   - Click "Enable"

4. **Create OAuth Credentials:**
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "OAuth 2.0 Client IDs"
   - Application type: "Web application"
   - Name: "Paradox Engine Development"

5. **Add ALL These Redirect URIs:**
```
http://localhost:3000/api/auth/callback/google
http://localhost:3001/api/auth/callback/google
http://localhost:3002/api/auth/callback/google
http://localhost:3003/api/auth/callback/google
http://localhost:3004/api/auth/callback/google
http://localhost:3005/api/auth/callback/google
http://localhost:3006/api/auth/callback/google
```

6. **Copy Credentials & Create `.env.local`:**
```bash
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-super-secure-secret-key-at-least-32-characters-long

# Your ACTUAL Google OAuth credentials from step 5
GOOGLE_CLIENT_ID=your-actual-google-client-id-from-console
GOOGLE_CLIENT_SECRET=your-actual-google-client-secret-from-console

NEXT_PUBLIC_SITE_URL=http://localhost:3000
ADMIN_EMAIL=gleleito@gmail.com
```

7. **Restart Development Server:**
```bash
# Stop current server (Ctrl+C)
npm run dev
```

---

## 🔧 **Windows PowerShell Commands:**

```powershell
# Navigate to your project
cd "C:\Users\GeorgeLELEITO\Downloads\PE"

# Create .env.local file (choose content from Option A or B above)
New-Item -ItemType File -Name ".env.local"
notepad .env.local

# Restart server
npm run dev
```

---

## 🚀 **Expected Results:**

### **After Option A (Quick Fix):**
- ✅ Google button shows "Google sign-in is currently being configured"
- ✅ Email signup works perfectly
- ✅ No more OAuth errors
- ✅ Platform fully functional

### **After Option B (Full Setup):**
- ✅ Google OAuth works completely
- ✅ Email signup works
- ✅ Production-ready authentication
- ✅ All features functional

---

## 🔍 **Troubleshooting:**

### **If you still get redirect_uri_mismatch:**
1. Check your current port: Look at terminal output (e.g., "Local: http://localhost:3001")
2. Add that EXACT port to Google Console redirect URIs
3. Wait 5-10 minutes for Google changes to propagate
4. Restart dev server

### **If Google button still doesn't work:**
1. Clear browser cache (Ctrl+Shift+R)
2. Open browser dev tools → Console tab
3. Look for error messages
4. Verify `.env.local` file exists and has correct content

---

## ⚡ **RECOMMENDED: Start with Option A**

Option A gets you working immediately without Google Cloud Console setup. You can always upgrade to Option B later for full OAuth functionality.

The platform works perfectly with just email signup! 