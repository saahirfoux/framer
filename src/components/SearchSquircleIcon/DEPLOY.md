# Deploy SearchSquircleIcon to Framer

Single-file [Framer Code Component](https://www.framer.com/developers/components-introduction) — squircle search icon with customizable colors and size.

## Generate bundle

```bash
npm run pack:framer -- SearchSquircleIcon
```

Output under `deploy/SearchSquircleIcon/`:

| File | Role |
| --- | --- |
| `SearchSquircleIcon.tsx` | Paste into Framer (code + property controls) |
| `favicon.svg` | SVG favicon (default black squircle, white glass) |
| `search-squircle-icon-192.png` | 192×192 raster |
| `search-squircle-icon-512.png` | 512×512 raster |

Source artwork: [`search-squircle-icon.svg`](search-squircle-icon.svg) — update this when changing icon geometry in `SearchSquircleIcon.tsx`, then re-run pack.

## Paste into Framer

1. **Assets** → **Code** → **Create Code File** (name `SearchSquircleIcon`).
2. Paste the full **`deploy/SearchSquircleIcon/SearchSquircleIcon.tsx`** file.
3. Preview on canvas; adjust **Background**, **Icon Color**, **Size**, and optional **Label**.

## Property controls

| Control | Default |
| --- | --- |
| Background | `#000000` |
| Icon Color | `#ffffff` |
| Size | `48` px |
| Label | `Search` (empty = decorative) |

## Website favicon (manual)

This pack does not overwrite [`public/favicon.svg`](../../../public/favicon.svg). To use on the Vite app, copy `deploy/SearchSquircleIcon/favicon.svg` into `public/` (referenced from [`index.html`](../../../index.html)).

Re-run `npm run pack:framer` after editing `src/components/SearchSquircleIcon/`.
