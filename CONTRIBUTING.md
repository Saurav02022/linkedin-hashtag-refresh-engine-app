# Contributing to LinkedIn Hashtag Engine

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing to the project.

## Code of Conduct

This project adheres to a code of conduct. By participating, you are expected to uphold this code. Please be respectful and constructive in all interactions.

## How to Contribute

### Reporting Bugs

Before creating bug reports, please check existing issues. When creating a bug report, include:

- **Clear title and description**
- **Steps to reproduce** the issue
- **Expected vs actual behavior**
- **Screenshots** (if applicable)
- **Environment details** (OS, browser, Node version)

### Suggesting Features

Feature requests are welcome! Please:

- Check if the feature has already been requested
- Clearly describe the feature and its use case
- Explain why this feature would be useful to most users

### Pull Requests

1. **Fork the repository** and create your branch from `main`
2. **Make your changes** following our coding standards
3. **Test thoroughly** - ensure the app builds and runs correctly
4. **Update documentation** if needed
5. **Write clear commit messages** using conventional commits

## Development Setup

### Prerequisites

- Node.js 18.18 or later
- npm, yarn, or pnpm
- Git

### Setup Steps

```bash
# Fork and clone your fork
git clone https://github.com/YOUR_USERNAME/linkedin-hashtag-refresh-engine.git
cd linkedin-hashtag-refresh-engine

# Add upstream remote
git remote add upstream https://github.com/saurav02022/linkedin-hashtag-refresh-engine.git

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Start development server
npm run dev
```

### Environment Configuration

You'll need:
- **LinkedIn OAuth credentials** from [LinkedIn Developers](https://www.linkedin.com/developers/)
- **Google Gemini API key** from [Google AI Studio](https://makersuite.google.com/app/apikey)
- **NextAuth secret** (generate with `openssl rand -base64 32`)

Add these to `.env.local`.

## Coding Standards

### TypeScript

- Use TypeScript for all new files
- Define proper types (avoid `any`)
- Use interfaces for object shapes
- Export types from `types/` directory

### React Components

- Use functional components with hooks
- One component per file
- Use `'use client'` directive only when needed
- Prefer server components by default

```typescript
// Good
'use client'

import { useState } from 'react'

export function MyComponent() {
  const [state, setState] = useState(false)
  // ...
}
```

### File Structure

```
component-name/
├── ComponentName.tsx    # Main component
├── index.tsx           # Re-export
└── helpers.ts          # Component-specific utilities
```

### Styling

- Use Tailwind CSS utility classes
- Follow existing spacing patterns
- Use design tokens from `lib/design-tokens.ts`
- Ensure responsive design (mobile-first)

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): subject

body (optional)

footer (optional)
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```
feat(posts): add batch hashtag deletion
fix(auth): resolve LinkedIn OAuth redirect issue
docs(readme): update installation instructions
```

## Testing Your Changes

Before submitting a PR:

```bash
# Build the project
npm run build

# Check for TypeScript errors
npm run build

# Test in browser
npm run dev
# Visit http://localhost:3000 and test your changes
```

### Testing Checklist

- [ ] Code builds without errors
- [ ] No TypeScript errors
- [ ] UI looks correct on desktop and mobile
- [ ] No console errors or warnings
- [ ] All links and buttons work
- [ ] Forms validate properly
- [ ] API routes return expected responses

## Pull Request Process

1. **Update your fork**
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes** and commit
   ```bash
   git add .
   git commit -m "feat: add amazing feature"
   ```

4. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Open a Pull Request**
   - Go to the original repository
   - Click "New Pull Request"
   - Select your fork and branch
   - Fill in the PR template

### PR Requirements

- Clear description of changes
- Reference related issues
- Screenshots (for UI changes)
- Passing build
- No merge conflicts
- Maintain code style consistency

## Questions?

- Open a [Discussion](https://github.com/saurav02022/linkedin-hashtag-refresh-engine/discussions)
- Create an [Issue](https://github.com/saurav02022/linkedin-hashtag-refresh-engine/issues)
- Email: saurav02022@gmail.com

Thank you for contributing! 🎉

