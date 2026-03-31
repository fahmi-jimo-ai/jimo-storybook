# SecondaryNavGroup

**Atomic level:** Organism — `Organisms/Nav/SecondaryNavGroup`
**CSS prefix:** `.nav-group-secondary`
**Source:** `SecondaryNavGroup.js` / `SecondaryNavGroup.css`

## What it does
Titled section container for `SecondaryNavItem` elements. Renders an optional section header label above the items.

## Props

| Prop | Type | Notes |
|------|------|-------|
| `title` | string | Section header label (optional) |
| `children` | node | `SecondaryNavItem` components |

## Dependencies
Contains `SecondaryNavItem` items.

## Import
```js
import { SecondaryNavGroup } from '../../../src/components/ui/SecondaryNavGroup/SecondaryNavGroup';
import '../../../src/components/ui/SecondaryNavGroup/SecondaryNavGroup.css';
```
