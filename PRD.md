# Product Requirements Document
**LinkedIn Hashtag Refresh Engine**

---

## Document Information

| Field | Value |
|-------|-------|
| **Product Name** | LinkedIn Hashtag Refresh Engine |
| **Version** | 1.0 (MVP) |
| **Status** | ✅ Built |
| **Last Updated** | October 21, 2025 |
| **Owner** | Product Team |
| **Stakeholders** | Engineering, Design |

---

## Executive Summary

### Problem
LinkedIn creators spend 20-30 minutes per post manually researching hashtags, which lose effectiveness within 48 hours as trends evolve. This repetitive, time-consuming process yields diminishing returns.

### Solution
An AI-powered web application that generates relevant, trending hashtags for LinkedIn posts in 2-3 seconds using Google Gemini API, reducing hashtag research time by 95%.

### Target Users
LinkedIn content creators across all industries (900M+ potential users) who post 2-5 times per week and want to maximize content reach without manual hashtag research.

### Success Criteria
- Generate 10-12 relevant hashtags in < 5 seconds
- Save users 20+ minutes per post
- Achieve 95%+ user satisfaction
- Support 1-10 posts per batch

---

## Problem Statement

### Current Workflow
1. Create LinkedIn post (30-60 minutes)
2. Research hashtags manually (20-30 minutes):
   - Search trending hashtags
   - Analyze competitor posts
   - Verify hashtags aren't spammy
   - Select 10-15 relevant tags
3. Post declines as hashtags go stale
4. Repeat process for next post

### Pain Points
- ⏰ **Time Drain:** 30+ minutes of non-creative work per post
- 📉 **Declining Effectiveness:** Static hashtags lose relevance quickly
- 🎲 **Guesswork:** No data-driven hashtag selection
- 🔄 **Manual Process:** No automation available
- 💰 **Opportunity Cost:** Time better spent creating content

### Impact
- Average creator: 2-5 posts/week
- Time wasted: 60-150 minutes/week
- Annual waste: 50+ hours per creator

---

## Goals & Objectives

### Primary Goal
Enable LinkedIn creators to generate AI-powered, relevant hashtags in seconds instead of spending 20+ minutes on manual research.

### Key Results (KRs)
1. **Speed:** Generate hashtags in < 5 seconds (95th percentile)
2. **Quality:** 10-12 relevant hashtags per post
3. **Adoption:** Daily active usage by creators
4. **Satisfaction:** 8+/10 user satisfaction score

### Non-Goals (Out of Scope)
- ❌ Content creation or editing
- ❌ Post scheduling
- ❌ Analytics dashboard
- ❌ Multi-user/team features
- ❌ Monetization (MVP)
- ❌ Mobile native apps
- ❌ Cross-platform support (Twitter, Instagram)

---

## User Personas

### Primary: Active LinkedIn Creator

**Demographics:**
- Age: 25-55
- Profession: Any (tech, marketing, sales, HR, consulting, etc.)
- LinkedIn Activity: Posts 2-5 times/week
- Tech Comfort: Moderate (uses web apps regularly)

**Goals:**
- Build personal brand and thought leadership
- Increase post reach and engagement
- Save time on content distribution
- Generate business opportunities

**Pain Points:**
- Limited time for social media optimization
- Don't know which hashtags work
- Hashtag research feels repetitive
- Hard to keep up with trending tags

**Quote:**
> "I want to focus on creating great content, not researching hashtags for 30 minutes."

---

## User Stories

### Epic 1: Hashtag Generation

**As a** LinkedIn creator  
**I want to** paste my post URL and get AI-generated hashtags  
**So that** I can save 20+ minutes per post

**Acceptance Criteria:**
- [ ] Input field accepts 1-10 LinkedIn post URLs
- [ ] System validates URLs are from LinkedIn
- [ ] AI generates 10-12 relevant hashtags in < 5 seconds
- [ ] Hashtags are displayed in clean, organized layout
- [ ] User can copy all hashtags with one click
- [ ] System shows loading state during generation
- [ ] Error messages are clear and actionable

---

### Epic 2: Copy & Paste Workflow

**As a** user  
**I want to** copy generated hashtags to my clipboard  
**So that** I can paste them as a comment on my LinkedIn post

**Acceptance Criteria:**
- [ ] "Copy All" button visible after generation
- [ ] Single click copies all hashtags to clipboard
- [ ] Success toast notification confirms copy
- [ ] Hashtags formatted with # prefix
- [ ] Each hashtag on separate line for LinkedIn comments

---

## Functional Requirements

### FR-1: URL Input & Validation
**Priority:** P0 (Must Have)

**Requirements:**
- Accept 1-10 LinkedIn post URLs (one per line)
- Validate URL format: `linkedin.com/posts/*` or `linkedin.com/feed/update/*`
- Show clear error messages for invalid URLs
- Support both desktop and mobile LinkedIn URLs
- Trim whitespace and handle formatting variations

**Success Criteria:**
- Valid URLs accepted with no errors
- Invalid URLs rejected with clear error message
- Edge cases handled gracefully

---

### FR-2: AI Hashtag Generation
**Priority:** P0 (Must Have)

**Requirements:**
- Integrate with Google Gemini 1.5 Flash API
- Generate 10-12 relevant hashtags per post
- Format hashtags in lowercase without # symbol
- Filter out spam/banned hashtags
- Complete generation in < 5 seconds
- Handle API errors gracefully with retry logic

**Success Criteria:**
- 95%+ success rate for hashtag generation
- < 5 second generation time (95th percentile)
- Hashtags are relevant and professional
- No spam or inappropriate hashtags

---

### FR-3: Copy to Clipboard
**Priority:** P0 (Must Have)

**Requirements:**
- One-click copy functionality
- Format hashtags with # prefix for LinkedIn
- Each hashtag on separate line
- Show success toast notification
- Handle copy failures gracefully

**Success Criteria:**
- Copy works in all modern browsers
- Success notification appears immediately
- Formatted correctly for LinkedIn comments

---

### FR-4: Responsive Design
**Priority:** P0 (Must Have)

**Requirements:**
- Mobile-first responsive design
- Works on devices from 320px to 2560px
- Touch-friendly interface on mobile
- Accessible (WCAG 2.1 AA compliant)
- Fast loading on all devices

**Success Criteria:**
- Works seamlessly on mobile, tablet, desktop
- No horizontal scrolling
- Touch targets minimum 44x44px
- Passes accessibility audits

---

## Technical Requirements

### Architecture
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS + ShadCN UI
- **AI:** Google Gemini 1.5 Flash API
- **Validation:** Zod + React Hook Form
- **Deployment:** Vercel

### Performance
| Metric | Target |
|--------|--------|
| Page Load | < 2s |
| Hashtag Generation | < 5s (95th %ile) |
| First Contentful Paint | < 1.5s |
| Time to Interactive | < 3s |

### Security
- Environment variables for API keys
- Input validation and sanitization
- HTTPS only
- Rate limiting on API endpoints
- No sensitive data in client

### Scalability
- Serverless architecture (Vercel)
- API route optimization
- CDN for static assets
- Edge functions for API calls

---

## User Experience

### User Flow

```
1. User lands on homepage
   ↓
2. User pastes LinkedIn post URL(s)
   ↓
3. User clicks "Generate Hashtags"
   ↓
4. System shows loading state (2-3 seconds)
   ↓
5. AI-generated hashtags appear in grid
   ↓
6. User clicks "Copy All"
   ↓
7. Success toast: "Copied to clipboard!"
   ↓
8. User pastes hashtags as comment on LinkedIn
```

### Key Screens

1. **Home/Landing Page** - Marketing, features, CTA
2. **Login Page** - Optional LinkedIn OAuth (future)
3. **Dashboard** - Overview and stats (future)
4. **Generate Page** - Main hashtag generation interface ⭐
5. **Settings** - Account preferences (future)

---

## API Specifications

### POST /api/hashtags/generate

**Request:**
```json
{
  "urls": [
    "https://linkedin.com/posts/..."
  ],
  "content": "Optional post content"
}
```

**Response (Success):**
```json
{
  "success": true,
  "data": [
    {
      "postUrl": "https://linkedin.com/posts/...",
      "hashtags": ["javascript", "webdev", "coding"],
      "metadata": {
        "model": "gemini-1.5-flash",
        "tokensUsed": 100,
        "generatedAt": "2025-10-21T..."
      }
    }
  ],
  "message": "Hashtags generated successfully"
}
```

**Response (Error):**
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid LinkedIn URL"
  }
}
```

---

## Success Metrics

### Key Performance Indicators (KPIs)

| Metric | Target | Measurement |
|--------|--------|-------------|
| **Adoption** | Daily usage | Analytics |
| **Generation Time** | < 5s (95th %ile) | API logs |
| **Success Rate** | > 95% | Error logs |
| **User Satisfaction** | 8+/10 | User feedback |
| **Time Saved** | 20+ min/post | Self-reported |

### Analytics Events
- `hashtag_generation_started`
- `hashtag_generation_completed`
- `hashtag_generation_failed`
- `hashtags_copied`
- `error_occurred`

---

## Roadmap

### Phase 1: MVP (Current) ✅
- [x] AI hashtag generation (Google Gemini)
- [x] URL input with validation
- [x] Copy to clipboard functionality
- [x] Responsive design
- [x] Professional UI (LinkedIn branding)

### Phase 2: Enhanced Features
- [ ] LinkedIn OAuth authentication
- [ ] Automated hashtag posting as comments
- [ ] Post history and management
- [ ] Undo/delete functionality
- [ ] Activity log

### Phase 3: Analytics & Scale
- [ ] Hashtag performance analytics
- [ ] A/B testing different hashtag sets
- [ ] Scheduled auto-refresh
- [ ] Multi-user support
- [ ] Team collaboration
- [ ] API for developers

---

## Risks & Mitigation

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| **Gemini API Limits** | High | Medium | Use free tier (1,500/day), monitor usage, implement caching |
| **Poor Hashtag Quality** | High | Low | Prompt engineering, user feedback loop, quality filters |
| **API Key Exposure** | Critical | Low | Environment variables, server-side only, never in client |
| **Slow Generation** | Medium | Low | Use Gemini Flash (optimized for speed), implement timeout |
| **Cost Overruns** | Medium | Low | Free tier covers 1,500 requests/day (~$0.00003/request after) |

---

## Dependencies

### External Services
- Google Gemini API (AI generation)
- Vercel (hosting)
- GitHub (version control)

### Internal Dependencies
- None (standalone application)

### Browser Support
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## Open Questions

- [ ] Should we support batch processing (10+ URLs)?
- [ ] Should we add hashtag history/favorites?
- [ ] Should we track which hashtags perform best?
- [ ] Should we support other social platforms?

---

## Appendix

### A. Hashtag Generation Prompt

```typescript
const PROMPT = `
You are a LinkedIn hashtag optimization expert.

Analyze this LinkedIn post and generate 10-12 hashtags 
that will maximize reach.

POST CONTENT: "${postContent}"

REQUIREMENTS:
- Format: lowercase only (e.g., "marketing" not "Marketing")
- Length: 3-30 characters per hashtag
- Relevance: Must directly relate to post content
- Mix: 40% broad reach, 60% niche
- Professional: Business/career-focused only
- No spam: Avoid #like4like, #followforfollow, etc.

OUTPUT FORMAT:
Return JSON array without # symbol.
Example: ["marketing", "sales", "business"]
`;
```

### B. Error Codes

| Code | Message | Resolution |
|------|---------|------------|
| `VALIDATION_ERROR` | Invalid request data | Check URL format |
| `CONFIG_ERROR` | API key not configured | Add GEMINI_API_KEY to .env |
| `INTERNAL_ERROR` | Generation failed | Retry or contact support |
| `RATE_LIMIT_ERROR` | Too many requests | Wait and retry |

### C. Cost Estimation

**Gemini API Pricing:**
- Free tier: 1,500 requests/day
- Paid: ~$0.00003 per generation
- Monthly (100 gen/day): ~$0.10

**Infrastructure:**
- Vercel Hobby: FREE
- Total: $0/month (within free tiers)

---

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | Oct 21, 2025 | MVP built and deployed |
| 0.1 | Oct 20, 2025 | Initial PRD created |

---

**Document Status:** ✅ **MVP Complete**  
**Last Review:** October 21, 2025  
**Next Review:** Post-launch feedback review

---

*This PRD follows industry standards from Amazon, Google, and leading tech companies.*

