# Framer deploy artifacts (generated)

This folder is produced by `npm run pack:framer` and is gitignored (except this README). Do not edit generated files by hand.

## Layout

```
deploy/
  <ComponentName>/
    <ComponentName>.tsx   # single paste target (component + inlined CSS + property controls)
```

CSS is embedded via `PACKED_STYLES` and a `<style>` injector—no separate `styles.css` in Framer.

Packed components use `function ComponentName` (not `export function`) plus a single `export default ComponentName` at the end of the file.

## Commands

```bash
npm run pack:framer              # pack all components with *.framer.tsx
npm run pack:framer -- FlipCard  # pack one component
```

## Adding a new packable component

1. Create under `src/components/MyWidget/`:
   - `MyWidget.tsx` — implementation (no `framer` import)
   - `MyWidget.framer.tsx` — `addPropertyControls` only
   - `styles.css` — used by Storybook/Vite via `import './styles.css'`
2. In `MyWidget.tsx`, add the pack convention:

```tsx
import './styles.css';

const PACKED_STYLES = '';

function MyWidgetStyles() {
  if (!PACKED_STYLES) return null;
  return <style>{PACKED_STYLES}</style>;
}

export function MyWidget() {
  return (
    <>
      <MyWidgetStyles />
      {/* ... */}
    </>
  );
}
```

3. Run `npm run pack:framer`
4. Paste **`deploy/MyWidget/MyWidget.tsx`** into Framer (one file)

Optional: add asset-strip rules in `scripts/pack-framer.mjs` → `STRIP_RULES`.

## Per-component deploy guides

See `src/components/<Name>/DEPLOY.md` when present (e.g. [FlipCard](../src/components/FlipCard/DEPLOY.md)).
