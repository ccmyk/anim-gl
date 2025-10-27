# Sanity Templates

These HTML templates are ready to copy-paste into Sanity Studio.

## Usage

1. Open Sanity Studio (http://localhost:3333)
2. Create a new document of the appropriate type
3. Copy the entire HTML from the template file
4. Paste into the `mainHtml` field
5. Fill in other fields (legacyId, slug, template, textureRefs)
6. Save

## Templates

- `page-home.html` - Homepage (legacyId: 2)
- `page-about.html` - About page (legacyId: 240)
- `project-template.html` - Project page template (customize for each project)

## Important Notes

- **Placeholder paths** (like `/media/placeholder-home0.mp4`) are ignored by the runtime
- The runtime matches `data-ids` and `cnt_prj` classes to texture groups
- Update project slugs and titles to match your content
- Write your own project descriptions - don't use template copy

## Texture Group Mapping

The homepage uses these texture keys:
- `home0` → Options Institute feature (cnt_prj-0)
- `home1` → Naked Juice feature (cnt_prj-1)
- `home2` → Collective feature (cnt_prj-2)
- `home3` → About section portrait
- `prjs3` → Vuity preview (used on cnt_prj-3)

Your JavaScript runtime handles the mapping automatically.
