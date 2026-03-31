# Fix Vercel API Contact Form Errors

## Status: ✅ Step 1 - TODO.md created  
✅ Step 2 - vercel.json updated with functions config

## Current: `vercel dev` running (login needed)

### Next: Step 3 - After login:
1. Test http://localhost:3000/api/test → should return JSON
2. Test POST /api/contact (needs env vars)

```
curl -X POST http://localhost:3000/api/contact \\
  -H \"Content-Type: application/json\" \\
  -d '{\"name\":\"Test\",\"email\":\"test@example.com\",\"message\":\"Test msg\"}'
```

### Step 4: Set Local .env (for vercel dev):
```
SUPABASE_URL=your_url
SUPABASE_ANON_KEY=your_key  
RESEND_API_KEY=your_key
EMAIL_TO=h.garroum@gmail.com
```

### Step 5: Production Deploy
```
vercel --prod
```
(Set env vars in Vercel dashboard first)

### Root Cause Analysis ✅
- 404 → Vercel not recognizing api/contact.js route
- Fixed: Explicit functions in vercel.json
- JSON parse fail → 404 HTML page instead of JSON

## Backend Answer: **NO** - Vercel uses api/ serverless functions only

**Next Action:** Complete vercel login, test APIs locally, confirm fixes work.

