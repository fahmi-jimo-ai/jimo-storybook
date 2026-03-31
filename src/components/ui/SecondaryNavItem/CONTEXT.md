# SecondaryNavItem

**Atomic level:** Molecule — `Molecules/Nav/SecondaryNavItem`
**CSS prefix:** `.nav-item-secondary`
**Source:** `SecondaryNavItem.js` / `SecondaryNavItem.css`

## What it does
Single item in the secondary sidebar. Supports idle, active, and disabled states. Renders as `<a>` when `href` is provided, otherwise `<div role="button">`.

## Props

| Prop | Type | Options | Default | Notes |
|------|------|---------|---------|-------|
| `state` | string | `'idle'` `'active'` `'disabled'` | `'idle'` | |
| `label` | string | — | — | Item label |
| `icon` | ReactElement | — | — | Icon for idle state |
| `iconActive` | ReactElement | — | — | Icon for active state |
| `href` | string | — | — | Renders as `<a>` if set |

## States
idle → hover (CSS :hover) → active → disabled

## Dependencies
None.

## Import
```js
import { SecondaryNavItem } from '../../../src/components/ui/SecondaryNavItem/SecondaryNavItem';
import '../../../src/components/ui/SecondaryNavItem/SecondaryNavItem.css';
```

## Quick example
```jsx
import { Book1, BookSquare } from 'iconsax-react';
<SecondaryNavItem
  state="idle"
  label="Knowledge"
  icon={<Book1 size={18} variant="Linear" color="currentColor" />}
  iconActive={<BookSquare size={18} variant="Bold" color="currentColor" />}
/>
```
