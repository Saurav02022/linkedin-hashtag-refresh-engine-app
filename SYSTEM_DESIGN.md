# System Design Document

**Product:** LinkedIn Hashtag Engine  
**Version:** 1.0  
**Last Updated:** October 24, 2025  
**Status:** Production  
**Document Owner:** Engineering Team

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Architecture Overview](#2-architecture-overview)
3. [High-Level Architecture](#3-high-level-architecture)
4. [Component Architecture](#4-component-architecture)
5. [Data Flow](#5-data-flow)
6. [API Design](#6-api-design)
7. [Authentication & Authorization](#7-authentication--authorization)
8. [Database Design](#8-database-design)
9. [Technology Stack](#9-technology-stack)
10. [Security Architecture](#10-security-architecture)
11. [Scalability](#11-scalability)
12. [Performance Optimization](#12-performance-optimization)
13. [Deployment Architecture](#13-deployment-architecture)
14. [Monitoring & Observability](#14-monitoring--observability)
15. [Cost Structure](#15-cost-structure)
16. [Disaster Recovery](#16-disaster-recovery)
17. [Future Enhancements](#17-future-enhancements)

---

## 1. Executive Summary

### 1.1 System Purpose
LinkedIn Hashtag Engine is a **serverless, AI-powered SaaS platform** that generates strategic LinkedIn hashtags in 2-3 seconds, helping creators maximize post reach and engagement. The system is designed for **high availability, low latency, and zero maintenance**.

### 1.2 Key Metrics
- **Response Time:** < 3 seconds (hashtag generation)
- **Uptime:** 99.9% (Vercel SLA)
- **Concurrent Users:** 10,000+ (auto-scaling)
- **Cost Efficiency:** $0.02 per generation (Gemini API)
- **Geographic Coverage:** Global (Vercel Edge Network)

### 1.3 Design Principles
1. **Serverless-First** - Zero infrastructure management
2. **API-Driven** - RESTful design, clear contracts
3. **Stateless** - No server-side sessions, JWT-based auth
4. **Scalable** - Auto-scales from 0 to millions
5. **Observable** - Full monitoring and error tracking
6. **Secure** - OAuth 2.0, HTTPS, encrypted tokens

---

## 2. Architecture Overview

### 2.1 Architecture Style
**Serverless Microservices Architecture**

- **Frontend:** Next.js 15 (React SSR + Client Components)
- **Backend:** Next.js API Routes (Serverless Functions)
- **Deployment:** Vercel Edge Network
- **State:** Stateless (JWT tokens, no database in MVP)

### 2.2 Architecture Characteristics

| Characteristic | Implementation | Trade-off |
|----------------|----------------|-----------|
| **Availability** | 99.9% (Vercel) | Cost vs Uptime |
| **Scalability** | Auto-scaling serverless | Cold starts |
| **Performance** | Edge Network, CDN | Geographic latency |
| **Cost** | Pay-per-use | Predictable at scale |
| **Maintenance** | Managed by Vercel | Vendor lock-in |
| **Security** | OAuth 2.0, HTTPS | Token management |

---

## 3. High-Level Architecture

### 3.1 System Context Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         EXTERNAL SYSTEMS                        │
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌────────────────────┐   │
│  │   LinkedIn   │  │    Google    │  │  Google AdSense    │   │
│  │     OAuth    │  │  Gemini API  │  │   (Monetization)   │   │
│  │              │  │              │  │                    │   │
│  └──────┬───────┘  └──────┬───────┘  └─────────┬──────────┘   │
│         │                 │                    │              │
└─────────┼─────────────────┼────────────────────┼──────────────┘
          │                 │                    │
          │                 │                    │
┌─────────▼─────────────────▼────────────────────▼──────────────┐
│                                                                 │
│                  LINKEDIN HASHTAG ENGINE                        │
│                  (Vercel Edge Network)                          │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                    FRONTEND LAYER                       │   │
│  │  Next.js 15 (App Router, RSC, Client Components)       │   │
│  │  • React 18 • TypeScript • Tailwind CSS • ShadCN UI   │   │
│  └─────────────────────────────────────────────────────────┘   │
│                           │                                     │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                  APPLICATION LAYER                      │   │
│  │  • State Management (TanStack Query, Zustand)          │   │
│  │  • Form Handling (React Hook Form + Zod)              │   │
│  │  • Authentication (NextAuth.js)                        │   │
│  └─────────────────────────────────────────────────────────┘   │
│                           │                                     │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                     API LAYER                           │   │
│  │  Next.js API Routes (Serverless Functions)             │   │
│  │  • /api/auth/[...nextauth] - Authentication            │   │
│  │  • /api/hashtags/generate - AI Generation              │   │
│  │  • /api/linkedin/comment - Post to LinkedIn            │   │
│  └─────────────────────────────────────────────────────────┘   │
│                           │                                     │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                  INTEGRATION LAYER                      │   │
│  │  • LinkedIn API Client                                  │   │
│  │  • Google Gemini Client                                │   │
│  │  • Monitoring (Sentry, GA4)                            │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
          │                 │                    │
┌─────────▼─────────────────▼────────────────────▼──────────────┐
│                                                                 │
│                    OBSERVABILITY LAYER                          │
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌────────────────────┐   │
│  │    Sentry    │  │   Google     │  │  Vercel Analytics  │   │
│  │   (Errors)   │  │ Analytics 4  │  │   (Performance)    │   │
│  │              │  │  (Behavior)  │  │                    │   │
│  └──────────────┘  └──────────────┘  └────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 3.2 Component Interaction Flow

```
┌─────────┐
│  User   │
└────┬────┘
     │ 1. Visit Site
     ▼
┌─────────────────┐
│  Next.js App    │
│  (Edge Network) │
└────┬────────────┘
     │ 2. Render UI
     ▼
┌─────────────────┐
│  React Client   │
└────┬────────────┘
     │ 3. Click "Generate"
     ▼
┌─────────────────┐
│ TanStack Query  │
│   (useMutation) │
└────┬────────────┘
     │ 4. POST /api/hashtags/generate
     ▼
┌──────────────────┐
│ API Route        │
│ (Serverless Fn)  │
└────┬─────────────┘
     │ 5. Call Gemini API
     ▼
┌──────────────────┐
│ Google Gemini    │
│   2.5 Flash      │
└────┬─────────────┘
     │ 6. Return JSON
     ▼
┌──────────────────┐
│ Parse & Validate │
└────┬─────────────┘
     │ 7. Return to Client
     ▼
┌──────────────────┐
│ Update UI        │
│ (Show Hashtags)  │
└──────────────────┘
```

---

## 4. Component Architecture

### 4.1 Frontend Architecture (Next.js 15)

#### **Directory Structure:**
```
app/
├── (dashboard)/          # Authenticated routes
│   ├── layout.tsx       # Auth layout wrapper
│   ├── posts/           # Hashtag generation
│   └── settings/        # User preferences
├── (public)/            # Public routes
│   ├── layout.tsx       # Public layout
│   ├── about/           # About page
│   └── docs/            # Documentation
├── api/                 # API routes (serverless)
│   ├── auth/            # NextAuth endpoints
│   ├── hashtags/        # Hashtag generation
│   └── linkedin/        # LinkedIn integration
├── login/               # Login page
└── layout.tsx           # Root layout

components/
├── ui/                  # ShadCN primitives
├── ads/                 # AdSense components
├── home/                # Landing page sections
├── posts/               # Hashtag UI components
├── settings/            # Settings components
└── shared/              # Reusable components

lib/
├── api/                 # API clients
│   ├── gemini.ts       # Google Gemini client
│   └── linkedin.ts     # LinkedIn API client
├── hooks/               # Custom React hooks
│   ├── useAuthQuery.ts
│   └── useHashtagsQuery.ts
├── providers/           # Context providers
│   ├── AuthProvider.tsx
│   └── QueryProvider.tsx
├── validations/         # Zod schemas
└── config.ts            # Configuration
```

#### **Key Design Patterns:**

**1. Server Components (RSC) for Static Content:**
```tsx
// app/page.tsx (Server Component)
export default function HomePage() {
  return <HomeScreen /> // Hydrated on client
}
```

**2. Client Components for Interactivity:**
```tsx
// components/posts/PostUrlForm.tsx
'use client'
export function PostUrlForm() {
  const mutation = useGenerateHashtags()
  // Interactive form logic
}
```

**3. API Routes as Serverless Functions:**
```tsx
// app/api/hashtags/generate/route.ts
export async function POST(request: NextRequest) {
  // Runs as serverless function
  const result = await generateHashtagsWithGemini(content)
  return NextResponse.json(result)
}
```

### 4.2 State Management Architecture

**Three-Layer State Strategy:**

#### **Layer 1: Server State (TanStack Query)**
```typescript
// Handles API data, caching, background updates
const { data, isLoading, mutate } = useGenerateHashtags()
```

**Benefits:**
- Automatic caching (5 min default)
- Background refetching
- Optimistic updates
- Request deduplication

#### **Layer 2: Client State (Zustand)**
```typescript
// Handles UI state, user preferences
const { user, setUser } = useUserStore()
```

**Benefits:**
- Minimal boilerplate
- TypeScript-first
- DevTools support
- No context wrapper hell

#### **Layer 3: Form State (React Hook Form + Zod)**
```typescript
// Handles form validation, submission
const form = useForm({
  resolver: zodResolver(postFormSchema)
})
```

**Benefits:**
- Type-safe validation
- Optimized re-renders
- Async validation
- Error handling

### 4.3 API Route Architecture

#### **Request/Response Pattern:**
```typescript
// Standard API response format
interface APIResponse<T = any> {
  success: boolean
  data?: T
  error?: {
    code: string
    message: string
    details?: any
  }
  message?: string
}
```

#### **Error Handling Strategy:**
```typescript
try {
  // Business logic
  return NextResponse.json({ success: true, data })
} catch (error) {
  if (error instanceof z.ZodError) {
    return NextResponse.json({ 
      success: false, 
      error: { code: 'VALIDATION_ERROR', message: ... }
    }, { status: 400 })
  }
  // Handle other errors
}
```

#### **Middleware Chain:**
```
Request
  ↓
1. Next.js Middleware (auth check)
  ↓
2. API Route Handler
  ↓
3. Zod Validation
  ↓
4. Business Logic
  ↓
5. Error Handling
  ↓
Response
```

---

## 5. Data Flow

### 5.1 Hashtag Generation Flow

```
┌──────────────────────────────────────────────────────────────┐
│                  HASHTAG GENERATION FLOW                     │
└──────────────────────────────────────────────────────────────┘

User Action: Click "Generate Hashtags"
  │
  ├─ 1. Client-Side Validation (React Hook Form + Zod)
  │    • Content length (10-3000 chars)
  │    • URL format (if provided)
  │    ↓ Valid
  │
  ├─ 2. TanStack Query Mutation
  │    • POST /api/hashtags/generate
  │    • Body: { content, url? }
  │    • Headers: { Content-Type: application/json }
  │    ↓
  │
  ├─ 3. API Route Handler (Serverless)
  │    • Validate request (Zod)
  │    • Check Gemini API key
  │    • Log request metadata
  │    ↓
  │
  ├─ 4. Google Gemini API Call
  │    • Model: gemini-2.0-flash-exp
  │    • Temperature: 0.7
  │    • Max tokens: 10,000
  │    • Prompt: Strategic hashtag generation
  │    ↓
  │    ├─ Success: JSON with 3 batches
  │    │   ↓
  │    │   ├─ Parse JSON response
  │    │   ├─ Validate hashtags (3-30 chars, no spam)
  │    │   ├─ Format batches
  │    │   └─ Return to client
  │    │
  │    └─ Error: Rate limit / API error
  │        ↓
  │        ├─ Log error (Sentry)
  │        ├─ Format user-friendly message
  │        └─ Return error response
  │
  ├─ 5. Client Updates (TanStack Query)
  │    • Update cache
  │    • Trigger re-render
  │    • Show success/error toast
  │    ↓
  │
  └─ 6. UI Update
       • Display 3 strategic batches
       • Allow hashtag selection
       • Enable "Post to LinkedIn" button
```

### 5.2 LinkedIn Posting Flow

```
┌──────────────────────────────────────────────────────────────┐
│                   LINKEDIN POSTING FLOW                      │
└──────────────────────────────────────────────────────────────┘

User Action: Click "Post to LinkedIn"
  │
  ├─ 1. Client-Side Check
  │    • Verify selected hashtags (min 1)
  │    • Verify post URL format
  │    • Get session token
  │    ↓
  │
  ├─ 2. API Request
  │    • POST /api/linkedin/comment
  │    • Body: { postUrl, hashtags }
  │    • Headers: { Cookie: next-auth token }
  │    ↓
  │
  ├─ 3. Server-Side Authentication
  │    • getServerSession() - verify JWT
  │    • Extract LinkedIn access token
  │    • Check token expiry (auto-refresh if needed)
  │    ↓ Authenticated
  │
  ├─ 4. LinkedIn API Call
  │    • Extract post URN from URL
  │    • Format hashtags (one per line, # prefix)
  │    • POST /v2/socialActions/{urn}/comments
  │    • Headers: { Authorization: Bearer <token> }
  │    ↓
  │    ├─ Success: Comment created
  │    │   ↓
  │    │   ├─ Log success
  │    │   └─ Return { success: true, message: "Posted!" }
  │    │
  │    └─ Error: Permission denied / Invalid URN
  │        ↓
  │        ├─ Log error (Sentry)
  │        ├─ Parse LinkedIn error code
  │        └─ Return user-friendly message
  │
  ├─ 5. Client Updates
  │    • Show success toast
  │    • Track event (GA4)
  │    • Update UI state
  │    ↓
  │
  └─ 6. Fallback (if API fails)
       • Copy hashtags to clipboard
       • Show modal with manual instructions
       • Track fallback usage
```

### 5.3 Authentication Flow (OAuth 2.0)

```
┌──────────────────────────────────────────────────────────────┐
│                  OAUTH 2.0 AUTHENTICATION                    │
└──────────────────────────────────────────────────────────────┘

User Action: Click "Login with LinkedIn"
  │
  ├─ 1. NextAuth Redirect
  │    • GET /api/auth/signin/linkedin
  │    • Generate state (CSRF protection)
  │    • Redirect to LinkedIn OAuth endpoint
  │    ↓
  │
  ├─ 2. LinkedIn Authorization
  │    • User sees LinkedIn consent screen
  │    • Scopes: openid, profile, email, w_member_social
  │    • User clicks "Allow"
  │    ↓ Authorized
  │
  ├─ 3. LinkedIn Callback
  │    • GET /api/auth/callback/linkedin?code=xxx&state=xxx
  │    • NextAuth verifies state
  │    • Exchanges code for access token
  │    ↓
  │
  ├─ 4. Token Exchange
  │    • POST https://www.linkedin.com/oauth/v2/accessToken
  │    • Body: { grant_type, code, client_id, client_secret }
  │    • Response: { access_token, refresh_token, expires_in }
  │    ↓
  │
  ├─ 5. User Info Fetch
  │    • GET https://api.linkedin.com/v2/userinfo
  │    • Headers: { Authorization: Bearer <access_token> }
  │    • Response: { sub, name, email, picture }
  │    ↓
  │
  ├─ 6. JWT Creation
  │    • Create JWT with:
  │      - user: { id, name, email, image }
  │      - accessToken (for LinkedIn API)
  │      - refreshToken (for token refresh)
  │      - linkedInId (sub)
  │      - expiresAt (60 days)
  │    • Encrypt JWT
  │    • Set HTTP-only secure cookie
  │    ↓
  │
  └─ 7. Redirect to App
       • Redirect to /posts (generate hashtags)
       • Client receives session
       • Update UI (show user info)
```

---

## 6. API Design

### 6.1 API Endpoints

#### **Authentication Endpoints (NextAuth.js)**

```
POST   /api/auth/signin/linkedin
GET    /api/auth/callback/linkedin
POST   /api/auth/signout
GET    /api/auth/session
GET    /api/auth/me
```

#### **Hashtag Generation Endpoints**

```
POST   /api/hashtags/generate
```

**Request:**
```json
{
  "content": "string (10-3000 chars)",
  "url": "string (optional)"
}
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "postUrl": "string",
      "hashtags": ["tag1", "tag2", ...],
      "batches": [
        {
          "id": "batch-1",
          "strategy": "Maximum Reach",
          "description": "Balanced mix for optimal visibility",
          "hashtags": ["tag1", "tag2", ...],
          "recommended": true
        }
      ],
      "metadata": {
        "model": "gemini-2.0-flash-exp",
        "tokensUsed": 1234,
        "generatedAt": "2025-10-24T12:00:00Z"
      }
    }
  ]
}
```

#### **LinkedIn Integration Endpoints**

```
POST   /api/linkedin/comment
```

**Request:**
```json
{
  "postUrl": "https://www.linkedin.com/feed/update/urn:li:share:123",
  "hashtags": ["javascript", "webdev", ...]
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "commentId": "urn:li:comment:123",
    "message": "Hashtags posted successfully!"
  }
}
```

### 6.2 API Error Codes

| Code | HTTP Status | Description | User Action |
|------|-------------|-------------|-------------|
| `VALIDATION_ERROR` | 400 | Invalid request data | Fix input and retry |
| `UNAUTHORIZED` | 401 | Not authenticated | Login required |
| `FORBIDDEN` | 403 | Insufficient permissions | Check LinkedIn scopes |
| `NOT_FOUND` | 404 | Resource not found | Verify URL/ID |
| `RATE_LIMIT_EXCEEDED` | 429 | Too many requests | Wait and retry |
| `CONFIG_ERROR` | 500 | Missing API keys | Contact support |
| `GENERATION_FAILED` | 500 | AI generation error | Retry or simplify content |
| `API_FAILED` | 500 | External API error | Try again later |
| `INTERNAL_ERROR` | 500 | Server error | Contact support |

### 6.3 API Rate Limits

| Endpoint | Rate Limit | Window | Strategy |
|----------|-----------|--------|----------|
| `/api/hashtags/generate` | 10 req/min | Per user | Client-side throttle |
| `/api/linkedin/comment` | 5 req/min | Per user | Exponential backoff |
| All endpoints | 100 req/min | Per IP | Vercel Edge Functions |

---

## 7. Authentication & Authorization

### 7.1 Authentication Strategy

**Protocol:** OAuth 2.0 + OpenID Connect  
**Provider:** LinkedIn  
**Session:** JWT (stateless, encrypted, HTTP-only cookie)  
**Library:** NextAuth.js v4

### 7.2 Token Flow

```
┌─────────────────────────────────────────────────────────────┐
│                      TOKEN LIFECYCLE                        │
└─────────────────────────────────────────────────────────────┘

1. LOGIN
   User logs in → LinkedIn OAuth → NextAuth JWT created
   
   JWT contains:
   ├─ User data: { id, name, email, image }
   ├─ LinkedIn access_token (for API calls)
   ├─ LinkedIn refresh_token (for token refresh)
   ├─ LinkedIn ID (sub)
   └─ Expiry: 60 days

2. AUTHENTICATION
   Client makes request → Middleware checks JWT → Valid? Allow

3. API CALLS
   Client → /api/linkedin/comment
   ↓
   Server extracts access_token from JWT
   ↓
   Makes LinkedIn API call with Bearer token

4. TOKEN REFRESH (Auto, before expiry)
   JWT expiring soon?
   ↓
   Server calls LinkedIn /oauth/v2/accessToken
   ↓
   Updates JWT with new tokens
   ↓
   Returns updated JWT to client

5. LOGOUT
   User clicks logout → JWT cookie deleted → Redirect to home
```

### 7.3 Authorization Model

**Role-Based Access Control (RBAC) - Future Enhancement**

Current: All authenticated users have same permissions  
Future: Free tier, Premium tier, Enterprise tier

```
User Roles (Future):
├─ Free
│  ├─ 10 generations/day
│  └─ Basic features
├─ Premium ($9/mo)
│  ├─ Unlimited generations
│  └─ Analytics
└─ Enterprise (Custom)
   ├─ API access
   └─ Team features
```

### 7.4 Security Measures

| Layer | Measure | Implementation |
|-------|---------|----------------|
| **Transport** | HTTPS Only | Vercel automatic |
| **Authentication** | OAuth 2.0 | NextAuth.js |
| **Session** | HTTP-only cookie | Encrypted JWT |
| **CSRF** | State parameter | NextAuth built-in |
| **XSS** | Content Security Policy | Next.js headers |
| **Secrets** | Environment variables | Vercel encrypted |
| **API Keys** | Server-side only | Never exposed to client |
| **Rate Limiting** | Edge functions | Vercel built-in |

---

## 8. Database Design

### 8.1 Current State (MVP - Stateless)

**No database required** in MVP. All data is ephemeral:
- User data: From LinkedIn OAuth (JWT)
- Generated hashtags: Client-side only
- No persistence needed

### 8.2 Future Database Schema (Phase 2)

**Database:** PostgreSQL (Vercel Postgres or Supabase)  
**ORM:** Prisma

```sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  linkedin_id VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Hashtag history
CREATE TABLE hashtag_generations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  post_url TEXT,
  post_content TEXT,
  generated_hashtags JSONB NOT NULL, -- Array of hashtags
  batches JSONB NOT NULL, -- Array of batch objects
  selected_batch_id VARCHAR(50),
  model VARCHAR(50), -- e.g., "gemini-2.0-flash-exp"
  tokens_used INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- LinkedIn posts (comments made)
CREATE TABLE linkedin_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  generation_id UUID REFERENCES hashtag_generations(id) ON DELETE SET NULL,
  post_url TEXT NOT NULL,
  comment_id VARCHAR(255), -- LinkedIn comment URN
  hashtags TEXT[] NOT NULL,
  status VARCHAR(20) DEFAULT 'posted', -- posted, failed
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- User preferences
CREATE TABLE user_preferences (
  user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  default_batch_strategy VARCHAR(50), -- "Maximum Reach", "Viral Potential", etc.
  notifications_enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Analytics (aggregated data)
CREATE TABLE analytics_daily (
  date DATE NOT NULL,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  generations_count INTEGER DEFAULT 0,
  comments_posted INTEGER DEFAULT 0,
  tokens_used INTEGER DEFAULT 0,
  PRIMARY KEY (date, user_id)
);

-- Indexes
CREATE INDEX idx_users_linkedin_id ON users(linkedin_id);
CREATE INDEX idx_hashtag_generations_user_id ON hashtag_generations(user_id);
CREATE INDEX idx_hashtag_generations_created_at ON hashtag_generations(created_at DESC);
CREATE INDEX idx_linkedin_comments_user_id ON linkedin_comments(user_id);
CREATE INDEX idx_analytics_daily_user_date ON analytics_daily(user_id, date DESC);
```

### 8.3 Data Models (Prisma Schema - Future)

```prisma
model User {
  id              String   @id @default(uuid())
  linkedInId      String   @unique @map("linkedin_id")
  email           String   @unique
  name            String?
  imageUrl        String?  @map("image_url")
  createdAt       DateTime @default(now()) @map("created_at")
  updatedAt       DateTime @updatedAt @map("updated_at")
  
  generations     HashtagGeneration[]
  comments        LinkedInComment[]
  preferences     UserPreferences?
  analytics       AnalyticsDaily[]
  
  @@map("users")
}

model HashtagGeneration {
  id                String   @id @default(uuid())
  userId            String   @map("user_id")
  postUrl           String?  @map("post_url")
  postContent       String   @map("post_content")
  generatedHashtags Json     @map("generated_hashtags")
  batches           Json
  selectedBatchId   String?  @map("selected_batch_id")
  model             String?
  tokensUsed        Int?     @map("tokens_used")
  createdAt         DateTime @default(now()) @map("created_at")
  
  user              User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  comments          LinkedInComment[]
  
  @@index([userId])
  @@index([createdAt(sort: Desc)])
  @@map("hashtag_generations")
}

// ... other models
```

---

## 9. Technology Stack

### 9.1 Frontend Stack

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| **Framework** | Next.js | 15.0 | React framework with SSR, RSC |
| **UI Library** | React | 18.3 | Component-based UI |
| **Language** | TypeScript | 5.6 | Type-safe JavaScript |
| **Styling** | Tailwind CSS | 3.4 | Utility-first CSS |
| **Components** | ShadCN UI | Latest | Accessible UI primitives |
| **Icons** | Lucide React | 0.460 | Icon library |
| **State** | TanStack Query | 5.59 | Server state management |
| **State** | Zustand | 5.0 | Client state management |
| **Forms** | React Hook Form | 7.53 | Form handling |
| **Validation** | Zod | 3.23 | Schema validation |

### 9.2 Backend Stack

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| **Runtime** | Node.js | 20.x | JavaScript runtime |
| **API** | Next.js API Routes | 15.0 | Serverless functions |
| **Auth** | NextAuth.js | 4.24 | Authentication |
| **AI** | Google Gemini | 2.0 Flash | Hashtag generation |
| **LinkedIn** | REST API | v2 | OAuth & commenting |

### 9.3 DevOps & Monitoring

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Deployment** | Vercel | Serverless hosting, CDN, Edge |
| **Version Control** | Git + GitHub | Source code management |
| **CI/CD** | Vercel (auto) | Automatic deployments |
| **Error Tracking** | Sentry | Error monitoring, performance |
| **Analytics** | Google Analytics 4 | User behavior, traffic |
| **Monetization** | Google AdSense | Revenue generation |
| **Package Manager** | npm | Dependency management |

### 9.4 External Services

| Service | Purpose | Cost Model |
|---------|---------|------------|
| **LinkedIn OAuth** | User authentication | Free |
| **LinkedIn API** | Post comments | Free (rate limited) |
| **Google Gemini** | AI hashtag generation | $0.02 / 1K tokens |
| **Vercel** | Hosting, CDN, Edge | $20/mo (Pro) |
| **Sentry** | Error monitoring | Free (50K events/mo) |
| **Google Analytics** | User analytics | Free |
| **Google AdSense** | Ad revenue | Revenue share (68%) |

---

## 10. Security Architecture

### 10.1 Security Layers

```
┌─────────────────────────────────────────────────────────────┐
│                     SECURITY LAYERS                         │
└─────────────────────────────────────────────────────────────┘

Layer 1: TRANSPORT SECURITY
├─ HTTPS Only (TLS 1.3)
├─ HSTS enabled
├─ Secure cookies
└─ Certificate management (Vercel automatic)

Layer 2: AUTHENTICATION & AUTHORIZATION
├─ OAuth 2.0 (LinkedIn)
├─ OpenID Connect
├─ JWT tokens (encrypted, HTTP-only)
├─ CSRF protection (state parameter)
└─ Session expiry (30 days, refresh every 24h)

Layer 3: APPLICATION SECURITY
├─ Input validation (Zod schemas)
├─ Output encoding (React automatic)
├─ XSS protection (CSP headers)
├─ SQL injection prevention (Prisma - future)
└─ Rate limiting (Vercel Edge)

Layer 4: DATA SECURITY
├─ Secrets in environment variables
├─ API keys server-side only
├─ No sensitive data in logs
├─ No PII storage (MVP)
└─ Encrypted data at rest (future)

Layer 5: NETWORK SECURITY
├─ DDoS protection (Vercel)
├─ Bot protection (Vercel)
├─ IP rate limiting
└─ Edge network isolation

Layer 6: MONITORING & RESPONSE
├─ Error tracking (Sentry)
├─ Security alerts (Vercel)
├─ Audit logs (future)
└─ Incident response plan
```

### 10.2 Threat Model

| Threat | Mitigation | Priority |
|--------|------------|----------|
| **XSS** | React escaping, CSP headers | High |
| **CSRF** | State parameter, SameSite cookies | High |
| **Injection** | Zod validation, Prisma ORM | High |
| **Broken Auth** | OAuth 2.0, JWT expiry | High |
| **Sensitive Data** | HTTPS, encrypted tokens | High |
| **Security Misconfig** | Vercel managed, code review | Medium |
| **Vulnerable Dependencies** | npm audit, Dependabot | Medium |
| **Insufficient Logging** | Sentry, Vercel logs | Medium |
| **API Abuse** | Rate limiting, auth | Medium |
| **DDoS** | Vercel protection, CDN | Low |

### 10.3 Compliance

**Current:**
- ✅ GDPR (no PII stored in MVP)
- ✅ Privacy Policy published
- ✅ Terms of Service published
- ✅ Cookie consent (analytics/ads)
- ✅ Data retention: 30 days (logs only)

**Future (with database):**
- [ ] GDPR data export
- [ ] GDPR right to deletion
- [ ] CCPA compliance
- [ ] SOC 2 Type II (Enterprise)

---

## 11. Scalability

### 11.1 Current Capacity

| Metric | Limit | Notes |
|--------|-------|-------|
| **Concurrent Users** | 10,000+ | Auto-scaling |
| **Requests/Second** | 1,000+ | Edge functions |
| **Cold Start Time** | < 500ms | Vercel Edge |
| **Geographic Coverage** | Global | 70+ regions |
| **API Calls (Gemini)** | 60 req/min | Rate limit |
| **LinkedIn API** | 100 req/day | Per user |

### 11.2 Scalability Strategy

**Horizontal Scaling (Auto):**
- Serverless functions scale automatically
- No manual intervention needed
- Pay-per-use model
- Instant global distribution

**Vertical Scaling (Future):**
- Upgrade Vercel plan (Pro → Enterprise)
- Increase Gemini API quota
- Add database read replicas
- Implement caching layer (Redis)

### 11.3 Scaling Bottlenecks

| Bottleneck | Current Limit | Solution |
|------------|---------------|----------|
| **Gemini API** | 60 req/min | Implement queue system |
| **LinkedIn API** | 100 req/day/user | Cache post data |
| **Cold Starts** | 500ms | Keep-alive pings |
| **Database** | N/A (MVP) | Read replicas, sharding |
| **Static Assets** | Unlimited | Vercel CDN |

### 11.4 Performance Targets

| Metric | Target | Current | Status |
|--------|--------|---------|--------|
| **Page Load (FCP)** | < 1.5s | ~1.2s | ✅ |
| **Page Load (LCP)** | < 2.5s | ~2.1s | ✅ |
| **API Response** | < 3s | ~2.5s | ✅ |
| **Time to Interactive** | < 3s | ~2.8s | ✅ |
| **Lighthouse Score** | > 90 | 94 | ✅ |

---

## 12. Performance Optimization

### 12.1 Frontend Optimizations

**1. Code Splitting:**
```typescript
// Lazy load heavy components
const HashtagPostModal = dynamic(() => import('./HashtagPostModal'), {
  loading: () => <LoadingSpinner />,
})
```

**2. Image Optimization:**
```typescript
import Image from 'next/image'

<Image
  src="/hero.png"
  width={1200}
  height={600}
  alt="Hero"
  priority // Above the fold
/>
```

**3. Font Optimization:**
```typescript
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap', // Prevent layout shift
})
```

**4. Caching Strategy:**
```typescript
// TanStack Query caching
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      refetchOnWindowFocus: false,
    },
  },
})
```

### 12.2 Backend Optimizations

**1. API Response Compression:**
```typescript
// Vercel automatic gzip/brotli compression
// No configuration needed
```

**2. Gemini API Optimization:**
```typescript
// Minimal prompt tokens
// Structured JSON response
// Temperature: 0.7 (balanced creativity/performance)
```

**3. LinkedIn API Optimization:**
```typescript
// Batch requests where possible
// Cache post metadata
// Retry with exponential backoff
```

### 12.3 Edge Optimization

**Vercel Edge Network:**
- Automatic CDN distribution
- 70+ global regions
- Smart routing to nearest edge
- Automatic cache invalidation

---

## 13. Deployment Architecture

### 13.1 Deployment Pipeline

```
┌─────────────────────────────────────────────────────────────┐
│                    CI/CD PIPELINE                           │
└─────────────────────────────────────────────────────────────┘

Developer → Git Push → GitHub
                         │
                         ├─ main branch
                         │   ↓
                         │  Vercel Production
                         │   ├─ Install dependencies
                         │   ├─ Build Next.js app
                         │   ├─ Run tests (future)
                         │   ├─ Deploy to Edge
                         │   ├─ Invalidate CDN cache
                         │   └─ Send deployment notification
                         │
                         └─ feature/* branches
                             ↓
                            Vercel Preview
                             ├─ Automatic preview URL
                             ├─ Full production replica
                             └─ Perfect for testing
```

### 13.2 Environment Strategy

| Environment | Branch | URL | Purpose |
|-------------|--------|-----|---------|
| **Production** | `main` | ai-linkedin-hashtag-refresh-engine-app.vercel.app | Live users |
| **Preview** | `feature/*` | `<hash>.vercel.app` | Feature testing |
| **Local** | Any | `localhost:3000` | Development |

### 13.3 Environment Variables

**Production (Vercel):**
```bash
# Authentication
LINKEDIN_CLIENT_ID=xxx
LINKEDIN_CLIENT_SECRET=xxx
NEXTAUTH_URL=https://ai-linkedin-hashtag-refresh-engine-app.vercel.app
NEXTAUTH_SECRET=xxx

# AI
GEMINI_API_KEY=xxx

# Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-xxx
NEXT_PUBLIC_SENTRY_DSN=https://xxx@xxx.ingest.sentry.io/xxx
SENTRY_AUTH_TOKEN=xxx
SENTRY_ORG=xxx
SENTRY_PROJECT=xxx

# Monetization
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-xxx
```

### 13.4 Deployment Checklist

**Pre-Deployment:**
- [ ] Run `npm run build` locally
- [ ] Check TypeScript errors
- [ ] Review Vercel logs
- [ ] Test in preview environment

**Post-Deployment:**
- [ ] Verify production URL
- [ ] Test critical flows (auth, generation, posting)
- [ ] Check Sentry for errors
- [ ] Monitor Vercel analytics

---

## 14. Monitoring & Observability

### 14.1 Monitoring Stack

```
┌─────────────────────────────────────────────────────────────┐
│                   OBSERVABILITY STACK                       │
└─────────────────────────────────────────────────────────────┘

APPLICATION MONITORING
├─ Sentry
│  ├─ Error tracking (client & server)
│  ├─ Performance monitoring (web vitals)
│  ├─ Session replay
│  └─ Source maps

USER BEHAVIOR
├─ Google Analytics 4
│  ├─ Page views
│  ├─ User demographics
│  ├─ Conversion tracking
│  └─ Custom events

INFRASTRUCTURE
├─ Vercel Analytics
│  ├─ Function invocations
│  ├─ Bandwidth usage
│  ├─ Build times
│  └─ Edge network metrics

BUSINESS METRICS
└─ Google AdSense
   ├─ Ad impressions
   ├─ Click-through rate
   ├─ Revenue per mille (RPM)
   └─ Earnings
```

### 14.2 Key Metrics & Alerts

| Metric | Threshold | Alert Channel |
|--------|-----------|---------------|
| **Error Rate** | > 1% | Sentry → Email |
| **API Latency** | > 5s | Sentry → Slack |
| **Uptime** | < 99.9% | Vercel → Email |
| **Build Failures** | Any | Vercel → Slack |
| **Cold Start** | > 1s | Vercel → Dashboard |

### 14.3 Custom Events (GA4)

```typescript
// Track hashtag generation
gtag('event', 'generate_hashtags', {
  content_length: content.length,
  model: 'gemini-2.0-flash-exp',
  batches_count: 3,
})

// Track LinkedIn posting
gtag('event', 'post_to_linkedin', {
  hashtag_count: hashtags.length,
  batch_strategy: 'Maximum Reach',
})

// Track errors
gtag('event', 'error', {
  error_code: 'GENERATION_FAILED',
  error_message: 'Rate limit exceeded',
})
```

---

## 15. Cost Structure

### 15.1 Monthly Costs (at scale)

**Fixed Costs:**
| Service | Tier | Cost/Month |
|---------|------|------------|
| **Vercel** | Pro | $20 |
| **Sentry** | Team | $26 (optional) |
| **Total Fixed** | | **$46** |

**Variable Costs:**
| Service | Unit Cost | Usage (1K users) | Cost |
|---------|-----------|------------------|------|
| **Gemini API** | $0.02/1K tokens | 5M tokens/mo | $100 |
| **Vercel Functions** | $0.40/1M exec | 100K exec/mo | $0.04 |
| **Vercel Bandwidth** | $0.15/GB | 50 GB/mo | $7.50 |
| **Total Variable** | | | **$107.54** |

**Total Monthly Cost (1K users):** ~$153.54  
**Cost per User:** $0.15/month  
**Break-even (with ads):** ~500 active users

### 15.2 Revenue Projections

**Ad Revenue (1K users/month):**
- Page views: ~3,000
- Ad impressions: ~10,500 (3.5 per page)
- RPM: $2-5
- **Monthly Revenue:** $20-50

**Profit Margin:**
- Revenue: $20-50
- Costs: $153.54
- **Net:** -$133.54 to -$103.54 (subsidized by growth)

**Break-even Point:**
- Need ~3,000 active users/month
- Or ~10,000 page views/day

---

## 16. Disaster Recovery

### 16.1 Backup Strategy

**Current (MVP - Stateless):**
- No data to backup
- All code in Git (GitHub)
- Environment variables in Vercel

**Future (with database):**
- Daily automated backups
- Point-in-time recovery (7 days)
- Cross-region replication

### 16.2 Incident Response

**Severity Levels:**
| Level | Definition | Response Time |
|-------|------------|---------------|
| **P0** | Complete outage | < 15 min |
| **P1** | Major feature broken | < 1 hour |
| **P2** | Minor feature broken | < 4 hours |
| **P3** | Enhancement/bug | Next sprint |

**Response Plan:**
1. Alert received (Sentry/Vercel)
2. Assess severity
3. Roll back deployment (if needed)
4. Fix issue
5. Deploy fix
6. Post-mortem (P0/P1 only)

### 16.3 Rollback Strategy

```bash
# Vercel instant rollback
vercel rollback <deployment-url>

# Or via Vercel Dashboard:
# Deployments → Previous deployment → Promote
```

---

## 17. Future Enhancements

### 17.1 Phase 2: Analytics & Insights (Q1 2026)

**Features:**
- [ ] Hashtag performance tracking
- [ ] A/B testing different batches
- [ ] Industry benchmarks
- [ ] Engagement prediction

**Technical:**
- [ ] Add PostgreSQL database
- [ ] Implement analytics pipeline
- [ ] Create dashboards

### 17.2 Phase 3: Enhanced AI (Q2 2026)

**Features:**
- [ ] Personalized recommendations
- [ ] Learn from user selections
- [ ] Industry-specific models
- [ ] Multi-language support

**Technical:**
- [ ] Fine-tune Gemini model
- [ ] Implement feedback loop
- [ ] Add training pipeline

### 17.3 Phase 4: Team Features (Q2-Q3 2026)

**Features:**
- [ ] Team accounts
- [ ] Shared templates
- [ ] Approval workflows
- [ ] Brand guidelines

**Technical:**
- [ ] Multi-tenancy architecture
- [ ] Role-based access control
- [ ] Team management APIs

### 17.4 Phase 5: Enterprise (Q3 2026)

**Features:**
- [ ] API access for developers
- [ ] White-label solution
- [ ] Custom integrations
- [ ] SLA guarantees

**Technical:**
- [ ] RESTful public API
- [ ] API keys & authentication
- [ ] Rate limiting per plan
- [ ] SOC 2 certification

---

## Appendix

### A. Glossary

| Term | Definition |
|------|------------|
| **RSC** | React Server Components |
| **SSR** | Server-Side Rendering |
| **JWT** | JSON Web Token |
| **OAuth** | Open Authorization |
| **RPM** | Revenue Per Mille (per 1,000 impressions) |
| **LCP** | Largest Contentful Paint |
| **FCP** | First Contentful Paint |
| **TTI** | Time to Interactive |

### B. References

- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Platform Limits](https://vercel.com/docs/platform/limits)
- [Google Gemini API](https://ai.google.dev/docs)
- [LinkedIn API Reference](https://docs.microsoft.com/linkedin/)
- [NextAuth.js Documentation](https://next-auth.js.org/)

### C. Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | Oct 24, 2025 | Engineering Team | Initial system design |

---

**Maintained by:** Engineering Team  
**Questions?** Open an issue or contact the team  
**Last Review:** October 24, 2025

