# SecondaryNavSidebar

**Atomic level:** Organism — `Organisms/Nav/SecondaryNavSidebar`
**CSS prefix:** `.nav-sidebar-secondary`
**Source:** `SecondaryNavSidebar.js` / `SecondaryNavSidebar.css`

## What it does
Secondary sidebar for sub-navigation within a product. Navigation items and sections are hardcoded (not configurable). Currently wired for the Agent product: Train / Build / Evaluate sections, with some items marked "Coming Soon" (disabled).

## Props

| Prop | Type | Notes |
|------|------|-------|
| `activeItem` | string | Label of the active nav item |
| `onItemClick` | function | `(label) => void` |

## Dependencies
- `SecondaryNavItem`
- `SecondaryNavGroup`

## Import
```js
import { SecondaryNavSidebar } from '../../../src/components/ui/SecondaryNavSidebar/SecondaryNavSidebar';
import '../../../src/components/ui/SecondaryNavSidebar/SecondaryNavSidebar.css';
```
