# LinkedIn Hashtag Engine

**AI-powered hashtag generation for LinkedIn posts in 2-3 seconds**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/saurav02022/linkedin-hashtag-refresh-engine)

[Live Demo](https://ai-linkedin-hashtag-refresh-engine-app.vercel.app) · [Report Bug](https://github.com/saurav02022/linkedin-hashtag-refresh-engine/issues) · [Request Feature](https://github.com/saurav02022/linkedin-hashtag-refresh-engine/issues)

---

## Features

- **Lightning Fast** - Generate 10-12 hashtags in 2-3 seconds using Google Gemini 2.5 Flash
- **3 Strategic Batches** - Maximum Reach, Viral Potential, Niche Engagement
- **One-Click Posting** - Post hashtags directly to LinkedIn as comments
- **100% Free** - Unlimited generations, supported by non-intrusive ads
- **Production Ready** - Built with Next.js 15, TypeScript, TanStack Query

## Quick Start

```bash
# Clone the repository
git clone https://github.com/sauravkumar/linkedin-hashtag-refresh-engine.git
cd linkedin-hashtag-refresh-engine

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Add your credentials to .env.local
# - LINKEDIN_CLIENT_ID & LINKEDIN_CLIENT_SECRET (from https://www.linkedin.com/developers/)
# - GEMINI_API_KEY (from https://makersuite.google.com/app/apikey)
# - NEXTAUTH_SECRET (generate with: openssl rand -base64 32)

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Tech Stack

- **Framework:** Next.js 15 (App Router, Server Actions)
- **Language:** TypeScript
- **Auth:** NextAuth.js (LinkedIn OAuth)
- **AI:** Google Gemini 2.5 Flash API
- **State:** TanStack Query, Zustand
- **UI:** Tailwind CSS, Radix UI, Lucide Icons
- **Forms:** React Hook Form, Zod
- **Analytics:** Google Analytics 4, Sentry
- **Deployment:** Vercel

## Environment Variables

Required variables for `.env.local`:

```bash
# LinkedIn OAuth (https://www.linkedin.com/developers/)
LINKEDIN_CLIENT_ID=your_client_id
LINKEDIN_CLIENT_SECRET=your_client_secret

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret_here  # openssl rand -base64 32

# Google Gemini API (https://makersuite.google.com/app/apikey)
GEMINI_API_KEY=your_gemini_api_key
```

Optional (Phase 3 & 4):
```bash
# Analytics & Monitoring
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_SENTRY_DSN=https://xxx@xxx.ingest.sentry.io/xxx
SENTRY_DSN=https://xxx@xxx.ingest.sentry.io/xxx

# Monetization
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-XXXXXXXXXXXXXXXX
```

See `.env.example` for full configuration.

## Development

```bash
# Start dev server with Turbopack
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run with Docker
docker compose up
```

## Deployment

### Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Import project on [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy

### Deploy with Docker

```bash
# Build production image
docker build -t hashtag-engine .

# Run container
docker run -p 3000:8080 --env-file .env.local hashtag-engine
```

## Project Structure

```
linkedin-hashtag-refresh-engine/
├── app/                    # Next.js App Router
│   ├── (dashboard)/       # Authenticated routes
│   ├── (public)/          # Public routes
│   ├── api/               # API routes
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── ui/               # UI primitives (shadcn)
│   ├── ads/              # AdSense components
│   ├── home/             # Home page sections
│   ├── posts/            # Hashtag generation
│   └── shared/           # Shared components
├── lib/                   # Utilities & configs
│   ├── api/              # API clients
│   ├── hooks/            # Custom hooks
│   ├── providers/        # Context providers
│   └── validations/      # Zod schemas
└── types/                 # TypeScript types
```

## Documentation

- **[PRD.md](PRD.md)** - Product Requirements Document
- **[DESIGN_SYSTEM.md](DESIGN_SYSTEM.md)** - Design system and UI guidelines
- **[ADSENSE_SETUP.md](ADSENSE_SETUP.md)** - Google AdSense integration guide
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Deployment instructions (if exists)

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Support

- **Issues:** [GitHub Issues](https://github.com/saurav02022/linkedin-hashtag-refresh-engine/issues)
- **Discussions:** [GitHub Discussions](https://github.com/saurav02022/linkedin-hashtag-refresh-engine/discussions)
- **Email:** saurav02022@gmail.com

---

**Built with ❤️ by [Saurav Kumar](https://github.com/saurav02022)**
