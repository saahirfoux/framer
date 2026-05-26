# Deploy FlipCard to Framer

Publish this component as a [Framer Code Component](https://www.framer.com/developers/components-introduction) using **one file**—CSS is inlined at pack time.

## Readiness checklist

Before packing, confirm locally:

```bash
npx vitest --project storybook run src/components/FlipCard/FlipCard.stories.tsx
npx tsc -b --noEmit
```

Visual QA in Storybook:

| Story | Check |
| --- | --- |
| **Default** | Front photo + label panel; flip → white back with bullets |
| **BackWithImage** | Flip → full-bleed photo on back |
| **BackBackgroundOnly** | Flip → white fill, no back photo |
| **DarkMode** | Dark back + light text overrides |
| **LongText** / **NarrowWidth** | Layout intact after flip |
| **ClickReveal** / **HoverReveal** | No bleed mid-flip |

## One-file deploy

### 1. Generate the Framer bundle

```bash
npm run pack:framer -- FlipCard
```

Or pack every component: `npm run pack:framer`.

Output (repo root):

| File | Role |
| --- | --- |
| [`deploy/FlipCard/FlipCard.tsx`](../../../deploy/FlipCard/FlipCard.tsx) | Paste into Framer: component + **inlined CSS** + `addPropertyControls` |

The pack script embeds [`styles.css`](styles.css) into `PACKED_STYLES` and removes `import './styles.css'` so Framer does not need a separate CSS file.

The `deploy/` folder is gitignored. Re-run `pack:framer` after source changes. See [`deploy/README.md`](../../../deploy/README.md).

### 2. Copy into Framer

1. Open your Framer project → **Assets** → **Code** → **Create Code File** (name it `FlipCard`).
2. Paste the full contents of **`deploy/FlipCard/FlipCard.tsx`**.
3. Open the component preview; confirm styles (scoop, flip, panel) render correctly.
4. Check **published preview** as well—Framer does not support `import './styles.css'` on live sites.

### 3. Recommended canvas size

Use a frame about **360×400px** (4:5 aspect). The component is `width: 100%`, `max-width: 360px`, `aspect-ratio: 4 / 5`.

## Designer workflow (property controls)

| Control | Prop | Notes |
| --- | --- | --- |
| **Photo** | `image` | Front face |
| **Back Photo** | `backImage` | Optional full-bleed on back |
| **Back Background** | `backColor` | When Back Photo is empty (default white) |
| **Back Text** | `textColor` | Bullets and CTA on back |
| **Title** / **Description** | front copy | Bottom-left panel on front only |
| **Back Items** | `backItems` | Bullet list on back |
| **Reveal On** | `revealMode` | Hover, Click, Tap, Scroll |
| **Corner Curve** | `panelScoopRadius` | Front panel scoop |

Front **Photo** and **Back Photo** are independent. With no Back Photo, **Back Background** shows (default `#ffffff`).

## Repo layout (development)

| File | Purpose |
| --- | --- |
| [`FlipCard.tsx`](FlipCard.tsx) | Source; `import './styles.css'` + empty `PACKED_STYLES` for Storybook |
| [`styles.css`](styles.css) | Authoritative styles (inlined into packed file by `pack:framer`) |
| [`FlipCard.framer.tsx`](FlipCard.framer.tsx) | Property controls; merged by pack script |
| [`FlipCard.stories.tsx`](FlipCard.stories.tsx) | Storybook only |

## Dependencies in Framer

- Framer provides **React 18** and **framer-motion** (~v12). Avoid React 19–only APIs.
- The packed file imports `framer` for `addPropertyControls`.
- Set front/back photos via the property panel; the packed default has no bundled hero image.

## Publishing

- Share via Framer’s component **Share** flow or your team library.
- [Property Controls docs](https://www.framer.com/developers/property-controls)

## Known limitations

- **3D flip + front overflow:** Scoop pseudos use `overflow: visible` on the front face. If content bleeds mid-flip, try `isolation: isolate` on `.flip-card__inner` in `styles.css` and re-pack.
- **`overlayColor`:** Reserved in props; not used visually yet.
- **Back photo + text contrast:** No scrim overlay on back images yet.

## Related docs

- [`.docs/framer.md`](../../.docs/framer.md)
- [`.docs/framer-inverted-corner-analysis.md`](../../.docs/framer-inverted-corner-analysis.md)
- [`deploy/README.md`](../../../deploy/README.md)
