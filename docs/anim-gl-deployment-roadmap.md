# anim-gl Deployment Roadmap

Single source of truth for the replatform effort. Everything below is ordered; work top‑to‑bottom and tick items off as you go.

---

## Phase 0 · Foundation (✅ complete)

Infrastructure already merged into the repo:

- [x] Environment toggle (`.env.example`, `src/utils/env.js`).
- [x] Central Sanity client wrapper (`src/utils/sanityClient.js`).
- [x] GROQ helpers mirroring legacy JSON (`src/utils/sanityApi.js`).
- [x] Runtime loaders respect the `VITE_USE_SANITY` flag (`src/start/firstload.js`, `src/js/loads.js`, `src/main/index.js`).
- [x] `legacyId` fields added to page/project schemas (`sanity/schemaTypes/page.js`, `sanity/schemaTypes/project.js`).
- [x] Studio deployment `appId` captured (`sanity/sanity.cli.js`).

No further action needed unless we change the data shape.

---

## Phase 1 · Sanity Integration (🚧 in progress)

### 1. Prepare local environment
- [ ] Copy `.env.example` → `.env.local`.
- [ ] Fill in:
  ```
  VITE_USE_SANITY=0          # stay in JSON mode until content is migrated
  VITE_SANITY_PROJECT_ID=…
  VITE_SANITY_DATASET=production
  VITE_SANITY_API_VERSION=2025-01-01
  VITE_SANITY_TOKEN=…        # read token (optional unless you need private drafts)
  ```
- [ ] `bun install` in project root.
- [ ] `bun dev` — confirm the JSON path still works.

### 2. Sanity Studio readiness
- [ ] `cd sanity && bun install`.
- [ ] `bun dev` (Studio at http://localhost:3333).
- [ ] Create any throwaway doc to confirm write access, then delete it.

### 3. Inventory legacy textures & content
- [ ] Review `content/options.json` and log every texture key.  
  _Hint_: use `docs/texture-keys-reference.md` to track mappings.
- [ ] Map launch projects to legacy IDs (recommended IDs: 393, 44, 82, 90 for Options Institute, Naked Juice, Collective, Vuity).
- [ ] Gather hero/gallery media and copy for each launch project.

### 4. Seed shared content in Sanity
- [ ] Create one `textureGroup` document per texture key (names must match exactly).
- [ ] Create a single `globalOptions` document:
  - nav HTML
  - loader HTML
  - reference all texture groups.

### 5. Migrate pages (all legacy IDs retained)
- [ ] **Home** — legacyId `2`, paste HTML from `content/pages/2.json`, reference required textures.
- [ ] **Work / Index** — legacyId `55`, HTML from `content/pages/55.json`.
- [ ] **About** — legacyId `240`, HTML from `content/pages/240.json`.
- [ ] **Error** — legacyId `1`, HTML from `content/pages/1.json`.
- [ ] **Playground** — legacyId `308` (_optional, post-launch_).

### 6. Migrate projects
For each launch project:
- [ ] Create `project` document with matching legacyId.
- [ ] Fill `title`, `slug`, `projectIndex`, optional metadata.
- [ ] Paste HTML from `content/project/<id>.json` and replace with your copy.
- [ ] Upload / link media (match template dimensions).
- [ ] Reference required texture groups.

### 7. Validate Sanity mode locally
- [ ] Flip `VITE_USE_SANITY=1` in `.env.local`.
- [ ] `bun dev` and walk through `/`, `/index/`, `/about/`, `/project/<slug>`.
- [ ] Check console for missing textures or 404s.

---

## Phase 2 · Content Refinement (🕒 pending)

- [ ] Rewrite project copy (problem → approach → outcome).
- [ ] Optimise images (≤400 KB JPG/WebP) and videos (≤5 MB MP4 with poster).
- [ ] Polish About page biography and contact details.
- [ ] Configure any additional texture groups needed for new work.
- [ ] Add remaining projects (IDs 102, 112, 393, etc.) once assets are ready.

---

## Phase 3 · Deployment & Domains (🕒 pending)

### 1. Production build & Vercel
- [ ] `bun run build` → ensure success.
- [ ] `bun run preview` → smoke test.
- [ ] `vercel` (preview) → confirm environment variables set in dashboard:
  `VITE_USE_SANITY=1`, `VITE_SANITY_PROJECT_ID`, `VITE_SANITY_DATASET`, `VITE_SANITY_TOKEN`.
- [ ] `vercel --prod` → validate production URL.

### 2. Domain migration
- [ ] Snapshot current DNS (DreamHost + GoDaddy).
- [ ] Add `chrishall.io` in Vercel; update A/CNAME at DreamHost.
- [ ] After propagation, test SSL and end-to-end flows.
- [ ] Repeat for `chrisryanhall.com`, configure 301 redirect to `.io`.
- [ ] Keep Google Workspace MX records untouched.

### 3. Post-launch
- [ ] Update social profiles and portfolio listings with new URL.
- [ ] Submit `.io` sitemap to Google Search Console.
- [ ] Plan content cadence in Sanity (Playground, extra projects, blog, etc.).

---

## Reference

- Legacy IDs & texture mapping: `docs/texture-keys-reference.md`.
- Sanity schemas: `sanity/schemaTypes/*`.
- Runtime loaders: `src/start/firstload.js`, `src/js/loads.js`.

Update this file as you complete steps—checked boxes are your progress log.
