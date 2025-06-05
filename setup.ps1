# PowerShell setup script for The Paradox Engine

Write-Host "Setting up The Paradox Engine project..." -ForegroundColor Green

# Create directories
New-Item -ItemType Directory -Force -Path "app"
New-Item -ItemType Directory -Force -Path "components"
New-Item -ItemType Directory -Force -Path "public"

# Create package.json
@'
{
  "name": "paradox-engine-platform",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "14.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "@types/node": "^20.0.0",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "typescript": "^5.0.0",
    "tailwindcss": "^3.3.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0",
    "lucide-react": "^0.263.1",
    "framer-motion": "^10.16.0",
    "react-hook-form": "^7.47.0",
    "@headlessui/react": "^1.7.17",
    "clsx": "^2.0.0"
  },
  "devDependencies": {
    "eslint": "^8.0.0",
    "eslint-config-next": "14.0.0"
  }
}
'@ | Out-File -FilePath "package.json" -Encoding UTF8

# Create configuration files
@'
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
  },
  experimental: {
    serverActions: true,
  },
}

module.exports = nextConfig
'@ | Out-File -FilePath "next.config.js" -Encoding UTF8

@'
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        burgundy: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
          950: '#450a0a',
        },
        cream: {
          50: '#fefef9',
          100: '#fefcf0',
          200: '#fef7d7',
          300: '#feeeb7',
          400: '#fde085',
          500: '#fbcc4a',
          600: '#f4b421',
          700: '#d49417',
          800: '#ab7518',
          900: '#8b5f1a',
          950: '#4f320a',
        }
      },
      fontFamily: {
        'display': ['Inter', 'system-ui', 'sans-serif'],
        'reading': ['Georgia', 'Charter', 'serif'],
      },
    },
  },
  plugins: [],
}
'@ | Out-File -FilePath "tailwind.config.js" -Encoding UTF8

@'
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
'@ | Out-File -FilePath "tsconfig.json" -Encoding UTF8

@'
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
'@ | Out-File -FilePath "postcss.config.js" -Encoding UTF8

Write-Host "Basic files created!" -ForegroundColor Green
Write-Host "Now run: npm install" -ForegroundColor Yellow
Write-Host "Then run: npm run dev" -ForegroundColor Yellow 