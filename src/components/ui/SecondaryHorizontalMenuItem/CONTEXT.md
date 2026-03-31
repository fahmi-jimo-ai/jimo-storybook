# SecondaryHorizontalMenuItem

**Atomic level:** Molecule — `Molecules/HorizontalMenu/SecondaryHorizontalMenuItem`
**CSS prefix:** `.h-menu-item-secondary`
**Source:** `SecondaryHorizontalMenuItem.js` / `SecondaryHorizontalMenuItem.css`

## What it does
Individual tab item in the secondary pill-style horizontal tab bar (`SecondaryHorizontalMenuGroup`). Can show icon-only or icon + text. Rarely used standalone — consume via `SecondaryHorizontalMenuGroup`.

## Props

| Prop | Type | Options | Default | Notes |
|------|------|---------|---------|-------|
| `tabName` | string | — | — | Tab identifier and label |
| `state` | string | `'active'` `'inactive'` | `'inactive'` | |
| `size` | string | `'big'` `'small'` | `'big'` | |
| `icon` | ReactElement | — | — | Tab icon |
| `withText` | boolean | — | `true` | Show label text |
| `onClick` | function | — | — | Click handler |

## Dependencies
None.

## Import
```js
import { SecondaryHorizontalMenuItem } from '../../../src/components/ui/SecondaryHorizontalMenuItem/SecondaryHorizontalMenuItem';
import '../../../src/components/ui/SecondaryHorizontalMenuItem/SecondaryHorizontalMenuItem.css';
```
