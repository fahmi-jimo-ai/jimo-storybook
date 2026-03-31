# TertiaryNavItem

**Atomic level:** Molecule — `Molecules/Nav/TertiaryNavItem`
**CSS prefix:** `.nav-item-tertiary`
**Source:** `TertiaryNavItem.js` / `TertiaryNavItem.css`

## What it does
Icon-only footer navigation item. Always shows a tooltip on hover (arrow at bottom → tooltip floats above). Used in the footer area of nav sidebars for utility actions (help, settings, user profile).

## Props

| Prop | Type | Options | Default | Notes |
|------|------|---------|---------|-------|
| `icon` | ReactElement | — | — | The icon to display |
| `label` | string | — | — | Tooltip text |
| `state` | string | `'idle'` `'active'` | `'idle'` | |
| `tooltipArrowPosition` | string | see Tooltip CONTEXT | `'bottom'` | Override arrow placement |
| `href` | string | — | — | Renders as `<a>` if set |

## Dependencies
- `Tooltip` (`arrowPosition="bottom"` by default — floats above trigger)

## Import
```js
import { TertiaryNavItem } from '../../../src/components/ui/TertiaryNavItem/TertiaryNavItem';
import '../../../src/components/ui/TertiaryNavItem/TertiaryNavItem.css';
```

## Quick example
```jsx
import { Setting2 } from 'iconsax-react';
<TertiaryNavItem
  state="idle"
  label="Settings"
  icon={<Setting2 size={20} variant="Linear" color="currentColor" />}
/>
```
