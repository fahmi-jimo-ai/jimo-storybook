# PrimaryHorizontalMenuItem

**Atomic level:** Molecule — `Molecules/HorizontalMenu/PrimaryHorizontalMenuItem`
**CSS prefix:** `.h-menu-item-primary`
**Source:** `PrimaryHorizontalMenuItem.js` / `PrimaryHorizontalMenuItem.css`

## What it does
Individual tab item in the primary horizontal tab bar (`PrimaryHorizontalMenuGroup`). Supports an icon, numeric counter badge, and chip label. Rarely used standalone — consume via `PrimaryHorizontalMenuGroup`.

## Props

| Prop | Type | Options | Default | Notes |
|------|------|---------|---------|-------|
| `label` | string | — | — | Tab label |
| `state` | string | `'active'` `'default'` | `'default'` | |
| `size` | string | `'big'` `'small'` | `'big'` | |
| `icon` | ReactElement | — | — | Leading icon |
| `showIcon` | boolean | — | `false` | |
| `counter` | number | — | — | Badge count |
| `showCounter` | boolean | — | `false` | |
| `chip` | string | — | — | Chip label text |
| `showChip` | boolean | — | `false` | |
| `onClick` | function | — | — | Click handler |

## Dependencies
None.

## Import
```js
import { PrimaryHorizontalMenuItem } from '../../../src/components/ui/PrimaryHorizontalMenuItem/PrimaryHorizontalMenuItem';
import '../../../src/components/ui/PrimaryHorizontalMenuItem/PrimaryHorizontalMenuItem.css';
```
