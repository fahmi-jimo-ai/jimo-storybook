# DropdownMenuList

**Atomic level:** Molecule
**CSS prefix:** `.dropdown-menu-list`
**Source:** `DropdownMenuList.js` / `DropdownMenuList.css`

## What it does
A single row/item inside a dropdown menu. Handles selection, hover, disabled, and section-header states. Supports multi-select checkboxes, leading icons, and description subtext.

## Props

| Prop | Type | Options | Default | Notes |
|------|------|---------|---------|-------|
| `state` | string | `'default'` `'selected'` `'disabled'` `'hover'` `'list-header'` | `'default'` | Visual state |
| `text` | string | — | — | Primary label |
| `description` | string | — | — | Subtext below label |
| `showDescription` | boolean | — | `false` | Show description slot |
| `icon` | ReactElement | — | — | Leading icon |
| `showIcon` | boolean | — | `false` | Show icon slot |
| `multiSelect` | boolean | — | `false` | Shows checkbox on left |
| `danger` | boolean | — | `false` | Red danger style |
| `onClick` | function | — | — | Click handler |

## States
default → hover → selected → disabled (also: list-header, danger)

## Dependencies
None — renders its own checkbox SVGs inline.

## Import
```js
import { DropdownMenuList } from '../../../src/components/ui/DropdownMenuList/DropdownMenuList';
import '../../../src/components/ui/DropdownMenuList/DropdownMenuList.css';
```

## Quick example
```jsx
<DropdownMenuList state="default" text="All environments" onClick={handleSelect} />
<DropdownMenuList state="selected" text="Production" showIcon icon={<Global size={16} />} />
<DropdownMenuList state="default" text="Delete" danger onClick={handleDelete} />
<DropdownMenuList state="list-header" text="Environments" />
```
