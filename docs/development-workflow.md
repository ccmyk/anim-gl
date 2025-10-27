# Running anim-gl in Development

## Two Servers to Run

You need TWO terminal windows/tabs:

### Terminal 1: Main Site (Vite Dev Server)
```bash
cd /Users/chrishall/development/anim-gl
bun dev
```
- Runs on: **http://localhost:5173**
- This is your main portfolio site
- Hot-reloads when you change code
- Fetches content from Sanity when `VITE_USE_SANITY=1`

### Terminal 2: Sanity Studio (Content Management)
```bash
cd /Users/chrishall/development/anim-gl/sanity
bun dev
```
- Runs on: **http://localhost:3333**
- This is where you edit content
- Add/edit pages, projects, texture groups
- Changes are immediate (no deploy needed)

---

## Workflow: Real-Time Content Updates

### Step 1: Start Both Servers
```bash
# Terminal 1
cd /Users/chrishall/development/anim-gl
bun dev

# Terminal 2 (new tab/window)
cd /Users/chrishall/development/anim-gl/sanity
bun dev
```

### Step 2: Create Content in Sanity Studio

1. Open **http://localhost:3333** in your browser
2. Click "+ Create" → Select document type
3. Fill in fields
4. Click "Publish"

### Step 3: View Changes on Main Site

#### When VITE_USE_SANITY=0 (JSON Mode)
- Changes in Sanity **won't appear** on localhost:5173
- Site loads from `/content/*.json` files
- This is for testing the old system

#### When VITE_USE_SANITY=1 (Sanity Mode)
- **Refresh the page** at localhost:5173
- Content updates are NOT instant (no hot reload for content)
- You must manually refresh browser to see Sanity changes
- Code changes hot-reload automatically

### Step 4: Testing the Complete Flow

1. **Create a textureGroup** in Sanity Studio (localhost:3333)
   - Add key: `home0`
   - Upload a test image
   - Publish

2. **Create globalOptions** (if not exists)
   - Paste nav HTML
   - Paste loader HTML
   - Reference `home0` texture group
   - Publish

3. **Create homepage** page document
   - legacyId: 2
   - template: home
   - Paste HTML from `/docs/sanity-templates/page-home.html`
   - Reference texture groups
   - Publish

4. **View in browser**
   - Go to http://localhost:5173
   - Press F5 to refresh
   - Your texture should load!

---

## Real-Time vs Manual Refresh

### What Hot-Reloads Automatically:
- ✅ Code changes in `/src/`
- ✅ CSS changes
- ✅ JavaScript changes
- ✅ Component updates

### What Requires Manual Refresh:
- ❌ Content changes in Sanity Studio
- ❌ New documents published
- ❌ Texture group updates
- ❌ globalOptions changes

**Why?** Vite watches your code files, not your Sanity database.

---

## Debugging Tips

### If content doesn't appear:

1. **Check environment variable**
   ```bash
   # In /Users/chrishall/development/anim-gl/.env.local
   VITE_USE_SANITY=1  # Must be 1, not 0
   ```

2. **Restart Vite dev server** after changing .env.local
   ```bash
   # Stop with Ctrl+C, then:
   bun dev
   ```

3. **Check browser console** (F12)
   - Look for 404 errors
   - Look for "Sanity client" errors
   - Check network tab for API calls

4. **Verify Sanity credentials**
   ```bash
   # In .env.local, these must match sanity/sanity.cli.js
   VITE_SANITY_PROJECT_ID=mz6c1yf7
   VITE_SANITY_DATASET=production
   ```

5. **Hard refresh browser**
   - Windows: Ctrl + Shift + R
   - Mac: Cmd + Shift + R

### If Sanity Studio won't start:

```bash
cd /Users/chrishall/development/anim-gl/sanity
rm -rf node_modules
bun install
bun dev
```

---

## Development Commands Reference

```bash
# PROJECT ROOT (/Users/chrishall/development/anim-gl)
bun install          # Install dependencies
bun dev              # Start dev server (localhost:5173)
bun build            # Create production build
bun preview          # Preview production build

# SANITY DIRECTORY (/Users/chrishall/development/anim-gl/sanity)
cd sanity
bun install          # Install Sanity dependencies
bun dev              # Start Sanity Studio (localhost:3333)
bun deploy           # Deploy Studio to Sanity cloud
```

---

## Typical Development Session

```bash
# Morning startup:
cd /Users/chrishall/development/anim-gl

# Terminal 1:
bun dev

# Terminal 2:
cd sanity && bun dev

# Open browsers:
# - http://localhost:5173  (your site)
# - http://localhost:3333  (Sanity Studio)

# Edit content in Sanity → Publish → Refresh localhost:5173
# Edit code in VS Code → Auto hot-reload at localhost:5173
```

---

## Viewing Different Content States

### Test with JSON (old system):
```bash
# .env.local
VITE_USE_SANITY=0

# Restart: Ctrl+C then bun dev
# View at localhost:5173
```

### Test with Sanity (new system):
```bash
# .env.local
VITE_USE_SANITY=1

# Restart: Ctrl+C then bun dev
# View at localhost:5173
```

### Compare side-by-side:
You can run two instances on different ports:
```bash
# Terminal 1 - JSON mode
PORT=5173 VITE_USE_SANITY=0 bun dev

# Terminal 2 - Sanity mode
PORT=5174 VITE_USE_SANITY=1 bun dev

# Compare:
# http://localhost:5173 (JSON)
# http://localhost:5174 (Sanity)
```

---

## Quick Checklist

Before testing Sanity integration:

- [ ] Created `.env.local` from `.env.example`
- [ ] Set `VITE_USE_SANITY=1` in `.env.local`
- [ ] Ran `bun install` in root directory
- [ ] Ran `bun install` in sanity directory
- [ ] Started `bun dev` in root (Terminal 1)
- [ ] Started `bun dev` in sanity (Terminal 2)
- [ ] Created at least one textureGroup in Sanity
- [ ] Created globalOptions document in Sanity
- [ ] Created at least one page document in Sanity
- [ ] Browser console shows no errors
- [ ] Hard refreshed browser after publishing in Sanity

---

## Troubleshooting Common Issues

### "Cannot find module @sanity/client"
```bash
cd sanity
bun install
```

### "Invalid project ID"
Check that `.env.local` and `sanity/sanity.cli.js` have matching IDs

### Content doesn't update
1. Publish in Sanity Studio (not just save draft)
2. Hard refresh browser (Cmd+Shift+R or Ctrl+Shift+R)
3. Check browser console for errors

### Port already in use
```bash
# Kill process on port 5173
lsof -ti:5173 | xargs kill -9

# Or use different port
PORT=5174 bun dev
```
