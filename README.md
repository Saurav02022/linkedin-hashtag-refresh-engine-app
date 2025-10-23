<div align="center">

# LinkedIn Hashtag Refresh Engine

### AI-Powered Hashtag Generation for LinkedIn Creators

Generate relevant, trending hashtags for your LinkedIn posts in seconds—not minutes.

[Live Demo](https://ai-linkedin-hashtag-refresh-engine-app.vercel.app) · [Documentation](#documentation) · [Report Bug](https://github.com/saurav02022/linkedin-hashtag-refresh-engine/issues) · [Request Feature](https://github.com/saurav02022/linkedin-hashtag-refresh-engine/issues)

</div>

---

## Table of Contents

- [About](#about)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Documentation](#documentation)
- [Deployment](#deployment)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

---

## About

**LinkedIn Hashtag Refresh Engine** is a SaaS application that helps LinkedIn creators save 95% of the time they spend on hashtag research. Instead of manually researching hashtags for 20-30 minutes per post, simply paste your LinkedIn post URL and get AI-powered hashtag suggestions in 2-3 seconds.

### The Problem

LinkedIn creators waste valuable time on hashtag research:
- ⏰ 20-30 minutes of manual research per post
- 📉 Hashtags lose effectiveness within 48 hours
- 🎲 No data-driven selection process
- 🔄 Repetitive, non-creative work

### The Solution

- ⚡ Generate 10-12 relevant hashtags in **< 5 seconds**
- 🤖 AI-powered analysis using Google Gemini
- 📋 One-click copy to clipboard
- 💰 Affordable SaaS pricing starting at $0

---

## Features

### Core Features

- **AI-Powered Generation** - Google Gemini 2.5 Flash analyzes your content with advanced prompting
- **Strategic Batches** - Get 3 curated strategies: Maximum Reach, Viral Potential, Engagement Focus
- **Lightning Fast** - Get results in 2-3 seconds
- **Automatic Content Extraction** - Paste URL, we extract content automatically (no manual copy-paste)
- **Editable Selection** - Add/remove hashtags before posting
- **One-Click Posting** - Post hashtags directly to LinkedIn as a comment
- **Professional UI** - Clean, responsive, accessible interface

### SaaS Features

- **2-Tier Pricing** - Free ($0) and Pro ($9/mo unlimited)
- **Usage Tracking** - Monitor your generation limits
- **Billing Management** - Full subscription control
- **Team Collaboration** - Up to 3 users on Pro plan
- **Priority Support** - Get help when you need it

### Technical Features

- **Fully Responsive** - Works on mobile, tablet, desktop
- **Type-Safe** - Built with TypeScript
- **Accessible** - WCAG 2.1 AA compliant
- **Modern Stack** - Next.js 15, React Query, Zustand
- **Production Ready** - Zero linting errors, optimized builds

---

## Getting Started

### Prerequisites

- **Node.js** 18.18 or later
- **npm** or **yarn** or **pnpm**
- **Google Gemini API Key** ([Get one free](https://makersuite.google.com/app/apikey))

### Installation

Follow these steps to set up the project locally:

**Step 1: Clone the Repository**
```bash
git clone https://github.com/saurav02022/linkedin-hashtag-refresh-engine.git
cd linkedin-hashtag-refresh-engine
```

**Step 2: Install Dependencies**
```bash
npm install
```

**Step 3: Set Up Environment Variables**
```bash
# Copy the example file
cp .env.example .env.local

# Edit .env.local and add your Gemini API key
```

**Step 4: Add Your API Key**

Get your free Gemini API key:
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy and paste into `.env.local`

**Step 5: Run Development Server**
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the app running! 🚀

### Environment Variables

#### Required

| Variable | Description | Where to Get |
|----------|-------------|--------------|
| `GEMINI_API_KEY` | Google Gemini API key for AI generation | [Get free key](https://makersuite.google.com/app/apikey) |
| `LINKEDIN_CLIENT_ID` | LinkedIn OAuth Client ID (NextAuth.js) | [LinkedIn Developers](https://www.linkedin.com/developers/apps) |
| `LINKEDIN_CLIENT_SECRET` | LinkedIn OAuth Client Secret (NextAuth.js) | [LinkedIn Developers](https://www.linkedin.com/developers/apps) |
| `NEXTAUTH_URL` | Application URL for NextAuth callbacks | `http://localhost:3000` (dev) |
| `NEXTAUTH_SECRET` | Secret for NextAuth session encryption | Generate with `openssl rand -base64 32` |

#### Optional

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_APP_URL` | Your app's public URL | `http://localhost:3000` |
| `NODE_ENV` | Environment mode | `development` |

#### LinkedIn OAuth Setup (NextAuth.js)

This app uses [NextAuth.js](https://next-auth.js.org/) for secure authentication.

1. **Create LinkedIn App**
   - Visit [LinkedIn Developers](https://www.linkedin.com/developers/apps)
   - Click "Create app" and fill in app details
   
2. **Configure OAuth Settings**
   - In **Auth** tab, copy Client ID and Client Secret
   - Add redirect URLs (NextAuth.js standard callback):
     - Development: `http://localhost:3000/api/auth/callback/linkedin`
     - Production: `https://yourdomain.com/api/auth/callback/linkedin`
   
3. **Request OAuth Scopes**
   - In **Products** tab, request these products:
     - ✅ Sign In with LinkedIn using OpenID Connect
     - ✅ Share on LinkedIn (for posting hashtags)
   
4. **Add to .env.local**
   ```bash
   # LinkedIn OAuth (NextAuth)
   LINKEDIN_CLIENT_ID=your_client_id_here
   LINKEDIN_CLIENT_SECRET=your_client_secret_here
   
   # NextAuth Configuration
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=$(openssl rand -base64 32)
   
   # Gemini API
   GEMINI_API_KEY=your_gemini_api_key
   ```

**Note:** NextAuth.js automatically handles:
- Session management with JWT
- CSRF protection
- Secure cookie handling
- Token refresh

#### Future Features

- Database, Stripe, Analytics - See [.env.example](./.env.example) for complete list

### Available Scripts

```bash
npm run dev          # Start development server (http://localhost:3000)
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint to check code quality
```

### Troubleshooting

**Problem: "Missing required environment variables: GEMINI_API_KEY"**
- ✅ Make sure you've created `.env.local` from `.env.example`
- ✅ Add your Gemini API key to `.env.local`
- ✅ Restart the development server (`npm run dev`)

**Problem: "LinkedIn OAuth not configured" or "Callback URL mismatch"**
- ✅ Verify `LINKEDIN_CLIENT_ID` and `LINKEDIN_CLIENT_SECRET` are set in `.env.local`
- ✅ Check redirect URI in LinkedIn app: `http://localhost:3000/api/auth/callback/linkedin`
- ✅ Ensure `NEXTAUTH_URL` matches your application URL
- ✅ Verify `NEXTAUTH_SECRET` is set (generate with `openssl rand -base64 32`)
- ✅ Ensure OAuth scopes (OpenID Connect + Share on LinkedIn) are approved
- ✅ Restart the development server

**Problem: NextAuth session issues**
- ✅ Clear browser cookies and try again
- ✅ Verify `NEXTAUTH_SECRET` is at least 32 characters
- ✅ Ensure cookies are enabled in your browser
- ✅ Try using `http://localhost:3000` instead of `127.0.0.1`
- ✅ Check browser console for NextAuth errors

**Problem: Build fails on Vercel**
- ✅ Check that all required environment variables are added in Vercel dashboard
- ✅ Go to: Project Settings → Environment Variables
- ✅ Add keys for all environments (Production, Preview, Development)
- ✅ Update `LINKEDIN_REDIRECT_URI` to use production URL
- ✅ Redeploy the application

**Problem: Module not found errors**
- ✅ Delete `node_modules` and `package-lock.json`
- ✅ Run `npm install` again
- ✅ Restart your development server

**Need more help?** [Open an issue](https://github.com/saurav02022/linkedin-hashtag-refresh-engine/issues)

---

## Usage

### Basic Workflow

1. **Login** with your LinkedIn account (OAuth)
2. **Navigate** to `/posts` or click "Generate" from dashboard
3. **Paste** your LinkedIn post URL
4. **Click** "Generate Hashtags" - AI extracts content & analyzes it
5. **Choose Strategy** - Select from 3 curated batches (or mix & match)
6. **Customize** - Add/remove hashtags as needed
7. **Post to LinkedIn** - One-click posting as a comment
8. **Manual Cleanup** (if needed) - Delete old hashtag comments on LinkedIn

### Example

```
Input URL:  https://linkedin.com/posts/johndoe-activity-123456789

AI Analysis: Extracts content automatically
             Generates 3 strategic batches:
             
Batch 1 (Recommended): Maximum Reach
  #javascript #programming #webdevelopment #coding
  #developer #tech #frontend #reactjs #typescript
  #softwaredevelopment #webdev #learntocode

Batch 2: Viral Potential (high-volume tags)
Batch 3: Engagement Focus (niche targeting)

User Action: Selects Batch 1 (or customizes)
Result:      Posted as comment on LinkedIn ✓
             (User deletes old comment if exists)
```

**Time saved:** 20-30 minutes per post → 3-5 seconds ⚡

### Important Note: Old Comment Deletion

Due to LinkedIn API limitations, the app **cannot automatically delete old hashtag comments**:
- ✅ The app **can post** new comments (via `w_member_social` permission)
- ❌ The app **cannot read or delete** comments (requires `r_member_social` - partner-only)

**What this means for you:**
- New hashtags are posted automatically as a comment ✅
- If you have old hashtag comments, **manually delete them first** (takes < 10 seconds)
- For auto-refresh (Phase 3), you'll receive email reminders to delete old comments

This is the same limitation that tools like Buffer and Hootsuite face with standard LinkedIn API access.

### Why Manual URL Input?

LinkedIn's API has strict permissions. Reading user posts requires `r_member_social` permission, which is **restricted to select partners only** (like Hootsuite, Buffer, Sprout Social).

Standard apps with "Share on LinkedIn" product only get `w_member_social` (write permission) - which is perfect for posting hashtags as comments!

This manual URL approach is the **industry standard** and offers benefits:
- ✅ **Privacy-focused** - You choose which posts to optimize
- ✅ **Intentional** - Deliberate decision for each post
- ✅ **Works perfectly** - All features functional (generate + post + auto-refresh)

**Reference:** [LinkedIn UGC Post API Permissions](https://learn.microsoft.com/en-us/linkedin/marketing/community-management/shares/ugc-post-api#permissions)

### API Example

```bash
curl -X POST http://localhost:3000/api/hashtags/generate \
  -H "Content-Type: application/json" \
  -d '{
    "urls": ["https://linkedin.com/posts/..."]
  }'
```

See full API documentation in [PRD.md](./PRD.md#api-specifications).

---

## Tech Stack

### Frontend

- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first styling
- **[ShadCN UI](https://ui.shadcn.com/)** - Accessible component library
- **[Lucide React](https://lucide.dev/)** - Icon library

### State Management & Data Fetching

- **[Zustand](https://zustand.docs.pmnd.rs/)** - Lightweight state management (6.8 KB)
- **[TanStack Query](https://tanstack.com/query/)** - Server state & caching (React Query v5)

### Forms & Validation

- **[React Hook Form](https://react-hook-form.com/)** - Form handling
- **[Zod](https://zod.dev/)** - Schema validation

### AI & Backend

- **[Google Gemini API](https://ai.google.dev/)** - AI-powered hashtag generation
- **Next.js API Routes** - Serverless backend
- **Edge Functions** - Fast, global API responses

### Deployment

- **[Vercel](https://vercel.com/)** - Hosting & deployment
- **Edge Network** - CDN for static assets

---

## Project Structure

```
linkedin-hashtag-refresh-engine-app/
├── app/                      # Next.js App Router
│   ├── (dashboard)/          # Protected routes
│   │   ├── dashboard/        # User dashboard
│   │   ├── posts/            # Hashtag generation
│   │   └── settings/         # Settings & billing
│   ├── api/                  # API routes
│   │   ├── auth/             # Authentication endpoints
│   │   └── hashtags/         # Hashtag generation API
│   ├── login/                # Login page
│   ├── pricing/              # Pricing page
│   └── layout.tsx            # Root layout
│
├── components/               # React components
│   ├── home/                 # Landing page components
│   ├── pricing/              # Pricing components
│   ├── dashboard/            # Dashboard components
│   ├── posts/                # Hashtag generation UI
│   ├── settings/             # Settings & billing UI
│   ├── shared/               # Reusable components
│   └── ui/                   # ShadCN UI primitives
│
├── lib/                      # Utilities & configuration
│   ├── api/                  # API clients (Gemini)
│   ├── hooks/                # Custom React hooks
│   ├── providers/            # Context providers
│   ├── stores/               # Zustand stores
│   ├── utils/                # Helper functions
│   ├── validations/          # Zod schemas
│   ├── routes.ts             # Centralized route paths
│   └── api-routes.ts         # Centralized API endpoints
│
├── types/                    # TypeScript types
│   ├── api.ts                # API types
│   ├── post.ts               # Post types
│   └── user.ts               # User types
│
└── public/                   # Static assets
```

**Architectural Principles:**
- **Single Responsibility** - Each file has one clear purpose
- **Feature-Based Organization** - Code organized by feature
- **Type Safety** - Strict TypeScript, no `any` types
- **Separation of Concerns** - UI, logic, and data layers separated

---

## Documentation

We maintain comprehensive documentation for developers and stakeholders:

### For Developers

| Document | Description | When to Use |
|----------|-------------|-------------|
| **[PRD.md](./PRD.md)** | Product Requirements Document | Understand product vision, user stories, and API specs |
| **[DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)** | Complete design system guide | Build new UI components, maintain consistency |
| **[PRICING.md](./PRICING.md)** | Pricing strategy & business model | Understand monetization and unit economics |

### Quick Links

- **Getting Started?** → Read this README first
- **Building UI?** → Check [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)
- **Understanding Features?** → See [PRD.md](./PRD.md)
- **Business Questions?** → Review [PRICING.md](./PRICING.md)

---

## Deployment

### Deploy to Google Cloud Platform (Recommended)

**Best for**: Puppeteer-based scraping, reliable Chrome/Chromium support

See **[DEPLOYMENT.md](./DEPLOYMENT.md)** for complete GCP deployment guide.

**Quick Start - Cloud Run:**

```bash
# Install gcloud CLI and authenticate
gcloud auth login

# Deploy to Cloud Run
gcloud run deploy linkedin-hashtag-engine \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --memory 2Gi \
  --set-env-vars NEXTAUTH_SECRET=xxx,NEXTAUTH_URL=xxx,GEMINI_API_KEY=xxx
```

**Quick Start - Docker Local:**

```bash
# Build Docker image
docker build -t linkedin-hashtag-engine .

# Run locally
docker run -p 3000:8080 \
  -e NEXTAUTH_SECRET="your-secret" \
  -e GEMINI_API_KEY="your-key" \
  linkedin-hashtag-engine

# Or use docker-compose
docker-compose up
```

**Why Docker/GCP?**
- ✅ **Reliable Puppeteer** - System Chrome/Chromium installation
- ✅ **No Size Limits** - Unlike Vercel's 50MB serverless limit
- ✅ **Better Performance** - Dedicated resources for scraping
- ✅ **Cost Effective** - Cloud Run free tier: 2M requests/month
- ✅ **Auto Scaling** - Scales to zero when not in use

### Deploy to Vercel (Alternative)

⚠️ **Note**: Vercel has 50MB serverless function limit. Puppeteer/Chromium may exceed this.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/saurav02022/linkedin-hashtag-refresh-engine)

1. Push code to GitHub
2. Import project in [Vercel](https://vercel.com/new)
3. Add environment variables (see `.env.example`)
4. Deploy

### Self-Hosting

```bash
# Build for production
npm run build

# Start production server
npm start
```

**Requirements:**
- Node.js 20+
- Chrome/Chromium installed (for Puppeteer)
- Environment variables configured
- HTTPS recommended for production

---

## Roadmap

### ✅ Phase 1: Auth + Manual Generation (Completed)
- ✅ NextAuth.js LinkedIn OAuth
- ✅ Token refresh (60-day tokens)
- ✅ User dashboard
- ✅ Manual URL input
- ✅ Copy to clipboard functionality

### ✅ Phase 2: AI Generation + Posting (Completed)
- ✅ Automatic content extraction (Puppeteer)
- ✅ AI hashtag generation (Gemini 2.5 Flash)
- ✅ Strategic batch selection (3 strategies)
- ✅ Editable hashtag selection
- ✅ One-click posting to LinkedIn
- ✅ Success notifications + error handling
- ✅ Responsive design & accessibility

### 🔄 Phase 3: Auto-Refresh MVP (In Progress)
- [ ] Supabase database setup
- [ ] Schedule creation UI
- [ ] Cron job for automatic refreshes
- [ ] Email notifications (with delete reminders)
- [ ] Refresh history tracking
- [ ] Usage tracking & limits

### 🎯 Phase 4: Monetization (Planned)
- [ ] Stripe payment integration
- [ ] Free (10 gen/mo) vs Pro ($9/mo unlimited)
- [ ] Pro: 10 active auto-refresh schedules
- [ ] Subscription management
- [ ] Billing page & invoice history

### 🎯 Phase 5: Enhanced Features (Planned)
- [ ] Post history & analytics
- [ ] Engagement tracking (before/after refresh)
- [ ] Team collaboration (multi-user workspaces)
- [ ] API access for Pro users
- [ ] Custom hashtag templates
- [ ] A/B test refresh intervals

### 🚀 Phase 6: Scale (Future)
- [ ] Enterprise plan for large teams
- [ ] White-label option
- [ ] Mobile native apps (iOS/Android)
- [ ] Browser extension (for easier cookie management)
- [ ] Integrations (Zapier, Buffer, Hootsuite)

See our [GitHub Projects](https://github.com/saurav02022/linkedin-hashtag-refresh-engine/projects) for detailed progress.

---

## Contributing

We welcome contributions from the community! Here's how you can help:

### Development Workflow

1. **Fork** the repository
2. **Clone** your fork: `git clone https://github.com/saurav02022/linkedin-hashtag-refresh-engine.git`
3. **Create** a branch: `git checkout -b feature/amazing-feature`
4. **Make** your changes
5. **Test** your changes: `npm run lint && npm run build`
6. **Commit** your changes: `git commit -m 'Add amazing feature'`
7. **Push** to your fork: `git push origin feature/amazing-feature`
8. **Open** a Pull Request

### Code Standards

- ✅ Follow existing code style (TypeScript strict mode)
- ✅ Write meaningful commit messages
- ✅ Add JSDoc comments for complex functions
- ✅ Ensure no linting errors (`npm run lint`)
- ✅ Test your changes thoroughly
- ✅ Update documentation if needed

### Areas We Need Help

- 🐛 Bug fixes and testing
- 📝 Documentation improvements
- 🎨 UI/UX enhancements
- ♿ Accessibility improvements
- 🌍 Internationalization (i18n)
- 🔧 Performance optimizations

---

## License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

**Summary:**
- ✅ Commercial use allowed
- ✅ Modification allowed
- ✅ Distribution allowed
- ✅ Private use allowed
- ⚠️ Warranty and liability limitations apply

---

## Acknowledgments

Built with these amazing open-source projects:

- **[Next.js](https://nextjs.org/)** by Vercel - The React framework
- **[ShadCN UI](https://ui.shadcn.com/)** by shadcn - Beautiful accessible components
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Zustand](https://zustand.docs.pmnd.rs/)** by pmndrs - State management
- **[TanStack Query](https://tanstack.com/query/)** by Tanner Linsley - Data fetching
- **[Google Gemini](https://ai.google.dev/)** - AI-powered generation
- **[Lucide](https://lucide.dev/)** - Icon library

Special thanks to:
- The Next.js team for the amazing framework
- The React community for inspiration and best practices
- All contributors who help improve this project

---

## Support & Community

### Get Help

- 📖 **Documentation:** Read the docs above
- 🐛 **Bug Reports:** [Open an issue](https://github.com/saurav02022/linkedin-hashtag-refresh-engine/issues/new?template=bug_report.md)
- 💡 **Feature Requests:** [Submit an idea](https://github.com/saurav02022/linkedin-hashtag-refresh-engine/issues/new?template=feature_request.md)
- 💬 **Discussions:** [Join the conversation](https://github.com/saurav02022/linkedin-hashtag-refresh-engine/discussions)
- 📧 **Email:** Contact via [LinkedIn](https://www.linkedin.com/in/saurav02022/)

### Stay Updated

- ⭐ **Star** this repo to show support
- 👀 **Watch** for updates and releases
- 🐦 **Follow** on [X (Twitter)](https://x.com/sk729584)
- 💼 **Connect** on [LinkedIn](https://www.linkedin.com/in/saurav02022/)

---

<div align="center">

**Built with ❤️ by [Saurav Kumar](https://github.com/saurav02022), for LinkedIn creators**

[GitHub](https://github.com/saurav02022/linkedin-hashtag-refresh-engine) · [LinkedIn](https://www.linkedin.com/in/saurav02022/) · [X (Twitter)](https://x.com/sk729584)

</div>
