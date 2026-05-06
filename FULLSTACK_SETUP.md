# Full Stack Portfolio - Setup Guide

## 🎯 Project Overview

Your portfolio is now integrated with a full stack architecture including:
- ✅ API routes for form submissions
- ✅ GitHub profile integration
- ✅ Social media links section
- ✅ Backend-ready contact form
- ✅ Environment configuration system

---

## 📋 TODO Checklist - Where to Add Your Information

### 1. **Social Media Links** 💼📸

**File:** `src/components/SocialLinks.tsx`

Replace these placeholders with your actual profile URLs:

```typescript
// TODO Items in SocialLinks.tsx:
{
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/YOUR_LINKEDIN_USERNAME',  // ← REPLACE THIS
    icon: '💼',
    label: 'LinkedIn Profile',
},
{
    name: 'GitHub',
    url: 'https://github.com/YOUR_GITHUB_USERNAME',  // ← REPLACE THIS
    icon: '🐙',
    label: 'GitHub Profile',
},
{
    name: 'Instagram',
    url: 'https://instagram.com/YOUR_INSTAGRAM_USERNAME',  // ← REPLACE THIS
    icon: '📸',
    label: 'Instagram Profile',
},
{
    name: 'Email',
    url: 'mailto:your-email@example.com',  // ← REPLACE THIS
    icon: '✉️',
    label: 'Send Email',
},
```

**Where it appears on your portfolio:**
- Below your name and headline in the hero section
- Users can click directly to your social profiles

---

### 2. **GitHub Projects Integration** 🐙

**File:** `.env.local` (create from `.env.local.example`)

```bash
# Your GitHub username
GITHUB_USERNAME=Caleb-Oyewole  # ← REPLACE WITH YOUR USERNAME

# Optional: Personal Access Token for private repos
GITHUB_TOKEN=your_personal_access_token  # ← ADD IF NEEDED

# For client-side redirects
NEXT_PUBLIC_GITHUB_USERNAME=Caleb-Oyewole  # ← REPLACE WITH YOUR USERNAME
```

**How it works:**
- Automatically fetches your top 6 GitHub repositories (by stars)
- Displays them in a grid on your portfolio
- Updates whenever you push to GitHub
- Click "View All on GitHub →" button to see all your repositories

**Setup Steps:**
1. Copy `.env.local.example` to `.env.local`
2. Replace `Caleb-Oyewole` with your GitHub username
3. (Optional) Generate GitHub token at: https://github.com/settings/tokens
   - Select `public_repo` scope
   - Add to `.env.local` as `GITHUB_TOKEN`

**Display location:** Portfolio page, below "Selected Works" section

---

### 3. **Contact Form Backend** ✉️

**File:** `src/app/api/contact/route.ts`

This API route handles form submissions. You have several options:

#### Option A: SendGrid Email Service (Recommended)
```bash
# 1. Sign up at https://sendgrid.com/
# 2. Create API key
# 3. Add to .env.local:

SENDGRID_API_KEY=your_sendgrid_api_key
SENDGRID_FROM_EMAIL=noreply@yourportfolio.com
```

#### Option B: Mailgun
```bash
# 1. Sign up at https://www.mailgun.com/
# 2. Add to .env.local:

MAILGUN_API_KEY=your_mailgun_api_key
MAILGUN_DOMAIN=your_domain.mailgun.org
```

#### Option C: Database Storage
```bash
# Store messages in a database instead of emailing

DATABASE_URL=postgresql://user:password@localhost:5432/portfolio_db
# or
DATABASE_URL=mongodb+srv://user:password@cluster.mongodb.net/portfolio
```

---

### 4. **Database Setup** 🗄️

For storing contact form submissions and other data:

#### PostgreSQL Example:
```sql
-- Create table for contact form submissions
CREATE TABLE contact_messages (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  viewed BOOLEAN DEFAULT FALSE
);

-- Create index for faster queries
CREATE INDEX idx_contact_messages_created_at ON contact_messages(created_at DESC);
```

#### MongoDB Example:
```javascript
// Collection: contact_messages
// Schema:
{
  _id: ObjectId,
  name: String,
  email: String,
  message: String,
  createdAt: Date,
  viewed: Boolean
}
```

#### Recommended Database Services:
- **PostgreSQL:** Railway, Render, Neon, Vercel Postgres
- **MongoDB:** MongoDB Atlas, Railway
- **Supabase:** PostgreSQL + Auth + Real-time

---

## 🔗 Project Links from GitHub

**File:** `src/components/GitHubProjects.tsx`

Projects are automatically fetched from your GitHub profile. To customize which projects appear:

### Option 1: Star Your Projects
- Projects are sorted by stars (most popular first)
- The component displays top 6 projects

### Option 2: Use Specific Repositories
Modify the API endpoint in `src/app/api/github-projects/route.ts`:

```typescript
// Current: Gets ALL repositories
const response = await fetch(
  `https://api.github.com/users/${githubUsername}/repos?sort=stars&per_page=12`,
  // ...
);

// Alternative: Only get starred repos
// `https://api.github.com/users/${githubUsername}/starred?sort=created&per_page=12`

// Alternative: Only specific topics
// Add: &topic=portfolio OR filter in code
```

### Option 3: Hardcoded Project List
Use your existing `src/data/projects.ts` to manually list projects:

```typescript
export const projects: Project[] = [
  {
    id: 1,
    title: "E-Commerce Dashboard",
    description: "Real-time sales tracker built with Next.js",
    tags: ["React", "Next.js", "Tailwind"],
    link: "https://github.com/yourusername/project1",
    image: "/projects/dashboard.png"
  },
  // ... more projects
];
```

---

## 📁 Project Structure

```
my-portfolio/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── contact/route.ts          ← Form submission API
│   │   │   └── github-projects/route.ts  ← GitHub API integration
│   │   ├── page.tsx                      ← Main page (integrated)
│   │   └── layout.tsx
│   ├── components/
│   │   ├── SocialLinks.tsx               ← Social media buttons
│   │   ├── GitHubProjects.tsx            ← Auto-fetch GitHub repos
│   │   ├── ProjectCard.tsx               ← Individual project display
│   │   └── ThemeProvider.tsx
│   └── data/
│       └── projects.ts                   ← Manual project list (optional)
├── .env.local.example                    ← Copy to .env.local
├── .env.local                            ← Your secrets (git ignored)
└── ...
```

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
cd my-portfolio
npm install
```

### 2. Create Environment File
```bash
cp .env.local.example .env.local
```

### 3. Configure Your Information

Edit `.env.local`:
```
GITHUB_USERNAME=YOUR_USERNAME
NEXT_PUBLIC_GITHUB_USERNAME=YOUR_USERNAME
NEXT_PUBLIC_LINKEDIN_URL=https://linkedin.com/in/YOUR_USERNAME
NEXT_PUBLIC_GITHUB_URL=https://github.com/YOUR_USERNAME
NEXT_PUBLIC_INSTAGRAM_URL=https://instagram.com/YOUR_USERNAME
NEXT_PUBLIC_EMAIL=your-email@example.com
```

Edit `src/components/SocialLinks.tsx`:
- Update all social media URLs to match your profiles

### 4. Setup Backend Service (Choose One)

#### For Email Notifications:
```bash
# SendGrid
SENDGRID_API_KEY=...
SENDGRID_FROM_EMAIL=...
```

#### For Database Storage:
```bash
# PostgreSQL
DATABASE_URL=postgresql://...

# Or MongoDB
DATABASE_URL=mongodb+srv://...
```

### 5. Run Development Server
```bash
npm run dev
```

Visit `http://localhost:3000`

---

## 🔑 Environment Variables Summary

| Variable | Location | Required | Purpose |
|----------|----------|----------|---------|
| `GITHUB_USERNAME` | .env.local | Yes | Fetch your repositories |
| `NEXT_PUBLIC_GITHUB_USERNAME` | .env.local | Yes | View all repos button |
| `GITHUB_TOKEN` | .env.local | No | For private repos |
| `SENDGRID_API_KEY` | .env.local | No | Email notifications |
| `DATABASE_URL` | .env.local | No | Store messages in database |
| `NEXT_PUBLIC_LINKEDIN_URL` | .env.local | No | LinkedIn button link |
| `NEXT_PUBLIC_INSTAGRAM_URL` | .env.local | No | Instagram button link |

---

## 🎨 Customization Guide

### Add More Social Links
Edit `src/components/SocialLinks.tsx`:
```typescript
export const socialLinks: SocialLink[] = [
  // ... existing links
  {
    name: 'Twitter',
    url: 'https://twitter.com/YOUR_USERNAME',
    icon: '𝕏',
    label: 'Twitter Profile',
  },
  // Add more as needed
];
```

### Change Number of GitHub Projects Displayed
Edit `src/app/api/github-projects/route.ts`:
```typescript
// Change from 6 to any number
.slice(0, 6)  // ← Change this number
```

### Add Email Notification Implementation
Edit `src/app/api/contact/route.ts`:
```typescript
// Uncomment SendGrid section and implement
// const emailResult = await sendEmail({ ... });
```

### Add Projects to GitHub Section
1. Upload new repositories to GitHub
2. Add descriptive README files
3. GitHub projects sync automatically based on stars

---

## 📚 Resources

- **GitHub API Docs:** https://docs.github.com/en/rest
- **SendGrid Docs:** https://sendgrid.com/docs/
- **Next.js API Routes:** https://nextjs.org/docs/app/building-your-application/routing/route-handlers
- **Tailwind CSS:** https://tailwindcss.com/docs
- **Next.js Deployment:** https://nextjs.org/docs/app/building-your-application/deploying

---

## ✅ Deployment Checklist

- [ ] Fill in all social media links
- [ ] Configure GitHub integration with your username
- [ ] Setup email service (SendGrid/Mailgun)
- [ ] Test contact form submission
- [ ] Deploy to Vercel/Netlify/your hosting
- [ ] Set environment variables in production
- [ ] Test social links
- [ ] Verify GitHub projects display

---

## 🆘 Troubleshooting

### GitHub projects not showing?
- Check `GITHUB_USERNAME` in `.env.local`
- Verify GitHub profile is public
- Check browser console for API errors

### Social links not working?
- Ensure URLs are fully qualified (start with https://)
- Check the correct usernames

### Contact form not submitting?
- Check API route in `src/app/api/contact/route.ts`
- Verify environment variables for email service
- Check browser network tab for errors

---

**Happy coding! 🎉**
