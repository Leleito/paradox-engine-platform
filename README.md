# The Paradox Engine - Book Subscription Platform

A modern, mobile-first book subscription platform built with Next.js 14, TypeScript, and Tailwind CSS. Designed for "The Paradox Engine" book by Thomas Njeru.

## Features

- 🎨 Beautiful, Goodreads-inspired design with burgundy color scheme
- 📱 Mobile-first responsive design
- 📧 Lead magnet with email capture
- 💳 Subscription management UI
- 📖 Reading interface with progress tracking
- 🎯 SEO optimized
- ⚡ Fast performance with Next.js 14
- 🔒 TypeScript for type safety

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
cd paradox-engine-platform
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Tech Stack

- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Headless UI, Lucide React
- **Animations:** Framer Motion
- **Forms:** React Hook Form

## Project Structure

```
/
├── app/                 # Next.js 14 app directory
├── components/          # React components
├── public/             # Static assets
├── styles/             # Global styles
└── types/              # TypeScript type definitions
```

## Key Components

- **Hero Section:** Eye-catching landing with lead magnet CTA
- **Book Preview:** Chapter navigation and reading interface
- **Lead Magnet Modal:** Email capture with form validation
- **Subscription Plans:** Pricing tiers with feature comparison
- **Author Musings:** Blog-style content section
- **Social Proof:** Testimonials and statistics

## Customization

### Colors
The platform uses a burgundy-based color scheme defined in `tailwind.config.js`. You can customize colors by modifying the theme configuration.

### Content
All content is currently hardcoded in components. For a production version, consider connecting to a CMS like:
- Sanity
- Contentful
- Strapi

### Email Integration
The lead magnet forms are ready for integration with email services like:
- ConvertKit
- Mailchimp
- SendGrid

### Payment Processing
Subscription forms are UI-ready for integration with:
- Stripe
- M-Pesa (Daraja API)
- PayPal

## Deployment

### Vercel (Recommended)
```bash
npm run build
vercel --prod
```

### Other Platforms
```bash
npm run build
npm start
```

## Environment Variables

Create a `.env.local` file for environment variables:

```env
NEXT_PUBLIC_SITE_URL=https://yoursite.com
EMAIL_SERVICE_API_KEY=your_email_service_key
PAYMENT_API_KEY=your_payment_service_key
```

## Performance Optimizations

- Image optimization with Next.js Image component
- CSS optimization with Tailwind CSS purging
- Code splitting with Next.js automatic optimization
- Font optimization with next/font

## SEO Features

- Metadata optimization
- OpenGraph tags
- Structured data ready
- Sitemap generation
- Robot.txt configuration

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is private and proprietary to Thomas Njeru and The Paradox Engine.

## Support

For support, email: support@theparadox-engine.com

## 🎨 Design Integration

### Book Cover Image Integration
To complete the design integration with your exact book cover:

1. **Add your book cover image**: 
   - Save your book cover image as `book-cover.jpg` in the `/public/` folder
   - The image will automatically appear in the Hero banner section
   - Recommended size: 400x600px or similar aspect ratio

2. **Color Palette Applied**:
   - **Light Tone**: `#C1BCB9` - Used for backgrounds and light elements
   - **Medium Tone**: `#A09790` - Used for borders and medium emphasis  
   - **Dark Tone**: `#3D392E` - Used for primary text and dark elements
   - **Warm Accent**: `#C88C5A` - Used for call-to-action buttons and highlights
   - **Deepest Tone**: `#181510` - Used for highest contrast elements

3. **Logo Styling**: The logo now uses a gradient effect combining all palette colors

## 🚀 Features

- **Serialized Book Content**: Weekly chapter releases with subscription tiers
- **Lead Magnet System**: Free preview chapters with email capture
- **Community Features**: Reader discussions and social proof
- **Mobile Responsive**: Optimized for all device sizes
- **Email Newsletter**: Automated subscription management
- **Author Blog**: "Musings" section for additional content

## 📖 Subscription Tiers

- **Free Preview**: Access to first 3 chapters
- **Premium Reader**: KES 299/month - Full book access + bonuses
- **VIP Member**: KES 799/month - Everything + exclusive content

## 🛠 Tech Stack

- **Frontend**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with custom design system
- **Icons**: Lucide React
- **Forms**: React Hook Form with validation
- **Typography**: Inter + Playfair Display fonts

## 🎯 Getting Started

1. **Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000)

2. **Build for Production**:
   ```bash
   npm run build
   npm start
   ```

## 📁 Project Structure

```
├── app/
│   ├── globals.css          # Global styles with palette colors
│   ├── layout.tsx           # Root layout with metadata
│   ├── page.tsx            # Homepage
│   ├── musings/            # Author blog
│   └── subscribe/          # Subscription pages
├── components/
│   ├── Header.tsx          # Navigation with palette branding
│   ├── Hero.tsx            # Banner with book cover integration
│   ├── Features.tsx        # Benefits showcase
│   ├── SocialProof.tsx     # Testimonials and stats
│   ├── Newsletter.tsx      # Email subscription
│   └── Footer.tsx          # Site footer
├── public/
│   └── [book-cover.jpg]    # Add your book cover here
└── tailwind.config.js      # Design system with exact colors
```

## 🎨 Customization

### Adding Your Book Cover
Simply add your book cover image as `book-cover.jpg` in the `/public/` folder. The Hero component is already configured to display it with proper styling and fallback content.

### Color Adjustments
All colors are defined in `tailwind.config.js` using your exact palette. Modify the palette colors to make any adjustments:

```javascript
colors: {
  'palette-light': '#C1BCB9',
  'palette-medium': '#A09790', 
  'palette-dark': '#3D392E',
  'palette-warm': '#C88C5A',
  'palette-deepest': '#181510',
}
```

## 📧 Contact

For support or customization requests, reach out through the platform's contact form.

---

**The Paradox Engine** by Thomas Njeru - Transform tension into momentum. 