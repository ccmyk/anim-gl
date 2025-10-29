# TEXTURE KEYS REFERENCE
Based on actual data from anim-gl/content/options.json and project files

## 📊 ACTUAL TEXTURE STRUCTURE

### Preview Dimensions (for prjs0-prjs7, home0-home2)
- **Images**: 860×645 (4:3 ratio)
- **Videos**: 720×540 (4:3 ratio)

### Full Project Gallery Dimensions (inside project pages)
- **Videos**: 1600×1200 or 1600×1080
- These are NOT the same as preview dimensions

### Portrait Images (home3, about0)
- **Size**: 860×1290 (2:3 portrait ratio)

### Special Case
- **home1**: 860×1151 (taller than standard 4:3)

---

## 🗂️ TEXTURE KEY MAPPING

### Work Index Previews (prjs0-prjs7)
Each texture key contains an **ARRAY of 4-5 media items**:

| Key | Project | Items | Mix |
|-----|---------|-------|-----|
| prjs0 | 001 Gemini | |
| prjs1 | 002 Banjo | 5 items | 3 videos + 2 images |
| prjs2 | 003 Now New Next | 5 items | 2 videos + 3 images |
| prjs3 | 004 Ciclope | 5 items | 3 videos + 2 images |
| prjs4 | 005 Classe | 5 items | 1 video + 4 images |
| prjs5 | 006 Kids | 5 items | 2 videos + 3 images |
| prjs6 | 007 Paya | 5 images | Images only |
| prjs7 | 008 Villalón | 5 items | 1 video + 4 images |

### Homepage Features (home0-home2)
These are **SINGLE items**, not arrays:

| Key | Type | Dimensions | Used For |
|-----|------|------------|----------|
| home0 | Video | 720×540 | Banjo on homepage |
| home1 | Image | 860×1151 | Ciclope on homepage (special tall ratio) |
| home2 | Video | 720×540 | Kids on homepage |

### Portrait Images
| Key | Dimensions | Purpose |
|-----|------------|---------|
| home3 | 860×1290 | Homepage about section |
| about0 | 860×1290 | About page hero |

---

## 📁 CONTENT STRUCTURE MAPPING

### Pages (`anim-gl/content/pages/`)
| File     | Route        | HTML Location         | Purpose |
|----------|--------------|-----------------------|---------|
| 2.json   | /            | index.html            | Homepage |
| 55.json  | /index/      | index/index.html      | Index |
| 240.json | /about/      | about/index.html      | About |
| 308.json | /playground/ | playground/index.html | Playground |
| 1.json   | /error/      | error/index.html      | Error |

### Projects (`anim-gl/content/project/`)
| Number | File | Texture Keys | Slug |
|--------|-------|--------------|------|
| 001 | 393.json | home0, prjs0 | options-institute |
| 002 | 44.json  | home1, prjs1 | naked-juice |
| 003 | 82.json  | home2, prjs2 | collective |
| 004 | 90.json  | prjs3        | vuity |
| 005 | 112.json | prjs4        | avail |
| 006 | 123.json | prjs5        | bp |
| 007 | 102.json | prjs6        | steelseries |
| 008 | 193.json | prjs7        | t-mobile |

### Archive Projects (009-014)
| Number | File     | Project Name |
|--------|----------|--------------|
| 009    | 135.json | samsung |
| 010    | 185.json | cargill |
| 011    | 175.json | maven-wave |
| 012    | 218.json | audible |
| 013    | 228.json | google|

---

## 🎯 WHAT YOU NEED FOR YOUR PROJECTS

### For Launch (Minimum 4 Projects)

#### Global Textures (create once)
- [ ] `home0`: 1 video at 720×540 OR 1 image at 860×645
- [ ] `home1`: 1 image at 860×1151 (or similar tall ratio)
- [ ] `home2`: 1 video at 720×540 OR 1 image at 860×645  
- [ ] `home3`: 1 portrait image at 860×1290
- [ ] `about0`: 1 portrait image at 860×1290 (can be same as home3)

#### Project-Specific Textures
For each `prjsN` key, create an array of **4-5 preview items**:
- Images at 860×645
- Videos at 720×540
- Can be all images, all videos, or a mix

#### Full Project Galleries
Each project page needs **7+ gallery items** at:
- Videos: 1600×1200 or 1600×1080
- Images: Similar high resolution
- These go in the project's HTML `main` content, not in textures

---

## 🔧 IMPLEMENTATION IN SANITY

### Step 1: Create textureGroup Documents

For **array-type textures** (prjs0-prjs7):
```javascript
{
  _type: 'textureGroup',
  key: 'prjs0',
  textures: [
    { type: 'image', url: '/media/img1.jpg', width: 860, height: 645 },
    { type: 'image', url: '/media/img2.jpg', width: 860, height: 645 },
    { type: 'image', url: '/media/img3.jpg', width: 860, height: 645 },
    { type: 'video', url: '/media/vid1.mp4', width: 720, height: 540 }
  ]
}
```

For **single-item textures** (home0, home1, home2, home3, about0):
```javascript
{
  _type: 'textureGroup',
  key: 'home0',
  textures: [
    { type: 'video', url: '/media/video.mp4', width: 720, height: 540 }
  ]
}
```

### Step 2: Reference in Documents

All pages and projects include `textureRefs` array:
```javascript
textureRefs: [
  \"about0\", \"home0\", \"home1\", \"home2\", \"home3\",
  \"prjs0\", \"prjs1\", \"prjs2\", \"prjs3\", \"prjs4\", 
  \"prjs5\", \"prjs6\", \"prjs7\"
]
```

**Note**: The template includes ALL texture keys in every document. You can optimize by including only the keys each page actually needs.

---

## ⚠️ CRITICAL NOTES

1. **DO NOT change texture key names** - The runtime expects exact keys
2. **prjs0-prjs7 are ARRAYS** - Each contains 4-5 items, not single images
3. **Dimensions matter** - Keep to the exact sizes or the layout may break
4. **Videos are optional** - You can use all images if you don't have videos
5. **home1 is special** - It's taller (860×1151) than standard 4:3 ratio

---

## 📋 MIGRATION CHECKLIST

### Phase 1: Prepare Assets
- [ ] Gather 4-5 preview images/videos per project (860×645 / 720×540)
- [ ] Prepare 7+ gallery items per project (1600×1200 or 1600×1080)
- [ ] Create portrait images for home3/about0 (860×1290)

### Phase 2: Create in Sanity
- [ ] Create textureGroup for each key (home0-3, about0, prjs0-7)
- [ ] Create Project documents with correct IDs
- [ ] Create Page documents with correct IDs

### Phase 3: Verify
- [ ] Check all texture arrays have 4-5 items
- [ ] Verify dimensions match exactly
- [ ] Test that textureRefs are correctly set

---

## 🚀 RECOMMENDED ASSET SIZES FOR PRODUCTION

While the template uses specific sizes, for production you might want:

### Preview Assets (1.5x scale for retina)
- Images: 1290×968 (from 860×645)
- Videos: 1080×810 (from 720×540)
- Portrait: 1290×1935 (from 860×1290)

### Gallery Assets
- Keep at 1600×1200 or 1600×1080
- Optimize file sizes (< 500KB for images, < 5MB for videos)

### Formats
- Images: WebP with JPG fallback
- Videos: MP4 (H.264) with poster frames
`
