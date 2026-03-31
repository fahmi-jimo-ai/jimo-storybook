# TertiaryNavGroup

**Atomic level:** Organism — `Organisms/Nav/TertiaryNavGroup`
**CSS prefix:** `.nav-group-tertiary`
**Source:** `TertiaryNavGroup.js` / `TertiaryNavGroup.css`

## What it does
Footer navigation group rendered at the bottom of `PrimaryNavSidebar`. Displays a version label ("Version 1.0.0") and a list of `TertiaryNavItem` elements for utility actions (help, notifications, user).

## Props

| Prop | Type | Notes |
|------|------|-------|
| `items` | array | `[{ icon, label, state, href? }]` |
| `children` | node | Alternative to `items` — direct `TertiaryNavItem` children |

## Dependencies
- `TertiaryNavItem`

## Import
```js
import { TertiaryNavGroup } from '../../../src/components/ui/TertiaryNavGroup/TertiaryNavGroup';
import '../../../src/components/ui/TertiaryNavGroup/TertiaryNavGroup.css';
```
