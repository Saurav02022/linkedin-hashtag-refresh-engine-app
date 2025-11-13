# Google AdSense Setup

**Status:** Policy Compliant  
**Active Ad Units:** 6  
**Last Updated:** November 13, 2025

---

## Quick Overview

This document tracks AdSense integration and policy compliance for the LinkedIn Hashtag Refresh Engine application.

### Current Status

- ✅ AdSense integrated and deployed
- ✅ Policy violation fixed (removed ads from placeholder pages)
- ⏳ Awaiting review after policy fix (wait 24-48 hours before requesting)

---

## Active Ad Placements

| Page | Location | Slot ID | Type |
|------|----------|---------|------|
| Homepage | After Features | `8795108171` | In-Content |
| Homepage | After How It Works | `9613365825` | In-Content |
| Login | After How It Works | `7432450266` | In-Content |
| Generate Hashtags | Above Form | `2932407402` | In-Content |
| Generate Hashtags | After Results | `8665640882` | In-Content |
| Settings | Right Sidebar | `3011216889` | Sidebar |

**Total:** 6 ad units on pages with substantial content

---

## Policy Compliance

### What Was Fixed (November 13, 2025)

**Issue:** Ads were placed on "Coming Soon" pages (violation: low-value content)

**Resolution:** 
- Removed `InContentAd` from `ComingSoon.tsx` component
- 9 placeholder pages no longer display ads: `/help`, `/about`, `/terms`, `/privacy`, `/cookies`, `/changelog`, `/status`, `/docs`, `/contact`

### Policy Requirements

**Ads are ONLY allowed on pages with:**
- Substantial original content (500+ words) OR
- Functional features that provide user value OR
- Complete, non-placeholder information

**Ads are NOT allowed on:**
- "Coming Soon" or "Under Construction" pages
- Pages with minimal content
- Error pages (404, 500)
- Pages used solely for navigation or alerts

**Reference:** [Google Publisher Policies](https://support.google.com/adsense/answer/10502938)

---

## How to Request AdSense Review

After fixing policy violations, follow these steps:

### 1. Wait 24-48 Hours
Allow Google to re-crawl your site and detect the changes.

### 2. Request Review
1. Visit [AdSense Dashboard](https://adsense.google.com)
2. Navigate to **Policy Center**
3. Locate the policy violation notice
4. Click **"Request Review"**

### 3. Review Message Template

```
Subject: Policy Violation Fixed - Ads Removed from Low-Value Pages

I have fixed the policy violation regarding ads on low-value content pages.

What was fixed:
- Removed all ads from placeholder/"Coming Soon" pages
- Ads now only appear on pages with substantial content

Current compliant ad placements:
- Homepage (with features, pricing, how-it-works sections)
- Login page (with authentication flow)
- Hashtag generation tool (functional feature)
- Settings page (user preferences)

The site now complies with Google Publisher Policies.
```

### 4. Timeline
- Review typically takes 1-3 business days
- You'll receive an email with the decision
- Ads will resume normal serving after approval

---

## Technical Configuration

### Environment Variables

Required in `.env.local` and deployment environment:

```bash
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-6731044537367330
```

### Ad Components

**In-Content Ad:**
```tsx
import { InContentAd } from '@/components/ads'

<InContentAd slot="YOUR_SLOT_ID" />
```

**Sidebar Ad:**
```tsx
import { SidebarAd } from '@/components/ads'

<SidebarAd slot="YOUR_SLOT_ID" />
```

---

## Troubleshooting

### Ads Not Showing

**Blank ad spaces are normal during first 24-48 hours.**

1. Check browser console for errors
2. Verify environment variable is set
3. Test in incognito mode (to avoid ad blocker extensions)
4. Wait 48 hours for AdSense to start serving

### Common Warnings (Can Be Ignored)

```
No slot size for availableWidth=0
```
Fixed in production. Hard refresh if you still see it.

```
Video element not found for attaching listeners
```
Browser extension warning - not related to AdSense.

### When to Contact Support

Contact [AdSense Support](https://support.google.com/adsense/gethelp) if:
- Policy violations after fixing issues
- No ads after 7 days with traffic > 100 visits/day
- RPM consistently < $0.50 after 2 weeks

---

## Before Adding New Ads

Complete this checklist before adding ads to any page:

- [ ] Page has 500+ words of original content OR substantial functionality
- [ ] Page is NOT under construction or a placeholder
- [ ] Page provides clear value to users
- [ ] Content is original and not duplicated
- [ ] Page has proper navigation and structure
- [ ] Maximum 3 ads per page
- [ ] Ads placed after content, not before

---

## Monitoring

### Key Metrics

| Metric | Target | Notes |
|--------|--------|-------|
| CTR | 0.5% - 2% | Click-through rate |
| RPM | $2 - $5 | Revenue per 1000 impressions |
| Bounce Rate | < 60% | Reduce ads if too high |
| Page Load | < 3s | Monitor ad impact |

### Check Performance

1. [AdSense Dashboard](https://adsense.google.com) - Reports → Overview
2. Monitor: Impressions, Clicks, CTR, RPM, Earnings
3. Track 7-day trends after changes

---

## Resources

- [AdSense Help Center](https://support.google.com/adsense)
- [Publisher Policies](https://support.google.com/adsense/answer/10502938)
- [AdSense Community](https://support.google.com/adsense/community)
- [Webmaster Quality Guidelines](https://developers.google.com/search/docs/essentials)

---

## Changelog

### v1.2 - November 13, 2025
- **Fixed:** Policy violation - removed ads from placeholder pages
- **Removed:** Ad from `ComingSoon.tsx` component (affected 9 pages)
- **Updated:** Documentation to emphasize policy compliance

### v1.1 - October 24, 2025
- **Fixed:** "No slot size for availableWidth=0" error
- **Updated:** Ad containers with proper dimensions

### v1.0 - October 24, 2025
- **Initial:** AdSense integration with 7 ad units
- **Created:** InContentAd and SidebarAd components

