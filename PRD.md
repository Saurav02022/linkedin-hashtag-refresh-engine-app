# Product Requirements Document
# LinkedIn Hashtag Refresh Engine

**Version:** 1.0  
**Status:** 🚧 In Development  
**Last Updated:** October 23, 2025  
**Owner:** Product & Engineering

---

## Press Release (Amazon PR/FAQ Format)

### Headline
**LinkedIn Hashtag Refresh Engine Launches: Save 2 Hours Per Week While Maintaining Peak Engagement**

### Subheading
*AI-powered automation keeps your LinkedIn posts visible by refreshing hashtags every 48 hours, eliminating manual research and combating hashtag decay.*

### The Problem
LinkedIn creators spend 20-30 minutes per post researching hashtags manually. Worse, hashtags lose 80% of their effectiveness within 48 hours as trends shift and algorithms evolve. This creates an endless cycle: research → post → watch engagement decline → research again. The average creator wastes 50+ hours annually on this non-creative work while their best content slowly fades into obscurity.

### The Solution
Hashtag Refresh Engine is a web application that generates AI-powered hashtags in 3 seconds AND automatically refreshes them on customizable schedules (every 24-168 hours). Connect your LinkedIn account, select your posts, and set your schedule. Our AI generates fresh, relevant hashtags and posts them as comments—automatically deleting old ones and adding new ones every 48 hours. Your evergreen content stays fresh indefinitely.

### How It Works
1. **Connect:** One-click LinkedIn OAuth authentication
2. **Select:** Choose posts from your dashboard
3. **Automate:** Set refresh schedule (24h/48h/72h/weekly)
4. **Relax:** AI handles everything—generation, deletion, posting, tracking

### Who It's For
- **Solo creators** posting 2-5 times/week who want automation
- **Consultants & coaches** repurposing evergreen content
- **Agencies** managing multiple client accounts (future)

### Pricing
- **Free:** 10 hashtag generations/month, manual only
- **Pro ($9/mo):** Unlimited generations + 10 active auto-refresh schedules

### Call to Action
Start free at hashtagrefreshengine.com. No credit card required.

---

## Core Metrics

### Success Criteria
| Metric | Target | Measurement |
|--------|--------|-------------|
| **Time to First Generation** | < 60 seconds from signup | Analytics |
| **Generation Speed** | < 5 seconds (p95) | API logs |
| **Auto-Refresh Success Rate** | > 95% | Cron logs |
| **Free-to-Pro Conversion** | > 20% within 30 days | Database |
| **Monthly Churn** | < 5% | Stripe |
| **User Satisfaction (NPS)** | > 50 | Surveys |

### Key Results (OKRs)
**Q4 2025:**
- 1,000 signups
- 100 Pro subscribers
- $900 MRR
- 95%+ auto-refresh reliability

**Q1 2026:**
- 5,000 signups
- 500 Pro subscribers
- $4,500 MRR
- Launch engagement tracking

---

## Problem & Solution

### The Problem
**Observation:** LinkedIn creators face two compounding problems:

1. **Time Drain:** Researching relevant hashtags takes 20-30 minutes per post
   - Search trending tags
   - Analyze competitor posts
   - Verify spam/banned tags
   - Test and iterate

2. **Hashtag Decay:** Hashtags lose 80% effectiveness within 48 hours
   - Trending topics shift
   - Algorithm preferences change
   - Engagement drops precipitously
   - Evergreen content becomes invisible

**Impact:** Average creator wastes 50+ hours/year on hashtag research while their best content gradually loses reach.

### The Solution
**Two-part platform:**

1. **Instant Generation:** AI-powered hashtag generation in 3 seconds using Google Gemini
   - Analyzes post content
   - Generates 10-12 relevant tags
   - Mix of broad (500K+ followers) and niche (<100K) tags
   - Filters spam/banned hashtags

2. **Auto-Refresh Automation:** Scheduled hashtag updates via LinkedIn API
   - User sets refresh interval (24h/48h/72h/168h)
   - Cron job runs hourly, checks due refreshes
   - AI generates fresh hashtags
   - Deletes old comment, posts new comment
   - Email notification + tracking history

**Differentiation:** We're the only platform that *maintains* engagement through automated hashtag refreshing—not just one-time generation.

---

## User Flows

### Current Flow (Manual URL Input)
```
Login (LinkedIn OAuth) 
  → Dashboard
  → Click "Generate Hashtags"
  → Paste LinkedIn post URL
  → AI generates hashtags (2-3 seconds)
  → Review/edit hashtags in modal
  → Post to LinkedIn as comment ✓
  → Success notification with link to view comment
```

### Pro Flow (Auto-Refresh) - Phase 3
```
Login → Paste URL → Generate hashtags → Post to LinkedIn
  ↓
Enable auto-refresh → Set schedule (24h/48h/72h/168h/custom)
  ↓
Every X hours: 
  Cron → Generate fresh hashtags → Delete old comment → Post new comment → Email notification
```

**Key Difference:** Manual URL input is intentional and privacy-focused. Users explicitly choose which posts to optimize, which aligns with LinkedIn's API permission model.

---

## Technical Architecture

### Stack
- **Frontend:** Next.js 15 (App Router), TypeScript, Tailwind CSS, ShadCN UI
- **State:** TanStack Query (server), Zustand (client)
- **Auth:** NextAuth.js v4 (LinkedIn OAuth)
- **Backend:** Next.js API Routes (serverless)
- **Database:** Supabase (PostgreSQL)
- **AI:** Google Gemini 1.5 Flash
- **Cron:** Vercel Cron Jobs (hourly)
- **Email:** Resend
- **Payments:** Stripe
- **Monitoring:** Sentry

### Database Schema
```sql
-- Users (handled by NextAuth)
-- Sessions (handled by NextAuth)

-- Refresh Schedules
CREATE TABLE refresh_schedules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id VARCHAR NOT NULL REFERENCES users(id),
  post_id VARCHAR NOT NULL,
  post_url VARCHAR NOT NULL,
  post_content TEXT NOT NULL,
  interval_hours INT NOT NULL, -- 24, 48, 72, 168
  max_refreshes INT NOT NULL DEFAULT 3,
  refreshes_done INT NOT NULL DEFAULT 0,
  next_refresh_at TIMESTAMP NOT NULL,
  status VARCHAR NOT NULL DEFAULT 'active', -- active | paused | completed | failed
  last_comment_id VARCHAR,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, post_id)
);

-- Refresh History
CREATE TABLE refresh_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  schedule_id UUID NOT NULL REFERENCES refresh_schedules(id) ON DELETE CASCADE,
  refreshed_at TIMESTAMP NOT NULL DEFAULT NOW(),
  old_hashtags JSONB NOT NULL,
  new_hashtags JSONB NOT NULL,
  old_comment_id VARCHAR,
  new_comment_id VARCHAR NOT NULL,
  status VARCHAR NOT NULL, -- success | failed
  error_message TEXT,
  execution_time_ms INT
);

-- Usage Tracking (for Free plan limits)
CREATE TABLE usage_tracking (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id VARCHAR NOT NULL REFERENCES users(id),
  month VARCHAR NOT NULL, -- 'YYYY-MM'
  generations_count INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, month)
);

-- Indexes
CREATE INDEX idx_schedules_next_refresh ON refresh_schedules(next_refresh_at, status);
CREATE INDEX idx_schedules_user ON refresh_schedules(user_id);
CREATE INDEX idx_history_schedule ON refresh_history(schedule_id);
CREATE INDEX idx_usage_user_month ON usage_tracking(user_id, month);
```

### API Endpoints

#### Authentication
- `GET /api/auth/signin` - NextAuth LinkedIn OAuth
- `GET /api/auth/callback/linkedin` - OAuth callback
- `POST /api/auth/signout` - Logout
- `GET /api/auth/session` - Get current session

#### Posts
- `GET /api/linkedin/posts` - Fetch user's LinkedIn posts
  - Query: `limit`, `offset`, `type` (all | posts | reposts)
  - Returns: Posts with content, date, engagement

#### Hashtags
- `POST /api/hashtags/generate` - Generate hashtags for post
  - Body: `{ postId, content }`
  - Returns: `{ hashtags[], metadata }`
  - Rate limit: Free (10/month), Pro (unlimited)

#### Comments
- `POST /api/linkedin/posts/:postId/comment` - Post hashtags as LinkedIn comment
  - Body: `{ hashtags[] }`
  - Returns: `{ commentId, commentUrl }`

- `DELETE /api/linkedin/posts/:postId/comments/:commentId` - Delete comment
  - Returns: `{ success: true }`

#### Schedules
- `POST /api/schedules` - Create auto-refresh schedule (Pro only)
  - Body: `{ postId, postUrl, postContent, intervalHours, maxRefreshes }`
  - Returns: `{ scheduleId, nextRefreshAt, status }`

- `GET /api/schedules` - Get user's schedules
  - Returns: `{ schedules[], total }`

- `PATCH /api/schedules/:id` - Update schedule (pause/resume/edit)
  - Body: `{ status?, intervalHours? }`
  - Returns: `{ schedule }`

- `DELETE /api/schedules/:id` - Delete schedule
  - Returns: `{ success: true }`

#### Cron
- `GET /api/cron/refresh-hashtags` - Execute scheduled refreshes (Vercel Cron only)
  - Auth: `CRON_SECRET` header
  - Process:
    1. Query schedules WHERE `next_refresh_at <= NOW() AND status = 'active'`
    2. For each: Generate → Delete old → Post new → Update schedule → Log history
    3. Send email notifications
  - Returns: `{ processed, succeeded, failed, errors[] }`

### Cron Configuration
```js
// vercel.json
{
  "crons": [{
    "path": "/api/cron/refresh-hashtags",
    "schedule": "0 * * * *" // Every hour
  }]
}
```

---

## Implementation Plan

### Phase 1: Auth + Manual Generation ✅ DONE
**Timeline:** Week 1-2 (Oct 1-14)  
**Status:** ✅ Complete

- [x] NextAuth.js LinkedIn OAuth
- [x] Token refresh (60-day tokens)
- [x] User dashboard
- [x] Manual hashtag generation (URL input)
- [x] Copy to clipboard

**Learnings:**
- LinkedIn OAuth works well with NextAuth.js
- Token refresh needs hourly check
- Users want to see their own posts, not paste URLs

---

### Phase 2: Manual URL Input Flow ✅ COMPLETE
**Timeline:** Week 3-4 (Oct 21 - Nov 3)  
**Status:** ✅ Complete

**What Changed:**
LinkedIn's `r_member_social` permission (required to fetch posts) is **RESTRICTED** - only available to select partners. Standard "Share on LinkedIn" product only grants `w_member_social` (write permission).

**Reference:** [LinkedIn UGC Post API Permissions](https://learn.microsoft.com/en-us/linkedin/marketing/community-management/shares/ugc-post-api#permissions)

**New Approach:** Manual URL Input (Industry Standard)
- ✅ Users paste LinkedIn post URL
- ✅ AI analyzes content and generates hashtags
- ✅ Users review/edit hashtags in modal
- ✅ App posts hashtags as comment via API
- ✅ Auto-refresh still works (we store URLs)

**Week 3-4 Deliverables:**
- [x] LinkedIn OAuth authentication (NextAuth.js)
- [x] Token refresh (60-day LinkedIn tokens)
- [x] Manual URL input page (`/posts`)
- [x] Automatic content extraction (Puppeteer + HTML parsing)
- [x] AI hashtag generation (Google Gemini 2.5 Flash)
- [x] Strategic batch selection UI (3 batches with recommendations)
- [x] Editable hashtag selection (add/remove hashtags)
- [x] Post hashtags to LinkedIn as comments
  - Endpoint: `POST /api/linkedin/comment`
  - LinkedIn API: `/v2/socialActions/urn:li:activity:{id}/comments`
  - Format: `#hashtag1\n#hashtag2\n...`
- [x] Success notifications + error handling
- [x] Dashboard with quick actions
- [x] Responsive design and accessibility

**Technical Implementation:**
- ✅ `POST /api/linkedin/comment` - Posts comments via REST API (201 Created)
- ✅ `POST /api/hashtags/generate` - AI generation with prompt engineering
- ✅ `GET /api/linkedin/posts/[postId]/content` - Automatic content extraction
- ✅ NextAuth.js LinkedIn OAuth - Token management + refresh
- ✅ TanStack Query for data fetching - Loading states + error handling
- ✅ `HashtagBatchSelector` component - Strategic batch UI with editable selection
- ✅ Puppeteer content scraper - Extracts post content from HTML tree

**Why This Works Better:**
1. **Privacy-Focused** - Users choose which posts to optimize
2. **Compliant** - Works within LinkedIn's API restrictions
3. **Industry Standard** - Same approach as Buffer, Hootsuite
4. **All Features Work** - Generate, post, auto-refresh (Phase 3)

**Acceptance Criteria Met:**
- ✅ Generate 10-12 hashtags in < 5 seconds
- ✅ Comment appears on LinkedIn within 5 seconds
- ✅ Dashboard loads in < 2 seconds
- ✅ Proper error handling and rate limiting
- ✅ Mobile-responsive UI

**LinkedIn API Permission Limitations:**

The `w_member_social` permission (standard OAuth product) provides **WRITE-ONLY** access:
- ✅ Can POST comments on user's posts
- ❌ Cannot GET (read) existing comments
- ❌ Cannot DELETE existing comments
- ❌ Cannot access Activities API

The `r_member_social` permission (read access) is **RESTRICTED** to verified partners only (Buffer, Hootsuite, Sprout Social).

**Current Comment Management Approach:**
- **Posting:** Automated via REST API (`/v2/socialActions/urn:li:activity:{id}/comments`)
- **Deletion:** Manual by user (simple UI note explains this)
- **Auto-Refresh:** Will post new comments automatically; user deletes old ones when notified via email

**Reference:** [LinkedIn API Permissions](https://learn.microsoft.com/en-us/linkedin/shared/references/permissions)

**Impact on Product:**
- ✅ No impact on core value proposition (AI hashtag generation + posting)
- ✅ Auto-refresh still viable (post new, notify user to delete old)
- ✅ Transparent UX (users understand the limitation)
- ✅ Manual deletion takes < 10 seconds per post

---

### Phase 3: Auto-Refresh MVP 🎯 NEXT
**Timeline:** Week 5-7 (Nov 4-24)  
**Status:** 📅 Planned

**Week 5: Database + UI**
- [ ] Supabase setup
  - Create database
  - Tables: `refresh_schedules`, `refresh_history`, `usage_tracking`
  - Row Level Security (RLS) policies
  - Connection pooling

- [ ] Schedule creation UI
  - Modal: "Post Now" vs "Schedule Auto-Refresh"
  - Interval selection: 24h / 48h (default) / 72h / 168h / Custom (12-720h)
  - Max refreshes input (default: 3, max: 10)
  - Schedule preview: "Refresh 1: Oct 25, 3:00 PM (+48h)"

- [ ] API: `POST /api/schedules`
  - Create schedule in database
  - Calculate `next_refresh_at`
  - Return schedule object

**Week 6: Cron + Execution**
- [ ] Vercel Cron setup
  - `vercel.json` configuration
  - `CRON_SECRET` environment variable

- [ ] Refresh execution logic
  - `GET /api/cron/refresh-hashtags`
  - Query due schedules
  - For each:
    1. Generate fresh hashtags (AI)
    2. Post new comment (`POST /v2/socialActions/.../comments`)
    3. Update schedule (increment counter, calculate next refresh)
    4. Log to `refresh_history`
  - Error handling + retries (3 attempts)
  - Rate limit handling

- [ ] Email notifications (Resend)
  - Template: "New Hashtags Posted for [Post Title]"
  - Include: Old tags, new tags, next refresh time, view post link, **delete old comment reminder**
  - Action button: "View Post & Delete Old Comment"
  - Send on: Refresh success, refresh failure
  
**Note:** Auto-refresh posts new comments automatically. Users receive email notifications with a reminder to manually delete old hashtag comments on LinkedIn (takes < 10 seconds).

**Week 7: Management + Testing**
- [ ] Dashboard: Active schedules section
  - List all schedules
  - Show: Post preview, interval, progress (2/3 done), next refresh countdown
  - Actions: Pause, Resume, Edit interval, Delete

- [ ] API endpoints: `GET`, `PATCH`, `DELETE /api/schedules/:id`

- [ ] Refresh history modal
  - Show: Refresh #1, #2, #3 with dates
  - Old vs new hashtags
  - Status (success/failed)

- [ ] Testing
  - Test with 1h interval (for faster testing)
  - Verify cron execution
  - Check email delivery
  - Monitor error rates

**Dependencies:**
- Phase 2 complete (posting comments works)
- Supabase account created
- Resend account created
- Vercel Pro plan (for cron jobs)

**Deliverables:**
- Pro users can set auto-refresh schedules
- Cron runs hourly, refreshes hashtags automatically
- Users get email notifications
- 95%+ success rate target

**Success Criteria:**
- Create schedule: < 2 seconds
- Cron execution: < 5 minutes from scheduled time
- Refresh success rate: > 95%
- Zero duplicate refreshes (idempotency)
- Email delivery: > 99%

---

### Phase 4: Monetization 💰
**Timeline:** Week 8-10 (Nov 25 - Dec 15)  
**Status:** 📅 Planned

**Week 8: Stripe Integration**
- [ ] Stripe setup
  - Create products: Free, Pro ($9/mo)
  - Webhook endpoint: `/api/webhooks/stripe`
  - Handle events: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`

- [ ] Checkout flow
  - Upgrade button → Stripe Checkout
  - Success redirect → Dashboard with success message
  - Cancel redirect → Pricing page

- [ ] Subscription status tracking
  - Store in database: `user_subscriptions` table
  - Sync with Stripe webhooks

**Week 9: Plan Enforcement**
- [ ] Usage limits
  - Free: 10 generations/month (check `usage_tracking` table)
  - Free: 0 active schedules (check `refresh_schedules` count)
  - Pro: Unlimited generations, 10 active schedules

- [ ] Upgrade prompts
  - Modal when limit reached
  - Banner in dashboard ("Upgrade to Pro for auto-refresh")

- [ ] Billing page
  - Current plan display
  - Usage stats (generations used, schedules active)
  - Manage subscription (Stripe Customer Portal)
  - Invoice history

**Week 10: Testing + Launch Prep**
- [ ] End-to-end testing
  - Free user → hit limit → upgrade → use Pro features
  - Pro user → cancel → downgrade enforcement
  - Subscription renewal
  - Failed payments

- [ ] Analytics setup
  - Conversion funnel tracking
  - Revenue metrics
  - Churn tracking

- [ ] Launch checklist
  - Production environment variables
  - Error monitoring (Sentry)
  - Database backups
  - Rate limiting
  - Security audit

**Deliverables:**
- Payment system live
- Free/Pro plan enforcement working
- Users can upgrade/downgrade/cancel
- Analytics tracking conversions

---

### Phase 5: Polish & Scale 🚀
**Timeline:** Week 11+ (Dec 16+)  
**Status:** 📅 Future

**Enhancements:**
- [ ] Refresh history dashboard with charts
- [ ] Engagement tracking (before/after refresh)
- [ ] Hashtag performance analytics
- [ ] A/B test refresh intervals
- [ ] AI-optimized refresh timing
- [ ] Bulk operations (multi-select posts)
- [ ] Team collaboration features (Phase 6)
- [ ] API for developers (Phase 6)
- [ ] Mobile app / PWA (Phase 7)

---

## Business Model

### Pricing
| Plan | Price | Target User | Features |
|------|-------|-------------|----------|
| **Free** | $0/mo | Triers, occasional users | 10 generations/month, manual posting only |
| **Pro** | $9/mo | Active creators (2+ posts/week) | Unlimited generations, 10 active schedules, auto-refresh, history, email notifications |
| **Enterprise** | $29/mo | Agencies, power users | Unlimited schedules, team collaboration, API access, engagement analytics |

### Revenue Projections
**Conservative (20% conversion):**
- Month 3: 500 signups → 100 Pro → $900 MRR
- Month 6: 2,000 signups → 400 Pro → $3,600 MRR
- Month 12: 5,000 signups → 1,000 Pro → $9,000 MRR

**Optimistic (30% conversion):**
- Month 3: 500 signups → 150 Pro → $1,350 MRR
- Month 6: 2,000 signups → 600 Pro → $5,400 MRR
- Month 12: 5,000 signups → 1,500 Pro → $13,500 MRR

### Cost Structure (1,000 users, 500 Pro)
| Service | Cost | Notes |
|---------|------|-------|
| Vercel Pro | $20/mo | Hosting + cron jobs |
| Supabase Pro | $25/mo | 10GB database |
| Gemini API | $50/mo | ~50K generations |
| Resend | $20/mo | ~100K emails |
| Stripe fees | $150/mo | 2.9% + $0.30 per txn |
| Sentry | $29/mo | Error monitoring |
| **Total** | **$294/mo** | |

**Profit:** $4,500 - $294 = **$4,206/mo (93% margin)**  
**Break-even:** 35 Pro subscribers

---

## Risks & Mitigation

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| **LinkedIn API changes** | Critical | Medium | Monitor developer updates, maintain fallback to manual mode, version API calls |
| **LinkedIn rate limits** | High | High | Cache posts (5min), queue requests, show clear UX for limits, respect 100 req/15min |
| **Cron failures** | High | Low | Monitor with Sentry, retry logic (3x), email alerts, manual trigger button |
| **Poor hashtag quality** | Medium | Medium | User feedback loop, manual editing, prompt engineering improvements |
| **Low conversion rate** | Critical | Medium | Clear value prop, usage limits, upgrade prompts, free trial offers |
| **Token expiry** | Medium | Low | Auto-refresh tokens (NextAuth), catch expiry errors early, graceful re-auth flow |
| **Database costs** | Low | Low | Start with free tier, monitor usage, optimize queries, archive old data |
| **Comment deletion fails** | Medium | Low | Log error, continue with new post, notify user, allow manual cleanup |

---

## Open Questions

### Technical
- [ ] What's LinkedIn's actual rate limit for production apps? (Assumption: 100 req/15min)
- [ ] Can we reliably find our own comments to delete? (Use author filter + hashtag prefix)
- [ ] Does LinkedIn API provide post engagement data? (Need to test)
- [ ] Can we get webhook notifications for deleted posts? (Likely no, need periodic cleanup)

### Product
- [ ] Is 48h the optimal refresh interval? (Test 36h, 48h, 60h)
- [ ] Should we allow unlimited refreshes for Enterprise? (Yes, but cap at 10 for MVP)
- [ ] Email vs in-app vs push notifications? (Email for MVP, in-app Phase 5)
- [ ] Allow bulk schedule creation? (Not MVP, add Phase 5)

### Business
- [ ] Is $9/mo the right price? (Test $7, $9, $12)
- [ ] Offer 14-day Pro trial? (Yes, after Phase 4 launch)
- [ ] Referral program? (Phase 5, $5 credit for referrer + referee)
- [ ] Target solo creators or agencies first? (Solo creators MVP, agencies Phase 6)

### Go-to-Market
- [ ] Product Hunt launch timing? (After Phase 4, when monetization live)
- [ ] SEO strategy? (Blog content, "LinkedIn hashtag generator" keywords)
- [ ] Paid ads or organic? (Organic first, paid ads if CAC < $5)
- [ ] Partner with LinkedIn coaches? (Yes, explore affiliate program Phase 5)

---

## Dependencies & Requirements

### External Services
- **Vercel** (Hobby → Pro at 1,000 users): Hosting, cron jobs, edge functions
- **Supabase** (Free → Pro at 500 users): PostgreSQL database, Row Level Security
- **LinkedIn API**: OAuth, posts API (`/v2/ugcPosts`), comments API (`/v2/socialActions/.../comments`)
- **Google Gemini**: AI hashtag generation (1.5 Flash model)
- **NextAuth.js**: LinkedIn OAuth provider
- **Resend**: Transactional emails
- **Stripe**: Payments processing
- **Sentry**: Error monitoring

### LinkedIn OAuth Scopes
- `openid` - Required for OpenID Connect
- `profile` - User's name, profile picture
- `email` - User's email address
- `w_member_social` - Post comments on user's behalf (key scope for auto-refresh)

### Environment Variables
```bash
# LinkedIn OAuth
LINKEDIN_CLIENT_ID=
LINKEDIN_CLIENT_SECRET=

# NextAuth
NEXTAUTH_URL=http://localhost:3000 # https://yourapp.com in production
NEXTAUTH_SECRET=  # openssl rand -base64 32

# Supabase
DATABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=

# AI
GEMINI_API_KEY=

# Email
RESEND_API_KEY=

# Payments
STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

# Cron
CRON_SECRET=  # For Vercel Cron authentication

# Monitoring
SENTRY_DSN=
```

---

## Testing Strategy

### Unit Tests
- Hashtag generation logic
- Schedule calculation (next refresh time)
- Usage tracking (Free plan limits)
- Comment formatting

### Integration Tests
- LinkedIn OAuth flow
- Fetch posts from LinkedIn
- Post comment to LinkedIn
- Delete comment from LinkedIn
- Stripe webhook handling

### End-to-End Tests (Playwright)
- User signup → generate hashtags → post to LinkedIn
- User signup → create schedule → verify cron execution
- Free user → hit limit → upgrade → use Pro features
- Pro user → cancel subscription → enforce downgrade

### Manual Testing Checklist
- [ ] Login with LinkedIn works
- [ ] Fetch posts shows correct data
- [ ] Generate hashtags returns relevant tags
- [ ] Post to LinkedIn creates comment
- [ ] Schedule creation works
- [ ] Cron job executes on time
- [ ] Email notifications sent
- [ ] Upgrade flow works
- [ ] Billing page shows correct data
- [ ] Cancel subscription works

---

## Success Metrics Dashboard

### North Star Metric
**Active Schedules:** Number of active auto-refresh schedules  
Target: 500 active schedules by Month 3

### Supporting Metrics

**Acquisition:**
- Signups/month: Target 1,000 by Month 3
- Traffic sources (LinkedIn, Google, Product Hunt, referrals)
- Conversion rate (visitor → signup): Target > 5%

**Activation:**
- Time to first generation: Target < 60 seconds
- % users who generate hashtags: Target > 60%
- % users who post to LinkedIn: Target > 40%

**Retention:**
- Daily Active Users (DAU)
- Weekly Active Users (WAU)
- Monthly churn rate: Target < 5%

**Revenue:**
- Free → Pro conversion rate: Target > 20%
- Monthly Recurring Revenue (MRR): Target $900 by Month 3
- Average Revenue Per User (ARPU)
- Customer Lifetime Value (LTV)

**Engagement:**
- Avg schedules per Pro user: Target 3
- Avg generations per user/month
- Refresh success rate: Target > 95%
- Email open rate: Target > 40%

### Analytics Events
```typescript
// Track these events with PostHog / Amplitude
events = {
  // Auth
  'user_signed_up',
  'user_logged_in',
  'user_logged_out',
  
  // Generation
  'hashtags_generated',
  'hashtags_edited',
  'hashtags_posted_to_linkedin',
  'generation_failed',
  
  // Schedules
  'schedule_created',
  'schedule_paused',
  'schedule_resumed',
  'schedule_deleted',
  'schedule_completed',
  'refresh_executed',
  'refresh_succeeded',
  'refresh_failed',
  
  // Conversion
  'upgrade_button_clicked',
  'checkout_started',
  'checkout_completed',
  'subscription_cancelled',
  
  // Limits
  'free_limit_reached',
  'schedule_limit_reached',
}
```

---

## Appendix

### A. Hashtag Generation Prompt
```typescript
const PROMPT = `You are a LinkedIn hashtag expert.

Analyze this LinkedIn post and generate 10-12 hashtags to maximize reach.

POST CONTENT:
"${postContent}"

REQUIREMENTS:
- Format: lowercase only (e.g. "javascript" not "JavaScript")
- Length: 3-30 characters
- Mix: 40% broad reach (500K+ followers), 60% niche (<100K followers)
- Professional: Business-focused only
- No spam: Avoid #like4like, #followforfollow, etc.
- Trending: Prioritize current trending tags
- Variety: Mix industry, skill, and topic tags

GOOD EXAMPLES:
#artificialintelligence #machinelearning #datascience #python

BAD EXAMPLES:
#like4like #followforfollow #linkinbio

OUTPUT FORMAT:
Return a JSON array of strings (no # symbol):
["marketing", "sales", "business", "entrepreneur", ...]

Generate exactly 10-12 hashtags.`;
```

### B. Error Codes
| Code | Message | User Action | System Action |
|------|---------|-------------|---------------|
| `AUTH_FAILED` | LinkedIn authentication failed | Try logging in again | Log error, retry |
| `POSTS_FETCH_FAILED` | Failed to fetch posts | Check LinkedIn connection | Retry with backoff |
| `RATE_LIMIT_EXCEEDED` | LinkedIn API rate limit reached | Wait 15 minutes | Queue request, retry later |
| `GENERATION_FAILED` | Failed to generate hashtags | Try again | Retry 3x, then show error |
| `POST_COMMENT_FAILED` | Failed to post comment | Verify permissions | Log error, notify user |
| `SCHEDULE_LIMIT_EXCEEDED` | Schedule limit reached | Upgrade to Pro | Show upgrade modal |
| `USAGE_LIMIT_EXCEEDED` | Monthly generation limit reached | Upgrade to Pro | Show upgrade modal |
| `CRON_EXECUTION_FAILED` | Auto-refresh failed | Check email for details | Retry next hour, email user |
| `PAYMENT_FAILED` | Payment processing failed | Update payment method | Pause schedules, email user |

### C. LinkedIn API Reference

**Authentication:**
```
POST https://www.linkedin.com/oauth/v2/accessToken
POST https://www.linkedin.com/oauth/v2/introspectToken (for token refresh)
```

**Fetch Posts:**
```
GET https://api.linkedin.com/v2/ugcPosts?q=authors&authors=List({PERSON_URN})&count=50
Headers: Authorization: Bearer {access_token}
```

**Post Comment:**
```
POST https://api.linkedin.com/v2/socialActions/{ugcPostUrn}/comments
Headers: Authorization: Bearer {access_token}
Body: {
  "actor": "urn:li:person:{person_id}",
  "message": {
    "text": "#hashtag1\n#hashtag2\n#hashtag3"
  }
}
```

**Delete Comment:**
```
DELETE https://api.linkedin.com/v2/socialActions/{ugcPostUrn}/comments/{commentId}
Headers: Authorization: Bearer {access_token}
```

**Get Comments:**
```
GET https://api.linkedin.com/v2/socialActions/{ugcPostUrn}/comments
Headers: Authorization: Bearer {access_token}
```

---

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.1 | Oct 23, 2025 | Phase 2 COMPLETE: Manual URL input + AI generation + Strategic batches + API posting working. LinkedIn API limitations documented (w_member_social = write-only). Manual deletion approach adopted. |
| 1.0 | Oct 21, 2025 | Initial PRD: Auth + Manual generation (Phase 1) complete. LinkedIn integration (Phase 2) in progress. Auto-refresh (Phase 3) planned. |

---

## Sign-Off

**Approved by:**
- Product: ✅ Approved
- Engineering: ✅ Approved
- Design: ✅ Approved

**Next Review:** Monday sprint reviews (weekly)  
**Next Milestone:** Phase 3 - Auto-Refresh MVP (Nov 4-24, 2025)

---

*This PRD follows industry standards from Amazon (PR/FAQ), Google (structured PRDs), Stripe (developer-first), and Linear (execution-focused). It serves as the single source of truth for the LinkedIn Hashtag Refresh Engine.*

**Questions?** Open a GitHub issue or contact the product team.

