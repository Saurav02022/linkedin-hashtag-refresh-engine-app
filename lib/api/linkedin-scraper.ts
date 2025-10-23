/**
 * LinkedIn Content Scraper
 * Single Responsibility: Extract post content from LinkedIn URLs using Puppeteer
 * 
 * Note: This scrapes public LinkedIn posts. For privacy and compliance:
 * - Only works with public posts
 * - Users explicitly provide URLs they want to analyze
 * - No automated crawling or mass scraping
 * - Respects LinkedIn's robots.txt for public content viewing
 */

import { Browser, Page } from 'puppeteer-core'

// Dynamic import for puppeteer-core to handle both environments
const getPuppeteer = async () => {
  if (process.env.VERCEL) {
    // Vercel production/serverless environment
    const puppeteerCore = await import('puppeteer-core')
    return puppeteerCore.default
  } else {
    // Local development - use regular puppeteer
    const puppeteer = await import('puppeteer')
    return puppeteer.default
  }
}

// Get Chromium for Vercel environment
const getChromium = async () => {
  if (process.env.VERCEL) {
    // @ts-ignore - @sparticuz/chromium doesn't have TypeScript definitions
    const chromiumModule = await import('@sparticuz/chromium')
    return chromiumModule.default
  }
  return null
}

/**
 * Extract content from a LinkedIn post URL
 * 
 * @param postUrl - Full LinkedIn post URL
 * @returns Extracted post text content
 * @throws Error if extraction fails or post is not accessible
 */
export async function extractLinkedInPostContent(postUrl: string): Promise<string> {
  let browser: Browser | null = null

  try {
    const puppeteer = await getPuppeteer()
    const chromium = await getChromium()
    
    // Configure browser launch options based on environment
    let launchOptions: any
    
    if (process.env.VERCEL && chromium) {
      // Vercel/AWS Lambda configuration
      launchOptions = {
        args: [
          ...chromium.args,
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-accelerated-2d-canvas',
          '--disable-gpu',
        ],
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath(),
        headless: chromium.headless,
      }
    } else {
      // Local development configuration
      launchOptions = {
        headless: true,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-accelerated-2d-canvas',
          '--disable-gpu',
          '--window-size=1920,1080',
        ],
      }
    }

    // Launch headless browser with environment-specific settings
    browser = await puppeteer.launch(launchOptions)

    const page: Page = await browser.newPage()

    // Block unnecessary resources for faster loading
    await page.setRequestInterception(true)
    page.on('request', (req) => {
      const resourceType = req.resourceType()
      if (['image', 'stylesheet', 'font', 'media'].includes(resourceType)) {
        req.abort()
      } else {
        req.continue()
      }
    })

    // Set realistic user agent to avoid bot detection
    await page.setUserAgent(
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    )

    // Navigate to LinkedIn post
    console.log(`📄 Navigating to: ${postUrl}`)
    await page.goto(postUrl, {
      waitUntil: 'domcontentloaded',
      timeout: 15000, // 15 second timeout
    })

    // Wait for post content to load (try multiple selectors)
    await page.waitForSelector('body', { timeout: 5000 })

    // Extract post text content from DOM
    const content = await page.evaluate(() => {
      // LinkedIn uses various selectors for post content
      // Try them in order of most specific to most general
      const selectors = [
        // Feed posts
        '.feed-shared-update-v2__description',
        '[data-test-id="main-feed-activity-card__commentary"]',
        '.feed-shared-text',
        '.feed-shared-update-v2__commentary',
        
        // Detail view
        '.attributed-text-segment-list__container',
        '[dir="ltr"].break-words',
        '.update-components-text',
        
        // Article posts
        '.share-update-card__update-text',
        
        // Fallback: any text content
        'article',
        '[data-id]',
      ]

      for (const selector of selectors) {
        const element = document.querySelector(selector)
        if (element) {
          const text = element.textContent?.trim() || ''
          if (text.length >= 10) {
            // Found valid content
            return text
          }
        }
      }

      // Last resort: try to find any meaningful text
      const bodyText = document.body.innerText
      if (bodyText && bodyText.length >= 10) {
        // Extract first meaningful paragraph
        const lines = bodyText.split('\n').filter(line => line.trim().length > 10)
        if (lines.length > 0) {
          return lines.slice(0, 5).join(' ').substring(0, 3000) // First 3000 chars
        }
      }

      return ''
    })

    await browser.close()

    // Validate extracted content
    if (!content || content.length < 10) {
      throw new Error('Could not extract meaningful content from the post. The post may be private or require login.')
    }

    // Clean up the content
    const cleanedContent = content
      .replace(/\s+/g, ' ') // Normalize whitespace
      .replace(/[^\S\r\n]+/g, ' ') // Remove extra spaces
      .trim()
      .substring(0, 3000) // Limit to 3000 characters

    console.log(`✅ Extracted ${cleanedContent.length} characters`)
    return cleanedContent

  } catch (error) {
    // Ensure browser is closed
    if (browser) {
      await browser.close().catch(console.error)
    }

    console.error('❌ LinkedIn content extraction failed:', error)

    // Provide user-friendly error messages
    if (error instanceof Error) {
      if (error.message.includes('timeout') || error.message.includes('Navigation timeout')) {
        throw new Error('The post took too long to load. Please try again or check if the post is accessible.')
      }
      if (error.message.includes('net::ERR')) {
        throw new Error('Network error. Please check your connection and ensure the URL is correct.')
      }
      if (error.message.includes('Could not extract')) {
        throw error // Keep our custom message
      }
    }

    throw new Error('Failed to read the LinkedIn post. Please ensure the post is public and the URL is correct.')
  }
}

/**
 * Validate if a URL is a LinkedIn post URL
 * 
 * @param url - URL to validate
 * @returns True if valid LinkedIn post URL
 */
export function isValidLinkedInPostUrl(url: string): boolean {
  try {
    const urlObj = new URL(url)
    return (
      urlObj.hostname.includes('linkedin.com') &&
      (urlObj.pathname.includes('/posts/') || 
       urlObj.pathname.includes('/feed/update/'))
    )
  } catch {
    return false
  }
}

