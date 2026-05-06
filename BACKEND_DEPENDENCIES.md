# Backend Dependencies Reference

## 📦 Optional Dependencies for Your Chosen Backend Service

Add these to your `package.json` based on which backend service you select.

---

## 🚀 Quick Install Commands

### For SendGrid Email
```bash
npm install @sendgrid/mail dotenv
```

Add to `.env.local`:
```
SENDGRID_API_KEY=your_api_key_here
SENDGRID_FROM_EMAIL=noreply@yourportfolio.com
```

---

### For Mailgun Email
```bash
npm install mailgun.js form-data dotenv
```

Add to `.env.local`:
```
MAILGUN_API_KEY=your_api_key_here
MAILGUN_DOMAIN=your_domain.mailgun.org
MAILGUN_TO_EMAIL=your_email@example.com
```

---

### For PostgreSQL Database
```bash
npm install @prisma/client prisma dotenv
npx prisma init
```

Add to `.env.local`:
```
DATABASE_URL=postgresql://user:password@localhost:5432/portfolio_db
```

**Create Prisma Schema** (`prisma/schema.prisma`):
```prisma
// prisma/schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model ContactMessage {
  id        Int     @id @default(autoincrement())
  name      String
  email     String
  message   String
  viewed    Boolean @default(false)
  createdAt DateTime @default(now())
}
```

Then run:
```bash
npx prisma migrate dev --name init
```

---

### For MongoDB
```bash
npm install mongoose dotenv
```

Add to `.env.local`:
```
DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/portfolio
```

---

### For Firebase
```bash
npm install firebase-admin dotenv
```

Setup Firebase project:
1. Go to https://console.firebase.google.com/
2. Create new project
3. Download service account key
4. Add credentials to `.env.local`

---

### For Supabase (PostgreSQL + Auth)
```bash
npm install @supabase/supabase-js dotenv
```

Add to `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

---

## 📋 Complete Optional Dependencies List

```json
{
  "dependencies": {
    "next": "16.2.1",
    "react": "19.2.4",
    "react-dom": "19.2.4",
    "next-themes": "^0.4.6",
    
    "/.....OPTIONAL - EMAIL SERVICES...../"
    "@sendgrid/mail": "^7.7.0",
    "mailgun.js": "^9.0.0",
    "form-data": "^4.0.0",
    
    "/.....OPTIONAL - DATABASES...../"
    "@prisma/client": "^5.0.0",
    "mongoose": "^7.0.0",
    "firebase-admin": "^12.0.0",
    "@supabase/supabase-js": "^2.0.0",
    "@vercel/postgres": "^0.3.0",
    
    "/.....OPTIONAL - DATABASE ORMS...../"
    "typeorm": "^0.3.0",
    "sequelize": "^6.0.0",
    
    "/.....OPTIONAL - RATE LIMITING...../"
    "@upstash/ratelimit": "^0.4.0",
    
    "/.....OPTIONAL - VALIDATION...../"
    "zod": "^3.0.0",
    "joi": "^17.0.0"
  },
  "devDependencies": {
    "/.....OPTIONAL - DATABASE TOOLS...../"
    "prisma": "^5.0.0",
    
    "/.....OPTIONAL - TYPE CHECKING...../"
    "@types/node": "^20",
    "@types/mongoose": "^5.0.0"
  }
}
```

---

## 🎯 Recommended Combinations

### Beginner: Email-based Solution
```bash
npm install @sendgrid/mail dotenv
```
- Simplest setup
- Messages sent to your email
- Free tier available
- No database needed

---

### Intermediate: Database Storage
```bash
npm install @prisma/client prisma postgresql dotenv
npx prisma init
```
- Store messages in database
- Query and manage submissions
- Can add admin dashboard later
- Scalable solution

---

### Advanced: Full Stack with Auth
```bash
npm install @supabase/supabase-js dotenv
```
- PostgreSQL + Authentication
- Real-time updates
- Built-in storage for images
- Admin dashboard included

---

## 🔧 Implementation Template

After installing your chosen service, update `src/app/api/contact/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail'; // or your service

const sendEmail = async (name: string, email: string, message: string) => {
  // TODO: Implement your chosen service here
  // See BACKEND_EXAMPLES.md for full implementation
  
  sgMail.setApiKey(process.env.SENDGRID_API_KEY!);
  
  await sgMail.send({
    to: process.env.SENDGRID_FROM_EMAIL!,
    from: process.env.SENDGRID_FROM_EMAIL!,
    replyTo: email,
    subject: `New Portfolio Message from ${name}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, '<br>')}</p>
    `,
  });
};

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    await sendEmail(name, email, message);

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully!',
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
}
```

---

## 📚 Service Documentation Links

- **SendGrid:** https://sendgrid.com/docs/for-developers/sending-email/quickstart-nodejs/
- **Mailgun:** https://documentation.mailgun.com/
- **Prisma:** https://www.prisma.io/docs/getting-started
- **MongoDB:** https://docs.mongodb.com/drivers/node/
- **Firebase:** https://firebase.google.com/docs
- **Supabase:** https://supabase.com/docs

---

## ✅ Testing Your Backend

```bash
# Test the contact form API locally
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Name",
    "email": "test@example.com",
    "message": "Test message"
  }'

# Expected success response:
# {"success": true, "message": "Message sent successfully!"}
```

---

## 🚀 Deployment Reminders

1. **Add environment variables to your hosting platform:**
   - Vercel: Settings → Environment Variables
   - Netlify: Site settings → Build & deploy → Environment
   - Heroku: Settings → Config Vars

2. **Never commit `.env.local` to git** (already in .gitignore)

3. **Use different keys for development vs production**

4. **Test form submission after deployment**

---

**Choose your backend service and follow BACKEND_EXAMPLES.md for full implementation!**
