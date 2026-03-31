# DropdownSelector

**Atomic level:** Molecule
**CSS prefix:** `.dropdown-selector`
**Source:** `DropdownSelector.js` / `DropdownSelector.css`

## What it does
Trigger button for dropdown panels. Shows a chevron that rotates when open. Can display an icon, text label, or both. Used inside `DropdownFilter` and `DropdownFilterNested` — rarely used standalone.

## Props

| Prop | Type | Options | Default | Notes |
|------|------|---------|---------|-------|
| `size` | string | `'big'` `'small'` | `'big'` | |
| `text` | string | — | — | Displayed value / placeholder |
| `withIcon` | boolean | — | `false` | Show the icon slot |
| `icon` | ReactElement | — | — | Icon to display |
| `withText` | boolean | — | `true` | Show text label |
| `isOpen` | boolean | — | `false` | Chevron rotates when true |
| `hasValue` | boolean | — | `false` | Shows filled/selected style |
| `disabled` | boolean | — | `false` | |

## Dependencies
None — standalone trigger.

## Import
```js
import { DropdownSelector } from '../../../src/components/ui/DropdownSelector/DropdownSelector';
import '../../../src/components/ui/DropdownSelector/DropdownSelector.css';
```

## Quick example
```jsx
<DropdownSelector text="All statuses" isOpen={open} hasValue={selected.length > 0} />
```
