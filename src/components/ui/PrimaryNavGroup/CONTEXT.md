# PrimaryNavGroup

**Atomic level:** Organism — `Organisms/Nav/PrimaryNavGroup`
**CSS prefix:** `.nav-group-primary`
**Source:** `PrimaryNavGroup.js` / `PrimaryNavGroup.css`

## What it does
Grouping container for `PrimaryNavItem` elements. Handles the section layout (padding, separator line between groups). Displays a section label when expanded; hides it when collapsed.

## Props

| Prop | Type | Options | Default | Notes |
|------|------|---------|---------|-------|
| `type` | string | `'expanded'` `'collapsed'` | `'expanded'` | Mirrors sidebar state |
| `children` | node | — | — | `PrimaryNavItem` components |

## Dependencies
Contains `PrimaryNavItem` items.

## Import
```js
import { PrimaryNavGroup } from '../../../src/components/ui/PrimaryNavGroup/PrimaryNavGroup';
import '../../../src/components/ui/PrimaryNavGroup/PrimaryNavGroup.css';
```
