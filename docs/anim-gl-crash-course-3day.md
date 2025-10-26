# ANIM-GL CRASH COURSE: 3-DAY DEPLOYMENT PLAN

## Strategy: Launch Fast, Polish Later

**Core principle**: Get the site live on Vercel with **minimal but working content**, then iterate in Sanity CMS after launch.

---

## DAY 1: Foundation (6-8 hours)

### Morning: Sanity Setup (3 hours)

**9:00 AM - 10:00 AM: Environment Setup**
- [ ] Copy `.env.example` to `.env.local` in `anim-gl/`
- [ ] Get Sanity project ID from https://sanity.io/manage
- [ ] Generate Sanity read token
- [ ] Set `VITE_USE_SANITY=0` (stay in JSON mode for now)
- [ ] Run `bun install`
- [ ] Test: `bun dev` - site loads normally

**10:00 AM - 11:00 AM: Sanity Studio Access**
- [ ] `cd sanity/`
- [ ] `bun install`
- [ ] `bun dev` (opens Studio at localhost:3333)
- [ ] Create first test document (any type) to verify Studio works
- [ ] Explore the schema: globalOptions, page, project, textureGroup

**11:00 AM - 12:00 PM: Content Inventory**
- [ ] Open `content/options.json` - count unique texture keys
- [ ] List all textures needed (write this down)
- [ ] Open `content/pages/2.json` (your in-progress page)
- [ ] Have this ready to paste into Sanity

### Afternoon: Minimal Sanity Content (3-4 hours)

**12:00 PM - 1:00 PM: Texture Groups**
- [ ] For EACH texture in `options.json`, create textureGroup document
- [ ] Name them exactly as they appear in JSON
- [ ] Upload texture images (or use placeholders if not ready)
- **Goal**: Complete all textureGroup documents

**1:00 PM - 2:30 PM: Global Options**
- [ ] Create single `globalOptions` document
- [ ] Paste nav structure from `options.json`
- [ ] Reference all textureGroups you created
- [ ] Set loader options

**2:30 PM - 4:00 PM: Pages (Minimal Set)**
- [ ] Create page document: legacyId = "1" (home page)
- [ ] Paste HTML from `content/pages/1.json`
- [ ] Create page document: legacyId = "2" (your updated page)
- [ ] Paste HTML from `content/pages/2.json`
- [ ] **SKIP pages 240, 308, 55 for now** (launch with 2 pages only)

### Evening: First Sanity Test (2 hours)

**4:00 PM - 6:00 PM: Enable Sanity Mode**
- [ ] In `anim-gl/.env.local`, set `VITE_USE_SANITY=1`
- [ ] Restart `bun dev`
- [ ] Navigate to home page - does it load?
- [ ] Navigate to page 2 - does it load?
- [ ] Check browser console for errors
- [ ] If broken, ask Codex immediately: "Sanity mode failing with error: [paste error]"
- **Goal**: 2 pages loading from Sanity before end of day

---

## DAY 2: Projects + Deployment (8-10 hours)

### Morning: Minimal Project Content (4 hours)

**Strategy**: Launch with 3 projects (not 6), use best media you have NOW

**9:00 AM - 10:30 AM: Pick 3 Projects**
- [ ] Choose your 3 strongest projects with media ready
- [ ] Map to IDs: 44, 82, 90 (use these legacy IDs)
- [ ] Gather media for each:
  - 1 hero image (1720x1290 or 860x645 - see image section below)
  - 2-4 gallery images
  - Project description (2 paragraphs)

**10:30 AM - 12:30 PM: Create Project Documents**
- [ ] In Sanity Studio, create project with legacyId = "44"
- [ ] Upload media for project 1
- [ ] Paste description
- [ ] Repeat for legacyId = "82" and "90"
- [ ] **SKIP projects 102, 112, 393** (add after launch)

### Afternoon: Local Validation (2 hours)

**12:30 PM - 2:30 PM: Full Local Test**
- [ ] With `VITE_USE_SANITY=1`, test every page
- [ ] Navigate to `/project/[your-project-slug]`
- [ ] Verify WebGL textures loading
- [ ] Test on mobile viewport
- [ ] Fix any broken links or 404s
- [ ] Run: `bun run build` - ensure build succeeds
- [ ] Run: `bun run preview` - test production build locally

### Evening: Vercel Deployment (3-4 hours)

**2:30 PM - 4:00 PM: Initial Deploy**
- [ ] Install Vercel CLI: `npm i -g vercel`
- [ ] `cd anim-gl/`
- [ ] `vercel login`
- [ ] `vercel` (follow prompts, create new project)
- [ ] Note your Vercel preview URL (e.g., anim-gl-xxx.vercel.app)

**4:00 PM - 5:00 PM: Environment Variables**
- [ ] In Vercel dashboard → Project Settings → Environment Variables
- [ ] Add `VITE_USE_SANITY=1`
- [ ] Add `VITE_SANITY_PROJECT_ID=[your-id]`
- [ ] Add `VITE_SANITY_DATASET=production`
- [ ] Add `VITE_SANITY_TOKEN=[your-token]`
- [ ] Redeploy: `vercel --prod`

**5:00 PM - 6:30 PM: Test Vercel Deployment**
- [ ] Visit your `.vercel.app` URL
- [ ] Test all pages
- [ ] Test all 3 projects
- [ ] Check WebGL performance
- [ ] Test on real phone (not just dev tools)
- [ ] **If working**: Proceed to DNS
- [ ] **If broken**: Debug with Codex before DNS changes

---

## DAY 3: DNS Migration + Launch (6-8 hours)

### Morning: DNS Preparation (2 hours)

**9:00 AM - 10:00 AM: Backup Current DNS**
- [ ] Screenshot ALL DNS records at GoDaddy (chrisryanhall.com)
- [ ] Screenshot ALL DNS records at DreamHost (chrishall.io)
- [ ] Save screenshots to `dns-backup-[date]/` folder
- [ ] **CRITICAL**: Note all MX records (these are for email)

**10:00 AM - 11:00 AM: Get Vercel DNS Records**
- [ ] In Vercel dashboard → Project Settings → Domains
- [ ] Click "Add Domain"
- [ ] Enter: `chrishall.io`
- [ ] Vercel shows you A record and CNAME record values
- [ ] Write these down (don't apply yet)

### Midday: DNS Changes (3-4 hours including wait time)

**11:00 AM - 11:30 AM: Update chrishall.io DNS (DreamHost)**
- [ ] Log in to DreamHost panel
- [ ] Navigate to Domains → Manage Domains
- [ ] Click DNS for chrishall.io
- [ ] **KEEP**: All MX records (email)
- [ ] **KEEP**: All TXT records (email, verification)
- [ ] **REPLACE**: A record → point to Vercel IP
- [ ] **REPLACE**: CNAME record (www) → point to Vercel
- [ ] Save changes

**11:30 AM - 12:00 PM: Monitor DNS Propagation**
- [ ] Go to https://dnschecker.org
- [ ] Enter: `chrishall.io`
- [ ] Check A record - should show Vercel IP
- [ ] Wait for propagation (15 mins to 2 hours typically)

**12:00 PM - 3:00 PM: WAIT (do other tasks)**

While waiting for DNS:
- [ ] Update About page copy
- [ ] Optimize images if needed
- [ ] Write social media announcement draft
- [ ] Test email: send yourself a test email to verify it still works

### Afternoon: Validate & Add Second Domain (2 hours)

**3:00 PM - 3:30 PM: Test chrishall.io**
- [ ] Visit https://chrishall.io
- [ ] If loading from Vercel: ✅ SUCCESS
- [ ] If still showing old site: Wait longer (check dnschecker.org)
- [ ] Test SSL certificate is valid (should auto-provision)

**3:30 PM - 4:30 PM: Add chrisryanhall.com Domain**
- [ ] In Vercel → Domains, add second domain: `chrisryanhall.com`
- [ ] Get DNS values from Vercel
- [ ] Log in to GoDaddy
- [ ] Navigate to DNS settings for chrisryanhall.com
- [ ] **KEEP**: All MX records (email)
- [ ] **KEEP**: All TXT records
- [ ] **REPLACE**: A record → Vercel IP
- [ ] **REPLACE**: CNAME (www) → Vercel
- [ ] Save changes
- [ ] Wait for propagation (30 mins - 2 hours)

**4:30 PM - 5:00 PM: Set Primary Domain**
- [ ] In Vercel → Domains
- [ ] Set `chrishall.io` as "Primary Domain"
- [ ] Vercel automatically redirects `chrisryanhall.com` → `chrishall.io`

### Evening: Launch Validation (1 hour)

**5:00 PM - 6:00 PM: Final Checks**
- [ ] Visit https://chrishall.io - site loads ✅
- [ ] Visit https://chrisryanhall.com - redirects to .io ✅
- [ ] Test: Send email to your @chrisryanhall.com address ✅
- [ ] Test all pages on mobile
- [ ] Check browser console (no critical errors)
- [ ] Run Lighthouse audit (aim for 85+ performance)

**6:00 PM: LAUNCH** 🚀
- [ ] Update social media profiles to new URL
- [ ] Post launch announcement (if desired)
- [ ] Email key contacts with new portfolio link

---

## COMPROMISES FOR SPEED

To launch in 3 days, you're accepting:

1. **2 pages instead of 5** (home + about only)
   - Add pages 240, 308, 55 after launch via Sanity

2. **3 projects instead of 6**
   - Add projects 102, 112, 393 after launch via Sanity

3. **"Good enough" copy**
   - Polish in Sanity after launch (that's why you have a CMS!)

4. **No SEO optimization yet**
   - Add meta descriptions, Open Graph tags after launch

5. **Basic media optimization**
   - Use what you have, optimize more later

---

## RISK MITIGATION (3-DAY VERSION)

**If DNS breaks email (rare but possible):**
1. Immediately revert DNS changes (you have screenshots)
2. Email usually recovers within 1 hour of DNS revert
3. This is why you test email immediately after DNS changes

**If Vercel deployment fails:**
1. Don't change DNS
2. Debug on `.vercel.app` preview URL
3. Only proceed to DNS after Vercel URL works perfectly

**If Sanity content doesn't load:**
1. Toggle back to JSON mode locally: `VITE_USE_SANITY=0`
2. Verify local JSON mode still works
3. Debug Sanity connection with Codex
4. Don't deploy to Vercel until Sanity mode works locally

---

## POST-LAUNCH WEEK 1

After launch, spend Week 1 polishing via Sanity CMS:

**Days 4-7: Content Polish**
- [ ] Add remaining 3 projects (102, 112, 393)
- [ ] Add remaining 3 pages (240, 308, 55)
- [ ] Optimize all images (WebP conversion, compression)
- [ ] Write better copy for project descriptions
- [ ] Add meta descriptions for SEO
- [ ] Add Open Graph images

**Days 8-10: Cleanup**
- [ ] Cancel InMotion Hosting (after confirming everything works)
- [ ] Update Google Search Console
- [ ] Submit sitemap
- [ ] Monitor analytics

---

## DAILY TIME COMMITMENT

- **Day 1**: 6-8 hours (setup + minimal Sanity content)
- **Day 2**: 8-10 hours (projects + Vercel deployment)
- **Day 3**: 6-8 hours (DNS migration + validation)

**Total**: 20-26 hours over 3 days

This is **aggressive but doable** if you can dedicate full days to it.

---

## WHEN TO ASK FOR HELP

**Ask Codex immediately if:**
- Sanity mode fails to load pages locally
- Vercel build fails
- WebGL textures don't load on Vercel
- DNS changes break email
- Any step takes 2x longer than estimated

**Ask me if:**
- You need to adjust the timeline
- You're unclear on technical steps
- You want to prioritize differently

---

## SUCCESS CRITERIA

**End of Day 3, you should have:**
✅ Live site at https://chrishall.io  
✅ chrisryanhall.com redirects to chrishall.io  
✅ Email still works  
✅ 2 pages functional (home + about)  
✅ 3 projects showcased  
✅ WebGL effects working  
✅ Mobile responsive  
✅ SSL certificate active  

**NOT required for Day 3 launch:**
❌ All 6 projects  
❌ All 5 pages  
❌ Perfect SEO  
❌ Fully optimized images  
❌ Analytics setup  

You can add all of these **after launch** via Sanity Studio.