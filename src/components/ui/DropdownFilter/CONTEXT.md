# DropdownFilter

**Atomic level:** Organism
**CSS prefix:** `.dropdown-filter`
**Source:** `DropdownFilter.js` / `DropdownFilter.css`

## What it does
Complete dropdown filter component — trigger button + animated panel + list of items. Supports single and multi-select. Closes on outside click. Menu can align left or right. For nested/hierarchical items, use `DropdownFilterNested` instead.

## Props

| Prop | Type | Options | Default | Notes |
|------|------|---------|---------|-------|
| `placeholder` | string | — | — | Trigger text when no value selected |
| `size` | string | `'big'` `'small'` | `'big'` | |
| `items` | array | `[{value, label, icon?}]` | `[]` | Menu items |
| `multiSelect` | boolean | — | `false` | Allow multiple selections |
| `value` | string \| array | — | — | Selected value(s) |
| `onChange` | function | — | — | `(value) => void` |
| `open` | boolean | — | — | Controlled open state |
| `onOpenChange` | function | — | — | `(open) => void` |
| `menuAlign` | string | `'left'` `'right'` | `'left'` | Panel alignment relative to trigger |
| `maxMenuHeight` | number | — | — | Max-height of the scrollable panel (px) |
| `disabled` | boolean | — | `false` | |

## Dependencies
- `DropdownSelector` (trigger)
- `DropdownMenuGroup` (panel container)
- `DropdownMenuList` (menu items)

## Import
```js
import { DropdownFilter } from '../../../src/components/ui/DropdownFilter/DropdownFilter';
import '../../../src/components/ui/DropdownFilter/DropdownFilter.css';
```

## Quick example
```jsx
const STATUS_ITEMS = [
  { value: 'live', label: 'Live' },
  { value: 'draft', label: 'Draft' },
  { value: 'paused', label: 'Paused' },
];

<DropdownFilter
  placeholder="All statuses"
  items={STATUS_ITEMS}
  value={selectedStatus}
  onChange={setSelectedStatus}
/>

// Multi-select
<DropdownFilter
  placeholder="Environments"
  items={ENV_ITEMS}
  multiSelect
  value={selectedEnvs}
  onChange={setSelectedEnvs}
/>
```
