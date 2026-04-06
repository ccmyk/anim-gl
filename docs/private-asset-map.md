# Private Asset Map

> Internal reference for opaque filenames used in `public/archive/` and `public/previews/`.
> Keep this file private if you want to preserve obscurity.

## Archive PDFs

- `d_7v3kq2m9x4r1.pdf` → formerly `fka-audible.pdf`
- `d_k8p1n6t4z2w7.pdf` → formerly `ge-healthcare.pdf`
- `d_m2x9q7r4v1k8.pdf` → formerly `samsung-wearables-photoshoot.pdf`
- `d_t6w4n1z8p3q5.pdf` → formerly `samsung-wearables.pdf`

## Preview Images

- `p_7v3kq2m9x4r1.webp` → formerly `fka-audible-preview.webp`
- `p_k8p1n6t4z2w7.webp` → formerly `ge-healthcare-preview.webp`
- `p_m2x9q7r4v1k8.webp` → formerly `wearables-photoshoot-preview.webp`
- `p_t6w4n1z8p3q5.webp` → formerly `wearables-preview.webp`

## Pairing Key

- `d_7v3kq2m9x4r1.pdf` ↔ `p_7v3kq2m9x4r1.webp`
- `d_k8p1n6t4z2w7.pdf` ↔ `p_k8p1n6t4z2w7.webp`
- `d_m2x9q7r4v1k8.pdf` ↔ `p_m2x9q7r4v1k8.webp`
- `d_t6w4n1z8p3q5.pdf` ↔ `p_t6w4n1z8p3q5.webp`

## Notes

- This setup reduces discoverability, but does **not** provide access control.
- Anyone with the direct URL can still access the files.
- Keep crawler controls in place (`robots.txt` + `X-Robots-Tag` in `_headers`).
