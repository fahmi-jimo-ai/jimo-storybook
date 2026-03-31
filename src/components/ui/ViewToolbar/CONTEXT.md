# ViewToolbar

**Atomic level:** Organism
**CSS prefix:** `.view-toolbar`
**Source:** `ViewToolbar.js` / `ViewToolbar.css`

## What it does
Combined search field + multiple dropdown filters bar for list/table views. Displays the item count (formatted as "1.2k" for large numbers). Maps a `filters` config array to `DropdownFilter` components automatically.

## Props

| Prop | Type | Notes |
|------|------|-------|
| `searchValue` | string | Controlled search input value |
| `onSearchChange` | function | `(value) => void` |
| `itemCount` | number | Displayed count (auto-formatted) |
| `itemLabel` | string | Label after count (e.g. `"experiences"`) |
| `filters` | array | `[{ placeholder, items, value, onChange, multiSelect? }]` |
| `size` | string | `'big'` \| `'small'` |

## Dependencies
- `Input` (search field)
- `DropdownFilter` (filter dropdowns)

## Import
```js
import { ViewToolbar } from '../../../src/components/ui/ViewToolbar/ViewToolbar';
import '../../../src/components/ui/ViewToolbar/ViewToolbar.css';
```

## Quick example
```jsx
<ViewToolbar
  searchValue={search}
  onSearchChange={setSearch}
  itemCount={experiences.length}
  itemLabel="experiences"
  filters={[
    {
      placeholder: 'All statuses',
      items: [{ value: 'live', label: 'Live' }, { value: 'draft', label: 'Draft' }],
      value: statusFilter,
      onChange: setStatusFilter,
    },
    {
      placeholder: 'All environments',
      items: envItems,
      value: envFilter,
      onChange: setEnvFilter,
      multiSelect: true,
    },
  ]}
/>
```
