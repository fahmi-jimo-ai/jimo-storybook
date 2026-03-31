# PrimaryNavItem

**Atomic level:** Molecule — `Molecules/Nav/PrimaryNavItem`
**CSS prefix:** `.nav-item-primary`
**Source:** `PrimaryNavItem.js` / `PrimaryNavItem.css`

## What it does
Single navigation item in the primary left sidebar. When the sidebar is collapsed (`type="collapsed"`), the label is hidden and a tooltip appears on hover (arrow pointing left → tooltip floats right). Supports an optional badge chip and brand icons for Jimo products.

## Props

| Prop | Type | Options | Default | Notes |
|------|------|---------|---------|-------|
| `state` | string | `'idle'` `'active'` | `'idle'` | |
| `type` | string | `'default'` `'collapsed'` | `'default'` | Collapsed hides label + shows tooltip |
| `label` | string | — | — | Nav item label |
| `icon` | ReactElement | — | — | Icon for idle/default state |
| `iconActive` | ReactElement | — | — | Icon for active state |
| `chip` | string | — | — | Optional badge text (e.g. "New") |
| `href` | string | — | — | If set, renders as `<a>` instead of `<div>` |

## States
idle → hover (CSS :hover) → active

## Dependencies
- `Tooltip` — shown in collapsed mode (`arrowPosition="left"`)

## Jimo brand icons (mandatory)
When the item is a Jimo product, use the fixed brand icon from the CLAUDE.md table — not a generic substitute. See `Icon/CONTEXT.md` for the full table.

## Import
```js
import { PrimaryNavItem } from '../../../src/components/ui/PrimaryNavItem/PrimaryNavItem';
import '../../../src/components/ui/PrimaryNavItem/PrimaryNavItem.css';
```

## Quick example
```jsx
import { Routing2 } from 'iconsax-react';
<PrimaryNavItem
  state="active"
  label="Tours"
  icon={<Routing2 size={20} variant="Linear" color="currentColor" />}
  iconActive={<Routing2 size={20} variant="Bold" color="currentColor" />}
/>
```
