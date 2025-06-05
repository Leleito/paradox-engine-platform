# Admin Portal Setup Guide

## 🔐 Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```bash
# NextAuth Configuration
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000

# Google OAuth (Required for admin access)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Admin Configuration
ADMIN_EMAIL=thomas@paradox-engine.com

# Database (Optional - for production)
MONGODB_URI=mongodb://localhost:27017/paradox-engine
```

## 🚀 Google OAuth Setup

1. **Go to Google Cloud Console**: https://console.cloud.google.com/
2. **Create a new project** or select existing project
3. **Enable Google+ API**:
   - Navigate to "APIs & Services" > "Library"
   - Search for "Google+ API" and enable it
4. **Create OAuth 2.0 Credentials**:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth 2.0 Client ID"
   - Select "Web Application"
   - Add authorized redirect URIs:
     - `http://localhost:3000/api/auth/callback/google` (development)
     - `https://yourdomain.com/api/auth/callback/google` (production)
5. **Copy Client ID and Secret** to your `.env.local` file

## 🔑 Admin Access

### Demo Credentials
- **Email**: `admin@paradox-engine.com`
- **Password**: `admin123`

### Google OAuth Access
Only these email addresses can access via Google OAuth:
- `thomas@paradox-engine.com`
- `admin@paradox-engine.com`
- The email set in `ADMIN_EMAIL` environment variable

## 🎯 Admin Portal Features

### 📊 Dashboard
- Overview statistics
- System status monitoring
- Quick actions
- Recent activity feed

### 🔌 API Management (`/admin/apis`)
- Add/edit/delete API configurations
- Secure API key storage
- Service provider integration
- Connection testing

### 🌐 Service Providers (`/admin/services`)
- External service management
- Real-time status monitoring
- Configuration management
- Regional service tracking

### 👥 User Management (`/admin/users`)
- User account management
- Role-based access control
- Activity monitoring

### 📈 Analytics (`/admin/analytics`)
- Platform usage statistics
- Revenue tracking
- User engagement metrics

### ✉️ Email Services (`/admin/email`)
- Email provider configuration
- Template management
- Delivery monitoring

### 💳 Payment Providers (`/admin/payments`)
- Payment gateway setup
- Transaction monitoring
- Revenue analytics

### 🛡️ Security (`/admin/security`)
- Access logs
- Security settings
- Authentication management

## 🛠️ Installation Steps

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your values
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. **Access admin portal**:
   - Go to `http://localhost:3000/admin/login`
   - Use demo credentials or Google OAuth

## 🔒 Security Features

- **OAuth 2.0 Integration**: Secure Google authentication
- **Role-based Access**: Admin-only access control
- **Session Management**: JWT-based sessions with 24-hour expiry
- **API Key Protection**: Masked sensitive credentials
- **CSRF Protection**: Built-in NextAuth security

## 🌍 Supported Service Providers

### Payment Gateways
- M-Pesa (Safaricom) - Kenya
- Stripe - Global
- PayPal - Global
- Flutterwave - Africa

### Email Services
- SendGrid - Global
- Mailgun - Global
- Amazon SES - Global

### SMS Providers
- Africa's Talking - Africa
- Twilio - Global
- Bulk SMS - Regional

### Storage Services
- Cloudinary - Global
- AWS S3 - Global
- Google Cloud Storage - Global

### Analytics
- Google Analytics
- Mixpanel
- Amplitude

## 🚨 Troubleshooting

### Common Issues

1. **"Access Denied" Error**:
   - Ensure your email is in the admin list
   - Check Google OAuth configuration

2. **OAuth Callback Error**:
   - Verify redirect URIs in Google Console
   - Check NEXTAUTH_URL environment variable

3. **Database Connection Issues**:
   - Verify MongoDB URI
   - Ensure database is running

4. **API Configuration Not Saving**:
   - Check form validation
   - Verify authentication status

## 📞 Support

For technical support or questions:
- Email: admin@paradox-engine.com
- Documentation: This file
- Demo: Use provided credentials above 