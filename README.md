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

- **AI-Powered Generation** - Google Gemini 1.5 Flash analyzes your content
- **Lightning Fast** - Get results in 2-3 seconds
- **Batch Processing** - Handle 1-10 posts simultaneously
- **One-Click Copy** - Copy all hashtags to clipboard instantly
- **Professional UI** - Clean, LinkedIn-branded interface

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

#### Optional

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_APP_URL` | Your app's public URL | `http://localhost:3000` |
| `NODE_ENV` | Environment mode | `development` |

#### Future Features (Phase 2 & 3)

- `LINKEDIN_CLIENT_ID` - For LinkedIn OAuth authentication
- `LINKEDIN_CLIENT_SECRET` - For LinkedIn OAuth authentication
- `LINKEDIN_REDIRECT_URI` - OAuth callback URL
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

**Problem: Build fails on Vercel**
- ✅ Check that `GEMINI_API_KEY` is added in Vercel dashboard
- ✅ Go to: Project Settings → Environment Variables
- ✅ Add the key for all environments (Production, Preview, Development)
- ✅ Redeploy the application

**Problem: Module not found errors**
- ✅ Delete `node_modules` and `package-lock.json`
- ✅ Run `npm install` again
- ✅ Restart your development server

**Need more help?** [Open an issue](https://github.com/saurav02022/linkedin-hashtag-refresh-engine/issues)

---

## Usage

### Basic Workflow

1. **Navigate** to `/posts` or click "Generate" in the header
2. **Paste** your LinkedIn post URL(s) (1-10 URLs, one per line)
3. **Click** "Generate Hashtags"
4. **Copy** the generated hashtags with one click
5. **Paste** them as a comment on your LinkedIn post

### Example

```
Input:  https://linkedin.com/posts/johndoe-123456789
Output: #javascript #webdev #coding #programming #developer
        #softwaredevelopment #tech #computerscience #webdevelopment
```

**Time saved:** 20+ minutes per post → 2-3 seconds ⚡

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
│   └── validations/          # Zod schemas
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

### Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/saurav02022/linkedin-hashtag-refresh-engine)

**Manual Deployment:**

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com/new)
3. Add environment variable: `GEMINI_API_KEY`
4. Deploy

Your app will be live at your custom Vercel URL (e.g., `https://your-project.vercel.app`)

### Self-Hosting

```bash
# Build for production
npm run build

# Start production server
npm start
```

**Requirements:**
- Node.js 18.18+
- Environment variables configured
- HTTPS recommended for production

---

## Roadmap

### ✅ Phase 1: MVP (Completed)
- AI hashtag generation with Google Gemini
- Batch processing (1-10 posts)
- Copy to clipboard functionality
- Responsive design & accessibility
- SaaS pricing (Free & Pro tiers)
- Billing management UI

### 🔄 Phase 2: Monetization (In Progress)
- [ ] Stripe payment integration
- [ ] Usage tracking & limit enforcement
- [ ] Subscription management (upgrade/downgrade)
- [ ] Automated billing & invoices
- [ ] Email notifications

### 🎯 Phase 3: Enhanced Features (Planned)
- [ ] LinkedIn OAuth authentication
- [ ] Automated hashtag posting
- [ ] Post history & analytics
- [ ] Team collaboration (multi-user workspaces)
- [ ] API access for Pro users
- [ ] Custom hashtag templates
- [ ] Performance analytics

### 🚀 Phase 4: Scale (Future)
- [ ] Enterprise plan for large teams
- [ ] White-label option
- [ ] Mobile native apps (iOS/Android)
- [ ] Browser extension
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
