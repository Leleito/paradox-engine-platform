# 📊 **Data Storage Plan - The Paradox Engine Platform**

## 🗄️ **User Data Storage Strategy**

### **Phase 1: Current Implementation (Production Ready)**
- **NextAuth.js Sessions**: JWT tokens for authentication
- **Environment Variables**: Admin credentials (hashed in production)
- **Local Storage**: User preferences and reading progress
- **Email Services**: ConvertKit/Mailchimp for newsletter subscriptions

### **Phase 2: Database Integration (Recommended for Scale)**

## 🏗️ **Database Schema Design**

### **Users Table**
```sql
CREATE TABLE users (
  id VARCHAR(255) PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  image_url VARCHAR(500),
  provider VARCHAR(50), -- 'google', 'credentials', etc.
  role ENUM('user', 'admin', 'subscriber') DEFAULT 'user',
  subscription_status ENUM('free', 'premium', 'vip') DEFAULT 'free',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  last_login TIMESTAMP,
  email_verified BOOLEAN DEFAULT FALSE,
  preferences JSON -- Reading preferences, theme, notifications
);
```

### **Subscriptions Table**
```sql
CREATE TABLE subscriptions (
  id VARCHAR(255) PRIMARY KEY,
  user_id VARCHAR(255) REFERENCES users(id) ON DELETE CASCADE,
  plan_type ENUM('free', 'premium', 'vip') NOT NULL,
  status ENUM('active', 'cancelled', 'paused', 'expired') DEFAULT 'active',
  start_date DATE NOT NULL,
  end_date DATE,
  amount DECIMAL(10,2),
  currency VARCHAR(3) DEFAULT 'KES',
  payment_method VARCHAR(50), -- 'stripe', 'mpesa', 'paypal'
  stripe_subscription_id VARCHAR(255),
  mpesa_transaction_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### **Reading Progress Table**
```sql
CREATE TABLE reading_progress (
  id VARCHAR(255) PRIMARY KEY,
  user_id VARCHAR(255) REFERENCES users(id) ON DELETE CASCADE,
  chapter_id VARCHAR(255) NOT NULL,
  progress_percentage DECIMAL(5,2) DEFAULT 0.00,
  completed BOOLEAN DEFAULT FALSE,
  reading_time_minutes INT DEFAULT 0,
  last_read_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  notes TEXT,
  bookmarks JSON -- Array of bookmark positions
);
```

### **Email Subscriptions Table**
```sql
CREATE TABLE email_subscriptions (
  id VARCHAR(255) PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  source VARCHAR(100), -- 'newsletter', 'lead_magnet', 'subscription'
  status ENUM('subscribed', 'unsubscribed', 'bounced') DEFAULT 'subscribed',
  tags JSON, -- ['early_reader', 'premium_subscriber', etc.]
  subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  unsubscribed_at TIMESTAMP NULL,
  external_id VARCHAR(255) -- ConvertKit/Mailchimp ID
);
```

### **Chapters Table**
```sql
CREATE TABLE chapters (
  id VARCHAR(255) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  content LONGTEXT,
  excerpt TEXT,
  reading_time_minutes INT DEFAULT 8,
  is_free BOOLEAN DEFAULT FALSE,
  order_number INT NOT NULL,
  published_at TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## 🚀 **Implementation Options**

### **Option A: Serverless (Recommended for Start)**
- **Database**: PlanetScale (MySQL) or Supabase (PostgreSQL)
- **Authentication**: NextAuth.js (current)
- **File Storage**: Vercel Blob or AWS S3
- **Email**: ConvertKit + Resend
- **Payments**: Stripe + M-Pesa Integration

```typescript
// Database setup with Prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

model User {
  id                String   @id @default(cuid())
  email             String   @unique
  name              String?
  image             String?
  provider          String?
  role              Role     @default(USER)
  subscriptionStatus SubscriptionStatus @default(FREE)
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
  lastLogin         DateTime?
  emailVerified     Boolean  @default(false)
  preferences       Json?
  
  subscriptions     Subscription[]
  readingProgress   ReadingProgress[]
  
  @@map("users")
}
```

### **Option B: Traditional Server**
- **Database**: PostgreSQL on Railway/Heroku
- **ORM**: Prisma or TypeORM
- **Authentication**: NextAuth.js
- **File Storage**: Cloudinary
- **Email**: SendGrid
- **Payments**: Stripe

## 🔐 **Data Security & Privacy**

### **Security Measures**
```typescript
// Password hashing (already implemented)
import bcrypt from 'bcrypt'

const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 12)
}

// Data encryption for sensitive fields
import crypto from 'crypto'

const encryptSensitiveData = (data: string) => {
  const cipher = crypto.createCipher('aes-256-cbc', process.env.ENCRYPTION_KEY!)
  let encrypted = cipher.update(data, 'utf8', 'hex')
  encrypted += cipher.final('hex')
  return encrypted
}
```

### **GDPR Compliance**
- User data export functionality
- Right to deletion (cascade deletes)
- Consent tracking for marketing emails
- Data retention policies

## 📈 **Migration Strategy**

### **Current to Phase 2 Migration**
```typescript
// Migration script for existing users
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const migrateExistingUsers = async () => {
  // Migrate OAuth users from sessions to database
  // Import newsletter subscribers from ConvertKit
  // Set up reading progress for existing content
}
```

## 🛠️ **Environment Variables for Data Storage**

```bash
# Database
DATABASE_URL="mysql://user:pass@host:port/paradox_engine"

# Authentication (existing)
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="https://your-domain.vercel.app"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="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"

# Email Services
CONVERTKIT_API_KEY="your-convertkit-api-key"
CONVERTKIT_FORM_ID="your-form-id"
RESEND_API_KEY="your-resend-api-key"

# Payment Processing
STRIPE_SECRET_KEY="sk_live_..."
STRIPE_PUBLISHABLE_KEY="pk_live_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
MPESA_CONSUMER_KEY="your-mpesa-consumer-key"
MPESA_CONSUMER_SECRET="your-mpesa-consumer-secret"

# File Storage
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# Security
ENCRYPTION_KEY="your-32-character-encryption-key"

# Feature Flags
NEXT_PUBLIC_SHOW_BANNER="false"
NEXT_PUBLIC_USE_HERO_BANNER="false"
NEXT_PUBLIC_LOGO_FONT="font-serif"
```

## 📊 **Analytics & Monitoring**

### **User Behavior Tracking**
- Reading time per chapter
- Drop-off points in content
- Subscription conversion rates
- Email engagement metrics

### **Performance Monitoring**
- Database query performance
- API response times
- User session duration
- Error tracking with Sentry

## 🔄 **Backup & Recovery**

### **Automated Backups**
- Daily database backups to AWS S3
- User data export capabilities
- Point-in-time recovery
- Cross-region replication for critical data

## 📞 **Support & Maintenance**

### **Data Management Tools**
- Admin dashboard for user management
- Subscription management interface
- Content management system
- Analytics dashboard

---

## 🎯 **Immediate Implementation Steps**

1. **Choose Database Provider** (PlanetScale recommended)
2. **Set up Prisma ORM** 
3. **Implement user migration script**
4. **Add email service integration**
5. **Set up payment processing**
6. **Deploy with environment variables**

**For immediate deployment, the current JWT-based system is production-ready. Database integration can be added incrementally.** 

## 🚀 **Environment Variables for Production**

```bash
# Database
DATABASE_URL="mysql://user:pass@host:port/paradox_engine"

# Authentication
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="https://your-domain.vercel.app"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="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"

# Feature Flags
NEXT_PUBLIC_SHOW_BANNER="false"
NEXT_PUBLIC_USE_HERO_BANNER="false"
NEXT_PUBLIC_LOGO_FONT="font-serif"

# Admin
ADMIN_EMAIL="pe@laitigosystems.com"
```

## 🔐 **Current Data Storage (Production Ready)**

1. **User Authentication**: OAuth via Google + Admin credentials
2. **Session Management**: JWT tokens (NextAuth.js)
3. **Email Collection**: Newsletter forms → Email service
4. **Reading Progress**: Browser localStorage
5. **Subscription Status**: Session-based

**This setup is production-ready for launch. Database can be added later for enhanced features.** 