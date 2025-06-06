# 🎨 Sanity CMS Setup Guide

## Quick Start

### 1. Create Sanity Project
```bash
# Navigate to your project directory
cd /path/to/your/project

# Initialize Sanity (if not already done)
npx sanity@latest init --env

# Or create a new project
npx sanity@latest init
```

### 2. Configure Environment Variables
Update your `.env.local` file with:
```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=veayoeex
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your-api-token-with-editor-permissions
```

### 3. Access Sanity Studio
- **Local Studio**: http://localhost:3000/studio
- **Sanity Cloud**: https://your-project.sanity.studio

## Content Structure

### 📚 **Book Chapters**
- **Purpose**: Main book content with subscription gating
- **Features**: 
  - Chapter ordering
  - Premium content flags
  - Reading time estimates
  - Exercises and takeaways
  - Rich text with callouts

### ✍️ **Blog Posts**
- **Purpose**: Marketing content and thought leadership
- **Features**:
  - Author attribution
  - Categories and tags
  - Featured posts
  - Premium content gating
  - SEO optimization

### 👤 **Authors**
- **Purpose**: Author profiles and attribution
- **Features**:
  - Bio and social media links
  - Profile images
  - Linked blog posts

### 📂 **Categories**
- **Purpose**: Organize blog content
- **Features**:
  - Color coding
  - Post counting
  - SEO-friendly slugs

### ⚙️ **Site Settings**
- **Purpose**: Global site configuration
- **Features**:
  - Logo and branding
  - Social media links
  - SEO defaults
  - Contact information

## Getting Started Content

### 1. Create Author Profile
1. Go to Studio → Authors
2. Create new author (Thomas Njeru)
3. Add bio, image, social links

### 2. Create Blog Categories
- **Philosophy** (purple)
- **Self-Development** (blue)
- **Writing** (green)
- **Book Updates** (orange)

### 3. Add First Chapter
1. Go to Studio → Book Chapters
2. Create "Introduction" (Chapter 1)
3. Set as unlocked for preview
4. Add rich content with callouts

### 4. Configure Site Settings
1. Go to Studio → Site Settings
2. Add site title and description
3. Upload logo and favicon
4. Set social media links

## Content Management Tips

### 🔒 **Content Gating Strategy**
- **Free Users**: Chapters 1-3 + all blog previews
- **Premium**: All chapters + full blog posts
- **VIP**: Everything + exclusive content

### 📝 **Writing Best Practices**
- Use callout boxes for key insights
- Add exercises at chapter end
- Include reading time estimates
- Optimize for mobile reading

### 🎨 **Rich Content Features**
- **Callouts**: Info, Warning, Success, Exercise
- **Images**: Auto-optimized with alt text
- **Links**: Internal and external
- **Formatting**: Headers, lists, quotes

## Development Integration

### Fetching Content
```typescript
import { getChapters, getBlogPosts } from '@/lib/sanity'

// Get all published chapters
const chapters = await getChapters()

// Get blog posts
const posts = await getBlogPosts()
```

### Rendering Content
```tsx
import PortableText from '@/components/PortableText'

// Render rich text content
<PortableText value={chapter.content} />
```

### Content Gating
```typescript
import { canAccessContent } from '@/lib/contentAccess'

const hasAccess = canAccessContent(userTier, chapter.isPremium)
```

## Next Steps

1. **Set up Sanity project** and get credentials
2. **Configure environment variables**
3. **Access Studio** at `/studio`
4. **Create initial content** (author, categories, first chapter)
5. **Update existing pages** to use Sanity content
6. **Deploy** with Sanity integration

## Support

- **Sanity Docs**: https://www.sanity.io/docs
- **GROQ Queries**: https://www.sanity.io/docs/groq
- **Studio**: https://www.sanity.io/docs/sanity-studio 