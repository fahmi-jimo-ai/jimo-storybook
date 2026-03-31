# DropdownFilterNested

**Atomic level:** Organism
**CSS prefix:** `.dropdown-filter-nested`
**Source:** `DropdownFilterNested.js` / `DropdownFilterNested.css`

## What it does

Like `DropdownFilter` but with hierarchical navigation. Items can have `children` arrays to create sub-menus. Clicking a parent item slides a child panel in from the right. A back button slides back to the parent. Useful for multi-level filter trees (e.g. "Segment → All Users / Custom Segments / …").

## Props

| Prop            | Type     | Options                              | Default  | Notes                      |
| --------------- | -------- | ------------------------------------ | -------- | -------------------------- |
| `placeholder`   | string   | —                                    | —        | Trigger text when no value |
| `size`          | string   | `'big'` `'small'`                    | `'big'`  |                            |
| `items`         | array    | `[{value, label, icon?, children?}]` | `[]`     | Nested item tree           |
| `value`         | string   | —                                    | —        | Selected value             |
| `onChange`      | function | —                                    | —        | `(value) => void`          |
| `open`          | boolean  | —                                    | —        | Controlled open state      |
| `onOpenChange`  | function | —                                    | —        | `(open) => void`           |
| `menuAlign`     | string   | `'left'` `'right'`                   | `'left'` |                            |
| `maxMenuHeight` | number   | —                                    | —        | Max-height of panel (px)   |
| `disabled`      | boolean  | —                                    | `false`  |                            |

## Dependencies

* `DropdownSelector` (trigger)
* `DropdownMenuGroup` (panel container)
* `DropdownMenuList` (menu items)
* `ArrowLeft`, `ArrowRight` from `iconsax-react` (navigation)

## Import

```JavaScript
import { DropdownFilterNested } from '../../../src/components/ui/DropdownFilterNested/DropdownFilterNested';
import '../../../src/components/ui/DropdownFilterNested/DropdownFilterNested.css';
```

## Quick example

```JSX
const SEGMENT_ITEMS = [
  { value: 'all', label: 'All users' },
  {
    value: 'segments', label: 'Custom segments', children: [
      { value: 'seg-1', label: 'Power users' },
      { value: 'seg-2', label: 'Churned users' },
    ]
  },
];

<DropdownFilterNested
  placeholder="All users"
  items={SEGMENT_ITEMS}
  value={selectedSegment}
  onChange={setSelectedSegment}
/>
```

