# Deploy OmLogo to Framer

Publish this component as a [Framer Code Component](https://www.framer.com/developers/components-introduction) using **one file**—the squircle search icon, CSS, and property controls are all bundled together. No relative imports between components.

## One-file deploy

### 1. Generate the Framer bundle

```bash
npm run pack:framer -- OmLogo
```

Output:

| File | Role |
| --- | --- |
| [`deploy/OmLogo/OmLogo.tsx`](../../../deploy/OmLogo/OmLogo.tsx) | Paste into Framer: icon + logo + inlined CSS + `addPropertyControls` |

The pack script embeds [`styles.css`](styles.css) into `PACKED_STYLES`. Re-run after any change under `src/components/OmLogo/`.

### 2. Copy into Framer

1. Open your Framer project → **Assets** → **Code** → **Create Code File** (name it `OmLogo`).
2. Paste the full contents of **`deploy/OmLogo/OmLogo.tsx`** (not `src/components/OmLogo/OmLogo.tsx`).
3. Confirm the preview shows the squircle icon and **OfferMode** wordmark in one row.

### 3. Property controls

| Control | Purpose |
| --- | --- |
| **Name** | Wordmark text (default `OfferMode`). Bind to a Site Variable to sync across instances. |
| **Size** | Scales wordmark and squircle icon together (default 24px) |
| **Font** | Family, weight, and spacing (size comes from **Size**) |
| **Text Color** | Wordmark color |
| **Icon Background** / **Icon Color** | Squircle fill and magnifying glass stroke |

Icon size tracks the font size automatically.

## Local development

Storybook: `npm run storybook` → **OmLogo**.

The standalone [`SearchSquircleIcon`](../SearchSquircleIcon/) component remains available for icon-only stories; OmLogo does not import it.
