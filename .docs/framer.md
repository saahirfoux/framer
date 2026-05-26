# Framer Component System Rules

## Philosophy

This repository exists to prototype, test, refine, and productionize highly reusable interactive UI components that integrate seamlessly with Framer.

Every component should:

- feel native to Framer
- be visually resilient
- be safe by default
- be responsive
- expose designer-friendly controls
- support mobile-first interaction patterns
- degrade gracefully
- avoid over-configuration

---

# Golden Rules of Framer Components

## 1. Every component must have a strong default state

A component should render beautifully immediately after being dragged onto the canvas.

Never require configuration before the component becomes usable.

Required:

- default dimensions
- default content
- default interaction mode
- default colors
- placeholder image/content when necessary

Bad:

- blank states
- runtime errors
- invisible components
- missing content crashes

---

## 2. Components must expose intent, not implementation

Expose designer-facing concepts.

Avoid low-level engineering controls.

Bad controls:

- cubicBezier
- perspectiveValue
- transformOriginX
- dampingCoefficient

Good controls:

- Animation Style
- Reveal Direction
- Reveal On
- Smoothness
- Intensity

Designers think in behavior and feeling.

---

## 3. Mobile-first interaction design

Never assume hover exists.

Desktop:

- hover
- click

Mobile:

- tap
- scroll

All components should be touch-safe.

Avoid:

- tiny hit targets
- accidental gesture conflicts
- hover-only experiences

---

## 4. Components must degrade gracefully

Components should continue functioning under:

- reduced motion
- missing content
- extreme aspect ratios
- long text
- narrow widths
- large widths
- slow devices

Support:

```css
prefers-reduced-motion
```

where motion is central to the experience.

---

## 5. Components must be visually resilient

Components should survive:

- long titles
- short titles
- portrait images
- landscape images
- ultra-wide containers
- stacked layouts
- mobile layouts

Never assume perfect content.

---

## 6. Components should be self-contained

Prefer:

- local state
- props
- lightweight utilities
- minimal dependencies

Avoid:

- global state
- Redux
- routing dependencies
- server assumptions
- app-level coupling

Framer portability matters.

---

## 7. Keep components portable

Every component should ideally be:

- copy-paste portable
- Storybook-compatible
- Framer-compatible
- React-compatible

Avoid architecture that tightly couples components to one runtime.

---

## 8. Components should be difficult to misuse

Good systems prevent invalid states.

Examples:

- fallback images
- fallback titles
- constrained enums
- controlled interaction modes
- safe defaults

The component should guide the user toward successful usage.

---

## 9. Animation should feel intentional

Animations should:

- communicate state
- reinforce interaction
- feel smooth
- avoid distraction

Avoid:

- unnecessary motion
- infinite motion loops
- excessive springiness
- disorienting transforms

---

## 10. Expose curated configuration

Do not expose every possible parameter.

Prefer:

- opinionated defaults
- simplified controls
- curated experiences

Good components feel polished because configuration is intentionally constrained.

---

# Repository Standards

## Recommended Stack

- React
- TypeScript
- Vite
- Framer Motion
- Tailwind CSS
- Storybook

---

# Recommended Repository Structure

```txt
src/
  components/
    FlipCard/
      FlipCard.tsx
      FlipCard.stories.tsx
      index.ts
      types.ts
      styles.css
```

---

# Storybook Standards

Every component should include:

- Default story
- Mobile story
- Edge-case story
- Reduced motion story when relevant
- Interaction stories

Examples:

- HoverReveal
- ClickReveal
- ScrollReveal
- LongText
- NarrowWidth
- DarkMode

---

# Accessibility Standards

Components should:

- support keyboard navigation
- support reduced motion
- use semantic HTML
- maintain readable contrast
- preserve usability on touch devices

---

# Performance Standards

Avoid:

- unnecessary rerenders
- expensive scroll listeners
- layout thrashing
- giant dependency chains

Prefer:

- transforms over layout animations
- IntersectionObserver
- memoization when appropriate
- GPU-friendly motion

---

# Framer-Specific Design Rules

## Framer components should:

- work immediately when dragged into canvas
- expose clear property controls
- avoid setup complexity
- feel visually polished by default
- remain stable under resizing

---

## Recommended Framer Control Categories

- Content
- Layout
- Appearance
- Interaction
- Animation
- Mobile
- Accessibility

---

## Framer Control Naming Conventions

Good:

- Reveal On
- Animation Style
- Mobile Behavior
- Flip Direction

Bad:

- usePerspectiveTransform
- interactionTriggerMode
- rotationVectorScalar

---

# FlipCard Component Specification

## Required Content

- Front image
- Title

## Optional Content

- Description
- Badge
- CTA
- Link

---

# Recommended FlipCard API

```ts
interface FlipCardProps {
  image: string;
  title: string;
  description?: string;

  revealMode: "click" | "hover" | "tap" | "scroll";

  flipDirection: "horizontal" | "vertical";

  animationStyle: "smooth" | "snappy" | "dramatic";

  mobileBehavior: "tap" | "scroll" | "disabled";

  autoFlip?: boolean;
  autoFlipDelay?: number;

  borderRadius?: number;
  shadow?: boolean;
}
```

---

# FlipCard Interaction Rules

## Desktop

Preferred:

- hover
- click

## Mobile

Preferred:

- tap
- optional scroll reveal

Never rely exclusively on hover.

---

# Scroll Reveal Guidance

Recommended implementation:

- IntersectionObserver
- Framer Motion whileInView
- viewport thresholds

Recommended controls:

- threshold
- once
- staggerIndex

---

# Prompt To Generate The FlipCard Component

Copy the following prompt into ChatGPT or Claude to generate the production-ready component.

```txt
Create a production-quality React + TypeScript FlipCard component using Framer Motion.

Requirements:

- Use React
- Use TypeScript
- Use Framer Motion
- Make the component fully compatible with Framer code components
- Make the component Storybook-compatible
- Use clean architecture and reusable props
- Use GPU-friendly transforms
- Use preserve-3d and perspective correctly
- Component must support both desktop and mobile interactions

The component should:

- Show an image on the front
- Reveal content on the back
- Animate using a smooth 3D flip
- Support horizontal and vertical flipping
- Support hover reveal
- Support click reveal
- Support tap reveal
- Support optional scroll reveal using IntersectionObserver or whileInView
- Respect prefers-reduced-motion
- Handle long text gracefully
- Handle missing content gracefully
- Be responsive
- Use accessible semantic HTML
- Support keyboard interaction
- Support touch devices

Create a clean prop API.

Required props:

- image
- title

Optional props:

- description
- badge
- link
- ctaLabel

Behavior props:

- revealMode: hover | click | tap | scroll
- flipDirection: horizontal | vertical
- animationStyle: smooth | snappy | dramatic
- mobileBehavior: tap | scroll | disabled
- autoFlip
- autoFlipDelay

Appearance props:

- borderRadius
- shadow
- backColor
- textColor
- overlayColor
- padding

Implementation requirements:

- Use Framer Motion variants
- Avoid layout thrashing
- Use transforms instead of expensive layout animation
- Keep the component self-contained
- Avoid global state
- Avoid external dependencies besides Framer Motion
- Include sensible default props
- Include accessibility considerations
- Include reduced motion support

Also generate:

1. FlipCard.tsx
2. FlipCard.stories.tsx
3. types.ts
4. Example usage
5. Recommended Storybook stories

Storybook stories should include:

- Default
- HoverReveal
- ClickReveal
- ScrollReveal
- Mobile
- LongText
- ReducedMotion
- DarkMode

Code quality should be senior-level and production-ready.
```

---

## References

- [Framer inverted corner analysis](./framer-inverted-corner-analysis.md) — how the OfferMode template achieves the profile-card scoop (SVG corner + label panel)
