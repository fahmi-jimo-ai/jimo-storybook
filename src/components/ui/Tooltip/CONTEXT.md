# Tooltip

**Atomic level:** Atom
**CSS prefix:** `.tooltip`
**Source:** `Tooltip.js` / `Tooltip.css`

## What it does
Hover tooltip bubble with a configurable SVG arrow. The `arrowPosition` prop names **where the arrow sits on the bubble** (not where the tooltip floats):

| arrowPosition | Arrow sits at | Tooltip floats |
|---------------|--------------|----------------|
| `up` / `up-left` / `up-right` | Top of bubble | Below trigger |
| `bottom` / `bottom-left` / `bottom-right` | Bottom of bubble | Above trigger |
| `left` | Left of bubble | Right of trigger |
| `right` | Right of bubble | Left of trigger |

The component only renders the bubble + arrow shape. **The parent wrapper** is responsible for `position: absolute`, hover opacity/scale transition, and placement.

## Props

| Prop | Type | Options | Notes |
|------|------|---------|-------|
| `children` | string | — | Tooltip text content |
| `arrowPosition` | string | `'up'` `'up-left'` `'up-right'` `'bottom'` `'bottom-left'` `'bottom-right'` `'left'` `'right'` | Where the arrow is on the bubble |

## Important rules
- **Never** implement tooltips with CSS border-triangle tricks — always use this component.
- Always keep the tooltip in the DOM; toggle `opacity` + `scale` for animation (do NOT conditionally render with `{visible && <Tooltip>}`).
- In nav components: PrimaryNavItem collapsed → `arrowPosition="left"`, TertiaryNavItem → `arrowPosition="bottom"`.

## Dependencies
None.

## Import
```js
import { Tooltip } from '../../../src/components/ui/Tooltip/Tooltip';
import '../../../src/components/ui/Tooltip/Tooltip.css';
```

## Quick example
```jsx
<span style={{ position: 'relative' }}>
  <TriggerElement />
  <span style={{
    position: 'absolute', left: '110%', top: '50%', transform: 'translateY(-50%)',
    opacity: hovered ? 1 : 0, transition: 'opacity var(--transition-base)',
    pointerEvents: 'none',
  }}>
    <Tooltip arrowPosition="left">This is a tooltip</Tooltip>
  </span>
</span>
```
