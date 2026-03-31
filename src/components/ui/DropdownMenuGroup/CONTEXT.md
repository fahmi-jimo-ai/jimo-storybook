# DropdownMenuGroup

**Atomic level:** Organism — `Organisms/Dropdown/DropdownMenuGroup`
**CSS prefix:** `.dropdown-menu-group`
**Source:** `DropdownMenuGroup.js` / `DropdownMenuGroup.css`

## What it does
Scrollable wrapper container for a list of `DropdownMenuList` items. Handles the panel sizing/overflow. Usually used inside `DropdownFilter` — rarely composed manually.

## Props

| Prop | Type | Notes |
|------|------|-------|
| `maxHeight` | number | Max scroll height in px |
| `children` | node | `DropdownMenuList` items |

## Dependencies
Contains `DropdownMenuList` items.

## Import
```js
import { DropdownMenuGroup } from '../../../src/components/ui/DropdownMenuGroup/DropdownMenuGroup';
import '../../../src/components/ui/DropdownMenuGroup/DropdownMenuGroup.css';
```

## Quick example
```jsx
<DropdownMenuGroup maxHeight={240}>
  <DropdownMenuList state="default" text="Option A" onClick={() => select('a')} />
  <DropdownMenuList state="selected" text="Option B" onClick={() => select('b')} />
</DropdownMenuGroup>
```
