# Product Requirements Document (PRD)

**Product Name:** Hashtag Engine  
**Version:** 1.0 (MVP)  
**Last Updated:** October 24, 2025  
**Document Owner:** Product Team  
**Status:** ✅ MVP Launched

---

## 1. Executive Summary

### Product Vision
Hashtag Engine is a free, AI-powered tool that helps LinkedIn creators generate relevant hashtags in seconds, eliminating the 20-30 minute research process and maximizing post reach.

### Problem Statement
LinkedIn creators waste 20-30 minutes researching hashtags for each post. This friction reduces posting frequency and engagement. Manual research is time-consuming, inconsistent, and often results in suboptimal hashtag choices.

### Solution
An AI-powered web app that generates 10-12 strategic hashtags in 2-3 seconds, organized into 3 batches (Maximum Reach, Viral Potential, Niche Engagement), with one-click posting to LinkedIn as comments.

### Business Model
**Free-to-use**, ad-supported model:
- Google Analytics for user insights
- Sentry for error monitoring
- Google AdSense for revenue generation
- No subscriptions, no paywalls, no credit card required

---

## 2. Goals & Success Metrics

### Primary Goals
1. Save creators 20+ minutes per post
2. Increase LinkedIn post engagement through better hashtags
3. Provide 100% free, unlimited access
4. Generate revenue through non-intrusive ads

### Success Metrics (KPIs)

| Metric | Target (3 months) | Target (6 months) |
|--------|-------------------|-------------------|
| **Active Users** | 1,000 | 5,000 |
| **Hashtag Generations** | 10,000 | 50,000 |
| **Average Generation Time** | < 3 seconds | < 2 seconds |
| **User Retention (30-day)** | 40% | 50% |
| **Ad Revenue** | $500/month | $2,000/month |
| **Error Rate** | < 1% | < 0.5% |

---

## 3. User Personas

### Primary Persona: "Sarah the Solopreneur"
- **Age:** 28-45
- **Role:** Freelancer, consultant, coach, content creator
- **Pain Points:**
  - Limited time for social media
  - Inconsistent posting due to hashtag research friction
  - Unsure which hashtags work best
- **Goals:**
  - Grow LinkedIn presence
  - Attract clients/opportunities
  - Post consistently (3-5x/week)
- **Tech Savviness:** Medium-High

### Secondary Persona: "Mark the Marketing Manager"
- **Age:** 30-50
- **Role:** Marketing/social media manager at SMB
- **Pain Points:**
  - Managing multiple accounts
  - Need to post frequently
  - Budget constraints for paid tools
- **Goals:**
  - Increase company visibility
  - Drive leads through LinkedIn
  - Demonstrate ROI to leadership
- **Tech Savviness:** High

---

## 4. Core Features

### MVP Features (✅ Launched - Oct 2025)

#### 4.1 LinkedIn Authentication
- **Description:** Secure OAuth 2.0 login with LinkedIn
- **User Story:** As a creator, I want to securely connect my LinkedIn account so I can post hashtags directly
- **Acceptance Criteria:**
  - OAuth flow completes in < 5 seconds
  - Clear permission explanations shown
  - Secure token storage
  - Easy disconnect option

#### 4.2 AI Hashtag Generation
- **Description:** Generate 10-12 relevant hashtags using Google Gemini 2.5 Flash
- **User Story:** As a creator, I want to get relevant hashtags in seconds so I don't waste time researching
- **Input:** LinkedIn post content (manual paste)
- **Output:** 3 strategic batches with 3-4 hashtags each
- **Acceptance Criteria:**
  - Generation completes in < 3 seconds
  - Hashtags are relevant to content
  - Mix of broad and niche hashtags
  - No inappropriate/spam hashtags

#### 4.3 Strategic Batches
- **Description:** Organize hashtags into 3 goal-oriented batches
- **Batches:**
  1. **Maximum Reach:** High-volume, popular hashtags
  2. **Viral Potential:** Trending, emerging hashtags
  3. **Niche Engagement:** Industry-specific, targeted hashtags
- **User Story:** As a creator, I want to choose hashtags based on my goal so I can optimize for reach vs engagement
- **Acceptance Criteria:**
  - Clear batch labels and descriptions
  - Each batch has 3-4 hashtags
  - User can select/deselect individual hashtags
  - Can mix hashtags from different batches

#### 4.4 One-Click Posting
- **Description:** Post selected hashtags as LinkedIn comment
- **User Story:** As a creator, I want to post hashtags with one click so I can save time
- **Acceptance Criteria:**
  - Posts to correct LinkedIn post
  - Hashtags formatted correctly (one per line)
  - Success/error feedback shown
  - Manual fallback if API fails (auto-copy to clipboard)

#### 4.5 Manual Content Input
- **Description:** User pastes post content manually
- **User Story:** As a creator, I want to paste my content easily so I can get hashtags quickly
- **Rationale:** LinkedIn API restricts automatic content extraction
- **Acceptance Criteria:**
  - Clear 2-step flow (URL → Content)
  - Helpful error messages
  - Minimum 10 characters required
  - Maximum 3,000 characters

---

## 5. Technical Architecture

### Tech Stack
- **Frontend:** Next.js 15 (App Router), React 18, TypeScript
- **Styling:** Tailwind CSS, ShadCN UI components
- **State Management:** TanStack Query (server state), Zustand (client state)
- **Authentication:** NextAuth.js + LinkedIn OAuth 2.0
- **AI:** Google Gemini 2.5 Flash API
- **Deployment:** Vercel (serverless)
- **Analytics:** Google Analytics 4
- **Monitoring:** Sentry
- **Monetization:** Google AdSense

### API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/auth/[...nextauth]` | POST | LinkedIn OAuth flow |
| `/api/auth/me` | GET | Get current user |
| `/api/hashtags/generate` | POST | Generate hashtags from content |
| `/api/linkedin/comment` | POST | Post hashtags to LinkedIn |
| `/api/health` | GET | Health check |

### Database
**Current:** None (stateless MVP)  
**Future:** PostgreSQL for user preferences, history, analytics

---

## 6. User Flow

### Happy Path
1. **Landing** → User visits homepage
2. **Login** → Click "Get Started" → LinkedIn OAuth
3. **Generate** → Paste LinkedIn post URL → Click "Continue"
4. **Input** → Paste post content (explained why)
5. **Results** → AI generates 3 strategic batches in 2-3 seconds
6. **Review** → Select/customize hashtags from any batch
7. **Post** → Click "Post to LinkedIn" → Done!

### Alternative Path: Manual Fallback
- If LinkedIn API fails → Hashtags auto-copied to clipboard
- Modal shows manual instructions
- User manually pastes as comment on LinkedIn

---

## 7. Design Requirements

### Design Principles
1. **Simplicity:** Minimal clicks, clear flow
2. **Speed:** Everything feels instant
3. **Transparency:** Clear explanations (why manual input, what we access)
4. **Accessibility:** WCAG AA compliant

### UI Components
- Clean, modern design with ample white space
- Consistent spacing scale (4, 8, 12, 16, 24, 32, 48, 64, 96)
- Typography hierarchy (text-3xl → text-4xl for headers)
- Responsive (mobile-first)
- Proper loading/error/empty states

### Branding
- **Primary Color:** Blue (LinkedIn-aligned)
- **Accent:** Green (success, growth)
- **Logo:** Hash symbol (#) in rounded square

---

## 8. Non-Functional Requirements

### Performance
- Page load: < 2 seconds
- Generation: < 3 seconds
- Time to Interactive (TTI): < 3 seconds
- Lighthouse score: > 90

### Reliability
- Uptime: 99.5%
- Error rate: < 1%
- Graceful degradation if AI API fails

### Security
- HTTPS only
- Secure token storage
- No sensitive data logging
- GDPR/CCPA compliant

### Scalability
- Handle 10,000+ generations/day
- Serverless architecture (auto-scaling)
- CDN for static assets

---

## 9. Future Roadmap

### Phase 2: Analytics & Insights (Q1 2026)
- [ ] Track hashtag performance (views, engagement)
- [ ] Show which batches work best
- [ ] Historical trend analysis
- [ ] Export analytics reports

### Phase 3: Enhanced AI (Q2 2026)
- [ ] Learn from user selections
- [ ] Personalized recommendations
- [ ] Industry-specific models
- [ ] Multi-language support

### Phase 4: Advanced Features (Q2-Q3 2026)
- [ ] Hashtag history & favorites
- [ ] Batch templates
- [ ] Team collaboration
- [ ] API access for developers
- [ ] Browser extension

### Phase 5: Monetization Enhancement (Q3 2026)
- [ ] Premium ad-free tier (optional)
- [ ] Advanced analytics (premium)
- [ ] White-label for agencies (premium)

---

## 10. Risks & Mitigation

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| **LinkedIn API changes** | High | Medium | Monitor API changelog, maintain fallback flow |
| **Gemini API rate limits** | High | Low | Implement caching, queue system, show estimate |
| **Low user adoption** | High | Medium | SEO optimization, content marketing, viral features |
| **Ad revenue insufficient** | Medium | Medium | Monitor closely, optimize ad placement, consider freemium |
| **Competitor launches similar** | Medium | High | Focus on speed, UX, free tier, build brand |
| **AI generates poor hashtags** | High | Low | Continuous prompt engineering, user feedback loop |

---

## 11. Open Questions

- [ ] Should we add hashtag analytics to MVP?
- [ ] What's optimal ad placement without annoying users?
- [ ] Should we support other platforms (Twitter, Instagram) in future?
- [ ] Do we need user accounts/profiles beyond OAuth?

---

## 12. Dependencies

### External Services
- LinkedIn API (OAuth + Social Actions)
- Google Gemini API
- Vercel hosting
- Google Analytics
- Sentry monitoring
- Google AdSense

### Internal
- Design system (complete)
- Documentation (complete)
- CI/CD pipeline (Vercel auto-deploy)

---

## 13. Compliance & Legal

### Privacy
- Privacy Policy published
- Cookie consent (for analytics/ads)
- Data retention: 30 days (logs only)
- No PII stored

### Terms of Service
- Clear usage terms
- No warranty disclaimer
- Acceptable use policy

### Accessibility
- WCAG AA compliance
- Keyboard navigation
- Screen reader support
- Proper ARIA labels

---

## 14. Launch Checklist

- [x] Core features implemented
- [x] LinkedIn OAuth working
- [x] AI hashtag generation working
- [x] One-click posting working
- [x] Responsive design
- [x] Error handling
- [x] Loading states
- [x] Documentation complete
- [x] Production deployment
- [ ] Analytics integration
- [ ] Sentry integration
- [ ] AdSense integration
- [ ] SEO optimization
- [ ] Social media presence
- [ ] Launch announcement

---

## 15. Appendix

### Research & References
- LinkedIn API Documentation: https://docs.microsoft.com/linkedin/
- Google Gemini API: https://ai.google.dev/docs
- Next.js Best Practices: https://nextjs.org/docs
- WCAG Guidelines: https://www.w3.org/WAI/WCAG21/quickref/

### Glossary
- **OAuth:** Open Authorization protocol for secure API access
- **Batch:** Group of hashtags organized by strategy
- **Serverless:** Cloud architecture with auto-scaling
- **TTI:** Time to Interactive (performance metric)

---

**Document History**

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | Oct 24, 2025 | Product Team | Initial PRD for MVP |

---

**Approval**

- [ ] Product Lead
- [ ] Engineering Lead
- [ ] Design Lead
- [ ] Marketing Lead

